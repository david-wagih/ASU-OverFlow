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
  try {
    const { userEmail } = req.body;

    const newRequest = await prisma.request.create({
      data: {
        userEmail: userEmail,
      },
    });
    res.status(200).json(newRequest);
  } catch (e) {
    res.status(200).json(e);
  }
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
  if (req.method === "GET") {
    await getAllPendingRequests(req, res);
  } else if (req.method === "POST") {
    await postRequest(req, res);
  } else if (req.method === "PUT") {
    await updateRequest(req, res);
  }
};
