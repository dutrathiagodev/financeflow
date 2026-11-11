import { PageSection } from "@/components/ui/page-section";
import { transactionsText } from "@/content/trading";
import { TransactionsTable } from "./transactions-table";

export function Transactions() {
  return (
    <PageSection title={transactionsText.title} description={transactionsText.description}>
      <TransactionsTable />
    </PageSection>
  );
}
