import { cn } from "@/lib/utils";

export type Feedback = { ok: boolean; text: string };

export function StatusMessage({ feedback, className }: { feedback: Feedback | null; className?: string }) {
  if (!feedback) return null;
  return (
    <p role="status" className={cn(feedback.ok ? "text-up" : "text-down", className)}>
      {feedback.text}
    </p>
  );
}
