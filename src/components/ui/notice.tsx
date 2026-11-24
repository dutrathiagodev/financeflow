"use client";

import { useEffect, useRef } from "react";

type NoticeProps = {
  /** Texto do aviso, ja pronto (ex.: "Movimentação excluída"). */
  mensagem: string;
  /** Texto do botao de acao (ex.: "Desfazer"). Omitir para um aviso sem acao. */
  acaoTexto?: string;
  onAcao?: () => void;
  /** Chamado quando o tempo acaba ou depois da acao. */
  onFechar: () => void;
  /** Tempo na tela em milissegundos. Padrao do PRD: 4,5 s. */
  duracaoMs?: number;
};

/** Aviso no rodape, com acao opcional e fechamento automatico. Client: usa timer. */
export function Notice({ mensagem, acaoTexto, onAcao, onFechar, duracaoMs = 4500 }: NoticeProps) {
  // Guarda o callback mais recente: um onFechar inline nao reinicia o tempo a cada render.
  const fechar = useRef(onFechar);
  useEffect(() => {
    fechar.current = onFechar;
  });

  useEffect(() => {
    const id = setTimeout(() => fechar.current(), duracaoMs);
    return () => clearTimeout(id);
  }, [mensagem, duracaoMs]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-7 left-1/2 z-80 flex w-max max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-4 rounded-base bg-escuro py-2.5 pl-[18px] pr-3 text-creme shadow-[0_12px_32px_rgb(0_0_0/0.28)] max-lg:bottom-[150px]"
    >
      <span>{mensagem}</span>
      {acaoTexto ? (
        <button
          type="button"
          className="min-h-9 px-1 py-1.5 font-bold text-lima"
          onClick={() => {
            onAcao?.();
            onFechar();
          }}
        >
          {acaoTexto}
        </button>
      ) : null}
    </div>
  );
}
