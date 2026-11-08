"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { href, t, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { categories, type Treatment } from "@/content/catalogue";
import { site } from "@/content/site";
import { summaryLine, reviewNote } from "@/lib/format";
import { Media } from "@/components/Media";

/**
 * HOME · TREATMENTS GALLERY — a discovery rail fed by the central catalogue.
 *
 * Linked mode (default when motion is allowed, desktop AND mobile):
 *   the rail sits in a sticky stage; the page scroll drives it from the first to the
 *   last card, then the page simply continues. The extra scroll length is kept short
 *   (about half the rail's width). Page scroll is the single source of truth: swipes,
 *   drag, arrows and keys move the page to the matching position, so nothing jumps.
 * Without JS or with prefers-reduced-motion: a plain native scroller (swipe/snap).
 */
const RATIO = 0.5; // vertical px per horizontal px

export function TreatmentGallery({ items, locale, dict }: { items: Treatment[]; locale: Locale; dict: Dictionary }) {
  const s = dict.home.treatments;
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  const api = useRef<{ toLeft: (left: number, smooth: boolean) => void } | null>(null);
  const [pos, setPos] = useState({ i: 1, p: 0, atStart: true, atEnd: false });

  useEffect(() => {
    const el = rail.current, tr = track.current; if (!el || !tr) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(el.children) as HTMLElement[];
    const linked = !reduce;
    let dist = 0, max = 0, syncing = false, raf = 0;

    const layout = () => {
      max = el.scrollWidth - el.clientWidth;
      dist = Math.round(max * RATIO);
      tr.style.setProperty("--dist", `${dist}px`);
    };
    const trackTop = () => tr.getBoundingClientRect().top + scrollY;
    const yFor = (left: number) => trackTop() + (max ? (left / max) * dist : 0);

    const measure = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      let i = 0, best = Infinity;
      cards.forEach((c, k) => {
        const d = c.offsetLeft + c.offsetWidth / 2 - mid;
        if (Math.abs(d) < best) { best = Math.abs(d); i = k; }
        if (!reduce) c.style.setProperty("--p", String(Math.max(-1, Math.min(1, d / el.clientWidth))));
      });
      setPos({ i: i + 1, p: max > 0 ? el.scrollLeft / max : 0, atStart: el.scrollLeft < 4, atEnd: el.scrollLeft > max - 4 });
    };
    // page → rail
    const onPage = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const p = dist ? Math.max(0, Math.min(1, -tr.getBoundingClientRect().top / dist)) : 0;
        syncing = true; el.scrollLeft = p * max;
        requestAnimationFrame(() => { syncing = false; });
      });
    };
    // rail (swipe / drag / keys) → page
    const onRail = () => {
      measure();
      if (!linked || syncing) return;
      scrollTo({ top: yFor(el.scrollLeft), behavior: "instant" as ScrollBehavior });
    };
    api.current = {
      toLeft: (left, smooth) => {
        left = Math.max(0, Math.min(max, left));
        if (linked) scrollTo({ top: yFor(left), behavior: smooth ? "smooth" : "instant" as ScrollBehavior });
        else el.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
      },
    };

    // mouse drag (touch scrolls natively)
    let drag: { x: number; left: number; moved: boolean } | null = null;
    const down = (e: PointerEvent) => { if (e.pointerType !== "mouse" || e.button !== 0) return; drag = { x: e.clientX, left: el.scrollLeft, moved: false }; el.classList.add("is-dragging"); };
    const move = (e: PointerEvent) => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 4) drag.moved = true; el.scrollLeft = drag.left - dx; };
    const up = () => { if (!drag) return; const moved = drag.moved; drag = null; el.classList.remove("is-dragging"); if (moved) el.addEventListener("click", stop, { capture: true, once: true }); };
    const stop = (e: Event) => { e.preventDefault(); e.stopPropagation(); };

    const onResize = () => { layout(); onPage(); measure(); };
    if (linked) tr.classList.add("is-linked");
    layout();
    el.addEventListener("scroll", onRail, { passive: true });
    el.addEventListener("pointerdown", down);
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
    if (linked) addEventListener("scroll", onPage, { passive: true });
    addEventListener("resize", onResize);
    onPage(); measure();
    return () => {
      cancelAnimationFrame(raf); tr.classList.remove("is-linked");
      el.removeEventListener("scroll", onRail); el.removeEventListener("pointerdown", down);
      removeEventListener("pointermove", move); removeEventListener("pointerup", up);
      removeEventListener("scroll", onPage); removeEventListener("resize", onResize);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = rail.current; if (!el || !api.current) return;
    const card = el.children[0] as HTMLElement;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    api.current.toLeft(el.scrollLeft + dir * step * (innerWidth >= 768 ? 2 : 1), !reduce);
  };

  const total = items.length;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div ref={track} className="tg-track relative">
     <div className="tg-stage">
      {/* controls: progress + arrows */}
      <div className="gutter mx-auto flex max-w-[1600px] items-center gap-6">
        <p className="font-display text-[15px] tabular-nums text-burgundy-800" aria-live="polite">
          <span className="italic text-accent">{pad(pos.i)}</span> <span className="text-muted">{s.of} {pad(total)}</span>
        </p>
        <div className="relative h-px flex-1 bg-[var(--surface-line)]" aria-hidden>
          <span className="absolute inset-y-0 left-0 bg-gold-600" style={{ width: `${Math.max(6, pos.p * 100)}%`, transition: "width .25s linear" }} />
        </div>
        <div className="flex gap-2">
          {([-1, 1] as const).map((d) => (
            <button key={d} type="button" onClick={() => go(d)} disabled={d < 0 ? pos.atStart : pos.atEnd}
              aria-label={d < 0 ? s.prev : s.next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-burgundy-800/25 text-burgundy-800 transition-colors duration-300 hover:border-burgundy-800 hover:bg-burgundy-800 hover:text-ivory disabled:pointer-events-none disabled:opacity-30">
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden className={d < 0 ? "rotate-180" : ""}><path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" /></svg>
            </button>
          ))}
        </div>
      </div>

      <ul ref={rail} tabIndex={0} aria-label={s.rail}
        className="tgallery rail mt-10 flex gap-5 overflow-x-auto px-[var(--gutter)] pb-4 outline-none md:mt-12 md:gap-8">
        {items.map((tr, i) => {
          const link = tr.detail ? href(locale, `/treatments/${tr.slug}`) : href(locale, "/treatments") + `#${tr.slug}`;
          const book = tr.bookOn[0] === "fresha" ? site.links.freshaBooking : site.links.treatwell;
          const cat = categories.find((c) => c.id === tr.category)!;
          return (
            <li key={tr.slug} data-reveal="fan" data-fan={i % 2 ? "r" : undefined} data-reveal-delay={String(Math.min(i, 3))} className="tcard group w-[min(78vw,calc((100svh-400px)*0.8))] shrink-0 sm:w-[min(44vw,calc((100svh-400px)*0.8))] md:w-[min(30vw,calc((100svh-400px)*0.8))] lg:w-[min(24vw,400px,calc((100svh-400px)*0.8))]"
              data-status={tr.status} data-review-note={reviewNote(tr)}>
              <article className="flex h-full flex-col">
                <Link href={link} className="relative block aspect-[4/5] overflow-hidden" tabIndex={-1} aria-hidden draggable={false}>
                  <div className="tcard-media absolute inset-[-6%]">
                    <Media id={tr.media} locale={locale} tone="dark" fill label={false} focus="50% 45%" light={i % 2 ? "right" : "left"} />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(28,1,7,.0)_45%,rgba(28,1,7,.55))]" />
                  <span className="absolute left-4 top-4 text-[11px] font-semibold uppercase tracking-[.2em] text-gold-100/85">{t(cat.name, locale)}</span>
                  <span className="absolute right-4 top-3 font-display text-[1.35rem] italic text-gold-200/90">{pad(i + 1)}</span>
                  <span className="absolute bottom-4 left-4 font-mono text-[9px] tracking-[.14em] text-gold-100/50">{tr.media}</span>
                </Link>
                <div className="flex flex-1 flex-col border-t border-line pt-5 mt-5">
                  <p className="eyebrow text-muted">{summaryLine(tr, dict, locale)}</p>
                  <h3 className="display-sm mt-3 text-burgundy-800">
                    <Link href={link} className="link-underline" draggable={false}>{t(tr.name, locale)}</Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted">{t(tr.summary, locale)}</p>
                  <div className="mt-auto flex items-center gap-5 pt-6">
                    <a href={book} target="_blank" rel="noopener" data-booking={tr.bookOn[0]} draggable={false}
                      className="btn btn-burgundy !min-h-11 !px-5">{s.book}</a>
                    <Link href={link} className="eyebrow link-underline text-accent" draggable={false}>{dict.cta.details}</Link>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
     </div>
    </div>
  );
}
