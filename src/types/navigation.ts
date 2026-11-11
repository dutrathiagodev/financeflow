import type { IconName } from "@/components/ui/icon";

export type NavBadge =
  | { kind: "dot" }
  | { kind: "count"; value: number }
  | { kind: "tag"; label: string };

export type NavItem = {
  label: string;
  href: string;
  icon: IconName;
  badge?: NavBadge;
  active?: boolean;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};
