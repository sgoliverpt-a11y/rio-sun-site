import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { team } from "@/content/people-reviews";
import { Media } from "@/components/Media";
import { ButtonLink, ChapterLabel } from "@/components/ui";
import { BrandBands } from "@/components/brand/BrandBands";
import { HeroLogo } from "./HeroLogo";

type P = { locale: Locale; dict: Dictionary };

/**
 * Signature device of the redesign: the SOLAR-ARC WINDOW.
 * Every key photograph sits in an arch taken from the logo's sun, and the two
 * gold bands pass in front of it. Same idea in every chapter = recognisable language.
 */

/* Fits the two title words to their column whatever the language. */
function wordSizing(words: string[], maxVw: number, widthVw: number, indentShare = 0.22) {
  const longest = Math.max(...words.map((w) => w.length));
  const size = Math.min(maxVw, widthVw / (longest * 0.53));
  const second = words[1]?.length ?? 0;
  const indent = Math.max(0, Math.min(widthVw * indentShare, widthVw - second * 0.53 * size));
  return { size, indent };
}

/* ── 00 INTRO — the approved logo motion opens the site (once per session) ── */
export function IntroOverlay({ label }: { label: string }) {
  // Plays on every visit to the home page (skippable); reduced-motion users never see it.
  const pre = `try{if(matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-done')}else{document.documentElement.classList.remove('intro-done')}}catch(e){}`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: pre }} />
      <div className="intro surface-dark intro-flat grain fixed inset-0 z-[45] flex items-center justify-center" aria-hidden>
        <HeroLogo className="w-[min(80vw,820px)]" />
        <button type="button" className="intro-skip absolute bottom-8 left-1/2 -translate-x-1/2 text-[12px] tracking-[.08em] text-gold-200/70 underline-offset-4 hover:underline"
          tabIndex={-1}>{label}</button>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `document.querySelector('.intro-skip')?.addEventListener('click',function(){document.documentElement.classList.add('intro-done')})` }} />
    </>
  );
}

/* ── 01 HERO ─────────────────────────────────────────────── */
/* Hierarchy: title (first read) → lede + CTAs (action) → the window (expressive area
   reserved for the film) → bands as the thread between title and window. No overlaps
   over text; the bands only cross the image. */
export function Hero({ locale, dict }: P) {
  const h = dict.home.hero;
  const d = wordSizing(h.words, 7.6, 50);
  const m = wordSizing(h.words, 13.5, 86, 0.18);
  return (
    <section data-chapter="01" data-header="dark" aria-label={h.title.join(" ")}
      className="hero surface-dark grain relative overflow-hidden md:h-[max(100svh,720px)]"
      style={{ ["--w-d" as string]: `${d.size}vw`, ["--i-d" as string]: `${d.indent}vw`, ["--w-m" as string]: `${m.size}vw`, ["--i-m" as string]: `${m.indent}vw` }}>

      {/* sun glow behind the window */}
      <div aria-hidden className="absolute right-[2vw] top-[6vh] h-[70vh] w-[44vw] rounded-full bg-[radial-gradient(closest-side,rgba(246,196,127,.18),rgba(163,88,42,.16)_55%,transparent)] blur-2xl max-md:left-1/2 max-md:w-[120vw] max-md:-translate-x-1/2" />

      {/* THE WINDOW — expressive area reserved for the hero film */}
      <div className="hero-window relative z-0 mx-auto max-md:mt-[calc(var(--header-h)+3svh)] max-md:h-[52svh] max-md:w-[74vw] md:absolute md:bottom-[9svh] md:right-[7vw] md:top-[calc(var(--header-h)+5svh)] md:w-[min(30vw,54svh)]">
        <div className="absolute inset-0 hidden md:block"><Media id="HERO_VIDEO_DESKTOP" locale={locale} fill shape="arch" priority focus="50% 38%" light="left" loop={false} /></div>
        <div className="absolute inset-0 md:hidden"><Media id="HERO_VIDEO_MOBILE" locale={locale} fill shape="arch" priority focus="50% 35%" light="top" loop={false} /></div>
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-t-[9999px] ring-1 ring-inset ring-gold-300/30" />
      </div>

      {/* the two bands (no arc: the arc belongs to the intro) cross the window and
          point back to the title — they lead the eye, they don't fill the frame */}
      <div data-bands="intro" className="hero-bands pointer-events-none z-[2] max-md:relative max-md:-mt-[13vw] max-md:ml-[6vw] max-md:w-[86vw] md:absolute md:bottom-[19svh] md:right-[3vw] md:w-[38vw]">
        <BrandBands uid="hero" />
      </div>

      {/* title → lede → actions, one reading column */}
      <div className="gutter relative z-10 mx-auto max-w-[1600px] max-md:pb-12 max-md:pt-8 md:flex md:h-full md:flex-col md:justify-end md:pb-[9svh]">
        <h1 className="font-display leading-[.86] tracking-[-0.03em]">
          <span className="mb-[.4em] block font-display text-[clamp(1.2rem,1.6vw,1.6rem)] italic tracking-normal text-gold-300">{h.kicker}</span>
          <span className="hero-word block text-ivory">{h.words[0]}</span>
          <span className="hero-word hero-word-2 block italic text-gold-metal pr-[.06em]">{h.words[1]}</span>
        </h1>
        <div className="hero-rest mt-9 md:mt-11">
          <p className="lede max-w-[30rem] text-ivory/80">{h.lede}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
            <ButtonLink href={href(locale, "/booking")}>{dict.cta.book}</ButtonLink>
            <a href={href(locale, "/treatments")} className="link-underline px-1 py-3 text-center text-[13px] font-semibold uppercase tracking-[.14em] text-ivory max-sm:rounded-full max-sm:border max-sm:border-ivory/30">{dict.cta.explore}</a>
          </div>
        </div>
      </div>

      {/* location, quiet, under the window */}
      <p className="hero-rest absolute bottom-[3.5svh] right-[7vw] z-10 hidden w-[min(30vw,54svh)] text-center text-[14px] tracking-[.02em] text-muted md:block">
        {h.where[0]} · {h.where[1]}
      </p>
    </section>
  );
}

/* ── 02 PHILOSOPHY ───────────────────────────────────────── */
export function Philosophy({ locale, dict }: P) {
  const p = dict.home.philosophy;
  const [s1, ...rest] = p.lead.split(/(?<=\.)\s/);
  return (
    <section data-chapter="02" aria-labelledby="ch-philosophy" className="relative">
      {/* A — still in the dark: the manifesto */}
      <div data-header="dark" className="surface-dark grain relative pb-[22vh] pt-[14vh] md:pb-[26vh] md:pt-[18vh]">
        <div className="gutter mx-auto max-w-[1600px]">
          <ChapterLabel n="02">{p.label}</ChapterLabel>
          <p className="mt-10 max-w-[20ch] font-display text-[clamp(1.65rem,3vw,3.2rem)] leading-[1.1] tracking-[-0.015em] md:mt-14 md:max-w-[24ch]" data-draft data-review-note="DRAFT COPY: brand voice, to be approved">
            <span data-reveal="fade" className="block">{s1}</span>
            <span data-reveal="fade" data-reveal-delay="1" className="mt-[.3em] block italic text-gold-300">{rest.join(" ")}</span>
          </p>
        </div>
      </div>

      {/* B — the light: editorial */}
      <div data-header="light" className="surface-light relative pb-28 md:pb-40">
        {/* SEAM — the bands carry the light from burgundy into ivory, toward the image */}
        <div data-bands="transition" className="pointer-events-none absolute left-[-8vw] top-0 z-20 w-[92vw] -translate-y-1/2 md:left-[-2vw] md:w-[62vw]">
          <BrandBands uid="seam" draw shadow="soft" surface="light" />
        </div>
        {/* the photograph straddles the seam: half night, half day */}
        <div className="gutter relative mx-auto max-w-[1600px]">
          <div data-reveal="fan" data-fan="r" className="relative z-10 ml-auto w-[56vw] -translate-y-[40%] md:absolute md:right-[calc(var(--gutter)+3vw)] md:top-0 md:w-[25vw] md:max-w-[440px] md:-translate-y-[62%]">
            <Media id="PHILOSOPHY_HANDS_IMAGE" locale={locale} tone="dark" shape="arch" focus="40% 35%" light="right" brief />
          </div>
        </div>

        <div className="gutter mx-auto max-w-[1600px] max-md:-mt-[12vw] md:pt-[13vw]">
          <h2 id="ch-philosophy" className="font-display text-[clamp(2.7rem,6.2vw,6.8rem)] leading-[.9] tracking-[-0.035em] text-burgundy-800 md:max-w-[62vw]">
            <span className="block overflow-hidden pb-[.06em]"><span className="block" data-reveal="mask">{p.title.split(" ")[0]}</span></span>
            <span className="block overflow-hidden pb-[.08em] pl-[10vw] md:pl-[9vw]"><span className="block italic" data-reveal="mask" data-reveal-delay="1">{p.title.split(" ").slice(1).join(" ")}</span></span>
          </h2>

          <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12">
            {p.body.map((b, i) => (
              <p key={i} className={`text-[17px] leading-[1.7] text-muted md:col-span-4 md:text-[18px] ${i === 0 ? "md:col-start-2" : "md:col-start-6"}`} data-reveal="fade" data-reveal-delay={String(i)}>{b}</p>
            ))}
          </div>

          {/* three qualities, as type */}
          <ul className="mt-20 grid border-t border-line md:mt-28 md:grid-cols-3">
            {p.pillars.map((x, i) => (
              <li key={x.k} className={`border-b border-line py-9 md:border-b-0 md:py-12 ${i > 0 ? "md:border-l md:pl-10" : "md:pr-10"}`}>
                <p className="display-md text-burgundy-800" data-reveal="fade" data-reveal-delay={String(i)}>{x.k}.</p>
                <p className="mt-4 max-w-[32ch] text-[16px] leading-relaxed text-muted">{x.v}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── 03 OUR STORY ────────────────────────────────────────── */
export function Story({ locale, dict }: P) {
  const s = dict.home.story;
  const [marcia, isabella] = team;
  return (
    <section data-chapter="03" data-header="light" className="surface-cream relative overflow-hidden pb-28 pt-24 md:pb-40 md:pt-32" aria-labelledby="ch-story">
      <div className="gutter mx-auto max-w-[1600px]">
        <ChapterLabel n="03">{s.label}</ChapterLabel>
        <h2 id="ch-story" className="mt-8 font-display leading-[.92] tracking-[-0.03em]">
          <span className="block overflow-hidden pb-[.06em] text-[clamp(2.5rem,5.5vw,5.9rem)] text-burgundy-800"><span className="block" data-reveal="mask">{s.title[0]}</span></span>
          <span className="block overflow-hidden pb-[.1em] pl-[8vw] text-[clamp(1.75rem,3.3vw,3.5rem)] italic text-gold-metal md:pl-[22vw]"><span className="block pr-[.08em]" data-reveal="mask" data-reveal-delay="1">{s.title[1]}</span></span>
        </h2>

        {/* two paths: two arches, staggered, joined by the bands */}
        <div className="relative mt-14 grid grid-cols-2 gap-x-4 md:mt-20 md:grid-cols-12 md:gap-x-8">
          {[marcia, isabella].map((m, i) => (
            <figure key={m.id} className={i === 0 ? "md:col-span-4 md:col-start-2" : "mt-[20vw] md:col-span-4 md:col-start-8 md:mt-[12vw]"}>
              <div data-reveal="fan" data-fan={i ? "r" : undefined} data-reveal-delay={String(i)}>
                <Media id={m.portrait} locale={locale} tone="dark" shape="arch" focus="50% 6%" light={i === 0 ? "left" : "right"} />
              </div>
              <figcaption className="mt-6 md:mt-8">
                <p className="font-display text-[clamp(1.45rem,2.1vw,2.15rem)] leading-[1] text-burgundy-800">{m.fullName}</p>
                <p className="eyebrow mt-3 text-accent">{m.role[locale]}</p>
                <ul className="mt-4 space-y-1.5 text-[15px] leading-snug text-muted md:text-[16px]">
                  {m.facts[locale].map((f) => <li key={f}>{f}</li>)}
                </ul>
              </figcaption>
            </figure>
          ))}

          {/* the connection: the bands cross from one portrait to the other,
              at portrait height, never over names or facts */}
          <div data-bands="connection" className="pointer-events-none absolute left-[10%] top-[26%] z-10 w-[80%] md:left-[22%] md:top-[30%] md:w-[52%]">
            <BrandBands uid="story" draw shadow="soft" surface="light" />
          </div>
        </div>
      </div>

      {/* together: the double portrait, wide, with the line set over it */}
      <div className="relative mt-20 md:mt-28">
        <div data-reveal="fan" data-fan="soft" className="relative">
          <Media id="MOTHER_DAUGHTER_PORTRAIT" locale={locale} tone="dark" focus="50% 30%" light="left" brief className="max-h-[88svh]" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(28,11,4,.75)_0%,rgba(28,11,4,.2)_55%,transparent)]" />
          <p className="gutter absolute left-0 top-1/2 max-w-[18ch] -translate-y-1/2 font-display text-[clamp(1.45rem,2.7vw,2.9rem)] italic leading-[1.08] text-ivory md:max-w-[16ch]">{s.note}</p>
        </div>
      </div>

      <div className="gutter mx-auto mt-16 grid max-w-[1600px] gap-8 md:mt-24 md:grid-cols-12 md:gap-10">
        <p className="display-sm text-burgundy-800 md:col-span-3 md:col-start-2">{s.trajectories}</p>
        <div className="md:col-span-5 md:col-start-6">
          <p className="lede" data-reveal="fade">{s.body}</p>
          <div className="mt-10" data-reveal="fade" data-reveal-delay="1">
            <ButtonLink href={href(locale, "/our-story")} variant="ghost-dark">{dict.cta.readStory}</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
