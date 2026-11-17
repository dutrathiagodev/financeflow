"use client";

import { cn } from "@/lib/utils";

/** Cor da opção ativa: despesa (vermelho-tijolo), receita (verde-escuro), aporte (verde), resgate (azul-petróleo). */
export type SegmentTone = "neutral" | "despesa" | "receita" | "aporte" | "resgate";

export type SegmentOption<T extends string> = {
  value: T;
  label: string;
  tone?: SegmentTone;
};

type SegmentedControlProps<T extends string> = {
  /** Nome do grupo de rádios (único na página). */
  name: string;
  /** Rótulo do grupo, anunciado por leitores de tela. */
  legend: string;
  options: ReadonlyArray<SegmentOption<T>>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

const activeTone: Record<SegmentTone, string> = {
  neutral: "peer-checked:bg-primario peer-checked:text-primario-texto",
  despesa: "peer-checked:bg-despesa peer-checked:text-white",
  receita: "peer-checked:bg-receita peer-checked:text-white",
  aporte: "peer-checked:bg-receita peer-checked:text-white",
  resgate: "peer-checked:bg-invest peer-checked:text-white",
};

/** Escolha única entre 2 ou 3 opções lado a lado (rádios nativos: setas do teclado funcionam). */
export function SegmentedControl<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <fieldset
      className={cn(
        "grid overflow-hidden rounded-base border border-regua-forte bg-campo",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <legend className="sr-only">{legend}</legend>
      {options.map((option, index) => (
        <label key={option.value} className={cn("relative", index > 0 && "border-l border-regua-forte")}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="peer absolute inset-0 cursor-pointer opacity-0"
          />
          <span
            className={cn(
              "grid min-h-[42px] place-items-center px-2 text-center text-[0.9rem] font-semibold text-muted",
              "peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-4 peer-focus-visible:outline-tinta",
              activeTone[option.tone ?? "neutral"],
            )}
          >
            {option.label}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
