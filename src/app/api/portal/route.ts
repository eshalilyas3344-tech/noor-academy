import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { listAttendance, listClasses, listEnrollments, listNotifications } from "@/lib/db";

export async function GET() {
  const auth = await getCurrentUser();
  if (!auth) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { id, role } = auth.user;
  return NextResponse.json({
    user: { id, email: auth.user.email, fullName: auth.user.full_name, role },
    enrollments: role === "student" ? listEnrollments(id) : [],
    classes: role === "student" ? listClasses({ studentId: id }) : role === "teacher" ? listClasses({ teacherId: id }) : [],
    notifications: listNotifications(id),
    attendance: role === "student" ? listAttendance(id) : [],
  });
}
