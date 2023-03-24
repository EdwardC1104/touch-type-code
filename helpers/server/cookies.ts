import { parse, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Adds a cookie to the response.
 */
export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options = {}
) => {
  const serializedCookie = serialize(name, String(value), {
    httpOnly: true, // Prevents client-side JS from reading the cookie
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: "strict", // Prevents CSRF
    path: "/", // Cookie is sent to all routes
    secure: process.env.NODE_ENV === "production", // Cookie only sent over HTTPS in production
    ...options,
  });

  res.setHeader("Set-Cookie", serializedCookie);
};

/**
 * Gets a cookie from the request.
 */
export const getCookie = (req: NextApiRequest, name: string) => {
  const cookieData = parse(req.headers.cookie || "");
  return cookieData[name] ?? null; // Return null if cookie doesn't exist
};
