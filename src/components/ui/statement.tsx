import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Demonstrativo (livro-caixa): linhas com regua fina, total com regua forte e saldo final com traco duplo. */
export function Statement({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid", className)} {...props} />;
}

export type StatementLineKind = "linha" | "apoio" | "total" | "final";
export type StatementTone = "neutro" | "receita" | "despesa" | "invest";

type StatementLineProps = {
  label: ReactNode;
  value: ReactNode;
  kind?: StatementLineKind;
  tone?: StatementTone;
  className?: string;
};

const kinds: Record<StatementLineKind, string> = {
  linha: "border-b border-regua py-[9px]",
  apoio: "-mt-[3px] pb-[9px] text-[0.82rem]",
  total: "border-t border-tinta pt-[11px]",
  final: "border-t-4 border-double border-tinta pt-[11px]",
};

const labelKinds: Record<StatementLineKind, string> = {
  linha: "text-muted",
  apoio: "text-muted",
  total: "font-bold text-tinta",
  final: "font-bold text-tinta",
};

const tones: Record<StatementTone, string> = {
  neutro: "",
  receita: "text-receita",
  despesa: "text-despesa",
  invest: "text-invest",
};

export function StatementLine({
  label,
  value,
  kind = "linha",
  tone = "neutro",
  className,
}: StatementLineProps) {
  return (
    <div className={cn("flex items-baseline justify-between gap-4", kinds[kind], className)}>
      <span className={labelKinds[kind]}>{label}</span>
      <b
        className={cn(
          "numero font-semibold",
          kind === "final" && "text-[1.3rem] font-extrabold",
          tones[tone],
        )}
      >
        {value}
      </b>
    </div>
  );
}
