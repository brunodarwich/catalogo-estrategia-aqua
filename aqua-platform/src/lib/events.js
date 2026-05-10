export const allowedEventTypes = new Set([
  'page_view',
  'product_view',
  'category_view',
  'whatsapp_click',
  'promotion_click',
  'reseller_cta_click',
]);

export const EVENT_BODY_LIMIT_BYTES = 16 * 1024;
export const EVENT_METADATA_LIMIT_BYTES = 2 * 1024;
export const EVENT_RATE_LIMIT_MAX = 60;
export const EVENT_RATE_LIMIT_WINDOW_MS = 60 * 1000;

const cleanString = (value, max = 240) =>
  typeof value === 'string' ? value.trim().slice(0, max) : null;

export function getExpectedOrigin(appUrl) {
  if (!appUrl) return null;

  try {
    return new URL(appUrl).origin;
  } catch {
    return null;
  }
}

export function isAllowedOrigin(origin, appUrl) {
  const expectedOrigin = getExpectedOrigin(appUrl);
  if (!expectedOrigin) return true;

  return origin === expectedOrigin;
}

export function isJsonWithinLimit(value, limitBytes) {
  try {
    return new TextEncoder().encode(JSON.stringify(value)).length <= limitBytes;
  } catch {
    return false;
  }
}

export function normalizeEventPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { error: 'Invalid event payload' };
  }

  if (!isJsonWithinLimit(payload, EVENT_BODY_LIMIT_BYTES)) {
    return { error: 'Event payload is too large' };
  }

  if (!allowedEventTypes.has(payload.type)) {
    return { error: 'Invalid event type' };
  }

  const metadata =
    payload.metadata && typeof payload.metadata === 'object' && !Array.isArray(payload.metadata)
      ? payload.metadata
      : undefined;

  if (metadata && !isJsonWithinLimit(metadata, EVENT_METADATA_LIMIT_BYTES)) {
    return { error: 'Event metadata is too large' };
  }

  return {
    data: {
      type: payload.type,
      productId: cleanString(payload.productId, 80),
      categoryId: cleanString(payload.categoryId, 80),
      path: cleanString(payload.path),
      referrer: cleanString(payload.referrer),
      source: cleanString(payload.source, 80),
      metadata,
    },
  };
}
