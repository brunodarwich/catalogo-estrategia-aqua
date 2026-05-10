import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

const allowedTypes = new Set([
  'page_view',
  'product_view',
  'category_view',
  'whatsapp_click',
  'promotion_click',
  'reseller_cta_click',
]);

const cleanString = (value, max = 240) =>
  typeof value === 'string' ? value.trim().slice(0, max) : null;

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!allowedTypes.has(payload.type)) {
    return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
  }

  await getPrisma().event.create({
    data: {
      type: payload.type,
      productId: cleanString(payload.productId, 80),
      categoryId: cleanString(payload.categoryId, 80),
      path: cleanString(payload.path),
      referrer: cleanString(payload.referrer),
      source: cleanString(payload.source, 80),
      metadata: payload.metadata && typeof payload.metadata === 'object' ? payload.metadata : undefined,
    },
  });

  return NextResponse.json({ ok: true });
}
