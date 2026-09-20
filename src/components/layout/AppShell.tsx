"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin =
    pathname === "/login" ||
    pathname === "/teacher/login" ||
    pathname === "/parent/login" ||
    pathname === "/admin/login" ||
    pathname === "/student/login";

  const isPortal =
    !isLogin &&
    (pathname.startsWith("/student") ||
      pathname.startsWith("/parent") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/teacher"));

  return isPortal ? <>{children}</> : <><Navbar />{children}<Footer /></>;
}
