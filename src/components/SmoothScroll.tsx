"use client";
import { useEffect } from "react";

/**
 * Inertial wheel scrolling on desktop (mouse / trackpad), the same feel as griffara.com.
 * Off on touch screens (native momentum is already smooth) and under prefers-reduced-motion.
 * Loaded lazily after the page is interactive, so it costs nothing on first paint.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (!matchMedia("(pointer: fine) and (hover: hover)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, alive = true;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    import("lenis").then(({ default: Lenis }) => {
      if (!alive) return;
      const l = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1, anchors: { offset: -64 }, prevent: (n: HTMLElement) => !!n.closest?.("[data-lenis-prevent]") });
      lenis = l;
      (window as unknown as { __lenis?: unknown }).__lenis = l;
      const loop = (t: number) => { l.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    });
    return () => { alive = false; cancelAnimationFrame(raf); lenis?.destroy(); delete (window as unknown as { __lenis?: unknown }).__lenis; };
  }, []);
  return null;
}
