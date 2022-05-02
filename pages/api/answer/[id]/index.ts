/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// this api is to get certain question using unique id

//   http://localhost:3000/api/answer/[id]

export default function AnswersRouteshandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    getAnswer(req, res);
  } else if (req.method === "DELETE") {
    deleteAnswer(req, res);
  } else if (req.method === "PUT") {
    updateAnswerVotes(req, res);
  }
}

const getAnswer = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const answer = await prisma.answer.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const deleteAnswer = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const answer = await prisma.answer.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateAnswerVotes = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { UpVotes, DownVotes } = req.body;
  try {
    const answer = await prisma.answer.update({
      where: { id: Number(id) },
      data: { UpVotes, DownVotes },
    });
    res.status(200).json(answer);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
