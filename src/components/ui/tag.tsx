import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TagTone = "neutro" | "invest";

type TagProps = HTMLAttributes<HTMLSpanElement> & { tone?: TagTone };

const tones: Record<TagTone, string> = {
  neutro: "border-regua-forte text-tinta",
  invest: "border-invest text-invest",
};

/** Etiqueta com contorno fino (ex.: "1/3", "agendada", "100% do CDI"). Raio de 5px. */
export function Tag({ tone = "neutro", className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block whitespace-nowrap rounded-tag border px-1.5 text-[0.72rem] font-semibold leading-normal",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
