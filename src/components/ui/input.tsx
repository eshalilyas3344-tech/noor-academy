import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ id, label, className = "", ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replaceAll(" ", "-");

  return (
    <label htmlFor={inputId} className="block text-left">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">{label}</span>
      <input
        id={inputId}
        className={`min-h-11 w-full rounded-xl border border-border bg-[#fcfbf7] px-3 text-sm text-foreground placeholder:text-text-muted focus:border-emerald focus:outline-none ${className}`}
        {...props}
      />
    </label>
  );
}
