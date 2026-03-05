/*
  Warnings:

  - You are about to drop the column `created_at` on the `admin_users` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `admin_users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `admin_users` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `admin_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin_users" DROP COLUMN "created_at",
DROP COLUMN "is_active",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "role" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "name_ru" SET DATA TYPE TEXT,
ALTER COLUMN "name_en" SET DATA TYPE TEXT,
ALTER COLUMN "name_uz" SET DATA TYPE TEXT,
ALTER COLUMN "slug" SET DATA TYPE TEXT,
ALTER COLUMN "image_url" SET DATA TYPE TEXT,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "import_logs" ALTER COLUMN "file_name" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "product_attributes" ALTER COLUMN "attribute_name" SET DATA TYPE TEXT,
ALTER COLUMN "attribute_value" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "product_images" ALTER COLUMN "image_url" SET DATA TYPE TEXT,
ALTER COLUMN "alt_text" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "sku" SET DATA TYPE TEXT,
ALTER COLUMN "name_ru" SET DATA TYPE TEXT,
ALTER COLUMN "name_en" SET DATA TYPE TEXT,
ALTER COLUMN "name_uz" SET DATA TYPE TEXT,
ALTER COLUMN "slug" SET DATA TYPE TEXT,
ALTER COLUMN "dimensions" SET DATA TYPE TEXT,
ALTER COLUMN "recommended_age" SET DATA TYPE TEXT,
ALTER COLUMN "material" SET DATA TYPE TEXT,
ALTER COLUMN "packaging_type" SET DATA TYPE TEXT,
ALTER COLUMN "availability" SET DATA TYPE TEXT,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "subcategories" ALTER COLUMN "name_ru" SET DATA TYPE TEXT,
ALTER COLUMN "name_en" SET DATA TYPE TEXT,
ALTER COLUMN "name_uz" SET DATA TYPE TEXT,
ALTER COLUMN "slug" SET DATA TYPE TEXT,
ALTER COLUMN "image_url" SET DATA TYPE TEXT,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "products_slug_idx" ON "products"("slug");
