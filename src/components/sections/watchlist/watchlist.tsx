import { PageHeading } from "@/components/ui/page-heading";
import { watchlistText } from "@/content/watchlist";
import { getMarkets } from "@/lib/coingecko";
import { WatchlistTable } from "./watchlist-table";

export async function Watchlist() {
  const coins = await getMarkets();

  return (
    <section className="flex flex-col gap-8 px-6 py-10 lg:px-10">
      <PageHeading title={watchlistText.title} description={watchlistText.description} />
      {coins.length === 0 ? (
        <p className="text-ink-muted">{watchlistText.unavailable}</p>
      ) : (
        <WatchlistTable coins={coins} />
      )}
    </section>
  );
}
