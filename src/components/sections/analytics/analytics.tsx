import { MarketData } from "@/components/data/market-data";
import { PageSection } from "@/components/ui/page-section";
import { analyticsText } from "@/content/analytics";
import { AnalyticsPanel } from "./analytics-panel";

export function Analytics() {
  return (
    <PageSection title={analyticsText.title} description={analyticsText.description}>
      <MarketData>{(coins) => <AnalyticsPanel coins={coins} />}</MarketData>
    </PageSection>
  );
}
