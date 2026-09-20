import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createDbSession, deleteDbSession, getDbSession, getUserById, type DbUser, type DbSession } from "../db";
import { signSessionToken, verifySessionToken, type SessionPayload } from "./session-token";

export const SESSION_COOKIE_NAME = "noor_session";
export const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function getRoleDashboardUrl(role: "student" | "teacher" | "parent" | "admin"): string {
  switch (role) {
    case "student":
      return "/student/dashboard";
    case "teacher":
      return "/teacher/dashboard";
    case "parent":
      return "/parent/dashboard";
    case "admin":
      return "/admin/dashboard";
  }
}

export function getRoleLoginUrl(role: "student" | "teacher" | "parent" | "admin"): string {
  switch (role) {
    case "student":
      return "/login";
    case "teacher":
      return "/teacher/login";
    case "parent":
      return "/parent/login";
    case "admin":
      return "/admin/login";
  }
}

export async function createSession(user: DbUser): Promise<string> {
  const expiresAt = Date.now() + SESSION_DURATION_MS;

  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    fullName: user.full_name,
    expiresAt,
  };

  const token = await signSessionToken(payload);

  // Save session record in SQLite database
  createDbSession({
    userId: user.id,
    token,
    role: user.role,
    expiresAt: new Date(expiresAt).toISOString(),
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });

  return token;
}

export async function getCurrentUser(): Promise<{ user: DbUser; session: DbSession } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = await verifySessionToken(token);
  if (!payload) {
    await clearSessionCookie();
    return null;
  }

  // Validate session against database
  const dbSession = getDbSession(token);
  if (!dbSession) {
    await clearSessionCookie();
    return null;
  }

  const user = getUserById(dbSession.user_id);
  if (!user) {
    await clearSessionCookie();
    return null;
  }

  return { user, session: dbSession };
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    deleteDbSession(token);
  }
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function requireUser(): Promise<{ user: DbUser; session: DbSession }> {
  const auth = await getCurrentUser();
  if (!auth) {
    redirect("/login");
  }
  return auth;
}

export async function requireRole(
  expectedRole: "student" | "teacher" | "parent" | "admin"
): Promise<{ user: DbUser; session: DbSession }> {
  const auth = await getCurrentUser();
  if (!auth) {
    redirect(getRoleLoginUrl(expectedRole));
  }
  if (auth.user.role !== expectedRole) {
    redirect(getRoleDashboardUrl(auth.user.role));
  }
  return auth;
}
