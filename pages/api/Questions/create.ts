/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/Questions/create

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const newQuestion = await prisma.question.create({
      data: {
        category: req.body.category,
        content: req.body.content,
        userId: req.body.userId,
      },
    });
    res.status(201).json(newQuestion);
  } catch (e) {
    console.log(e);
  }
};
