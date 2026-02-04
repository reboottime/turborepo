import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get("portal_auth");
  const isAuthenticated = authCookie?.value === "authenticated";

  // Public routes (no auth required)
  const isLoginPage = pathname === "/login";
  const isRootPage = pathname === "/";

  // Protected routes (auth required) - everything under (app) route group
  const isProtectedRoute = !isLoginPage && !isRootPage;

  // If authenticated and trying to access login, redirect to app
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/employees", request.url));
  }

  // If authenticated and on root, redirect to app
  if (isAuthenticated && isRootPage) {
    return NextResponse.redirect(new URL("/employees", request.url));
  }

  // If not authenticated and trying to access protected route, redirect to login
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If not authenticated and on root, redirect to login
  if (!isAuthenticated && isRootPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - icon (icon route)
     * - fonts (font files)
     */
    "/((?!api|_next/static|_next/image|icon|fonts).*)",
  ],
};
