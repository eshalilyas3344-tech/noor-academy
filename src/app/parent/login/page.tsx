import { Suspense } from "react";
import { PortalLoginForm } from "@/components/auth/PortalLoginForm";

export default function ParentLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fcfbf7] flex items-center justify-center p-8 text-sm text-[#667085]">Loading Parent Portal...</div>}>
      <PortalLoginForm role="parent" />
    </Suspense>
  );
}
