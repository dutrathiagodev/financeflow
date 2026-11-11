import { PageSection } from "@/components/ui/page-section";
import { settingsText } from "@/content/settings";
import { DataControls } from "./data-controls";
import { ProfileForm } from "./profile-form";

export function Settings() {
  return (
    <PageSection title={settingsText.title} description={settingsText.description}>
      <div className="grid max-w-3xl gap-6">
        <ProfileForm />
        <DataControls />
      </div>
    </PageSection>
  );
}
