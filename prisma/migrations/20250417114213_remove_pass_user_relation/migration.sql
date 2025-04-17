/*
  Warnings:

  - You are about to drop the column `userId` on the `Pass` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pass" DROP CONSTRAINT "Pass_userId_fkey";

-- AlterTable
ALTER TABLE "Pass" DROP COLUMN "userId";
