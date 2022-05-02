/*
  Warnings:

  - The primary key for the `User_Question_Answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User_Question_Answer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail,questionId,answerId]` on the table `User_Question_Answer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User_Question_Answer" DROP CONSTRAINT "User_Question_Answer_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "User_Question_Answer_userEmail_questionId_answerId_key" ON "User_Question_Answer"("userEmail", "questionId", "answerId");
