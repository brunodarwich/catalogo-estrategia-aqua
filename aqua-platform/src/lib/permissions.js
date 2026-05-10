import { getPrisma } from './prisma';

export async function getAdminUser(email) {
  if (!email) return null;

  return getPrisma().adminUser.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export const isOperational = (adminUser) =>
  adminUser?.status === 'active' && ['operational', 'strategic'].includes(adminUser.role);

export const isStrategic = (adminUser) =>
  adminUser?.status === 'active' && adminUser.role === 'strategic';
