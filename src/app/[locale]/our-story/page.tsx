import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMeta } from "@/lib/seo";
import { team } from "@/content/people-reviews";
import { PageHero } from "@/components/PageHero";
import { Media } from "@/components/Media";
import { BrandBands } from "@/components/brand/BrandBands";
import { ButtonLink } from "@/components/ui";
import { href } from "@/i18n/config";
import { site } from "@/content/site";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return pageMeta(locale, "/our-story", d.nav.story, d.story.lead);
}

export default async function OurStory({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const s = dict.story;
  return (
    <>
      <PageHero eyebrow={dict.nav.story} title={s.title} lead={s.lead} />

      <section data-header="light" className="surface-cream relative overflow-hidden">
        <div className="gutter mx-auto max-w-[1600px] py-20 md:py-28">
          <div className="overflow-hidden" data-reveal="mask">
            <div data-parallax="0.1" className="scale-[1.1]"><Media id="MOTHER_DAUGHTER_PORTRAIT" locale={locale} tone="dark" /></div>
          </div>
          <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-24" data-draft data-review-note="DRAFT: story to be written with Marcia & Isabella">
            {[s.sections.origins, s.sections.method].map((x) => (
              <article key={x.k} data-reveal="fade">
                <h2 className="display-md text-burgundy-800">{x.k}</h2>
                <p className="lede mt-6 text-muted">{x.v}</p>
              </article>
            ))}
          </div>
        </div>
        <div aria-hidden data-bands="connection" className="pointer-events-none mx-auto w-[min(80%,720px)]"><BrandBands uid="our-story" arc draw shadow="none" surface="light" /></div>
      </section>

      <section data-header="light" className="surface-light">
        <div className="gutter mx-auto max-w-[1600px] py-20 md:py-28">
          <h2 className="eyebrow text-accent">{s.team}</h2>
          <div className="mt-10 grid gap-14 md:grid-cols-2">
            {team.map((m, i) => (
              <article key={m.id} className={i === 1 ? "md:mt-24" : ""}>
                <div className="overflow-hidden" data-reveal="mask"><Media id={m.portrait} locale={locale} tone="dark" /></div>
                <h3 className="display-md mt-8 text-burgundy-800">{m.name}</h3>
                <ul className="mt-5 space-y-2 text-[16px]">
                  {m.facts[locale].map((f) => <li key={f} className="flex gap-3"><span aria-hidden className="text-accent">—</span>{f}</li>)}
                </ul>
                <a href={site.links.treatwell} target="_blank" rel="noopener" className="eyebrow link-underline mt-6 inline-block text-muted">Treatwell profile</a>
              </article>
            ))}
          </div>
          <p className="mt-16 text-[14px] text-muted" data-draft data-review-note="TO CONFIRM: who is mother / daughter; qualifications; photos">{s.pending}</p>
          <div className="mt-12"><ButtonLink href={href(locale, "/booking")} variant="burgundy">{dict.cta.book}</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
