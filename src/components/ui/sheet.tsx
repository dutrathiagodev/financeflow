"use client";

import { useEffect, useRef, type ReactNode } from "react";
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
 * Fecha com Esc ou toque no fundo, leva o foco para dentro e devolve ao abrir/fechar.
 */
export function Sheet({ aberto, onFechar, titulo, rotuloFechar, children, className }: SheetProps) {
  const painel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const anterior = document.activeElement as HTMLElement | null;
    painel.current?.focus();

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") onFechar();
    }
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      anterior?.focus();
    };
  }, [aberto, onFechar]);

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
