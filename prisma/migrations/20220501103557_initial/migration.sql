/*
  Warnings:

  - You are about to drop the column `DownVotes` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `UpVotes` on the `Answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "DownVotes",
DROP COLUMN "UpVotes",
ADD COLUMN     "TotalVotes" INTEGER NOT NULL DEFAULT 0;
