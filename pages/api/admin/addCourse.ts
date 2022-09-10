import { passwordIsValid } from "lib/passwords";
import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import Database from "database/Database";

dotenv.config({ path: ".env.local" });

type Data = {
  error?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { name, description, image, adminPassword } = req.body;

  if (!name || !description || !image || !adminPassword)
    return res.status(400).json({
      error: "Missing required fields",
    });

  if (
    !passwordIsValid(
      adminPassword,
      process.env.ADMIN_PASSWORD_HASH as string,
      process.env.ADMIN_PASSWORD_SALT as string
    )
  )
    return res.status(400).json({
      error: "Invalid admin password",
    });

  try {
    await Database.addCourse({
      name,
      description,
      image,
    });

    res.status(200).json({
      message: "success",
    });
  } catch {
    return res.status(500).json({
      error: "Error adding course",
    });
  }
}
