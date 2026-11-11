import { CoinBadge } from "@/components/ui/coin-badge";
import { ticker } from "@/content/market";

export function Ticker() {
  const items = [...ticker, ...ticker];

  return (
    <section
      aria-label="Cotações rápidas"
      className="overflow-hidden border-y border-line py-4"
    >
      <ul className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap text-lg motion-reduce:animate-none">
        {items.map((item, index) => (
          <li
            key={`${item.pair}-${index}`}
            aria-hidden={index >= ticker.length}
            className="flex items-center gap-4"
          >
            <CoinBadge coin={item.coin} className="size-6 text-xs" />
            <span>{item.pair}</span>
            <span className="text-ink-muted">{item.price}</span>
            <span className="h-5 w-px bg-line-strong" />
          </li>
        ))}
      </ul>
    </section>
  );
}
