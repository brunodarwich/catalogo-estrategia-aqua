import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

export async function GET() {
  const setting = await getPrisma().storeSetting.findUnique({
    where: { key: 'store' },
  });

  return NextResponse.json(setting?.value || {});
}
