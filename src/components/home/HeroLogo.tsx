import { brand } from "@/content/assets";

/**
 * Opening lockup. Reproduces the approved motion's sequence with the ORIGINAL artwork:
 * bands + solar arc reveal left→right with a light glint, then the wordmark settles.
 * Symbol and wordmark are crops of the same approved lockup, stacked at original spacing.
 */
export function HeroLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto max-w-full ${className || "w-full"}`} data-bands="intro">
      <div className="relative mx-auto" style={{ width: "68.24%", marginLeft: "16.2%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brand.symbol} alt="" width={1010} height={330} className="logo-reveal-symbol block h-auto w-full" fetchPriority="high" decoding="async" />
        <span className="logo-glint" style={{ ["--glint-mask" as string]: `url(${brand.symbol})` }} />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={brand.wordmark} alt="" width={1480} height={190} className="logo-reveal-word block h-auto w-full" decoding="async" />
    </div>
  );
}
