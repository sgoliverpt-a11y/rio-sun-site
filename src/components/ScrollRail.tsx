"use client";
import { Children, useEffect, useRef, useState } from "react";

/**
 * Horizontal rail with native swipe/scroll-snap, arrows and a "01 / 03" counter.
 * Arrows and counter hide by themselves when everything already fits.
 * Items fan in together when the rail arrives (never half-revealed off to the side).
 * Add more children and it just grows.
 */
export function ScrollRail({ children, label, prev, next, itemClassName = "", tone = "dark", className = "" }: {
  children: React.ReactNode; label: string; prev: string; next: string; itemClassName?: string; tone?: "dark" | "light"; className?: string;
}) {
  const rail = useRef<HTMLUListElement>(null);
  const [st, setSt] = useState({ i: 1, start: true, end: false, fits: true });
  const items = Children.toArray(children);

  useEffect(() => {
    const el = rail.current; if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const measure = () => {
      const max = el.scrollWidth - el.clientWidth;
      let i = 0, best = Infinity;
      cards.forEach((c, k) => { const d = Math.abs(c.offsetLeft - el.offsetLeft - el.scrollLeft); if (d < best) { best = d; i = k; } });
      setSt({ i: i + 1, start: el.scrollLeft < 4, end: el.scrollLeft > max - 4, fits: max <= 4 });
    };
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { cards.forEach((c) => c.classList.add("is-in")); io.disconnect(); }
    }, { rootMargin: "0px 0px -15% 0px" });
    io.observe(el);
    el.addEventListener("scroll", measure, { passive: true });
    addEventListener("resize", measure);
    measure();
    return () => { io.disconnect(); el.removeEventListener("scroll", measure); removeEventListener("resize", measure); };
  }, [items.length]);

  const go = (dir: 1 | -1) => {
    const el = rail.current; if (!el) return;
    const card = el.children[0] as HTMLElement;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };
  const pad = (n: number) => String(n).padStart(2, "0");
  const btn = tone === "dark"
    ? "border-gold-300/40 text-gold-200 hover:border-gold-200 hover:bg-gold-200 hover:text-burgundy-900"
    : "border-burgundy-800/25 text-burgundy-800 hover:border-burgundy-800 hover:bg-burgundy-800 hover:text-ivory";

  return (
    <div className={`min-w-0 ${className}`}>
      <ul ref={rail} tabIndex={0} aria-label={label} className="rail -mx-[var(--gutter)] flex gap-4 overflow-x-auto px-[var(--gutter)] pb-2 outline-none lg:mx-0 lg:px-0">
        {items.map((c, k) => <li key={k} className={`shrink-0 ${itemClassName}`} data-reveal="fan" data-fan={k % 3 === 2 ? "r" : k % 3 === 1 ? "c" : undefined} data-reveal-delay={String(Math.min(k, 3))}>{c}</li>)}
      </ul>
      {!st.fits && (
        <div className="mt-6 flex items-center gap-5">
          <p className="font-display text-[15px] tabular-nums" aria-live="polite">
            <span className="italic text-accent">{pad(st.i)}</span> <span className="opacity-60">/ {pad(items.length)}</span>
          </p>
          <div className="ml-auto flex gap-2">
            {([-1, 1] as const).map((d) => (
              <button key={d} type="button" onClick={() => go(d)} disabled={d < 0 ? st.start : st.end} aria-label={d < 0 ? prev : next}
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 disabled:pointer-events-none disabled:opacity-30 ${btn}`}>
                <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden className={d < 0 ? "rotate-180" : ""}><path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" /></svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
