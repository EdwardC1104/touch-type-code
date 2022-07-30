import { openDb } from "@database/db";
import { generatePassword } from "lib/passwords";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  errors: {
    msg: string;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise<void>((resolve, reject) => {
    if (req.method === "POST") {
      const { name, username, password, email } = req.body;

      console.log(req.body);

      if (!name || !username || !password || !email) {
        res.status(400).json({
          errors: [{ msg: "Missing required fields" }],
        });
        return resolve();
      }

      const { salt, hash } = generatePassword(req.body.password);

      const db = openDb();

      db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, row) => {
          if (row) {
            res
              .status(400)
              .json({ errors: [{ msg: "Username already taken" }] });
            return resolve();
          }

          db.run(
            "INSERT INTO users (name, username, passwordSalt, passwordHash, email, isSSO) VALUES ($name, $username, $passwordSalt, $passwordHash, $email, $isSSO)",
            {
              $name: name,
              $username: username,
              $email: email,
              $passwordSalt: salt,
              $passwordHash: hash,
              $isSSO: 0,
            },
            (err) => {
              db.close();
              if (err) {
                res
                  .status(400)
                  .json({ errors: [{ msg: "Something went wrong" }] });
                return resolve();
              }
              res.status(200).json({ errors: [] });
              return resolve();
            }
          );
        }
      );
    } else {
      res.status(405).json({ errors: [{ msg: "Method not allowed" }] });
      return resolve();
    }
  });
}
