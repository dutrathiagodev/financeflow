"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Tempo padrão em que o aviso fica visível (PRD: "Desfazer" por 4,5 s). */
export const TOAST_DURATION_MS = 4500;

type ToastProps = {
  open: boolean;
  message: ReactNode;
  /** Texto do botão de ação (ex.: "Desfazer"). Sem ele, o aviso não tem botão. */
  actionLabel?: string;
  onAction?: () => void;
  /** Chamado quando o tempo acaba. */
  onClose: () => void;
  durationMs?: number;
};

/**
 * Aviso no rodapé da tela, anunciado por leitores de tela (`role="status"`).
 * Fecha sozinho depois de `durationMs`.
 */
export function Toast({
  open,
  message,
  actionLabel,
  onAction,
  onClose,
  durationMs = TOAST_DURATION_MS,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(timer);
  }, [open, durationMs, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-[150px] left-1/2 z-80 flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-4 rounded-base bg-escuro py-2.5 pr-3 pl-[18px] text-creme shadow-[0_12px_32px_rgb(0_0_0/0.28)] transition duration-200 lg:bottom-7",
        open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      {open ? (
        <>
          <span>{message}</span>
          {actionLabel && onAction ? (
            <button
              type="button"
              onClick={onAction}
              className="min-h-9 px-1 py-1.5 font-bold text-lima"
            >
              {actionLabel}
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
