import type { ReactNode } from "react";
import { PageHeading } from "@/components/ui/page-heading";

type PageSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

/** Estrutura padrão das páginas internas: título + conteúdo. */
export function PageSection({ title, description, children }: PageSectionProps) {
  return (
    <section className="flex flex-col gap-8 px-6 py-10 lg:px-10">
      <PageHeading title={title} description={description} />
      {children}
    </section>
  );
}
