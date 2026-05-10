import { getPrisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/format';

export default async function AdminPage() {
  const prisma = getPrisma();
  const [productCount, activeProductCount, categoryCount, saleCount, projected, confirmed, eventCount, sales] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { status: 'active' } }),
    prisma.category.count({ where: { isActive: true } }),
    prisma.sale.count(),
    prisma.sale.aggregate({
      where: { status: { in: ['pending', 'completed'] } },
      _sum: { total: true },
    }),
    prisma.sale.aggregate({
      where: { status: 'completed' },
      _sum: { total: true },
    }),
    prisma.event.count(),
    prisma.sale.findMany({
      orderBy: { soldAt: 'desc' },
      take: 5,
      include: { product: true },
    }),
  ]);

  return (
    <>
      <header className="admin-header">
        <div>
          <span className="eyebrow">Painel protegido</span>
          <h1>Operação AQUA</h1>
          <p className="muted">Dados vindos do Supabase Postgres via Prisma.</p>
        </div>
      </header>

      <section className="metric-grid">
        <article className="metric-card">
          <span>Produtos cadastrados</span>
          <strong>{productCount}</strong>
        </article>
        <article className="metric-card">
          <span>Produtos ativos</span>
          <strong>{activeProductCount}</strong>
        </article>
        <article className="metric-card">
          <span>Categorias ativas</span>
          <strong>{categoryCount}</strong>
        </article>
        <article className="metric-card">
          <span>Faturamento previsto</span>
          <strong>{formatCurrency(projected._sum.total)}</strong>
        </article>
        <article className="metric-card">
          <span>Faturamento confirmado</span>
          <strong>{formatCurrency(confirmed._sum.total)}</strong>
        </article>
        <article className="metric-card">
          <span>Vendas registradas</span>
          <strong>{saleCount}</strong>
        </article>
        <article className="metric-card">
          <span>Eventos registrados</span>
          <strong>{eventCount}</strong>
        </article>
      </section>

      <section className="admin-grid">
        <article className="admin-panel">
          <span>Vendas</span>
          <h2>Últimas vendas</h2>
          {sales.length ? (
            <table className="admin-table">
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id}>
                    <td>{sale.product?.name || 'Produto removido'}</td>
                    <td><span className="badge">{sale.status}</span></td>
                    <td>{formatCurrency(sale.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="muted">Nenhuma venda registrada ainda.</p>
          )}
        </article>

        <article className="admin-panel">
          <span>Permissões</span>
          <h2>Controle server-side ativo</h2>
          <p className="muted">
            O proxy redireciona visitantes sem sessão e este layout valida e-mail,
            status e role no servidor antes de renderizar o painel.
          </p>
        </article>
      </section>
    </>
  );
}
