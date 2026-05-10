export const PRODUCT_MEDIA_BUCKET = 'product-media';
export const PRODUCT_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const PRODUCT_IMAGE_ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export function sanitizeStorageSegment(value = '') {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export function getSafeImageExtension(file) {
  const byType = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  };

  if (byType[file?.type]) return byType[file.type];

  const parts = String(file?.name || '').split('.');
  const extension = parts.length > 1 ? parts.pop().toLowerCase() : '';
  return ['jpg', 'jpeg', 'png', 'webp'].includes(extension) ? extension.replace('jpeg', 'jpg') : 'jpg';
}

export function validateProductImageFile(file) {
  if (!file) return 'Selecione uma imagem.';

  if (!PRODUCT_IMAGE_ALLOWED_TYPES.has(file.type)) {
    return 'Use uma imagem JPG, PNG ou WebP.';
  }

  if (file.size > PRODUCT_IMAGE_MAX_BYTES) {
    return 'A imagem deve ter no maximo 5 MB.';
  }

  return null;
}

export function getProductImagePath({ file, productRef = '', now = Date.now() }) {
  const folder = sanitizeStorageSegment(productRef) || 'draft';
  const extension = getSafeImageExtension(file);
  const baseName = sanitizeStorageSegment(String(file?.name || '').replace(/\.[^.]+$/, '')) || 'produto';

  return `${folder}/${now}-${baseName}.${extension}`;
}
