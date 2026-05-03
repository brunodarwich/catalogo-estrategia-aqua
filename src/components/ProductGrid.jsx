import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, onProductClick }) => {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>Nenhum produto encontrado nesta categoria.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <div key={product.sku} className={`fade-in stagger-${(index % 3) + 1}`}>
          <ProductCard 
            product={product} 
            onClick={() => onProductClick(product)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
