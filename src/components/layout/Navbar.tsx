"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, BookOpen, ChevronDown, GraduationCap, Lock, Menu, Shield, User, UsersRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Teachers", href: "/teachers" },
  { label: "Quran", href: "/quran" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const portalDropdownRef = useRef<HTMLDivElement>(null);
  const wasMenuOpen = useRef(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (portalDropdownRef.current && !portalDropdownRef.current.contains(event.target as Node)) {
        setIsPortalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      if (wasMenuOpen.current) menuButtonRef.current?.focus();
      wasMenuOpen.current = false;
      return;
    }

    document.body.style.overflow = "hidden";
    wasMenuOpen.current = true;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsPortalOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${isScrolled || isMenuOpen ? "border-border bg-white/95 shadow-[0_8px_24px_rgba(23,50,77,0.06)] backdrop-blur" : "border-transparent bg-background/90"}`}>
      <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10" aria-label="Primary navigation">
        <Link href="/" className="flex shrink-0 items-center gap-3" onClick={closeMenu}>
          <span className="flex size-10 items-center justify-center rounded-xl bg-emerald text-white shadow-sm">
            <BookOpen size={20} aria-hidden="true" />
          </span>
          <span>
            <span className="block font-display text-xl font-semibold leading-none text-navy">Noor Academy</span>
            <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.16em] text-emerald sm:block">Learn the Quran. Nourish Your Soul.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${active ? "bg-surface-green text-emerald" : "text-text-secondary hover:bg-surface-green hover:text-emerald"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {/* Portal Login Dropdown */}
          <div className="relative" ref={portalDropdownRef}>
            <button
              type="button"
              onClick={() => setIsPortalOpen(!isPortalOpen)}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-surface-green hover:text-emerald"
              aria-expanded={isPortalOpen}
              aria-haspopup="true"
            >
              <span>Portals</span>
              <ChevronDown size={15} className={`transition-transform duration-200 ${isPortalOpen ? "rotate-180" : ""}`} />
            </button>

            {isPortalOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-border bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-border/60">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#98a2b3]">Select Portal Access</p>
                </div>
                <div className="mt-1 space-y-1">
                  <Link
                    href="/login"
                    onClick={() => setIsPortalOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface-green"
                  >
                    <span className="flex size-9 items-center justify-center rounded-lg bg-surface-green text-emerald">
                      <User size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-navy">Student Portal</p>
                      <p className="text-xs text-text-secondary">Classroom, lessons &amp; progress</p>
                    </div>
                  </Link>

                  <Link
                    href="/parent/login"
                    onClick={() => setIsPortalOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface-green"
                  >
                    <span className="flex size-9 items-center justify-center rounded-lg bg-[#eef7f3] text-[#147d70]">
                      <UsersRound size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-navy">Parent Portal</p>
                      <p className="text-xs text-text-secondary">Family oversight &amp; feedback</p>
                    </div>
                  </Link>

                  <Link
                    href="/teacher/login"
                    onClick={() => setIsPortalOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface-green"
                  >
                    <span className="flex size-9 items-center justify-center rounded-lg bg-[#f5f1e8] text-[#8d6b2e]">
                      <GraduationCap size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-navy">Teacher Portal</p>
                      <p className="text-xs text-text-secondary">Instructor schedule &amp; classes</p>
                    </div>
                  </Link>
                </div>

                <div className="mt-2 border-t border-border/60 pt-2 px-2">
                  <Link
                    href="/admin/login"
                    onClick={() => setIsPortalOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-[#98a2b3] hover:text-navy hover:bg-surface-green"
                  >
                    <Lock size={12} />
                    <span>Staff &amp; Administration</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/trial" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-dark">
            Book Free Trial <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/trial" className="hidden rounded-full bg-emerald px-3 py-2 text-xs font-bold text-white min-[360px]:inline-flex">Book Trial</Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="flex size-10 items-center justify-center rounded-full border border-border text-navy hover:bg-surface-green"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div id="mobile-navigation" className="border-t border-border bg-white px-5 py-5 lg:hidden">
          <div className="mx-auto max-w-7xl">
            <button ref={closeButtonRef} type="button" className="sr-only" onClick={closeMenu}>Close navigation menu</button>
            <div className="grid gap-1">
              {navigation.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} onClick={closeMenu} className={`rounded-xl px-4 py-3 text-base font-semibold ${active ? "bg-surface-green text-emerald" : "text-navy hover:bg-surface-green"}`}>
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Portals Access */}
            <div className="mt-5 border-t border-border pt-4">
              <p className="px-2 text-xs font-bold uppercase tracking-[0.14em] text-[#98a2b3]">Portal Logins</p>
              <div className="mt-2 grid gap-1">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy hover:bg-surface-green"
                >
                  <User size={16} className="text-emerald" />
                  <span>Student Portal</span>
                </Link>
                <Link
                  href="/parent/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy hover:bg-surface-green"
                >
                  <UsersRound size={16} className="text-emerald" />
                  <span>Parent Portal</span>
                </Link>
                <Link
                  href="/teacher/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy hover:bg-surface-green"
                >
                  <GraduationCap size={16} className="text-emerald" />
                  <span>Teacher Portal</span>
                </Link>
                <Link
                  href="/admin/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs text-[#98a2b3] hover:text-navy"
                >
                  <Shield size={14} />
                  <span>Staff / Administration Login</span>
                </Link>
              </div>
            </div>

            <div className="mt-4 border-t border-border pt-4">
              <Link href="/trial" onClick={closeMenu} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-dark">
                Book Free Trial <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
