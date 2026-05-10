import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const prisma = new PrismaClient();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogPath = path.resolve(__dirname, '../../src/data/products.json');

const parseEmailList = (value = '') =>
  value
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

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
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

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
