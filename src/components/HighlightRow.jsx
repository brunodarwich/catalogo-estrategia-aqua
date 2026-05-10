import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';
import './HighlightRow.css';

const HighlightRow = ({ products, onProductClick, eyebrow, title, description }) => {
  if (!products.length) return null;

  return (
    <section className="highlight-section">
      <div className="highlight-inner">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="highlight-grid">
          {products.map(product => (
            <div key={product.id} className="highlight-item">
              <ProductCard product={product} onClick={() => onProductClick(product)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightRow;
