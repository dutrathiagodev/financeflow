import { MarketData } from "@/components/data/market-data";
import { AlertsBannerContent } from "./alerts-banner-content";

export function AlertsBanner() {
  return (
    <MarketData fallback={null} loading={null}>
      {(coins) => <AlertsBannerContent coins={coins} />}
    </MarketData>
  );
}
