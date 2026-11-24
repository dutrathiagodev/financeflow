import { cn } from "@/lib/utils";

export type CreditCardColor = "roxo" | "laranja" | "verde" | "azul" | "vermelho" | "grafite";

// Classes completas por cor para o Tailwind gerar cada uma.
const cores: Record<CreditCardColor, { degrade: string; borda: string; barra: string }> = {
  roxo: {
    degrade: "from-cartao-roxo to-cartao-roxo-2",
    borda: "border-b-cartao-roxo",
    barra: "bg-cartao-roxo-2",
  },
  laranja: {
    degrade: "from-cartao-laranja to-cartao-laranja-2",
    borda: "border-b-cartao-laranja",
    barra: "bg-cartao-laranja-2",
  },
  verde: {
    degrade: "from-cartao-verde to-cartao-verde-2",
    borda: "border-b-cartao-verde",
    barra: "bg-cartao-verde-2",
  },
  azul: {
    degrade: "from-cartao-azul to-cartao-azul-2",
    borda: "border-b-cartao-azul",
    barra: "bg-cartao-azul-2",
  },
  vermelho: {
    degrade: "from-cartao-vermelho to-cartao-vermelho-2",
    borda: "border-b-cartao-vermelho",
    barra: "bg-cartao-vermelho-2",
  },
  grafite: {
    degrade: "from-cartao-grafite to-cartao-grafite-2",
    borda: "border-b-cartao-grafite",
    barra: "bg-cartao-grafite-2",
  },
};

type CreditCardProps = {
  cor: CreditCardColor;
  nome: string;
  /** Linha abaixo do nome (ex.: "fatura aberta · vence 27/12"). */
  detalhe: string;
  /** Valor da fatura ja formatado. */
  fatura: string;
  /** Uso do limite de 0 a 100; passa de 80 a barra fica coral. */
  usoDoLimite: number;
  /** Nome acessivel da barra de limite (texto vem de fora; ui nao tem texto de negocio). */
  rotuloDoLimite: string;
  /** Texto abaixo da barra, ja formatado (ex.: "Disponível R$ 2.500,00"). */
  disponivel: string;
  /** Texto da direita abaixo da barra (ex.: "0% do limite"). */
  limiteTexto: string;
  /** Versao compacta usada no painel. */
  compacto?: boolean;
  className?: string;
};

function Chip() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[22px] flex-none fill-none stroke-current opacity-95"
      strokeWidth="1.6"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
      <path d="M6 14h2" />
    </svg>
  );
}

/** Cartao de credito: corpo escuro, faixa na cor do banco, fatura a direita, barra de limite e vencimento. */
export function CreditCard({
  cor,
  nome,
  detalhe,
  fatura,
  usoDoLimite,
  rotuloDoLimite,
  disponivel,
  limiteTexto,
  compacto = false,
  className,
}: CreditCardProps) {
  const c = cores[cor];
  const uso = Math.min(100, Math.max(0, usoDoLimite));
  return (
    <article
      className={cn(
        "relative grid overflow-hidden rounded-[16px] border border-b-[6px] border-creme/10 bg-cartao-corpo px-2 pt-2 text-creme",
        c.borda,
        className,
      )}
    >
      <div
        className={cn(
          "relative grid rounded-[12px] bg-linear-[120deg] px-4 pt-3.5 text-white",
          c.degrade,
          compacto ? "min-h-[112px]" : "min-h-[132px]",
        )}
      >
        <Chip />
        <div
          className={cn(
            "numero absolute right-4 top-3 text-right font-bold leading-[1.1] tracking-[-0.03em]",
            compacto ? "text-[1.5rem]" : "text-[1.85rem]",
          )}
        >
          {fatura}
        </div>
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-0 left-0 w-[56%] rounded-tr-[26px] bg-cartao-corpo",
            compacto ? "h-[54px]" : "h-[62px]",
          )}
        />
        <div className="absolute bottom-1.5 left-3 z-10 grid leading-tight">
          <b className="font-display text-[1.12rem] font-bold text-white">{nome}</b>
          <span className="text-[0.82rem] text-creme/70">{detalhe}</span>
        </div>
      </div>
      <div className={cn("grid gap-[9px] px-2.5", compacto ? "py-3" : "py-3.5")}>
        <div
          role="progressbar"
          aria-label={rotuloDoLimite}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(uso)}
          className="h-1.5 overflow-hidden rounded-full bg-creme/15"
        >
          <i
            className={cn("block h-full min-w-[3px] rounded-full", uso > 80 ? "bg-coral" : c.barra)}
            style={{ width: `${uso}%` }}
          />
        </div>
        <div className="flex flex-wrap justify-between gap-2 text-[0.85rem] text-creme/70">
          <span>{disponivel}</span>
          <span>{limiteTexto}</span>
        </div>
      </div>
    </article>
  );
}
