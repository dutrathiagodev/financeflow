import { CoinBadge } from "@/components/ui/coin-badge";
import { getMarkets } from "@/lib/coingecko";
import { formatUsd } from "@/lib/format";

export async function Ticker() {
  const coins = (await getMarkets()).slice(0, 10);
  if (coins.length === 0) return null;
  const items = [...coins, ...coins];

  return (
    <section aria-label="Cotações rápidas" className="overflow-hidden border-y border-line py-4">
      <ul className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap text-lg motion-reduce:animate-none">
        {items.map((coin, index) => (
          <li
            key={`${coin.id}-${index}`}
            aria-hidden={index >= coins.length}
            className="flex items-center gap-4"
          >
            <CoinBadge image={coin.image} name={coin.name} className="size-6" />
            <span>{coin.symbol}/USD</span>
            <span className="text-ink-muted">{formatUsd(coin.price)}</span>
            <span className="h-5 w-px bg-line-strong" />
          </li>
        ))}
      </ul>
    </section>
  );
}
