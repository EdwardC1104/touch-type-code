import DatabaseConnection from "@database/DatabaseConnection";
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
  if (req.method === "POST") {
    const { name, username, password, email } = req.body;

    console.log(req.body);

    if (!name || !username || !password || !email) {
      return res.status(400).json({
        errors: [{ msg: "Missing required fields" }],
      });
    }

    const { salt, hash } = generatePassword(req.body.password);

    const db = new DatabaseConnection();

    try {
      await db.addUser({
        name,
        username,
        passwordSalt: salt,
        passwordHash: hash,
        email,
        isSSO: false,
      });

      return res.status(200).json({ errors: [] });
    } catch (e: any) {
      if (e.code === "SQLITE_CONSTRAINT") {
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
