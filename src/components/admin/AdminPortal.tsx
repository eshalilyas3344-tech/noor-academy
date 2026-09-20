"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Bell, BookOpen, CalendarDays, ChevronRight, ClipboardList, LayoutDashboard, LogOut, Menu, Settings, ShieldCheck, UsersRound, WalletCards, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SupportWorkspace } from "@/components/support/SupportWorkspace";
import { AdminManagement } from "@/components/admin/AdminManagement";

const links = [
  ["Overview", [{ label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard }]],
  ["Management", [{ label: "Students", href: "/admin/students", icon: UsersRound }, { label: "Parents", href: "/admin/parents", icon: UsersRound }, { label: "Teachers", href: "/admin/teachers", icon: UsersRound }, { label: "Courses", href: "/admin/courses", icon: BookOpen }, { label: "Classes", href: "/admin/classes", icon: CalendarDays }, { label: "Trial Requests", href: "/admin/trial-requests", icon: ClipboardList }]],
  ["Operations", [{ label: "Attendance", href: "/admin/attendance", icon: ClipboardList }, { label: "Payments", href: "/admin/payments", icon: WalletCards }, { label: "Reports", href: "/admin/reports", icon: BarChart3 }, { label: "Notifications", href: "/admin/notifications", icon: Bell }]],
  ["System", [{ label: "Settings", href: "/admin/settings/general", icon: Settings }, { label: "Profile", href: "/admin/profile", icon: ShieldCheck }]],
] as const;

const card = "rounded-2xl border border-[#e7e5df] bg-white p-5 shadow-[0_8px_24px_rgba(23,50,77,0.04)]";
const stats = [["Total students", "248", "Active enrolled learners"], ["Total teachers", "32", "Verified instructors"], ["Trial requests", "18", "Pending admissions review"], ["Active courses", "12", "Published curriculum"]];
const routeNames: Record<string, string> = { students: "Students Management", parents: "Parents Management", teachers: "Teachers Management", courses: "Courses Management", "course-categories": "Course Categories", "trial-requests": "Trial Requests", classes: "Classes Management", schedules: "Schedule Management", attendance: "Attendance Management", assignments: "Assignments Management", materials: "Learning Materials", progress: "Student Progress", payments: "Payments Management", subscriptions: "Subscriptions", "pricing-plans": "Pricing Plans", coupons: "Coupons", certificates: "Certificates", testimonials: "Testimonials", blog: "Blog Management", faqs: "FAQs Management", quran: "Quran Configuration", notifications: "Notifications Management", support: "Support Tickets", reports: "Reports", analytics: "Analytics", website: "Website Management", settings: "Settings", profile: "Admin Profile", login: "Admin Login", logout: "Admin Logout" };

function Sidebar({ close, onLogout }: { close: () => void; onLogout: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col bg-[#17324d] px-4 py-6 text-white">
      <div className="flex items-center justify-between px-3">
        <Link href="/" onClick={close} className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#147d70]">
            <BookOpen size={19} />
          </span>
          <span className="font-display text-xl">Noor Academy</span>
        </Link>
        <button type="button" onClick={close} className="lg:hidden" aria-label="Close admin navigation">
          <X size={19} />
        </button>
      </div>
      <Link href="/" onClick={close} className="mt-4 px-3 text-xs font-semibold text-white/55 hover:text-white">
        Visit public website
      </Link>
      <p className="px-3 pb-3 pt-8 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Admin portal</p>
      <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto" aria-label="Admin navigation">
        {links.map(([group, items]) => (
          <div key={group}>
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">{group}</p>
            <div className="mt-2 space-y-1">
              {items.map(({ label, href, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link key={href} href={href} onClick={close} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${active ? "bg-white/12 text-white" : "text-white/65 hover:bg-white/8 hover:text-white"}`}>
                    <Icon size={17} />{label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <button
        type="button"
        onClick={onLogout}
        className="mt-5 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <LogOut size={17} />Logout
      </button>
    </aside>
  );
}

function DashboardContent() {
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#147d70]">Admin overview</p>
      <h1 className="mt-2 font-display text-4xl text-[#17324d] sm:text-5xl">Good morning, Administrator</h1>
      <p className="mt-3 text-sm text-[#667085]">Here&apos;s an overview of current academy operations, admissions, and course metrics.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, note]) => (
          <div className={card} key={label}>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#98a2b3]">{label}</p>
            <p className="mt-3 font-display text-4xl text-[#17324d]">{value}</p>
            <p className="mt-1 text-xs text-[#667085]">{note}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <section className={card}>
          <h2 className="font-display text-2xl text-[#17324d]">Student Growth</h2>
          <div className="mt-8 flex h-48 items-end gap-3">
            {[35, 48, 42, 65, 58, 76, 88, 72, 94, 82, 100, 96].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-lg bg-[#147d70]" style={{ height: `${height}%` }} />
                <span className="text-[10px] text-[#98a2b3]">M{index + 1}</span>
              </div>
            ))}
          </div>
        </section>
        <section className={card}>
          <h2 className="font-display text-2xl text-[#17324d]">Today&apos;s Classes</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-[#eef7f3] p-4">
              <p className="text-sm font-bold text-[#17324d]">Quran with Tajweed (Level 2)</p>
              <p className="mt-1 text-xs text-[#667085]">Ustadh Tariq Al-Mansoor · 6:00 PM</p>
            </div>
            <div className="rounded-xl bg-[#f5f1e8] p-4">
              <p className="text-sm font-bold text-[#17324d]">Quran Reading &amp; Memorization</p>
              <p className="mt-1 text-xs text-[#667085]">Sheikh Ahmad Hassan · 7:00 PM</p>
            </div>
          </div>
          <Link href="/admin/classes" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#147d70]">
            Manage classes <ChevronRight size={15} />
          </Link>
        </section>
      </div>
    </>
  );
}

function SectionContent({ pathname }: { pathname: string }) {
  const segment = pathname.split("/").filter(Boolean)[1] ?? "admin";
  if (segment === "support") return <SupportWorkspace admin />;
  if (segment === "profile") return <AdminProfile />;
  if (["students", "parents", "teachers", "courses"].includes(segment)) return <AdminManagement type={segment as "students" | "parents" | "teachers" | "courses"} />;
  if (segment === "reports" || segment === "attendance") return <AdminReportSection type={segment} />;
  const title = routeNames[segment] ?? "Admin Workspace";
  const detail = pathname.split("/").filter(Boolean).length > 2;
  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#147d70]">Admin workspace</p>
          <h1 className="mt-2 break-words font-display text-4xl text-[#17324d] sm:text-5xl">{detail ? `${title} Detail` : title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#667085]">Manage {title.toLowerCase()} records, user status, and operations.</p>
        </div>
        <button type="button" className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#e7e5df] px-4 text-sm font-bold text-[#17324d] hover:border-[#147d70]">
          Create / Add
        </button>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className={card}>
          <p className="text-xs font-bold uppercase text-[#98a2b3]">Active Entries</p>
          <p className="mt-3 font-display text-4xl text-[#17324d]">24</p>
          <p className="mt-1 text-xs text-[#667085]">Operational records</p>
        </div>
        <div className={card}>
          <p className="text-xs font-bold uppercase text-[#98a2b3]">System Status</p>
          <p className="mt-3 font-display text-3xl text-[#147d70]">Operational</p>
          <p className="mt-1 text-xs text-[#667085]">Database synchronized</p>
        </div>
        <div className={card}>
          <p className="text-xs font-bold uppercase text-[#98a2b3]">Controls</p>
          <p className="mt-3 text-sm font-bold text-[#17324d]">Search · Filter · Export</p>
          <p className="mt-1 text-xs text-[#667085]">Administrative tools</p>
        </div>
      </div>
      <section className={`${card} mt-5 overflow-x-auto`}>
        <div className="flex min-w-[620px] items-center justify-between border-b border-[#e7e5df] pb-4">
          <h2 className="font-display text-2xl text-[#17324d]">{detail ? "Record details" : "Management records"}</h2>
          <input placeholder="Search records" className="min-h-10 rounded-xl border border-[#e7e5df] px-3 text-sm" />
        </div>
        <div className="mt-5 min-w-[620px] divide-y divide-[#e7e5df]">
          <div className="grid grid-cols-4 gap-4 py-4 text-xs font-bold uppercase tracking-[0.1em] text-[#98a2b3]">
            <span>Name / ID</span><span>Status</span><span>Updated</span><span>Action</span>
          </div>
          {["Primary record", "Secondary record", "Pending review"].map((record) => (
            <div key={record} className="grid grid-cols-4 gap-4 py-4 text-sm">
              <span className="font-semibold text-[#17324d]">{record}</span>
              <span className="text-[#147d70]">Active</span>
              <span className="text-[#667085]">Sep 18, 2026</span>
              <Link href={detail ? "/admin/dashboard" : `${pathname}/record-1`} className="font-bold text-[#147d70]">
                {detail ? "Back" : "View"}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function AdminReportSection({ type }: { type: string }) {
  const reportType = type === "attendance" ? "attendance" : "overview";
  return <><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#147d70]">Admin workspace</p><h1 className="mt-2 font-display text-4xl text-[#17324d]">{type === "attendance" ? "Attendance Management" : "Reports"}</h1><p className="mt-3 text-sm text-[#667085]">Download a report generated from the current database records.</p><a href={`/api/admin/reports?type=${reportType}`} className="mt-6 inline-flex min-h-10 items-center rounded-xl bg-[#147d70] px-4 text-sm font-bold text-white">Download PDF</a></>;
}

function AdminProfile() {
  const [profile, setProfile] = useState<{ fullName: string; email: string; role: string } | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  useEffect(() => {
    void fetch("/api/auth/me")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !data.user) throw new Error(data.error || "Unable to load your profile.");
        return data;
      })
      .then((data) => setProfile(data.user))
      .catch((error: Error) => setProfileError(error.message));
  }, []);
  return <><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#147d70]">Account</p><h1 className="mt-2 font-display text-4xl text-[#17324d]">Admin Profile</h1>{profileError && <p role="alert" className="mt-5 max-w-2xl rounded-xl bg-[#fdf0ed] p-4 text-sm font-semibold text-[#b5473f]">{profileError}</p>}<section className={`${card} mt-8 max-w-2xl`}><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#98a2b3]">Profile information</p><dl className="mt-5 space-y-4 text-sm"><div><dt className="text-[#667085]">Name</dt><dd className="font-bold text-[#17324d]">{profile ? profile.fullName : profileError ? "Unavailable" : "Loading..."}</dd></div><div><dt className="text-[#667085]">Email</dt><dd className="font-bold text-[#17324d]">{profile ? profile.email : profileError ? "Unavailable" : "Loading..."}</dd></div><div><dt className="text-[#667085]">Role</dt><dd className="font-bold capitalize text-[#147d70]">{profile ? profile.role : profileError ? "Unavailable" : "Loading..."}</dd></div></dl></section></>;
}

export function AdminPortal() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname === "/admin" || pathname === "/admin/dashboard";

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] lg:flex">
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar close={() => setOpen(false)} onLogout={handleLogout} />
      </div>
      {open && <button type="button" className="fixed inset-0 z-40 bg-[#17324d]/40 lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation overlay" />}
      <div className="min-w-0 flex-1">
        <header className="flex min-h-20 items-center justify-between border-b border-[#e7e5df] bg-white px-4 sm:px-6 lg:px-8">
          <button type="button" onClick={() => setOpen(true)} className="flex size-10 items-center justify-center rounded-xl border border-[#e7e5df] lg:hidden" aria-label="Open admin navigation">
            <Menu size={19} />
          </button>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/admin/notifications" aria-label="Notifications"><Bell size={19} className="text-[#667085]" /></Link>
            <Link href="/admin/profile" className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#147d70] text-xs font-bold text-white">AD</span>
              <span className="hidden text-sm font-bold text-[#17324d] sm:block">Administrator</span>
            </Link>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
          {isDashboard ? <DashboardContent /> : <SectionContent pathname={pathname} />}
        </main>
      </div>
    </div>
  );
}
