/*
  Warnings:

  - You are about to drop the column `layout` on the `Block` table. All the data in the column will be lost.
  - Added the required column `type` to the `Block` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BlockType" AS ENUM ('CHART', 'GRAPH', 'NOTES', 'NEWS');

-- AlterTable
ALTER TABLE "Block" DROP COLUMN "layout",
ADD COLUMN     "type" "BlockType" NOT NULL,
ALTER COLUMN "ticker" DROP NOT NULL;

-- CreateTable
CREATE TABLE "BlockLayout" (
    "id" SERIAL NOT NULL,
    "blockId" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "w" INTEGER NOT NULL,
    "h" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlockLayout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlockLayout_blockId_key" ON "BlockLayout"("blockId");

-- AddForeignKey
ALTER TABLE "BlockLayout" ADD CONSTRAINT "BlockLayout_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE CASCADE ON UPDATE CASCADE;
