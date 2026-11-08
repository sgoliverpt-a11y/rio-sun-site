import paths from "../../../public/brand/layers/paths.json";

/**
 * OFFICIAL band component — built from the Brand Lab layers (public/brand/layers),
 * i.e. the approved artwork separated pixel-exact. Nothing is redrawn: each layer is
 * the original raster, revealed through a mask that follows its vector centreline.
 *
 * - arc=false → only the two bands (cropped viewBox): connective moments.
 * - arc=true  → full symbol incl. solar arc: identity moments only (opening, closing).
 * - draw      → draws on once when it enters the viewport, with the approved Brand Lab
 *               timing (upper 0.2s/1.7s, lower 0.6s/1.7s, arc 1.3s/1.4s). Static otherwise.
 * data-band="upper|lower|arc" are the hooks for BUILD 02 (GSAP) choreography.
 */
const L = "/brand/layers/";
const LAYERS = [
  { id: "bandUpper", band: "upper", file: "band-upper.webp", w: 120, t: 0.2, d: 1.7 },
  { id: "bandLower", band: "lower", file: "band-lower.webp", w: 130, t: 0.6, d: 1.7 },
  { id: "sunArc", band: "arc", file: "sun-arc.webp", w: 64, t: 1.3, d: 1.4 },
] as const;

/* bands-only crop of the 1010x330 canvas (bands occupy y≈125–317) */
const BANDS_VIEWBOX = "0 118 1010 206";

export function BrandBands({
  uid, arc = false, draw = false, className = "", shadow = "dark", delay = 0,
}: {
  /** unique per page: used for mask ids */
  uid: string; arc?: boolean; draw?: boolean; className?: string;
  shadow?: "dark" | "soft" | "none"; delay?: number;
}) {
  const list = arc ? LAYERS : LAYERS.filter((l) => l.id !== "sunArc");
  const filter = shadow === "dark" ? "drop-shadow(0 1.6vw 2.4vw rgba(20,0,6,.5))" : shadow === "soft" ? "drop-shadow(0 1.2vw 1.8vw rgba(63,0,11,.22))" : undefined;
  return (
    <svg viewBox={arc ? paths.viewBox : BANDS_VIEWBOX} className={`brand-bands block h-auto w-full overflow-visible ${className}`}
      aria-hidden focusable="false" data-reveal={draw ? "draw" : undefined} style={{ filter }}>
      <defs>
        {list.map((l) => (
          <mask key={l.id} id={`${uid}-${l.id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1010" height="330">
            <path className="bd" d={paths[l.id].d} pathLength={1} fill="none" stroke="#fff" strokeWidth={l.w}
              style={{ ["--t" as string]: `${l.t + delay}s`, ["--d" as string]: `${l.d}s` }} />
          </mask>
        ))}
      </defs>
      {list.map((l) => (
        <image key={l.id} data-band={l.band} href={L + l.file} width="1010" height="330" mask={`url(#${uid}-${l.id})`} />
      ))}
    </svg>
  );
}
