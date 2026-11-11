import { MarketData } from "@/components/data/market-data";
import { PageSection } from "@/components/ui/page-section";
import { walletText } from "@/content/trading";
import { WalletPanel } from "./wallet-panel";

export function Wallet() {
  return (
    <PageSection title={walletText.title} description={walletText.description}>
      <MarketData>{(coins) => <WalletPanel coins={coins} />}</MarketData>
    </PageSection>
  );
}
