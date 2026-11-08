import Link from "next/link";
import { href, t, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { categories, featured, byCategory } from "@/content/catalogue";
import { reviews, faqs } from "@/content/people-reviews";
import { site } from "@/content/site";
import { Media } from "@/components/Media";
import { ButtonLink, ChapterLabel, SplitHeading } from "@/components/ui";
import { TreatmentCard } from "@/components/TreatmentCard";
import { ReviewCard, RatingBadges } from "@/components/ReviewCard";
import { BookingButtons } from "@/components/BookingButtons";
import { Logo } from "@/components/Logo";

type P = { locale: Locale; dict: Dictionary };

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
