import { serialize, parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options = {}
) => {
  const serializedCookie = serialize(name, String(value), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    ...options,
  });

  res.setHeader("Set-Cookie", serializedCookie);
};

export const getCookie = (req: NextApiRequest, name: string) => {
  let cookieData = parse(req.headers.cookie || "");
  return cookieData[name] ?? null;
};
