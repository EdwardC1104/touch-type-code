import Database from "classes/server/Database";
import { generatePassword } from "helpers/server/passwords";
import emailValidator from "helpers/shared/validators/emailValidator";
import nameValidator from "helpers/shared/validators/nameValidator";
import passwordValidator from "helpers/shared/validators/passwordValidator";
import usernameValidator from "helpers/shared/validators/usernameValidator";
import { NextRequest, NextResponse } from "next/server";

/**
 * API endpoint for signing up a new user.
 * Expects a JSON body with the user's name, username, email, and password.
 */
export async function POST(req: NextRequest) {
  const { name, username, password, email } = await req.json();

  const nameError = nameValidator(name);
  if (nameError)
    return NextResponse.json({ error: nameError }, { status: 400 });

  const emailError = emailValidator(email);
  if (emailError)
    return NextResponse.json({ error: emailError }, { status: 400 });

  const usernameError = usernameValidator(username);
  if (usernameError)
    return NextResponse.json({ error: usernameError }, { status: 400 });

  const passwordError = passwordValidator(password);
  if (passwordError)
    return NextResponse.json({ error: passwordError }, { status: 400 });

  const { salt, hash } = generatePassword(password);

  try {
    await Database.addUser({
      name,
      username,
      passwordSalt: salt,
      passwordHash: hash,
      email,
    });

    // Log the user in after signing up by moving from this endpoint to /api/auth/login endpoint
    const url = req.nextUrl.clone();
    url.pathname = "/api/auth/login";
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  } catch (e: any) {
    const errorString = e.toString();
    if (
      errorString.includes("UNIQUE constraint failed") &&
      errorString.includes("username")
    )
      return NextResponse.json(
        {
          error: "Username already taken",
        },
        { status: 400 }
      );
    else if (
      errorString.includes("UNIQUE constraint failed") &&
      errorString.includes("email")
    )
      return NextResponse.json(
        {
          error: "Email already belongs to an account",
        },
        { status: 400 }
      );
    else
      return NextResponse.json(
        {
          error: "Error adding user",
        },
        { status: 500 }
      );
  }
}
