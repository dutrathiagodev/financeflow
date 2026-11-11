import { describe, expect, it } from "vitest";
import { initialsOf } from "./initials";

describe("initialsOf", () => {
  it("usa até duas iniciais", () => {
    expect(initialsOf("ana maria silva")).toBe("AM");
    expect(initialsOf("  bia ")).toBe("B");
  });
  it("nome vazio vira ?", () => {
    expect(initialsOf("   ")).toBe("?");
  });
});
