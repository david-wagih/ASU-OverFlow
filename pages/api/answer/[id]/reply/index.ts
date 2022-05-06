/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

// http://localhost:3000/api/answer/[id]/reply

const getReplies = async (req: NextApiRequest, res: NextApiResponse) => {
  const { answerId } = req.body;
  const replies = await prisma.reply.findMany({
    where: {
      answerId: Number(answerId),
    },
  });
  res.json(replies);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    getReplies(req, res);
  }
};
