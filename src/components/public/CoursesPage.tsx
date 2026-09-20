"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { courses } from "@/data/publicPages";
import { CourseCard, EmptyState, FilterSelect, InnerHero, pageWrap, SearchField } from "./Shared";

export function CoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [classType, setClassType] = useState("");
  const filtered = useMemo(() => courses.filter((course) => [course.title, course.description, course.category].join(" ").toLowerCase().includes(query.toLowerCase()) && (!category || course.category === category) && (!level || course.level === level) && (!ageGroup || course.ageGroup === ageGroup) && (!classType || course.classType === classType)), [query, category, level, ageGroup, classType]);
  const clearFilters = () => { setQuery(""); setCategory(""); setLevel(""); setAgeGroup(""); setClassType(""); };

  return <main>
    <InnerHero eyebrow="Explore your next step" title="Courses that meet you where you are." description="Choose a thoughtful learning path for reading, recitation, memorization, understanding, or Islamic studies. Course details shown here are demo content." />
    <section className="bg-[#fcfbf7] py-16 sm:py-20" aria-labelledby="course-catalog-heading"><div className={pageWrap}><div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c6a15b]">Course catalog</p><h2 id="course-catalog-heading" className="mt-2 font-display text-3xl text-[#17324d]">Find a learning path</h2></div><span className="text-sm font-semibold text-[#667085]">{filtered.length} demo {filtered.length === 1 ? "course" : "courses"}</span></div><div className="grid gap-3 rounded-2xl border border-[#e7e5df] bg-[#f5f1e8] p-4 sm:grid-cols-2 lg:grid-cols-5"><div className="lg:col-span-2"><SearchField value={query} onChange={setQuery} label="Search courses" /></div><FilterSelect label="category" value={category} options={[...new Set(courses.map((course) => course.category))]} onChange={setCategory} /><FilterSelect label="level" value={level} options={[...new Set(courses.map((course) => course.level))]} onChange={setLevel} /><FilterSelect label="age group" value={ageGroup} options={[...new Set(courses.map((course) => course.ageGroup))]} onChange={setAgeGroup} /><div className="lg:col-span-2"><FilterSelect label="class type" value={classType} options={[...new Set(courses.map((course) => course.classType))]} onChange={setClassType} /></div></div><p className="mt-3 text-xs text-[#98a2b3]">Filters are powered by demo data and will connect to the course service later.</p><div className="mt-10">{filtered.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((course) => <CourseCard key={course.slug} course={course} />)}</div> : <EmptyState title="No demo courses found" description="Try a different search or clear the filters to see the available placeholder catalog." onClear={clearFilters} />}</div></div></section>
    <section className="bg-[#147d70] py-16"><div className={`${pageWrap} flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center`}><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e9ddbf]">Not sure where to begin?</p><h2 className="mt-2 font-display text-3xl text-white">Start with a free trial conversation.</h2></div><Link href="/trial" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#17324d]">Book Free Trial <ArrowRight size={16} aria-hidden="true" /></Link></div></section>
  </main>;
}
