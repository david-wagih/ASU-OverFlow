/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// this api is to get questions for a specific user

//   http://localhost:3000/api/question/user/[userEmail]

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userEmail } = req.query;
  try {
    const questions = await prisma.question.findMany({
      where: { userEmail: String(userEmail) },
    });
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
