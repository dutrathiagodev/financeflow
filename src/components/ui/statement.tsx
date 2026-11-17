import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Tipo de linha do demonstrativo (formato livro-caixa):
 * - "line": linha comum com régua fina
 * - "note": observação logo abaixo da linha anterior, sem régua
 * - "total": total com régua forte acima
 * - "final": saldo final com traço duplo acima
 */
export type StatementLineKind = "line" | "note" | "total" | "final";

export type StatementLine = {
  label: ReactNode;
  value: ReactNode;
  kind?: StatementLineKind;
  /** Cor do valor. */
  tone?: "neutral" | "receita" | "despesa" | "invest";
};

type StatementProps = {
  lines: ReadonlyArray<StatementLine>;
  /** "dark" para usar sobre o painel escuro de destaque. */
  surface?: "light" | "dark";
  className?: string;
};

const lineKind: Record<StatementLineKind, string> = {
  line: "border-b py-[9px]",
  note: "-mt-[3px] pt-0 pb-[9px] text-[0.82rem]",
  total: "border-t pt-[11px] pb-[9px]",
  final: "border-t-4 border-double pt-[11px] pb-[9px]",
};

const toneLight = {
  neutral: "",
  receita: "text-receita",
  despesa: "text-despesa",
  invest: "text-invest",
} as const;

const toneDark = {
  neutral: "",
  receita: "text-lima",
  despesa: "text-coral",
  invest: "text-[#8fd0e0]",
} as const;

/** Demonstrativo: linhas com régua fina, total com régua forte e saldo final com traço duplo. */
export function Statement({ lines, surface = "light", className }: StatementProps) {
  const dark = surface === "dark";
  return (
    <dl className={cn("grid", className)}>
      {lines.map((line, index) => {
        const kind = line.kind ?? "line";
        const strong = kind === "total" || kind === "final";
        // A observação fica colada na linha anterior: a régua passa para baixo dela.
        const followedByNote = lines[index + 1]?.kind === "note";
        return (
          <div
            key={index}
            className={cn(
              "flex items-baseline justify-between gap-4",
              lineKind[kind],
              kind === "line" && followedByNote && "border-b-0",
              kind === "note" && !followedByNote && "border-b",
              (kind === "line" || kind === "note") && (dark ? "border-creme/20" : "border-regua"),
              strong && (dark ? "border-creme" : "border-tinta"),
            )}
          >
            <dt
              className={cn(
                strong ? "font-bold" : dark ? "text-menta" : "text-muted",
              )}
            >
              {line.label}
            </dt>
            <dd
              className={cn(
                "font-display font-semibold tabular-nums",
                kind === "final" && "text-[1.3rem] font-extrabold",
                (dark ? toneDark : toneLight)[line.tone ?? "neutral"],
              )}
            >
              {line.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
