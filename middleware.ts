import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Check if the user is logged in
  const userSessionEndpoint = new URL("/api/user/session", request.url);
  const res = await fetch(userSessionEndpoint, {
    headers: {
      // Pass the cookie to the API endpoint so it can verify the JWT
      cookie: request.headers.get("cookie") || "",
    },
  });
  const { session } = await res.json();

  // If the user is not logged in, redirect to the login page
  if (!session) return NextResponse.redirect(new URL("/login", request.url));
  // Otherwise, continue to the page
  return NextResponse.next();
}

export const config = {
  // Protected pages
  matcher: ["/profile/:path*"],
};
