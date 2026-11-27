import type { ChangeEventHandler } from "react";
import { cn } from "@/lib/utils";

/** Cor do segmento ativo: neutro usa o botao primario; os demais seguem o PRD (secao 7). */
export type SegmentTone = "neutro" | "despesa" | "receita" | "aporte" | "resgate";

export type SegmentOption = {
  value: string;
  label: string;
  tone?: SegmentTone;
};

type SegmentedControlProps = {
  name: string;
  options: SegmentOption[];
  /** Nome acessivel do grupo (ex.: tipo da movimentacao). */
  legend: string;
  defaultValue?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

// Classes completas para o Tailwind enxergar cada uma.
const ativo: Record<SegmentTone, string> = {
  neutro: "peer-checked:bg-primario peer-checked:text-primario-texto",
  despesa: "peer-checked:bg-despesa-fundo peer-checked:text-white",
  receita: "peer-checked:bg-receita-fundo peer-checked:text-white",
  aporte: "peer-checked:bg-receita-fundo peer-checked:text-white",
  resgate: "peer-checked:bg-invest-fundo peer-checked:text-white",
};

/** Radios nativos estilizados: teclado e leitor de tela funcionam sem JavaScript. */
export function SegmentedControl({
  name,
  options,
  legend,
  defaultValue,
  value,
  onChange,
  className,
}: SegmentedControlProps) {
  const controlado = value !== undefined;
  return (
    <fieldset
      className={cn(
        "m-0 flex overflow-hidden rounded-base border border-regua-forte bg-campo p-0",
        className,
      )}
    >
      <legend className="sr-only">{legend}</legend>
      {options.map((opcao) => (
        <label
          key={opcao.value}
          className="relative flex-1 border-l border-regua-forte first:border-l-0"
        >
          <input
            type="radio"
            name={name}
            value={opcao.value}
            className="peer absolute inset-0 cursor-pointer opacity-0"
            {...(controlado
              ? { checked: value === opcao.value, onChange }
              : { defaultChecked: defaultValue === opcao.value, onChange })}
          />
          <span
            className={cn(
              "grid min-h-11 place-items-center px-2 text-center text-[0.9rem] font-semibold text-muted",
              "peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-4 peer-focus-visible:outline-tinta",
              ativo[opcao.tone ?? "neutro"],
            )}
          >
            {opcao.label}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
