"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  ClipboardList,
  Clock,
  LayoutDashboard,
  LogOut,
  Menu,
  Play,
  Search,
  Settings,
  UsersRound,
  Video,
  X,
} from "lucide-react";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

const navGroups = [
  ["Overview", [{ label: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard }]],
  [
    "Teaching",
    [
      { label: "My Classes", href: "/teacher/classes", icon: Video },
      { label: "Students", href: "/teacher/students", icon: UsersRound },
      { label: "Schedule", href: "/teacher/schedule", icon: CalendarDays },
      { label: "Assignments", href: "/teacher/assignments", icon: ClipboardList },
      { label: "Attendance", href: "/teacher/attendance", icon: CheckCircle2 },
    ],
  ],
  [
    "Account",
    [
      { label: "Profile", href: "/teacher/profile", icon: UsersRound },
      { label: "Settings", href: "/teacher/settings", icon: Settings },
      { label: "Support", href: "/teacher/support", icon: CircleHelp },
    ],
  ],
] as const;

const teacherStats = [
  { label: "Active Students", value: "18", note: "Enrolled in your circles" },
  { label: "Today's Sessions", value: "4", note: "Live interactive classes" },
  { label: "Hours Taught", value: "142 hrs", note: "Verified curriculum time" },
  { label: "Attendance Rate", value: "98.2%", note: "Across all learner groups" },
];

const todayClasses = [
  {
    id: "cls-1",
    student: "Zayd Ibrahim",
    course: "Quran with Tajweed",
    time: "4:00 PM – 4:45 PM",
    status: "Upcoming",
    lesson: "Makharij al-Huroof (Throat Letters)",
  },
  {
    id: "cls-2",
    student: "Ahmed Khan",
    course: "Quran Reading Fluency",
    time: "5:15 PM – 6:00 PM",
    status: "Upcoming",
    lesson: "Surah Al-Mulk (Verses 1-10)",
  },
  {
    id: "cls-3",
    student: "Ayesha Khan",
    course: "Noorani Qaida",
    time: "6:30 PM – 7:00 PM",
    status: "Scheduled",
    lesson: "Lesson 7: Tanween & Noon Sakinah",
  },
];

const pendingReviews = [
  {
    id: "rev-1",
    student: "Zayd Ibrahim",
    assignment: "Surah Al-Baqarah Tajweed Recording",
    submitted: "Today at 11:30 AM",
  },
  {
    id: "rev-2",
    student: "Muhammad Khan",
    assignment: "Qaida Lesson 6 Practice Audio",
    submitted: "Yesterday",
  },
];

const card = "rounded-2xl border border-[#e7e5df] bg-white p-5 shadow-[0_8px_24px_rgba(23,50,77,0.04)]";

export function TeacherPortal() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useCurrentUser();
  const initials = user?.fullName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() ?? "--";

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Continue redirect even if network glitch
    } finally {
      router.push("/teacher/login");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] lg:flex">
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-[#17324d]/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#17324d] px-4 py-6 text-white transition-transform lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-3">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#147d70]">
              <BookOpen size={19} />
            </span>
            <span className="font-display text-xl">Noor Academy</span>
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close teacher navigation"
          >
            <X size={18} />
          </button>
        </div>

        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="mt-4 px-3 text-xs font-semibold text-white/55 hover:text-white"
        >
          Visit public website
        </Link>

        <p className="px-3 pb-3 pt-8 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
          Teacher Portal
        </p>

        <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto" aria-label="Teacher navigation">
          {navGroups.map(([group, items]) => (
            <div key={group}>
              <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">{group}</p>
              <div className="mt-2 space-y-1">
                {items.map(({ label, href, icon: Icon }) => {
                  const active = pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                        active ? "bg-white/12 text-white" : "text-white/65 hover:bg-white/8 hover:text-white"
                      }`}
                    >
                      <Icon size={17} />
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Working Logout button */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="mt-5 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
        >
          <LogOut size={17} />
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="min-w-0 flex-1">
        {/* Top Header */}
        <header className="flex min-h-20 items-center justify-between border-b border-[#e7e5df] bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex size-10 items-center justify-center rounded-xl border border-[#e7e5df] text-[#17324d] lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu size={19} />
            </button>
            <div className="hidden items-center gap-2 rounded-xl border border-[#e7e5df] px-3 py-2 text-sm text-[#98a2b3] sm:flex">
              <Search size={16} />
              <span>Search classes, students, or curriculum</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/teacher/notifications"
              aria-label="Notifications"
              className="relative text-[#667085] hover:text-[#147d70]"
            >
              <Bell size={19} />
              <span className="absolute -right-1 -top-1 size-2 rounded-full bg-[#c6a15b]" />
            </Link>

            <Link href="/teacher/profile" className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#147d70] text-xs font-bold text-white">
                {initials}
              </span>
              <span className="hidden text-sm font-bold text-[#17324d] sm:block">{user?.fullName ?? "Loading..."}</span>
            </Link>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#147d70]">Teacher Workspace</p>
            <h1 className="mt-2 font-display text-4xl text-[#17324d] sm:text-5xl">
              Assalamu Alaykum, {user?.fullName ?? "Teacher"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085]">
              Here is your teaching schedule and student review list for today.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {teacherStats.map((item) => (
              <div key={item.label} className={card}>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#98a2b3]">{item.label}</p>
                <p className="mt-3 font-display text-4xl text-[#17324d]">{item.value}</p>
                <p className="mt-1 text-xs text-[#667085]">{item.note}</p>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            {/* Today's Schedule Card */}
            <div className={card}>
              <div className="flex items-center justify-between border-b border-[#e7e5df] pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#147d70]">Daily Schedule</p>
                  <h2 className="mt-1 font-display text-2xl text-[#17324d]">Today&apos;s Live Classes</h2>
                </div>
                <span className="rounded-full bg-[#eef7f3] px-3 py-1 text-xs font-bold text-[#147d70]">
                  3 Upcoming Sessions
                </span>
              </div>

              <div className="mt-5 divide-y divide-[#e7e5df]">
                {todayClasses.map((cls) => (
                  <div key={cls.id} className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#17324d]">{cls.student}</span>
                        <span className="rounded-full bg-[#f5f1e8] px-2 py-0.5 text-[10px] font-bold text-[#8d6b2e]">
                          {cls.course}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#667085]">
                        <Clock size={12} className="inline mr-1 text-[#147d70]" />
                        {cls.time} · {cls.lesson}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/teacher/classes/${cls.id}`}
                        className="inline-flex min-h-9 items-center justify-center gap-2 rounded-xl bg-[#147d70] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#0f665c]"
                      >
                        <Play size={13} fill="currentColor" />
                        Launch Classroom
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Assignment Reviews */}
            <div className="space-y-6">
              <div className={card}>
                <div className="flex items-center justify-between border-b border-[#e7e5df] pb-4">
                  <h2 className="font-display text-2xl text-[#17324d]">Pending Reviews</h2>
                  <span className="rounded-full bg-[#fdf0ed] px-2.5 py-1 text-[11px] font-bold text-[#b5473f]">
                    {pendingReviews.length} To Grade
                  </span>
                </div>

                <div className="mt-4 divide-y divide-[#e7e5df]">
                  {pendingReviews.map((rev) => (
                    <div key={rev.id} className="py-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-[#17324d]">{rev.student}</p>
                        <span className="text-[10px] text-[#98a2b3]">{rev.submitted}</span>
                      </div>
                      <p className="mt-1 text-xs text-[#667085]">{rev.assignment}</p>
                      <button
                        type="button"
                        className="mt-2 text-xs font-bold text-[#147d70] hover:underline"
                      >
                        Listen &amp; Evaluate →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className={card}>
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#98a2b3]">Quick Actions</h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link
                    href="/teacher/schedule"
                    className="rounded-xl border border-[#e7e5df] p-3 text-center text-xs font-bold text-[#17324d] hover:border-[#147d70] hover:text-[#147d70]"
                  >
                    View Week Calendar
                  </Link>
                  <Link
                    href="/teacher/attendance"
                    className="rounded-xl border border-[#e7e5df] p-3 text-center text-xs font-bold text-[#17324d] hover:border-[#147d70] hover:text-[#147d70]"
                  >
                    Record Attendance
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
