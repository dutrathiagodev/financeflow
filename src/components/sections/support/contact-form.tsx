"use client";

import { useState, type FormEvent } from "react";
import { useSupportTickets } from "@/application/hooks/use-support-tickets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusMessage, type Feedback } from "@/components/ui/status-message";
import { TextField } from "@/components/ui/text-field";
import { supportText } from "@/content/support";

export function ContactForm() {
  const { submit } = useSupportTickets();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const text = supportText.form;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = submit({ subject, message });
    if (result.ok) {
      setSubject("");
      setMessage("");
    }
    setFeedback({ ok: result.ok, text: result.ok ? text.sent : text.missingFields });
  };

  return (
    <Card>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">{text.title}</h2>
        <TextField label={text.subject} value={subject} onChange={(event) => setSubject(event.target.value)} maxLength={80} />
        <label className="flex flex-col gap-2 text-sm text-ink-muted">
          {text.message}
          <textarea
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="rounded-control border border-line bg-panel-raised px-4 py-3 text-base text-ink focus:border-accent focus:outline-none"
          />
        </label>
        <Button type="submit" className="self-start">
          {text.send}
        </Button>
        <StatusMessage feedback={feedback} />
      </form>
    </Card>
  );
}
