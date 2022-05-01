import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/user/[email]

// this Api is to get User Info by his Email which will be got using the Session data

export default async function UserRoutesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    getUser(req, res);
  } else if (req.method === "DELETE") {
    deleteUser(req, res);
  } else if (req.method === "PUT") {
    updateUser(req, res);
  }
}

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;
  try {
    const user = await prisma.user.update({
      where: {
        email: email as string,
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;
  try {
    const user = await prisma.user.delete({
      where: {
        email: email as string,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};
