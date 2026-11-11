import { cn } from "@/lib/utils";
import type { Coin } from "@/types/market";

type CoinBadgeProps = {
  coin: Coin;
  className?: string;
};

export function CoinBadge({ coin, className }: CoinBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold text-white",
        className,
      )}
      style={{ backgroundColor: coin.color }}
    >
      {coin.glyph}
    </span>
  );
}
