import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/admin

const updateAccess = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userEmail, isRestricted } = req.body;

  const updaterestriction = await prisma.user.update({
    where: {
      email: userEmail,
    },
    data: {
      isRestricted,
    },
  });
  res.status(200).json(updaterestriction);
};

export default updateAccess;
