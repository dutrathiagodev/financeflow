import { PageHeading } from "@/components/ui/page-heading";
import { transactionsText } from "@/content/trading";
import { TransactionsTable } from "./transactions-table";

export function Transactions() {
  return (
    <section className="flex flex-col gap-8 px-6 py-10 lg:px-10">
      <PageHeading title={transactionsText.title} description={transactionsText.description} />
      <TransactionsTable />
    </section>
  );
}
