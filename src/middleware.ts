import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth/session-token";

const SESSION_COOKIE_NAME = "noor_session";

function getRoleDashboardUrl(role: string): string {
  switch (role) {
    case "student":
      return "/student/dashboard";
    case "teacher":
      return "/teacher/dashboard";
    case "parent":
      return "/parent/dashboard";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/";
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const payload = token ? await verifySessionToken(token) : null;

  // Handle Login Pages: if already authenticated, redirect to respective dashboard
  const isLoginPage =
    pathname === "/login" ||
    pathname === "/teacher/login" ||
    pathname === "/parent/login" ||
    pathname === "/admin/login";

  if (isLoginPage) {
    if (payload) {
      const destination = getRoleDashboardUrl(payload.role);
      return NextResponse.redirect(new URL(destination, request.url));
    }
    return NextResponse.next();
  }

  // Protected: Student Portal (/student/*)
  if (pathname.startsWith("/student")) {
    if (!payload) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("returnUrl", `${pathname}${search}`);
      return NextResponse.redirect(loginUrl);
    }
    if (payload.role !== "student") {
      const correctDashboard = getRoleDashboardUrl(payload.role);
      return NextResponse.redirect(new URL(correctDashboard, request.url));
    }
    return NextResponse.next();
  }

  // Protected: Teacher Portal (/teacher/*)
  if (pathname.startsWith("/teacher")) {
    if (!payload) {
      const loginUrl = new URL("/teacher/login", request.url);
      loginUrl.searchParams.set("returnUrl", `${pathname}${search}`);
      return NextResponse.redirect(loginUrl);
    }
    if (payload.role !== "teacher") {
      const correctDashboard = getRoleDashboardUrl(payload.role);
      return NextResponse.redirect(new URL(correctDashboard, request.url));
    }
    return NextResponse.next();
  }

  // Protected: Parent Portal (/parent/*)
  if (pathname.startsWith("/parent")) {
    if (!payload) {
      const loginUrl = new URL("/parent/login", request.url);
      loginUrl.searchParams.set("returnUrl", `${pathname}${search}`);
      return NextResponse.redirect(loginUrl);
    }
    if (payload.role !== "parent") {
      const correctDashboard = getRoleDashboardUrl(payload.role);
      return NextResponse.redirect(new URL(correctDashboard, request.url));
    }
    return NextResponse.next();
  }

  // Protected: Admin Portal (/admin/*)
  if (pathname.startsWith("/admin")) {
    if (!payload) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("returnUrl", `${pathname}${search}`);
      return NextResponse.redirect(loginUrl);
    }
    if (payload.role !== "admin") {
      const correctDashboard = getRoleDashboardUrl(payload.role);
      return NextResponse.redirect(new URL(correctDashboard, request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/teacher/:path*",
    "/parent/:path*",
    "/admin/:path*",
    "/login",
  ],
};
