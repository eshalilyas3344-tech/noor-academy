import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "emerald" | "gold" | "muted";
};

export function Badge({ className = "", tone = "emerald", ...props }: BadgeProps) {
  const tones = {
    emerald: "bg-surface-green text-emerald",
    gold: "bg-[#fbf5e8] text-[#8d6b2e]",
    muted: "bg-[#f2f1ed] text-text-secondary",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${tones[tone]} ${className}`}
      {...props}
    />
  );
}
