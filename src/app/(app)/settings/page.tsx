import type { Metadata } from "next";
import { Settings } from "@/components/sections/settings/settings";

export const metadata: Metadata = { title: "Configurações · FinanceFlow" };

export default function SettingsPage() {
  return <Settings />;
}
