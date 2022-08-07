import NextAuth, { NextAuthOptions, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next/types";
import { openDb } from "@database/db";
import { passwordIsValid } from "lib/passwords";
import DatabaseConnection from "@database/DatabaseConnection";

dotenv.config({ path: ".env.local" });

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      // @ts-ignore
      credentials: undefined,

      async authorize(credentials, req) {
        return new Promise<User | null>((resolve, reject) => {
          console.log(credentials);

          let user: User | null = null;

          const username = credentials?.username;
          const password = credentials?.password;

          if (!username || !password) {
            return resolve(null);
          }

          const db = openDb();

          db.get(
            "SELECT * FROM users WHERE username = ?",
            [username],
            (_err, row) => {
              if (
                row &&
                passwordIsValid(password, row.passwordHash, row.passwordSalt)
              ) {
                user = {
                  id: row.id,
                  name: row.name,
                  email: row.email,
                  image: "",
                };
              }
              db.close();
              console.log(user);
              return resolve(user);
            }
          );
        });
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  events: {
    signIn: ({ user, account, profile, isNewUser }) => {
      if (account.provider !== "credentials") {
        const db = new DatabaseConnection();

        if (typeof user?.name === "string" && typeof user?.email === "string")
          db.addUser({
            name: user.name,
            username: null,
            email: user.email,
            passwordSalt: null,
            passwordHash: null,
            isSSO: true,
          });
      }
      console.log("signin", { user, account, profile, isNewUser });
    },
  },
};

const auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);

export default auth;
