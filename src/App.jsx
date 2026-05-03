import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import ProductGrid from './components/ProductGrid'
import ProductModal from './components/ProductModal'
import catalogData from './data/products.json'

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Lógica de filtragem de produtos
  const filteredProducts = activeCategory === 'all' 
    ? catalogData.products 
    : catalogData.products.filter(p => p.categoryId === activeCategory);

  return (
    <div className="app-container">
      <Hero />
      
      <FilterBar 
        categories={catalogData.categories} 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />

      <main className="fade-in">
        <section className="product-section">
          <ProductGrid products={filteredProducts} onProductClick={setSelectedProduct} />
        </section>
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2026 AQUA Perfumaria - O luxo de se sentir bem</p>
      </footer>

      {/* Modal de Detalhes */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  )
}

export default App
