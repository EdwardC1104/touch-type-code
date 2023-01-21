import Database from "classes/server/Database";
import { generatePassword } from "helpers/server/passwords";
import emailValidator from "helpers/shared/validators/emailValidator";
import nameValidator from "helpers/shared/validators/nameValidator";
import passwordValidator from "helpers/shared/validators/passwordValidator";
import usernameValidator from "helpers/shared/validators/usernameValidator";
import type { NextApiRequest, NextApiResponse } from "next";
import login from "./login";

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

  const { name, username, password, email } = req.body;

  const nameError = nameValidator(name);
  if (nameError) return res.status(400).json({ error: nameError });

  const emailError = emailValidator(email);
  if (emailError) return res.status(400).json({ error: emailError });

  const usernameError = usernameValidator(username);
  if (usernameError) return res.status(400).json({ error: usernameError });

  const passwordError = passwordValidator(password);
  if (passwordError) return res.status(400).json({ error: passwordError });

  const { salt, hash } = generatePassword(req.body.password);

  try {
    await Database.addUser({
      name,
      username,
      passwordSalt: salt,
      passwordHash: hash,
      email,
    });

    return login(req, res); // Log the user in after signing up
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
