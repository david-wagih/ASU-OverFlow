/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/user/requests

const getAllPendingRequests = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const request = await prisma.request.findMany({
    where: {
      status: "pending",
    },
  });
  res.status(200).json(request);
};

const postRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userEmail } = req.body;

  const newRequest = await prisma.request.create({
    data: {
      userEmail,
    },
  });
  res.status(200).json(newRequest);
};

const updateRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, status } = req.body;
  const updatedRequest = await prisma.request.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  res.status(200).json(updatedRequest);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getAllPendingRequests(req, res);
      break;
    case "POST":
      await postRequest(req, res);
      break;
    case "PUT":
      await updateRequest(req, res);
      break;
    default:
  }
};
