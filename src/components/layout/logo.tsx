import Image from "next/image";
import { marca } from "@/content/brand";
import { cn } from "@/lib/utils";

/**
 * Versoes do PRD (secao 8):
 * - escuro: logo claro sobre fundo escuro (principal)
 * - claro: logo escuro sobre fundo claro verde
 * - neutro: preto e verde, para fundos neutros
 * - auto: segue o tema (claro no escuro, escuro no claro)
 */
export type LogoVariant = "escuro" | "claro" | "neutro" | "auto";

/** So ha tamanhos a partir de 28px: o PRD proibe o logo completo abaixo de 24px de altura. */
export type LogoSize = "sm" | "md" | "lg";

type LogoProps = {
  variante?: LogoVariant;
  tamanho?: LogoSize;
  /** Mostra so o simbolo (use quando o espaco for pequeno). */
  somenteSimbolo?: boolean;
  /** Mostra a linha "CONTROLE FINANCEIRO" abaixo do nome. */
  comSlogan?: boolean;
  /** Empilha simbolo e nome (logo vertical). */
  vertical?: boolean;
  className?: string;
};

const simbolos = {
  escuro: "/images/simbolo-fundo-escuro.svg",
  claro: "/images/simbolo-fundo-claro.svg",
  neutro: "/images/simbolo-neutro.svg",
} as const;

const tamanhos: Record<LogoSize, { px: number; nome: string; slogan: string }> = {
  sm: { px: 28, nome: "text-[1.1rem]", slogan: "text-[0.45rem]" },
  md: { px: 34, nome: "text-[1.3rem]", slogan: "text-[0.5rem]" },
  lg: { px: 56, nome: "text-[2rem]", slogan: "text-[0.7rem]" },
};

// Classes completas por versao para o Tailwind gerar cada uma.
const cores = {
  escuro: { nome: "text-creme", flow: "text-lima", slogan: "text-menta" },
  claro: { nome: "text-marca", flow: "text-flow-claro", slogan: "text-flow-claro" },
  neutro: { nome: "text-logo-preto", flow: "text-flow-neutro", slogan: "text-logo-cinza" },
} as const;

function Simbolo({ src, px, className }: { src: string; px: number; className?: string }) {
  return <Image src={src} alt="" width={px} height={px} className={className} />;
}

/** Logo da marca. O texto fica em HTML (fonte da marca, selecionavel); o simbolo usa next/image. */
export function Logo({
  variante = "escuro",
  tamanho = "md",
  somenteSimbolo = false,
  comSlogan = false,
  vertical = false,
  className,
}: LogoProps) {
  const t = tamanhos[tamanho];
  const versoes = variante === "auto" ? (["claro", "escuro"] as const) : ([variante] as const);

  return (
    <span
      role="img"
      aria-label={marca.nome}
      className={cn(
        "inline-flex items-center",
        vertical ? "flex-col gap-2 text-center" : "gap-2.5",
        className,
      )}
    >
      {versoes.map((v) => {
        // No modo auto, cada versao so aparece no seu tema (data-tema no <html>).
        const visibilidade =
          variante !== "auto" ? "" : v === "claro" ? "contents dark:hidden" : "hidden dark:contents";
        return (
          <span key={v} aria-hidden="true" className={cn("items-center", visibilidade || "contents")}>
            <span
              className={cn(
                "inline-flex items-center",
                vertical ? "flex-col gap-2 text-center" : "gap-2.5",
              )}
            >
              <Simbolo src={simbolos[v]} px={t.px} />
              {somenteSimbolo ? null : (
                <span className="grid">
                  <b
                    className={cn(
                      "block font-display font-bold leading-none tracking-[-0.025em]",
                      t.nome,
                      cores[v].nome,
                    )}
                  >
                    {marca.primeiraParte}
                    <i className={cn("not-italic", cores[v].flow)}>{marca.segundaParte}</i>
                  </b>
                  {comSlogan ? (
                    <small
                      className={cn(
                        "mt-[5px] block font-semibold tracking-[0.3em]",
                        t.slogan,
                        cores[v].slogan,
                      )}
                    >
                      {marca.slogan}
                    </small>
                  ) : null}
                </span>
              )}
            </span>
          </span>
        );
      })}
    </span>
  );
}
