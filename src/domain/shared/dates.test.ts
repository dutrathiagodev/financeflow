import { describe, expect, it } from "vitest";
import { ehDataIso, hoje, mesDe } from "./dates";

describe("hoje", () => {
  it("formata no fuso local com zeros a esquerda", () => {
    expect(hoje(new Date(2026, 0, 5, 23, 59))).toBe("2026-01-05");
    expect(hoje(new Date(2026, 11, 31))).toBe("2026-12-31");
  });
});

describe("ehDataIso", () => {
  it("aceita datas reais", () => {
    expect(ehDataIso("2026-02-28")).toBe(true);
    expect(ehDataIso("2028-02-29")).toBe(true);
  });

  it.each(["2026-02-30", "2026-13-01", "2026-00-10", "26-01-01", "2026/01/01", "", "hoje"])(
    "rejeita %j",
    (texto) => {
      expect(ehDataIso(texto)).toBe(false);
    },
  );
});

describe("mesDe", () => {
  it("devolve ano e mes", () => {
    expect(mesDe("2026-11-24")).toBe("2026-11");
  });
});
