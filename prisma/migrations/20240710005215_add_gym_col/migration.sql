/*
  Warnings:

  - You are about to drop the column `enName` on the `Gym` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gym" DROP COLUMN "enName",
ADD COLUMN     "name_en" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name_ko" TEXT NOT NULL DEFAULT '';
