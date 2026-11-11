import type { NavBadge } from "@/types/navigation";

export function NavBadgeView({ badge }: { badge: NavBadge }) {
  switch (badge.kind) {
    case "dot":
      return (
        <span className="ml-auto grid size-5 place-items-center rounded-md bg-accent-soft">
          <span className="size-1.5 rounded-[2px] bg-accent" />
        </span>
      );
    case "count":
      return (
        <span className="ml-auto grid size-6 place-items-center rounded-md bg-accent-soft text-xs text-ink">
          {badge.value}
        </span>
      );
    case "tag":
      return (
        <span className="rounded-sm bg-accent-soft px-2 py-1 text-xs leading-none text-accent">{badge.label}</span>
      );
  }
}
