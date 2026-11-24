import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const controle =
  "min-h-11 w-full rounded-base border border-regua-forte bg-campo px-3 text-[0.95rem] text-tinta " +
  "focus:border-tinta focus:outline-2 focus:outline-tinta focus:outline-offset-0 " +
  "group-data-[invalido]:border-despesa group-data-[invalido]:shadow-[inset_0_0_0_1px_var(--ff-despesa)]";

type FieldProps = {
  /** Rotulo sempre visivel acima do controle. */
  label: string;
  /** Mensagem de erro especifica; quando presente, o campo fica no estado de erro. */
  erro?: string;
  children: ReactNode;
  className?: string;
};

/** Rotulo + controle + erro. O rotulo envolve o controle, entao nao precisa de id. */
export function Field({ label, erro, children, className }: FieldProps) {
  return (
    <label className={cn("group mb-3.5 block", className)} data-invalido={erro ? "" : undefined}>
      <span className="mb-[5px] block text-[0.85rem] font-semibold">{label}</span>
      {children}
      {erro ? (
        <em role="alert" className="mt-1 block text-[0.82rem] font-medium not-italic text-despesa">
          {erro}
        </em>
      ) : null}
    </label>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controle, className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(controle, className)} {...props} />;
}
