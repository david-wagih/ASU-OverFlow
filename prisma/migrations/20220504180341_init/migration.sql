/*
  Warnings:

  - The primary key for the `User_Question_Answer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "User_Question_Answer" DROP CONSTRAINT "User_Question_Answer_pkey",
ADD CONSTRAINT "User_Question_Answer_pkey" PRIMARY KEY ("userEmail", "questionId", "answerId");
