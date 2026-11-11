import { PageHeading } from "@/components/ui/page-heading";
import { analyticsText } from "@/content/analytics";
import { getMarkets } from "@/lib/coingecko";
import { AnalyticsPanel } from "./analytics-panel";

export async function Analytics() {
  const coins = await getMarkets();

  return (
    <section className="flex flex-col gap-8 px-6 py-10 lg:px-10">
      <PageHeading title={analyticsText.title} description={analyticsText.description} />
      {coins.length === 0 ? <p className="text-ink-muted">{analyticsText.unavailable}</p> : <AnalyticsPanel coins={coins} />}
    </section>
  );
}
