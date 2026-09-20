import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { createCourse, listCourses } from "@/lib/db";

async function requireAdmin() {
  const auth = await getCurrentUser();
  return auth?.user.role === "admin";
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  return NextResponse.json({ courses: listCourses() });
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  const body = await request.json();
  if (!body.name) return NextResponse.json({ error: "Course name is required." }, { status: 400 });
  const course = createCourse({ name: body.name.trim(), description: body.description ?? "", level: body.level ?? "", duration: body.duration ?? "", price: Number(body.price) || 0, status: body.status ?? "Active" });
  return NextResponse.json({ course }, { status: 201 });
}
