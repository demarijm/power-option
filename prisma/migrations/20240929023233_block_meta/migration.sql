/*
  Warnings:

  - You are about to drop the column `ticker` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Block` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Block" DROP COLUMN "ticker",
DROP COLUMN "type",
ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "BlockMeta" (
    "blockId" TEXT NOT NULL,
    "type" "BlockType" NOT NULL,
    "ticker" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "BlockMeta_blockId_key" ON "BlockMeta"("blockId");

-- AddForeignKey
ALTER TABLE "BlockMeta" ADD CONSTRAINT "BlockMeta_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE CASCADE ON UPDATE CASCADE;
