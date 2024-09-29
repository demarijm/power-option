/*
  Warnings:

  - The primary key for the `BlockLayout` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "BlockLayout" DROP CONSTRAINT "BlockLayout_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BlockLayout_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BlockLayout_id_seq";
