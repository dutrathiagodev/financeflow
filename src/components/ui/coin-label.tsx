import { CoinBadge } from "@/components/ui/coin-badge";

type CoinLabelProps = {
  image: string;
  name: string;
  symbol: string;
};

export function CoinLabel({ image, name, symbol }: CoinLabelProps) {
  return (
    <span className="flex items-center gap-3 text-lg">
      <CoinBadge image={image} name={name} />
      {name}
      <span className="text-sm text-ink-muted">{symbol}</span>
    </span>
  );
}
