import { MarketData } from "@/components/data/market-data";
import { PageSection } from "@/components/ui/page-section";
import { insightsText } from "@/content/insights";
import { InsightsGrid } from "./insights-grid";

export function Insights() {
  return (
    <PageSection title={insightsText.title} description={insightsText.description}>
      <MarketData>{(coins) => <InsightsGrid coins={coins} />}</MarketData>
    </PageSection>
  );
}
