import React from 'react';
import { MessageCircle } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onClick }) => {
  // Formatação de preço
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
    <article className="product-card" onClick={onClick}>
      <div className="product-image-container">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="product-image" 
          loading="lazy"
        />
        {product.inspiration && (
          <span className="product-inspiration-tag">Insp: {product.inspiration}</span>
        )}
      </div>
      
      <div className="product-info">
        <div className="product-header">
          <span className="product-sku">Cód. {product.sku}</span>
          <h3 className="product-name">{product.name}</h3>
        </div>
        
        <p className="product-notes">{product.notes}</p>
        
        <div className="product-footer">
          <span className="product-price">{formattedPrice}</span>
          <button className="product-action-btn">
            <MessageCircle size={18} strokeWidth={1.5} />
            <span>Ver Detalhes</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
