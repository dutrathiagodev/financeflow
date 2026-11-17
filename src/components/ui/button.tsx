import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "light";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-base border font-semibold transition-colors disabled:cursor-default disabled:opacity-40";

const variants: Record<Variant, string> = {
  // Escuro: o token primário vira lima com texto escuro.
  primary:
    "border-primario bg-primario text-primario-texto enabled:hover:border-musgo enabled:hover:bg-musgo enabled:hover:text-creme",
  outline: "border-tinta bg-transparent text-tinta enabled:hover:bg-tinta/8",
  light: "border-creme/40 bg-transparent text-creme enabled:hover:bg-creme/10",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-4 text-[0.92rem]",
  sm: "min-h-[34px] px-3 text-[0.85rem]",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  /** Ocupa toda a largura disponível. */
  block?: boolean;
};

/** Botão genérico: primário (cheio), contorno ou claro (sobre fundo escuro). */
export function Button({
  variant = "outline",
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

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Texto anunciado por leitores de tela (obrigatório: o botão só tem ícone). */
  label: string;
  /** "danger" destaca em vermelho no hover (ex.: lixeira); "bordered" tem contorno. */
  tone?: "neutral" | "danger" | "bordered";
};

/** Botão quadrado de 44 px que contém apenas um ícone. */
export function IconButton({
  label,
  tone = "neutral",
  type = "button",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "grid size-11 flex-none place-items-center rounded-base transition-colors",
        tone === "neutral" && "text-muted hover:bg-hover hover:text-tinta",
        tone === "danger" && "text-muted hover:bg-despesa-suave hover:text-despesa",
        tone === "bordered" && "border border-regua-forte text-tinta hover:bg-hover",
        className,
      )}
      {...props}
    />
  );
}
