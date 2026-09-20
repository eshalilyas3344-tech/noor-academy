import { Suspense } from "react";
import { PortalLoginForm } from "@/components/auth/PortalLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fcfbf7] flex items-center justify-center p-8 text-sm text-[#667085]">Loading Admin Portal...</div>}>
      <PortalLoginForm role="admin" />
    </Suspense>
  );
}
