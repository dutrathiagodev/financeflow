import { PageHeading } from "@/components/ui/page-heading";
import { walletText } from "@/content/trading";
import { getMarkets } from "@/lib/coingecko";
import { WalletPanel } from "./wallet-panel";

export async function Wallet() {
  const coins = await getMarkets();

  return (
    <section className="flex flex-col gap-8 px-6 py-10 lg:px-10">
      <PageHeading title={walletText.title} description={walletText.description} />
      <WalletPanel coins={coins} />
    </section>
  );
}
