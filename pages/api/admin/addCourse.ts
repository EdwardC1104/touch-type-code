import { passwordIsValid } from "lib/passwords";
import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import Database from "@database/DatabaseConnection";

dotenv.config({ path: ".env.local" });

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
    const { name, description, image, adminPassword } = req.body;

    if (!name || !description || !image || !adminPassword) {
      res.status(400).json({
        errors: [{ msg: "Missing required fields" }],
      });
      return;
    }

    if (
      !passwordIsValid(
        adminPassword,
        process.env.ADMIN_PASSWORD_HASH as string,
        process.env.ADMIN_PASSWORD_SALT as string
      )
    ) {
      res.status(400).json({
        errors: [{ msg: "Invalid admin password" }],
      });
      return;
    }

    try {
      const db = new Database();

      await db.addCourse({
        name,
        description,
        image,
      });

      db.close();

      res.status(200).json({
        errors: [],
      });
    } catch {
      res.status(500).json({
        errors: [{ msg: "Error adding course" }],
      });
      return;
    }
  } else {
    res.status(405).json({ errors: [{ msg: "Method not allowed" }] });
    return;
  }
}
