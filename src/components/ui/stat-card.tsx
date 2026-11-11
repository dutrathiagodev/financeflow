import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: ReactNode;
  accent?: boolean;
  children?: ReactNode;
  className?: string;
};

export function StatCard({ label, value, accent, children, className }: StatCardProps) {
  return (
    <Card className={className}>
      <p className="text-ink-muted">{label}</p>
      <p className={cn("mt-2 flex items-center gap-3 text-4xl font-medium tracking-tight", accent && "text-accent")}>
        {value}
      </p>
      {children}
    </Card>
  );
}
