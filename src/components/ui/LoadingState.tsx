export function LoadingState({ portal = false }: { portal?: boolean }) {
  return (
    <div
      className={`flex min-h-[45vh] items-center justify-center px-6 ${portal ? "bg-[#fcfbf7]" : "bg-[#fcfbf7]"}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-[#147d70] text-white shadow-sm">
          <span className="size-5 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden="true" />
        </span>
        <p className="mt-5 font-display text-2xl text-[#17324d]">Loading Noor Academy</p>
        <p className="mt-2 text-sm text-[#667085]">Preparing your learning space...</p>
      </div>
    </div>
  );
}
