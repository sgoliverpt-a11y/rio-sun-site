import { brand } from "@/content/assets";

/** Official Rio Sun logo — original artwork (gold extracted from the approved emblem). Never redrawn. */
export function Logo({ variant = "full", className = "", priority = false, alt = "Rio Sun Therapy — Brazilian Aesthetics" }: {
  variant?: "full" | "symbol"; className?: string; priority?: boolean; alt?: string;
}) {
  const src = variant === "full" ? brand.logo : brand.symbol;
  const [w, h] = variant === "full" ? [1480, 530] : [1010, 330];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} width={w} height={h} alt={alt} className={className}
      decoding="async" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} draggable={false} />
  );
}
