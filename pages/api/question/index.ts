/* eslint-disable import/no-anonymous-default-export */
// here we should make an api to get all questions in the database for the user

//   localhost:3000/api/Questions/

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// this Api is used to get all questions for all users
// http://localhost:3000/api/question/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const questions = await prisma.question.findMany({});
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
