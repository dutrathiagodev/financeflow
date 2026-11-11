import { err, ok, type Result } from "@/domain/result";

export type Ticket = {
  id: string;
  subject: string;
  message: string;
  time: number;
};

export function createTicket(
  input: { subject: string; message: string },
  meta: { id: string; time: number },
): Result<Ticket, "missing-fields"> {
  const subject = input.subject.trim();
  const message = input.message.trim();
  if (!subject || !message) return err("missing-fields");
  return ok({ ...meta, subject, message });
}

export function parseTickets(raw: unknown): Ticket[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (typeof item !== "object" || item === null) return [];
    const { id, subject, message, time } = item as Record<string, unknown>;
    const valid =
      typeof id === "string" && typeof subject === "string" && typeof message === "string" &&
      typeof time === "number" && Number.isFinite(time);
    return valid ? [{ id, subject, message, time }] : [];
  });
}
