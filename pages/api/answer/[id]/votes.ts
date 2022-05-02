/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// this api is to update the value of Total Votes for each Answer

//   http://localhost:3000/api/answer/[id]/votes

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const answer = await prisma.answer.update({
      where: { id: Number(id) },
      data: { TotalVotes: req.body.TotalVotes },
    });
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
