import { setCookie } from "lib/cookies";
import { NextApiRequest, NextApiResponse } from "next";

const logout = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    setCookie(res, "jwt", "", { maxAge: 0 });
    res.status(200).json({ success: true });
  }
};

export default logout;
