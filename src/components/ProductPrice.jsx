import { formatPrice } from '../data/catalog';
import './ProductPrice.css';

const ProductPrice = ({
  price,
  promotionalPrice,
  label,
  className = '',
  tone = 'default',
}) => {
  const hasPromotion = typeof promotionalPrice === 'number' && promotionalPrice < price;

  return (
    <div className={`product-price-block product-price-block--${tone} ${className}`.trim()}>
      {label ? <span className="product-price-label">{label}</span> : null}
      <div className="product-price-values">
        {hasPromotion ? (
          <>
            <span className="product-price-original">{formatPrice(price)}</span>
            <span className="product-price-current">{formatPrice(promotionalPrice)}</span>
          </>
        ) : (
          <span className="product-price-current">{formatPrice(price)}</span>
        )}
      </div>
    </div>
  );
};

export default ProductPrice;
