/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// this api is to get all users with Role User not Admin

// http://localhost:3000/api/user

const GetAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        // @ts-ignore
        role: "USER",
      },
    });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

export default GetAllUsers;
