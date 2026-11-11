"use client";

import { useSupportTickets } from "@/application/hooks/use-support-tickets";
import { Card } from "@/components/ui/card";
import { supportText } from "@/content/support";

export function TicketList() {
  const { tickets } = useSupportTickets();
  const text = supportText.tickets;

  return (
    <Card>
      <h2 className="text-xl font-medium">{text.title}</h2>
      {tickets.length === 0 ? (
        <p className="mt-3 text-ink-muted">{text.empty}</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="rounded-2xl bg-panel-raised px-4 py-3">
              <p className="flex justify-between gap-3">
                <span>{ticket.subject}</span>
                <span className="text-sm text-ink-faint">
                  {new Date(ticket.time).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                </span>
              </p>
              <p className="mt-1 text-sm text-ink-muted">{ticket.message}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
