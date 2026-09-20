"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { pageWrap, primaryLink } from "./Shared";

const roleDestinations = {
  Student: "/student/dashboard",
  Teacher: "/teacher/dashboard",
  Parent: "/parent/dashboard",
  Admin: "/admin/dashboard",
} as const;

type DemoRole = keyof typeof roleDestinations;

export function StudentLoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<DemoRole>("Student");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    router.push(roleDestinations[role]);
  };

  return <main className="bg-[#fcfbf7] py-16 sm:py-24"><div className={`${pageWrap} grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr]`}><div className="hidden rounded-[2rem] bg-[#17324d] p-10 lg:flex lg:flex-col lg:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e9ddbf]">Welcome back</p><h1 className="mt-5 font-display text-5xl leading-tight text-white">Continue your learning journey.</h1></div><p className="text-sm leading-7 text-white/65">Frontend demo only. Authentication will be connected through the future secure backend.</p></div><div className="rounded-2xl border border-[#e7e5df] bg-white p-7 sm:p-10"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#147d70]">Noor Academy account</p><h1 className="mt-3 font-display text-4xl text-[#17324d]">Log in</h1><p className="mt-3 text-sm leading-6 text-[#667085]">Choose the demo role to preview the future role-based routing flow.</p>{submitted && <div className="mt-6 rounded-xl bg-[#eef7f3] p-4 text-sm font-semibold text-[#147d70]" role="status">Demo login successful. Redirecting to your {role.toLowerCase()} portal.</div>}<form onSubmit={handleSubmit} className="mt-8 space-y-5"><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">Email</span><input type="email" required autoComplete="email" className="min-h-12 w-full rounded-xl border border-[#e7e5df] px-4 outline-none focus:border-[#147d70]" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">Password</span><input type="password" required autoComplete="current-password" className="min-h-12 w-full rounded-xl border border-[#e7e5df] px-4 outline-none focus:border-[#147d70]" /></label><label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">Demo role</span><select value={role} onChange={(event) => setRole(event.target.value as DemoRole)} className="min-h-12 w-full rounded-xl border border-[#e7e5df] bg-white px-4 text-sm outline-none focus:border-[#147d70]"><option>Student</option><option>Teacher</option><option>Parent</option><option>Admin</option></select></label><div className="flex flex-wrap items-center justify-between gap-3 text-sm"><label className="flex items-center gap-2 text-[#667085]"><input type="checkbox" className="size-4 accent-[#147d70]" /> Remember me</label><Link href="/forgot-password" className="font-bold text-[#147d70]">Forgot password?</Link></div><button type="submit" className={`${primaryLink} w-full`}>Log in <ArrowRight size={16} aria-hidden="true" /></button></form><p className="mt-7 text-center text-sm text-[#667085]">New to Noor Academy? <Link href="/register" className="font-bold text-[#147d70]">Create an account</Link></p><Link href="/trial" className="mt-4 inline-flex w-full items-center justify-center gap-2 text-sm font-bold text-[#17324d]">Book a Free Trial <ArrowRight size={15} aria-hidden="true" /></Link><p className="mt-7 flex items-center justify-center gap-2 text-xs text-[#98a2b3]"><LockKeyhole size={14} aria-hidden="true" /> Secure authentication will be handled by the backend.</p></div></div></main>;
}
