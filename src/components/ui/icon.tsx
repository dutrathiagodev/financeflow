import { cn } from "@/lib/utils";

const paths = {
  dashboard: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 17a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
  portfolio: "M7 4v16M7 8H4v8h3M17 4v16M17 6h-3v9h3M12 9v6",
  wallet: "M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 7l11-3v3M20 12h-4v3h4",
  watchlist: "M12 3l2.6 6.2 6.4.5-4.9 4.2 1.5 6.3L12 16.7 6.4 20.2l1.5-6.3L3 9.7l6.4-.5z",
  trade: "M9 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10M15 10a5 5 0 1 1 0 10 5 5 0 0 1 0-10",
  transactions: "M4 8h14m-3-3 3 3-3 3M20 16H6m3-3-3 3 3 3",
  insights: "M5 4h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-4 3V5a1 1 0 0 1 1-1M12 7l1 2 2 .3-1.5 1.4.4 2-1.9-1-1.9 1 .4-2L9 9.3 11 9z",
  analytics: "M4 5h16v11H4zM12 16v4M8 20h8M7 13l3-3 2 2 4-4",
  trends: "M4 10l8-6 8 6v10H4zM8 16l3-3 2 2 3-3",
  support: "M7 4h10v8H7zM4 12h3M17 12h3M10 16v4M14 16v4M5 20h14",
  settings:
    "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M19 12l2-1-1-3-2 .5-1.5-1.5.5-2-3-1-1 2h-2l-1-2-3 1 .5 2L6 8.5 4 8l-1 3 2 1v2l-2 1 1 3 2-.5L7.5 19l-.5 2 3 1 1-2h2l1 2 3-1-.5-2 1.5-1.5 2 .5 1-3-2-1z",
  home: "M4 11l8-7 8 7v9H4zM10 20v-6h4v6",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M20 20l-4-4",
  chevronLeft: "M15 5l-7 7 7 7",
  chevronDown: "M6 9l6 6 6-6",
  more: "M12 6v.01M12 12v.01M12 18v.01",
  clock: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16M12 8v4l3 2",
  trendUp: "M4 16l5-5 4 4 7-7M15 8h5v5",
  trendDown: "M4 8l5 5 4-4 7 7M15 16h5v-5",
  arrowUpRight: "M7 17L17 7M9 7h8v8",
  sort: "M8 9l4-4 4 4M8 15l4 4 4-4",
  bell: "M6 17V11a6 6 0 1 1 12 0v6l2 2H4zM10 21h4",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
} as const;

export type IconName = keyof typeof paths;

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-6 shrink-0", className)}
    >
      <path d={paths[name]} />
    </svg>
  );
}
