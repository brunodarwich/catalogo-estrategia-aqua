import { getPrisma } from '@/lib/prisma';
import PublicCatalog from '@/components/public-catalog';

export const dynamic = 'force-dynamic';

const getStore = (value) => (value && typeof value === 'object' ? value : {});

export default async function HomePage({ searchParams }) {
  void searchParams;
  const prisma = getPrisma();
  const [setting, categories, products] = await Promise.all([
    prisma.storeSetting.findUnique({ where: { key: 'store' } }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    }),
    prisma.product.findMany({
      where: {
        status: 'active',
        category: { isActive: true },
      },
      include: {
        category: true,
      },
      orderBy: [{ isFeatured: 'desc' }, { isPromotion: 'desc' }, { name: 'asc' }],
    }),
  ]);

  const serializedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
    promotionalPrice: product.promotionalPrice ? Number(product.promotionalPrice) : null,
  }));

  return (
    <PublicCatalog
      categories={categories}
      products={serializedProducts}
      store={getStore(setting?.value)}
    />
  );
}
