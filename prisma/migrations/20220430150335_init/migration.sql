/*
  Warnings:

  - Added the required column `content` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "content" TEXT NOT NULL;
