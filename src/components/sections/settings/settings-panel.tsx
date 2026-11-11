"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextField } from "@/components/ui/text-field";
import { settingsText } from "@/content/settings";
import { useAccount } from "@/lib/use-account";
import { useFavorites } from "@/lib/use-favorites";
import { useLocalStore } from "@/lib/use-local-store";

export function SettingsPanel() {
  const [profile, setProfile] = useLocalStore("ff:profile", { name: "Investidor" });
  const [name, setName] = useState<string | null>(null);
  const { account, reset } = useAccount();
  const { ids } = useFavorites();
  const [, setFavorites] = useLocalStore<string[]>("ff:favorites", []);
  const [message, setMessage] = useState("");

  const saveName = (event: FormEvent) => {
    event.preventDefault();
    const next = (name ?? profile.name).trim();
    if (!next) return;
    setProfile({ name: next });
    setName(null);
    setMessage(settingsText.saved);
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ profile, favorites: ids, account }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "financeflow-dados.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid max-w-3xl gap-6">
      <Card>
        <form onSubmit={saveName} className="flex flex-col gap-4">
          <h2 className="text-xl font-medium">{settingsText.profileTitle}</h2>
          <TextField label={settingsText.nameLabel} value={name ?? profile.name} onChange={(e) => setName(e.target.value)} maxLength={30} />
          <Button type="submit" className="self-start">{settingsText.save}</Button>
        </form>
      </Card>

      <Card className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">{settingsText.dataTitle}</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="ghost" onClick={exportData}>{settingsText.export}</Button>
          <Button
            variant="ghost"
            onClick={() => {
              setFavorites([]);
              setMessage(settingsText.favoritesCleared);
            }}
          >
            {settingsText.clearFavorites}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (window.confirm(settingsText.resetConfirm)) {
                reset();
                setMessage(settingsText.accountReset);
              }
            }}
          >
            {settingsText.resetAccount}
          </Button>
        </div>
        {message && <p role="status" className="text-up">{message}</p>}
        <p className="text-sm text-ink-faint">{settingsText.about}</p>
      </Card>
    </div>
  );
}
