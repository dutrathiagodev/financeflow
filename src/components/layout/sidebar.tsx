import { Icon } from "@/components/ui/icon";
import { NavBadgeView } from "@/components/ui/nav-badge";
import { brand, navGroups, welcome } from "@/content/navigation";
import { cn } from "@/lib/utils";

function BrandMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="size-9 text-ink-muted">
      <path fill="currentColor" d="M4 14l9-9 4 4-5 5 5 5-4 4zM20 6l8 8-6 6-4-4 3-4-4-4z" />
    </svg>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 flex-col overflow-y-auto border-r border-line bg-linear-to-b from-[#16172a] via-panel to-panel px-5 py-6 lg:flex">
      <div className="flex items-center gap-3 border-b border-line pb-5">
        <BrandMark />
        <div className="leading-tight">
          <p className="font-medium">{brand.name}</p>
          <p className="text-sm text-ink-faint">{brand.tagline}</p>
        </div>
        <button
          type="button"
          aria-label="Recolher menu"
          className="ml-auto grid size-9 place-items-center rounded-control border border-line text-ink-muted hover:text-ink"
        >
          <Icon name="chevronLeft" className="size-4" />
        </button>
      </div>

      <div className="border-b border-line py-6">
        <h2 className="text-3xl font-medium leading-tight tracking-tight">
          {welcome.greeting}
          <br />
          {welcome.name}
        </h2>
        <p className="mt-3 text-sm text-ink-faint">{welcome.lastLogin}</p>
      </div>

      <nav aria-label="Principal" className="flex flex-col gap-5 pt-5">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 text-sm text-ink-faint">{group.title}</p>
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-3 rounded-control px-3 py-2.5 text-base transition-colors",
                      item.active
                        ? "border border-line-strong bg-linear-to-r from-white/10 to-white/[0.02] text-ink"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    <Icon name={item.icon} className="size-5" />
                    {item.label}
                    {item.active && (
                      <span className="ml-auto h-3.5 w-0.5 rounded-full bg-ink" />
                    )}
                    {item.badge && <NavBadgeView badge={item.badge} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
