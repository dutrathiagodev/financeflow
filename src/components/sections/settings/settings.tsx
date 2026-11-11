import { MarketData } from "@/components/data/market-data";
import { PageSection } from "@/components/ui/page-section";
import { settingsText } from "@/content/settings";
import { AccountSummary } from "./account-summary";
import { AlertsManager } from "./alerts-manager";
import { DataControls } from "./data-controls";
import { PreferencesForm } from "./preferences-form";
import { ProfileForm } from "./profile-form";

export function Settings() {
  return (
    <PageSection title={settingsText.title} description={settingsText.description}>
      <AccountSummary />
      <div className="grid items-start gap-6 xl:grid-cols-2">
        <div className="flex flex-col gap-6">
          <ProfileForm />
          <PreferencesForm />
          <DataControls />
        </div>
        <MarketData>{(coins) => <AlertsManager coins={coins} />}</MarketData>
      </div>
    </PageSection>
  );
}
