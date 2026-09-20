import Link from "next/link";
import { ArrowRight, BookOpen, Globe2, Lock, MessageCircle, Send } from "lucide-react";

const quickLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Courses", "/courses"],
  ["Teachers", "/teachers"],
  ["Quran", "/quran"],
  ["Pricing", "/pricing"],
];

const learningLinks = [
  ["Noorani Qaida", "/courses/noorani-qaida"],
  ["Quran Reading", "/courses/quran-reading"],
  ["Quran with Tajweed", "/courses/tajweed"],
  ["Quran Memorization", "/courses/hifz"],
  ["Translation & Tafseer", "/courses/translation-tafseer"],
  ["Islamic Studies", "/courses/islamic-studies"],
];

const portalLinks = [
  ["Student Login", "/login"],
  ["Parent Login", "/parent/login"],
  ["Teacher Login", "/teacher/login"],
  ["Free Trial", "/trial"],
];

const supportLinks = [
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
  ["Support Center", "/support"],
  ["Registration", "/register"],
];

function FooterLinks({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="text-sm text-white/65 transition-colors hover:text-white">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <section className="flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.06] p-6 sm:flex-row sm:items-center sm:p-8" aria-labelledby="footer-cta-heading">
          <div>
            <h2 id="footer-cta-heading" className="font-display text-3xl text-white">Ready to begin your Quran learning journey?</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">Start with a free trial and discover a learning experience designed around you.</p>
          </div>
          <Link href="/trial" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-navy transition-colors hover:bg-[#f5f1e8]">Book a Free Trial <ArrowRight size={16} aria-hidden="true" /></Link>
        </section>

        <div className="grid gap-10 border-b border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-emerald text-white"><BookOpen size={20} aria-hidden="true" /></span>
              <span className="font-display text-2xl font-semibold">Noor Academy</span>
            </Link>
            <p className="mt-5 text-sm leading-7 text-white/65">Learn the Quran with qualified teachers through personalized online lessons designed for students of all ages.</p>
            <div className="mt-6 flex gap-2" aria-label="Social media links">
              <a href="#facebook" aria-label="Noor Academy social link" className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"><Globe2 size={16} aria-hidden="true" /></a>
              <a href="#instagram" aria-label="Noor Academy community link" className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"><MessageCircle size={16} aria-hidden="true" /></a>
              <a href="#linkedin" aria-label="Noor Academy updates link" className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"><Send size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <FooterLinks title="Quick links" links={quickLinks} />
          <FooterLinks title="Learning" links={learningLinks} />
          <FooterLinks title="Portals" links={portalLinks} />
          <FooterLinks title="Support" links={supportLinks} />
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© Noor Academy. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
            {/* Discreet, secure admin entry */}
            <Link href="/admin/login" className="flex items-center gap-1 text-white/30 hover:text-white/60 transition-colors" title="Administrative Access">
              <Lock size={10} />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
