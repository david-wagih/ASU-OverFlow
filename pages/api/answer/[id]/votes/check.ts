/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

// http://localhost:3000/api/answer/[id]/votes/check

const checkifVoted = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userEmail, questionId, answerId } = req.body;
  try {
    const vote = await prisma.user_Question_Answer.findUnique({
      where: {
        userEmail_questionId_answerId: {
          userEmail: String(userEmail),
          questionId: Number(questionId),
          answerId: Number(answerId),
        },
      },
    });
    if (vote) {
      res.status(200).json({
        voted: true,
        upVoted: vote.upVoted,
        downVoted: vote.downVoted,
      });
    } else {
      res.status(200).json({
        voted: false,
      });
    }
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    checkifVoted(req, res);
  }
};
