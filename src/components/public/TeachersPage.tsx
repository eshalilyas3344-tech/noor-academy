"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { teachers } from "@/data/publicPages";
import { EmptyState, FilterSelect, InnerHero, pageWrap, SearchField, TeacherCard } from "./Shared";

export function TeachersPage() {
  const [query, setQuery] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [availability, setAvailability] = useState("");
  const filtered = useMemo(() => teachers.filter((teacher) => [teacher.name, teacher.specialization, teacher.languages.join(" ")].join(" ").toLowerCase().includes(query.toLowerCase()) && (!specialization || teacher.specialization === specialization) && (!language || teacher.languages.includes(language)) && (!level || teacher.level === level) && (!availability || teacher.availability === availability)), [query, specialization, language, level, availability]);
  const clearFilters = () => { setQuery(""); setSpecialization(""); setLanguage(""); setLevel(""); setAvailability(""); };

  return <main>
    <InnerHero eyebrow="Meet your guides" title="Supportive teachers for every stage." description="Explore demo profiles for the future teacher directory. Real teacher identities, credentials, and availability will be verified before publication."><Link href="/trial" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#147d70] px-5 text-sm font-bold text-white shadow-sm hover:bg-[#0f665c]">Find your match <ArrowRight size={16} aria-hidden="true" /></Link></InnerHero>
    <section className="bg-[#fcfbf7] py-16 sm:py-20" aria-labelledby="teacher-directory-heading"><div className={pageWrap}><div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c6a15b]">Teacher directory</p><h2 id="teacher-directory-heading" className="mt-2 font-display text-3xl text-[#17324d]">A human connection to keep you moving.</h2></div><span className="text-sm font-semibold text-[#667085]">{filtered.length} demo profiles</span></div><div className="grid gap-3 rounded-2xl border border-[#e7e5df] bg-[#f5f1e8] p-4 sm:grid-cols-2 lg:grid-cols-5"><div className="lg:col-span-2"><SearchField value={query} onChange={setQuery} label="Search teachers" /></div><FilterSelect label="specialization" value={specialization} options={[...new Set(teachers.map((teacher) => teacher.specialization))]} onChange={setSpecialization} /><FilterSelect label="language" value={language} options={[...new Set(teachers.flatMap((teacher) => teacher.languages))]} onChange={setLanguage} /><FilterSelect label="teaching level" value={level} options={[...new Set(teachers.map((teacher) => teacher.level))]} onChange={setLevel} /><div className="lg:col-span-2"><FilterSelect label="availability" value={availability} options={[...new Set(teachers.map((teacher) => teacher.availability))]} onChange={setAvailability} /></div></div><p className="mt-3 text-xs text-[#98a2b3]">Search and filters use demo content and will connect to the teacher service later.</p><div className="mt-10">{filtered.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)}</div> : <EmptyState title="No demo profiles found" description="Try a different search or clear the filters to see the available placeholder profiles." onClear={clearFilters} />}</div></div></section>
    <section className="bg-[#eef7f3] py-16"><div className={`${pageWrap} flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center`}><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#147d70]">A considered first step</p><h2 className="mt-2 font-display text-3xl text-[#17324d]">Meet a teacher through a free trial.</h2></div><Link href="/trial" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#147d70] px-5 text-sm font-bold text-white hover:bg-[#0f665c]">Book Free Trial <ArrowRight size={16} aria-hidden="true" /></Link></div></section>
  </main>;
}
