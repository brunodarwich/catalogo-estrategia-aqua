import { MessageCircle } from 'lucide-react';
import { getCategoryById, getProductPrimaryImage } from '../data/catalog';
import ProductPrice from './ProductPrice';
import './ProductCard.css';

const ProductCard = ({ product, onClick }) => {
  const primaryImage = getProductPrimaryImage(product);
  const category = getCategoryById(product.categoryId);

  return (
    <article className="product-card">
      <div className="product-image-container">
        <img 
          src={primaryImage}
          alt={product.name} 
          className="product-image" 
          loading="lazy"
        />
        {product.fragrance && (
          <span className="product-inspiration-tag">Fragrância: {product.fragrance}</span>
        )}
      </div>
      
      <div className="product-info">
        <div className="product-header">
          <div className="product-meta">
            {category && <span className="product-category">{category.name}</span>}
            <span className="product-sku">Cód. {product.sku}</span>
          </div>
          <h3 className="product-name">{product.name}</h3>
        </div>
        
        <p className="product-notes">{product.shortDescription}</p>
        
        <div className="product-footer">
          <ProductPrice price={product.price} promotionalPrice={product.promotionalPrice} />
          <button type="button" className="product-action-btn" onClick={onClick}>
            <MessageCircle size={18} strokeWidth={1.5} />
            <span>Ver Detalhes</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
