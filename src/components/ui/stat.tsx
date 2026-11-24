import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Faixa de totais: uma celula em destaque (escura) e as demais lado a lado. Sem texto de negocio. */
export function StatStrip({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 overflow-hidden rounded-base border border-regua-forte bg-painel lg:grid-cols-[1.5fr_1fr_1fr]",
        className,
      )}
      {...props}
    />
  );
}

export type StatTone = "neutro" | "receita" | "despesa";

type StatProps = {
  label: ReactNode;
  /** Valor ja formatado (ex.: "R$ 566,80"). */
  value: ReactNode;
  /** Linha de apoio abaixo do valor. */
  support?: ReactNode;
  tone?: StatTone;
  /** Celula em destaque: fundo escuro, valor grande (Bricolage 800). */
  destaque?: boolean;
  className?: string;
};

const tones: Record<StatTone, string> = {
  neutro: "",
  receita: "text-receita",
  despesa: "text-despesa",
};

export function Stat({ label, value, support, tone = "neutro", destaque = false, className }: StatProps) {
  return (
    <div
      className={cn(
        "px-[22px] py-4",
        destaque
          ? "col-span-2 bg-escuro text-creme lg:col-span-1"
          : "border-t border-regua-forte lg:border-t-0 lg:border-l",
        className,
      )}
    >
      <small className={cn("block text-[0.875rem] font-medium", destaque ? "text-menta" : "text-muted")}>
        {label}
      </small>
      <b
        className={cn(
          "numero mt-0.5 block leading-tight",
          destaque
            ? "text-[2.5rem] font-extrabold tracking-[-0.035em]"
            : "text-[1.7rem] font-bold tracking-[-0.025em]",
          tones[tone],
        )}
      >
        {value}
      </b>
      {support ? (
        <em className={cn("block text-[0.875rem] not-italic", destaque ? "text-menta" : "text-muted")}>
          {support}
        </em>
      ) : null}
    </div>
  );
}
