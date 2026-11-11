import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-card border border-line bg-panel p-6 transition-colors hover:border-line-strong", className)}>
      {children}
    </div>
  );
}
