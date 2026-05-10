'use client';

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from 'react';
import { ArrowRight, ExternalLink, MessageCircle, X } from 'lucide-react';

const DEFAULT_POSTER =
  'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1600&q=80';

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value || 0));

const getProductImage = (product, fallback = DEFAULT_POSTER) => {
  if (Array.isArray(product.images) && product.images.length) {
    return product.images[0] || fallback;
  }

  return fallback;
};

const getWhatsappHref = ({ phone, message }) => {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return null;

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
};

function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`public-section-header ${align === 'center' ? 'is-centered' : ''}`}>
      <span className="public-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function ProductPrice({ price, promotionalPrice, tone = 'default' }) {
  return (
    <div className={`public-price ${tone === 'featured' ? 'is-featured' : ''}`}>
      <strong>{formatCurrency(promotionalPrice || price)}</strong>
      {promotionalPrice ? <span>{formatCurrency(price)}</span> : null}
    </div>
  );
}

function ProductCard({ product, onOpen }) {
  return (
    <article className="public-product-card">
      <div className="public-product-image-wrap">
        <img
          alt={product.name}
          className="public-product-image"
          loading="lazy"
          src={getProductImage(product)}
          onError={(event) => {
            event.currentTarget.src = DEFAULT_POSTER;
          }}
        />
        {product.fragrance ? (
          <span className="public-product-tag">Fragrancia: {product.fragrance}</span>
        ) : null}
      </div>

      <div className="public-product-info">
        <div className="public-product-header">
          <div className="public-product-meta">
            <span>{product.category.name}</span>
            <span>Cod. {product.sku}</span>
          </div>
          <h3>{product.name}</h3>
        </div>

        <p className="public-product-notes">
          {product.shortDescription || product.description || 'Fragrancia selecionada para a colecao AQUA.'}
        </p>

        <div className="public-product-footer">
          <ProductPrice price={product.price} promotionalPrice={product.promotionalPrice} />
          <button className="public-product-action" type="button" onClick={() => onOpen(product)}>
            <MessageCircle size={18} strokeWidth={1.5} />
            <span>Ver detalhes</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function HighlightSection({ products, eyebrow, title, description, onOpen }) {
  if (!products.length) return null;

  return (
    <section className="public-highlight-section">
      <div className="public-section-inner">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="public-highlight-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductModal({ product, phone, onClose }) {
  if (!product) return null;

  const whatsappHref = getWhatsappHref({
    phone,
    message: `Ola! Quero saber mais sobre ${product.name} (${product.sku}).`,
  });

  return (
    <div className="public-modal-overlay" onClick={onClose}>
      <div className="public-modal-content" onClick={(event) => event.stopPropagation()}>
        <button
          aria-label="Fechar detalhes do produto"
          className="public-modal-close"
          type="button"
          onClick={onClose}
        >
          <X size={24} strokeWidth={1} />
        </button>

        <div className="public-modal-body">
          <div className="public-modal-image-wrap">
            <img
              alt={product.name}
              className="public-modal-image"
              src={getProductImage(product)}
              onError={(event) => {
                event.currentTarget.src = DEFAULT_POSTER;
              }}
            />
          </div>

          <div className="public-modal-info">
            <span className="public-modal-sku">Cod. {product.sku}</span>
            <h2>{product.name}</h2>

            <div className="public-modal-details">
              {product.volume ? (
                <div>
                  <span>Volume</span>
                  <strong>{product.volume}</strong>
                </div>
              ) : null}
              {product.fragrance ? (
                <div>
                  <span>Fragrancia</span>
                  <strong>{product.fragrance}</strong>
                </div>
              ) : null}
            </div>

            <div className="public-modal-description">
              <h3>Descricao</h3>
              <p>{product.description || product.shortDescription || 'Produto publicado sem descricao completa.'}</p>
            </div>

            <div className="public-modal-footer">
              <ProductPrice
                price={product.price}
                promotionalPrice={product.promotionalPrice}
                tone="featured"
              />
              {whatsappHref ? (
                <a className="public-modal-buy" href={whatsappHref} rel="noreferrer" target="_blank">
                  <MessageCircle size={20} />
                  <span>Encomendar pelo WhatsApp</span>
                </a>
              ) : (
                <span className="public-read-only-note">
                  Configure o WhatsApp no admin para liberar o CTA.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PublicCatalog({ categories, products, store }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [legalModal, setLegalModal] = useState(null);

  const hero = store.hero || {};
  const institutional = store.institutional || {};
  const legal = store.legal || {};
  const brandName = store.name || 'AQUA';
  const poster = hero.posterSrc || DEFAULT_POSTER;
  const whatsappHref = getWhatsappHref({
    phone: store.whatsappPhone,
    message: 'Ola! Quero saber mais sobre a AQUA.',
  });
  const resellerHref = getWhatsappHref({
    phone: store.whatsappPhone,
    message: 'Ola! Quero saber mais sobre a oportunidade para revendedores AQUA.',
  });

  const featuredProducts = useMemo(
    () => products.filter((product) => product.isFeatured),
    [products],
  );
  const promotionalProducts = useMemo(
    () => products.filter((product) => product.isPromotion),
    [products],
  );
  const activeCategoryData = categories.find((category) => category.id === activeCategory) || null;
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((product) => product.categoryId === activeCategory);

  const scrollToCatalog = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="public-catalog-page">
      <section className="public-hero">
        <div className="public-hero-media">
          <img
            alt={brandName}
            className="public-hero-image"
            src={poster}
            onError={(event) => {
              event.currentTarget.src = DEFAULT_POSTER;
            }}
          />
          {hero.videoSrc ? (
            <video
              aria-hidden="true"
              autoPlay
              className="public-hero-video"
              loop
              muted
              playsInline
              poster={poster}
              preload="metadata"
            >
              <source src={hero.videoSrc} type="video/mp4" />
            </video>
          ) : null}
          <div className="public-hero-overlay" />
        </div>

        <div className="public-hero-content">
          <span className="public-hero-eyebrow">{hero.eyebrow || 'Catalogo premium'}</span>
          <h1 className="public-hero-logo-heading">
            <img
              alt={hero.title || brandName}
              className="public-hero-brand-logo"
              src="/aqua-logo-hero-white.png"
            />
          </h1>
          <p>{hero.subtitle || 'Perfumaria sensorial para todos os momentos.'}</p>
          <span className="public-hero-tagline">
            {hero.tagline || 'Fragrancias que transformam ambientes.'}
          </span>
          <div className="public-hero-actions">
            <button className="public-hero-btn is-primary" type="button" onClick={scrollToCatalog}>
              Ver catalogo
            </button>
            {whatsappHref ? (
              <a className="public-hero-btn is-secondary" href={whatsappHref} rel="noreferrer" target="_blank">
                <MessageCircle size={16} strokeWidth={1.5} />
                WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="public-category-section">
        <div className="public-section-inner">
          <SectionHeader
            align="center"
            eyebrow="Linhas"
            title="Explore as colecoes"
            description="Perfumacao para cada momento da sua rotina."
          />
          <div className="public-category-grid">
            {categories.map((category) => (
              <button
                className="public-category-card"
                key={category.id}
                type="button"
                onClick={() => {
                  setActiveCategory(category.id);
                  scrollToCatalog();
                }}
              >
                <span>{category.name}</span>
                <p>{category.description || 'Selecao especial da colecao AQUA.'}</p>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <HighlightSection
        description="As fragrancias mais escolhidas da colecao."
        eyebrow="Destaques"
        products={featuredProducts}
        title="Produtos em destaque"
        onOpen={setSelectedProduct}
      />

      <HighlightSection
        description="Fragrancias premium com condicoes exclusivas."
        eyebrow="Promocoes"
        products={promotionalProducts}
        title="Ofertas especiais"
        onOpen={setSelectedProduct}
      />

      <section id="catalogo" className="public-catalog-section">
        <div className="public-filter-bar">
          <div className="public-filter-container">
            <button
              className={activeCategory === 'all' ? 'public-filter-item is-active' : 'public-filter-item'}
              type="button"
              onClick={() => setActiveCategory('all')}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                className={activeCategory === category.id ? 'public-filter-item is-active' : 'public-filter-item'}
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="public-section-inner">
          <SectionHeader
            eyebrow={activeCategoryData ? 'Categoria' : 'Colecao atual'}
            title={activeCategoryData?.name || 'Todos os produtos'}
            description={activeCategoryData?.description || 'Escolha sua fragrancia e fale direto pelo WhatsApp.'}
          />
          <div className="public-product-section-meta" aria-live="polite">
            <span>
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
            </span>
            <i aria-hidden="true" />
          </div>

          {filteredProducts.length ? (
            <div className="public-product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onOpen={setSelectedProduct} />
              ))}
            </div>
          ) : (
            <div className="public-empty-state">
              <h3>Nenhum produto nesta categoria.</h3>
              <p>Quando um item ativo for publicado no admin, ele aparece automaticamente aqui.</p>
            </div>
          )}
        </div>
      </section>

      <section id="revendedores" className="public-resellers-section">
        <div className="public-narrow-section">
          <span>Parceria</span>
          <h2>Seja uma revendedora AQUA</h2>
          <p>Leve fragrancias premium para sua rede com uma comunicacao elegante e atendimento direto.</p>
          {resellerHref ? (
            <a className="public-section-cta" href={resellerHref} rel="noreferrer" target="_blank">
              <MessageCircle size={18} strokeWidth={1.5} />
              Quero revender
            </a>
          ) : null}
        </div>
      </section>

      <section id="sobre" className="public-about-section">
        <div className="public-narrow-section">
          <span>Sobre a AQUA</span>
          <h2>{institutional.aboutTitle || 'Uma experiencia olfativa sofisticada'}</h2>
          <p>
            {institutional.aboutText
              || 'A AQUA cria fragrancias para transformar a rotina em uma experiencia sensorial elegante.'}
          </p>
        </div>
      </section>

      <section className="public-social-section">
        <div className="public-narrow-section">
          <span>Nos siga</span>
          <h2>Acompanhe a AQUA</h2>
          <div className="public-social-links">
            {store.instagramUrl ? (
              <a href={store.instagramUrl} rel="noreferrer" target="_blank">
                <ExternalLink size={20} strokeWidth={1.5} />
                <span>Instagram</span>
              </a>
            ) : null}
            {whatsappHref ? (
              <a href={whatsappHref} rel="noreferrer" target="_blank">
                <MessageCircle size={20} strokeWidth={1.5} />
                <span>WhatsApp</span>
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <footer className="public-footer">
        <div className="public-footer-top">
          <div>
            <span className="public-footer-logo">{brandName}</span>
            <p>{store.tagline || 'Perfumaria premium e sensorial.'}</p>
          </div>
          <nav aria-label="Links do rodape">
            <a href="#catalogo">Catalogo</a>
            <a href="#revendedores">Revendedores</a>
            <a href="#sobre">Sobre</a>
            {store.instagramUrl ? <a href={store.instagramUrl}>Instagram</a> : null}
            {whatsappHref ? <a href={whatsappHref}>Contato</a> : null}
          </nav>
        </div>
        <div className="public-footer-bottom">
          <p>© 2026 {brandName}. Todos os direitos reservados.</p>
          <div>
            <button type="button" onClick={() => setLegalModal('privacy')}>
              Privacidade
            </button>
            <span aria-hidden="true" />
            <button type="button" onClick={() => setLegalModal('terms')}>
              Termos de uso
            </button>
          </div>
        </div>
      </footer>

      <ProductModal product={selectedProduct} phone={store.whatsappPhone} onClose={() => setSelectedProduct(null)} />

      {legalModal ? (
        <div className="public-legal-overlay" onClick={() => setLegalModal(null)}>
          <div className="public-legal-modal" onClick={(event) => event.stopPropagation()}>
            <button
              aria-label="Fechar"
              className="public-modal-close"
              type="button"
              onClick={() => setLegalModal(null)}
            >
              <X size={20} strokeWidth={1} />
            </button>
            <h2>{legalModal === 'privacy' ? 'Politica de Privacidade' : 'Termos de Uso'}</h2>
            <p>
              {legalModal === 'privacy'
                ? legal.privacyPolicy || 'Politica de privacidade em atualizacao.'
                : legal.termsOfUse || 'Termos de uso em atualizacao.'}
            </p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
