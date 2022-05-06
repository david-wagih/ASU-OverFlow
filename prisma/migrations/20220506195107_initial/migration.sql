/*
  Warnings:

  - Added the required column `answerId` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_id_fkey";

-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "answerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
