import Link from "next/link";
import { href, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMeta } from "@/lib/seo";
import { categories, byCategory } from "@/content/catalogue";
import { formatDuration, formatPrice, reviewNote } from "@/lib/format";
import { PageHero } from "@/components/PageHero";
import { Media } from "@/components/Media";
import { Arrow } from "@/components/ui";
import { site } from "@/content/site";
import { Quiz } from "@/components/Quiz";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return pageMeta(locale, "/treatments", d.treatments.title, d.treatments.lead);
}

export default async function TreatmentsPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const links = { fresha: site.links.freshaBooking, treatwell: site.links.treatwell };
  return (
    <>
      <PageHero eyebrow={dict.home.treatments.title} title={[dict.treatments.title]} lead={dict.treatments.lead}>
        <nav aria-label={dict.treatments.jump} className="mt-12 flex flex-wrap gap-2">
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="rounded-full border border-line px-4 py-2 text-[12px] tracking-[.12em] uppercase transition-colors hover:bg-gold-300 hover:text-burgundy-900">{t(c.name, locale)}</a>
          ))}
        </nav>
        <a href="#quiz" className="btn btn-gold mt-10">{dict.quiz.cta}</a>
      </PageHero>

      {/* FIND YOUR TREATMENT — the quiz lives next to the menu it recommends from */}
      <section id="quiz" data-header="light" className="surface-cream scroll-mt-16" aria-labelledby="quiz-title">
        <div className="gutter mx-auto max-w-[1300px] py-20 md:py-28">
          <p className="eyebrow text-accent">{dict.quiz.eyebrow}</p>
          <h2 id="quiz-title" className="display-lg mt-6 max-w-[18ch] text-burgundy-800">{dict.quiz.title}</h2>
          <p className="lede mt-6 max-w-2xl text-muted">{dict.quiz.lead}</p>
          <div className="mt-14 border-t border-line pt-12 md:mt-16"><Quiz locale={locale} dict={dict} /></div>
        </div>
      </section>

      <div data-header="light" className="surface-light">
        {categories.map((c, ci) => (
          <section key={c.id} id={c.id} aria-labelledby={`h-${c.id}`} className={`scroll-mt-20 ${ci % 2 ? "surface-cream" : ""}`}>
            <div className="gutter mx-auto grid max-w-[1600px] gap-12 py-20 md:grid-cols-12 md:py-28">
              <header className="md:col-span-4">
                <div className="md:sticky md:top-28">
                  <p className="eyebrow text-accent">{String(ci + 1).padStart(2, "0")}</p>
                  <h2 id={`h-${c.id}`} className="display-md mt-4 text-burgundy-800" data-reveal="fade">{t(c.name, locale)}</h2>
                  <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">{t(c.intro, locale)}</p>
                </div>
              </header>
              <ul className="md:col-span-8">
                {byCategory(c.id).map((tr, i) => (
                  <li key={tr.slug} id={tr.slug} className="scroll-mt-24 border-t border-line py-8 first:border-t-0 first:pt-0 md:first:border-t md:first:pt-8"
                    data-status={tr.status} data-review-note={reviewNote(tr)}>
                    <div className="grid gap-6 sm:grid-cols-[120px_1fr] md:grid-cols-[140px_1fr]">
                      {/* phones: a wide editorial card image that opens in a fan as it is reached */}
                      <div className="relative aspect-[3/2] overflow-hidden sm:hidden" data-reveal="fan" data-fan={i % 2 ? "r" : undefined}>
                        <Media id={tr.media} locale={locale} tone="dark" fill label={false} light={i % 2 ? "right" : "left"} />
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(28,11,4,0)_50%,rgba(28,11,4,.5))]" />
                      </div>
                      <div className="hidden sm:block" data-reveal="fan"><Media id={tr.media} locale={locale} tone="dark" label={false} /></div>
                      <div>
                        <h3 className="display-sm text-burgundy-800">
                          {tr.detail ? <Link className="link-underline" href={href(locale, `/treatments/${tr.slug}`)}>{t(tr.name, locale)}</Link> : t(tr.name, locale)}
                        </h3>
                        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">{t(tr.summary, locale)}</p>
                        <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-[14px]">
                          {tr.variants.map((v, i) => (
                            <div key={i} className="flex gap-3">
                              <dt className="text-muted">{formatDuration(v, dict)}</dt>
                              <dd className="font-semibold">{formatPrice(v, dict, locale)}</dd>
                            </div>
                          ))}
                        </dl>
                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                          {tr.bookOn.map((p) => (
                            <a key={p} href={links[p]} target="_blank" rel="noopener" className="eyebrow inline-flex items-center gap-3 text-accent hover:text-burgundy-800">
                              {dict.cta.bookOn} {p === "fresha" ? "Fresha" : "Treatwell"} <Arrow />
                            </a>
                          ))}
                          {tr.detail && <Link href={href(locale, `/treatments/${tr.slug}`)} className="eyebrow link-underline text-muted">{dict.cta.details}</Link>}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
