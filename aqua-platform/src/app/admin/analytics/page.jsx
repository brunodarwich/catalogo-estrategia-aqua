import { recordInternalEvent } from '../actions';
import { requireAdminUser } from '@/lib/admin-auth';
import { getPrisma } from '@/lib/prisma';

const typeLabels = {
  page_view: 'Visualizações de página',
  product_view: 'Visualizações de produto',
  category_view: 'Visualizações de categoria',
  whatsapp_click: 'Cliques no WhatsApp',
  promotion_click: 'Cliques em promoção',
  reseller_cta_click: 'Cliques em revendedor',
};

export default async function AdminAnalyticsPage() {
  await requireAdminUser({ strategicOnly: true });
  const prisma = getPrisma();
  const [products, categories, typeCounts, productViews, sourceCounts] = await Promise.all([
    prisma.product.findMany({ orderBy: { name: 'asc' } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.event.groupBy({
      by: ['type'],
      _count: { _all: true },
      orderBy: { _count: { type: 'desc' } },
    }),
    prisma.event.groupBy({
      by: ['productId'],
      where: { type: 'product_view', productId: { not: null } },
      _count: { _all: true },
      orderBy: { _count: { productId: 'desc' } },
      take: 8,
    }),
    prisma.event.groupBy({
      by: ['source'],
      _count: { _all: true },
      orderBy: { _count: { source: 'desc' } },
      take: 8,
    }),
  ]);

  const productsById = new Map(products.map((product) => [product.id, product.name]));

  return (
    <>
      <header className="admin-header">
        <div>
          <span className="eyebrow">Analytics</span>
          <h1>Eventos de negócio</h1>
          <p className="muted">Eventos mínimos em Postgres, sem armazenamento de IP bruto.</p>
        </div>
      </header>

      <section className="admin-grid">
        <form action={recordInternalEvent} className="admin-panel admin-form">
          <span>Teste manual</span>
          <h2>Registrar evento</h2>
          <label>
            Tipo
            <select name="type" defaultValue="page_view">
              {Object.entries(typeLabels).map(([type, label]) => (
                <option key={type} value={type}>{label}</option>
              ))}
            </select>
          </label>
          <label>
            Produto
            <select name="productId" defaultValue="">
              <option value="">Nenhum</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </label>
          <label>
            Categoria
            <select name="categoryId" defaultValue="">
              <option value="">Nenhuma</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <label>
            Caminho
            <input name="path" placeholder="/catalogo" />
          </label>
          <label>
            Origem
            <input name="source" placeholder="instagram" />
          </label>
          <button className="button" type="submit">Registrar evento</button>
        </form>

        <section className="admin-panel">
          <span>Resumo</span>
          <h2>Eventos por tipo</h2>
          <table className="admin-table">
            <tbody>
              {typeCounts.map((row) => (
                <tr key={row.type}>
                  <td>{typeLabels[row.type]}</td>
                  <td>{row._count._all}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="admin-panel">
          <span>Catálogo</span>
          <h2>Produtos mais vistos</h2>
          <table className="admin-table">
            <tbody>
              {productViews.map((row) => (
                <tr key={row.productId}>
                  <td>{productsById.get(row.productId) || row.productId}</td>
                  <td>{row._count._all}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="admin-panel">
          <span>Origem</span>
          <h2>Fontes de tráfego</h2>
          <table className="admin-table">
            <tbody>
              {sourceCounts.map((row) => (
                <tr key={row.source || 'direct'}>
                  <td>{row.source || 'direct'}</td>
                  <td>{row._count._all}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
}
