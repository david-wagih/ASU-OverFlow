/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// this api is to get certain question using unique id

//   http://localhost:3000/api/question/[id]

export default function QuestionRouteshandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    getQuestion(req, res);
  } else if (req.method === "DELETE") {
    deleteQuestion(req, res);
  } else if (req.method === "PUT") {
    updateQuestion(req, res);
  }
}

const getQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const questions = await prisma.question.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const deleteQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  try {
    const questions = await prisma.question.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, content } = req.body;
  try {
    const questions = await prisma.question.update({
      where: { id: Number(id) },
      data: { content },
    });
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
