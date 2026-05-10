import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

let prisma;
let adapter;
let pool;

const { Pool } = pg;

function getAdapter() {
  if (!adapter) {
    const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
    adapter = new PrismaPg(pool);
  }

  return adapter;
}

export function getPrisma() {
  if (!prisma) {
    prisma = new PrismaClient({ adapter: getAdapter() });
  }

  return prisma;
}
