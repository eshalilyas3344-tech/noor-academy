"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, BookOpen, CalendarDays, Check, ChevronRight, CircleHelp, ClipboardList, FileText, GraduationCap, LayoutDashboard, LogOut, Menu, MessageSquare, Play, Search, Settings, UserRound, UsersRound, WalletCards, X } from "lucide-react";
import { assignments, lessons, materials, studentCourses, upcomingClasses } from "@/data/studentPortal";
import { SupportWorkspace } from "@/components/support/SupportWorkspace";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";

const navGroups = [
  ["Overview", [{ label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard }]],
  ["Learning", [{ label: "My Courses", href: "/student/courses", icon: BookOpen }, { label: "My Classes", href: "/student/classes", icon: UsersRound }, { label: "Schedule", href: "/student/schedule", icon: CalendarDays }, { label: "Lessons", href: "/student/lessons", icon: Play }, { label: "Learning Materials", href: "/student/materials", icon: FileText }, { label: "Assignments", href: "/student/assignments", icon: ClipboardList }]],
  ["Progress", [{ label: "Progress", href: "/student/progress", icon: GraduationCap }, { label: "Attendance", href: "/student/attendance", icon: Check }, { label: "Certificates", href: "/student/certificates", icon: FileText }]],
  ["Account", [{ label: "Payments", href: "/student/payments", icon: WalletCards }, { label: "Notifications", href: "/student/notifications", icon: Bell }, { label: "Profile", href: "/student/profile", icon: UserRound }, { label: "Settings", href: "/student/settings", icon: Settings }, { label: "Support", href: "/student/support", icon: CircleHelp }]],
] as const;

type Section = "dashboard" | "courses" | "course-detail" | "classes" | "schedule" | "live-class" | "lessons" | "materials" | "assignments" | "progress" | "attendance" | "certificates" | "payments" | "notifications" | "profile" | "settings" | "support";

const shell = "mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8";
const card = "rounded-2xl border border-[#e7e5df] bg-white p-5 shadow-[0_8px_24px_rgba(23,50,77,0.04)]";
const primary = "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#147d70] px-4 text-sm font-bold text-white hover:bg-[#0f665c]";
const outline = "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#e7e5df] px-4 text-sm font-bold text-[#17324d] hover:border-[#147d70] hover:text-[#147d70]";

function StatusBadge({ status }: { status: string }) {
  const tone = status === "Present" || status === "Completed" || status === "Confirmed" ? "bg-[#eef7f3] text-[#147d70]" : status === "Absent" || status === "Overdue" ? "bg-[#fdf0ed] text-[#b5473f]" : "bg-[#f5f1e8] text-[#8d6b2e]";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${tone}`}>{status}</span>;
}

function ProgressBar({ value }: { value: number }) {
  return <div className="h-2 overflow-hidden rounded-full bg-[#eef0ec]"><div className="h-full rounded-full bg-[#147d70]" style={{ width: `${value}%` }} /></div>;
}

function Sidebar({ close, onLogout }: { close: () => void; onLogout: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col bg-[#17324d] px-4 py-6 text-white">
      <div className="flex items-center justify-between px-3">
        <Link href="/" onClick={close} className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#147d70]">
            <BookOpen size={19} aria-hidden="true" />
          </span>
          <span className="font-display text-xl">Noor Academy</span>
        </Link>
        <button type="button" className="rounded-lg p-2 text-white/70 hover:bg-white/10 lg:hidden" onClick={close} aria-label="Close student navigation">
          <X size={18} />
        </button>
      </div>
      <Link href="/" onClick={close} className="mt-4 px-3 text-xs font-semibold text-white/55 hover:text-white">
        Visit public website
      </Link>
      <p className="px-3 pb-3 pt-8 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Student portal</p>
      <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto" aria-label="Student navigation">
        {navGroups.map(([group, items]) => (
          <div key={group}>
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">{group}</p>
            <div className="mt-2 space-y-1">
              {items.map(({ label, href, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link key={href} href={href} onClick={close} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${active ? "bg-white/12 text-white" : "text-white/65 hover:bg-white/8 hover:text-white"}`}>
                    <Icon size={17} aria-hidden="true" />
                    {label}
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
        <LogOut size={17} aria-hidden="true" />
        Logout
      </button>
    </aside>
  );
}

function Header({ openMenu }: { openMenu: () => void }) {
  const { user } = useCurrentUser();
  const initials = user?.fullName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() ?? "--";
  return (
    <header className="flex min-h-20 items-center justify-between border-b border-[#e7e5df] bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button type="button" onClick={openMenu} className="flex size-10 items-center justify-center rounded-xl border border-[#e7e5df] text-[#17324d] lg:hidden" aria-label="Open student navigation">
          <Menu size={19} />
        </button>
        <div className="hidden items-center gap-2 rounded-xl border border-[#e7e5df] px-3 py-2 text-sm text-[#98a2b3] sm:flex">
          <Search size={16} />
          <span>Search your learning space</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/student/notifications" aria-label="Notifications" className="relative text-[#667085] hover:text-[#147d70]">
          <Bell size={19} />
          <span className="absolute -right-1 -top-1 size-2 rounded-full bg-[#c6a15b]" />
        </Link>
        <Link href="/student/profile" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#147d70] text-xs font-bold text-white">{initials}</span>
          <span className="hidden text-sm font-bold text-[#17324d] sm:block">{user?.fullName ?? "Loading..."}</span>
        </Link>
      </div>
    </header>
  );
}

function PageTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-7">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#147d70]">{eyebrow}</p>
      <h1 className="mt-2 font-display text-4xl text-[#17324d] sm:text-5xl">{title}</h1>
      {text && <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085]">{text}</p>}
    </div>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className={card}>
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#98a2b3]">{label}</p>
      <p className="mt-3 font-display text-4xl text-[#17324d]">{value}</p>
      <p className="mt-1 text-xs text-[#667085]">{note}</p>
    </div>
  );
}

function CourseProgressCard({ course }: { course: typeof studentCourses[number] }) {
  return (
    <article className={card}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#147d70]">Enrolled Course</p>
          <h2 className="mt-2 font-display text-2xl text-[#17324d]">{course.title}</h2>
          <p className="mt-1 text-sm text-[#667085]">with {course.teacher}</p>
        </div>
        <span className="flex size-11 items-center justify-center rounded-xl bg-[#eef7f3] text-[#147d70]">
          <BookOpen size={21} />
        </span>
      </div>
      <div className="mt-6 flex items-center justify-between text-xs font-bold text-[#667085]">
        <span>Progress</span>
        <span className="text-[#147d70]">{course.progress}%</span>
      </div>
      <div className="mt-2"><ProgressBar value={course.progress} /></div>
      <div className="mt-5 flex items-center justify-between text-xs text-[#667085]">
        <span>{course.completed} of {course.total} lessons</span>
        <span>Next: {course.next}</span>
      </div>
      <Link href={`/student/courses/${course.id}`} className={`${outline} mt-5 w-full`}>
        Continue learning <ChevronRight size={15} />
      </Link>
    </article>
  );
}

function UpcomingClass({ compact = false }: { compact?: boolean }) {
  const item = upcomingClasses[0];
  return (
    <div className={card}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#147d70]">Next class</p>
          <h2 className="mt-2 font-display text-2xl text-[#17324d]">{item.course}</h2>
          <p className="mt-1 text-sm text-[#667085]">with {item.teacher}</p>
        </div>
        <StatusBadge status={item.status} />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs text-[#98a2b3]">When</p>
          <p className="mt-1 font-bold text-[#17324d]">{item.date} · {item.time}</p>
        </div>
        <div>
          <p className="text-xs text-[#98a2b3]">Duration</p>
          <p className="mt-1 font-bold text-[#17324d]">{item.duration}</p>
        </div>
      </div>
      <Link href="/student/live-class/class-tajweed" className={`${primary} mt-6 w-full`}>
        <Play size={15} fill="currentColor" />Join Class
      </Link>
      {!compact && <p className="mt-3 text-center text-xs text-[#98a2b3]">Live virtual classroom session</p>}
    </div>
  );
}

function Dashboard() {
  const { user } = useCurrentUser();
  return (
    <>
      <PageTitle eyebrow="Student dashboard" title={`Good morning, ${user?.fullName ?? "there"}`} text="Continue your Quran learning journey." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Metric label="Overall progress" value="68%" note="Active curriculum completion" />
        <Metric label="Lessons completed" value="32" note="Across enrolled courses" />
        <Metric label="Attendance" value="94%" note="18 attended · 1 missed" />
        <Metric label="Learning streak" value="7 days" note="Daily review streak" />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <UpcomingClass />
        <div className={card}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#147d70]">Learning progress</p>
              <h2 className="mt-2 font-display text-2xl text-[#17324d]">Keep your rhythm</h2>
            </div>
            <GraduationCap className="text-[#c6a15b]" />
          </div>
          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm font-bold text-[#667085]">
                <span>Quran with Tajweed</span>
                <span>68%</span>
              </div>
              <ProgressBar value={68} />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm font-bold text-[#667085]">
                <span>Quran Reading</span>
                <span>42%</span>
              </div>
              <ProgressBar value={42} />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm font-bold text-[#667085]">
                <span>Noorani Qaida</span>
                <span>84%</span>
              </div>
              <ProgressBar value={84} />
            </div>
          </div>
          <Link href="/student/progress" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#147d70]">
            View detailed progress <ChevronRight size={15} />
          </Link>
        </div>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div className={card}>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-[#17324d]">Upcoming classes</h2>
            <Link href="/student/schedule" className="text-sm font-bold text-[#147d70]">View schedule</Link>
          </div>
          <div className="mt-4 divide-y divide-[#e7e5df]">
            {upcomingClasses.map((item) => (
              <div key={item.course} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-[#17324d]">{item.course}</p>
                  <p className="mt-1 text-xs text-[#667085]">{item.teacher} · {item.date} · {item.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={item.status} />
                  <Link href="/student/live-class/class-tajweed" className="text-xs font-bold text-[#147d70]">Join</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={card}>
          <h2 className="font-display text-2xl text-[#17324d]">Teacher feedback</h2>
          <p className="mt-4 text-sm leading-7 text-[#667085]">
            “Keep practicing the pause points from this week’s lesson. Your consistency is building well.”
          </p>
          <p className="mt-5 text-xs font-bold text-[#147d70]">Ustadh Tariq Al-Mansoor · Lesson feedback</p>
        </div>
      </div>
    </>
  );
}

function Courses() {
  const [courses, setCourses] = useState<{ id: string; title: string; description: string; progress: number; completed: number; total: number; teacher: string; next: string }[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    void fetch("/api/portal").then((response) => response.ok ? response.json() : { enrollments: [] }).then((data) => {
      if (!active) return;
      setCourses(data.enrollments.map((item: { course_id: string; course_name: string }) => ({ id: item.course_id, title: item.course_name, description: "Enrolled Noor Academy course", progress: 0, completed: 0, total: 0, teacher: "Assigned teacher", next: "No next lesson scheduled" })));
      setLoading(false);
    }).catch(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return (
    <>
      <PageTitle eyebrow="Learning" title="My courses" text="Your enrolled learning paths and next steps." />
      {loading ? <p className="text-sm text-[#667085]">Loading your courses...</p> : courses.length === 0 ? <div className={card}><p className="text-sm text-[#667085]">No courses enrolled yet.</p></div> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{courses.map((course) => <CourseProgressCard key={course.id} course={course} />)}</div>}
    </>
  );
}

function CourseDetail() {
  const course = studentCourses[0];
  return (
    <>
      <Link href="/student/courses" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#147d70]">
        <ChevronRight className="rotate-180" size={15} />Back to courses
      </Link>
      <PageTitle eyebrow="Course detail" title={course.title} text="A focused course space for lessons, assignments, materials, and teacher feedback." />
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Progress" value={`${course.progress}%`} note="Overall progress" />
        <Metric label="Lessons" value={`${course.completed}/${course.total}`} note="Completed lessons" />
        <Metric label="Teacher" value={course.teacher} note="Lead Instructor" />
      </div>
      <section className={`${card} mt-5`}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-[#17324d]">Curriculum and lessons</h2>
          <StatusBadge status="In Progress" />
        </div>
        <div className="mt-5 divide-y divide-[#e7e5df]">
          {lessons.map((lesson) => (
            <div key={lesson.title} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-[#17324d]">{lesson.title}</p>
                <p className="mt-1 text-xs text-[#667085]">{lesson.course} · {lesson.duration}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={lesson.status} />
                {lesson.status !== "Locked" && <Link href="/student/lessons" className="text-xs font-bold text-[#147d70]">{lesson.status === "Completed" ? "Review" : "Continue"}</Link>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Classes() {
  return (
    <>
      <PageTitle eyebrow="Learning" title="My classes" text="Upcoming, today's, and completed classes in one view." />
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Today" value="1" note="Scheduled live class" />
        <Metric label="Upcoming" value="3" note="Scheduled sessions" />
        <Metric label="Completed" value="18" note="Attended sessions" />
      </div>
      <section className={`${card} mt-5`}>
        <h2 className="font-display text-2xl text-[#17324d]">Class list</h2>
        <div className="mt-4 divide-y divide-[#e7e5df]">
          {upcomingClasses.map((item) => (
            <div key={item.course} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-[#17324d]">{item.course}</p>
                <p className="mt-1 text-sm text-[#667085]">{item.teacher} · {item.date} · {item.time} · {item.duration}</p>
              </div>
              <div className="flex gap-3">
                <StatusBadge status={item.status} />
                <Link href="/student/live-class/class-tajweed" className={outline}>View details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Schedule() {
  return (
    <>
      <PageTitle eyebrow="Learning" title="Schedule" text="A responsive week view for your class calendar." />
      <div className={`${card} overflow-hidden`}>
        <div className="flex flex-col justify-between gap-4 border-b border-[#e7e5df] pb-5 sm:flex-row sm:items-center">
          <div className="flex gap-2">
            <button type="button" className="rounded-lg bg-[#17324d] px-4 py-2 text-xs font-bold text-white">Week</button>
            <button type="button" className="rounded-lg border border-[#e7e5df] px-4 py-2 text-xs font-bold text-[#667085]">Month</button>
            <button type="button" className="rounded-lg border border-[#e7e5df] px-4 py-2 text-xs font-bold text-[#667085]">List</button>
          </div>
          <p className="text-sm font-bold text-[#17324d]">September 16–22, 2026</p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-7">
          {["Mon 16", "Tue 17", "Wed 18", "Thu 19", "Fri 20", "Sat 21", "Sun 22"].map((day, index) => (
            <div key={day} className="min-h-32 rounded-xl border border-[#e7e5df] bg-[#fcfbf7] p-3">
              <p className="text-xs font-bold text-[#667085]">{day}</p>
              {index < 3 && (
                <div className="mt-5 rounded-lg bg-[#eef7f3] p-3">
                  <p className="text-xs font-bold text-[#147d70]">{upcomingClasses[index].course}</p>
                  <p className="mt-1 text-[10px] text-[#667085]">{upcomingClasses[index].time}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function LiveClass() {
  return (
    <>
      <PageTitle eyebrow="Live classroom" title="Live Quran Class" text="Interactive live classroom environment." />
      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className={`${card} flex min-h-[420px] flex-col items-center justify-center bg-[#17324d] text-center`}>
          <div className="flex size-20 items-center justify-center rounded-full bg-[#147d70] text-white">
            <Play size={30} fill="currentColor" />
          </div>
          <h2 className="mt-6 font-display text-3xl text-white">Your classroom is ready</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/60">
            Virtual learning classroom. Your teacher will start the live stream at the scheduled time.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button type="button" className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white" aria-label="Toggle microphone">◉</button>
            <button type="button" className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white" aria-label="Toggle camera">□</button>
            <button type="button" className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white" aria-label="Open chat"><MessageSquare size={17} /></button>
            <Link href="/student/classes" className="inline-flex min-h-11 items-center rounded-full bg-[#b5473f] px-5 text-sm font-bold text-white">Leave class</Link>
          </div>
        </div>
        <aside className="space-y-5">
          <div className={card}>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#147d70]">Teacher</p>
            <h2 className="mt-2 font-display text-2xl text-[#17324d]">Ustadh Tariq Al-Mansoor</h2>
            <p className="mt-2 text-sm text-[#667085]">Quran with Tajweed · Today 6:00 PM</p>
          </div>
          <div className={card}>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#147d70]">Class notes</p>
            <p className="mt-3 text-sm leading-6 text-[#667085]">Lesson reference: Surah Al-Mulk verse 1-5 with focus on Noon Sakinah rules.</p>
          </div>
        </aside>
      </div>
    </>
  );
}

function Lessons() {
  return (
    <>
      <PageTitle eyebrow="Learning" title="Lessons" text="Continue a lesson or revisit completed practice." />
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson.title} className={`${card} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
            <div>
              <p className="font-bold text-[#17324d]">{lesson.title}</p>
              <p className="mt-1 text-sm text-[#667085]">{lesson.course} · {lesson.duration}</p>
              <div className="mt-3 w-48"><ProgressBar value={lesson.progress} /></div>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={lesson.status} />
              <Link href="/student/courses/tajweed" className={outline}>{lesson.status === "Completed" ? "Review" : "Continue"}</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Materials() {
  return (
    <>
      <PageTitle eyebrow="Learning" title="Learning materials" text="Curriculum notes, recitation recordings, and worksheets." />
      <div className="grid gap-5 md:grid-cols-2">
        {materials.map((material) => (
          <article key={material.title} className={card}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-[#eef7f3] px-3 py-1 text-[10px] font-bold uppercase text-[#147d70]">{material.type}</span>
                <h2 className="mt-4 font-display text-2xl text-[#17324d]">{material.title}</h2>
                <p className="mt-2 text-sm text-[#667085]">{material.course} · {material.date}</p>
              </div>
              <FileText className="text-[#c6a15b]" />
            </div>
            <button type="button" className={`${outline} mt-6`}>View Resource</button>
          </article>
        ))}
      </div>
    </>
  );
}

function Assignments() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <PageTitle eyebrow="Learning" title="Assignments" text="Track upcoming work, submissions, and teacher feedback." />
      {submitted && <div className="mb-5 rounded-xl bg-[#eef7f3] p-4 text-sm font-semibold text-[#147d70]" role="status">Assignment submission saved successfully.</div>}
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <article key={assignment.title} className={card}>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="font-bold text-[#17324d]">{assignment.title}</p>
                  <p className="mt-1 text-sm text-[#667085]">{assignment.course} · Due {assignment.due} · {assignment.teacher}</p>
                </div>
                <StatusBadge status={assignment.status} />
              </div>
              <div className="mt-5 flex gap-3">
                <button type="button" className={outline}>View details</button>
                {assignment.status === "Upcoming" && <button type="button" onClick={() => setSubmitted(true)} className={primary}>Submit Assignment</button>}
              </div>
            </article>
          ))}
        </div>
        <div className={card}>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#147d70]">Submission area</p>
          <h2 className="mt-2 font-display text-2xl text-[#17324d]">Tajweed practice recording</h2>
          <p className="mt-3 text-sm leading-6 text-[#667085]">Upload your audio recording or written reflection for teacher review.</p>
          <button type="button" className={`${outline} mt-5 w-full`}>Upload Assignment File</button>
        </div>
      </div>
    </>
  );
}

function Progress() {
  return (
    <>
      <PageTitle eyebrow="Progress" title="Your learning progress" text="Your verified Quran learning progress and teacher feedback." />
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Overall progress" value="68%" note="Across enrolled courses" />
        <Metric label="Assignments" value="12/16" note="Completed" />
        <Metric label="Streak" value="7 days" note="Daily review streak" />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className={card}>
          <h2 className="font-display text-2xl text-[#17324d]">Course progress</h2>
          <div className="mt-6 space-y-6">
            {studentCourses.slice(0, 4).map((course) => (
              <div key={course.id}>
                <div className="mb-2 flex justify-between text-sm font-bold text-[#667085]">
                  <span>{course.title}</span>
                  <span>{course.progress}%</span>
                </div>
                <ProgressBar value={course.progress} />
              </div>
            ))}
          </div>
        </div>
        <div className={card}>
          <h2 className="font-display text-2xl text-[#17324d]">Recent feedback</h2>
          <p className="mt-5 text-sm leading-7 text-[#667085]">
            “Your consistency is building well. Keep returning to the practice points from each lesson.”
          </p>
          <p className="mt-4 text-xs font-bold text-[#147d70]">Ustadh Tariq Al-Mansoor · Lesson note</p>
        </div>
      </div>
    </>
  );
}

function Attendance() {
  const [records, setRecords] = useState<{ id: string; date: string; class_title?: string; status: string }[]>([]);
  useEffect(() => { void fetch("/api/portal").then((response) => response.ok ? response.json() : { attendance: [] }).then((data) => setRecords(data.attendance)); }, []);
  return (
    <>
      <PageTitle eyebrow="Progress" title="Attendance" text="Review verified attendance records by month." />
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Overall" value={records.length ? `${Math.round(records.filter((item) => item.status === "Present").length / records.length * 100)}%` : "0%"} note="Recorded attendance" />
        <Metric label="Present" value={String(records.filter((item) => item.status === "Present").length)} note="Classes attended" />
        <Metric label="Missed" value={String(records.filter((item) => item.status !== "Present").length)} note="Classes missed" />
      </div>
      <div className={`${card} mt-5 overflow-x-auto`}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl text-[#17324d]">Attendance history</h2>
          <select className="rounded-lg border border-[#e7e5df] bg-white px-3 py-2 text-sm">
            <option>September 2026</option>
            <option>August 2026</option>
          </select>
        </div>
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-[#e7e5df] text-xs uppercase tracking-[0.12em] text-[#98a2b3]">
            <tr>
              <th className="pb-3">Date</th>
              <th className="pb-3">Course</th>
              <th className="pb-3">Teacher</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e7e5df]">
            {records.map((item) => (
              <tr key={item.id}>
                <td className="py-4 font-semibold text-[#17324d]">{item.date}</td>
                <td className="py-4 text-[#667085]">{item.class_title ?? "Class"}</td>
                <td className="py-4 text-[#667085]">Recorded</td>
                <td className="py-4"><StatusBadge status={item.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {!records.length && <p className="pt-5 text-sm text-[#667085]">No attendance records yet.</p>}
      </div>
    </>
  );
}

function Certificates() {
  return (
    <>
      <PageTitle eyebrow="Progress" title="Certificates" text="Official certificates and course completion credentials." />
      <div className="grid gap-5 md:grid-cols-2">
        {studentCourses.slice(0, 2).map((course, index) => (
          <article key={course.id} className={`${card} relative overflow-hidden`}>
            <div className="absolute right-0 top-0 size-24 rounded-bl-full bg-[#eef7f3]" />
            <GraduationCap className="text-[#c6a15b]" size={30} />
            <h2 className="mt-6 font-display text-2xl text-[#17324d]">{course.title}</h2>
            <p className="mt-2 text-sm text-[#667085]">Completion date: {index ? "In Progress" : "Aug 28, 2026"}</p>
            <p className="mt-1 text-xs font-bold text-[#147d70]">{index ? "Curriculum in progress" : "Earned Certificate"}</p>
            <div className="mt-6 flex gap-3">
              <button type="button" className={outline}>View certificate</button>
              <button type="button" className={outline}>Download</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Payments() {
  return (
    <>
      <PageTitle eyebrow="Account" title="Payments" text="Your enrollment billing and tuition receipts." />
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Current plan" value="Standard" note="Tuition package" />
        <Metric label="Status" value="Active" note="Account in good standing" />
        <Metric label="Next billing" value="Oct 01, 2026" note="Monthly cycle" />
      </div>
      <div className={`${card} mt-5 overflow-x-auto`}>
        <h2 className="font-display text-2xl text-[#17324d]">Payment history</h2>
        <table className="mt-5 w-full min-w-[600px] text-left text-sm">
          <thead className="border-b border-[#e7e5df] text-xs uppercase tracking-[0.12em] text-[#98a2b3]">
            <tr>
              <th className="pb-3">Invoice</th>
              <th className="pb-3">Plan</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4 font-semibold text-[#17324d]">INV-2026-0891</td>
              <td className="py-4 text-[#667085]">Standard Plan</td>
              <td className="py-4 text-[#667085]">Sep 01, 2026</td>
              <td className="py-4"><StatusBadge status="Confirmed" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function Notifications() {
  const [items, setItems] = useState<{ id: string; title: string; message: string; read_at: string | null }[]>([]);
  useEffect(() => { void fetch("/api/portal").then((response) => response.ok ? response.json() : { notifications: [] }).then((data) => setItems(data.notifications)); }, []);
  return (
    <>
      <PageTitle eyebrow="Account" title="Notifications" text="Stay close to class reminders, feedback, and learning updates." />
      <div className="flex justify-end">
        <button type="button" onClick={() => setItems(items.map((item) => ({ ...item, read_at: new Date().toISOString() })))} className={outline}>
          Mark all as read
        </button>
      </div>
      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <article key={item.id} className={`${card} flex gap-4 ${!item.read_at ? "border-[#bfe0d4] bg-[#fbfffd]" : ""}`}>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eef7f3] text-[#147d70]">
              <Bell size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap justify-between gap-2">
                <h2 className="font-bold text-[#17324d]">{item.title}</h2>
                {!item.read_at && <span className="rounded-full bg-[#c6a15b] px-2 py-1 text-[10px] font-bold text-white">Unread</span>}
              </div>
              <p className="mt-1 text-sm leading-6 text-[#667085]">{item.message}</p>
              <p className="mt-2 text-xs font-bold text-[#98a2b3]">Academy Alert</p>
            </div>
            <button type="button" onClick={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))} className="self-start text-xs font-bold text-[#98a2b3] hover:text-[#b5473f]">
              Clear
            </button>
          </article>
        ))}
        {!items.length && <div className={card}><p className="text-sm text-[#667085]">No notifications yet.</p></div>}
      </div>
    </>
  );
}

function Profile() {
  const [saved, setSaved] = useState(false);
  const { user } = useCurrentUser();
  const initials = user?.fullName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() ?? "--";
  return (
    <>
      <PageTitle eyebrow="Account" title="Profile" text="Manage your learner profile and preferences." />
      {saved && <div className="mb-5 rounded-xl bg-[#eef7f3] p-4 text-sm font-semibold text-[#147d70]" role="status">Profile changes saved successfully.</div>}
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <div className={card}>
          <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-[#147d70] font-display text-3xl text-white">{initials}</div>
          <h2 className="mt-5 text-center font-display text-2xl text-[#17324d]">{user?.fullName ?? "Loading..."}</h2>
          <p className="mt-1 text-center text-sm text-[#667085]">Intermediate learner</p>
          <button type="button" className={`${outline} mt-5 w-full`}>Change photo</button>
        </div>
        <div className={card}>
          <div className="grid gap-5 sm:grid-cols-2">
              {[["Full name", user?.fullName ?? ''], ["Email", user?.email ?? ''], ["Phone", ''], ["Country", ''], ["Age", ''], ["Learning level", ''], ["Preferred class time", ''], ["Teacher preference", '']].map(([label, value]) => (
              <label key={label} className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">{label}</span>
                <input defaultValue={value} className="min-h-11 w-full rounded-xl border border-[#e7e5df] px-3 text-sm outline-none focus:border-[#147d70]" />
              </label>
            ))}
          </div>
          <button type="button" onClick={() => setSaved(true)} className={`${primary} mt-7`}>Save Changes</button>
        </div>
      </div>
    </>
  );
}

function SettingsPage() {
  return (
    <>
      <PageTitle eyebrow="Account" title="Settings" text="Control preferences and account settings." />
      <div className="grid gap-5 lg:grid-cols-2">
        <div className={card}>
          <h2 className="font-display text-2xl text-[#17324d]">Preferences</h2>
          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">Language</span>
              <select className="min-h-11 w-full rounded-xl border border-[#e7e5df] px-3 text-sm">
                <option>English</option>
                <option>Arabic</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">Timezone</span>
              <select className="min-h-11 w-full rounded-xl border border-[#e7e5df] px-3 text-sm">
                <option>GMT / London (UTC+01:00)</option>
                <option>EST / New York (UTC-05:00)</option>
              </select>
            </label>
            {["Email notifications", "Class reminders", "Assignment notifications", "Teacher feedback notifications"].map((item) => (
              <label key={item} className="flex items-center justify-between gap-4 text-sm font-semibold text-[#17324d]">
                <span>{item}</span>
                <input type="checkbox" defaultChecked className="size-5 accent-[#147d70]" />
              </label>
            ))}
          </div>
        </div>
        <div className={card}>
          <h2 className="font-display text-2xl text-[#17324d]">Security and appearance</h2>
          <div className="mt-6 space-y-4">
            <button type="button" className={`${outline} w-full justify-between`}>Change password <ChevronRight size={16} /></button>
            <div className="flex items-center justify-between rounded-xl bg-[#f5f1e8] p-4">
              <div>
                <p className="text-sm font-bold text-[#17324d]">Light mode</p>
                <p className="mt-1 text-xs text-[#667085]">Portal appearance</p>
              </div>
              <span className="rounded-full bg-[#147d70] px-3 py-1 text-[10px] font-bold text-white">Active</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[#e7e5df] p-4">
              <div>
                <p className="text-sm font-bold text-[#17324d]">Dark reading mode</p>
                <p className="mt-1 text-xs text-[#667085]">Available in Quran reader only</p>
              </div>
              <span className="text-xs font-bold text-[#98a2b3]">Reader</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Support() {
  return <SupportWorkspace />;
}

function renderSection(section: Section) {
  switch (section) {
    case "dashboard": return <Dashboard />;
    case "courses": return <Courses />;
    case "course-detail": return <CourseDetail />;
    case "classes": return <Classes />;
    case "schedule": return <Schedule />;
    case "live-class": return <LiveClass />;
    case "lessons": return <Lessons />;
    case "materials": return <Materials />;
    case "assignments": return <Assignments />;
    case "progress": return <Progress />;
    case "attendance": return <Attendance />;
    case "certificates": return <Certificates />;
    case "payments": return <Payments />;
    case "notifications": return <Notifications />;
    case "profile": return <Profile />;
    case "settings": return <SettingsPage />;
    case "support": return <Support />;
  }
}

export function StudentPortal({ section, courseId }: { section: Section; courseId?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    } finally {
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] lg:flex">
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform lg:static lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar close={() => setMobileOpen(false)} onLogout={handleLogout} />
      </div>
      {mobileOpen && (
        <button type="button" className="fixed inset-0 z-40 bg-[#17324d]/40 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation overlay" />
      )}
      <div className="min-w-0 flex-1">
        <Header openMenu={() => setMobileOpen(true)} />
        <main className={`${shell} py-8 sm:py-10`}>
          {renderSection(section === "course-detail" && !courseId ? "courses" : section)}
        </main>
      </div>
    </div>
  );
}
