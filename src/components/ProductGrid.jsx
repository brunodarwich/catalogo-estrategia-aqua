import EmptyState from './EmptyState';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, onProductClick }) => {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <EmptyState
          title="Nada por aqui por enquanto"
          description="Troque a categoria para explorar outras fragrancias da AQUA ou volte para a visao completa do catalogo."
        />
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <div key={product.id} className={`fade-in stagger-${(index % 3) + 1}`}>
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
