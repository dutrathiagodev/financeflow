"use client";

import { usePersistedState } from "./use-persisted-state";
import { createTicket, parseTickets, type Ticket } from "@/domain/support/ticket";

const EMPTY: Ticket[] = [];

export function useSupportTickets() {
  const { value: tickets, transact } = usePersistedState("ff:tickets", parseTickets, EMPTY);

  return {
    tickets,
    submit: (input: { subject: string; message: string }) =>
      transact((current) => {
        const created = createTicket(input, { id: crypto.randomUUID(), time: Date.now() });
        return created.ok ? { ok: true, value: [created.value, ...current] } : created;
      }),
  };
}
