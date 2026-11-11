"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { useAccount } from "@/application/hooks/use-account";
import { useBackup } from "@/application/hooks/use-backup";
import { useFavorites } from "@/application/hooks/use-favorites";
import { useSettings } from "@/application/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { SettingsCard } from "@/components/ui/settings-card";
import { StatusMessage, type Feedback } from "@/components/ui/status-message";
import { settingsText } from "@/content/settings";
import { downloadJson, readJsonFile } from "@/lib/download";

export function DataControls() {
  const { reset } = useAccount();
  const { clear } = useFavorites();
  const { settings } = useSettings();
  const { snapshot, restore } = useBackup();
  const fileInput = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const text = settingsText.data;

  const resetAccount = () => {
    if (!window.confirm(text.resetConfirm)) return;
    reset(settings.initialCash);
    setFeedback({ ok: true, text: text.accountReset });
  };

  const clearFavorites = () => {
    clear();
    setFeedback({ ok: true, text: text.favoritesCleared });
  };

  const importBackup = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const result = restore(await readJsonFile(file));
    setFeedback({ ok: result.ok, text: result.ok ? text.imported : text.importInvalid });
  };

  return (
    <SettingsCard icon="database" title={text.title} description={text.description}>
      <div className="flex flex-wrap gap-3">
        <Button variant="ghost" onClick={() => downloadJson(text.exportFileName, snapshot())}>
          {text.export}
        </Button>
        <Button variant="ghost" onClick={() => fileInput.current?.click()}>
          {text.import}
        </Button>
        <input ref={fileInput} type="file" accept="application/json,.json" onChange={importBackup} className="hidden" />
        <Button variant="ghost" onClick={clearFavorites}>
          {text.clearFavorites}
        </Button>
        <Button variant="danger" onClick={resetAccount}>
          {text.resetAccount}
        </Button>
      </div>
      <StatusMessage feedback={feedback} />
      <p className="text-sm text-ink-faint">{text.about}</p>
    </SettingsCard>
  );
}
