"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, BookOpen, Eye, EyeOff, Loader2, ShieldAlert, Sparkles, User } from "lucide-react";

export type PortalRole = "student" | "teacher" | "parent" | "admin";

interface PortalConfig {
  eyebrow: string;
  title: string;
  description: string;
  heroHeadline: string;
  heroSubtext: string;
  portalName: string;
  badgeTone: string;
  registerLink?: { label: string; href: string };
  helpLink?: { label: string; href: string };
  switchers: { label: string; href: string }[];
}

const configs: Record<PortalRole, PortalConfig> = {
  student: {
    eyebrow: "Student Portal Access",
    title: "Student Login",
    description: "Access your Quran lessons, live classes, assignments, and verified learning progress.",
    heroHeadline: "Continue your Quran learning journey.",
    heroSubtext: "Personalized lessons, qualified teachers, and dedicated learning tools designed for your spiritual growth.",
    portalName: "Student Portal",
    badgeTone: "bg-[#eef7f3] text-[#147d70]",
    registerLink: { label: "Create an account", href: "/register" },
    helpLink: { label: "Book a Free Trial", href: "/trial" },
    switchers: [
      { label: "Teacher Portal", href: "/teacher/login" },
      { label: "Parent Portal", href: "/parent/login" },
    ],
  },
  teacher: {
    eyebrow: "Educator & Instructor Portal",
    title: "Teacher Login",
    description: "Manage your assigned students, scheduled Quran sessions, attendance, and feedback.",
    heroHeadline: "Inspiring minds. Nurturing hearts.",
    heroSubtext: "Welcome back to your Noor Academy teaching dashboard. Your schedule, students, and classroom tools are ready.",
    portalName: "Teacher Portal",
    badgeTone: "bg-[#f5f1e8] text-[#8d6b2e]",
    helpLink: { label: "Teacher Support & Help", href: "/support" },
    switchers: [
      { label: "Student Portal", href: "/login" },
      { label: "Parent Portal", href: "/parent/login" },
    ],
  },
  parent: {
    eyebrow: "Family & Guardian Portal",
    title: "Parent Login",
    description: "Monitor your children's attendance, teacher evaluations, assignments, and learning milestones.",
    heroHeadline: "Partnering in your family's Quran education.",
    heroSubtext: "Stay connected with your child's learning rhythm, class schedules, and teacher observations in one transparent place.",
    portalName: "Parent Portal",
    badgeTone: "bg-[#eef7f3] text-[#147d70]",
    registerLink: { label: "Enroll a child", href: "/register" },
    helpLink: { label: "Book a Free Trial", href: "/trial" },
    switchers: [
      { label: "Student Portal", href: "/login" },
      { label: "Teacher Portal", href: "/teacher/login" },
    ],
  },
  admin: {
    eyebrow: "Academy Administration",
    title: "Admin Login",
    description: "Secure administrative access for system operations, curriculum, user management, and reporting.",
    heroHeadline: "Academy operations & institutional control.",
    heroSubtext: "Authorized personnel only. All access is cryptographically verified and audited.",
    portalName: "Administration Portal",
    badgeTone: "bg-[#fdf0ed] text-[#b5473f]",
    helpLink: { label: "Technical Support", href: "/support" },
    switchers: [
      { label: "Student Portal", href: "/login" },
      { label: "Teacher Portal", href: "/teacher/login" },
      { label: "Parent Portal", href: "/parent/login" },
    ],
  },
};

export function PortalLoginForm({ role }: { role: PortalRole }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const config = configs[role];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          portalRole: role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Authentication failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      // Successful authentication
      const destination = returnUrl || data.redirectUrl;
      router.push(destination);
      router.refresh();
    } catch {
      setErrorMessage("Unable to connect to authentication server. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#fcfbf7] py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Branded Hero Column */}
          <div className="hidden rounded-[2rem] bg-[#17324d] p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#e9ddbf]">
                <Sparkles size={13} className="text-[#c6a15b]" />
                <span>{config.portalName}</span>
              </div>
              <h1 className="mt-6 font-display text-4xl leading-tight text-white sm:text-5xl">
                {config.heroHeadline}
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/70">
                {config.heroSubtext}
              </p>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#147d70] text-white">
                  <BookOpen size={20} />
                </span>
                <div>
                  <p className="font-display text-base font-semibold text-white">Noor Academy</p>
                  <p className="text-xs text-white/60">Verified Quran Education</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="rounded-2xl border border-[#e7e5df] bg-white p-6 sm:p-10 shadow-[0_8px_30px_rgba(23,50,77,0.04)]">
            <div className="flex items-center justify-between gap-4">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${config.badgeTone}`}>
                {config.eyebrow}
              </span>
              <Link href="/" className="text-xs font-semibold text-[#667085] hover:text-[#17324d]">
                Return home
              </Link>
            </div>

            <h2 className="mt-4 font-display text-3xl font-semibold text-[#17324d] sm:text-4xl">
              {config.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#667085]">
              {config.description}
            </p>

            {/* Error Message Banner */}
            {errorMessage && (
              <div
                role="alert"
                className="mt-6 flex items-start gap-3 rounded-xl border border-[#f5c6cb] bg-[#fdf0ed] p-4 text-sm text-[#b5473f]"
              >
                <ShieldAlert size={18} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold">Authentication failed</p>
                  <p className="mt-0.5 leading-5">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor={`email-${role}`}
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#667085]"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                    id={`email-${role}`}
                    type="email"
                    required
                    autoComplete="email"
                    disabled={loading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="min-h-12 w-full rounded-xl border border-[#e7e5df] px-4 pr-10 text-sm text-[#17324d] outline-none transition-colors placeholder:text-[#98a2b3] focus:border-[#147d70] disabled:opacity-50"
                  />
                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#98a2b3]">
                    <User size={18} />
                  </span>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor={`password-${role}`}
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-[#667085]"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-bold text-[#147d70] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id={`password-${role}`}
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    disabled={loading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="min-h-12 w-full rounded-xl border border-[#e7e5df] px-4 pr-11 text-sm text-[#17324d] outline-none transition-colors placeholder:text-[#98a2b3] focus:border-[#147d70] disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#98a2b3] hover:text-[#17324d]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-sm">
                <label className="flex items-center gap-2 text-[#667085] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="size-4 rounded accent-[#147d70]"
                  />
                  <span>Remember my session</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#147d70] px-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0f665c] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Verifying credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Log in to {config.portalName}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            {/* Extra Links */}
            <div className="mt-8 space-y-4 border-t border-[#e7e5df] pt-6 text-center text-sm text-[#667085]">
              {config.registerLink && (
                <p>
                  Need an account?{" "}
                  <Link href={config.registerLink.href} className="font-bold text-[#147d70] hover:underline">
                    {config.registerLink.label}
                  </Link>
                </p>
              )}

              {config.helpLink && (
                <p>
                  <Link href={config.helpLink.href} className="inline-flex items-center gap-1.5 font-bold text-[#17324d] hover:text-[#147d70]">
                    {config.helpLink.label} <ArrowRight size={14} />
                  </Link>
                </p>
              )}

              {/* Portal Switcher */}
              <div className="mt-4 rounded-xl bg-[#fcfbf7] p-3 border border-[#e7e5df]">
                <p className="text-xs font-semibold text-[#98a2b3]">Looking for another portal?</p>
                <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs font-bold text-[#147d70]">
                  {config.switchers.map((sw, index) => (
                    <span key={sw.href} className="inline-flex items-center gap-2">
                      {index > 0 && <span className="text-[#dcd9d0]">·</span>}
                      <Link href={sw.href} className="hover:underline">
                        {sw.label}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
