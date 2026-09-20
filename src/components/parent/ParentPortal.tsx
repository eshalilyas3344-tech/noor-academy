"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SupportWorkspace } from "@/components/support/SupportWorkspace";
import { useCurrentUser } from "@/lib/auth/useCurrentUser";
import { Bell, BookOpen, CalendarDays, Check, ChevronRight, CircleHelp, ClipboardList, FileText, GraduationCap, LayoutDashboard, LogOut, Menu, MessageSquare, Search, Settings, UserRound, UsersRound, WalletCards, X } from "lucide-react";
import { parentAssignments, parentAttendance, parentChildren, parentClasses, parentFeedback, parentMaterials, parentNotifications, type ParentChild } from "@/data/parentPortal";

const navGroups = [
  ["Overview", [{ label: "Dashboard", href: "/parent/dashboard", icon: LayoutDashboard }]],
  ["Children", [{ label: "My Children", href: "/parent/children", icon: UsersRound }, { label: "Classes", href: "/parent/classes", icon: CalendarDays }, { label: "Schedule", href: "/parent/schedule", icon: CalendarDays }, { label: "Progress", href: "/parent/progress", icon: GraduationCap }, { label: "Attendance", href: "/parent/attendance", icon: Check }, { label: "Assignments", href: "/parent/assignments", icon: ClipboardList }, { label: "Learning Materials", href: "/parent/materials", icon: FileText }, { label: "Teacher Feedback", href: "/parent/feedback", icon: MessageSquare }, { label: "Certificates", href: "/parent/certificates", icon: GraduationCap }]],
  ["Account", [{ label: "Payments", href: "/parent/payments", icon: WalletCards }, { label: "Notifications", href: "/parent/notifications", icon: Bell }, { label: "Messages", href: "/parent/messages", icon: MessageSquare }, { label: "Profile", href: "/parent/profile", icon: UserRound }, { label: "Settings", href: "/parent/settings", icon: Settings }, { label: "Support", href: "/parent/support", icon: CircleHelp }]],
] as const;

type Section = "dashboard" | "children" | "child-detail" | "classes" | "schedule" | "progress" | "attendance" | "assignments" | "materials" | "feedback" | "certificates" | "payments" | "notifications" | "messages" | "profile" | "settings" | "support";
const shell = "mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8";
const card = "rounded-2xl border border-[#e7e5df] bg-white p-5 shadow-[0_8px_24px_rgba(23,50,77,0.04)]";
const primary = "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#147d70] px-4 text-sm font-bold text-white hover:bg-[#0f665c]";
const outline = "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#e7e5df] px-4 text-sm font-bold text-[#17324d] hover:border-[#147d70] hover:text-[#147d70]";

function StatusBadge({ status }: { status: string }) {
  const positive = ["Present", "Completed", "Confirmed", "Paid", "Graded", "Resolved"];
  const negative = ["Absent", "Failed", "Overdue"];
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${positive.includes(status) ? "bg-[#eef7f3] text-[#147d70]" : negative.includes(status) ? "bg-[#fdf0ed] text-[#b5473f]" : "bg-[#f5f1e8] text-[#8d6b2e]"}`}>{status}</span>;
}

function ProgressBar({ value }: { value: number }) {
  return <div className="h-2 overflow-hidden rounded-full bg-[#eef0ec]"><div className="h-full rounded-full bg-[#147d70]" style={{ width: `${value}%` }} /></div>;
}

function PageTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="mb-7"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#147d70]">{eyebrow}</p><h1 className="mt-2 break-words font-display text-4xl text-[#17324d] sm:text-5xl">{title}</h1>{text && <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085]">{text}</p>}</div>;
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className={card}><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#98a2b3]">{label}</p><p className="mt-3 font-display text-4xl text-[#17324d]">{value}</p><p className="mt-1 text-xs text-[#667085]">{note}</p></div>;
}

function ChildSelector({ selected, setSelected }: { selected: ParentChild; setSelected: (child: ParentChild) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">Select child</span>
      <select value={selected.id} onChange={(event) => setSelected(parentChildren.find((child) => child.id === event.target.value) ?? selected)} className="min-h-11 w-full rounded-xl border border-[#e7e5df] bg-white px-3 text-sm font-semibold text-[#17324d] outline-none focus:border-[#147d70]">
        {parentChildren.map((child) => <option key={child.id} value={child.id}>{child.name}</option>)}
      </select>
    </label>
  );
}

function Sidebar({ close, onLogout }: { close: () => void; onLogout: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col bg-[#17324d] px-4 py-6 text-white">
      <div className="flex items-center justify-between px-3">
        <Link href="/" onClick={close} className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#147d70]"><BookOpen size={19} /></span>
          <span className="font-display text-xl">Noor Academy</span>
        </Link>
        <button type="button" onClick={close} aria-label="Close parent navigation" className="rounded-lg p-2 text-white/70 hover:bg-white/10 lg:hidden">
          <X size={18} />
        </button>
      </div>
      <Link href="/" onClick={close} className="mt-4 px-3 text-xs font-semibold text-white/55 hover:text-white">Visit public website</Link>
      <p className="px-3 pb-3 pt-8 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Parent portal</p>
      <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto" aria-label="Parent navigation">
        {navGroups.map(([group, items]) => (
          <div key={group}>
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">{group}</p>
            <div className="mt-2 space-y-1">
              {items.map(({ label, href, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link key={href} href={href} onClick={close} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${active ? "bg-white/12 text-white" : "text-white/65 hover:bg-white/8 hover:text-white"}`}>
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

function Header({ openMenu }: { openMenu: () => void }) {
  const { user } = useCurrentUser();
  const initials = user?.fullName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() ?? "--";
  return (
    <header className="flex min-h-20 items-center justify-between border-b border-[#e7e5df] bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button type="button" onClick={openMenu} aria-label="Open parent navigation" className="flex size-10 items-center justify-center rounded-xl border border-[#e7e5df] text-[#17324d] lg:hidden">
          <Menu size={19} />
        </button>
        <div className="hidden items-center gap-2 rounded-xl border border-[#e7e5df] px-3 py-2 text-sm text-[#98a2b3] sm:flex">
          <Search size={16} />Search your family learning space
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/parent/notifications" aria-label="Notifications" className="relative text-[#667085]">
          <Bell size={19} />
          <span className="absolute -right-1 -top-1 size-2 rounded-full bg-[#c6a15b]" />
        </Link>
        <Link href="/parent/profile" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#147d70] text-xs font-bold text-white">{initials}</span>
          <span className="hidden text-sm font-bold text-[#17324d] sm:block">{user?.fullName ?? "Loading..."}</span>
        </Link>
      </div>
    </header>
  );
}

function ChildCard({ child }: { child: ParentChild }) {
  return (
    <article className={card}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-full bg-[#eef7f3] font-display text-xl text-[#147d70]">{child.name.slice(0, 1)}</span>
          <div>
            <h2 className="font-display text-2xl text-[#17324d]">{child.name}</h2>
            <p className="text-sm text-[#667085]">{child.age} · {child.country}</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#147d70]">{child.attendance}</span>
      </div>
      <p className="mt-6 text-sm font-bold text-[#17324d]">{child.course}</p>
      <p className="mt-1 text-sm text-[#667085]">{child.teacher} · Next class {child.nextClass}</p>
      <div className="mt-5 flex justify-between text-xs font-bold text-[#667085]">
        <span>Progress</span><span>{child.progress}%</span>
      </div>
      <div className="mt-2"><ProgressBar value={child.progress} /></div>
      <Link href={`/parent/children/${child.id}`} className={`${outline} mt-5 w-full`}>View details <ChevronRight size={15} /></Link>
    </article>
  );
}

function Dashboard({ child, setChild }: { child: ParentChild; setChild: (child: ParentChild) => void }) {
  const { user } = useCurrentUser();
  return (
    <>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <PageTitle eyebrow="Parent dashboard" title={`Welcome back, ${user?.fullName ?? "there"}`} text="Stay connected with your child's Quran learning journey." />
        <div className="w-full sm:w-64"><ChildSelector selected={child} setSelected={setChild} /></div>
      </div>
      <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-5">
        <Metric label="Active courses" value="2" note="Enrolled Courses" />
        <Metric label="Upcoming classes" value="3" note="Across children" />
        <Metric label="Attendance" value={child.attendance} note={child.name} />
        <Metric label="Progress" value={`${child.progress}%`} note="Selected child" />
        <Metric label="Assignments" value="2" note="Pending review" />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className={card}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#147d70]">Next class</p>
              <h2 className="mt-2 font-display text-2xl text-[#17324d]">{child.course}</h2>
              <p className="mt-1 text-sm text-[#667085]">{child.name} · {child.teacher}</p>
            </div>
            <StatusBadge status="Scheduled" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-[#98a2b3]">When</p>
              <p className="mt-1 font-bold text-[#17324d]">{child.nextClass}</p>
            </div>
            <div>
              <p className="text-xs text-[#98a2b3]">Access</p>
              <p className="mt-1 font-bold text-[#17324d]">Parent observation link</p>
            </div>
          </div>
          <Link href="/parent/classes" className={`${primary} mt-6 w-full`}>View Class <ChevronRight size={15} /></Link>
        </div>
        <div className={card}>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#147d70]">Child progress</p>
          <h2 className="mt-2 font-display text-2xl text-[#17324d]">A steady learning rhythm</h2>
          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm font-bold text-[#667085]"><span>{child.course}</span><span>{child.progress}%</span></div>
              <ProgressBar value={child.progress} />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm font-bold text-[#667085]"><span>Assignments</span><span>75%</span></div>
              <ProgressBar value={75} />
            </div>
          </div>
          <Link href="/parent/progress" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#147d70]">View progress <ChevronRight size={15} /></Link>
        </div>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <div className={card}>
          <h2 className="font-display text-2xl text-[#17324d]">Teacher feedback</h2>
          <p className="mt-4 text-sm leading-7 text-[#667085]">“{child.name} is showing steady effort. Continue practicing the pause points from this week’s lesson.”</p>
          <p className="mt-5 text-xs font-bold text-[#147d70]">{child.teacher} · Weekly review</p>
        </div>
        <div className={card}>
          <h2 className="font-display text-2xl text-[#17324d]">Quick links</h2>
          <div className="mt-4 grid gap-2">
            <Link href="/parent/attendance" className={outline}>Review attendance</Link>
            <Link href="/parent/assignments" className={outline}>View assignments</Link>
            <Link href="/parent/materials" className={outline}>Open materials</Link>
          </div>
        </div>
      </div>
    </>
  );
}

function Children() {
  return (
    <>
      <PageTitle eyebrow="Children" title="My children" text="Monitor connected learners and academic progress." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {parentChildren.map((child) => <ChildCard key={child.id} child={child} />)}
      </div>
    </>
  );
}

function ChildDetail({ child }: { child: ParentChild }) {
  return (
    <>
      <Link href="/parent/children" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#147d70]">Back to children</Link>
      <PageTitle eyebrow="Child details" title={child.name} text="Comprehensive learning details for the selected child." />
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Progress" value={`${child.progress}%`} note={child.course} />
        <Metric label="Attendance" value={child.attendance} note="Term attendance" />
        <Metric label="Level" value={child.level} note={child.teacher} />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className={card}>
          <h2 className="font-display text-2xl text-[#17324d]">Learning progress</h2>
          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm font-bold text-[#667085]"><span>Course progress</span><span>{child.progress}%</span></div>
              <ProgressBar value={child.progress} />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm font-bold text-[#667085]"><span>Lessons completed</span><span>12 of 18</span></div>
              <ProgressBar value={67} />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm font-bold text-[#667085]"><span>Assignments</span><span>75%</span></div>
              <ProgressBar value={75} />
            </div>
          </div>
        </div>
        <div className={card}>
          <h2 className="font-display text-2xl text-[#17324d]">Upcoming class</h2>
          <p className="mt-5 font-bold text-[#17324d]">{child.course}</p>
          <p className="mt-2 text-sm text-[#667085]">{child.teacher} · {child.nextClass}</p>
          <div className="mt-4"><StatusBadge status="Scheduled" /></div>
        </div>
      </div>
      <div className={`${card} mt-5`}>
        <h2 className="font-display text-2xl text-[#17324d]">Recent teacher feedback</h2>
        <p className="mt-4 text-sm leading-7 text-[#667085]">
          Teacher observation: Consistent recitation progress. Keep the home revision routine active and return to the recommended review points.
        </p>
      </div>
    </>
  );
}

function Classes() {
  return (
    <>
      <PageTitle eyebrow="Children" title="Classes" text="View upcoming and completed classes. Parent access is view-only." />
      <div className={`${card} overflow-x-auto`}>
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-[#e7e5df] text-xs uppercase tracking-[0.12em] text-[#98a2b3]">
            <tr>
              <th className="pb-3">Child</th>
              <th className="pb-3">Course</th>
              <th className="pb-3">Teacher</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e7e5df]">
            {parentClasses.map((item) => (
              <tr key={`${item.child}-${item.date}`}>
                <td className="py-4 font-semibold text-[#17324d]">{item.child}</td>
                <td className="py-4 text-[#667085]">{item.course}</td>
                <td className="py-4 text-[#667085]">{item.teacher}</td>
                <td className="py-4 text-[#667085]">{item.date} · {item.time}</td>
                <td className="py-4"><StatusBadge status={item.status} /></td>
                <td className="py-4"><button type="button" className="text-xs font-bold text-[#147d70]">View details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Schedule() {
  return (
    <>
      <PageTitle eyebrow="Children" title="Schedule" text="Weekly family Quran lesson calendar." />
      <div className={`${card} overflow-hidden`}>
        <div className="flex flex-wrap gap-2 border-b border-[#e7e5df] pb-5">
          <button type="button" className="rounded-lg bg-[#17324d] px-4 py-2 text-xs font-bold text-white">Month</button>
          <button type="button" className="rounded-lg border border-[#e7e5df] px-4 py-2 text-xs font-bold text-[#667085]">Week</button>
          <button type="button" className="rounded-lg border border-[#e7e5df] px-4 py-2 text-xs font-bold text-[#667085]">List</button>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-7">
          {["Mon 16", "Tue 17", "Wed 18", "Thu 19", "Fri 20", "Sat 21", "Sun 22"].map((day, index) => (
            <div key={day} className="min-h-32 rounded-xl border border-[#e7e5df] bg-[#fcfbf7] p-3">
              <p className="text-xs font-bold text-[#667085]">{day}</p>
              {index < 3 && (
                <div className="mt-5 rounded-lg bg-[#eef7f3] p-3">
                  <p className="text-xs font-bold text-[#147d70]">{parentClasses[index].child}</p>
                  <p className="mt-1 text-[10px] text-[#667085]">{parentClasses[index].time}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Progress({ child, setChild }: { child: ParentChild; setChild: (child: ParentChild) => void }) {
  return (
    <>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <PageTitle eyebrow="Children" title="Progress" text="Compare learning progress across curriculum milestones." />
        <div className="w-full sm:w-64"><ChildSelector selected={child} setSelected={setChild} /></div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Overall progress" value={`${child.progress}%`} note={child.name} />
        <Metric label="Assignments" value="75%" note="Completed" />
        <Metric label="Streak" value="7 days" note="Consistent practice" />
      </div>
      <div className={`${card} mt-5`}>
        <h2 className="font-display text-2xl text-[#17324d]">Course progress</h2>
        <div className="mt-6 space-y-6">
          <div>
            <div className="mb-2 flex justify-between text-sm font-bold text-[#667085]"><span>{child.course}</span><span>{child.progress}%</span></div>
            <ProgressBar value={child.progress} />
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm font-bold text-[#667085]"><span>Lessons completed</span><span>67%</span></div>
            <ProgressBar value={67} />
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm font-bold text-[#667085]"><span>Attendance</span><span>{child.attendance}</span></div>
            <ProgressBar value={94} />
          </div>
        </div>
      </div>
    </>
  );
}

function Attendance() {
  return (
    <>
      <PageTitle eyebrow="Children" title="Attendance" text="Review attendance records by child and course." />
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Overall" value="94%" note="Term attendance" />
        <Metric label="Present" value="18" note="Classes attended" />
        <Metric label="Late" value="1" note="Late arrival" />
      </div>
      <div className={`${card} mt-5 overflow-x-auto`}>
        <div className="mb-5 flex flex-wrap gap-3">
          <select className="rounded-lg border border-[#e7e5df] px-3 py-2 text-sm"><option>All children</option></select>
          <select className="rounded-lg border border-[#e7e5df] px-3 py-2 text-sm"><option>All courses</option></select>
          <select className="rounded-lg border border-[#e7e5df] px-3 py-2 text-sm"><option>September 2026</option></select>
        </div>
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-[#e7e5df] text-xs uppercase tracking-[0.12em] text-[#98a2b3]">
            <tr>
              <th className="pb-3">Date</th>
              <th className="pb-3">Child</th>
              <th className="pb-3">Course</th>
              <th className="pb-3">Teacher</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e7e5df]">
            {parentAttendance.map(([date, childName, course, teacher, status]) => (
              <tr key={date}>
                <td className="py-4 font-semibold text-[#17324d]">{date}</td>
                <td className="py-4 text-[#667085]">{childName}</td>
                <td className="py-4 text-[#667085]">{course}</td>
                <td className="py-4 text-[#667085]">{teacher}</td>
                <td className="py-4"><StatusBadge status={status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Assignments() {
  return (
    <>
      <PageTitle eyebrow="Children" title="Assignments" text="View-only assignment status for each connected child." />
      <div className="space-y-4">
        {parentAssignments.map((item) => (
          <article key={item.title} className={card}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h2 className="font-display text-2xl text-[#17324d]">{item.title}</h2>
                <p className="mt-2 text-sm text-[#667085]">{item.child} · {item.course} · {item.teacher}</p>
                <p className="mt-1 text-xs text-[#98a2b3]">Due {item.due} · {item.grade}</p>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <p className="mt-5 rounded-xl bg-[#f5f1e8] p-4 text-sm text-[#667085]">{item.feedback}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function Materials() {
  return (
    <>
      <PageTitle eyebrow="Children" title="Learning materials" text="Curriculum resources assigned to connected children." />
      <div className="grid gap-5 md:grid-cols-2">
        {parentMaterials.map((item) => (
          <article key={item.title} className={card}>
            <span className="rounded-full bg-[#eef7f3] px-3 py-1 text-[10px] font-bold uppercase text-[#147d70]">{item.type}</span>
            <h2 className="mt-4 font-display text-2xl text-[#17324d]">{item.title}</h2>
            <p className="mt-2 text-sm text-[#667085]">{item.child} · {item.course} · {item.date}</p>
            <div className="mt-5 flex gap-3">
              <button type="button" className={outline}>View</button>
              <button type="button" className={outline}>Download</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Feedback() {
  return (
    <>
      <PageTitle eyebrow="Children" title="Teacher feedback" text="Review feedback history. Parent access is view-only." />
      <div className="space-y-4">
        {parentFeedback.map((item) => (
          <article key={item.course} className={card}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#147d70]">{item.child} · {item.course}</p>
                <h2 className="mt-2 font-display text-2xl text-[#17324d]">{item.performance}</h2>
                <p className="mt-1 text-sm text-[#667085]">{item.teacher} · {item.date}</p>
              </div>
              <StatusBadge status="Instructor Review" />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div><p className="text-xs font-bold uppercase text-[#98a2b3]">Strengths</p><p className="mt-2 text-sm text-[#667085]">{item.strengths}</p></div>
              <div><p className="text-xs font-bold uppercase text-[#98a2b3]">To improve</p><p className="mt-2 text-sm text-[#667085]">{item.improve}</p></div>
              <div><p className="text-xs font-bold uppercase text-[#98a2b3]">Comments</p><p className="mt-2 text-sm text-[#667085]">{item.comments}</p></div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Certificates() {
  return (
    <>
      <PageTitle eyebrow="Children" title="Certificates" text="Certificates and course milestones." />
      <div className="grid gap-5 md:grid-cols-2">
        {parentChildren.slice(0, 2).map((child) => (
          <article key={child.id} className={card}>
            <GraduationCap className="text-[#c6a15b]" size={30} />
            <h2 className="mt-5 font-display text-2xl text-[#17324d]">{child.name} · {child.course}</h2>
            <p className="mt-2 text-sm text-[#667085]">Completion date: Aug 28, 2026</p>
            <p className="mt-1 text-xs font-bold text-[#147d70]">Verified completion</p>
            <div className="mt-6 flex gap-3">
              <button type="button" className={outline}>View</button>
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
      <PageTitle eyebrow="Account" title="Payments" text="Family billing and tuition details." />
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Subscription" value="Active" note="Account active" />
        <Metric label="Plan" value="Family Plan" note="Up to 3 children" />
        <Metric label="Renewal" value="Oct 01, 2026" note="Next billing date" />
      </div>
      <div className={`${card} mt-5 overflow-x-auto`}>
        <h2 className="font-display text-2xl text-[#17324d]">Payment history</h2>
        <table className="mt-5 w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-[#e7e5df] text-xs uppercase tracking-[0.12em] text-[#98a2b3]">
            <tr>
              <th className="pb-3">Date</th>
              <th className="pb-3">Description</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Invoice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4 text-[#667085]">Sep 01, 2026</td>
              <td className="py-4 text-[#667085]">Family Package - 3 Children</td>
              <td className="py-4 font-semibold text-[#17324d]">$120.00</td>
              <td className="py-4"><StatusBadge status="Paid" /></td>
              <td className="py-4 text-[#147d70]">INV-2026-0814</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function Notifications() {
  const [items, setItems] = useState(parentNotifications);
  return (
    <>
      <PageTitle eyebrow="Account" title="Notifications" text="Stay connected to your children's learning updates." />
      <div className="flex justify-end">
        <button type="button" onClick={() => setItems(items.map((item) => ({ ...item, unread: false })))} className={outline}>
          Mark all as read
        </button>
      </div>
      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <article key={item.title} className={`${card} flex gap-4`}>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eef7f3] text-[#147d70]"><Bell size={18} /></span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap justify-between gap-2">
                <h2 className="font-bold text-[#17324d]">{item.title}</h2>
                {item.unread && <span className="rounded-full bg-[#c6a15b] px-2 py-1 text-[10px] font-bold text-white">Unread</span>}
              </div>
              <p className="mt-1 text-sm leading-6 text-[#667085]">{item.text}</p>
              <p className="mt-2 text-xs font-bold text-[#98a2b3]">{item.type} · Academy Alert</p>
            </div>
            <button type="button" onClick={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))} className="self-start text-xs font-bold text-[#98a2b3]">Clear</button>
          </article>
        ))}
      </div>
    </>
  );
}

function Messages() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageTitle eyebrow="Account" title="Messages" text="Direct messaging with instructors and academy coordination." />
      {sent && <div className="mb-5 rounded-xl bg-[#eef7f3] p-4 text-sm font-semibold text-[#147d70]" role="status">Message sent successfully.</div>}
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <aside className={card}>
          <input placeholder="Search conversations" className="min-h-10 w-full rounded-xl border border-[#e7e5df] px-3 text-sm" />
          <div className="mt-4 space-y-2">
            <button type="button" className="w-full rounded-xl bg-[#eef7f3] p-4 text-left">
              <p className="text-sm font-bold text-[#17324d]">Ustadh Tariq Al-Mansoor</p>
              <p className="mt-1 text-xs text-[#667085]">Lesson feedback</p>
            </button>
            <button type="button" className="w-full rounded-xl p-4 text-left hover:bg-[#f5f1e8]">
              <p className="text-sm font-bold text-[#17324d]">Academy Support</p>
              <p className="mt-1 text-xs text-[#667085]">Schedule question</p>
            </button>
          </div>
        </aside>
        <section className={`${card} flex min-h-80 flex-col`}>
          <div className="border-b border-[#e7e5df] pb-4">
            <h2 className="font-display text-2xl text-[#17324d]">Ustadh Tariq Al-Mansoor</h2>
            <p className="mt-1 text-xs text-[#667085]">Direct Class Conversation</p>
          </div>
          <div className="flex-1 py-6">
            <div className="max-w-md rounded-xl bg-[#f5f1e8] p-4 text-sm leading-6 text-[#667085]">
              Ahmed demonstrated solid Tajweed rules in today&apos;s session. Keep up the consistent review.
            </div>
          </div>
          <div className="flex gap-2 border-t border-[#e7e5df] pt-4">
            <input placeholder="Write a message" className="min-w-0 flex-1 rounded-xl border border-[#e7e5df] px-3 text-sm" />
            <button type="button" onClick={() => setSent(true)} className={primary}>Send</button>
          </div>
        </section>
      </div>
    </>
  );
}

function Profile() {
  const [saved, setSaved] = useState(false);
  const { user } = useCurrentUser();
  return (
    <>
      <PageTitle eyebrow="Account" title="Profile" text="Manage your guardian profile and contact details." />
      {saved && <div className="mb-5 rounded-xl bg-[#eef7f3] p-4 text-sm font-semibold text-[#147d70]" role="status">Profile changes saved successfully.</div>}
      <div className={`${card} max-w-3xl`}>
        <div className="grid gap-5 sm:grid-cols-2">
            {[["Parent name", user?.fullName ?? ''], ["Email", user?.email ?? ''], ["Phone", ''], ["Country", ''], ["Preferred language", ''], ["Timezone", '']].map(([label, value]) => (
            <label key={label} className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">{label}</span>
              <input defaultValue={value} className="min-h-11 w-full rounded-xl border border-[#e7e5df] px-3 text-sm outline-none focus:border-[#147d70]" />
            </label>
          ))}
        </div>
        <button type="button" onClick={() => setSaved(true)} className={`${primary} mt-7`}>Save Changes</button>
      </div>
    </>
  );
}

function SettingsPage() {
  return (
    <>
      <PageTitle eyebrow="Account" title="Settings" text="Manage family preferences and notifications." />
      <div className="grid gap-5 lg:grid-cols-2">
        <div className={card}>
          <h2 className="font-display text-2xl text-[#17324d]">Notifications</h2>
          <div className="mt-6 space-y-5">
            {["Class reminders", "Attendance updates", "Teacher feedback", "Assignment notifications", "Payment notifications"].map((item) => (
              <label key={item} className="flex items-center justify-between gap-4 text-sm font-semibold text-[#17324d]">
                <span>{item}</span>
                <input type="checkbox" defaultChecked className="size-5 accent-[#147d70]" />
              </label>
            ))}
          </div>
        </div>
        <div className={card}>
          <h2 className="font-display text-2xl text-[#17324d]">Preferences and security</h2>
          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">Language</span>
              <select className="min-h-11 w-full rounded-xl border border-[#e7e5df] px-3 text-sm">
                <option>English</option>
                <option>Arabic</option>
              </select>
            </label>
            <button type="button" className={`${outline} w-full justify-between`}>Change password <ChevronRight size={16} /></button>
            <div className="flex items-center justify-between rounded-xl bg-[#f5f1e8] p-4 text-sm font-bold text-[#17324d]">Light mode <span className="rounded-full bg-[#147d70] px-3 py-1 text-[10px] text-white">Active</span></div>
          </div>
        </div>
      </div>
    </>
  );
}

function Support() {
  return <SupportWorkspace />;
}

function renderSection(section: Section, child: ParentChild, setChild: (child: ParentChild) => void) {
  switch (section) {
    case "dashboard": return <Dashboard child={child} setChild={setChild} />;
    case "children": return <Children />;
    case "child-detail": return <ChildDetail child={child} />;
    case "classes": return <Classes />;
    case "schedule": return <Schedule />;
    case "progress": return <Progress child={child} setChild={setChild} />;
    case "attendance": return <Attendance />;
    case "assignments": return <Assignments />;
    case "materials": return <Materials />;
    case "feedback": return <Feedback />;
    case "certificates": return <Certificates />;
    case "payments": return <Payments />;
    case "notifications": return <Notifications />;
    case "messages": return <Messages />;
    case "profile": return <Profile />;
    case "settings": return <SettingsPage />;
    case "support": return <Support />;
  }
}

export function ParentPortal({ section, childId }: { section: Section; childId?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [child, setChild] = useState(parentChildren.find((item) => item.id === childId) ?? parentChildren[0]);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    } finally {
      router.push("/parent/login");
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
          {renderSection(section, child, setChild)}
        </main>
      </div>
    </div>
  );
}
