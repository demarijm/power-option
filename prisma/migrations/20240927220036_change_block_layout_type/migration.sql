/*
  Warnings:

  - The primary key for the `View` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_viewId_fkey";

-- AlterTable
ALTER TABLE "Block" ALTER COLUMN "viewId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "View" DROP CONSTRAINT "View_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "View_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "View_id_seq";

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "View"("id") ON DELETE CASCADE ON UPDATE CASCADE;
