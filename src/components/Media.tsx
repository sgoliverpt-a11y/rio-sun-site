import { assets, brand, type Asset, type AssetId } from "@/content/assets";
import { t, type Locale } from "@/i18n/config";

/**
 * Renders a manifest asset. If the file is not delivered yet, renders an
 * art-directed placeholder with the SAME ratio and framing (light direction,
 * focal point, crop marks, shot brief), so layout, masks and transitions already
 * behave as they will with the real photograph or film.
 * Swapping in the real asset = filling `src` in assets.ts.
 */
export function Media({
  id, locale, className = "", tone = "dark", sizes, priority = false, fill = false, label = true, brief = false,
  focus = "50% 45%", light = "left", shape = "rect", loop = true,
}: {
  id: AssetId; locale: Locale; className?: string; tone?: "dark" | "light"; sizes?: string;
  priority?: boolean; fill?: boolean; label?: boolean; brief?: boolean;
  /** focal point of the future image (x y), used for object-position + placeholder marker */
  focus?: string; light?: "left" | "right" | "top";
  /** "arch" = the Rio Sun solar-arc window (signature frame) */
  shape?: "rect" | "arch";
  /** video only: false = plays once, rests on the last frame, replays when scrolled back into view */
  loop?: boolean;
}) {
  const a: Asset = assets[id];
  const alt = t(a.alt, locale);
  const ratioStyle = fill ? undefined : ({ ["--r" as string]: String(a.ratio), ["--r-m" as string]: String(a.ratioMobile ?? a.ratio) } as React.CSSProperties);
  const shapeCls = shape === "arch" ? "rounded-t-[9999px] [clip-path:inset(0_round_9999px_9999px_0_0)] isolate" : "";
  const box = `overflow-hidden ${shapeCls} ${fill ? "absolute inset-0" : "relative w-full [aspect-ratio:var(--r)] max-md:[aspect-ratio:var(--r-m)]"} ${className}`;

  if (a.src) {
    if (a.kind === "video") {
      return (
        <div className={box} style={ratioStyle}>
          {/* autoplay is started by <VideoAutoplay/> only when visible and motion is allowed; the poster stays otherwise */}
          {/* the poster is a real image underneath; the video stays transparent until its first frame
              is actually painting (VideoAutoplay sets data-live), so mobile browsers never flash black */}
          {a.poster && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={a.poster} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: focus }}
              loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
          )}
          <video className="vid absolute inset-0 h-full w-full object-cover" style={{ objectPosition: focus }} muted loop={loop} playsInline preload="none" poster={a.poster} aria-label={alt} data-autoplay={loop ? "loop" : "once"}>
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
          <img src={a.src} alt={alt} sizes={sizes} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: focus }}
            loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
        </picture>
      </div>
    );
  }

  const dark = tone === "dark";
  const lightPos = light === "left" ? "18% 22%" : light === "right" ? "82% 22%" : "50% 0%";
  return (
    <div className={box} style={ratioStyle} role="img" aria-label={`${alt} (placeholder ${id})`} data-placeholder={id}>
      {/* base: warm room tone */}
      <div className="absolute inset-0" style={{
        background: dark
          ? `radial-gradient(130% 95% at ${lightPos}, #d08a5a 0%, #93392f 22%, #561019 52%, #22010a 100%)`
          : `radial-gradient(130% 95% at ${lightPos}, #fff6e6 0%, #ecdcc2 40%, #cdb18e 78%, #a8875f 100%)`,
      }} />
      {/* window light shafts */}
      <div className="absolute inset-0 mix-blend-soft-light opacity-70" style={{
        background: `repeating-linear-gradient(${light === "right" ? "-62deg" : "62deg"}, rgba(255,230,190,.0) 0 7%, rgba(255,230,190,.35) 7% 9%, rgba(255,230,190,0) 9% 16%)`,
        maskImage: `radial-gradient(90% 80% at ${lightPos}, #000 0%, transparent 75%)`,
        WebkitMaskImage: `radial-gradient(90% 80% at ${lightPos}, #000 0%, transparent 75%)`,
      }} />
      {/* depth vignette */}
      <div className="absolute inset-0" style={{ boxShadow: dark ? "inset 0 0 18vmin rgba(20,0,6,.75)" : "inset 0 0 14vmin rgba(90,50,20,.28)" }} />
      {/* official symbol as quiet watermark */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={brand.symbol} alt="" aria-hidden className={`absolute left-1/2 top-1/2 w-[42%] -translate-x-1/2 -translate-y-1/2 ${dark ? "opacity-[.10]" : "opacity-20"}`} loading="lazy" />
      {label && (
        <>
          {/* focal point of the future shot */}
          <span aria-hidden className={`absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border ${dark ? "border-gold-200/35" : "border-burgundy-800/25"}`} style={{ left: focus.split(" ")[0], top: focus.split(" ")[1] }}>
            <span className={`absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full ${dark ? "bg-gold-200/60" : "bg-burgundy-800/40"}`} />
          </span>
          {/* crop marks */}
          {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"].map((c) => (
            <span key={c} aria-hidden className={`absolute h-4 w-4 ${c} ${dark ? "border-gold-200/40" : "border-burgundy-800/30"} ${shape === "arch" && c.includes("top") ? "hidden" : ""}`} />
          ))}
          <div className={`absolute inset-x-0 bottom-0 p-4 sm:p-5 ${dark ? "text-gold-100/75" : "text-burgundy-800/70"}`}>
            <p className="font-mono text-[10px] tracking-[.14em]">{a.kind === "video" ? "▶ " : ""}{id}</p>
            {brief && <p className="mt-1.5 max-w-[34ch] text-[11px] leading-snug opacity-80">{a.brief}</p>}
          </div>
        </>
      )}
    </div>
  );
}
