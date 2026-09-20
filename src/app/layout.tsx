import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noor Academy | Learn the Quran. Nourish Your Soul.",
  description: "A premium online Quran learning experience for students and families worldwide.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full"><AppShell>{children}</AppShell></body>
    </html>
  );
}
