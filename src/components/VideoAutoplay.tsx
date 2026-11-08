"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Plays muted loop videos (`video[data-autoplay]`) only when they are on screen and
 * displayed, never under prefers-reduced-motion (the poster stays). Hidden variants
 * (desktop vs mobile copy) are never downloaded because they never get play().
 */
export function VideoAutoplay() {
  const pathname = usePathname();
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const vids = Array.from(document.querySelectorAll<HTMLVideoElement>("video[data-autoplay]"));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        const shown = v.offsetParent !== null || getComputedStyle(v).position === "fixed";
        if (e.isIntersecting && shown && !mq.matches) v.play().catch(() => {}); else v.pause();
      }
    }, { threshold: 0.15 });
    vids.forEach((v) => { v.muted = true; io.observe(v); });
    const onMq = () => vids.forEach((v) => { if (mq.matches) v.pause(); else { io.unobserve(v); io.observe(v); } });
    mq.addEventListener("change", onMq);
    return () => { io.disconnect(); mq.removeEventListener("change", onMq); };
  }, [pathname]);
  return null;
}
