/** Shared handle to the page's smooth scroller (desktop only). Falls back to native scrolling. */
type Lenisish = { scrollTo: (y: number, o?: { immediate?: boolean; duration?: number }) => void };
export function pageScrollTo(y: number, smooth: boolean) {
  const l = (window as unknown as { __lenis?: Lenisish }).__lenis;
  if (l) { l.scrollTo(y, smooth ? { duration: 1.1 } : { immediate: true }); return; }
  scrollTo({ top: y, behavior: smooth ? "smooth" : ("instant" as ScrollBehavior) });
}
