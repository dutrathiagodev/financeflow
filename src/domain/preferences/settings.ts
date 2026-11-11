import { INITIAL_CASH } from "@/domain/account/operations";

export const TABLE_ROW_OPTIONS = [10, 15, 25, 50] as const;
export const INITIAL_CASH_OPTIONS = [1_000, INITIAL_CASH, 50_000, 100_000] as const;

export type Settings = {
  /** Faixa de cotações do topo rolando sozinha. */
  tickerAnimated: boolean;
  /** Linhas exibidas na tabela do Dashboard. */
  tableRows: number;
  /** Saldo da conta simulada ao zerar. */
  initialCash: number;
};

export const DEFAULT_SETTINGS: Settings = {
  tickerAnimated: true,
  tableRows: 15,
  initialCash: INITIAL_CASH,
};

function pickOption<T extends number>(value: unknown, options: readonly T[], fallback: T): T {
  return options.find((option) => option === value) ?? fallback;
}

/** Valida dados desconhecidos (ex.: do storage); cada campo inválido volta ao padrão. */
export function parseSettings(raw: unknown): Settings {
  if (typeof raw !== "object" || raw === null) return DEFAULT_SETTINGS;
  const { tickerAnimated, tableRows, initialCash } = raw as Record<string, unknown>;

  return {
    tickerAnimated: typeof tickerAnimated === "boolean" ? tickerAnimated : DEFAULT_SETTINGS.tickerAnimated,
    tableRows: pickOption(tableRows, TABLE_ROW_OPTIONS, DEFAULT_SETTINGS.tableRows),
    initialCash: pickOption(initialCash, INITIAL_CASH_OPTIONS, DEFAULT_SETTINGS.initialCash),
  };
}
