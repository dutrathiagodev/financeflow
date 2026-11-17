import type { ReactNode } from "react";
import { Button, IconButton } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { layoutText, pages, type PageId } from "@/content/navigation";
import { Brand } from "./brand";

type PageHeaderProps = {
  page: PageId;
  /** Executa a ação principal da tela (ligada pela feature dona: FF-0024 gaveta, FF-0039 exportar). */
  onAction?: () => void;
  /** Ações extras à direita (ex.: botão de tema, FF-0040). */
  extraActions?: ReactNode;
};

/**
 * Cabeçalho fixo de cada tela.
 * Desktop: título (h1) e subtítulo à esquerda e ação principal à direita.
 * Celular: marca no topo e título grande abaixo; "Nova movimentação" vira o botão
 * flutuante "+ Nova" na zona do polegar e "Exportar" vira um botão de ícone.
 * RF26: cada tela tem no máximo uma ação principal.
 */
export function PageHeader({ page, onAction, extraActions }: PageHeaderProps) {
  const info = pages[page];
  const action = info.action ? layoutText.actions[info.action] : null;
  const isNew = info.action === "nova-movimentacao";

  return (
    <>
      <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-regua-forte bg-fundo px-gutter-mobile py-3 lg:items-end lg:px-gutter-desktop lg:pt-5 lg:pb-4">
        <Brand variant="header" className="flex-1 lg:hidden" />
        <div className="hidden min-w-0 flex-1 lg:block">
          <h1 className="font-display text-[1.9rem] leading-[1.1] font-bold tracking-[-0.03em]">
            {info.title}
          </h1>
          <p className="mt-0.5 text-[0.9rem] text-muted">{info.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          {extraActions}
          {action ? (
            <>
              <div className="hidden lg:block">
                <Button variant={isNew ? "primary" : "outline"} onClick={onAction}>
                  <Icon name={action.icon} />
                  {action.label}
                </Button>
              </div>
              {isNew ? null : (
                <div className="lg:hidden">
                  <IconButton label={action.label} tone="bordered" onClick={onAction}>
                    <Icon name={action.icon} />
                  </IconButton>
                </div>
              )}
            </>
          ) : null}
        </div>
      </header>

      {/* No celular o título aparece abaixo do cabeçalho; o h1 do desktop fica oculto. */}
      <h1 className="px-gutter-mobile pt-4 font-display text-[1.6rem] font-bold tracking-[-0.03em] lg:hidden">
        {info.title}
      </h1>

      {action && isNew ? (
        <button
          type="button"
          onClick={onAction}
          aria-label={action.label}
          className="fixed right-4 bottom-[calc(80px+env(safe-area-inset-bottom))] z-31 flex h-[52px] items-center gap-2 rounded-base bg-primario px-5 font-bold text-primario-texto shadow-[0_8px_22px_rgb(31_47_36/0.35)] lg:hidden"
        >
          <Icon name={action.icon} />
          {action.shortLabel}
        </button>
      ) : null}
    </>
  );
}
