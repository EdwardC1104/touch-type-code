import Database from "classes/server/Database";
import { NextRequest } from "next/server";
import { verifyJWT } from "./jwt";

/**
 * Uses the JWT in the request to find the user's id.
 * Then, it gets the user's data from the database.
 */
export const getServerSession = async (req: NextRequest) => {
  const token = req.cookies.get("jwt");
  if (!token) return null; // No token, no session

  const { sub: id } = verifyJWT(token.value);
  if (!id) return null; // Invalid token, no session

  const user = await Database.getUserById(parseInt(id));
  if (!user) return null; // User not found, no session

  const userData: UserSession = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
  };

  return userData;
};
