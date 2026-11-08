import type { gsap as GSAP } from "gsap";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";

export type SceneCtx = { gsap: typeof GSAP; ScrollTrigger: typeof ST; lite: boolean };
export type Scene = (ctx: SceneCtx) => void;

/** Moderate parallax on media wrappers. Disabled on lite devices. */
const parallax: Scene = ({ gsap, lite }) => {
  if (lite) return;
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const amt = parseFloat(el.dataset.parallax || "0.12");
    gsap.fromTo(el, { yPercent: -amt * 50 }, {
      yPercent: amt * 50, ease: "none",
      scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
    });
  });
};

/**
 * Gold bands choreography — BUILD 02.
 * Placeholder scene: gentle drift of the band artwork while its section is on screen.
 * Will be replaced by per-band SVG path animation once the vector logo is supplied.
 */
const bands: Scene = ({ gsap, lite }) => {
  gsap.utils.toArray<HTMLElement>("[data-bands='transition'], [data-bands='connection']").forEach((el) => {
    gsap.fromTo(el, { xPercent: lite ? -3 : -8 }, {
      xPercent: lite ? 3 : 8, ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
    });
  });
};

export const scenes: Scene[] = [parallax, bands];
