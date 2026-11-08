import { brand } from "@/content/assets";

/**
 * BRAND BANDS — choreography anchor points for BUILD 02.
 *
 * Each instance marks a moment where the two gold bands appear
 * (`data-bands="intro|transition|connection|outro"`). In BUILD 01 we show the
 * OFFICIAL symbol artwork with a mask reveal (no geometry changes).
 * When the original vector file is supplied, BUILD 02 swaps this for an SVG
 * with the two bands + solar arc as separate layers driven by ScrollTrigger.
 */
export function Bands({ moment, className = "", opacity = 1, align = "center" }: {
  moment: "intro" | "transition" | "connection" | "outro"; className?: string; opacity?: number; align?: "center" | "left" | "right";
}) {
  const pos = align === "left" ? "object-left" : align === "right" ? "object-right" : "object-center";
  return (
    <div aria-hidden data-bands={moment} className={`pointer-events-none select-none ${className}`} style={{ opacity }}>
      <div data-reveal="mask-x" className="h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brand.symbol} alt="" className={`h-full w-full object-contain ${pos}`} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}
