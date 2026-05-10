import { useState } from 'react'
import { ExternalLink, MessageCircle, X } from 'lucide-react'
import './App.css'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import ProductGrid from './components/ProductGrid'
import ProductModal from './components/ProductModal'
import SectionHeader from './components/SectionHeader'
import CategorySection from './components/CategorySection'
import HighlightRow from './components/HighlightRow'
import AdminDashboard from './admin/AdminDashboard'
import {
  getCategoryById,
  listActiveCategories,
  listActiveProducts,
  listFeaturedProducts,
  listProductsByCategoryId,
  listPromotionalProducts,
  storeSettings,
} from './data/catalog'
import { generateWhatsAppGeneralLink } from './utils/whatsapp'

function PublicSite() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [legalModal, setLegalModal] = useState(null);

  const categories = listActiveCategories();
  const featuredProducts = listFeaturedProducts();
  const promotionalProducts = listPromotionalProducts();

  const filteredProducts = activeCategory === 'all'
    ? listActiveProducts()
    : listProductsByCategoryId(activeCategory);

  const activeCategoryData = activeCategory === 'all'
    ? null
    : getCategoryById(activeCategory);

  const productSectionTitle = activeCategoryData
    ? activeCategoryData.name
    : storeSettings.catalog.defaultTitle;

  const productSectionDescription = activeCategoryData
    ? activeCategoryData.description
    : storeSettings.catalog.defaultDescription;

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const generalWhatsAppLink = generateWhatsAppGeneralLink();
  const resellerWhatsAppLink = generateWhatsAppGeneralLink(storeSettings.resellers.ctaMessage);

  return (
    <div className="app-container">
      <Hero />

      <CategorySection
        categories={categories}
        onCategorySelect={handleCategorySelect}
      />

      <HighlightRow
        products={featuredProducts}
        onProductClick={setSelectedProduct}
        eyebrow="Destaques"
        title="Produtos em destaque"
        description="As fragrâncias mais escolhidas da coleção."
      />

      <HighlightRow
        products={promotionalProducts}
        onProductClick={setSelectedProduct}
        eyebrow="Promoções"
        title="Ofertas especiais"
        description="Fragrâncias premium com condições exclusivas."
      />

      <section id="catalogo" className="catalog-section">
        <FilterBar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <main className="fade-in">
          <div className="product-section">
            <SectionHeader
              eyebrow={activeCategory === 'all' ? 'Coleção atual' : 'Categoria'}
              title={productSectionTitle}
              description={productSectionDescription}
            />

            <div className="product-section-meta" aria-live="polite">
              <span className="product-section-count">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
              </span>
              <span className="product-section-line" aria-hidden="true" />
            </div>

            <ProductGrid products={filteredProducts} onProductClick={setSelectedProduct} />
          </div>
        </main>
      </section>

      <section id="revendedores" className="resellers-section">
        <div className="resellers-inner">
          <span className="resellers-eyebrow">Parceria</span>
          <h2 className="resellers-title">{storeSettings.resellers.title}</h2>
          <p className="resellers-description">{storeSettings.resellers.description}</p>
          <a
            href={resellerWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="resellers-cta"
          >
            <MessageCircle size={18} strokeWidth={1.5} />
            {storeSettings.resellers.cta}
          </a>
        </div>
      </section>

      <section id="sobre" className="about-section">
        <div className="about-inner">
          <span className="about-eyebrow">Sobre a AQUA</span>
          <h2 className="about-title">{storeSettings.institutional.aboutTitle}</h2>
          <p className="about-text">{storeSettings.institutional.aboutText}</p>
        </div>
      </section>

      <section className="social-section">
        <div className="social-inner">
          <span className="social-eyebrow">Nos siga</span>
          <h2 className="social-title">Acompanhe a AQUA</h2>
          <div className="social-links">
            <a
              href={storeSettings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <ExternalLink size={20} strokeWidth={1.5} />
              <span>@aqua.aromaofficial</span>
            </a>
            <a
              href={generalWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link social-link--whatsapp"
            >
              <MessageCircle size={20} strokeWidth={1.5} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="app-footer">
        <div className="app-footer-top">
          <div className="app-footer-brand">
            <span className="app-footer-logo">{storeSettings.name}</span>
            <p className="app-footer-tagline">{storeSettings.tagline}</p>
          </div>
          <nav className="app-footer-nav" aria-label="Links do rodapé">
            <a href="#catalogo" className="app-footer-link">Catálogo</a>
            <a href="#revendedores" className="app-footer-link">Revendedores</a>
            <a href="#sobre" className="app-footer-link">Sobre</a>
            <a
              href={storeSettings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="app-footer-link"
            >
              Instagram
            </a>
            <a
              href={generalWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="app-footer-link"
            >
              Contato
            </a>
          </nav>
        </div>
        <div className="app-footer-bottom">
          <p className="app-footer-copy">
            &copy; 2026 {storeSettings.name}. Todos os direitos reservados.
          </p>
          <div className="app-footer-legal">
            <button
              type="button"
              className="app-footer-legal-link"
              onClick={() => setLegalModal('privacy')}
            >
              Privacidade
            </button>
            <span className="app-footer-dot" aria-hidden="true" />
            <button
              type="button"
              className="app-footer-legal-link"
              onClick={() => setLegalModal('terms')}
            >
              Termos de uso
            </button>
          </div>
        </div>
      </footer>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {legalModal && (
        <div className="legal-overlay" onClick={() => setLegalModal(null)}>
          <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="legal-modal-close"
              onClick={() => setLegalModal(null)}
              aria-label="Fechar"
            >
              <X size={20} strokeWidth={1} />
            </button>
            <h2 className="legal-modal-title">
              {legalModal === 'privacy' ? 'Política de Privacidade' : 'Termos de Uso'}
            </h2>
            <p className="legal-modal-text">
              {legalModal === 'privacy'
                ? storeSettings.legal.privacyPolicy
                : storeSettings.legal.termsOfUse}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  return isAdminRoute ? <AdminDashboard /> : <PublicSite />;
}

export default App
