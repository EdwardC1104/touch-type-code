import { NextApiRequest, NextApiResponse } from "next";
import Database from "database/Database";
import { passwordIsValid } from "lib/passwords";
import { issueJWT } from "lib/jwt";
import { setCookie } from "lib/cookies";

/**
 * API endpoint for logging in a user.
 * Expects a JSON body with the user's username and password.
 * @method POST
 */
const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { username, password } = req.body;

  if (!username || !password)
    return res.status(401).json({ error: "Missing requierd fields" });

  const user = await Database.getUserByUsername(username);

  if (user && passwordIsValid(password, user.passwordHash, user.passwordSalt)) {
    const jwt = issueJWT(user.id);
    setCookie(res, "jwt", jwt);
    res.status(200).json({ message: "success" });
  } else {
    return res.status(401).json({ error: "Incorrect username or password" });
  }
};

export default login;
