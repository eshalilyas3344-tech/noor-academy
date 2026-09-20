"use client";

import { FormEvent, useEffect, useState } from "react";

type Ticket = { id: string; subject: string; category: string; priority: string; status: string; updated_at: string; user_name?: string; user_email?: string };
type Message = { id: string; message: string; author_name?: string; author_role?: string; created_at: string };
const statuses = ["Open", "In Progress", "Waiting for User", "Resolved", "Closed"];
const priorities = ["Low", "Normal", "High", "Urgent"];
const card = "rounded-2xl border border-[#e7e5df] bg-white p-5 shadow-[0_8px_24px_rgba(23,50,77,0.04)]";

export function SupportWorkspace({ admin = false }: { admin?: boolean }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Account");
  const [priority, setPriority] = useState("Normal");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  async function loadTickets() {
    const response = await fetch("/api/support");
    if (response.ok) setTickets((await response.json()).tickets);
  }
  async function openTicket(ticket: Ticket) {
    setSelected(ticket);
    const response = await fetch(`/api/support/${ticket.id}`);
    if (response.ok) setMessages((await response.json()).messages);
  }
  useEffect(() => {
    let active = true;
    void fetch("/api/support").then((response) => response.ok ? response.json() : { tickets: [] }).then((data) => {
      if (active) setTickets(data.tickets);
    });
    return () => { active = false; };
  }, []);

  async function submitTicket(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subject, category, priority, message }) });
    if (response.ok) { setSubject(""); setMessage(""); setNotice("Your support ticket has been submitted."); await loadTickets(); }
  }
  async function reply(event: FormEvent) {
    event.preventDefault();
    if (!selected) return;
    const response = await fetch(`/api/support/${selected.id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message }) });
    if (response.ok) { setMessage(""); await openTicket(selected); await loadTickets(); }
  }
  async function updateTicket(field: "status" | "priority", value: string) {
    if (!selected) return;
    const response = await fetch(`/api/support/${selected.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ [field]: value }) });
    if (response.ok) { const updated = (await response.json()).ticket as Ticket; setSelected(updated); await loadTickets(); }
  }
  const visibleTickets = tickets.filter((ticket) => `${ticket.subject} ${ticket.category} ${ticket.user_name ?? ""} ${ticket.user_email ?? ""}`.toLowerCase().includes(search.toLowerCase()));

  return <div className="space-y-6">
    <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#147d70]">Support center</p><h1 className="mt-2 font-display text-4xl text-[#17324d]">{admin ? "Support Tickets" : "How can we help?"}</h1><p className="mt-3 text-sm text-[#667085]">{admin ? "Review and manage academy support conversations." : "Submit a query and keep your support conversation in one place."}</p></div>
    {notice && <p role="status" className="rounded-xl bg-[#eef7f3] p-4 text-sm font-semibold text-[#147d70]">{notice}</p>}
    <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      {!admin && <form className={card} onSubmit={submitTicket}><h2 className="font-display text-2xl text-[#17324d]">Submit a ticket</h2><div className="mt-5 space-y-4"><input required value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Subject" className="min-h-11 w-full rounded-xl border border-[#e7e5df] px-3 text-sm" /><select value={category} onChange={(event) => setCategory(event.target.value)} className="min-h-11 w-full rounded-xl border border-[#e7e5df] px-3 text-sm"><option>Account</option><option>Class Schedule</option><option>Assignments</option><option>Payments</option><option>Technical Issue</option></select><select value={priority} onChange={(event) => setPriority(event.target.value)} className="min-h-11 w-full rounded-xl border border-[#e7e5df] px-3 text-sm">{priorities.map((item) => <option key={item}>{item}</option>)}</select><textarea required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Describe your question" rows={5} className="w-full rounded-xl border border-[#e7e5df] p-3 text-sm" /><button className="min-h-11 rounded-xl bg-[#147d70] px-5 text-sm font-bold text-white">Submit ticket</button></div></form>}
      <div className={`${card} ${admin ? "lg:col-span-2" : ""}`}><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><h2 className="font-display text-2xl text-[#17324d]">{admin ? "All tickets" : "Your tickets"}</h2><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tickets" className="min-h-10 rounded-xl border border-[#e7e5df] px-3 text-sm" /></div><div className="mt-5 space-y-3">{visibleTickets.length === 0 && <p className="text-sm text-[#667085]">No support tickets found.</p>}{visibleTickets.map((ticket) => <button type="button" key={ticket.id} onClick={() => void openTicket(ticket)} className="w-full rounded-xl border border-[#e7e5df] p-4 text-left hover:border-[#147d70]"><div className="flex flex-wrap justify-between gap-2"><span className="font-bold text-[#17324d]">{ticket.subject}</span><span className="text-xs font-bold text-[#147d70]">{ticket.status}</span></div><p className="mt-2 text-xs text-[#667085]">{ticket.category} · {ticket.priority}{admin && ticket.user_name ? ` · ${ticket.user_name} · ${ticket.user_email}` : ""}</p></button>)}</div></div>
    </div>
    {selected && <section className={card}><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="font-display text-2xl text-[#17324d]">{selected.subject}</h2><p className="mt-1 text-xs text-[#667085]">{selected.category} · {selected.user_name ?? "Your account"}</p></div>{admin && <div className="flex gap-2"><select value={selected.status} onChange={(event) => void updateTicket("status", event.target.value)} className="rounded-xl border border-[#e7e5df] px-2 text-xs">{statuses.map((item) => <option key={item}>{item}</option>)}</select><select value={selected.priority} onChange={(event) => void updateTicket("priority", event.target.value)} className="rounded-xl border border-[#e7e5df] px-2 text-xs">{priorities.map((item) => <option key={item}>{item}</option>)}</select></div>}</div><div className="mt-5 space-y-3">{messages.map((item) => <div key={item.id} className="rounded-xl bg-[#f5f1e8] p-4"><p className="text-xs font-bold text-[#147d70]">{item.author_name ?? "Academy Support"} · {item.author_role}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#17324d]">{item.message}</p></div>)}</div><form onSubmit={reply} className="mt-5 flex flex-col gap-3 sm:flex-row"><textarea required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a reply" rows={3} className="min-h-20 flex-1 rounded-xl border border-[#e7e5df] p-3 text-sm" /><button className="min-h-11 self-end rounded-xl bg-[#147d70] px-5 text-sm font-bold text-white">Reply</button></form></section>}
  </div>;
}
