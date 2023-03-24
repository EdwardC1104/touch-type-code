import Database from "classes/server/Database";
import { issueJWT } from "helpers/server/jwt";
import { passwordIsValid } from "helpers/server/passwords";
import { NextRequest, NextResponse } from "next/server";

/**
 * API endpoint for logging in a user.
 * Expects a JSON body with the user's username and password.
 */
export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password)
    return NextResponse.json(
      { error: "Missing requierd fields" },
      { status: 401 }
    );

  const user = await Database.getUserByUsername(username);

  if (user && passwordIsValid(password, user.passwordHash, user.passwordSalt)) {
    const jwt = issueJWT(user.id);
    const res = NextResponse.json({ message: "success" }, { status: 200 });
    res.cookies.set("jwt", jwt);
    return res;
  }

  return NextResponse.json(
    { error: "Incorrect username or password" },
    { status: 401 }
  );
}
