import { cn } from "@/lib/utils";
import { layoutText } from "@/content/navigation";

type BrandProps = {
  /** "sidebar": sobre o menu escuro, com subtítulo. "header": compacta, no topo do celular. */
  variant: "sidebar" | "header";
  className?: string;
};

/** Símbolo (barras com seta) e nome FinanceFlow. */
export function Brand({ variant, className }: BrandProps) {
  const onDark = variant === "sidebar";
  return (
    <div className={cn("flex items-center", onDark ? "gap-2.5" : "gap-2", className)}>
      <svg
        viewBox="0 0 80 80"
        aria-hidden="true"
        focusable="false"
        className={cn("flex-none", onDark ? "size-[34px]" : "size-7")}
      >
        <g className={onDark ? "fill-creme" : "fill-tinta"}>
          <path d="M4 38a14 14 0 0 1 14-14h4v46a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z" />
          <path d="M28 18h18v52a6 6 0 0 1-6 6h-6a6 6 0 0 1-6-6z" />
          <path d="M52 6h18v46a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8z" />
        </g>
        <path
          className={onDark ? "fill-lima" : "fill-barra"}
          d="M4 66C30 60 52 42 62 20l-5 1 14-10 -2 17-3-5c-10 22-30 37-58 43z"
        />
      </svg>
      <div>
        <b
          className={cn(
            "block font-display leading-none font-bold tracking-[-0.025em]",
            onDark ? "text-[1.3rem]" : "text-[1.1rem]",
          )}
        >
          {layoutText.brandFirst}
          <span className={onDark ? "text-lima" : "text-barra"}>{layoutText.brandSecond}</span>
        </b>
        {onDark ? (
          <small className="mt-[5px] block text-[0.5rem] font-semibold tracking-[0.3em] text-menta">
            {layoutText.brandTagline}
          </small>
        ) : null}
      </div>
    </div>
  );
}
