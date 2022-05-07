/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getRequestMeta } from "next/dist/server/request-meta";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/user/requests/status

const getCertainRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userEmail } = req.body;
  const request = await prisma.request.findUnique({
    where: {
      userEmail,
    },
  });
  res.status(200).json(request);
};

export default getCertainRequest;
