import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMeta } from "@/lib/seo";
import { faqs } from "@/content/people-reviews";
import { PageHero } from "@/components/PageHero";
import { Media } from "@/components/Media";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return pageMeta(locale, "/journal", d.journal.title, d.journal.lead);
}

/**
 * Journal — BUILD 01 structure. Content source planned for BUILD 03:
 * MDX files in /content/journal (git-based, no CMS cost) or a Supabase table if
 * the client wants to publish without a developer.
 */
export default async function Journal({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const vids = ["EXPERTISE_VIDEO_01", "EXPERTISE_VIDEO_02", "EXPERTISE_VIDEO_03"] as const;
  return (
    <>
      <PageHero eyebrow={dict.home.expertise.title} title={[dict.journal.title]} lead={dict.journal.lead} />
      <section data-header="light" className="surface-light">
        <div className="gutter mx-auto max-w-[1600px] py-20 md:py-28">
          <h2 className="eyebrow text-accent">{dict.journal.videos}</h2>
          <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10">
            {vids.map((v, i) => (
              <li key={v}>
                <Media id={v} locale={locale} tone="dark" />
                <p className="mt-4 font-display text-lg leading-snug text-burgundy-800">{dict.home.expertise.videos[i]}</p>
              </li>
            ))}
          </ul>

          <h2 className="eyebrow mt-24 text-accent">{dict.journal.articles}</h2>
          <ul className="mt-6 border-t border-line">
            {dict.journal.articlePlaceholders.map((a, i) => (
              <li key={a} className="flex items-baseline justify-between gap-6 border-b border-line py-7">
                <span className="flex items-baseline gap-6"><span className="font-display italic text-accent">{String(i + 1).padStart(2, "0")}</span><span className="display-sm text-burgundy-800">{a}</span></span>
                <span className="eyebrow shrink-0 text-muted">{dict.journal.soon}</span>
              </li>
            ))}
          </ul>

          <h2 className="eyebrow mt-24 text-accent">{dict.home.expertise.faqTitle}</h2>
          <div className="mt-6 grid gap-x-16 border-t border-line md:grid-cols-2">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-line py-7">
                <h3 className="font-display text-xl text-burgundy-800">{t(f.q, locale)}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{t(f.a, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
