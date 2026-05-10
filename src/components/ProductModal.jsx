import { X, MessageCircle } from 'lucide-react';
import { getProductPrimaryImage } from '../data/catalog';
import { generateWhatsAppLink } from '../utils/whatsapp';
import ProductPrice from './ProductPrice';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const whatsappLink = generateWhatsAppLink(product);
  const primaryImage = getProductPrimaryImage(product);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar detalhes do produto">
          <X size={24} strokeWidth={1} />
        </button>
        
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={primaryImage} alt={product.name} className="modal-image" />
          </div>
          
          <div className="modal-info">
            <span className="modal-sku">Cód. {product.sku}</span>
            <h2 className="modal-title">{product.name}</h2>
            
            <div className="modal-details">
              <div className="detail-item">
                <span className="detail-label">Volume:</span>
                <span className="detail-value">{product.volume}</span>
              </div>
              {product.fragrance && (
                <div className="detail-item">
                  <span className="detail-label">Fragrância:</span>
                  <span className="detail-value">{product.fragrance}</span>
                </div>
              )}
            </div>

            <div className="modal-description">
              <h3>Descricao</h3>
              <p>{product.description}</p>
            </div>

            <div className="modal-footer">
              <ProductPrice
                price={product.price}
                promotionalPrice={product.promotionalPrice}
                label="Valor"
                tone="featured"
                className="modal-price-container"
              />
              
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="modal-buy-btn"
              >
                <MessageCircle size={20} />
                <span>Encomendar pelo WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
