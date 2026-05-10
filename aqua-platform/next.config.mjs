/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client', 'prisma'],
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
