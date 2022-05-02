-- AlterTable
ALTER TABLE "User_Question_Answer" ALTER COLUMN "upVoted" DROP NOT NULL,
ALTER COLUMN "upVoted" SET DEFAULT false,
ALTER COLUMN "downVoted" DROP NOT NULL,
ALTER COLUMN "downVoted" SET DEFAULT false;
