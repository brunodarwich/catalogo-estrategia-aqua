'use server';

import { revalidatePath } from 'next/cache';
import { getPrisma } from '@/lib/prisma';
import { requireAdminUser } from '@/lib/admin-auth';
import { slugify } from '@/lib/format';
import {
  getCategoryPayload,
  getMutationErrorMessage,
  getProductPayload,
  getRequiredString,
  getSalePayload,
  getString,
} from '@/lib/action-validation';

const eventTypes = new Set([
  'page_view',
  'product_view',
  'category_view',
  'whatsapp_click',
  'promotion_click',
  'reseller_cta_click',
]);

export async function createSale(formData) {
  await requireAdminUser();
  const prisma = getPrisma();
  const payload = getSalePayload(formData);

  try {
    await prisma.sale.create({ data: payload });
  } catch (error) {
    throw new Error(getMutationErrorMessage(error, 'Nao foi possivel criar a venda.'));
  }

  revalidatePath('/admin');
  revalidatePath('/admin/sales');
  revalidatePath('/');
}

export async function updateSale(formData) {
  await requireAdminUser();
  const { id, ...payload } = getSalePayload(formData, { requireId: true });

  try {
    await getPrisma().sale.update({
      where: { id },
      data: payload,
    });
  } catch (error) {
    throw new Error(getMutationErrorMessage(error, 'Nao foi possivel atualizar a venda.'));
  }

  revalidatePath('/admin');
  revalidatePath('/admin/sales');
}

export async function cancelSale(formData) {
  await requireAdminUser();

  try {
    await getPrisma().sale.update({
      where: { id: getRequiredString(formData, 'id', 'Venda') },
      data: { status: 'cancelled' },
    });
  } catch (error) {
    throw new Error(getMutationErrorMessage(error, 'Nao foi possivel cancelar a venda.'));
  }

  revalidatePath('/admin');
  revalidatePath('/admin/sales');
}

export async function createCategory(formData) {
  await requireAdminUser({ strategicOnly: true });
  const { createId, ...payload } = getCategoryPayload(formData);

  try {
    await getPrisma().category.create({
      data: {
        id: createId,
        ...payload,
      },
    });
  } catch (error) {
    throw new Error(getMutationErrorMessage(error, 'Nao foi possivel criar a categoria.'));
  }

  revalidatePath('/admin/categories');
  revalidatePath('/');
}

export async function updateCategory(formData) {
  await requireAdminUser({ strategicOnly: true });
  const { id, createId, ...payload } = getCategoryPayload(formData, { requireId: true });
  void createId;

  try {
    await getPrisma().category.update({
      where: { id },
      data: payload,
    });
  } catch (error) {
    throw new Error(getMutationErrorMessage(error, 'Nao foi possivel atualizar a categoria.'));
  }

  revalidatePath('/admin');
  revalidatePath('/admin/categories');
  revalidatePath('/');
}

export async function inactivateCategory(formData) {
  await requireAdminUser({ strategicOnly: true });

  try {
    await getPrisma().category.update({
      where: { id: getRequiredString(formData, 'id', 'Categoria') },
      data: { isActive: false },
    });
  } catch (error) {
    throw new Error(getMutationErrorMessage(error, 'Nao foi possivel inativar a categoria.'));
  }

  revalidatePath('/admin');
  revalidatePath('/admin/categories');
  revalidatePath('/');
}

export async function createProduct(formData) {
  await requireAdminUser({ strategicOnly: true });
  const payload = getProductPayload(formData);

  try {
    await getPrisma().product.create({
      data: {
        id: slugify(getString(formData, 'id') || payload.slug || payload.sku),
        ...payload,
      },
    });
  } catch (error) {
    throw new Error(getMutationErrorMessage(error, 'Nao foi possivel criar o produto.'));
  }

  revalidatePath('/admin');
  revalidatePath('/admin/products');
  revalidatePath('/admin/sales');
  revalidatePath('/admin/analytics');
  revalidatePath('/');
}

export async function updateProduct(formData) {
  await requireAdminUser({ strategicOnly: true });

  try {
    await getPrisma().product.update({
      where: { id: getRequiredString(formData, 'id', 'Produto') },
      data: getProductPayload(formData),
    });
  } catch (error) {
    throw new Error(getMutationErrorMessage(error, 'Nao foi possivel atualizar o produto.'));
  }

  revalidatePath('/admin');
  revalidatePath('/admin/products');
  revalidatePath('/admin/sales');
  revalidatePath('/admin/analytics');
  revalidatePath('/');
}

export async function inactivateProduct(formData) {
  await requireAdminUser({ strategicOnly: true });

  try {
    await getPrisma().product.update({
      where: { id: getRequiredString(formData, 'id', 'Produto') },
      data: { status: 'inactive', isFeatured: false, isPromotion: false },
    });
  } catch (error) {
    throw new Error(getMutationErrorMessage(error, 'Nao foi possivel inativar o produto.'));
  }

  revalidatePath('/admin');
  revalidatePath('/admin/products');
  revalidatePath('/admin/sales');
  revalidatePath('/admin/analytics');
  revalidatePath('/');
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
  revalidatePath('/');
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
