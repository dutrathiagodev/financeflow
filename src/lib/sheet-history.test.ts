import { describe, expect, it } from "vitest";
import { deveRemoverEntradaDaGaveta } from "./sheet-history";

const base = {
  entradaAberta: true,
  desmontando: false,
  caminhoAoAbrir: "/lancamentos",
  caminhoAgora: "/lancamentos",
};

describe("deveRemoverEntradaDaGaveta", () => {
  it("fechou pela propria gaveta (Esc, Fechar, fundo ou adicionar): remove a entrada", () => {
    expect(deveRemoverEntradaDaGaveta(base)).toBe(true);
  });

  it("o botao voltar ja consumiu a entrada: nao volta de novo", () => {
    expect(deveRemoverEntradaDaGaveta({ ...base, entradaAberta: false })).toBe(false);
  });

  it("a gaveta desmontou por troca de rota: nao desfaz a navegacao", () => {
    expect(deveRemoverEntradaDaGaveta({ ...base, desmontando: true })).toBe(false);
  });

  it("a rota ja mudou quando a gaveta fecha: nao desfaz a navegacao", () => {
    expect(deveRemoverEntradaDaGaveta({ ...base, caminhoAgora: "/planilha" })).toBe(false);
  });

  it("desmontar e mudar de rota ao mesmo tempo tambem nao volta", () => {
    expect(
      deveRemoverEntradaDaGaveta({ ...base, desmontando: true, caminhoAgora: "/planilha" }),
    ).toBe(false);
  });
});
