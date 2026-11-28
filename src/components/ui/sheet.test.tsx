// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { Sheet } from "./sheet";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// O jsdom nao calcula layout: offsetParent e sempre null. A gaveta usa isso para ignorar elementos
// escondidos, entao aqui todo elemento ligado ao documento conta como visivel.
Object.defineProperty(HTMLElement.prototype, "offsetParent", {
  configurable: true,
  get() {
    return this.parentNode;
  },
});

let raiz: Root;
let container: HTMLDivElement;
let aoFechar: Mock<() => void>;
let voltar: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  window.history.replaceState(null, "", "/lancamentos");
  container = document.createElement("div");
  document.body.appendChild(container);
  raiz = createRoot(container);
  aoFechar = vi.fn<() => void>();
  // history.back() real dispararia popstate depois; aqui so queremos saber se foi chamado.
  voltar = vi.spyOn(window.history, "back").mockImplementation(() => {});
});

afterEach(() => {
  act(() => raiz.unmount());
  container.remove();
  voltar.mockRestore();
  document.body.style.overflow = "";
});

function gaveta(aberto: boolean) {
  return (
    <>
      <button id="abre">Nova</button>
      <Sheet aberto={aberto} onFechar={aoFechar} titulo="Nova movimentação" rotuloFechar="Fechar">
        <input id="primeiro" aria-label="Descrição" />
        <input id="meio" aria-label="Valor" />
        <button id="ultimo">Adicionar</button>
      </Sheet>
    </>
  );
}

const abrirGaveta = () => {
  act(() => raiz.render(gaveta(false)));
  document.querySelector<HTMLButtonElement>("#abre")!.focus();
  act(() => raiz.render(gaveta(true)));
};
const fecharGaveta = () => act(() => raiz.render(gaveta(false)));
const teclar = (key: string, shiftKey = false) =>
  act(() => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key, shiftKey, bubbles: true, cancelable: true }));
  });

describe("Sheet: historico e navegacao (FF-0024)", () => {
  it("abrir cria uma entrada no historico e fechar pela gaveta a remove", () => {
    const antes = window.history.length;
    abrirGaveta();
    expect(window.history.length).toBe(antes + 1);
    expect(voltar).not.toHaveBeenCalled();

    fecharGaveta();
    expect(voltar).toHaveBeenCalledTimes(1);
  });

  it("a gaveta desmontar por troca de rota NAO desfaz a navegacao", () => {
    abrirGaveta();
    // A pessoa navegou: a rota nova foi empilhada e a tela com a gaveta sai do ar.
    window.history.pushState(null, "", "/planilha");
    act(() => raiz.unmount());
    expect(voltar).not.toHaveBeenCalled();
    expect(window.location.pathname).toBe("/planilha");
    // O afterEach desmonta de novo: recria a raiz para ele nao falhar.
    raiz = createRoot(container);
  });

  it("desmontar sem a rota ter mudado tambem nao chama history.back", () => {
    abrirGaveta();
    act(() => raiz.unmount());
    expect(voltar).not.toHaveBeenCalled();
    raiz = createRoot(container);
  });

  it("se a rota mudou antes de a gaveta fechar, tambem nao desfaz a navegacao", () => {
    abrirGaveta();
    window.history.pushState(null, "", "/planilha");
    fecharGaveta();
    expect(voltar).not.toHaveBeenCalled();
  });

  it("o botao voltar do celular fecha a gaveta e a entrada nao e removida de novo", () => {
    abrirGaveta();
    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(aoFechar).toHaveBeenCalledTimes(1);
    fecharGaveta();
    expect(voltar).not.toHaveBeenCalled();
  });

  it("abrir e fechar varias vezes remove uma entrada por vez, sem acumular", () => {
    for (let i = 0; i < 3; i++) {
      abrirGaveta();
      fecharGaveta();
    }
    expect(voltar).toHaveBeenCalledTimes(3);
  });
});

describe("Sheet: teclado, foco e fundo (FF-0024)", () => {
  it("Esc pede para fechar", () => {
    abrirGaveta();
    teclar("Escape");
    expect(aoFechar).toHaveBeenCalledTimes(1);
  });

  it("o foco entra na gaveta e volta ao botao que a abriu", () => {
    abrirGaveta();
    expect(document.querySelector('[role="dialog"]')!.contains(document.activeElement)).toBe(true);
    fecharGaveta();
    expect(document.activeElement).toBe(document.querySelector("#abre"));
  });

  it("Tab no ultimo elemento volta ao primeiro e Shift+Tab no primeiro vai ao ultimo", () => {
    abrirGaveta();
    // O primeiro focavel da gaveta e o botao Fechar, que vem antes do conteudo.
    const primeiro = document.querySelector<HTMLElement>('[role="dialog"] button[aria-label="Fechar"]')!;
    const ultimo = document.querySelector<HTMLElement>("#ultimo")!;

    ultimo.focus();
    teclar("Tab");
    expect(document.activeElement).toBe(primeiro);

    primeiro.focus();
    teclar("Tab", true);
    expect(document.activeElement).toBe(ultimo);
  });

  it("Tab no meio deixa o navegador seguir sozinho", () => {
    abrirGaveta();
    document.querySelector<HTMLElement>("#meio")!.focus();
    const evento = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true });
    act(() => {
      document.dispatchEvent(evento);
    });
    expect(evento.defaultPrevented).toBe(false);
  });

  it("o fundo nao rola com a gaveta aberta e volta a rolar ao fechar", () => {
    abrirGaveta();
    expect(document.body.style.overflow).toBe("hidden");
    fecharGaveta();
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("depois de fechada, Esc nao faz mais nada", () => {
    abrirGaveta();
    fecharGaveta();
    teclar("Escape");
    expect(aoFechar).not.toHaveBeenCalled();
  });
});
