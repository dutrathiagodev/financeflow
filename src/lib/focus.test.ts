import { describe, expect, it } from "vitest";
import { proximoFoco, SELETOR_FOCAVEL } from "./focus";

describe("proximoFoco (foco preso na gaveta)", () => {
  it("Tab no ultimo elemento volta para o primeiro", () => {
    expect(proximoFoco(4, 3, false)).toBe(0);
  });

  it("Shift+Tab no primeiro elemento vai para o ultimo", () => {
    expect(proximoFoco(4, 0, true)).toBe(3);
  });

  it("no meio do grupo deixa o navegador seguir sozinho", () => {
    expect(proximoFoco(4, 1, false)).toBeNull();
    expect(proximoFoco(4, 2, true)).toBeNull();
    expect(proximoFoco(4, 0, false)).toBeNull();
    expect(proximoFoco(4, 3, true)).toBeNull();
  });

  it("com o foco fora da lista, Tab vai ao primeiro e Shift+Tab ao ultimo", () => {
    expect(proximoFoco(4, -1, false)).toBe(0);
    expect(proximoFoco(4, -1, true)).toBe(3);
  });

  it("com um unico elemento o foco fica nele", () => {
    expect(proximoFoco(1, 0, false)).toBe(0);
    expect(proximoFoco(1, 0, true)).toBe(0);
  });

  it("sem nenhum elemento focavel nao faz nada", () => {
    expect(proximoFoco(0, -1, false)).toBeNull();
  });
});

describe("SELETOR_FOCAVEL", () => {
  it("nao inclui campos desabilitados nem tabindex -1", () => {
    expect(SELETOR_FOCAVEL).toContain("button:not([disabled])");
    expect(SELETOR_FOCAVEL).toContain("[tabindex]:not([tabindex='-1'])");
  });
});
