-- CreateTable
CREATE TABLE "User_Question_Answer" (
    "id" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,
    "upVoted" BOOLEAN NOT NULL,
    "downVoted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_Question_Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User_Question_Answer" ADD CONSTRAINT "User_Question_Answer_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Question_Answer" ADD CONSTRAINT "User_Question_Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Question_Answer" ADD CONSTRAINT "User_Question_Answer_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
