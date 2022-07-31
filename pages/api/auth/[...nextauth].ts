import NextAuth, { User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next/types";
import { openDb } from "@database/db";
import { passwordIsValid } from "lib/passwords";

dotenv.config({ path: ".env.local" });

// async authorize(credentials, req) {
//         const username = credentials.username;
//         const password = credentials.password;

//         if (!username || !password) {
//           return {
//             error: "Missing username or password",
//           };
//         }

//         const db = openDb();
//         const { salt, hash } = generatePassword(req.body.password);

//       db.get(
//         "SELECT * FROM users WHERE username = ?",
//         [username],
//         (err, row) => {
//           if (row) {
//             res
//               .status(400)
//               .json({ errors: [{ msg: "Username already taken" }] });
//             return resolve();

//       },

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
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
};

const auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);

export default auth;
