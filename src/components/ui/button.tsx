import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "small" | "medium";
};

export function Button({
  className = "",
  variant = "primary",
  size = "medium",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-emerald text-white shadow-sm hover:bg-emerald-dark",
    outline: "border border-border bg-white text-navy hover:border-emerald hover:text-emerald",
    ghost: "text-emerald hover:bg-surface-green",
  };
  const sizes = {
    small: "min-h-9 px-3 text-xs",
    medium: "min-h-11 px-5 text-sm",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
