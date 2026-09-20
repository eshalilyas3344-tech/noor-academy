import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { createClass, listClasses } from "@/lib/db";

async function isAdmin() {
  const auth = await getCurrentUser();
  return auth?.user.role === "admin";
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  return NextResponse.json({ classes: listClasses() });
}

export async function POST(request: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  const body = await request.json();
  if (!body.id || !body.title || !body.courseId || !body.teacherId || !body.studentId || !body.startsAt) return NextResponse.json({ error: "Class id, title, course, teacher, student, and start time are required." }, { status: 400 });
  const record = createClass({ id: body.id, title: body.title, course_id: body.courseId, teacher_id: body.teacherId, student_id: body.studentId, starts_at: body.startsAt, status: body.status ?? "Scheduled" });
  return NextResponse.json({ class: record }, { status: 201 });
}
