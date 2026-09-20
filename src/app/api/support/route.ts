import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { createSupportTicket, getSupportTickets, type SupportPriority } from "@/lib/db";

export async function GET() {
  const auth = await getCurrentUser();
  if (!auth) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const tickets = getSupportTickets(auth.user.role === "admin" ? undefined : auth.user.id);
  return NextResponse.json({ tickets });
}

export async function POST(request: Request) {
  const auth = await getCurrentUser();
  if (!auth || auth.user.role === "admin") return NextResponse.json({ error: "Only portal users can create tickets." }, { status: 403 });
  const body = await request.json();
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const priority = ["Low", "Normal", "High", "Urgent"].includes(body.priority) ? body.priority as SupportPriority : "Normal";
  if (!subject || !category || !message) return NextResponse.json({ error: "Subject, category, and message are required." }, { status: 400 });
  const ticket = createSupportTicket({ userId: auth.user.id, subject, category, priority, message });
  return NextResponse.json({ ticket }, { status: 201 });
}
