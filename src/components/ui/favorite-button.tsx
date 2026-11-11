"use client";

import { Icon } from "@/components/ui/icon";
import { commonText } from "@/content/common";
import { useFavorites } from "@/application/hooks/use-favorites";
import { cn } from "@/lib/utils";

export function FavoriteButton({ id, name }: { id: string; name: string }) {
  const { has, toggle } = useFavorites();
  const active = has(id);

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={active}
      aria-label={commonText.favoriteLabel(name, active)}
      className={cn(
        "grid size-9 place-items-center rounded-control transition-colors hover:bg-white/5",
        active ? "text-accent" : "text-ink-faint hover:text-ink",
      )}
    >
      <Icon name="watchlist" className={cn("size-5", active && "fill-current")} />
    </button>
  );
}
