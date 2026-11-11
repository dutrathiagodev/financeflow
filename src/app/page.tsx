import { AppShell } from "@/components/layout/app-shell";
import { Ticker } from "@/components/sections/ticker/ticker";

export default function Home() {
  return (
    <AppShell>
      <Ticker />
    </AppShell>
  );
}
