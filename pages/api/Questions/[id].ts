/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

//   localhost:3000/api/Questions/[id]

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const questions = await prisma.question.findUnique({
      where: { id: String(id) },
    });
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
