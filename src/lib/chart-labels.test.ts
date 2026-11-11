import { describe, expect, it } from "vitest";
import { hoursAgoLabel } from "./chart-labels";

describe("hoursAgoLabel", () => {
  it("formata agora, horas e dias", () => {
    expect(hoursAgoLabel(0)).toBe("Agora");
    expect(hoursAgoLabel(5)).toBe("há 5 h");
    expect(hoursAgoLabel(51)).toBe("há 2 d 3 h");
  });
});
