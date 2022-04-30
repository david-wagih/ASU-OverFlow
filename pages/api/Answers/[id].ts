/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

//   localhost:3000/api/Answers/[id]

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const answers = await prisma.answer.findMany({
      where: { questionId: String(id) },
    });
    res.status(200).json(answers);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
