/* eslint-disable import/no-anonymous-default-export */
// http://localhost:3000/api/answer/[id]/update

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { questionId, content } = req.body;
  try {
    const answer = await prisma.answer.update({
      where: { id: Number(id) },
      data: { questionId, content },
    });
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
