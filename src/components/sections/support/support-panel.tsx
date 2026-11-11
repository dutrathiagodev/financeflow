"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextField } from "@/components/ui/text-field";
import { faq, supportText } from "@/content/support";
import { useLocalStore } from "@/lib/use-local-store";

type Ticket = { id: string; subject: string; message: string; time: number };

export function SupportPanel() {
  const [tickets, setTickets] = useLocalStore<Ticket[]>("ff:tickets", []);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!subject.trim() || !message.trim()) {
      setFeedback({ ok: false, text: supportText.required });
      return;
    }
    setTickets((prev) => [{ id: crypto.randomUUID(), subject: subject.trim(), message: message.trim(), time: Date.now() }, ...prev]);
    setSubject("");
    setMessage("");
    setFeedback({ ok: true, text: supportText.sent });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">{supportText.faqTitle}</h2>
        {faq.map((item) => (
          <details key={item.question} className="group rounded-2xl border border-line bg-panel px-5 py-4 transition-colors open:border-line-strong">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg">
              {item.question}
              <span className="text-ink-muted transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-ink-muted">{item.answer}</p>
          </details>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <Card>
          <form onSubmit={submit} className="flex flex-col gap-4">
            <h2 className="text-xl font-medium">{supportText.formTitle}</h2>
            <TextField label={supportText.subject} value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={80} />
            <label className="flex flex-col gap-2 text-sm text-ink-muted">
              {supportText.message}
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-control border border-line bg-panel-raised px-4 py-3 text-base text-ink focus:border-accent focus:outline-none"
              />
            </label>
            <Button type="submit" className="self-start">{supportText.send}</Button>
            {feedback && <p role="status" className={feedback.ok ? "text-up" : "text-down"}>{feedback.text}</p>}
          </form>
        </Card>

        <Card>
          <h2 className="text-xl font-medium">{supportText.ticketsTitle}</h2>
          {tickets.length === 0 ? (
            <p className="mt-3 text-ink-muted">{supportText.noTickets}</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {tickets.map((t) => (
                <li key={t.id} className="rounded-2xl bg-panel-raised px-4 py-3">
                  <p className="flex justify-between gap-3">
                    <span>{t.subject}</span>
                    <span className="text-sm text-ink-faint">{new Date(t.time).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</span>
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">{t.message}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
