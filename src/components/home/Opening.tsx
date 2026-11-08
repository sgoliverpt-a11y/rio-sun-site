import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { team } from "@/content/people-reviews";
import { brand } from "@/content/assets";
import { Media } from "@/components/Media";
import { ButtonLink } from "@/components/ui";
import { HeroLogo } from "./HeroLogo";

type P = { locale: Locale; dict: Dictionary };

/**
 * Signature device of the redesign: the SOLAR-ARC WINDOW.
 * Every key photograph sits in an arch taken from the logo's sun, and the two
 * gold bands pass in front of it. Same idea in every chapter = recognisable language.
 */

/* Fits two giant words to the viewport whatever the language. */
function wordSizing(words: string[], maxVw: number, widthVw: number) {
  const longest = Math.max(...words.map((w) => w.length));
  const size = Math.min(maxVw, widthVw / (longest * 0.53));
  const second = words[1]?.length ?? 0;
  const indent = Math.max(0, Math.min(widthVw * 0.3, widthVw - second * 0.53 * size));
  return { size, indent };
}

/* ── 00 INTRO — the approved logo motion opens the site (once per session) ── */
export function IntroOverlay({ label }: { label: string }) {
  // Runs before paint: returning visitors and reduced-motion users never see the overlay.
  const pre = `try{if(sessionStorage.getItem('rs-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-done')}else{sessionStorage.setItem('rs-intro','1')}}catch(e){}`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: pre }} />
      <div className="intro surface-dark grain fixed inset-0 z-[45] flex items-center justify-center" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(138,31,51,.55),transparent_70%)]" />
        <HeroLogo className="relative w-[min(84vw,820px)]" />
        <button type="button" className="intro-skip absolute bottom-8 left-1/2 -translate-x-1/2 text-[12px] tracking-[.08em] text-gold-200/70 underline-offset-4 hover:underline"
          tabIndex={-1}>{label}</button>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `document.querySelector('.intro-skip')?.addEventListener('click',function(){document.documentElement.classList.add('intro-done')})` }} />
    </>
  );
}

/* ── 01 HERO ─────────────────────────────────────────────── */
export function Hero({ locale, dict }: P) {
  const h = dict.home.hero;
  const d = wordSizing(h.words, 15.5, 94);
  const m = wordSizing(h.words, 22, 92);
  return (
    <section data-chapter="01" data-header="dark" aria-label={h.title.join(" ")}
      className="hero surface-dark grain relative overflow-hidden md:h-[max(100svh,720px)]"
      style={{ ["--w-d" as string]: `${d.size}vw`, ["--i-d" as string]: `${d.indent}vw`, ["--w-m" as string]: `${m.size}vw`, ["--i-m" as string]: `${m.indent}vw` }}>

      {/* sun glow behind the window */}
      <div aria-hidden className="absolute right-[2vw] top-[2vh] h-[70vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,rgba(246,196,127,.22),rgba(138,31,51,.18)_55%,transparent)] blur-2xl max-md:left-1/2 max-md:w-[120vw] max-md:-translate-x-1/2" />

      {/* THE WINDOW — hero film in the solar arch */}
      <div className="hero-window absolute z-0 max-md:left-1/2 max-md:top-[calc(var(--header-h)+2svh)] max-md:h-[56svh] max-md:w-[78vw] max-md:-translate-x-1/2 md:right-[6vw] md:top-[11svh] md:h-[80svh] md:w-[min(34vw,64svh)]">
        <div className="hidden h-full md:block"><Media id="HERO_VIDEO_DESKTOP" locale={locale} fill shape="arch" priority focus="55% 55%" light="left" /></div>
        <div className="h-full md:hidden"><Media id="HERO_VIDEO_MOBILE" locale={locale} fill shape="arch" priority focus="50% 40%" light="top" /></div>
        {/* thin gold rim = the sun's edge */}
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-t-[9999px] ring-1 ring-inset ring-gold-300/35" />
      </div>

      {/* the two bands pass in front of the window (anchor for BUILD 02 choreography) */}
      <div aria-hidden data-bands="intro" className="hero-bands pointer-events-none absolute z-[2] max-md:left-[-14vw] max-md:top-[calc(var(--header-h)+40svh)] max-md:w-[128vw] md:bottom-[25svh] md:right-[-6vw] md:w-[60vw]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brand.symbol} alt="" className="w-full drop-shadow-[0_18px_30px_rgba(20,0,6,.55)]" />
      </div>

      {/* top-left: what & where + actions (quiet, small) */}
      <div className="gutter relative z-10 mx-auto max-w-[1600px] max-md:pt-[calc(var(--header-h)+60svh)] md:pt-[calc(var(--header-h)+6svh)]">
        <div className="max-w-[26rem] max-md:order-2">
          <p className="lede text-muted max-md:hidden">{h.lede}</p>
          <div className="mt-7 flex flex-wrap gap-3 max-md:hidden">
            <ButtonLink href={href(locale, "/booking")}>{dict.cta.book}</ButtonLink>
            <a href={href(locale, "/treatments")} className="link-underline self-center px-2 py-3 text-[13px] font-semibold tracking-[.14em] uppercase text-ivory">{dict.cta.explore}</a>
          </div>
        </div>
      </div>

      {/* bottom: monumental title across the composition */}
      <div className="relative z-[3] md:absolute md:inset-x-0 md:bottom-[7svh]">
        <h1 className="gutter mx-auto max-w-[1600px] font-display leading-[.8] tracking-[-0.035em]">
          <span className="block pl-[.4vw] font-display text-[clamp(1.25rem,2.6vw,2.6rem)] italic tracking-normal text-gold-300">{h.kicker}</span>
          <span className="hero-word block text-ivory">{h.words[0]}</span>
          <span className="hero-word hero-word-2 block italic text-gold-metal pr-[.06em]">{h.words[1]}</span>
        </h1>
      </div>

      {/* mobile: lede + actions under the title */}
      <div className="gutter relative z-10 pb-12 pt-8 md:hidden">
        <p className="lede text-muted">{h.lede}</p>
        <div className="mt-7 flex flex-col gap-3">
          <ButtonLink href={href(locale, "/booking")}>{dict.cta.book}</ButtonLink>
          <ButtonLink href={href(locale, "/treatments")} variant="ghost-light">{dict.cta.explore}</ButtonLink>
        </div>
      </div>

      {/* bottom-right: location, quiet */}
      <p className="absolute bottom-[7svh] right-[var(--gutter)] z-10 hidden text-right text-[13px] leading-relaxed text-muted lg:block">
        {h.where[0]}<br />{h.where[1]}
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
      <div data-header="dark" className="surface-dark grain relative pb-[20vh] pt-[14vh] md:pb-[30vh] md:pt-[20vh]">
        <div className="gutter mx-auto max-w-[1600px]">
          <p className="mb-10 font-display text-lg italic text-gold-300 md:mb-14">{p.label}</p>
          <p className="max-w-[17ch] font-display text-[clamp(2.1rem,5.6vw,6.2rem)] leading-[1.02] tracking-[-0.02em] md:max-w-[19ch]" data-draft data-review-note="DRAFT COPY: brand voice, to be approved">
            <span data-reveal="fade" className="block">{s1}</span>
            <span data-reveal="fade" data-reveal-delay="1" className="mt-[.25em] block italic text-gold-300">{rest.join(" ")}</span>
          </p>
        </div>
      </div>

      {/* B — the light: editorial */}
      <div data-header="light" className="surface-light relative pb-28 md:pb-40">
        {/* SEAM — the bands carry the light from burgundy into ivory */}
        <div aria-hidden data-bands="transition" className="pointer-events-none absolute left-1/2 top-0 z-20 w-[124vw] -translate-x-1/2 -translate-y-[58%] md:w-[96vw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brand.symbol} alt="" className="w-full drop-shadow-[0_24px_40px_rgba(20,0,6,.45)]" loading="lazy" />
        </div>
        {/* the photograph straddles the seam: half night, half day */}
        <div className="gutter relative mx-auto max-w-[1600px]">
          <div className="relative z-10 ml-auto w-[62vw] -translate-y-[38%] md:absolute md:right-[calc(var(--gutter)+2vw)] md:top-0 md:w-[30vw] md:max-w-[520px] md:-translate-y-[72%]">
            <Media id="PHILOSOPHY_HANDS_IMAGE" locale={locale} tone="dark" shape="arch" focus="45% 60%" light="right" brief />
          </div>
        </div>

        <div className="gutter mx-auto max-w-[1600px] max-md:-mt-[18vw] md:pt-[16vw]">
          <h2 id="ch-philosophy" className="font-display text-[clamp(4rem,13.5vw,15rem)] leading-[.82] tracking-[-0.04em] text-burgundy-800">
            <span className="block overflow-hidden pb-[.06em]"><span className="block" data-reveal="mask">{p.title.split(" ")[0]}</span></span>
            <span className="block overflow-hidden pb-[.08em] pl-[12vw] md:pl-[16vw]"><span className="block italic" data-reveal="mask" data-reveal-delay="1">{p.title.split(" ").slice(1).join(" ")}</span></span>
          </h2>

          <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12">
            {p.body.map((b, i) => (
              <p key={i} className={`text-[17px] leading-[1.7] text-muted md:col-span-4 ${i === 0 ? "md:col-start-2" : "md:col-start-6"}`} data-reveal="fade" data-reveal-delay={String(i)}>{b}</p>
            ))}
          </div>

          {/* three qualities, as type — the section keeps its character without images */}
          <ul className="mt-24 grid border-t border-line md:mt-36 md:grid-cols-3">
            {p.pillars.map((x, i) => (
              <li key={x.k} className={`border-b border-line py-10 md:border-b-0 md:py-14 ${i > 0 ? "md:border-l md:pl-10" : "md:pr-10"}`}>
                <p className="font-display text-[clamp(3rem,6.4vw,6.5rem)] leading-[.9] tracking-[-0.03em] text-burgundy-800" data-reveal="fade" data-reveal-delay={String(i)}>{x.k}.</p>
                <p className="mt-6 max-w-[28ch] text-[15px] leading-relaxed text-muted">{x.v}</p>
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
    <section data-chapter="03" data-header="light" className="surface-cream relative overflow-hidden pb-28 pt-24 md:pb-40 md:pt-36">
      <div className="gutter mx-auto max-w-[1600px]">
        <p className="font-display text-lg italic text-accent">{s.label}</p>
        <h2 className="mt-8 font-display text-[clamp(3.4rem,11.5vw,13rem)] leading-[.84] tracking-[-0.04em] text-burgundy-800">
          <span className="block overflow-hidden pb-[.06em]"><span className="block" data-reveal="mask">{s.title[0]}</span></span>
        </h2>

        {/* two paths: two arches, staggered, joined by the bands */}
        <div className="relative mt-12 grid grid-cols-2 gap-x-4 md:mt-20 md:grid-cols-12 md:gap-x-8">
          {[marcia, isabella].map((m, i) => (
            <figure key={m.id} className={i === 0 ? "md:col-span-4 md:col-start-2" : "mt-[22vw] md:col-span-4 md:col-start-8 md:mt-[16vw]"}>
              <div data-reveal="mask">
                <Media id={m.portrait} locale={locale} tone="dark" shape="arch" focus={i === 0 ? "52% 38%" : "48% 38%"} light={i === 0 ? "left" : "right"} />
              </div>
              <figcaption className="mt-6 md:mt-8">
                <p className="text-[13px] italic text-accent font-display md:text-[15px]">{m.role[locale]}</p>
                <p className="mt-1 font-display text-[clamp(1.7rem,3.4vw,3.4rem)] leading-[.95] text-burgundy-800">{m.fullName}</p>
                <ul className="mt-4 space-y-1 text-[14px] leading-snug text-muted md:text-[15px]">
                  {m.facts[locale].map((f) => <li key={f}>{f}</li>)}
                </ul>
              </figcaption>
            </figure>
          ))}

          {/* the connection: two bands crossing from one path to the other */}
          <div aria-hidden data-bands="connection" className="pointer-events-none absolute left-[-6%] top-[16%] z-10 w-[112%] md:left-[8%] md:top-[12%] md:w-[84%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.symbol} alt="" className="w-full drop-shadow-[0_20px_30px_rgba(63,0,11,.35)]" loading="lazy" />
          </div>
        </div>

        <h2 className="mt-16 text-right font-display text-[clamp(3.4rem,11.5vw,13rem)] italic leading-[.84] tracking-[-0.04em] text-gold-metal md:mt-10" aria-hidden>
          <span className="block overflow-hidden pb-[.1em] pr-[.08em]"><span className="block" data-reveal="mask">{s.title[1]}</span></span>
        </h2>
      </div>

      {/* together: the double portrait, wide, with the line set over it */}
      <div className="relative mt-20 md:mt-28">
        <div data-reveal="mask" className="relative">
          <Media id="MOTHER_DAUGHTER_PORTRAIT" locale={locale} tone="dark" focus="50% 42%" light="left" brief className="max-h-[92svh]" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(28,1,7,.75)_0%,rgba(28,1,7,.2)_55%,transparent)]" />
          <p className="gutter absolute left-0 top-1/2 max-w-[18ch] -translate-y-1/2 font-display text-[clamp(1.8rem,4.4vw,4.8rem)] italic leading-[1.02] text-ivory md:max-w-[14ch]">{s.note}</p>
        </div>
      </div>

      <div className="gutter mx-auto mt-16 grid max-w-[1600px] gap-10 md:mt-24 md:grid-cols-12">
        <p className="font-display text-xl text-burgundy-800 md:col-span-3 md:col-start-2">{s.trajectories}</p>
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
