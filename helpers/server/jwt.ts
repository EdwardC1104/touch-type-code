import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const PRIVATE_KEY = process.env.JWT_PRIVATE as string;
const PUBLIC_KEY = process.env.JWT_PUBLIC as string;

/**
 * Signs a JWT token containing the user's id.
 */
const issueJWT = (id: number) => {
  const expiresIn = "7d";

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return "Bearer " + signedToken;
};

/**
 * Verifies a JWT token and returns its contents.
 * Token should be in the form "Bearer <token>".
 */
const verifyJWT = (token: string) => {
  const tokenContents = token.split(" ")[1]; // Remove "Bearer " from token

  return jsonwebtoken.verify(tokenContents, PUBLIC_KEY, {
    algorithms: ["RS256"],
  }) as JwtPayload;
};

export { issueJWT, verifyJWT };
