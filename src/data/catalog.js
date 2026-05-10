import catalogData from './products.json';

const FALLBACK_PRODUCT_IMAGE = '/hero-poster.jpg';

const activeCategoryIds = new Set(
  catalogData.categories
    .filter((category) => category.isActive)
    .map((category) => category.id),
);

const byDisplayOrder = (a, b) => a.displayOrder - b.displayOrder;

const byFeaturedPromotionAndName = (a, b) => {
  if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
  if (a.isPromotion !== b.isPromotion) return a.isPromotion ? -1 : 1;

  return a.name.localeCompare(b.name, 'pt-BR');
};

const isProductActive = (product) =>
  product.status === 'active' && activeCategoryIds.has(product.categoryId);

export const storeSettings = catalogData.store;

export const listCatalogCategories = () =>
  [...catalogData.categories].sort(byDisplayOrder);

export const listCatalogProducts = () =>
  [...catalogData.products].sort(byFeaturedPromotionAndName);

export const listActiveCategories = () =>
  [...catalogData.categories]
    .filter((category) => category.isActive)
    .sort(byDisplayOrder);

export const listActiveProducts = () =>
  [...catalogData.products]
    .filter(isProductActive)
    .sort(byFeaturedPromotionAndName);

export const listProductsByCategoryId = (categoryId) =>
  listActiveProducts().filter((product) => product.categoryId === categoryId);

export const listFeaturedProducts = () =>
  listActiveProducts().filter((product) => product.isFeatured);

export const listPromotionalProducts = () =>
  listActiveProducts().filter((product) => product.isPromotion);

export const getCategoryBySlug = (slug) =>
  listActiveCategories().find((category) => category.slug === slug) || null;

export const getCategoryById = (id) =>
  listActiveCategories().find((category) => category.id === id) || null;

export const getProductBySlug = (slug) =>
  listActiveProducts().find((product) => product.slug === slug) || null;

export const getProductPrimaryImage = (product) => {
  if (!product?.images?.length) return FALLBACK_PRODUCT_IMAGE;

  return product.images[0] || FALLBACK_PRODUCT_IMAGE;
};

export const formatPrice = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
