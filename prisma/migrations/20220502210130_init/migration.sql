-- DropIndex
DROP INDEX "User_Question_Answer_userEmail_questionId_answerId_key";

-- AlterTable
ALTER TABLE "User_Question_Answer" ADD CONSTRAINT "User_Question_Answer_pkey" PRIMARY KEY ("userEmail", "questionId", "answerId");
