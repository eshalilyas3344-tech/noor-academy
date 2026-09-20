"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const inputClass = "min-h-11 w-full rounded-xl border border-[#e7e5df] px-3 text-sm outline-none focus:border-[#147d70]";

export function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "teacher" | "parent">("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, role }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Unable to create your account.");
        return;
      }
      router.push(data.redirectUrl);
      router.refresh();
    } catch {
      setError("Unable to connect to the registration service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[#fcfbf7] py-12 sm:py-20">
      <div className="mx-auto max-w-xl px-5 sm:px-8">
        <div className="rounded-2xl border border-[#e7e5df] bg-white p-6 shadow-[0_8px_30px_rgba(23,50,77,0.04)] sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#147d70]">Noor Academy account</p>
          <h1 className="mt-3 font-display text-4xl text-[#17324d]">Create your account</h1>
          <p className="mt-3 text-sm leading-6 text-[#667085]">Choose your portal, then use the account to sign in and continue to your workspace.</p>
          {error && <p role="alert" className="mt-5 rounded-xl bg-[#fdf0ed] p-4 text-sm font-semibold text-[#b5473f]">{error}</p>}
          <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="block text-sm font-semibold text-[#17324d]">Account type<select value={role} onChange={(event) => setRole(event.target.value as typeof role)} className={`${inputClass} mt-2`}><option value="student">Student</option><option value="parent">Parent</option><option value="teacher">Teacher</option></select></label>
            <label className="block text-sm font-semibold text-[#17324d]">Full name<input required value={fullName} onChange={(event) => setFullName(event.target.value)} className={`${inputClass} mt-2`} /></label>
            <label className="block text-sm font-semibold text-[#17324d]">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={`${inputClass} mt-2`} /></label>
            <label className="block text-sm font-semibold text-[#17324d]">Password<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className={`${inputClass} mt-2`} /></label>
            <button disabled={loading} className="min-h-11 w-full rounded-xl bg-[#147d70] px-5 text-sm font-bold text-white hover:bg-[#0f665c] disabled:opacity-60">{loading ? "Creating account..." : "Create account"}</button>
          </form>
          <p className="mt-6 text-center text-sm text-[#667085]">Already registered? <Link href={role === "teacher" ? "/teacher/login" : role === "parent" ? "/parent/login" : "/login"} className="font-bold text-[#147d70]">Sign in</Link></p>
        </div>
      </div>
    </main>
  );
}
