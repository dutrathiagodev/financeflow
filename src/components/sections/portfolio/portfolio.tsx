import { MarketData } from "@/components/data/market-data";
import { PageSection } from "@/components/ui/page-section";
import { portfolioText } from "@/content/trading";
import { PortfolioPanel } from "./portfolio-panel";

export function Portfolio() {
  return (
    <PageSection title={portfolioText.title} description={portfolioText.description}>
      <MarketData>{(coins) => <PortfolioPanel coins={coins} />}</MarketData>
    </PageSection>
  );
}
