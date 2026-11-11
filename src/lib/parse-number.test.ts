import { describe, expect, it } from "vitest";
import { parseDecimalInput } from "./parse-number";

describe("parseDecimalInput", () => {
  it("aceita ponto e vírgula como separador", () => {
    expect(parseDecimalInput("1.5")).toBe(1.5);
    expect(parseDecimalInput(" 2,25 ")).toBe(2.25);
  });
  it("retorna 0 para vazio ou texto inválido", () => {
    for (const input of ["", "abc", "1,2,3", "Infinity"]) expect(parseDecimalInput(input)).toBe(0);
  });
});
