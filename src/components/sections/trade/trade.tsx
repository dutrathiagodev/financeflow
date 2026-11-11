import { MarketData } from "@/components/data/market-data";
import { PageSection } from "@/components/ui/page-section";
import { tradeText } from "@/content/trading";
import { TradePanel } from "./trade-panel";

export function Trade() {
  return (
    <PageSection title={tradeText.title} description={tradeText.description}>
      <MarketData>{(coins) => <TradePanel coins={coins} />}</MarketData>
    </PageSection>
  );
}
