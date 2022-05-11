/* eslint-disable import/no-anonymous-default-export */
// http://localhost:3000/api/answer/[id]/update

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, content, userEmail } = req.body;
  try {
    const answer = await prisma.answer.update({
      where: { id: Number(id) },
      data: {
        content: content,
        userEmail: userEmail,
      },
    });
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
