import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { createUser, getUserByEmail, getUserById, listUsers, updateUser, type DbUser } from "@/lib/db";
import { hashPassword } from "@/lib/auth/crypto";

async function requireAdmin() {
  const auth = await getCurrentUser();
  return auth?.user.role === "admin" ? auth : null;
}

export async function GET(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  const role = new URL(request.url).searchParams.get("role") as DbUser["role"] | null;
  return NextResponse.json({ users: listUsers(role && ["student", "parent", "teacher", "admin"].includes(role) ? role : undefined) });
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  const body = await request.json();
  if (!body.fullName || !body.email || !body.password || !["student", "parent", "teacher"].includes(body.role)) return NextResponse.json({ error: "Name, email, password, and a valid role are required." }, { status: 400 });
  if (getUserByEmail(body.email)) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  const { hash, salt } = hashPassword(body.password);
  const user = createUser({ email: body.email, passwordHash: hash, salt, role: body.role, fullName: body.fullName.trim() });
  updateUser(user.id, { phone: body.phone, country: body.country, status: body.status ?? "Active" });
  return NextResponse.json({ user: getUserById(user.id) }, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  const body = await request.json();
  if (!body.id) return NextResponse.json({ error: "User id is required." }, { status: 400 });
  const user = updateUser(body.id, body);
  return user ? NextResponse.json({ user }) : NextResponse.json({ error: "User not found." }, { status: 404 });
}
