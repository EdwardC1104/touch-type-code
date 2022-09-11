import Database from "database/Database";
import { IncomingMessage } from "http";
import { NextApiRequest } from "next";
import { getCookie } from "./cookies";
import { verifyJWT } from "./jwt";

type Request = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string;
  }>;
};

/**
 * Uses the JWT in the request to find the user's id.
 * Then, it gets the user's data from the database.
 */
export const getServerSession = async (req: Request) => {
  let token = getCookie(req as NextApiRequest, "jwt");
  if (!token) return null; // No token, no session

  const { sub: id } = verifyJWT(token);
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
