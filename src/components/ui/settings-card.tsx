import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icon";

type SettingsCardProps = {
  icon: IconName;
  title: string;
  description: string;
  children: ReactNode;
};

/** Cartão de seção da tela de configurações: ícone, título, descrição e conteúdo. */
export function SettingsCard({ icon, title, description, children }: SettingsCardProps) {
  return (
    <Card className="flex flex-col gap-6">
      <header className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
          <Icon name={icon} className="size-5" />
        </span>
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-sm text-ink-muted">{description}</p>
        </div>
      </header>
      {children}
    </Card>
  );
}
