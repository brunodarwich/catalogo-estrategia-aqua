import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPaths = [
  path.resolve(__dirname, './seed-data.json'),
  path.resolve(__dirname, '../../src/data/products.json'),
];

const defaultStoreSettings = {
  name: 'AQUA',
  whatsappPhone: '',
  instagramUrl: '',
  logoUrl: '',
  hero: {
    videoSrc: '',
    posterSrc: '',
  },
  institutional: {
    aboutTitle: 'Sobre a AQUA',
    aboutText: '',
  },
  legal: {
    privacyPolicy: '',
    termsOfUse: '',
  },
};

const parseEmailList = (value = '') =>
  value
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

function loadCatalog() {
  const catalogPath = catalogPaths.find((candidate) => fs.existsSync(candidate));

  if (!catalogPath) {
    return {
      categories: [],
      products: [],
      store: defaultStoreSettings,
      source: null,
    };
  }

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

  return {
    categories: Array.isArray(catalog.categories) ? catalog.categories : [],
    products: Array.isArray(catalog.products) ? catalog.products : [],
    store: catalog.store && typeof catalog.store === 'object'
      ? { ...defaultStoreSettings, ...catalog.store }
      : defaultStoreSettings,
    source: catalogPath,
  };
}

async function seedAdmins() {
  const strategicEmails = parseEmailList(process.env.AQUA_INITIAL_STRATEGIC_EMAILS);
  const operationalEmails = parseEmailList(process.env.AQUA_INITIAL_OPERATIONAL_EMAILS);

  for (const email of strategicEmails) {
    await prisma.adminUser.upsert({
      where: { email },
      update: { role: 'strategic', status: 'active' },
      create: { email, role: 'strategic', status: 'active' },
    });
  }

  for (const email of operationalEmails) {
    await prisma.adminUser.upsert({
      where: { email },
      update: { role: 'operational', status: 'active' },
      create: { email, role: 'operational', status: 'active' },
    });
  }
}

async function main() {
  const catalog = loadCatalog();

  for (const category of catalog.categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: category,
      create: category,
    });
  }

  for (const product of catalog.products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }

  await prisma.storeSetting.upsert({
    where: { key: 'store' },
    update: { value: catalog.store },
    create: { key: 'store', value: catalog.store },
  });

  await seedAdmins();

  if (catalog.source) {
    console.log(`Seed concluido com dados de ${catalog.source}`);
  } else {
    console.log('Seed concluido com configuracao padrao da loja e usuarios admins.');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
