"use client";

import { useProfile } from "@/application/hooks/use-profile";
import { welcome } from "@/content/navigation";

export function WelcomeCard() {
  const { profile } = useProfile();

  return (
    <div className="border-b border-line py-6">
      <h2 className="text-3xl font-medium leading-tight tracking-tight">
        {welcome.greeting}
        <br />
        {welcome.returning(profile.name)}
      </h2>
      <p className="mt-3 text-sm text-ink-faint">{welcome.note}</p>
    </div>
  );
}
