import { AppShell } from "@/components/layout/app-shell";
import { LivePrices } from "@/components/sections/live-prices/live-prices";
import { MarketOverview } from "@/components/sections/market-overview/market-overview";
import { Ticker } from "@/components/sections/ticker/ticker";

export default function Home() {
  return (
    <AppShell>
      <Ticker />
      <LivePrices />
      <MarketOverview />
    </AppShell>
  );
}
