import { assets, brand, type Asset, type AssetId } from "@/content/assets";
import { t, type Locale } from "@/i18n/config";

/**
 * Renders a manifest asset. If the file is not delivered yet, renders an
 * editorial placeholder with the SAME ratio, so layout, masks and transitions
 * already work. Swapping in the real asset = filling `src` in assets.ts.
 */
export function Media({
  id, locale, className = "", tone = "dark", sizes, priority = false, fill = false, label = true,
}: {
  id: AssetId; locale: Locale; className?: string; tone?: "dark" | "light"; sizes?: string;
  priority?: boolean; fill?: boolean; label?: boolean;
}) {
  const a: Asset = assets[id];
  const alt = t(a.alt, locale);
  const ratioStyle = fill ? undefined : ({ ["--r" as string]: String(a.ratio), ["--r-m" as string]: String(a.ratioMobile ?? a.ratio) } as React.CSSProperties);
  const box = `relative overflow-hidden ${fill ? "absolute inset-0" : "w-full [aspect-ratio:var(--r)] max-md:[aspect-ratio:var(--r-m)]"} ${className}`;

  if (a.src) {
    if (a.kind === "video") {
      return (
        <div className={box} style={ratioStyle}>
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={a.poster} aria-label={alt}>
            {a.srcMobile && <source src={a.srcMobile} media="(max-width: 767px)" />}
            <source src={a.src} />
          </video>
        </div>
      );
    }
    return (
      <div className={box} style={ratioStyle}>
        <picture>
          {a.srcMobile && <source srcSet={a.srcMobile} media="(max-width: 767px)" />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.src} alt={alt} sizes={sizes} className="absolute inset-0 h-full w-full object-cover"
            loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
        </picture>
      </div>
    );
  }

  const dark = tone === "dark";
  return (
    <div className={box} style={ratioStyle} role="img" aria-label={`${alt} (placeholder ${id})`} data-placeholder={id}>
      <div className={`absolute inset-0 ${dark
        ? "bg-[radial-gradient(120%_90%_at_30%_20%,#6e0c20_0%,#3f000b_55%,#22010a_100%)]"
        : "bg-[radial-gradient(120%_90%_at_30%_20%,#f7f1e7_0%,#e8dac4_60%,#d6c2a5_100%)]"}`} />
      {/* soft light leak */}
      <div className={`absolute -inset-1/4 ${dark ? "opacity-40" : "opacity-60"} bg-[conic-gradient(from_200deg_at_70%_30%,transparent_0deg,rgba(246,196,127,.35)_40deg,transparent_110deg)] blur-2xl`} />
      {/* official symbol as quiet watermark */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={brand.symbol} alt="" aria-hidden className={`absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2 ${dark ? "opacity-[.14]" : "opacity-25"}`} loading="lazy" />
      {label && (
        <div className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4 text-[10px] tracking-[.18em] uppercase ${dark ? "text-gold-200/70" : "text-burgundy-800/60"}`}>
          <span className="font-mono">{a.kind === "video" ? "▶ " : ""}{id}</span>
          <span className="font-mono hidden sm:inline">{ratioLabel(a.ratio)}{a.ratioMobile ? ` · m ${ratioLabel(a.ratioMobile)}` : ""}</span>
        </div>
      )}
    </div>
  );
}

function ratioLabel(r: number) {
  const known: [number, string][] = [[16 / 9, "16:9"], [9 / 16, "9:16"], [4 / 5, "4:5"], [3 / 2, "3:2"], [3 / 4, "3:4"], [16 / 10, "16:10"], [1, "1:1"]];
  return known.find(([v]) => Math.abs(v - r) < 0.01)?.[1] ?? r.toFixed(2);
}
