import { rodape } from "@/content/navegacao";

type FooterProps = {
  /**
   * Volta para os dados de exemplo. Enquanto nao houver persistencia (FF-0038) nem dados de
   * exemplo, ninguem passa esta funcao e o botao fica desativado.
   */
  onRestaurar?: () => void;
};

/** Rodape com o aviso de privacidade e o botao de restaurar. Reserva espaco para a barra inferior. */
export function Footer({ onRestaurar }: FooterProps) {
  return (
    <footer className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-regua px-4 py-4 text-[0.82rem] text-muted max-lg:pb-[calc(88px+env(safe-area-inset-bottom))] lg:px-8">
      <p>{rodape.aviso}</p>
      <button
        type="button"
        onClick={onRestaurar}
        disabled={!onRestaurar}
        className="min-h-11 cursor-pointer font-semibold text-tinta underline underline-offset-2 hover:text-musgo disabled:cursor-default disabled:no-underline disabled:opacity-40"
      >
        {rodape.restaurar}
      </button>
    </footer>
  );
}
