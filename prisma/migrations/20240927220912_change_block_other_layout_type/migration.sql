/*
  Warnings:

  - The primary key for the `Block` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "BlockLayout" DROP CONSTRAINT "BlockLayout_blockId_fkey";

-- AlterTable
ALTER TABLE "Block" DROP CONSTRAINT "Block_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Block_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Block_id_seq";

-- AlterTable
ALTER TABLE "BlockLayout" ALTER COLUMN "blockId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "BlockLayout" ADD CONSTRAINT "BlockLayout_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE CASCADE ON UPDATE CASCADE;
