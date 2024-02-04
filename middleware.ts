import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    console.log("onboarding");
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  if (!isPublicPath && !token) {
    console.log("login");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/thread",
    "/thread/:path",
    "/search",
    "/activity",
    "/create-thread",
    "/profile",
    "/profile/edit",
    "/profile/:path",
    "/onboarding",
    "/login",
    "/signup",
  ],
};
