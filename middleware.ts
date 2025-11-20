import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { env } from "@/config/env";
import type { TokenPayload } from "@/services/types";

/**
 * Verify JWT token and return decoded payload
 */
function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    // Token is invalid, expired, or malformed
    return null;
  }
}

/**
 * Extract token from request cookies
 */
function getTokenFromRequest(req: NextRequest): string | null {
  return req.cookies.get("token")?.value || null;
}

/**
 * Check if path requires admin role
 */
function requiresAdminRole(pathname: string): boolean {
  return pathname.startsWith("/dashboard/admin");
}

/**
 * Check if path is a public auth page
 */
function isAuthPage(pathname: string): boolean {
  return pathname.startsWith("/login") || pathname.startsWith("/signup");
}

/**
 * Main middleware function
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = getTokenFromRequest(req);

  const isAuth = isAuthPage(pathname);
  const isDashboard = pathname.startsWith("/dashboard");
  const isAdminRoute = requiresAdminRole(pathname);

  // If accessing auth pages while having valid token, redirect to dashboard
  if (isAuth && token) {
    const decoded = verifyToken(token);
    if (decoded) {
      // Redirect based on user role
      const redirectPath = decoded.role === "admin"
        ? "/dashboard/admin"
        : "/dashboard/user";
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
  }

  // If accessing dashboard without token, redirect to login
  if (isDashboard && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If accessing dashboard with token, verify it
  if (isDashboard && token) {
    const decoded = verifyToken(token);

    // If token is invalid or expired, clear it and redirect to login
    if (!decoded) {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");
      return response;
    }

    // Check admin route access
    if (isAdminRoute && decoded.role !== "admin") {
      // Non-admin users trying to access admin routes
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    }

    // Add user info to request headers for server components
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.id);
    requestHeaders.set("x-user-email", decoded.email);
    requestHeaders.set("x-user-role", decoded.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
};
