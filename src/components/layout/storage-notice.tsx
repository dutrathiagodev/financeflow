import { cn } from "@/lib/utils";
import { layoutText } from "@/content/navigation";

type StorageNoticeProps = {
  /** "dark": sobre o menu lateral. "light": no rodapé do celular. */
  surface?: "dark" | "light";
  /** Restaura os dados de exemplo. Sem ele o botão não aparece (ligado em FF-0038, persistência). */
  onRestore?: () => void;
  className?: string;
};

/** Aviso de que os dados ficam só no navegador, com a opção de restaurar os dados de exemplo. */
export function StorageNotice({ surface = "dark", onRestore, className }: StorageNoticeProps) {
  const dark = surface === "dark";
  return (
    <div className={cn("grid gap-2.5", className)}>
      <small className={cn("px-1 text-[0.8rem]", dark ? "text-menta" : "text-muted")}>
        {layoutText.storageNotice}
      </small>
      {onRestore ? (
        <button
          type="button"
          onClick={onRestore}
          className={cn(
            "justify-self-start p-1 text-left text-[0.8rem] underline underline-offset-3",
            dark ? "text-menta" : "text-tinta",
          )}
        >
          {layoutText.restoreSample}
        </button>
      ) : null}
    </div>
  );
}
