import { storeSettings } from '../data/catalog';

const getPhone = () =>
  import.meta.env.VITE_WHATSAPP_PHONE || storeSettings.whatsappPhone;

export const generateWhatsAppLink = (product) => {
  if (!product) return '';

  const phone = getPhone();
  const messageTemplate =
    import.meta.env.VITE_WHATSAPP_MESSAGE ||
    'Olá! Gostaria de encomendar o {productName} (Cód. {productSku}).';

  const message = messageTemplate
    .replace('{productName}', product.name)
    .replace('{productSku}', product.sku || product.id);

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const generateWhatsAppGeneralLink = (customMessage) => {
  const phone = getPhone();
  const message =
    customMessage ||
    storeSettings.contact?.generalMessage ||
    'Olá! Gostaria de saber mais sobre a AQUA.';

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
