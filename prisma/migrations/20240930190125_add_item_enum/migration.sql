/*
  Warnings:

  - Added the required column `display` to the `BlockMeta` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DisplayType" AS ENUM ('FOOTPRINT', 'TIMEANDSALES', 'VOLUMEPROFILE', 'TOP10MARKET', 'TOP10DARKPOOL', 'NEWS', 'UNUSUALOPTIONS', 'GAMMASUMMARY', 'GAMMAFLOW', 'DDOI', 'GEX', 'VEX', 'CHEX', 'DEX', 'SPEX', 'THEX', 'LEX', 'VEGEX', 'REX', 'VOEX', 'VEEX', 'ZEX', 'COEX', 'UEX');

-- AlterTable
ALTER TABLE "BlockMeta" ADD COLUMN     "display" "DisplayType" NOT NULL;
