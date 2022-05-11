import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const getAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },
  });
  res.status(200).json(users);
};

export default getAllUsers;
