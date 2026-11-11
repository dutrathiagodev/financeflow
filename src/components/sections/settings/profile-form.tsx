"use client";

import { useState, type FormEvent } from "react";
import { useProfile } from "@/application/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusMessage, type Feedback } from "@/components/ui/status-message";
import { TextField } from "@/components/ui/text-field";
import { settingsText } from "@/content/settings";
import { MAX_NAME_LENGTH } from "@/domain/preferences/profile";

export function ProfileForm() {
  const { profile, rename } = useProfile();
  // null = ainda não editado; mostra o nome salvo.
  const [draft, setDraft] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = rename(draft ?? profile.name);
    if (result.ok) setDraft(null);
    setFeedback({ ok: result.ok, text: result.ok ? settingsText.profile.saved : settingsText.profile.empty });
  };

  return (
    <Card>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">{settingsText.profile.title}</h2>
        <TextField
          label={settingsText.profile.nameLabel}
          value={draft ?? profile.name}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={MAX_NAME_LENGTH}
        />
        <Button type="submit" className="self-start">
          {settingsText.profile.save}
        </Button>
        <StatusMessage feedback={feedback} />
      </form>
    </Card>
  );
}
