import { slugify } from './format.js';

export const saleStatuses = new Set(['pending', 'completed', 'cancelled']);
export const productStatuses = new Set(['active', 'inactive', 'draft']);

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const getString = (formData, key, max = 500) =>
  String(formData.get(key) || '').trim().slice(0, max);

export const getRequiredString = (formData, key, label, max = 500) => {
  const value = getString(formData, key, max);
  if (!value) throw new ValidationError(`${label} e obrigatorio.`);

  return value;
};

export const getNumber = (formData, key, fallback = 0) => {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : fallback;
};

export const getNonNegativeNumber = (formData, key, label, fallback = 0) => {
  const value = getNumber(formData, key, fallback);
  if (value < 0) throw new ValidationError(`${label} nao pode ser negativo.`);

  return value;
};

export const parseOptionalPositiveNumber = (formData, key) => {
  const raw = getString(formData, key);
  if (!raw) return null;

  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : null;
};

export const parseImageList = (formData, key) =>
  getString(formData, key, 5000)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);

export function getSaleStatus(formData) {
  const status = getString(formData, 'status');
  return saleStatuses.has(status) ? status : 'pending';
}

export function getProductStatus(formData) {
  const status = getString(formData, 'status');
  return productStatuses.has(status) ? status : 'draft';
}

export function getProductPayload(formData) {
  const name = getRequiredString(formData, 'name', 'Nome', 160);
  const slug = slugify(getString(formData, 'slug', 180) || name);
  const sku = getRequiredString(formData, 'sku', 'SKU', 80).toUpperCase();
  const categoryId = getRequiredString(formData, 'categoryId', 'Categoria', 120);
  const promotionalPrice = parseOptionalPositiveNumber(formData, 'promotionalPrice');
  const price = getNonNegativeNumber(formData, 'price', 'Preco base');

  if (!slug) throw new ValidationError('Slug invalido.');
  if (promotionalPrice !== null && promotionalPrice >= price) {
    throw new ValidationError('Preco promocional deve ser menor que o preco base.');
  }

  return {
    name,
    slug,
    sku,
    categoryId,
    shortDescription: getString(formData, 'shortDescription', 180) || null,
    description: getString(formData, 'description', 2000) || null,
    price,
    promotionalPrice,
    images: parseImageList(formData, 'images'),
    fragrance: getString(formData, 'fragrance', 180) || null,
    volume: getString(formData, 'volume', 80) || null,
    status: getProductStatus(formData),
    isFeatured: formData.get('isFeatured') === 'on',
    isPromotion: formData.get('isPromotion') === 'on',
  };
}

export function getSalePayload(formData, { requireId = false } = {}) {
  const id = requireId ? getRequiredString(formData, 'id', 'Venda', 120) : null;
  const quantity = Math.max(1, Math.trunc(getNonNegativeNumber(formData, 'quantity', 'Quantidade', 1)));
  const unitPrice = getNonNegativeNumber(formData, 'unitPrice', 'Preco unitario');

  return {
    id,
    productId: getString(formData, 'productId', 120) || null,
    customerName: getString(formData, 'customerName', 160) || null,
    channel: getString(formData, 'channel', 80) || null,
    status: getSaleStatus(formData),
    quantity,
    unitPrice,
    total: quantity * unitPrice,
    notes: getString(formData, 'notes', 1000) || null,
  };
}

export function getCategoryPayload(formData, { requireId = false } = {}) {
  const id = requireId ? getRequiredString(formData, 'id', 'Categoria', 120) : null;
  const name = getRequiredString(formData, 'name', 'Nome', 160);
  const slug = slugify(getString(formData, 'slug', 180) || name);

  if (!slug) throw new ValidationError('Slug invalido.');

  return {
    id,
    createId: slug,
    name,
    slug,
    description: getString(formData, 'description', 500) || null,
    displayOrder: Math.trunc(getNumber(formData, 'displayOrder')),
    isActive: formData.get('isActive') === 'on',
  };
}

export function getMutationErrorMessage(error, fallback = 'Nao foi possivel salvar os dados.') {
  if (error instanceof ValidationError) return error.message;

  if (error?.code === 'P2002') {
    const target = Array.isArray(error.meta?.target) ? error.meta.target.join(', ') : 'campo unico';
    return `Ja existe um registro com este ${target}.`;
  }

  if (error?.code === 'P2003') {
    return 'O registro informado esta vinculado a um item inexistente ou protegido.';
  }

  if (error?.code === 'P2025') {
    return 'Registro nao encontrado.';
  }

  return fallback;
}
