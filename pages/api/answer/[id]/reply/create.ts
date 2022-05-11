/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

// http://localhost:3000/api/answer/[id]/reply/create

const postReply = async (req: NextApiRequest, res: NextApiResponse) => {
  const { answerId, content, userEmail } = req.body;
  const reply = await prisma.reply.create({
    data: {
      answerId: answerId,
      content: content,
      userEmail: userEmail,
    },
  });
  res.json(reply);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    postReply(req, res);
  }
};
