const DEFAULT_ADMIN_REDIRECT = '/admin';

export function getSafeRelativeRedirect(value, fallback = DEFAULT_ADMIN_REDIRECT) {
  if (typeof value !== 'string') return fallback;

  const trimmed = value.trim();
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) return fallback;

  try {
    const parsed = new URL(trimmed, 'http://aqua.local');
    if (parsed.origin !== 'http://aqua.local') return fallback;

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}
