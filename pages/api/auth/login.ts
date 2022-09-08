import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export const serializeCookie = (name: string, value: string, options = {}) => {
  return cookie.serialize(name, String(value), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production" ? true : false,
    ...options,
  });
};

const login = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", serializeCookie("auth", "id123", {}));
    res.status(200).json({ message: "success" });
  }
};

export default login;
