import { notFound } from "next/navigation";
import { locales, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMeta } from "@/lib/seo";
import { legalDocs } from "@/content/legal";
import { PageHero } from "@/components/PageHero";

type Doc = keyof typeof legalDocs;
type Props = { params: Promise<{ locale: Locale; doc: Doc }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => (Object.keys(legalDocs) as Doc[]).map((doc) => ({ locale, doc })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, doc } = await params;
  const d = legalDocs[doc];
  return d ? pageMeta(locale, `/legal/${doc}`, t(d.title, locale), t(d.title, locale)) : {};
}

export default async function Legal({ params }: Props) {
  const { locale, doc } = await params;
  const d = legalDocs[doc];
  if (!d) notFound();
  const dict = getDictionary(locale);
  return (
    <>
      <PageHero title={[t(d.title, locale)]} bands={false} />
      <section data-header="light" className="surface-light">
        <div className="gutter mx-auto max-w-3xl py-20">
          <p className="mb-12 border-l-2 border-gold-500 bg-cream p-4 text-[13px]" data-draft data-review-note="LEGAL REVIEW REQUIRED">{dict.legal.draft}</p>
          {d.sections.map((s) => (
            <section key={t(s.h, "en")} className="border-t border-line py-8">
              <h2 className="display-sm text-burgundy-800">{t(s.h, locale)}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">{t(s.p, locale)}</p>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
