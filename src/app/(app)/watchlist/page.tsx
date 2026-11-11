import type { Metadata } from "next";
import { Watchlist } from "@/components/sections/watchlist/watchlist";

export const metadata: Metadata = { title: "Favoritos · FinanceFlow" };

export default function WatchlistPage() {
  return <Watchlist />;
}
