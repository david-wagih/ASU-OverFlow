/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

//   http://localhost:3000/api/answer/[id]/votes

// this one is to say that i voted up or down for the first time

const postVote = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userEmail, answerId, questionId, upVoted, downVoted } = req.body;
  try {
    const vote = await prisma.user_Question_Answer.create({
      data: {
        userEmail: userEmail,
        answerId: Number(answerId),
        questionId: Number(questionId),
        upVoted: upVoted,
        downVoted: downVoted,
      },
    });
    res.status(200).json(vote);
  } catch (e) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

// this one is to update my vote for the same answer

const updateVote = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userEmail, answerId, questionId, upVoted, downVoted } = req.body;
  try {
    const vote = await prisma.user_Question_Answer.update({
      where: {
        userEmail_questionId_answerId: {
          userEmail: userEmail,
          questionId: Number(questionId),
          answerId: Number(answerId),
        },
      },
      data: {
        upVoted: upVoted,
        downVoted: downVoted,
      },
    });
    res.status(200).json(vote);
  } catch (e) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    postVote(req, res);
  } else if (req.method === "PUT") {
    updateVote(req, res);
  }
};
