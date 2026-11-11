"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ChangePill } from "@/components/ui/change-pill";
import { CoinBadge } from "@/components/ui/coin-badge";
import { portfolioText } from "@/content/trading";
import { formatPercent, formatQuantity, formatUsd } from "@/lib/format";
import { useAccount } from "@/lib/use-account";
import type { MarketCoin } from "@/types/market";

const headCell = "px-4 py-4 text-left text-sm font-normal text-ink-muted";
const barColors = ["bg-accent", "bg-brand-leaf", "bg-brand-mid", "bg-brand-mint", "bg-btc", "bg-eth"];

export function PortfolioPanel({ coins }: { coins: MarketCoin[] }) {
  const { account } = useAccount();
  const prices = new Map(coins.map((c) => [c.id, c.price]));

  const rows = account.holdings.map((h) => {
    const price = prices.get(h.coinId) ?? h.cost / h.quantity;
    const value = h.quantity * price;
    return { ...h, price, value, avg: h.cost / h.quantity, pnl: value - h.cost, pnlPct: h.cost ? ((value - h.cost) / h.cost) * 100 : 0 };
  });
  const total = rows.reduce((s, r) => s + r.value, 0);
  const pnl = rows.reduce((s, r) => s + r.pnl, 0);
  const cost = rows.reduce((s, r) => s + r.cost, 0);

  if (rows.length === 0) {
    return (
      <Card className="flex flex-col items-start gap-4">
        <p className="text-ink-muted">{portfolioText.empty}</p>
        <Link href="/trade" className="rounded-control bg-accent px-5 py-3 font-medium text-brand-dark transition-colors hover:bg-brand-mint">
          {portfolioText.goTrade}
        </Link>
      </Card>
    );
  }

  const { columns } = portfolioText;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <p className="text-ink-muted">{portfolioText.total}</p>
          <p className="mt-2 text-4xl font-medium tracking-tight">{formatUsd(total)}</p>
        </Card>
        <Card>
          <p className="text-ink-muted">{portfolioText.pnl}</p>
          <p className="mt-2 flex items-center gap-3 text-4xl font-medium tracking-tight">
            {formatUsd(pnl)}
            <ChangePill value={cost ? (pnl / cost) * 100 : 0} />
          </p>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-medium">{portfolioText.allocation}</h2>
        <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-panel-raised">
          {rows.map((r, i) => (
            <div
              key={r.coinId}
              title={`${r.name}: ${formatPercent((r.value / total) * 100).replace("+ ", "")}`}
              className={barColors[i % barColors.length]}
              style={{ width: `${(r.value / total) * 100}%` }}
            />
          ))}
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
          {rows.map((r, i) => (
            <li key={r.coinId} className="flex items-center gap-2">
              <span className={`size-2.5 rounded-full ${barColors[i % barColors.length]}`} />
              {r.symbol} {((r.value / total) * 100).toFixed(1).replace(".", ",")}%
            </li>
          ))}
        </ul>
      </Card>

      <div className="overflow-x-auto rounded-3xl border border-line">
        <table className="w-full min-w-2xl">
          <thead className="border-b border-line">
            <tr>
              {Object.values(columns).map((label) => (
                <th key={label} scope="col" className={headCell}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.coinId} className="border-b border-line last:border-b-0 hover:bg-white/[0.02]">
                <td className="px-4 py-4">
                  <span className="flex items-center gap-3">
                    <CoinBadge image={r.image} name={r.name} />
                    {r.name} <span className="text-sm text-ink-muted">{r.symbol}</span>
                  </span>
                </td>
                <td className="px-4 py-4">{formatQuantity(r.quantity)}</td>
                <td className="px-4 py-4">{formatUsd(r.avg)}</td>
                <td className="px-4 py-4">{formatUsd(r.price)}</td>
                <td className="px-4 py-4">{formatUsd(r.value)}</td>
                <td className="px-4 py-4"><ChangePill value={r.pnlPct} size="sm" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
