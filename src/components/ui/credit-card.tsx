import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

type CreditCardProps = {
  /** Nome do cartão (ex.: banco). */
  name: ReactNode;
  /** Linha de apoio abaixo do nome (ex.: final ou bandeira). */
  caption?: ReactNode;
  /** Valor da fatura já formatado, exibido à direita. */
  invoice: ReactNode;
  /** Rótulo acessível da fatura (ex.: "Fatura aberta"). */
  invoiceLabel: string;
  /** Percentual do limite usado (0 a 100). */
  usedPercent: number;
  /** Rótulo acessível da barra de limite (ex.: "Limite usado"). */
  usedLabel: string;
  /** Linhas de informação abaixo da barra (ex.: disponível, vencimento). */
  details?: ReadonlyArray<{ label: ReactNode; value: ReactNode }>;
  /** Cores do banco: faixa e gradiente. */
  colors: { primary: string; secondary: string };
  /** Versão compacta para o painel. */
  compact?: boolean;
  /** Ação extra no rodapé (ex.: link "Remover cartão"). */
  footer?: ReactNode;
  className?: string;
};

/** Cartão de crédito: corpo escuro, faixa na cor do banco, fatura à direita, barra de limite e vencimento. */
export function CreditCard({
  name,
  caption,
  invoice,
  invoiceLabel,
  usedPercent,
  usedLabel,
  details = [],
  colors,
  compact = false,
  footer,
  className,
}: CreditCardProps) {
  const pct = Math.min(100, Math.max(0, usedPercent));
  const high = pct >= 80;
  const style = { "--c1": colors.primary, "--c2": colors.secondary } as CSSProperties;

  return (
    <article
      style={style}
      className={cn(
        "relative grid overflow-hidden rounded-[16px] border border-creme/12 border-b-[6px] border-b-(--c1) bg-[#101712] px-2 pt-2 text-creme",
        className,
      )}
    >
      <div
        className={cn(
          "relative grid rounded-[12px] bg-linear-120 from-(--c1) to-(--c2) px-4 pt-3.5 text-white",
          "after:absolute after:bottom-0 after:left-0 after:w-[56%] after:rounded-tr-[26px] after:bg-[#101712] after:content-['']",
          compact ? "min-h-28 after:h-[54px]" : "min-h-[132px] after:h-[62px]",
        )}
      >
        <Icon name="credit-card" className="size-[22px] opacity-95" />
        <p
          className={cn(
            "absolute top-3 right-4 text-right font-display leading-[1.1] font-bold tracking-[-0.03em] tabular-nums",
            compact ? "text-2xl" : "text-[1.85rem]",
          )}
        >
          <span className="sr-only">{invoiceLabel}: </span>
          {invoice}
        </p>
        <div className="absolute bottom-1.5 left-3 z-1 grid leading-tight">
          <b className="font-display text-[1.12rem] font-bold text-white">{name}</b>
          {caption ? <span className="text-[0.82rem] text-creme/70">{caption}</span> : null}
        </div>
      </div>

      <div className={cn("grid gap-[9px] px-2.5", compact ? "py-3" : "py-3.5")}>
        <div
          role="meter"
          aria-label={usedLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          className="h-1.5 overflow-hidden rounded-full bg-creme/16"
        >
          <i
            className={cn("block h-full min-w-[3px] rounded-full", high ? "bg-coral" : "bg-(--c2)")}
            style={{ width: `${pct}%` }}
          />
        </div>
        {details.map((detail, index) => (
          <p key={index} className="flex flex-wrap justify-between gap-2 text-[0.85rem] text-creme/70">
            <span>{detail.label}</span>
            <b className="font-display font-semibold text-white tabular-nums">{detail.value}</b>
          </p>
        ))}
        {footer}
      </div>
    </article>
  );
}
