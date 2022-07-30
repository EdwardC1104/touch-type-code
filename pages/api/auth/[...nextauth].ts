import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
});
