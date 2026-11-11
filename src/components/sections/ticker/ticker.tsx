import { MarketData } from "@/components/data/market-data";
import { TickerTrack } from "./ticker-track";

const TICKER_SIZE = 10;

export function Ticker() {
  return (
    <MarketData fallback={null} loading={null}>
      {(coins) => (
        <section aria-label="Cotações rápidas" className="overflow-hidden border-y border-line py-4">
          <TickerTrack coins={coins.slice(0, TICKER_SIZE)} />
        </section>
      )}
    </MarketData>
  );
}
