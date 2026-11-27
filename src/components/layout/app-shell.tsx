import type { ReactNode } from "react";
import { navegacao } from "@/content/navegacao";
import { Footer } from "./footer";
import { Header } from "./header";
import { BottomNav } from "./main-nav";
import { Sidebar } from "./sidebar";

/**
 * Esqueleto de todas as telas: menu lateral (computador), cabecalho, conteudo, rodape e barra
 * inferior (celular). Landmarks: header, nav, main e footer; o h1 fica no cabecalho.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 lg:grid lg:grid-cols-[var(--spacing-sidebar)_minmax(0,1fr)]">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-90 focus:rounded-base focus:bg-primario focus:px-4 focus:py-3 focus:font-semibold focus:text-primario-texto"
      >
        {navegacao.pularParaOConteudo}
      </a>
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-col">
        <Header />
        <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
      </div>
      <BottomNav />
    </div>
  );
}
