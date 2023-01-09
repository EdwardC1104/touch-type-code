import { getServerSession } from "lib/server/getServerSession";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * API endpoint for getting the user's session.
 * @method GET
 */
const session = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  return res.status(200).json({ session: await getServerSession(req) });
};

export default session;
