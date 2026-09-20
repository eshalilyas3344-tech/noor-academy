"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, ChevronDown, Search, Star } from "lucide-react";
import type { CourseRecord, TeacherRecord } from "@/data/publicPages";

export const pageWrap = "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10";
export const primaryLink = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#147d70] px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0f665c]";
export const outlineLink = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#dcd9d0] bg-white px-5 text-sm font-bold text-[#17324d] transition-colors hover:border-[#147d70] hover:text-[#147d70]";

export function InnerHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <section className="geometric-pattern border-b border-[#e7e5df] bg-[#f5f1e8] py-20 sm:py-24"><div className={`${pageWrap} grid items-end gap-8 lg:grid-cols-[1fr_auto]`}><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#147d70]">{eyebrow}</p><h1 className="mt-4 font-display text-5xl leading-[0.95] text-[#17324d] sm:text-7xl">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#667085]">{description}</p></div>{children}</div></section>;
}

export function PageIntro({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description?: string; dark?: boolean }) {
  return <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c6a15b]">{eyebrow}</p><h2 className={`mt-3 font-display text-4xl leading-tight sm:text-5xl ${dark ? "text-white" : "text-[#17324d]"}`}>{title}</h2>{description && <p className={`mt-4 text-base leading-7 ${dark ? "text-white/70" : "text-[#667085]"}`}>{description}</p>}</div>;
}

export function CourseCard({ course }: { course: CourseRecord }) {
  const Icon = course.icon;
  return <article className="overflow-hidden rounded-2xl border border-[#e7e5df] bg-white transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(23,50,77,0.08)]"><div className="flex h-36 items-end justify-between p-6" style={{ backgroundColor: course.tint }}><Icon size={46} strokeWidth={1.3} className="text-[#147d70]" aria-hidden="true" /><span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#667085]">Course</span></div><div className="p-6"><h3 className="font-display text-2xl text-[#17324d]">{course.title}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-[#667085]">{course.description}</p><div className="mt-5 flex flex-wrap gap-2 text-[11px] font-bold text-[#667085]"><span className="rounded-full bg-[#eef7f3] px-3 py-1">{course.level}</span><span className="rounded-full bg-[#f5f1e8] px-3 py-1">{course.ageGroup}</span><span className="rounded-full bg-[#f5f1e8] px-3 py-1">{course.classType}</span></div><Link href={`/courses/${course.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#147d70]">View course <ArrowRight size={15} aria-hidden="true" /></Link></div></article>;
}

export function TeacherCard({ teacher }: { teacher: TeacherRecord }) {
  return <article className="rounded-2xl border border-[#e7e5df] bg-white p-5"><div className="flex h-48 items-end justify-between overflow-hidden rounded-xl bg-[#eaf4ef] p-5"><div className="flex size-24 items-center justify-center rounded-full border-4 border-white bg-[#147d70] font-display text-3xl text-white shadow-lg">{teacher.initials}</div><span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold text-[#667085]">Instructor</span></div><div className="pt-5"><div className="flex items-start justify-between gap-3"><h3 className="font-display text-2xl text-[#17324d]">{teacher.name}</h3><span className="flex items-center gap-1 text-xs font-bold text-[#8d6b2e]"><Star size={14} fill="currentColor" aria-hidden="true" /> Demo</span></div><p className="mt-2 text-sm font-semibold text-[#147d70]">{teacher.specialization}</p><p className="mt-2 text-sm text-[#667085]">{teacher.languages.join(" · ")} · {teacher.level}</p><div className="mt-5 flex flex-wrap gap-2"><Link href={`/teachers/${teacher.id}`} className={outlineLink}>View profile</Link><Link href="/trial" className={primaryLink}>Book trial</Link></div></div></article>;
}

export function SearchField({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) {
  return <label className="flex min-h-12 items-center gap-3 rounded-xl border border-[#e7e5df] bg-white px-4 text-sm text-[#98a2b3] focus-within:border-[#147d70] focus-within:ring-2 focus-within:ring-[#147d70]/10"><Search size={17} aria-hidden="true" /><span className="sr-only">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={label} className="min-w-0 flex-1 bg-transparent text-sm text-[#17212b] outline-none placeholder:text-[#98a2b3]" /></label>;
}

export function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="block"><span className="sr-only">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-12 w-full rounded-xl border border-[#e7e5df] bg-white px-3 text-sm font-semibold text-[#17324d] outline-none focus:border-[#147d70]"><option value="">All {label}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

export function EmptyState({ title, description, onClear }: { title: string; description: string; onClear: () => void }) {
  return <div className="rounded-2xl border border-dashed border-[#dcd9d0] bg-white px-6 py-16 text-center"><p className="font-display text-3xl text-[#17324d]">{title}</p><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#667085]">{description}</p><button type="button" onClick={onClear} className={`${outlineLink} mt-6`}>Clear filters</button></div>;
}

export function Accordion({ items }: { items: string[][] }) {
  const [open, setOpen] = useState(0);
  return <div className="divide-y divide-[#e7e5df] border-y border-[#e7e5df]">{items.map(([question, answer], index) => <div key={question}><button type="button" className="flex w-full items-center justify-between gap-5 py-5 text-left" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span className="font-display text-xl text-[#17324d]">{question}</span><ChevronDown size={18} className={`shrink-0 text-[#147d70] transition-transform ${open === index ? "rotate-180" : ""}`} aria-hidden="true" /></button>{open === index && <p className="max-w-2xl pb-5 text-sm leading-7 text-[#667085]">{answer}</p>}</div>)}</div>;
}
