import { PageHeading } from "@/components/ui/page-heading";
import { supportText } from "@/content/support";
import { SupportPanel } from "./support-panel";

export function Support() {
  return (
    <section className="flex flex-col gap-8 px-6 py-10 lg:px-10">
      <PageHeading title={supportText.title} description={supportText.description} />
      <SupportPanel />
    </section>
  );
}
