import { NextRequest, NextResponse } from "next/server";

/**
 * API endpoint for logging out a user.
 */
export async function POST(req: NextRequest) {
  const res = NextResponse.json({ message: "success" }, { status: 200 });
  res.cookies.delete("jwt");

  return res;
}
