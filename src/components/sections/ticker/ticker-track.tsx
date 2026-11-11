"use client";

import { useSettings } from "@/application/hooks/use-settings";
import { CoinBadge } from "@/components/ui/coin-badge";
import { priceCardText } from "@/content/market";
import type { MarketCoin } from "@/domain/market/types";
import { formatUsd } from "@/lib/format";
import { cn } from "@/lib/utils";

export function TickerTrack({ coins }: { coins: MarketCoin[] }) {
  const { settings } = useSettings();
  // Com a animação, a lista é duplicada para rolar sem emenda; a cópia fica oculta para leitores de tela.
  const items = settings.tickerAnimated ? [...coins, ...coins] : coins;

  return (
    <ul
      className={cn(
        "flex items-center gap-10 whitespace-nowrap text-lg",
        settings.tickerAnimated ? "w-max animate-marquee motion-reduce:animate-none" : "overflow-x-auto",
      )}
    >
      {items.map((coin, index) => (
        <li key={`${coin.id}-${index}`} aria-hidden={index >= coins.length} className="flex items-center gap-4">
          <CoinBadge image={coin.image} name={coin.name} className="size-6" />
          <span>{priceCardText.pair(coin.symbol)}</span>
          <span className="text-ink-muted">{formatUsd(coin.price)}</span>
          <span className="h-5 w-px bg-line-strong" />
        </li>
      ))}
    </ul>
  );
}
