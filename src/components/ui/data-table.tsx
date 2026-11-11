import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Column<Row> = {
  id: string;
  header: ReactNode;
  cell: (row: Row) => ReactNode;
  /** Texto para leitores de tela quando o cabeçalho é só um ícone. */
  srOnlyHeader?: boolean;
  className?: string;
};

type DataTableProps<Row> = {
  columns: readonly Column<Row>[];
  rows: readonly Row[];
  rowKey: (row: Row) => string;
  emptyText: string;
  minWidth?: string;
};

export function DataTable<Row>({ columns, rows, rowKey, emptyText, minWidth = "min-w-xl" }: DataTableProps<Row>) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-line">
      <table className={cn("w-full", minWidth)}>
        <thead className="border-b border-line">
          <tr>
            {columns.map((column) => (
              <th key={column.id} scope="col" className="px-4 py-4 text-left text-sm font-normal text-ink-muted">
                {column.srOnlyHeader ? <span className="sr-only">{column.header}</span> : column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-b border-line transition-colors last:border-b-0 hover:bg-white/[0.02]">
              {columns.map((column) => (
                <td key={column.id} className={cn("px-4 py-4", column.className)}>
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="p-6 text-ink-muted">{emptyText}</p>}
    </div>
  );
}
