import Link from "next/link";
import { href, t, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { categories, featured, byCategory } from "@/content/catalogue";
import { reviews, faqs } from "@/content/people-reviews";
import { site } from "@/content/site";
import { Media } from "@/components/Media";
import { Bands } from "@/components/Bands";
import { ButtonLink, ChapterLabel, SplitHeading } from "@/components/ui";
import { TreatmentCard } from "@/components/TreatmentCard";
import { ReviewCard, RatingBadges } from "@/components/ReviewCard";
import { BookingButtons } from "@/components/BookingButtons";
import { Logo } from "@/components/Logo";
import { HeroLogo } from "./HeroLogo";

type P = { locale: Locale; dict: Dictionary };

/* ── 01 HERO ─────────────────────────────────────────────── */
export function Hero({ locale, dict }: P) {
  const h = dict.home.hero;
  return (
    <section data-chapter="01" data-header="dark" className="surface-dark grain relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Background film: desktop 16:9 / mobile 9:16 (separate compositions) */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 hidden md:block"><Media id="HERO_VIDEO_DESKTOP" locale={locale} fill label={false} priority /></div>
        <div className="absolute inset-0 md:hidden"><Media id="HERO_VIDEO_MOBILE" locale={locale} fill label={false} priority /></div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,1,10,.55)_0%,rgba(34,1,10,.15)_35%,rgba(34,1,10,.35)_65%,rgba(34,1,10,.92)_100%)]" />
      </div>
      <span className="absolute right-[var(--gutter)] top-[calc(var(--header-h)+1rem)] z-10 font-mono text-[10px] uppercase tracking-[.18em] text-gold-200/50">HERO_VIDEO_DESKTOP · HERO_VIDEO_MOBILE</span>

      <div className="gutter relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col pt-[calc(var(--header-h)+3rem)] pb-10 md:pb-14">
        <div className="flex flex-1 items-center justify-center">
          <HeroLogo className="max-w-[min(78vw,640px)] md:max-w-[min(52vw,720px)]" />
        </div>

        <div className="mt-10 grid items-end gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <p className="eyebrow text-accent" data-reveal="fade">{h.eyebrow}</p>
            <SplitHeading as="h2" lines={h.title} accentLast className="display-lg mt-5" />
          </div>
          <div className="md:col-span-5 md:pb-3">
            <p className="lede max-w-md text-muted" data-reveal="fade" data-reveal-delay="1">{h.lede}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row" data-reveal="fade" data-reveal-delay="2">
              <ButtonLink href={href(locale, "/booking")}>{dict.cta.book}</ButtonLink>
              <ButtonLink href={href(locale, "/treatments")} variant="ghost-light">{dict.cta.explore}</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 02 PHILOSOPHY ───────────────────────────────────────── */
export function Philosophy({ locale, dict }: P) {
  const p = dict.home.philosophy;
  return (
    <section data-chapter="02" aria-labelledby="ch-philosophy">
      {/* Transition burgundy → ivory, carried by the bands */}
      <div data-header="dark" className="relative h-[34vh] min-h-56 overflow-hidden bg-[linear-gradient(180deg,#22010a_0%,#3f000b_45%,#7a3a2c_78%,#f7f1e7_100%)]">
        <Bands moment="transition" className="absolute -left-[12%] bottom-[-6%] h-[120%] w-[124%]" opacity={0.9} />
      </div>

      <div data-header="light" className="surface-light gutter mx-auto max-w-[1600px] pb-28 pt-16 md:pb-40 md:pt-24">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <ChapterLabel n="02">{p.label}</ChapterLabel>
            <SplitHeading lines={[p.title]} className="display-lg mt-8 text-burgundy-800" />
            <p className="display-sm mt-10 max-w-2xl" data-reveal="fade" data-draft data-review-note="DRAFT COPY: brand voice, to be approved">{p.lead}</p>
            <div className="mt-10 grid max-w-2xl gap-6 text-[16px] leading-relaxed text-muted sm:grid-cols-2">
              {p.body.map((b, i) => <p key={i} data-reveal="fade" data-reveal-delay={String(i + 1)}>{b}</p>)}
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pt-24">
            <div className="overflow-hidden" data-reveal="mask">
              <div data-parallax="0.12" className="scale-[1.12]"><Media id="PHILOSOPHY_HANDS_IMAGE" locale={locale} tone="dark" /></div>
            </div>
          </div>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden border-y border-line md:mt-28 md:grid-cols-3">
          {p.pillars.map((x, i) => (
            <li key={x.k} className="py-8 md:px-8 md:first:pl-0 md:[&:not(:first-child)]:border-l md:border-line" data-reveal="fade" data-reveal-delay={String(i)}>
              <p className="font-display text-2xl italic text-burgundy-800">{x.k}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{x.v}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 03 OUR STORY ────────────────────────────────────────── */
export function Story({ locale, dict }: P) {
  const s = dict.home.story;
  return (
    <section data-chapter="03" data-header="light" className="surface-cream relative overflow-hidden pb-28 pt-24 md:pb-40 md:pt-32">
      <div className="gutter mx-auto max-w-[1600px]">
        <ChapterLabel n="03">{s.label}</ChapterLabel>
        <SplitHeading lines={s.title} accentLast className="display-xl mt-8 text-burgundy-800" />
      </div>

      <div className="relative mt-14 md:mt-20">
        <div className="gutter mx-auto max-w-[1600px]">
          <div className="overflow-hidden" data-reveal="mask">
            <div data-parallax="0.1" className="scale-[1.1]"><Media id="MOTHER_DAUGHTER_PORTRAIT" locale={locale} tone="dark" priority={false} /></div>
          </div>
        </div>
        {/* Two bands = two generations: crossing the portrait's lower edge */}
        <Bands moment="connection" className="absolute -bottom-[12%] right-[-6%] h-[42%] w-[70%] md:h-[48%] md:w-[52%]" />
      </div>

      <div className="gutter mx-auto mt-16 grid max-w-[1600px] gap-10 md:mt-24 md:grid-cols-12">
        <p className="font-display text-2xl italic text-burgundy-800 md:col-span-4" data-reveal="fade">{s.note}</p>
        <div className="md:col-span-6 md:col-start-7">
          <p className="lede" data-reveal="fade">{s.body}</p>
          <div className="mt-10" data-reveal="fade" data-reveal-delay="1">
            <ButtonLink href={href(locale, "/our-story")} variant="ghost-dark">{dict.cta.readStory}</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 04 TREATMENTS ───────────────────────────────────────── */
export function Treatments({ locale, dict }: P) {
  const s = dict.home.treatments;
  const list = featured();
  return (
    <section data-chapter="04" data-header="light" className="surface-light pb-28 pt-24 md:pb-40 md:pt-32" aria-labelledby="ch-treatments">
      <div className="gutter mx-auto max-w-[1600px]">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <ChapterLabel n="04">{s.label}</ChapterLabel>
            <SplitHeading lines={[s.title]} className="display-lg mt-8 text-burgundy-800" />
          </div>
          <p className="lede text-muted md:col-span-4" data-reveal="fade">{s.lead}</p>
        </div>

        <div className="rail -mx-[var(--gutter)] mt-16 flex gap-6 overflow-x-auto px-[var(--gutter)] md:mx-0 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:px-0">
          {list.map((tr, i) => (
            <div key={tr.slug} className={`w-[78vw] shrink-0 sm:w-[46vw] md:w-auto ${i === 1 ? "md:mt-20" : ""}`}>
              <TreatmentCard tr={tr} locale={locale} dict={dict} index={i} />
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-line pt-10 md:mt-28">
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <li key={c.id} data-reveal="fade">
                <Link href={href(locale, "/treatments") + `#${c.id}`} className="group block">
                  <span className="eyebrow text-accent">{String(byCategory(c.id).length).padStart(2, "0")}</span>
                  <span className="mt-2 block font-display text-xl text-burgundy-800 transition-colors group-hover:text-gold-700">{t(c.name, locale)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12"><ButtonLink href={href(locale, "/treatments")} variant="burgundy">{dict.cta.allTreatments}</ButtonLink></div>
        </div>
      </div>
    </section>
  );
}

/* ── 05 EXPERTISE ────────────────────────────────────────── */
export function Expertise({ locale, dict }: P) {
  const s = dict.home.expertise;
  const vids = ["EXPERTISE_VIDEO_01", "EXPERTISE_VIDEO_02", "EXPERTISE_VIDEO_03"] as const;
  return (
    <section data-chapter="05" data-header="dark" className="surface-dark grain pb-28 pt-24 md:pb-40 md:pt-32">
      <div className="gutter mx-auto max-w-[1600px]">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <ChapterLabel n="05">{s.label}</ChapterLabel>
            <SplitHeading lines={[s.title]} accentLast className="display-lg mt-8" />
          </div>
          <p className="lede text-muted md:col-span-5" data-reveal="fade">{s.lead}</p>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <ul className="rail -mx-[var(--gutter)] flex gap-4 overflow-x-auto px-[var(--gutter)] lg:col-span-7 lg:mx-0 lg:px-0">
            {vids.map((v, i) => (
              <li key={v} className="w-[64vw] shrink-0 sm:w-[38vw] lg:w-auto lg:flex-1" data-reveal="fade" data-reveal-delay={String(i)}>
                <button type="button" className="group relative block w-full overflow-hidden text-left" aria-label={`${dict.cta.watch}: ${s.videos[i]}`}>
                  <Media id={v} locale={locale} tone="dark" />
                  <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold-300/60 text-gold-200 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                    <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden><path d="M0 0l14 8-14 8z" fill="currentColor" /></svg>
                  </span>
                </button>
                <p className="mt-4 font-display text-lg leading-snug">{s.videos[i]}</p>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-5">
            <h3 className="eyebrow text-accent">{s.faqTitle}</h3>
            <div className="mt-6 border-t border-line" data-draft data-review-note="DRAFT FAQ: answers to be approved by Rio Sun">
              {faqs.slice(0, 5).map((f, i) => (
                <details key={i} className="group border-b border-line" name="faq">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg [&::-webkit-details-marker]:hidden">
                    {t(f.q, locale)}
                    <span aria-hidden className="relative h-3 w-3 shrink-0 text-gold-300"><span className="absolute top-1/2 h-px w-3 bg-current" /><span className="absolute left-1/2 h-3 w-px bg-current transition-transform duration-500 group-open:rotate-90" /></span>
                  </summary>
                  <p className="pb-6 pr-8 text-[15px] leading-relaxed text-muted">{t(f.a, locale)}</p>
                </details>
              ))}
            </div>
            <Link href={href(locale, "/journal")} className="eyebrow link-underline mt-8 inline-block text-accent">{dict.cta.journal}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 06 EXPERIENCE ───────────────────────────────────────── */
export function Experience({ locale, dict }: P) {
  const s = dict.home.experience;
  return (
    <section data-chapter="06" data-header="light" className="surface-light pb-28 pt-24 md:pb-40 md:pt-32">
      <div className="gutter mx-auto max-w-[1600px]">
        <ChapterLabel n="06">{s.label}</ChapterLabel>
        <div className="mt-8 grid items-end gap-8 md:grid-cols-12">
          <SplitHeading lines={[s.title]} className="display-lg text-burgundy-800 md:col-span-8" />
          <p className="lede text-muted md:col-span-4" data-reveal="fade">{s.lead}</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
          <div className="overflow-hidden md:col-span-8" data-reveal="mask">
            <div data-parallax="0.08" className="scale-[1.08]"><Media id="EXPERIENCE_ROOM_IMAGE" locale={locale} tone="dark" /></div>
          </div>
          <div className="grid grid-cols-2 gap-6 md:col-span-4 md:grid-cols-1 md:gap-8">
            <div className="overflow-hidden" data-reveal="mask" data-reveal-delay="1"><Media id="EXPERIENCE_TEA_IMAGE" locale={locale} tone="light" /></div>
            <div className="overflow-hidden md:hidden" data-reveal="mask" data-reveal-delay="2"><Media id="EXPERIENCE_TOWELS_IMAGE" locale={locale} tone="dark" /></div>
          </div>
        </div>

        <ol className="mt-16 grid gap-10 md:grid-cols-3" data-draft data-review-note="DRAFT: confirm the real hospitality details (tea, towels, etc.)">
          {s.details.map((d, i) => (
            <li key={d.k} data-reveal="fade" data-reveal-delay={String(i)} className="border-t border-line pt-6">
              <p className="eyebrow text-accent">{String(i + 1).padStart(2, "0")} · {d.k}</p>
              <p className="mt-4 text-[16px] leading-relaxed">{d.v}</p>
            </li>
          ))}
        </ol>

        <div className="mt-28 md:mt-36">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h3 className="display-md max-w-xl text-burgundy-800" data-reveal="fade">{s.reviewsTitle}</h3>
            <RatingBadges dict={dict} />
          </div>
          <ul className="rail -mx-[var(--gutter)] mt-12 flex gap-8 overflow-x-auto px-[var(--gutter)] pb-2">
            {reviews.slice(0, 6).map((r, i) => (
              <li key={i} className="w-[82vw] shrink-0 sm:w-[44vw] lg:w-[30vw]"><ReviewCard r={r} dict={dict} /></li>
            ))}
          </ul>
          <a href={site.links.treatwellReviews} target="_blank" rel="noopener" className="eyebrow link-underline mt-10 inline-block text-accent">{dict.cta.allReviews}</a>
        </div>
      </div>
    </section>
  );
}

/* ── 07 INVITATION ───────────────────────────────────────── */
export function Invitation({ locale, dict }: P) {
  const s = dict.home.invitation;
  return (
    <section data-chapter="07" data-header="dark" className="surface-dark grain relative overflow-hidden pb-28 pt-28 text-center md:pb-36 md:pt-40">
      <div className="gutter mx-auto max-w-[1100px]">
        <ChapterLabel n="07" className="justify-center">{s.label}</ChapterLabel>
        {/* The bands return to the original lockup */}
        <div data-bands="outro" className="mx-auto mt-14 w-[min(76vw,560px)]" data-reveal="fade">
          <Logo className="h-auto w-full" />
        </div>
        <SplitHeading lines={s.title} accentLast className="display-lg mt-16" />
        <p className="lede mx-auto mt-8 max-w-xl text-muted" data-reveal="fade">{s.lead}</p>
        <div className="mt-10 flex justify-center" data-reveal="fade" data-reveal-delay="1">
          <BookingButtons dict={dict} className="justify-center" />
        </div>
        <p className="eyebrow mt-14 text-muted" data-reveal="fade">
          {dict.common.insideCullinan} · {site.venue.street}, {site.venue.postcode}
        </p>
      </div>
    </section>
  );
}
