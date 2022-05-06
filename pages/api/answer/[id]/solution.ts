/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/answer/[id]/solution

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { answerId, isSolution } = req.body;
  const updatedSolution = await prisma.answer.update({
    where: { id: Number(answerId) },
    data: {
      // @ts-ignore
      isSolution,
    },
  });
  res.status(200).json(updatedSolution);
};
