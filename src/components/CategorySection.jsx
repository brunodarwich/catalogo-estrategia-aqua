import { ArrowRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import './CategorySection.css';

const CategorySection = ({ categories, onCategorySelect }) => (
  <section className="category-section">
    <div className="category-section-inner">
      <SectionHeader
        eyebrow="Linhas"
        title="Explore as coleções"
        description="Perfumação para cada momento da sua rotina."
        align="center"
      />
      <div className="category-grid">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            className="category-card"
            onClick={() => onCategorySelect(cat.id)}
          >
            <span className="category-card-name">{cat.name}</span>
            <p className="category-card-desc">{cat.description}</p>
            <span className="category-card-arrow" aria-hidden="true">
              <ArrowRight size={16} />
            </span>
          </button>
        ))}
      </div>
    </div>
  </section>
);

export default CategorySection;
