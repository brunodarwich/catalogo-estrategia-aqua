-- CreateEnum
CREATE TYPE "Role" AS ENUM ('operational', 'strategic');

-- CreateEnum
CREATE TYPE "AdminStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('active', 'inactive', 'draft');

-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('pending', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('page_view', 'product_view', 'category_view', 'whatsapp_click', 'promotion_click', 'reseller_cta_click');

-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'operational',
    "status" "AdminStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "promotionalPrice" DECIMAL(10,2),
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "fragrance" TEXT,
    "volume" TEXT,
    "status" "ProductStatus" NOT NULL DEFAULT 'draft',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPromotion" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "customerName" TEXT,
    "channel" TEXT,
    "status" "SaleStatus" NOT NULL DEFAULT 'pending',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "notes" TEXT,
    "soldAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "productId" TEXT,
    "categoryId" TEXT,
    "path" TEXT,
    "referrer" TEXT,
    "source" TEXT,
    "metadata" JSONB,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_settings" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_settings_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE INDEX "products_categoryId_idx" ON "products"("categoryId");

-- CreateIndex
CREATE INDEX "products_status_idx" ON "products"("status");

-- CreateIndex
CREATE INDEX "sales_status_idx" ON "sales"("status");

-- CreateIndex
CREATE INDEX "sales_soldAt_idx" ON "sales"("soldAt");

-- CreateIndex
CREATE INDEX "events_type_idx" ON "events"("type");

-- CreateIndex
CREATE INDEX "events_productId_idx" ON "events"("productId");

-- CreateIndex
CREATE INDEX "events_categoryId_idx" ON "events"("categoryId");

-- CreateIndex
CREATE INDEX "events_occurredAt_idx" ON "events"("occurredAt");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
