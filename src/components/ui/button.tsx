import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
};

const variants = {
  primary: "bg-accent text-brand-dark hover:bg-brand-mint",
  ghost: "border border-line text-ink hover:border-line-strong hover:bg-white/5",
  danger: "bg-down-soft text-down hover:bg-down/25",
};

export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "rounded-control px-5 py-3 text-base font-medium transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
