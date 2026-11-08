"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { scenes } from "./scenes";

/**
 * MOTION SYSTEM ENTRY POINT
 * ---------------------------------------------------------------
 * - GSAP + ScrollTrigger are loaded lazily (never block first paint / booking).
 * - Respects `prefers-reduced-motion`: nothing is registered.
 * - Lighter profile on small / low-power devices.
 * - Scenes bind to declarative hooks in the markup:
 *     data-parallax="0.15"        → moderate parallax
 *     data-bands="intro|transition|connection|outro" → gold band choreography (BUILD 02)
 *     data-chapter="01".."07"     → chapter transitions (BUILD 02)
 */
export function MotionProvider() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lite = window.matchMedia("(max-width: 767px)").matches || (navigator.hardwareConcurrency ?? 8) <= 4;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => scenes.forEach((s) => s({ gsap, ScrollTrigger, lite })));
      cleanup = () => ctx.revert();
    })();
    return () => { cancelled = true; cleanup?.(); };
  }, [pathname]);
  return null;
}
