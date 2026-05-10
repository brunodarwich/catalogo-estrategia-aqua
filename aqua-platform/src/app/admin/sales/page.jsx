import { cancelSale, createSale, updateSale } from '../actions';
import { getPrisma } from '@/lib/prisma';
import { formatCurrency, formatDate } from '@/lib/format';

const statusLabels = {
  pending: 'Pendente',
  completed: 'Confirmada',
  cancelled: 'Cancelada',
};

export default async function AdminSalesPage() {
  const prisma = getPrisma();
  const [products, sales] = await Promise.all([
    prisma.product.findMany({
      where: { status: { not: 'inactive' } },
      orderBy: { name: 'asc' },
    }),
    prisma.sale.findMany({
      orderBy: { soldAt: 'desc' },
      include: { product: true },
    }),
  ]);

  return (
    <>
      <header className="admin-header">
        <div>
          <span className="eyebrow">Vendas</span>
          <h1>Registro comercial</h1>
          <p className="muted">Cadastre vendas manuais, edite status e acompanhe totais calculados.</p>
        </div>
      </header>

      <section className="admin-grid">
        <form action={createSale} className="admin-panel admin-form">
          <span>Nova venda</span>
          <h2>Registrar manualmente</h2>

          <label>
            Produto
            <select name="productId" defaultValue="">
              <option value="">Venda sem produto vinculado</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </label>

          <label>
            Cliente
            <input name="customerName" placeholder="Nome do cliente" />
          </label>

          <div className="form-row">
            <label>
              Canal
              <input name="channel" placeholder="WhatsApp" />
            </label>
            <label>
              Status
              <select name="status" defaultValue="pending">
                <option value="pending">Pendente</option>
                <option value="completed">Confirmada</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Quantidade
              <input name="quantity" type="number" min="1" defaultValue="1" />
            </label>
            <label>
              Valor unitário
              <input name="unitPrice" type="number" min="0" step="0.01" required />
            </label>
          </div>

          <label>
            Observações
            <textarea name="notes" rows="3" />
          </label>

          <button className="button" type="submit">Registrar venda</button>
        </form>

        <section className="admin-panel">
          <span>Histórico</span>
          <h2>Vendas registradas</h2>
          <div className="stack-list">
            {sales.map((sale) => (
              <form action={updateSale} className="inline-edit-card" key={sale.id}>
                <input type="hidden" name="id" value={sale.id} />
                <div className="inline-edit-heading">
                  <strong>{sale.product?.name || 'Produto avulso'}</strong>
                  <span className="badge">{statusLabels[sale.status]}</span>
                </div>
                <span>{formatDate(sale.soldAt)} · Total {formatCurrency(sale.total)}</span>

                <div className="form-row">
                  <input name="customerName" defaultValue={sale.customerName || ''} placeholder="Cliente" />
                  <input name="channel" defaultValue={sale.channel || ''} placeholder="Canal" />
                </div>
                <div className="form-row">
                  <select name="status" defaultValue={sale.status}>
                    <option value="pending">Pendente</option>
                    <option value="completed">Confirmada</option>
                    <option value="cancelled">Cancelada</option>
                  </select>
                  <input name="quantity" type="number" min="1" defaultValue={sale.quantity} />
                  <input name="unitPrice" type="number" min="0" step="0.01" defaultValue={Number(sale.unitPrice)} />
                </div>
                <textarea name="notes" rows="2" defaultValue={sale.notes || ''} placeholder="Observações" />
                <div className="button-row">
                  <button className="button secondary" type="submit">Salvar edição</button>
                  <button className="button danger" type="submit" formAction={cancelSale}>Cancelar venda</button>
                </div>
              </form>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
