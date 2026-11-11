import { ChangePill } from "@/components/ui/change-pill";
import { CoinBadge } from "@/components/ui/coin-badge";
import { Icon } from "@/components/ui/icon";
import { marketFilters, marketOverview, marketRows } from "@/content/market";
import { cn } from "@/lib/utils";

const headCell = "px-4 py-4 text-left text-sm font-normal text-ink-muted";

export function MarketOverview() {
  const { columns } = marketOverview;

  return (
    <section
      aria-labelledby="market-overview-title"
      className="mx-6 border-t border-line py-10 lg:mx-10"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm text-ink-muted">
            <Icon name="clock" className="size-4" />
            {marketOverview.eyebrow}
          </p>
          <h2 id="market-overview-title" className="mt-2 text-3xl font-medium tracking-tight">
            {marketOverview.title}
          </h2>
        </div>
        <ul className="flex gap-2">
          {marketFilters.map((filter, index) => (
            <li key={filter}>
              <button
                type="button"
                aria-pressed={index === 0}
                className={cn(
                  "rounded-control px-5 py-3 text-lg",
                  index === 0 ? "bg-accent-soft text-ink" : "text-ink-muted",
                )}
              >
                {filter}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-line">
        <table className="w-full min-w-xl">
          <thead className="border-b border-line">
            <tr>
              <th scope="col" className={headCell}>{columns.rank}</th>
              <th scope="col" className={headCell}>
                <span className="inline-flex items-center gap-1">
                  {columns.coin}
                  <Icon name="sort" className="size-4" />
                </span>
              </th>
              <th scope="col" className={headCell}>
                <span className="inline-flex items-center gap-1">
                  {columns.price}
                  <Icon name="sort" className="size-4" />
                </span>
              </th>
              <th scope="col" className={headCell}>{columns.change7d}</th>
              <th scope="col" className={headCell}>{columns.change24h}</th>
            </tr>
          </thead>
          <tbody>
            {marketRows.map((row) => (
              <tr key={row.symbol} className="border-b border-line last:border-b-0">
                <td className="px-4 py-5 text-sm text-ink-muted">#{row.rank}</td>
                <td className="px-4 py-5">
                  <span className="flex items-center gap-3 text-lg">
                    <CoinBadge coin={row.coin} />
                    {row.name}
                    <span className="text-sm text-ink-muted">{row.symbol}</span>
                  </span>
                </td>
                <td className="px-4 py-5">{row.price}</td>
                <td className="px-4 py-5"><ChangePill value={row.change7d} size="sm" /></td>
                <td className="px-4 py-5"><ChangePill value={row.change24h} size="sm" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
