import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  /** Titulo do painel; vira um h2 com regua fina embaixo. */
  title?: ReactNode;
  /** Conteudo alinhado a direita do titulo (abas, botao pequeno, nota). */
  action?: ReactNode;
};

/** Painel plano com borda fina e sem sombra (PRD secao 7). */
export function Card({ title, action, className, children, ...props }: CardProps) {
  return (
    <section
      className={cn("rounded-base border border-regua-forte bg-painel px-5 py-[18px]", className)}
      {...props}
    >
      {title ? (
        <h2 className="-mx-5 -mt-[18px] mb-[18px] flex min-h-[52px] items-center justify-between gap-2.5 border-b border-regua px-5 py-3 font-display text-[1.02rem] font-bold tracking-[-0.01em]">
          {title}
          {action ? (
            <span className="font-sans text-[0.85rem] font-semibold text-muted">{action}</span>
          ) : null}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
