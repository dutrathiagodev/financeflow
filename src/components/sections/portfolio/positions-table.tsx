import { ChangePill } from "@/components/ui/change-pill";
import { CoinLabel } from "@/components/ui/coin-label";
import { DataTable, type Column } from "@/components/ui/data-table";
import { portfolioText } from "@/content/trading";
import type { Position } from "@/domain/account/portfolio";
import { formatQuantity, formatUsd } from "@/lib/format";

const { columns: text } = portfolioText;

const columns: Column<Position>[] = [
  { id: "asset", header: text.asset, cell: (p) => <CoinLabel image={p.image} name={p.name} symbol={p.symbol} /> },
  { id: "quantity", header: text.quantity, cell: (p) => formatQuantity(p.quantity) },
  { id: "avg", header: text.avg, cell: (p) => formatUsd(p.averagePrice) },
  { id: "price", header: text.price, cell: (p) => formatUsd(p.price) },
  { id: "value", header: text.value, cell: (p) => formatUsd(p.value) },
  { id: "pnl", header: text.pnl, cell: (p) => <ChangePill value={p.pnlPercent} size="sm" /> },
];

export function PositionsTable({ positions }: { positions: Position[] }) {
  return (
    <DataTable
      columns={columns}
      rows={positions}
      rowKey={(p) => p.assetId}
      emptyText={portfolioText.empty}
      minWidth="min-w-2xl"
    />
  );
}
