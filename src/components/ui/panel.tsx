import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PanelProps = {
  /** Título no cabeçalho do painel (vira um h2). */
  title?: ReactNode;
  /** Conteúdo à direita do título (ex.: navegação de mês, abas). */
  actions?: ReactNode;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Painel plano com borda fina e sem sombra. Não colocar um painel dentro de outro. */
export function Panel({ title, actions, as: Tag = "section", className, children }: PanelProps) {
  return (
    <Tag className={cn("rounded-base border border-regua-forte bg-painel px-5 py-[18px]", className)}>
      {title ? (
        <header className="-mx-5 -mt-[18px] mb-[18px] flex min-h-[52px] flex-wrap items-center justify-between gap-2.5 border-b border-regua px-5 py-3">
          <h2 className="font-display text-[1.02rem] font-bold tracking-[-0.01em]">{title}</h2>
          {actions}
        </header>
      ) : null}
      {children}
    </Tag>
  );
}

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

/** Limita a largura do conteúdo e aplica o respiro lateral (16 px no celular, 32 px no desktop). */
export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("w-full max-w-[1360px] px-gutter-mobile lg:px-gutter-desktop", className)}>
      {children}
    </div>
  );
}
