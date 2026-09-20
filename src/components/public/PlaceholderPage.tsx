import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { outlineLink, pageWrap, primaryLink } from "./Shared";

export function PlaceholderPage({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <main className="bg-[#fcfbf7] py-20 sm:py-28"><div className={`${pageWrap} mx-auto max-w-3xl text-center`}><span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#eef7f3] text-[#147d70]"><BookOpen size={25} aria-hidden="true" /></span><p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-[#147d70]">{eyebrow}</p><h1 className="mt-4 font-display text-5xl text-[#17324d]">{title}</h1><p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#667085]">{description}</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/" className={outlineLink}><ArrowLeft size={16} aria-hidden="true" /> Back home</Link><Link href="/trial" className={primaryLink}>Book Free Trial <ArrowRight size={16} aria-hidden="true" /></Link></div></div></main>;
}
