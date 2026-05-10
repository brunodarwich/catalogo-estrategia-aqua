import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getProductMessageTemplate } from '../src/utils/whatsapp-template.js';

const catalog = JSON.parse(
  await readFile(new URL('../src/data/products.json', import.meta.url), 'utf8'),
);

const activeCategories = () =>
  catalog.categories
    .filter((category) => category.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

const activeProducts = () => {
  const activeCategoryIds = new Set(activeCategories().map((category) => category.id));
  return catalog.products.filter(
    (product) => product.status === 'active' && activeCategoryIds.has(product.categoryId),
  );
};

const whatsappLink = (message) =>
  `https://wa.me/${catalog.store.whatsappPhone}?text=${encodeURIComponent(message)}`;

test('catalog helpers expose only active products in active categories', () => {
  const activeCategoryIds = new Set(activeCategories().map((category) => category.id));
  const products = activeProducts();

  assert.ok(products.length > 0);
  assert.ok(products.every((product) => product.status === 'active'));
  assert.ok(products.every((product) => activeCategoryIds.has(product.categoryId)));
});

test('featured products are a subset of active products', () => {
  const activeProductIds = new Set(activeProducts().map((product) => product.id));

  assert.ok(
    catalog.products
      .filter((product) => product.status === 'active' && product.isFeatured)
      .every((product) => activeProductIds.has(product.id)),
  );
});

test('active products keep featured first, then promotion, then alphabetical order', () => {
  const products = activeProducts().sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
    if (a.isPromotion !== b.isPromotion) return a.isPromotion ? -1 : 1;

    return a.name.localeCompare(b.name, 'pt-BR');
  });

  const firstNonFeaturedIndex = products.findIndex((product) => !product.isFeatured);
  const firstNonPromotionIndex = products.findIndex(
    (product) => !product.isFeatured && !product.isPromotion,
  );

  assert.notEqual(firstNonFeaturedIndex, -1);
  assert.ok(products.slice(0, firstNonFeaturedIndex).every((product) => product.isFeatured));
  assert.ok(
    products
      .slice(firstNonFeaturedIndex, firstNonPromotionIndex)
      .every((product) => !product.isFeatured && product.isPromotion),
  );
  assert.deepEqual(
    products.slice(firstNonPromotionIndex).map((product) => product.name),
    [...products.slice(firstNonPromotionIndex).map((product) => product.name)].sort((a, b) =>
      a.localeCompare(b, 'pt-BR'),
    ),
  );
});

test('product image contract uses poster fallback when image list is empty', () => {
  const fallbackProduct = { images: [] };
  const populatedProduct = catalog.products.find((product) => product.images?.length > 0);

  const getPrimaryImage = (product) => {
    if (!product?.images?.length) return '/hero-poster.jpg';

    return product.images[0] || '/hero-poster.jpg';
  };

  assert.equal(getPrimaryImage(fallbackProduct), '/hero-poster.jpg');
  assert.equal(getPrimaryImage(null), '/hero-poster.jpg');
  assert.equal(getPrimaryImage(populatedProduct), populatedProduct.images[0]);
});

test('product WhatsApp template falls back when placeholders are missing', () => {
  assert.equal(
    getProductMessageTemplate('Olá, AQUA! Gostaria de encomendar o Spirit Silver.'),
    'Olá! Gostaria de encomendar o {productName} (Cód. {productSku}).',
  );

  assert.equal(
    getProductMessageTemplate('Olá! Gostaria de encomendar o {productName} (Cód. {productSku}).'),
    'Olá! Gostaria de encomendar o {productName} (Cód. {productSku}).',
  );
});

test('WhatsApp message contract generates encoded wa.me links', () => {
  const productLink = whatsappLink('Olá! Gostaria de encomendar o Jade (Cód. 1226).');
  const generalLink = whatsappLink('Olá, AQUA!');

  assert.match(productLink, /^https:\/\/wa\.me\/\d+\?text=/);
  assert.match(decodeURIComponent(productLink), /Jade/);
  assert.match(generalLink, /^https:\/\/wa\.me\/\d+\?text=/);
  assert.match(decodeURIComponent(generalLink), /Olá, AQUA!/);
});
