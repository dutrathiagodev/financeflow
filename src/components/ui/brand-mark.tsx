import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn("size-10 shrink-0", className)}>
      <path fill="var(--color-brand-cream)" d="M0 44a14 14 0 0 1 14-14h14v62a8 8 0 0 1-8 8h-12a8 8 0 0 1-8-8z" />
      <rect x="36" y="14" width="28" height="86" rx="0" fill="var(--color-brand-cream)" />
      <path fill="var(--color-brand-cream)" d="M72 0h28v78a14 14 0 0 1-14 14H72z" />
      <path
        fill="var(--color-accent)"
        stroke="var(--color-brand-dark)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        d="M0 91C42 86 70 58 84 22L74 24 99 4 97 33 90 28C75 66 45 88 0 91z"
      />
    </svg>
  );
}
