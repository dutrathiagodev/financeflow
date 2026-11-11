import { PageHeading } from "@/components/ui/page-heading";
import { tradeText } from "@/content/trading";
import { getMarkets } from "@/lib/coingecko";
import { TradePanel } from "./trade-panel";

export async function Trade() {
  const coins = await getMarkets();

  return (
    <section className="flex flex-col gap-8 px-6 py-10 lg:px-10">
      <PageHeading title={tradeText.title} description={tradeText.description} />
      {coins.length === 0 ? <p className="text-ink-muted">{tradeText.unavailable}</p> : <TradePanel coins={coins} />}
    </section>
  );
}
