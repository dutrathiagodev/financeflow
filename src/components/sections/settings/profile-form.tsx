"use client";

import { useState, type FormEvent } from "react";
import { useProfile } from "@/application/hooks/use-profile";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SettingsCard } from "@/components/ui/settings-card";
import { StatusMessage, type Feedback } from "@/components/ui/status-message";
import { TextField } from "@/components/ui/text-field";
import { settingsText } from "@/content/settings";
import { MAX_NAME_LENGTH } from "@/domain/preferences/profile";

export function ProfileForm() {
  const { profile, rename } = useProfile();
  // null = ainda não editado; mostra o nome salvo.
  const [draft, setDraft] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const text = settingsText.profile;
  const name = draft ?? profile.name;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = rename(name);
    if (result.ok) setDraft(null);
    setFeedback({ ok: result.ok, text: result.ok ? text.saved : text.empty });
  };

  return (
    <SettingsCard icon="user" title={text.title} description={text.description}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Avatar name={name} />
          <div className="flex-1">
            <TextField
              label={text.nameLabel}
              value={name}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={MAX_NAME_LENGTH}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit">{text.save}</Button>
          <StatusMessage feedback={feedback} />
        </div>
      </form>
    </SettingsCard>
  );
}
