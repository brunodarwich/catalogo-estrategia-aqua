import test from 'node:test';
import assert from 'node:assert/strict';
import { getProductPayload, getSalePayload, getMutationErrorMessage } from '../src/lib/action-validation.js';
import { isAllowedOrigin, normalizeEventPayload } from '../src/lib/events.js';
import { getSafeRelativeRedirect } from '../src/lib/redirects.js';
import {
  getProductImagePath,
  validateProductImageFile,
} from '../src/lib/upload-policy.js';

const form = (entries) => {
  const data = new FormData();
  Object.entries(entries).forEach(([key, value]) => data.set(key, value));
  return data;
};

test('OAuth callback accepts only relative redirects', () => {
  assert.equal(getSafeRelativeRedirect('/admin/products?tab=active'), '/admin/products?tab=active');
  assert.equal(getSafeRelativeRedirect('https://evil.example/phish'), '/admin');
  assert.equal(getSafeRelativeRedirect('//evil.example/phish'), '/admin');
});

test('event origin validation requires an exact configured origin', () => {
  assert.equal(isAllowedOrigin('https://aqua.example', 'https://aqua.example/admin'), true);
  assert.equal(isAllowedOrigin('https://aqua.example.evil', 'https://aqua.example'), false);
  assert.equal(isAllowedOrigin(null, 'https://aqua.example'), false);
  assert.equal(isAllowedOrigin(null, ''), true);
});

test('event payload validation rejects invalid type and oversized metadata', () => {
  assert.equal(normalizeEventPayload({ type: 'unknown' }).error, 'Invalid event type');
  assert.equal(
    normalizeEventPayload({ type: 'page_view', path: '/x'.repeat(9000) }).error,
    'Event payload is too large',
  );
  assert.equal(
    normalizeEventPayload({ type: 'page_view', metadata: { value: 'x'.repeat(3000) } }).error,
    'Event metadata is too large',
  );
  assert.deepEqual(normalizeEventPayload({ type: 'page_view', path: '/admin' }).data, {
    type: 'page_view',
    productId: null,
    categoryId: null,
    path: '/admin',
    referrer: null,
    source: null,
    metadata: undefined,
  });
});

test('sale validation rejects negative prices and normalizes totals', () => {
  assert.throws(
    () => getSalePayload(form({ quantity: '1', unitPrice: '-10' })),
    /Preco unitario nao pode ser negativo/,
  );

  const saleWithoutProduct = getSalePayload(form({ quantity: '1', unitPrice: '10', status: 'invalid' }));
  assert.equal(saleWithoutProduct.productId, null);
  assert.equal(saleWithoutProduct.status, 'pending');

  assert.equal(getSalePayload(form({ quantity: '2', unitPrice: '35.5' })).total, 71);
});

test('product validation requires core fields and normalizes SKU/slug', () => {
  assert.throws(
    () => getProductPayload(form({ sku: 'abc', categoryId: 'colonias', price: '10' })),
    /Nome e obrigatorio/,
  );

  const payload = getProductPayload(form({
    name: 'Água Serena',
    sku: ' aqua-001 ',
    categoryId: 'colonias',
    price: '89.9',
    status: 'active',
  }));

  assert.equal(payload.slug, 'agua-serena');
  assert.equal(payload.sku, 'AQUA-001');
  assert.equal(payload.price, 89.9);

  assert.throws(
    () => getProductPayload(form({
      name: 'Produto Teste',
      sku: 'AQUA-999',
      categoryId: 'colonias',
      price: '100',
      promotionalPrice: '120',
    })),
    /Preco promocional deve ser menor que o preco base/,
  );
});

test('mutation error messages map known Prisma codes', () => {
  assert.match(getMutationErrorMessage({ code: 'P2002', meta: { target: ['sku'] } }), /sku/);
  assert.equal(getMutationErrorMessage({ code: 'P2025' }), 'Registro nao encontrado.');
});

test('product upload policy limits type, size, and storage path', () => {
  assert.equal(validateProductImageFile({ type: 'image/gif', size: 20 }), 'Use uma imagem JPG, PNG ou WebP.');
  assert.equal(validateProductImageFile({ type: 'image/webp', size: 6 * 1024 * 1024 }), 'A imagem deve ter no maximo 5 MB.');
  assert.equal(
    getProductImagePath({
      file: { name: 'Foto Linda.PNG', type: 'image/png' },
      productRef: 'Produto Áqua',
      now: 123,
    }),
    'produto-aqua/123-foto-linda.png',
  );
});
