import type { ReactNode } from "react";
import { layoutText } from "@/content/navigation";
import { BottomNav } from "./bottom-nav";
import { Sidebar } from "./sidebar";
import { StorageNotice } from "./storage-notice";

/**
 * Esqueleto do app: menu lateral (desktop) + coluna de conteúdo + barra inferior (celular).
 * Cada página coloca o próprio PageHeader e as seções dentro do `main`.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-90 rounded-base bg-primario px-4 py-2 font-semibold text-primario-texto focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        {layoutText.skipToContent}
      </a>
      <div className="min-h-screen lg:grid lg:grid-cols-[var(--spacing-sidebar)_minmax(0,1fr)]">
        <Sidebar />
        <div className="flex min-w-0 flex-col">
          <main id="conteudo" tabIndex={-1} className="flex-1 pb-8 focus:outline-none lg:pb-14">
            {children}
          </main>
          <footer className="px-gutter-mobile pb-[150px] lg:hidden">
            <StorageNotice surface="light" className="border-t border-regua pt-4" />
          </footer>
        </div>
        <BottomNav />
      </div>
    </>
  );
}
