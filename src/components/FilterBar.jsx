import React from 'react';
import './FilterBar.css';

const FilterBar = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <nav className="filter-bar">
      <div className="filter-container">
        <button 
          className={`filter-item ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => onCategoryChange('all')}
        >
          Todos
        </button>
        
        {categories.map((category) => (
          <button
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
