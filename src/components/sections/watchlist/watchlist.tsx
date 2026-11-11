import { MarketData } from "@/components/data/market-data";
import { PageSection } from "@/components/ui/page-section";
import { watchlistText } from "@/content/watchlist";
import { WatchlistTable } from "./watchlist-table";

export function Watchlist() {
  return (
    <PageSection title={watchlistText.title} description={watchlistText.description}>
      <MarketData>{(coins) => <WatchlistTable coins={coins} />}</MarketData>
    </PageSection>
  );
}
