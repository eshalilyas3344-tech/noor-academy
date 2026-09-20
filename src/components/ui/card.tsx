import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-border bg-white p-6 shadow-[0_10px_30px_rgba(23,50,77,0.04)] ${className}`}
      {...props}
    />
  );
}
