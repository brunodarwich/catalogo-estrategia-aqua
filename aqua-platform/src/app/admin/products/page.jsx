import { createProduct, inactivateProduct, updateProduct } from '../actions';
import { requireAdminUser } from '@/lib/admin-auth';
import { formatCurrency } from '@/lib/format';
import { getPrisma } from '@/lib/prisma';

const statusLabels = {
  active: 'Ativo',
  draft: 'Rascunho',
  inactive: 'Inativo',
};

export default async function AdminProductsPage() {
  await requireAdminUser({ strategicOnly: true });
  const prisma = getPrisma();
  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      orderBy: [{ isActive: 'desc' }, { displayOrder: 'asc' }, { name: 'asc' }],
    }),
    prisma.product.findMany({
      orderBy: [{ isFeatured: 'desc' }, { status: 'asc' }, { name: 'asc' }],
      include: { category: true, _count: { select: { sales: true, events: true } } },
    }),
  ]);

  const activeProducts = products.filter((product) => product.status === 'active').length;
  const promotionalProducts = products.filter((product) => product.isPromotion).length;
  const featuredProducts = products.filter((product) => product.isFeatured).length;

  return (
    <>
      <header className="admin-header">
        <div>
          <span className="eyebrow">Catálogo</span>
          <h1>Produtos</h1>
          <p className="muted">
            Cadastro persistido com criação, edição e inativação real no banco. Esta área faz parte
            do painel estratégico completo.
          </p>
        </div>
      </header>

      <section className="metric-grid">
        <article className="metric-card">
          <span>Total cadastrados</span>
          <strong>{products.length}</strong>
        </article>
        <article className="metric-card">
          <span>Ativos</span>
          <strong>{activeProducts}</strong>
        </article>
        <article className="metric-card">
          <span>Em promoção</span>
          <strong>{promotionalProducts}</strong>
        </article>
        <article className="metric-card">
          <span>Destacados</span>
          <strong>{featuredProducts}</strong>
        </article>
      </section>

      <section className="admin-grid admin-grid--products">
        <section className="admin-panel admin-form">
          <div className="panel-heading">
            <div>
              <span>Novo produto</span>
              <h2>Criar produto</h2>
            </div>
            <span className="access-badge strategic">Estratégico</span>
          </div>

          <form action={createProduct} className="admin-form">
            <div className="form-row">
              <label>
                Nome
                <input name="name" required />
              </label>
              <label>
                SKU
                <input name="sku" required placeholder="AQUA-001" />
              </label>
              <label>
                Slug
                <input name="slug" placeholder="gerado pelo nome se vazio" />
              </label>
            </div>

            <div className="form-row">
              <label>
                Categoria
                <select name="categoryId" required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}{category.isActive ? '' : ' (inativa)'}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Status
                <select name="status" defaultValue="draft">
                  <option value="draft">Rascunho</option>
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </label>
              <label>
                Volume
                <input name="volume" placeholder="250 ml" />
              </label>
            </div>

            <div className="form-row">
              <label>
                Preço base
                <input name="price" type="number" min="0" step="0.01" required />
              </label>
              <label>
                Preço promocional
                <input name="promotionalPrice" type="number" min="0" step="0.01" placeholder="opcional" />
              </label>
              <label>
                Fragrância
                <input name="fragrance" placeholder="Notas principais" />
              </label>
            </div>

            <label>
              Descrição curta
              <input name="shortDescription" maxLength="180" placeholder="Resumo para cards e vitrines" />
            </label>

            <label>
              Descrição completa
              <textarea name="description" rows="4" />
            </label>

            <label>
              Imagens
              <textarea
                name="images"
                rows="3"
                placeholder="Uma URL por linha ou separadas por vírgula"
              />
            </label>

            <div className="form-row form-row--checks">
              <label className="check-label">
                <input name="isFeatured" type="checkbox" />
                Destacar no catálogo
              </label>
              <label className="check-label">
                <input name="isPromotion" type="checkbox" />
                Marcar como promoção
              </label>
            </div>

            <button className="button" type="submit">Criar produto</button>
          </form>
        </section>

        <section className="admin-panel">
          <div className="panel-heading">
            <div>
              <span>Base atual</span>
              <h2>Produtos cadastrados</h2>
            </div>
            <span className="badge">{products.length} itens</span>
          </div>

          <div className="stack-list">
            {products.map((product) => (
              <form action={updateProduct} className="inline-edit-card" key={product.id}>
                <input type="hidden" name="id" value={product.id} />

                <div className="inline-edit-heading">
                  <div>
                    <strong>{product.name}</strong>
                    <div className="inline-meta">
                      <span>{product.sku}</span>
                      <span>{product.category.name}</span>
                      <span>{formatCurrency(product.promotionalPrice || product.price)}</span>
                    </div>
                  </div>
                  <div className="inline-badges">
                    <span className="badge">{statusLabels[product.status]}</span>
                    {product.isFeatured ? <span className="badge">Destaque</span> : null}
                    {product.isPromotion ? <span className="badge">Promoção</span> : null}
                  </div>
                </div>

                <p className="muted compact-muted">
                  {product._count.sales} venda(s) vinculada(s) · {product._count.events} evento(s) de analytics
                </p>

                <div className="form-row">
                  <label>
                    Nome
                    <input name="name" defaultValue={product.name} required />
                  </label>
                  <label>
                    SKU
                    <input name="sku" defaultValue={product.sku} required />
                  </label>
                  <label>
                    Slug
                    <input name="slug" defaultValue={product.slug} required />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Categoria
                    <select name="categoryId" defaultValue={product.categoryId}>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}{category.isActive ? '' : ' (inativa)'}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Status
                    <select name="status" defaultValue={product.status}>
                      <option value="draft">Rascunho</option>
                      <option value="active">Ativo</option>
                      <option value="inactive">Inativo</option>
                    </select>
                  </label>
                  <label>
                    Volume
                    <input name="volume" defaultValue={product.volume || ''} />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Preço base
                    <input
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue={Number(product.price)}
                    />
                  </label>
                  <label>
                    Preço promocional
                    <input
                      name="promotionalPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue={product.promotionalPrice ? Number(product.promotionalPrice) : ''}
                    />
                  </label>
                  <label>
                    Fragrância
                    <input name="fragrance" defaultValue={product.fragrance || ''} />
                  </label>
                </div>

                <label>
                  Descrição curta
                  <input name="shortDescription" defaultValue={product.shortDescription || ''} />
                </label>

                <label>
                  Descrição completa
                  <textarea name="description" rows="3" defaultValue={product.description || ''} />
                </label>

                <label>
                  Imagens
                  <textarea name="images" rows="2" defaultValue={product.images.join('\n')} />
                </label>

                <div className="form-row form-row--checks">
                  <label className="check-label">
                    <input name="isFeatured" type="checkbox" defaultChecked={product.isFeatured} />
                    Destacar no catálogo
                  </label>
                  <label className="check-label">
                    <input name="isPromotion" type="checkbox" defaultChecked={product.isPromotion} />
                    Marcar como promoção
                  </label>
                </div>

                <div className="button-row">
                  <button className="button secondary" type="submit">Salvar produto</button>
                  <button className="button danger" type="submit" formAction={inactivateProduct}>Inativar</button>
                </div>
              </form>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
