"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { proximoFoco, SELETOR_FOCAVEL } from "@/lib/focus";
import { cn } from "@/lib/utils";

type SheetProps = {
  /** No celular: gaveta aberta. No computador o conteudo sempre aparece no lugar, sem gaveta. */
  aberto: boolean;
  onFechar: () => void;
  /** Nome acessivel da gaveta (ex.: "Nova movimentação"). Vem de fora. */
  titulo: string;
  /** Texto do botao de fechar (ex.: "Fechar"). Vem de fora. */
  rotuloFechar: string;
  children: ReactNode;
  className?: string;
};

/**
 * Gaveta que sobe de baixo no celular (abaixo de 1024px) e vira um bloco comum no computador.
 * Um unico conteudo no DOM: o estado do formulario nao se perde entre os dois modos.
 * Fecha com Esc, toque no fundo ou botao voltar do celular. O foco entra na gaveta, fica preso
 * nela (Tab e Shift+Tab dao a volta) e volta ao botao que a abriu quando ela fecha.
 */
export function Sheet({ aberto, onFechar, titulo, rotuloFechar, children, className }: SheetProps) {
  const painel = useRef<HTMLDivElement>(null);
  // O efeito nao pode recomecar so porque a tela passou outra funcao: so o `aberto` o reinicia.
  const aoFechar = useRef(onFechar);
  useEffect(() => {
    aoFechar.current = onFechar;
  }, [onFechar]);

  useEffect(() => {
    if (!aberto) return;
    const anterior = document.activeElement as HTMLElement | null;
    painel.current?.focus();

    // Botao voltar do celular: a gaveta ganha uma entrada no historico, entao voltar fecha so a
    // gaveta e nao a tela. Se ela fechar por outro caminho, a entrada e desfeita ao sair.
    let entradaNoHistorico = true;
    window.history.pushState({ gaveta: true }, "");
    function aoVoltar() {
      entradaNoHistorico = false;
      aoFechar.current();
    }
    window.addEventListener("popstate", aoVoltar);

    // A gaveta cobre a tela: o fundo nao rola por baixo dela.
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        aoFechar.current();
        return;
      }
      if (evento.key !== "Tab" || !painel.current) return;
      const focaveis = Array.from(painel.current.querySelectorAll<HTMLElement>(SELETOR_FOCAVEL)).filter(
        (el) => el.offsetParent !== null,
      );
      const destino = proximoFoco(focaveis.length, focaveis.indexOf(document.activeElement as HTMLElement), evento.shiftKey);
      if (destino === null) return;
      evento.preventDefault();
      focaveis[destino].focus();
    }
    document.addEventListener("keydown", aoTeclar);

    return () => {
      document.removeEventListener("keydown", aoTeclar);
      window.removeEventListener("popstate", aoVoltar);
      document.body.style.overflow = overflowAnterior;
      if (entradaNoHistorico) window.history.back();
      anterior?.focus();
    };
  }, [aberto]);

  return (
    <div
      className={cn(
        aberto
          ? "max-lg:fixed max-lg:inset-0 max-lg:z-60 max-lg:flex max-lg:items-end max-lg:bg-escuro/60"
          : "max-lg:hidden",
        className,
      )}
      onClick={(evento) => {
        if (aberto && evento.target === evento.currentTarget) onFechar();
      }}
    >
      <div
        ref={painel}
        tabIndex={-1}
        role={aberto ? "dialog" : undefined}
        aria-modal={aberto ? true : undefined}
        aria-label={aberto ? titulo : undefined}
        className="relative w-full outline-none max-lg:max-h-[92vh] max-lg:overflow-auto max-lg:rounded-t-base max-lg:bg-fundo max-lg:p-3 max-lg:pb-[calc(12px+env(safe-area-inset-bottom))]"
      >
        <button
          type="button"
          onClick={onFechar}
          aria-label={rotuloFechar}
          className="absolute right-6 top-[18px] z-10 grid size-11 place-items-center rounded-base border border-regua-forte bg-transparent text-tinta lg:hidden"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-none stroke-current" strokeWidth="1.9">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
