import { Suspense } from "react";
import { PageHeading } from "@/components/ui/page-heading";
import { trendsText } from "@/content/trends";
import { getMarkets } from "@/lib/coingecko";
import { TrendsExplorer } from "./trends-explorer";

export async function Trends() {
  const coins = await getMarkets();

  return (
    <section className="flex flex-col gap-8 px-6 py-10 lg:px-10">
      <PageHeading title={trendsText.title} description={trendsText.description} />
      {coins.length === 0 ? (
        <p className="text-ink-muted">{trendsText.unavailable}</p>
      ) : (
        <Suspense>
          <TrendsExplorer coins={coins} />
        </Suspense>
      )}
    </section>
  );
}
