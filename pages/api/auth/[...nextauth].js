import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import dotenv from "dotenv";

dotenv.config();

export default NextAuth({
  providers: [],
  database: {
    client: "postgres",
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
