import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "invest";
export type ButtonSize = "md" | "sm";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-base border font-sans font-semibold cursor-pointer disabled:cursor-default disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  // Escuro: o primario vira lima com texto escuro (tokens primario / primario-texto)
  primary:
    "border-primario bg-primario text-primario-texto hover:border-musgo hover:bg-musgo hover:text-creme",
  outline: "border-tinta bg-transparent text-tinta hover:bg-hover",
  invest: "border-invest-fundo bg-invest-fundo text-white hover:opacity-90",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-4 text-[0.92rem]",
  sm: "min-h-[34px] px-3 text-[0.85rem]",
};

export function Button({
  variant = "primary",
  size = "md",
  block = false,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], block && "w-full", className)}
      {...props}
    />
  );
}
