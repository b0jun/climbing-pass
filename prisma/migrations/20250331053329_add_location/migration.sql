/*
  Warnings:

  - You are about to drop the column `name_ko` on the `Gym` table. All the data in the column will be lost.
  - Made the column `logo` on table `Gym` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('ko', 'en');

-- AlterTable
ALTER TABLE "Gym" DROP COLUMN "name_ko",
ADD COLUMN     "location" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "location_en" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "logo" SET NOT NULL;

-- AlterTable
ALTER TABLE "Pass" ADD COLUMN     "locale" "Locale" NOT NULL DEFAULT 'ko';
