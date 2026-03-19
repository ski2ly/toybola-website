-- CreateTable
CREATE TABLE "page_blocks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "page" TEXT NOT NULL,
    "blockType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL DEFAULT 'white',
    "paddingTop" TEXT NOT NULL DEFAULT 'lg',
    "paddingBottom" TEXT NOT NULL DEFAULT 'lg',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "page_blocks_page_order_idx" ON "page_blocks"("page", "order");

-- CreateIndex
CREATE INDEX "page_blocks_page_isEnabled_idx" ON "page_blocks"("page", "isEnabled");
