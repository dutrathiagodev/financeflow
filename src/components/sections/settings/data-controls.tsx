"use client";

import { useState } from "react";
import { useAccount } from "@/application/hooks/use-account";
import { useFavorites } from "@/application/hooks/use-favorites";
import { useProfile } from "@/application/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusMessage, type Feedback } from "@/components/ui/status-message";
import { settingsText } from "@/content/settings";
import { downloadJson } from "@/lib/download";

export function DataControls() {
  const { account, reset } = useAccount();
  const { ids, clear } = useFavorites();
  const { profile } = useProfile();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const text = settingsText.data;

  const resetAccount = () => {
    if (!window.confirm(text.resetConfirm)) return;
    reset();
    setFeedback({ ok: true, text: text.accountReset });
  };

  const clearFavorites = () => {
    clear();
    setFeedback({ ok: true, text: text.favoritesCleared });
  };

  return (
    <Card className="flex flex-col gap-4">
      <h2 className="text-xl font-medium">{text.title}</h2>
      <div className="flex flex-wrap gap-3">
        <Button variant="ghost" onClick={() => downloadJson(text.exportFileName, { profile, favorites: ids, account })}>
          {text.export}
        </Button>
        <Button variant="ghost" onClick={clearFavorites}>
          {text.clearFavorites}
        </Button>
        <Button variant="danger" onClick={resetAccount}>
          {text.resetAccount}
        </Button>
      </div>
      <StatusMessage feedback={feedback} />
      <p className="text-sm text-ink-faint">{text.about}</p>
    </Card>
  );
}
