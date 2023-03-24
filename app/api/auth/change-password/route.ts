import Database from "classes/server/Database";
import { getServerSession } from "helpers/server/getServerSession";
import { generatePassword, passwordIsValid } from "helpers/server/passwords";
import passwordValidator from "helpers/shared/validators/passwordValidator";
import { NextRequest, NextResponse } from "next/server";

/**
 * API endpoint for signing up a new user.
 * Expects a JSON body with the user's name, username, email, and password.
 */
export async function POST(req: NextRequest) {
  const { password, newPassword } = await req.json();

  if (!password)
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 }
    );

  const newPasswordError = passwordValidator(newPassword);
  if (newPasswordError)
    return NextResponse.json({ error: newPasswordError }, { status: 400 });

  const userSession = await getServerSession(req);
  if (!userSession)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Necessary to get the user's password hash and salt because the session doesn't contain it
  const user = await Database.getUserById(userSession.id);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!passwordIsValid(password, user.passwordHash, user.passwordSalt))
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });

  try {
    const { hash, salt } = generatePassword(newPassword);
    await Database.editUserPassword({
      id: user.id,
      passwordHash: hash,
      passwordSalt: salt,
    });
    // Force the user to log in again so they can use their new credentials and the session is updated
    const url = req.nextUrl.clone();
    url.pathname = "/api/auth/logout";
    return await fetch(url, {
      method: "POST",
    });
  } catch {
    return NextResponse.json(
      {
        error: "Error adding user",
      },
      { status: 500 }
    );
  }
}
