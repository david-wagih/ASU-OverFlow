/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// this api is to get User data by his email

// http://localhost:3000/api/User

const getUserByEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        email: req.body.email,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

export default getUserByEmail;
