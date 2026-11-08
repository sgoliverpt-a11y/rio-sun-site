import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMeta } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { Media } from "@/components/Media";
import { MapEmbed } from "@/components/MapEmbed";
import { BookingButtons } from "@/components/BookingButtons";
import { ContactForm } from "@/components/ContactForm";
import Link from "next/link";
import { href } from "@/i18n/config";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return pageMeta(locale, "/contact", d.contact.title, d.contact.lead);
}

export default async function Contact({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const c = dict.contact;
  return (
    <>
      <PageHero eyebrow={dict.common.insideCullinan} title={[c.title]} lead={c.lead} />
      <section data-header="light" className="surface-light">
        <div className="gutter mx-auto grid max-w-[1600px] gap-14 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-5">
            <dl className="divide-y divide-[var(--surface-line)] border-y border-line">
              <div className="py-7">
                <dt className="eyebrow text-accent">{c.address}</dt>
                <dd className="mt-3 font-display text-2xl leading-snug text-burgundy-800">
                  Rio Sun Massage Therapy<br />
                  <span className="text-[1.1rem] text-muted">{dict.common.insideCullinan}</span><br />
                  {site.venue.street}<br />{site.venue.city} {site.venue.postcode}
                </dd>
                <dd className="mt-4"><a className="eyebrow link-underline text-accent" href={site.venue.mapsUrl} target="_blank" rel="noopener">{dict.cta.directions}</a></dd>
              </div>
              <div className="py-7"><dt className="eyebrow text-accent">{c.gettingHere}</dt><dd className="mt-3 text-[16px] leading-relaxed">{c.gettingHereText}</dd></div>
              <div className="py-7" data-status="conflict" data-review-note="CONFLICT: hours differ between Fresha and Treatwell, see data report"><dt className="eyebrow text-accent">{c.hours}</dt><dd className="mt-3 text-[16px] leading-relaxed">{c.hoursText}</dd></div>
              <div className="py-7"><dt className="eyebrow text-accent">{c.language}</dt><dd className="mt-3 text-[16px]">{c.languageText}</dd></div>
              <div className="py-7">
                <dt className="eyebrow text-accent">{c.contactTitle}</dt>
                <dd className="mt-3 text-[16px] leading-relaxed text-muted">{c.contactPending}</dd>
                <dd className="mt-5 grid gap-3 text-[17px]">
                  <span><span className="mr-3 text-[13px] text-muted">{c.phone}</span><a className="link-underline font-display text-[1.35rem] text-burgundy-800" href={site.contact.phoneHref}>{site.contact.phone}</a></span>
                  <span><span className="mr-3 text-[13px] text-muted">{c.email}</span><a className="link-underline break-all text-burgundy-800" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></span>
                  <span><span className="mr-3 text-[13px] text-muted">{c.whatsapp}</span><a className="link-underline text-burgundy-800" href={`${site.contact.whatsapp}?text=${encodeURIComponent(dict.whatsapp.message)}`} target="_blank" rel="noopener">{site.contact.phone}</a></span>
                  <span><span className="mr-3 text-[13px] text-muted">Instagram</span><a className="link-underline text-burgundy-800" href={site.links.instagram} target="_blank" rel="noopener">@riosunmassagetherapy</a></span>
                </dd>
              </div>
            </dl>
            <p className="mt-8 text-[13px] leading-relaxed text-muted">{c.venueNote}</p>
            <BookingButtons dict={dict} tone="light" className="mt-10" />
          </div>
          <div className="space-y-6 md:col-span-6 md:col-start-7">
            <MapEmbed src={site.venue.mapEmbed} title={c.mapTitle} cta={c.loadMap} note={c.mapConsent} />
            <Media id="CONTACT_EXTERIOR_IMAGE" locale={locale} tone="light" />
          </div>
        </div>
      </section>

      <section data-header="light" className="surface-cream" aria-labelledby="contact-form">
        <div className="gutter mx-auto grid max-w-[1600px] gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <h2 id="contact-form" className="display-md text-burgundy-800">{c.form.title}</h2>
            <p className="mt-6 text-[16px] leading-relaxed text-muted">{c.form.lead}</p>
            <Link href={href(locale, "/treatments") + "#quiz"} className="eyebrow link-underline mt-8 inline-block text-accent">{dict.home.treatments.quiz}</Link>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ContactForm locale={locale} dict={dict} />
          </div>
        </div>
      </section>
    </>
  );
}
