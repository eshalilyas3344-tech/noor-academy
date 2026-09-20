"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

const card = "rounded-2xl border border-[#e7e5df] bg-white p-5 shadow-[0_8px_24px_rgba(23,50,77,0.04)]";
const input = "min-h-10 w-full rounded-xl border border-[#e7e5df] px-3 text-sm outline-none focus:border-[#147d70]";
type User = { id: string; full_name: string; email: string; role: string; status?: string; phone?: string; country?: string };
type Course = { id: string; name: string; description: string; level: string; duration: string; price: number; status: string };

export function AdminManagement({ type }: { type: "students" | "parents" | "teachers" | "courses" }) {
  const isCourse = type === "courses";
  const role = type === "students" ? "student" : type === "parents" ? "parent" : "teacher";
  const [records, setRecords] = useState<(User | Course)[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const load = useCallback(async () => {
    const response = await fetch(isCourse ? "/api/admin/courses" : `/api/admin/users?role=${role}`);
    if (response.ok) {
      const data = await response.json();
      setRecords(isCourse ? data.courses : data.users);
    }
  }, [isCourse, role]);
  useEffect(() => {
    let active = true;
    void fetch(isCourse ? "/api/admin/courses" : `/api/admin/users?role=${role}`)
      .then((response) => response.ok ? response.json() : { courses: [], users: [] })
      .then((data) => {
        if (active) setRecords(isCourse ? data.courses : data.users);
      });
    return () => { active = false; };
  }, [isCourse, role]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    const response = await fetch(isCourse ? "/api/admin/courses" : "/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(isCourse ? form : { ...form, role }) });
    const data = await response.json();
    if (!response.ok) { setMessage({ text: data.error || "Unable to save record.", error: true }); return; }
    setForm({}); setOpen(false); setMessage({ text: "Record saved successfully." }); await load();
  }
  const filtered = records.filter((record) => JSON.stringify(record).toLowerCase().includes(search.toLowerCase()));
  const title = isCourse ? "Courses" : type[0].toUpperCase() + type.slice(1);
  return <div>
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#147d70]">Admin workspace</p><h1 className="mt-2 font-display text-4xl text-[#17324d]">{title}</h1><p className="mt-3 text-sm text-[#667085]">Manage records saved in the academy database.</p></div><button type="button" onClick={() => setOpen((value) => !value)} className="min-h-10 rounded-xl bg-[#147d70] px-4 text-sm font-bold text-white">{open ? "Close form" : `Add ${isCourse ? "course" : type.slice(0, -1)}`}</button></div>
    {message && <p role={message.error ? "alert" : "status"} className={`mt-5 rounded-xl p-4 text-sm font-semibold ${message.error ? "bg-[#fdf0ed] text-[#b5473f]" : "bg-[#eef7f3] text-[#147d70]"}`}>{message.text}</p>}
    {open && <form onSubmit={submit} className={`${card} mt-5 grid gap-4 sm:grid-cols-2`}><input required value={form.name ?? form.fullName ?? ""} onChange={(event) => setForm({ ...form, ...(isCourse ? { name: event.target.value } : { fullName: event.target.value }) })} placeholder={isCourse ? "Course name" : "Full name"} className={input} />{!isCourse && <><input required type="email" value={form.email ?? ""} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" className={input} /><input required minLength={8} type="password" value={form.password ?? ""} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Temporary password" className={input} /></>}{isCourse && <><input value={form.level ?? ""} onChange={(event) => setForm({ ...form, level: event.target.value })} placeholder="Level" className={input} /><input value={form.duration ?? ""} onChange={(event) => setForm({ ...form, duration: event.target.value })} placeholder="Duration" className={input} /><input value={form.price ?? ""} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="Price" type="number" min="0" className={input} /><textarea value={form.description ?? ""} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Description" className="min-h-20 rounded-xl border border-[#e7e5df] p-3 text-sm sm:col-span-2" /></>}<button className="min-h-10 rounded-xl bg-[#147d70] px-4 text-sm font-bold text-white sm:col-span-2">Save to database</button></form>}
    <section className={`${card} mt-5`}><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><h2 className="font-display text-2xl text-[#17324d]">{filtered.length} records</h2><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search records" className={`${input} sm:max-w-xs`} /></div>{filtered.length === 0 ? <p className="mt-6 text-sm text-[#667085]">No {title.toLowerCase()} available yet.</p> : <div className="mt-5 divide-y divide-[#e7e5df]">{filtered.map((record) => <div key={record.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-bold text-[#17324d]">{isCourse ? (record as Course).name : (record as User).full_name}</p><p className="text-xs text-[#667085]">{isCourse ? `${(record as Course).level || "Level not set"} · ${(record as Course).duration || "Duration not set"}` : `${(record as User).email} · ${(record as User).status || "Active"}`}</p></div><span className="text-xs font-bold uppercase text-[#147d70]">{isCourse ? (record as Course).status : (record as User).role}</span></div>)}</div>}</section>
  </div>;
}
