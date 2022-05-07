/*
  Warnings:

  - Made the column `isRestricted` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasPrivilege" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isRestricted" SET NOT NULL,
ALTER COLUMN "isRestricted" SET DEFAULT false;
