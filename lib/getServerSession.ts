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

export const getServerSession = async (req: Request) => {
  let token = getCookie(req as NextApiRequest, "jwt");
  if (!token) return null;

  const { sub: id } = verifyJWT(token);
  if (!id) return null;

  const user = await Database.getUserById(parseInt(id));
  if (!user) return null;

  const userData = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
  };

  return userData;
};
