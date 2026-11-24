import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Nome acessivel obrigatorio: o botao nao tem texto visivel. */
  "aria-label": string;
};

/** Botao quadrado de 44px so com icone, com contorno fino (alvo de toque do PRD). */
export function IconButton({ className, type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "grid size-11 flex-none cursor-pointer place-items-center rounded-base border border-regua-forte bg-transparent text-tinta hover:bg-hover",
        className,
      )}
      {...props}
    />
  );
}
