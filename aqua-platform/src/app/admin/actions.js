'use server';

import { revalidatePath } from 'next/cache';
import { getPrisma } from '@/lib/prisma';
import { requireAdminUser } from '@/lib/admin-auth';
import { slugify } from '@/lib/format';

const eventTypes = new Set([
  'page_view',
  'product_view',
  'category_view',
  'whatsapp_click',
  'promotion_click',
  'reseller_cta_click',
]);

const saleStatuses = new Set(['pending', 'completed', 'cancelled']);
const productStatuses = new Set(['active', 'inactive', 'draft']);

const getString = (formData, key) => String(formData.get(key) || '').trim();

const getNumber = (formData, key, fallback = 0) => {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : fallback;
};

const parseOptionalNumber = (formData, key) => {
  const raw = getString(formData, key);
  if (!raw) return null;

  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
};

const parseImageList = (formData, key) =>
  getString(formData, key)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

const getProductStatus = (formData) => {
  const status = getString(formData, 'status');
  return productStatuses.has(status) ? status : 'draft';
};

const getProductPayload = (formData) => {
  const name = getString(formData, 'name');
  const slug = slugify(getString(formData, 'slug') || name);
  const sku = getString(formData, 'sku').toUpperCase();
  const promotionalPrice = parseOptionalNumber(formData, 'promotionalPrice');

  return {
    name,
    slug,
    sku,
    categoryId: getString(formData, 'categoryId'),
    shortDescription: getString(formData, 'shortDescription') || null,
    description: getString(formData, 'description') || null,
    price: Math.max(0, getNumber(formData, 'price')),
    promotionalPrice: promotionalPrice && promotionalPrice > 0 ? promotionalPrice : null,
    images: parseImageList(formData, 'images'),
    fragrance: getString(formData, 'fragrance') || null,
    volume: getString(formData, 'volume') || null,
    status: getProductStatus(formData),
    isFeatured: formData.get('isFeatured') === 'on',
    isPromotion: formData.get('isPromotion') === 'on',
  };
};

export async function createSale(formData) {
  await requireAdminUser();
  const prisma = getPrisma();
  const productId = getString(formData, 'productId') || null;
  const quantity = Math.max(1, Math.trunc(getNumber(formData, 'quantity', 1)));
  const unitPrice = getNumber(formData, 'unitPrice');
  const total = quantity * unitPrice;

  await prisma.sale.create({
    data: {
      productId,
      customerName: getString(formData, 'customerName') || null,
      channel: getString(formData, 'channel') || null,
      status: saleStatuses.has(getString(formData, 'status')) ? getString(formData, 'status') : 'pending',
      quantity,
      unitPrice,
      total,
      notes: getString(formData, 'notes') || null,
    },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/sales');
}

export async function updateSale(formData) {
  await requireAdminUser();
  const id = getString(formData, 'id');
  const quantity = Math.max(1, Math.trunc(getNumber(formData, 'quantity', 1)));
  const unitPrice = getNumber(formData, 'unitPrice');
  const total = quantity * unitPrice;
  const status = getString(formData, 'status');

  await getPrisma().sale.update({
    where: { id },
    data: {
      customerName: getString(formData, 'customerName') || null,
      channel: getString(formData, 'channel') || null,
      status: saleStatuses.has(status) ? status : 'pending',
      quantity,
      unitPrice,
      total,
      notes: getString(formData, 'notes') || null,
    },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/sales');
}

export async function cancelSale(formData) {
  await requireAdminUser();

  await getPrisma().sale.update({
    where: { id: getString(formData, 'id') },
    data: { status: 'cancelled' },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/sales');
}

export async function createCategory(formData) {
  await requireAdminUser({ strategicOnly: true });
  const name = getString(formData, 'name');
  const slug = slugify(getString(formData, 'slug') || name);

  await getPrisma().category.create({
    data: {
      id: slug,
      name,
      slug,
      description: getString(formData, 'description') || null,
      displayOrder: Math.trunc(getNumber(formData, 'displayOrder')),
      isActive: formData.get('isActive') === 'on',
    },
  });

  revalidatePath('/admin/categories');
}

export async function updateCategory(formData) {
  await requireAdminUser({ strategicOnly: true });
  const id = getString(formData, 'id');
  const name = getString(formData, 'name');
  const slug = slugify(getString(formData, 'slug') || name);

  await getPrisma().category.update({
    where: { id },
    data: {
      name,
      slug,
      description: getString(formData, 'description') || null,
      displayOrder: Math.trunc(getNumber(formData, 'displayOrder')),
      isActive: formData.get('isActive') === 'on',
    },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/categories');
}

export async function inactivateCategory(formData) {
  await requireAdminUser({ strategicOnly: true });

  await getPrisma().category.update({
    where: { id: getString(formData, 'id') },
    data: { isActive: false },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/categories');
}

export async function createProduct(formData) {
  await requireAdminUser({ strategicOnly: true });
  const payload = getProductPayload(formData);

  await getPrisma().product.create({
    data: {
      id: slugify(getString(formData, 'id') || payload.slug || payload.sku),
      ...payload,
    },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/products');
  revalidatePath('/admin/sales');
  revalidatePath('/admin/analytics');
}

export async function updateProduct(formData) {
  await requireAdminUser({ strategicOnly: true });

  await getPrisma().product.update({
    where: { id: getString(formData, 'id') },
    data: getProductPayload(formData),
  });

  revalidatePath('/admin');
  revalidatePath('/admin/products');
  revalidatePath('/admin/sales');
  revalidatePath('/admin/analytics');
}

export async function inactivateProduct(formData) {
  await requireAdminUser({ strategicOnly: true });

  await getPrisma().product.update({
    where: { id: getString(formData, 'id') },
    data: { status: 'inactive', isFeatured: false, isPromotion: false },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/products');
  revalidatePath('/admin/sales');
  revalidatePath('/admin/analytics');
}

export async function updateStoreSettings(formData) {
  await requireAdminUser({ strategicOnly: true });

  const value = {
    name: getString(formData, 'name'),
    whatsappPhone: getString(formData, 'whatsappPhone'),
    instagramUrl: getString(formData, 'instagramUrl'),
    logoUrl: getString(formData, 'logoUrl'),
    hero: {
      videoSrc: getString(formData, 'heroVideoSrc'),
      posterSrc: getString(formData, 'heroPosterSrc'),
    },
    institutional: {
      aboutTitle: getString(formData, 'aboutTitle'),
      aboutText: getString(formData, 'aboutText'),
    },
    legal: {
      privacyPolicy: getString(formData, 'privacyPolicy'),
      termsOfUse: getString(formData, 'termsOfUse'),
    },
  };

  await getPrisma().storeSetting.upsert({
    where: { key: 'store' },
    update: { value },
    create: { key: 'store', value },
  });

  revalidatePath('/admin/settings');
}

export async function recordInternalEvent(formData) {
  await requireAdminUser();
  const type = getString(formData, 'type');

  if (!eventTypes.has(type)) return;

  await getPrisma().event.create({
    data: {
      type,
      productId: getString(formData, 'productId') || null,
      categoryId: getString(formData, 'categoryId') || null,
      path: getString(formData, 'path') || null,
      source: getString(formData, 'source') || 'manual',
    },
  });

  revalidatePath('/admin/analytics');
}
