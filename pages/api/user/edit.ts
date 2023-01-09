import Database from "classes/server/Database";
import { getServerSession } from "lib/server/getServerSession";
import emailValidator from "lib/shared/validators/emailValidator";
import nameValidator from "lib/shared/validators/nameValidator";
import usernameValidator from "lib/shared/validators/usernameValidator";
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

  const { name, username, email } = req.body;

  const nameError = nameValidator(name);
  if (nameError) return res.status(400).json({ error: nameError });

  const emailError = emailValidator(email);
  if (emailError) return res.status(400).json({ error: emailError });

  const usernameError = usernameValidator(username);
  if (usernameError) return res.status(400).json({ error: usernameError });

  const user = await getServerSession(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  try {
    await Database.editUser({
      id: user.id,
      name,
      username,
      email,
    });

    return logout(req, res); // Force the user to log in again so they can use their new credentials and the session is updated
  } catch (e: any) {
    const errorString = e.toString();
    if (
      errorString.includes("UNIQUE constraint failed") &&
      errorString.includes("username")
    )
      return res.status(400).json({
        error: "Username already taken",
      });
    else if (
      errorString.includes("UNIQUE constraint failed") &&
      errorString.includes("email")
    )
      return res.status(400).json({
        error: "Email already belongs to an account",
      });
    else
      return res.status(500).json({
        error: "Error adding user",
      });
  }
}
