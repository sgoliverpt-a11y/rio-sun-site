import Link from "next/link";
import { notFound } from "next/navigation";
import { href, locales, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMeta } from "@/lib/seo";
import { detailSlugs, getTreatment, treatments, categories } from "@/content/catalogue";
import { faqs } from "@/content/people-reviews";
import { formatDuration, formatPrice, reviewNote } from "@/lib/format";
import { Media } from "@/components/Media";
import { BookingButtons } from "@/components/BookingButtons";
import { TreatmentCard } from "@/components/TreatmentCard";
import { SplitHeading } from "@/components/ui";
import { Bands } from "@/components/Bands";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => detailSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const tr = getTreatment(slug);
  if (!tr) return {};
  return pageMeta(locale, `/treatments/${slug}`, t(tr.name, locale), t(tr.summary, locale));
}

export default async function TreatmentDetail({ params }: Props) {
  const { locale, slug } = await params;
  const tr = getTreatment(slug);
  if (!tr || !tr.detail) notFound();
  const dict = getDictionary(locale);
  const cat = categories.find((c) => c.id === tr.category)!;
  const specialist = tr.category === "specialist-care";
  const related = treatments.filter((x) => x.detail && x.slug !== tr.slug).slice(0, 3);
  const relevantFaqs = faqs.filter((f) => f.tags.includes(specialist ? "specialist" : "lymphatic") || f.tags.includes("general")).slice(0, 4);

  return (
    <>
      <section data-header="dark" className="surface-dark grain relative overflow-hidden pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]">
        <Bands moment="transition" className="absolute -left-[10%] top-[30%] h-[60%] w-[70%]" opacity={0.25} align="left" />
        <div className="gutter relative mx-auto grid max-w-[1600px] gap-12 pb-16 md:grid-cols-12 md:pb-24">
          <div className="md:col-span-6 md:pt-10">
            <nav aria-label="Breadcrumb" className="eyebrow text-muted">
              <Link href={href(locale, "/treatments")} className="link-underline">{dict.nav.treatments}</Link>
              <span aria-hidden className="mx-3">/</span>
              <Link href={href(locale, "/treatments") + `#${cat.id}`} className="link-underline">{t(cat.name, locale)}</Link>
            </nav>
            <SplitHeading as="h1" lines={[t(tr.name, locale)]} className="display-lg mt-8 md:!text-[clamp(2.2rem,3.6vw,3.7rem)]" />
            <p className="lede mt-8 max-w-xl text-muted" data-reveal="fade">{t(tr.summary, locale)}</p>

            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden border-y border-line" data-status={tr.status} data-review-note={reviewNote(tr)}>
              <div className="py-5">
                <dt className="eyebrow text-accent">{dict.detail.duration}</dt>
                <dd className="mt-2 font-display text-xl">{tr.variants.map((v) => formatDuration(v, dict)).join(" / ")}</dd>
              </div>
              <div className="border-l border-line py-5 pl-6">
                <dt className="eyebrow text-accent">{dict.detail.price}</dt>
                <dd className="mt-2 font-display text-xl">{tr.variants.map((v) => formatPrice(v, dict, locale)).join(" / ")}</dd>
              </div>
            </dl>
            <BookingButtons dict={dict} on={tr.bookOn} className="mt-10" />
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <div className="overflow-hidden" data-reveal="mask"><Media id={tr.media} locale={locale} tone="dark" priority /></div>
          </div>
        </div>
      </section>

      <section data-header="light" className="surface-light">
        <div className="gutter mx-auto grid max-w-[1600px] gap-14 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-5">
            <h2 className="display-md text-burgundy-800" data-reveal="fade">{dict.detail.whatToExpect}</h2>
            <ol className="mt-8 space-y-6" data-draft data-review-note="DRAFT: Rio Sun to describe each protocol step">
              {dict.detail.expect.map((e, i) => (
                <li key={i} className="flex gap-5 border-t border-line pt-5">
                  <span className="font-display italic text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[16px] leading-relaxed">{e}</span>
                </li>
              ))}
            </ol>
            {specialist && (
              <aside className="mt-10 border-l-2 border-gold-500 bg-cream p-6 text-[15px] leading-relaxed">
                <p className="eyebrow text-accent">{dict.detail.care}</p>
                <p className="mt-3">{dict.detail.careSpecialist}</p>
              </aside>
            )}
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 className="display-md text-burgundy-800" data-reveal="fade">{dict.detail.faq}</h2>
            <div className="mt-8 border-t border-line" data-draft data-review-note="DRAFT FAQ">
              {relevantFaqs.map((f, i) => (
                <details key={i} className="group border-b border-line" name="faq">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg [&::-webkit-details-marker]:hidden">
                    {t(f.q, locale)}<span aria-hidden className="text-accent transition-transform duration-500 group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-6 pr-8 text-[15px] leading-relaxed text-muted">{t(f.a, locale)}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-header="light" className="surface-cream">
        <div className="gutter mx-auto max-w-[1600px] py-20 md:py-28">
          <h2 className="display-md text-burgundy-800">{dict.detail.related}</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <TreatmentCard key={r.slug} tr={r} locale={locale} dict={dict} />)}
          </div>
        </div>
      </section>
    </>
  );
}
