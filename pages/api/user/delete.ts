import Database from "database/Database";
import { getServerSession } from "lib/getServerSession";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * API endpoint for deleting a user.
 * @method DELETE
 */
const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE")
    return res.status(405).json({ error: "Method not allowed" });

  const user = await getServerSession(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  try {
    await Database.deleteUser(user.id);
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default deleteUser;
