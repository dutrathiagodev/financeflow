import { ChangePill } from "@/components/ui/change-pill";
import { CoinLabel } from "@/components/ui/coin-label";
import { DataTable, type Column } from "@/components/ui/data-table";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { Icon } from "@/components/ui/icon";
import { marketOverview } from "@/content/market";
import type { SortKey } from "@/domain/market/coin-queries";
import type { MarketCoin } from "@/domain/market/types";
import { formatUsd } from "@/lib/format";

type CoinTableProps = {
  coins: MarketCoin[];
  emptyText?: string;
  /** Quando informado, os cabeçalhos "Nº" e "Preço" viram botões de ordenação. */
  onSort?: (key: SortKey) => void;
};

function SortableHeader({ label, sortKey, onSort }: { label: string; sortKey: SortKey; onSort?: (key: SortKey) => void }) {
  if (!onSort) return label;
  return (
    <button type="button" onClick={() => onSort(sortKey)} className="inline-flex items-center gap-1">
      {label}
      <Icon name="sort" className="size-4" />
    </button>
  );
}

export function CoinTable({ coins, emptyText = marketOverview.empty, onSort }: CoinTableProps) {
  const { columns: text } = marketOverview;

  const columns: Column<MarketCoin>[] = [
    {
      id: "rank",
      header: <SortableHeader label={text.rank} sortKey="rank" onSort={onSort} />,
      cell: (coin) => <span className="text-sm text-ink-muted">#{coin.rank}</span>,
    },
    { id: "coin", header: text.coin, cell: (coin) => <CoinLabel image={coin.image} name={coin.name} symbol={coin.symbol} /> },
    {
      id: "price",
      header: <SortableHeader label={text.price} sortKey="price" onSort={onSort} />,
      cell: (coin) => formatUsd(coin.price),
    },
    { id: "change7d", header: text.change7d, cell: (coin) => <ChangePill value={coin.change7d} size="sm" /> },
    { id: "change24h", header: text.change24h, cell: (coin) => <ChangePill value={coin.change24h} size="sm" /> },
    {
      id: "favorite",
      header: text.favorite,
      srOnlyHeader: true,
      cell: (coin) => <FavoriteButton id={coin.id} name={coin.name} />,
    },
  ];

  return <DataTable columns={columns} rows={coins} rowKey={(coin) => coin.id} emptyText={emptyText} />;
}
