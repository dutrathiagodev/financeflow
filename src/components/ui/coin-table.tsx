import { ChangePill } from "@/components/ui/change-pill";
import { CoinBadge } from "@/components/ui/coin-badge";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { Icon } from "@/components/ui/icon";
import { marketOverview } from "@/content/market";
import { formatUsd } from "@/lib/format";
import type { MarketCoin } from "@/types/market";

export type SortKey = "rank" | "price";

type CoinTableProps = {
  coins: MarketCoin[];
  emptyText?: string;
  onSort?: (key: SortKey) => void;
};

const headCell = "px-4 py-4 text-left text-sm font-normal text-ink-muted";

function SortHead({ label, sortKey, onSort }: { label: string; sortKey: SortKey; onSort?: (key: SortKey) => void }) {
  if (!onSort) return <>{label}</>;
  return (
    <button type="button" onClick={() => onSort(sortKey)} className="inline-flex items-center gap-1">
      {label}
      <Icon name="sort" className="size-4" />
    </button>
  );
}

export function CoinTable({ coins, emptyText = marketOverview.empty, onSort }: CoinTableProps) {
  const { columns } = marketOverview;

  return (
    <div className="overflow-x-auto rounded-3xl border border-line">
      <table className="w-full min-w-xl">
        <thead className="border-b border-line">
          <tr>
            <th scope="col" className={headCell}><SortHead label={columns.rank} sortKey="rank" onSort={onSort} /></th>
            <th scope="col" className={headCell}>{columns.coin}</th>
            <th scope="col" className={headCell}><SortHead label={columns.price} sortKey="price" onSort={onSort} /></th>
            <th scope="col" className={headCell}>{columns.change7d}</th>
            <th scope="col" className={headCell}>{columns.change24h}</th>
            <th scope="col" className={headCell}><span className="sr-only">{columns.favorite}</span></th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} className="border-b border-line last:border-b-0">
              <td className="px-4 py-5 text-sm text-ink-muted">#{coin.rank}</td>
              <td className="px-4 py-5">
                <span className="flex items-center gap-3 text-lg">
                  <CoinBadge image={coin.image} name={coin.name} />
                  {coin.name}
                  <span className="text-sm text-ink-muted">{coin.symbol}</span>
                </span>
              </td>
              <td className="px-4 py-5">{formatUsd(coin.price)}</td>
              <td className="px-4 py-5"><ChangePill value={coin.change7d} size="sm" /></td>
              <td className="px-4 py-5"><ChangePill value={coin.change24h} size="sm" /></td>
              <td className="px-4 py-5"><FavoriteButton id={coin.id} name={coin.name} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {coins.length === 0 && <p className="p-6 text-ink-muted">{emptyText}</p>}
    </div>
  );
}
