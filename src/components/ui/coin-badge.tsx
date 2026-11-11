import Image from "next/image";
import { cn } from "@/lib/utils";

type CoinBadgeProps = {
  image: string;
  name: string;
  className?: string;
};

export function CoinBadge({ image, name, className }: CoinBadgeProps) {
  return (
    <Image
      src={image}
      alt={`Logo ${name}`}
      width={64}
      height={64}
      className={cn("size-8 shrink-0 rounded-full", className)}
    />
  );
}
