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
    }, { rootMargin: "0px 0px 12% 0px", threshold: 0 });
    // fan reveals wait until the element is really inside the viewport (never before it is seen)
    const io2 = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io2.unobserve(e.target); }
    }, { rootMargin: "0px 0px -14% 0px", threshold: 0 });
    els.forEach((e) => (e.dataset.reveal === "fan" ? io2 : io).observe(e));
    // Safety net: anything already scrolled past (fast jumps, anchors, full-page capture tools) is shown.
    const sweep = () => els.forEach((e) => { if (!e.classList.contains("is-in") && e.getBoundingClientRect().left < window.innerWidth && e.getBoundingClientRect().top < window.innerHeight * (e.dataset.reveal === "fan" ? 0.86 : 1.1)) e.classList.add("is-in"); });
    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("beforeprint", () => els.forEach((e) => e.classList.add("is-in")));
    return () => { io.disconnect(); io2.disconnect(); window.removeEventListener("scroll", sweep); };
  }, [pathname]);
  return null;
}
