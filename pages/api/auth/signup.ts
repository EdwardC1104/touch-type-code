import Database from "database/Database";
import { generatePassword } from "lib/passwords";
import type { NextApiRequest, NextApiResponse } from "next";
import login from "./login";

type Data = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { name, username, password, email } = req.body;

  if (!name || !username || !password || !email) {
    return res.status(400).json({
      error: "Missing required fields",
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
    if (e.code === "SQLITE_CONSTRAINT")
      return res.status(400).json({
        error: "Username already taken",
      });

    return res.status(500).json({
      error: "Error adding user",
    });
  }
}
