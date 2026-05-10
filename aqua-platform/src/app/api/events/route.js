import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import {
  EVENT_BODY_LIMIT_BYTES,
  EVENT_RATE_LIMIT_MAX,
  EVENT_RATE_LIMIT_WINDOW_MS,
  isAllowedOrigin,
  normalizeEventPayload,
} from '@/lib/events';

const rateLimitBuckets = new Map();

function getClientKey(request) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwardedFor || request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(request) {
  const now = Date.now();
  const key = getClientKey(request);
  const current = rateLimitBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + EVENT_RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > EVENT_RATE_LIMIT_MAX;
}

export async function POST(request) {
  const origin = request.headers.get('origin');
  if (!isAllowedOrigin(origin, process.env.NEXT_PUBLIC_APP_URL)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > EVENT_BODY_LIMIT_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  if (isRateLimited(request)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const normalized = normalizeEventPayload(payload);
  if (normalized.error) {
    return NextResponse.json({ error: normalized.error }, { status: 400 });
  }

  try {
    await getPrisma().event.create({ data: normalized.data });
  } catch (error) {
    if (error?.code === 'P2003') {
      return NextResponse.json({ error: 'Invalid product or category reference' }, { status: 400 });
    }

    throw error;
  }

  return NextResponse.json({ ok: true });
}
