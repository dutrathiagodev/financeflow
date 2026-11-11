import { PageHeading } from "@/components/ui/page-heading";
import { settingsText } from "@/content/settings";
import { SettingsPanel } from "./settings-panel";

export function Settings() {
  return (
    <section className="flex flex-col gap-8 px-6 py-10 lg:px-10">
      <PageHeading title={settingsText.title} description={settingsText.description} />
      <SettingsPanel />
    </section>
  );
}
