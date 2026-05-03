/**
 * Gera um link de WhatsApp pré-preenchido para um produto específico.
 * 
 * @param {Object} product - Objeto do produto contendo name e sku.
 * @returns {string} URL formatada para o WhatsApp.
 */
export const generateWhatsAppLink = (product) => {
  if (!product) return '';

  const phone = import.meta.env.VITE_WHATSAPP_PHONE || "5500000000000";
  const messageTemplate = import.meta.env.VITE_WHATSAPP_MESSAGE || "Olá! Gostaria de encomendar o {productName} (Cód. {productSku}).";
  
  const message = messageTemplate
    .replace('{productName}', product.name)
    .replace('{productSku}', product.sku);

  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${phone}?text=${encodedMessage}`;
};
