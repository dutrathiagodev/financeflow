import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full min-h-11 rounded-base border border-regua-forte bg-campo px-3 text-[0.95rem] text-tinta focus:border-tinta focus:outline-2 focus:outline-offset-0 focus:outline-tinta aria-invalid:border-despesa aria-invalid:shadow-[inset_0_0_0_1px_var(--ff-despesa)]";

type FieldProps = {
  /** Id do controle; liga o rótulo e a mensagem de erro. */
  id: string;
  label: ReactNode;
  /** Mensagem de erro; quando presente o campo fica marcado como inválido. */
  error?: ReactNode;
  className?: string;
  /** Recebe o controle (Input ou Select) já com o id e as props de acessibilidade. */
  children: (props: {
    id: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
  }) => ReactNode;
};

/** Campo com rótulo sempre visível acima e mensagem de erro abaixo. */
export function Field({ id, label, error, className, children }: FieldProps) {
  const errorId = `${id}-erro`;
  return (
    <div className={cn("mb-3.5", className)}>
      <label htmlFor={id} className="mb-1.5 block text-[0.85rem] font-semibold">
        {label}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })}
      {error ? (
        <p id={errorId} className="mt-1 text-[0.82rem] font-medium text-despesa">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(control, className)} {...props} />;
}
