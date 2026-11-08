"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Plays muted videos (`video[data-autoplay]`) only when they are on screen and displayed,
 * never under prefers-reduced-motion (the poster stays). Hidden variants (desktop vs
 * mobile copy) are never downloaded because they never get play().
 * data-autoplay="once": plays through once and rests on its last frame; after the video
 * has left the viewport, coming back to it plays it again from the start.
 * While the home intro overlay is showing, playback waits for it to clear.
 */
export function VideoAutoplay() {
  const pathname = usePathname();
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const vids = Array.from(document.querySelectorAll<HTMLVideoElement>("video[data-autoplay]"));
    const left = new WeakSet<HTMLVideoElement>();
    const intro = document.querySelector<HTMLElement>(".intro");
    let ready = !intro || getComputedStyle(intro).display === "none";
    const visible = new Set<HTMLVideoElement>();

    const start = (v: HTMLVideoElement) => {
      if (!ready || mq.matches || v.offsetParent === null) return;
      if (v.dataset.autoplay === "once") {
        if (left.has(v)) { left.delete(v); v.currentTime = 0; }
        else if (v.ended) return; // rests on the last frame
      }
      v.play().catch(() => {});
    };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) { visible.add(v); start(v); }
        else { visible.delete(v); v.pause(); if (v.played.length) left.add(v); }
      }
    }, { threshold: 0.15 });
    // reveal the video only once a real frame is on screen (poster image stays underneath until then)
    const live = (v: HTMLVideoElement) => {
      const show = () => { v.dataset.live = ""; };
      const rv = (v as HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number }).requestVideoFrameCallback;
      if (rv) rv.call(v, show); else v.addEventListener("timeupdate", function f() { if (v.currentTime > 0.05) { v.removeEventListener("timeupdate", f); show(); } });
    };
    vids.forEach((v) => { v.muted = true; io.observe(v); v.addEventListener("playing", () => live(v), { once: true }); });

    let t: number | undefined;
    if (!ready) {
      const go = () => { if (ready) return; ready = true; visible.forEach(start); };
      t = window.setTimeout(go, 3600); // the hero is revealed under the dissolving intro
      document.querySelector(".intro-skip")?.addEventListener("click", go, { once: true });
    }
    const onMq = () => vids.forEach((v) => (mq.matches ? v.pause() : visible.has(v) && start(v)));
    mq.addEventListener("change", onMq);
    return () => { io.disconnect(); clearTimeout(t); mq.removeEventListener("change", onMq); };
  }, [pathname]);
  return null;
}
