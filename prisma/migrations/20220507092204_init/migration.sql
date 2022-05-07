/*
  Warnings:

  - You are about to drop the column `hasPrivilege` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "isSolution" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hasPrivilege";
