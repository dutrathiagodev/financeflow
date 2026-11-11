import { initialsOf } from "@/lib/initials";
import { cn } from "@/lib/utils";

export function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-14 shrink-0 place-items-center rounded-full bg-accent-soft text-xl font-medium text-accent",
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  );
}
