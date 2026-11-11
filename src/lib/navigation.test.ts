import { describe, expect, it } from "vitest";
import { findNavItem, isActivePath } from "./navigation";
import type { NavGroup } from "@/types/navigation";

describe("isActivePath", () => {
  it("raiz só casa com a raiz", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/trade", "/")).toBe(false);
  });
  it("casa a rota e subrotas, mas não prefixos parciais", () => {
    expect(isActivePath("/trade", "/trade")).toBe(true);
    expect(isActivePath("/trade/x", "/trade")).toBe(true);
    expect(isActivePath("/trades", "/trade")).toBe(false);
  });
});

describe("findNavItem", () => {
  const groups: NavGroup[] = [{ title: "g", items: [{ label: "Home", href: "/", icon: "home" }, { label: "Trade", href: "/trade", icon: "trade" }] }];
  it("encontra o item da rota atual", () => {
    expect(findNavItem(groups, "/trade")?.label).toBe("Trade");
    expect(findNavItem(groups, "/")?.label).toBe("Home");
    expect(findNavItem(groups, "/nope")).toBeUndefined();
  });
});
