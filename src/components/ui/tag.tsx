import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagTone = "neutral" | "warning" | "invest";

const tones: Record<TagTone, string> = {
  neutral: "border-regua-forte text-tinta",
  // Ex.: "agendada"
  warning: "border-dourado-borda bg-dourado-suave text-dourado",
  // Ex.: "100% do CDI"
  invest: "border-invest text-invest",
};

type TagProps = {
  children: ReactNode;
  tone?: TagTone;
  className?: string;
};

/** Etiqueta pequena com contorno fino (ex.: "1/3", "agendada", "100% do CDI"). */
export function Tag({ children, tone = "neutral", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block h-fit self-center whitespace-nowrap rounded-tag border px-1.5 text-[0.72rem] leading-normal font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
