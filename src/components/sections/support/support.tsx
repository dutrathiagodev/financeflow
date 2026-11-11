import { PageSection } from "@/components/ui/page-section";
import { supportText } from "@/content/support";
import { ContactForm } from "./contact-form";
import { FaqList } from "./faq-list";
import { TicketList } from "./ticket-list";

export function Support() {
  return (
    <PageSection title={supportText.title} description={supportText.description}>
      <div className="grid gap-6 lg:grid-cols-2">
        <FaqList />
        <div className="flex flex-col gap-6">
          <ContactForm />
          <TicketList />
        </div>
      </div>
    </PageSection>
  );
}
