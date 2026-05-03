import { X, MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '../utils/whatsapp';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  // Formatação de preço
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  const whatsappLink = generateWhatsAppLink(product);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} strokeWidth={1} />
        </button>
        
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={product.images[0]} alt={product.name} className="modal-image" />
          </div>
          
          <div className="modal-info">
            <span className="modal-sku">Cód. {product.sku}</span>
            <h2 className="modal-title">{product.name}</h2>
            
            <div className="modal-details">
              <div className="detail-item">
                <span className="detail-label">Tamanho:</span>
                <span className="detail-value">{product.size}</span>
              </div>
              {product.inspiration && (
                <div className="detail-item">
                  <span className="detail-label">Inspiração:</span>
                  <span className="detail-value">{product.inspiration}</span>
                </div>
              )}
            </div>

            <div className="modal-description">
              <h3>Notas Olfativas</h3>
              <p>{product.notes}</p>
            </div>

            <div className="modal-footer">
              <div className="modal-price-container">
                <span className="price-label">Valor</span>
                <span className="modal-price">{formattedPrice}</span>
              </div>
              
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
