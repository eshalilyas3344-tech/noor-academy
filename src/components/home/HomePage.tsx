"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, AudioLines, Bookmark, Check, ChevronDown, Globe2, Headphones, Play, Search, Star } from "lucide-react";
import { benefits, courses, featuredTeachers, faqs, learningSteps, pricingPlans, testimonials, trustPoints } from "@/data/home";

const sectionClass = "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10";
const outlineButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#dcd9d0] bg-white px-5 text-sm font-bold text-[#17324d] transition-colors hover:border-[#147d70] hover:text-[#147d70]";
const primaryButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#147d70] px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0f665c]";

function SectionIntro({ eyebrow, title, text, centered = false }: { eyebrow: string; title: string; text?: string; centered?: boolean }) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c6a15b]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl leading-tight text-[#17324d] sm:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-7 text-[#667085]">{text}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden border-b border-[#e7e5df] bg-[#fcfbf7]" aria-labelledby="hero-heading">
      <div className={`${sectionClass} grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20`}>
        <div className="relative z-10">
          <p className="mb-6 flex items-center gap-2 text-sm font-bold text-[#147d70]">
            <span className="h-px w-8 bg-[#c6a15b]" /> A more intentional way to learn
          </p>
          <h1 id="hero-heading" className="max-w-xl font-display text-6xl leading-[0.92] text-[#17324d] sm:text-7xl lg:text-[5.5rem]">
            Learn the Quran.<br />
            <span className="text-[#147d70]">Nourish Your Soul.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-[#667085]">
            Learn Quran online with qualified, Ijaza-certified teachers through flexible, personalized, and engaging one-on-one lessons designed for students of all ages.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/trial" className={primaryButton}>
              Book a Free Trial <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/courses" className={outlineButton}>
              Explore Courses
            </Link>
          </div>
          <p className="mt-6 text-xs font-semibold text-[#147d70]">
            ✓ One-to-one live classes · ✓ Certified male & female tutors · ✓ Flexible 24/7 schedules
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-xl lg:justify-self-end">
          <div className="absolute -right-4 top-4 size-28 rounded-full border border-[#e9ddbf] sm:size-40" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] border border-[#e7e5df] bg-[#eef7f3] p-4 shadow-[0_24px_60px_rgba(23,50,77,0.1)] sm:p-6">
            <div className="geometric-pattern absolute inset-0 opacity-50" aria-hidden="true" />
            <div className="relative rounded-2xl bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-[#e7e5df] pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#98a2b3]">Today&apos;s lesson</p>
                  <p className="mt-1 font-display text-2xl text-[#17324d]">Quran Reading & Tajweed</p>
                </div>
                <span className="flex size-10 items-center justify-center rounded-full bg-[#eaf4ef] text-[#147d70]">
                  <Play size={17} fill="currentColor" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-5 grid grid-cols-[1fr_auto] gap-4">
                <div className="rounded-xl bg-[#17324d] p-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white/70">Interactive Classroom</span>
                    <span className="rounded-full bg-[#147d70] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">LIVE</span>
                  </div>
                  <div className="mt-12 flex items-end justify-between">
                    <div>
                      <p className="text-sm text-white/70">Ustadh Tariq Al-Mansoor</p>
                      <p className="mt-1 font-display text-2xl">Surah Al-Mulk</p>
                    </div>
                    <AudioLines className="text-[#c6a15b]" size={30} aria-hidden="true" />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex size-20 items-center justify-center rounded-xl bg-[#f5f1e8] font-display text-2xl text-[#17324d]">نور</div>
                  <div className="flex size-20 items-center justify-center rounded-xl border border-[#e7e5df] text-[#147d70]">
                    <Globe2 size={25} aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#667085]">Personalized curriculum roadmap</span>
                <span className="font-bold text-[#147d70]">On track · 94% Retention</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-b border-[#e7e5df] bg-white" aria-label="Noor Academy benefits">
      <div className={`${sectionClass} grid grid-cols-2 divide-x divide-[#e7e5df] py-5 lg:grid-cols-4`}>
        {trustPoints.map(({ label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 px-4 first:pl-0 last:pr-0 sm:justify-center">
            <Icon size={19} className="shrink-0 text-[#147d70]" aria-hidden="true" />
            <span className="text-xs font-bold text-[#17324d] sm:text-sm">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="bg-[#fcfbf7] py-24">
      <div className={sectionClass}>
        <SectionIntro
          eyebrow="Why Noor Academy"
          title="Learning that meets you where you are."
          text="Thoughtful teaching, flexible scheduling, and a personalized environment designed to help good recitation habits flourish."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ title, text, icon: Icon }, index) => (
            <article key={title} className="rounded-2xl border border-[#e7e5df] bg-white p-6 transition-transform hover:-translate-y-1">
              <span className={`flex size-11 items-center justify-center rounded-xl ${index % 2 ? "bg-[#f5f1e8]" : "bg-[#eef7f3]"} text-[#147d70]`}>
                <Icon size={21} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-2xl text-[#17324d]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#667085]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section className="bg-white py-24" aria-labelledby="courses-heading">
      <div className={sectionClass}>
        <SectionIntro
          eyebrow="Explore and grow"
          title="Courses for every stage of your journey."
          text="Comprehensive one-on-one curricula structured from basic phonetics to mastery of Tajweed and complete memorization."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map(({ title, description, level, age, icon: Icon, tone }) => (
            <article key={title} className="group overflow-hidden rounded-2xl border border-[#e7e5df] bg-[#fcfbf7] transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(23,50,77,0.08)]">
              <div className="flex h-36 items-end justify-between p-6" style={{ backgroundColor: tone }}>
                <Icon size={46} strokeWidth={1.3} className="text-[#147d70]" aria-hidden="true" />
                <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#147d70]">
                  Core Program
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-[#17324d]">{title}</h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-[#667085]">{description}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-bold text-[#667085]">
                  <span className="rounded-full bg-[#eef7f3] px-3 py-1">{level}</span>
                  <span className="rounded-full bg-[#f5f1e8] px-3 py-1">{age}</span>
                </div>
                <Link href="/courses" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#147d70]">
                  View curriculum <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="bg-[#f5f1e8] py-24">
      <div className={sectionClass}>
        <SectionIntro eyebrow="A simple rhythm" title="Start learning in four simple steps." centered />
        <div className="relative mt-14 grid gap-8 md:grid-cols-4">
          {learningSteps.map(([number, title, text], index) => (
            <article key={number} className="relative text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-[#c6a15b] bg-[#fcfbf7] font-display text-2xl text-[#17324d]">
                {number}
              </div>
              {index < 3 && <span className="absolute left-[calc(50%+42px)] right-[calc(-50%+42px)] top-7 hidden h-px bg-[#d9cda9] md:block" aria-hidden="true" />}
              <h3 className="mt-5 font-display text-2xl text-[#17324d]">{title}</h3>
              <p className="mx-auto mt-2 max-w-[220px] text-sm leading-6 text-[#667085]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeachersSection() {
  return (
    <section className="bg-white py-24">
      <div className={sectionClass}>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionIntro
            eyebrow="Meet the people who guide you"
            title="A supportive teacher makes a difference."
            text="All teachers hold authentic Ijazah certifications and have extensive pedagogical experience across global time zones."
          />
          <Link href="/teachers" className={`${outlineButton} shrink-0`}>
            Meet all teachers <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featuredTeachers.map((teacher) => (
            <article key={teacher.name} className="rounded-2xl border border-[#e7e5df] bg-[#fcfbf7] p-5">
              <div className="flex h-52 items-end justify-between overflow-hidden rounded-xl bg-[#eaf4ef] p-5">
                <div className="flex size-24 items-center justify-center rounded-full border-4 border-white bg-[#147d70] font-display text-3xl text-white shadow-lg">
                  {teacher.initials}
                </div>
                <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-[#147d70] uppercase tracking-wider">
                  VERIFIED IJAZAH
                </span>
              </div>
              <div className="pt-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl text-[#17324d]">{teacher.name}</h3>
                  <span className="flex items-center gap-1 text-xs font-bold text-[#8d6b2e]">
                    <Star size={14} fill="currentColor" aria-hidden="true" /> 5.0
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-[#147d70]">{teacher.specialty}</p>
                <p className="mt-2 text-sm text-[#667085]">{teacher.languages} · One-on-one sessions</p>
                <Link href="/teachers" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#17324d]">
                  View profile <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const items = ["One-to-one classes", "Personalized learning plans", "Flexible scheduling", "Progress tracking", "Teacher feedback", "Parent monitoring", "Live online classes"];
  return (
    <section className="bg-[#eef7f3] py-24">
      <div className={`${sectionClass} grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]`}>
        <div>
          <SectionIntro
            eyebrow="The learning experience"
            title="A steady, human pace for meaningful progress."
            text="Our platform keeps students, parents, and teachers synchronized with dedicated portals, clear assignments, and transparent progress reports."
          />
          <Link href="/about" className={`${primaryButton} mt-8`}>
            Discover the experience <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item, index) => (
            <div key={item} className={`flex items-center gap-4 rounded-xl border border-white bg-white p-4 ${index === 0 ? "sm:col-span-2" : ""}`}>
              <span className="flex size-9 items-center justify-center rounded-full bg-[#f5f1e8] text-[#147d70]">
                <Check size={17} aria-hidden="true" />
              </span>
              <span className="text-sm font-bold text-[#17324d]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuranPreview() {
  return (
    <section className="bg-[#fcfbf7] py-24">
      <div className={sectionClass}>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionIntro
              eyebrow="A reader built with care"
              title="Make space for your reading practice."
              text="Our dedicated digital Quran reading sanctuary includes authentic Uthmani script, multi-language translations, word-by-word guidance, and audio recitations."
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#eef7f3] px-3 py-2 text-xs font-bold text-[#147d70]">Authentic Uthmani Script</span>
              <span className="rounded-full bg-[#f5f1e8] px-3 py-2 text-xs font-bold text-[#667085]">Audio by Renowned Qaris</span>
            </div>
          </div>
          <div className="rounded-2xl border border-[#e7e5df] bg-white p-4 shadow-[0_16px_40px_rgba(23,50,77,0.06)] sm:p-6">
            <div className="flex flex-col gap-3 border-b border-[#e7e5df] pb-4 sm:flex-row">
              <label className="flex min-h-10 flex-1 items-center gap-2 rounded-lg border border-[#e7e5df] px-3 text-sm text-[#98a2b3]">
                <Search size={16} aria-hidden="true" />
                <span>Search Surah or Ayah</span>
              </label>
              <button type="button" className="rounded-lg bg-[#f5f1e8] px-4 py-2 text-left text-sm font-bold text-[#17324d]">
                Surah Al-Fatihah (1)
              </button>
            </div>
            <div className="mt-6 rounded-xl bg-[#f5f1e8] px-5 py-10 text-center">
              <p className="font-arabic text-3xl leading-loose text-[#17324d]" dir="rtl" lang="ar">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#667085]">
                In the name of Allah, the Entirely Merciful, the Especially Merciful.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button type="button" aria-label="Play audio recitation" className="flex size-10 items-center justify-center rounded-full bg-[#147d70] text-white">
                  <Play size={16} fill="currentColor" aria-hidden="true" />
                </button>
                <button type="button" aria-label="Audio settings" className="flex size-10 items-center justify-center rounded-full border border-[#e7e5df] text-[#147d70]">
                  <Headphones size={16} aria-hidden="true" />
                </button>
              </div>
              <div className="flex gap-2 text-[#667085]">
                <Bookmark size={18} aria-label="Bookmark" />
                <span className="text-xs font-bold text-[#147d70]">Bookmark saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlobalSection() {
  return (
    <section className="bg-white py-24">
      <div className={`${sectionClass} grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]`}>
        <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-[#e7e5df] bg-[#17324d] p-8">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #c6a15b 0 2px, transparent 3px), radial-gradient(circle at 75% 68%, #eef7f3 0 2px, transparent 3px)", backgroundSize: "70px 70px" }} aria-hidden="true" />
          <div className="relative flex h-full min-h-[250px] items-center justify-center">
            <div className="flex size-48 items-center justify-center rounded-full border border-[#c6a15b]/60 sm:size-64">
              <div className="flex size-32 items-center justify-center rounded-full border border-white/20 bg-[#147d70]/40 text-center text-sm font-bold text-white sm:size-44">
                Learn from<br />anywhere
              </div>
            </div>
            <span className="absolute left-[12%] top-[22%] rounded-full bg-white px-3 py-1 text-xs font-bold text-[#17324d]">United Kingdom</span>
            <span className="absolute right-[12%] top-[30%] rounded-full bg-white px-3 py-1 text-xs font-bold text-[#17324d]">UAE</span>
            <span className="absolute bottom-[18%] left-[18%] rounded-full bg-white px-3 py-1 text-xs font-bold text-[#17324d]">United States</span>
            <span className="absolute bottom-[16%] right-[17%] rounded-full bg-white px-3 py-1 text-xs font-bold text-[#17324d]">Canada</span>
          </div>
        </div>
        <div>
          <SectionIntro
            eyebrow="One academy, global reach"
            title="A global learning space that still feels personal."
            text="Noor Academy connects learners across 25+ countries with top qualified educators fluent in Arabic, English, and Urdu, offering flexible scheduling in any time zone."
          />
          <div className="mt-7 flex items-center gap-3 text-sm font-bold text-[#147d70]">
            <Globe2 size={20} aria-hidden="true" /> International community of learners
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-[#f5f1e8] py-24">
      <div className={sectionClass}>
        <SectionIntro eyebrow="Learner reflections" title="A thoughtful experience speaks for itself." text="Hear from students and families who have found consistency, clarity, and joy in their Quranic journey." centered />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map(({ quote, name, location }) => (
            <article key={name + location} className="rounded-2xl border border-[#e7e5df] bg-white p-6">
              <div className="flex gap-1 text-[#c6a15b]" aria-label="Five star rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-[#667085]">&ldquo;{quote}&rdquo;</p>
              <div className="mt-6 border-t border-[#e7e5df] pt-4">
                <p className="text-sm font-bold text-[#17324d]">{name}</p>
                <p className="mt-1 text-xs text-[#147d70]">{location} · Verified Student / Parent</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [yearly, setYearly] = useState(false);
  return (
    <section className="bg-[#fcfbf7] py-24">
      <div className={sectionClass}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionIntro
            eyebrow="Plans that can grow with you"
            title="A learning plan with room to breathe."
            text="Transparent pricing with zero long-term contracts. Pause or adjust your plan anytime."
          />
          <div className="flex rounded-full border border-[#e7e5df] bg-white p-1" role="group" aria-label="Billing period">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-2 text-xs font-bold ${!yearly ? "bg-[#17324d] text-white" : "text-[#667085]"}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`rounded-full px-4 py-2 text-xs font-bold ${yearly ? "bg-[#17324d] text-white" : "text-[#667085]"}`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <article key={plan.name} className={`rounded-2xl border p-6 ${index === 1 ? "border-[#147d70] bg-[#eef7f3] shadow-[0_16px_40px_rgba(20,125,112,0.1)]" : "border-[#e7e5df] bg-white"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-3xl text-[#17324d]">{plan.name}</h3>
                  <p className="mt-1 text-sm text-[#667085]">{plan.description}</p>
                </div>
                {index === 1 && (
                  <span className="rounded-full bg-[#c6a15b] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                    Most Popular
                  </span>
                )}
              </div>
              <p className="mt-8 font-display text-3xl text-[#17324d]">
                {yearly ? plan.yearly : plan.monthly}
                <span className="font-sans text-xs text-[#98a2b3]"> / billed {yearly ? "annually" : "monthly"}</span>
              </p>
              <ul className="mt-7 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-[#667085]">
                    <Check size={16} className="mt-0.5 shrink-0 text-[#147d70]" aria-hidden="true" /> {feature}
                  </li>
                ))}
              </ul>
              <Link href="/trial" className={`${index === 1 ? primaryButton : outlineButton} mt-8 w-full`}>
                Start Free Trial <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-white py-24">
      <div className={`${sectionClass} grid gap-12 lg:grid-cols-[0.8fr_1.2fr]`}>
        <SectionIntro
          eyebrow="Questions, answered clearly"
          title="A little more context before you begin."
          text="Find answers to common questions about our curriculum, class structure, and teacher selection."
        />
        <div className="divide-y divide-[#e7e5df] border-y border-[#e7e5df]">
          {faqs.map(([question, answer], index) => (
            <div key={question}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-5 py-5 text-left"
                aria-expanded={open === index}
                onClick={() => setOpen(open === index ? -1 : index)}
              >
                <span className="font-display text-xl text-[#17324d]">{question}</span>
                <ChevronDown size={18} className={`shrink-0 text-[#147d70] transition-transform ${open === index ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {open === index && <p className="max-w-2xl pb-5 text-sm leading-7 text-[#667085]">{answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#147d70] py-20">
      <div className={`${sectionClass} flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e9ddbf]">Your next chapter can start here</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-white sm:text-5xl">Begin your Quran learning journey today.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">Book a free trial and discover a learning experience designed around your goals, schedule, and pace.</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link href="/trial" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#17324d] hover:bg-[#f5f1e8]">
            Book Free Trial <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 px-5 text-sm font-bold text-white hover:bg-white/10">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <WhySection />
      <CoursesSection />
      <ProcessSection />
      <TeachersSection />
      <ExperienceSection />
      <QuranPreview />
      <GlobalSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
