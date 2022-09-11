import { setCookie } from "lib/cookies";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * API endpoint for logging out a user.
 * @method POST
 */
const logout = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  setCookie(res, "jwt", "", { maxAge: 0 });
  res.status(200).json({ success: true });
};

export default logout;
