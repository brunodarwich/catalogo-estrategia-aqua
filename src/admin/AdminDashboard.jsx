import { useMemo, useState } from 'react';
import {
  Archive,
  BadgeDollarSign,
  BarChart3,
  Boxes,
  ExternalLink,
  LayoutDashboard,
  Package,
  Pencil,
  Plus,
  Save,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import {
  formatPrice,
  getCategoryById,
  listCatalogCategories,
  listCatalogProducts,
  storeSettings,
} from '../data/catalog';
import { mockAdminUser, mockSales, mockTrafficMetrics } from './mockAdminData';
import './AdminDashboard.css';

const roleLabels = {
  operational: 'Operacional',
  strategic: 'Estratégico',
};

const statusLabels = {
  active: 'Ativo',
  inactive: 'Inativo',
  draft: 'Rascunho',
  completed: 'Confirmada',
  pending: 'Pendente',
};

const initialProductForm = (categories) => ({
  id: '',
  sku: '',
  name: '',
  categoryId: categories[0]?.id || '',
  price: '',
  promotionalPrice: '',
  fragrance: '',
  volume: '',
  status: 'draft',
  shortDescription: '',
  description: '',
  isFeatured: false,
  isPromotion: false,
});

const slugify = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const getRevenue = (sales, statuses) =>
  sales
    .filter((sale) => statuses.includes(sale.status))
    .reduce((total, sale) => total + sale.total, 0);

const AdminDashboard = () => {
  const categories = listCatalogCategories();
  const [activeView, setActiveView] = useState('overview');
  const [products, setProducts] = useState(() => listCatalogProducts());
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productForm, setProductForm] = useState(() => initialProductForm(categories));
  const [formMode, setFormMode] = useState('create');

  const isAuthorized = mockAdminUser.status === 'active';

  const activeProducts = products.filter((product) => product.status === 'active');
  const promotionalProducts = activeProducts.filter((product) => product.isPromotion);
  const projectedRevenue = getRevenue(mockSales, ['pending', 'completed']);
  const confirmedRevenue = getRevenue(mockSales, ['completed']);

  const metrics = [
    {
      label: 'Visitas totais',
      value: mockTrafficMetrics.visitsTotal.toLocaleString('pt-BR'),
      detail: `${mockTrafficMetrics.productViews} visualizações de produto`,
      icon: BarChart3,
    },
    {
      label: 'Faturamento previsto',
      value: formatPrice(projectedRevenue),
      detail: 'Pendentes + confirmadas',
      icon: TrendingUp,
    },
    {
      label: 'Faturamento confirmado',
      value: formatPrice(confirmedRevenue),
      detail: `${mockSales.filter((sale) => sale.status === 'completed').length} vendas concluídas`,
      icon: BadgeDollarSign,
    },
    {
      label: 'Produtos ativos',
      value: activeProducts.length.toString(),
      detail: `${promotionalProducts.length} em promoção`,
      icon: Package,
    },
  ];

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery = normalizedQuery
        ? `${product.name} ${product.sku} ${product.fragrance}`.toLowerCase().includes(normalizedQuery)
        : true;
      const matchesCategory = categoryFilter === 'all' || product.categoryId === categoryFilter;
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;

      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [products, query, categoryFilter, statusFilter]);

  const recentProducts = products.slice(0, 5);

  const handleNewProduct = () => {
    setFormMode('create');
    setProductForm(initialProductForm(categories));
    setActiveView('products');
  };

  const handleEditProduct = (product) => {
    setFormMode('edit');
    setProductForm({
      ...product,
      price: String(product.price),
      promotionalPrice: product.promotionalPrice ? String(product.promotionalPrice) : '',
    });
    setActiveView('products');
  };

  const handleFormChange = (event) => {
    const { name, type, checked, value } = event.target;

    setProductForm((currentForm) => ({
      ...currentForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveProduct = (event) => {
    event.preventDefault();

    const price = Number(productForm.price) || 0;
    const promotionalPrice = productForm.promotionalPrice
      ? Number(productForm.promotionalPrice)
      : null;

    const normalizedProduct = {
      ...productForm,
      id: productForm.id || `mock-${Date.now()}`,
      sku: productForm.sku || `MOCK-${products.length + 1}`,
      slug: productForm.slug || slugify(`${productForm.name}-${productForm.volume || 'produto'}`),
      price,
      promotionalPrice,
      images: productForm.images || [],
      isPromotion: Boolean(productForm.isPromotion && promotionalPrice),
      isFeatured: Boolean(productForm.isFeatured),
    };

    setProducts((currentProducts) => {
      if (formMode === 'edit') {
        return currentProducts.map((product) =>
          product.id === normalizedProduct.id ? normalizedProduct : product,
        );
      }

      return [normalizedProduct, ...currentProducts];
    });

    setFormMode('edit');
    setProductForm({
      ...normalizedProduct,
      price: String(normalizedProduct.price),
      promotionalPrice: normalizedProduct.promotionalPrice ? String(normalizedProduct.promotionalPrice) : '',
    });
  };

  const handleInactivateProduct = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, status: 'inactive' } : product,
      ),
    );

    if (productForm.id === productId) {
      setProductForm((currentForm) => ({ ...currentForm, status: 'inactive' }));
    }
  };

  if (!isAuthorized) {
    return (
      <main className="admin-auth-state">
        <div className="admin-auth-panel">
          <XCircle size={34} strokeWidth={1.5} />
          <span>Acesso bloqueado</span>
          <h1>Usuário não autorizado</h1>
          <p>Este estado será conectado ao Google OAuth e à tabela admin_users na fase backend.</p>
          <a href="/" className="admin-auth-link">
            Voltar para o site
          </a>
        </div>
      </main>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a href="/" className="admin-brand" aria-label="Voltar para o site público">
          <span className="admin-brand-mark">A</span>
          <span>{storeSettings.name}</span>
        </a>

        <nav className="admin-nav" aria-label="Navegação interna">
          <button
            type="button"
            className={`admin-nav-item ${activeView === 'overview' ? 'is-active' : ''}`}
            onClick={() => setActiveView('overview')}
          >
            <LayoutDashboard size={18} strokeWidth={1.5} />
            Visão geral
          </button>
          <button
            type="button"
            className={`admin-nav-item ${activeView === 'products' ? 'is-active' : ''}`}
            onClick={() => setActiveView('products')}
          >
            <Boxes size={18} strokeWidth={1.5} />
            Produtos
          </button>
        </nav>

        <div className="admin-user">
          <ShieldCheck size={18} strokeWidth={1.5} />
          <div>
            <strong>{mockAdminUser.name}</strong>
            <span>{roleLabels[mockAdminUser.role]}</span>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <div>
            <span className="admin-kicker">Painel mockado</span>
            <h1>{activeView === 'overview' ? 'Operação AQUA' : 'Gestão de produtos'}</h1>
            <p>Dados locais em memória, preparados para migrar para `/admin` no Next.js.</p>
          </div>
          <div className="admin-header-actions">
            <span className="admin-mode-badge">
              <Sparkles size={15} strokeWidth={1.5} />
              Mock
            </span>
            <a href="/" className="admin-site-link">
              <ExternalLink size={16} strokeWidth={1.5} />
              Site público
            </a>
          </div>
        </header>

        {activeView === 'overview' ? (
          <section className="admin-view">
            <div className="admin-metrics">
              {metrics.map((metric) => {
                const Icon = metric.icon;

                return (
                  <article className="admin-metric" key={metric.label}>
                    <div className="admin-metric-icon">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                    <small>{metric.detail}</small>
                  </article>
                );
              })}
            </div>

            <div className="admin-overview-grid">
              <section className="admin-panel">
                <div className="admin-panel-heading">
                  <div>
                    <span>Vendas</span>
                    <h2>Últimas vendas</h2>
                  </div>
                  <ShoppingBag size={19} strokeWidth={1.5} />
                </div>

                <div className="admin-sales-list">
                  {mockSales.map((sale) => (
                    <article className="admin-sale-row" key={sale.id}>
                      <div>
                        <strong>{sale.customerName}</strong>
                        <span>{sale.productName} · {sale.channel}</span>
                      </div>
                      <div className="admin-sale-meta">
                        <span className={`admin-status admin-status--${sale.status}`}>
                          {statusLabels[sale.status]}
                        </span>
                        <strong>{formatPrice(sale.total)}</strong>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="admin-panel">
                <div className="admin-panel-heading">
                  <div>
                    <span>Catálogo</span>
                    <h2>Produtos recentes</h2>
                  </div>
                  <Package size={19} strokeWidth={1.5} />
                </div>

                <div className="admin-compact-list">
                  {recentProducts.map((product) => (
                    <button
                      type="button"
                      className="admin-product-compact"
                      key={product.id}
                      onClick={() => handleEditProduct(product)}
                    >
                      <span>
                        <strong>{product.name}</strong>
                        <small>{getCategoryById(product.categoryId)?.name || 'Sem categoria'}</small>
                      </span>
                      <span className={`admin-status admin-status--${product.status}`}>
                        {statusLabels[product.status]}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="admin-panel admin-panel--wide">
                <div className="admin-panel-heading">
                  <div>
                    <span>Promoções</span>
                    <h2>Produtos em promoção</h2>
                  </div>
                  <BadgeDollarSign size={19} strokeWidth={1.5} />
                </div>

                <div className="admin-promo-strip">
                  {promotionalProducts.map((product) => (
                    <article className="admin-promo-item" key={product.id}>
                      <span>{product.name}</span>
                      <strong>{formatPrice(product.promotionalPrice || product.price)}</strong>
                      <small>{formatPrice(product.price)}</small>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </section>
        ) : (
          <section className="admin-view admin-products-view">
            <div className="admin-toolbar">
              <label className="admin-search">
                <Search size={18} strokeWidth={1.5} />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar produto"
                />
              </label>

              <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                <option value="all">Todas as categorias</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>{category.name}</option>
                ))}
              </select>

              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="all">Todos os status</option>
                <option value="active">Ativos</option>
                <option value="draft">Rascunhos</option>
                <option value="inactive">Inativos</option>
              </select>

              <button type="button" className="admin-primary-button" onClick={handleNewProduct}>
                <Plus size={17} strokeWidth={1.5} />
                Novo produto
              </button>
            </div>

            <div className="admin-products-layout">
              <section className="admin-panel admin-product-list-panel">
                <div className="admin-table-header">
                  <span>Produto</span>
                  <span>Categoria</span>
                  <span>Preço</span>
                  <span>Status</span>
                  <span>Ações</span>
                </div>

                <div className="admin-table-body">
                  {filteredProducts.map((product) => (
                    <article className="admin-product-row" key={product.id}>
                      <div className="admin-product-main">
                        <strong>{product.name}</strong>
                        <span>Cód. {product.sku}</span>
                      </div>
                      <span>{getCategoryById(product.categoryId)?.name || 'Sem categoria'}</span>
                      <span>{formatPrice(product.promotionalPrice || product.price)}</span>
                      <span className={`admin-status admin-status--${product.status}`}>
                        {statusLabels[product.status]}
                      </span>
                      <div className="admin-row-actions">
                        <button type="button" onClick={() => handleEditProduct(product)} aria-label={`Editar ${product.name}`}>
                          <Pencil size={16} strokeWidth={1.5} />
                        </button>
                        <button type="button" onClick={() => handleInactivateProduct(product.id)} aria-label={`Inativar ${product.name}`}>
                          <Archive size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <form className="admin-panel admin-product-form" onSubmit={handleSaveProduct}>
                <div className="admin-panel-heading">
                  <div>
                    <span>{formMode === 'edit' ? 'Edição local' : 'Cadastro local'}</span>
                    <h2>{formMode === 'edit' ? productForm.name || 'Produto' : 'Novo produto'}</h2>
                  </div>
                  <button type="submit" className="admin-save-button">
                    <Save size={17} strokeWidth={1.5} />
                    Salvar
                  </button>
                </div>

                <label>
                  Nome
                  <input name="name" value={productForm.name} onChange={handleFormChange} required />
                </label>

                <div className="admin-form-grid">
                  <label>
                    Código
                    <input name="sku" value={productForm.sku} onChange={handleFormChange} />
                  </label>
                  <label>
                    Volume
                    <input name="volume" value={productForm.volume} onChange={handleFormChange} />
                  </label>
                </div>

                <label>
                  Categoria
                  <select name="categoryId" value={productForm.categoryId} onChange={handleFormChange}>
                    {categories.map((category) => (
                      <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                  </select>
                </label>

                <div className="admin-form-grid">
                  <label>
                    Preço
                    <input name="price" type="number" min="0" step="0.01" value={productForm.price} onChange={handleFormChange} required />
                  </label>
                  <label>
                    Preço promocional
                    <input name="promotionalPrice" type="number" min="0" step="0.01" value={productForm.promotionalPrice} onChange={handleFormChange} />
                  </label>
                </div>

                <label>
                  Fragrância
                  <input name="fragrance" value={productForm.fragrance} onChange={handleFormChange} />
                </label>

                <label>
                  Descrição curta
                  <input name="shortDescription" value={productForm.shortDescription} onChange={handleFormChange} />
                </label>

                <label>
                  Descrição
                  <textarea name="description" rows="4" value={productForm.description} onChange={handleFormChange} />
                </label>

                <label>
                  Status
                  <select name="status" value={productForm.status} onChange={handleFormChange}>
                    <option value="active">Ativo</option>
                    <option value="draft">Rascunho</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </label>

                <div className="admin-check-row">
                  <label>
                    <input name="isFeatured" type="checkbox" checked={productForm.isFeatured} onChange={handleFormChange} />
                    Destaque
                  </label>
                  <label>
                    <input name="isPromotion" type="checkbox" checked={productForm.isPromotion} onChange={handleFormChange} />
                    Promoção
                  </label>
                </div>
              </form>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
