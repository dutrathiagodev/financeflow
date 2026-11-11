import { commonText } from "@/content/common";

export function UnavailableNotice() {
  return (
    <p role="alert" className="rounded-2xl border border-line bg-panel px-5 py-4 text-ink-muted">
      {commonText.unavailable}
    </p>
  );
}
