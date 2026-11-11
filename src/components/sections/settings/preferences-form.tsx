"use client";

import { useSettings } from "@/application/hooks/use-settings";
import { useSidebarState } from "@/application/hooks/use-sidebar-state";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { SelectField } from "@/components/ui/select-field";
import { SettingsCard } from "@/components/ui/settings-card";
import { Switch } from "@/components/ui/switch";
import { settingsText } from "@/content/settings";
import { INITIAL_CASH_OPTIONS, TABLE_ROW_OPTIONS } from "@/domain/preferences/settings";
import { formatUsd } from "@/lib/format";

const ROW_OPTIONS = TABLE_ROW_OPTIONS.map((rows) => ({ id: String(rows), label: String(rows) }));
const CASH_OPTIONS = INITIAL_CASH_OPTIONS.map((cash) => ({ value: String(cash), label: formatUsd(cash) }));

export function PreferencesForm() {
  const { settings, update } = useSettings();
  const { collapsed, toggle } = useSidebarState();
  const text = settingsText.preferences;

  return (
    <SettingsCard icon="sliders" title={text.title} description={text.description}>
      <div className="flex flex-col gap-6">
        <Switch
          label={text.sidebarCollapsed}
          description={text.sidebarCollapsedHint}
          checked={collapsed}
          onChange={toggle}
        />
        <Switch
          label={text.tickerAnimated}
          description={text.tickerAnimatedHint}
          checked={settings.tickerAnimated}
          onChange={(checked) => update({ tickerAnimated: checked })}
        />

        <div className="flex flex-col gap-3">
          <p className="text-base">{text.tableRows}</p>
          <SegmentedTabs
            options={ROW_OPTIONS}
            value={String(settings.tableRows)}
            onChange={(value) => update({ tableRows: Number(value) })}
            label={text.tableRowsLabel}
          />
        </div>

        <div className="flex flex-col gap-2">
          <SelectField
            label={text.initialCash}
            value={String(settings.initialCash)}
            onChange={(event) => update({ initialCash: Number(event.target.value) })}
            options={CASH_OPTIONS}
          />
          <p className="text-sm text-ink-muted">{text.initialCashHint}</p>
        </div>
      </div>
    </SettingsCard>
  );
}
