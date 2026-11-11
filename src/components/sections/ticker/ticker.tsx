import { MarketData } from "@/components/data/market-data";
import { CoinBadge } from "@/components/ui/coin-badge";
import { priceCardText } from "@/content/market";
import { formatUsd } from "@/lib/format";

const TICKER_SIZE = 10;

export function Ticker() {
  return (
    <MarketData fallback={null}>
      {(allCoins) => {
        const coins = allCoins.slice(0, TICKER_SIZE);
        // A lista é duplicada para a animação rolar sem emenda; a cópia fica oculta para leitores de tela.
        const items = [...coins, ...coins];

        return (
          <section aria-label="Cotações rápidas" className="overflow-hidden border-y border-line py-4">
            <ul className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap text-lg motion-reduce:animate-none">
              {items.map((coin, index) => (
                <li key={`${coin.id}-${index}`} aria-hidden={index >= coins.length} className="flex items-center gap-4">
                  <CoinBadge image={coin.image} name={coin.name} className="size-6" />
                  <span>{priceCardText.pair(coin.symbol)}</span>
                  <span className="text-ink-muted">{formatUsd(coin.price)}</span>
                  <span className="h-5 w-px bg-line-strong" />
                </li>
              ))}
            </ul>
          </section>
        );
      }}
    </MarketData>
  );
}
