import { createCategory, inactivateCategory, updateCategory } from '../actions';
import { requireAdminUser } from '@/lib/admin-auth';
import { getPrisma } from '@/lib/prisma';

export default async function AdminCategoriesPage() {
  await requireAdminUser({ strategicOnly: true });
  const categories = await getPrisma().category.findMany({
    orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    include: { _count: { select: { products: true } } },
  });

  return (
    <>
      <header className="admin-header">
        <div>
          <span className="eyebrow">Categorias</span>
          <h1>Organização do catálogo</h1>
          <p className="muted">Crie, edite, inative e ordene categorias com slug único.</p>
        </div>
      </header>

      <section className="admin-grid">
        <form action={createCategory} className="admin-panel admin-form">
          <span>Nova categoria</span>
          <h2>Criar categoria</h2>
          <label>
            Nome
            <input name="name" required />
          </label>
          <label>
            Slug
            <input name="slug" placeholder="gerado pelo nome se vazio" />
          </label>
          <label>
            Descrição
            <textarea name="description" rows="3" />
          </label>
          <label>
            Ordem
            <input name="displayOrder" type="number" defaultValue="0" />
          </label>
          <label className="check-label">
            <input name="isActive" type="checkbox" defaultChecked />
            Ativa
          </label>
          <button className="button" type="submit">Criar categoria</button>
        </form>

        <section className="admin-panel">
          <span>Existentes</span>
          <h2>Categorias cadastradas</h2>
          <div className="stack-list">
            {categories.map((category) => (
              <form action={updateCategory} className="inline-edit-card" key={category.id}>
                <input type="hidden" name="id" value={category.id} />
                <div className="inline-edit-heading">
                  <strong>{category.name}</strong>
                  <span className="badge">{category._count.products} produtos</span>
                </div>
                <div className="form-row">
                  <input name="name" defaultValue={category.name} required />
                  <input name="slug" defaultValue={category.slug} required />
                  <input name="displayOrder" type="number" defaultValue={category.displayOrder} />
                </div>
                <textarea name="description" rows="2" defaultValue={category.description || ''} />
                <label className="check-label">
                  <input name="isActive" type="checkbox" defaultChecked={category.isActive} />
                  Ativa
                </label>
                <div className="button-row">
                  <button className="button secondary" type="submit">Salvar</button>
                  <button className="button danger" type="submit" formAction={inactivateCategory}>Inativar</button>
                </div>
              </form>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
