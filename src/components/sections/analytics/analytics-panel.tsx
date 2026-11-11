"use client";

import { useState } from "react";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { SelectField } from "@/components/ui/select-field";
import { analyticsText, ranges } from "@/content/analytics";
import type { MarketCoin } from "@/domain/market/types";
import { HistoryChart } from "./history-chart";

export function AnalyticsPanel({ coins }: { coins: MarketCoin[] }) {
  const [coinId, setCoinId] = useState(coins[0].id);
  const [rangeId, setRangeId] = useState("7");
  const days = ranges.find((range) => range.id === rangeId)?.days ?? 7;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SelectField
          label={analyticsText.coin}
          value={coinId}
          onChange={(event) => setCoinId(event.target.value)}
          options={coins.map((coin) => ({ value: coin.id, label: `${coin.name} (${coin.symbol})` }))}
        />
        <SegmentedTabs options={ranges} value={rangeId} onChange={setRangeId} label={analyticsText.rangeLabel} />
      </div>
      <HistoryChart assetId={coinId} days={days} />
    </div>
  );
}
