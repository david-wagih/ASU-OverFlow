/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/answer/create

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const newQuestion = await prisma.answer.create({
      data: {
        content: req.body.content,
        questionId: req.body.questionId,
        userEmail: req.body.userEmail,
      },
    });
    res.status(201).json(newQuestion);
  } catch (e) {
    console.log(e);
  }
};
