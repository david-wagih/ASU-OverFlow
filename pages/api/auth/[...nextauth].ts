import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import dotenv from "dotenv";

dotenv.config();

// to sign in using these providers go to http://localhost:3000/api/auth/signin
// to sign out go to http://localhost:3000/api/auth/signout

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
