/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getRequestMeta } from "next/dist/server/request-meta";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/user/requests/[userEmail]

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userEmail } = req.query;
    const request = await prisma.request.findFirst({
      where: {
        userEmail: userEmail as string,
      },
    });
    res.status(200).json(request);
  } catch (e) {
    res.status(404).json({
      message: "No request found",
    });
  }
};
