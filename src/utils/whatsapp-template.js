export const DEFAULT_PRODUCT_MESSAGE_TEMPLATE =
  'Olá! Gostaria de encomendar o {productName} (Cód. {productSku}).';

export const getProductMessageTemplate = (template) => {
  if (typeof template !== 'string') return DEFAULT_PRODUCT_MESSAGE_TEMPLATE;

  const trimmed = template.trim();
  const hasProductName = trimmed.includes('{productName}');
  const hasProductSku = trimmed.includes('{productSku}');

  return hasProductName && hasProductSku
    ? trimmed
    : DEFAULT_PRODUCT_MESSAGE_TEMPLATE;
};