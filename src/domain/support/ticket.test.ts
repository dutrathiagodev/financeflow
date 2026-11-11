import { describe, expect, it } from "vitest";
import { createTicket, parseTickets } from "./ticket";

const meta = { id: "t1", time: 10 };

describe("createTicket", () => {
  it("cria ticket com campos aparados", () => {
    expect(createTicket({ subject: " Oi ", message: " Ajuda " }, meta)).toEqual({
      ok: true,
      value: { id: "t1", time: 10, subject: "Oi", message: "Ajuda" },
    });
  });
  it("exige assunto e mensagem", () => {
    expect(createTicket({ subject: "", message: "x" }, meta)).toEqual({ ok: false, error: "missing-fields" });
    expect(createTicket({ subject: "x", message: "  " }, meta)).toEqual({ ok: false, error: "missing-fields" });
  });
});

describe("parseTickets", () => {
  it("mantém só tickets válidos", () => {
    expect(parseTickets([{ id: "a", subject: "s", message: "m", time: 1 }, { id: 1 }, null, "x"])).toEqual([
      { id: "a", subject: "s", message: "m", time: 1 },
    ]);
    expect(parseTickets({})).toEqual([]);
  });
});
