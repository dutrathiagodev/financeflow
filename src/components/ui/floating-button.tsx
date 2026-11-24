import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Botao flutuante fixo embaixo, na zona do polegar (PRD secao 9). So existe no celular.
 * O `bottom` deixa espaco para a barra de navegacao inferior (FF-0014).
 */
export function FloatingButton({
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        "fixed bottom-[calc(80px+env(safe-area-inset-bottom))] right-4 z-30 flex h-[52px] items-center gap-2 rounded-base bg-primario px-5 font-sans font-bold text-primario-texto shadow-[0_8px_22px_rgb(31_47_36/0.35)] lg:hidden",
        className,
      )}
      {...props}
    />
  );
}
