import Database from "database/Database";
import { getServerSession } from "lib/getServerSession";
import { generatePassword, passwordIsValid } from "lib/passwords";
import passwordValidator from "lib/validators/passwordValidator";
import type { NextApiRequest, NextApiResponse } from "next";
import logout from "../auth/logout";

type Data = {
  error: string;
};

/**
 * API endpoint for signing up a new user.
 * Expects a JSON body with the user's name, username, email, and password.
 * @method POST
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { password, newPassword } = req.body;

  if (!password) return res.status(400).json({ error: "Password is required" });

  const newPasswordError = passwordValidator(password);
  if (newPasswordError)
    return res.status(400).json({ error: newPasswordError });

  const userSession = await getServerSession(req);
  if (!userSession) return res.status(401).json({ error: "Unauthorized" });

  // Necessary to get the user's password hash and salt because the session doesn't contain it
  const user = await Database.getUserById(userSession.id);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  if (!passwordIsValid(password, user.passwordHash, user.passwordSalt))
    return res.status(401).json({ error: "Incorrect password" });

  try {
    const { hash, salt } = generatePassword(newPassword);
    await Database.editUserPassword({
      id: user.id,
      passwordHash: hash,
      passwordSalt: salt,
    });

    return logout(req, res); // Force the user to log in again so they can use their new credentials and the session is updated
  } catch {
    return res.status(500).json({
      error: "Error adding user",
    });
  }
}
