import { getServerSession } from "helpers/server/getServerSession";
import { NextRequest, NextResponse } from "next/server";

/**
 * API endpoint for getting the user's session.
 */
export async function GET(req: NextRequest) {
  return NextResponse.json({ session: await getServerSession(req) });
}
