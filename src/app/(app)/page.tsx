import { AlertsBanner } from "@/components/sections/alerts-banner/alerts-banner";
import { LivePrices } from "@/components/sections/live-prices/live-prices";
import { MarketOverview } from "@/components/sections/market-overview/market-overview";
import { Ticker } from "@/components/sections/ticker/ticker";

export default function Home() {
  return (
    <>
      <Ticker />
      <AlertsBanner />
      <LivePrices />
      <MarketOverview />
    </>
  );
}
