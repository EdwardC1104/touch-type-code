import { getServerSession } from "lib/getServerSession";
import { NextApiRequest, NextApiResponse } from "next";

const session = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.json({ session: await getServerSession(req) });
};
export default session;
