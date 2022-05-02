/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

//   http://localhost:3000/api/answer/question/[questionId]
// get all the answers for a specific question

const getAllAnswers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { questionId } = req.query;
  try {
    const answers = await prisma.answer.findMany({
      where: { questionId: Number(questionId) },
    });
    res.status(200).json(answers);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export default function QuestionRouteshandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    getAllAnswers(req, res);
  }
}
