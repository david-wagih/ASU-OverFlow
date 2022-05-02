/*
  Warnings:

  - You are about to drop the column `TotalVotes` on the `Answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "TotalVotes",
ADD COLUMN     "DownVotes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "UpVotes" INTEGER NOT NULL DEFAULT 0;
