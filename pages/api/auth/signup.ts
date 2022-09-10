import Database from "database/Database";
import { generatePassword } from "lib/passwords";
import type { NextApiRequest, NextApiResponse } from "next";
import login from "./login";

type Data = {
  errors: {
    msg: string;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { name, username, password, email } = req.body;

    if (!name || !username || !password || !email) {
      return res.status(400).json({
        errors: [{ msg: "Missing required fields" }],
      });
    }

    const { salt, hash } = generatePassword(req.body.password);

    try {
      await Database.addUser({
        name,
        username,
        passwordSalt: salt,
        passwordHash: hash,
        email,
      });

      return login(req, res);
    } catch (e: any) {
      if (e.code === "SQLITE_CONSTRAINT") {
        console.error(e);
        return res.status(400).json({
          errors: [{ msg: "Username already taken" }],
        });
      }

      return res.status(500).json({
        errors: [{ msg: "Error adding user" }],
      });
    }
  } else {
    return res.json({ errors: [{ msg: "Method not allowed" }] });
  }
}
