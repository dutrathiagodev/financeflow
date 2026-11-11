import { Suspense } from "react";
import { MarketData } from "@/components/data/market-data";
import { PageSection } from "@/components/ui/page-section";
import { trendsText } from "@/content/trends";
import { TrendsExplorer } from "./trends-explorer";

export function Trends() {
  return (
    <PageSection title={trendsText.title} description={trendsText.description}>
      <MarketData>
        {(coins) => (
          <Suspense>
            <TrendsExplorer coins={coins} />
          </Suspense>
        )}
      </MarketData>
    </PageSection>
  );
}
