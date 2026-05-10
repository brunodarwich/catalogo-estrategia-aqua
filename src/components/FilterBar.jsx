import './FilterBar.css';

const FilterBar = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <nav className="filter-bar" aria-label="Filtrar produtos por categoria">
      <div className="filter-container">
        <button 
          type="button"
          className={`filter-item ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => onCategoryChange('all')}
        >
          Todos
        </button>
        
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            className={`filter-item ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default FilterBar;
