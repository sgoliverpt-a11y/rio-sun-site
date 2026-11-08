"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * BUILD 01 reveal engine: tiny IntersectionObserver that adds `.is-in`.
 * BUILD 02 keeps the same data-attributes and upgrades to GSAP/ScrollTrigger
 * via src/motion (no markup changes needed).
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
