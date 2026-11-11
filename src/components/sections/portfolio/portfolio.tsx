import { PageHeading } from "@/components/ui/page-heading";
import { portfolioText } from "@/content/trading";
import { getMarkets } from "@/lib/coingecko";
import { PortfolioPanel } from "./portfolio-panel";

export async function Portfolio() {
  const coins = await getMarkets();

  return (
    <section className="flex flex-col gap-8 px-6 py-10 lg:px-10">
      <PageHeading title={portfolioText.title} description={portfolioText.description} />
      <PortfolioPanel coins={coins} />
    </section>
  );
}
