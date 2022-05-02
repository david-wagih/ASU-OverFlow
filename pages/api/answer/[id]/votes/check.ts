/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

// http://localhost:3000/api/answer/[id]/votes/check

const checkifVoted = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userEmail, answerId, questionId } = req.body;
  try {
    const vote = await prisma.user_Question_Answer.findUnique({
      where: {
        userEmail_questionId_answerId: {
          userEmail: userEmail,
          questionId: Number(questionId),
          answerId: Number(answerId),
        },
      },
    });
    res.status(200).json(vote);
  } catch (e) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    checkifVoted(req, res);
  }
};
