import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { addSupportMessage, getSupportMessages, getSupportTicket, updateSupportTicket, type SupportPriority, type SupportStatus } from "@/lib/db";

async function authorizedTicket(id: string) {
  const auth = await getCurrentUser();
  const ticket = getSupportTicket(id);
  if (!auth || !ticket || (auth.user.role !== "admin" && ticket.user_id !== auth.user.id)) return null;
  return { auth, ticket };
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const result = await authorizedTicket(id);
  if (!result) return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
  return NextResponse.json({ ticket: result.ticket, messages: getSupportMessages(id) });
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const result = await authorizedTicket(id);
  if (!result) return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
  const body = await request.json();
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) return NextResponse.json({ error: "Message is required." }, { status: 400 });
  const added = addSupportMessage(id, result.auth.user.id, message);
  return NextResponse.json({ message: added });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const result = await authorizedTicket(id);
  if (!result || result.auth.user.role !== "admin") return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  const body = await request.json();
  const statuses: SupportStatus[] = ["Open", "In Progress", "Waiting for User", "Resolved", "Closed"];
  const priorities: SupportPriority[] = ["Low", "Normal", "High", "Urgent"];
  const ticket = updateSupportTicket(id, {
    status: statuses.includes(body.status) ? body.status : undefined,
    priority: priorities.includes(body.priority) ? body.priority : undefined,
  });
  return NextResponse.json({ ticket });
}
