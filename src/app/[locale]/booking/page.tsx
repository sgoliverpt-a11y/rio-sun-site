import Link from "next/link";
import { href, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMeta } from "@/lib/seo";
import { site } from "@/content/site";
import { getTreatment } from "@/content/catalogue";
import { Logo } from "@/components/Logo";
import { Arrow } from "@/components/ui";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return pageMeta(locale, "/booking", d.booking.title, d.booking.lead);
}

export default async function Booking({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const b = dict.booking;
  const first = getTreatment("brazilian-lymphatic-drainage")!;
  const options = [
    { id: "fresha", name: "Fresha", url: site.links.freshaBooking, text: b.fresha, rating: site.ratings.fresha },
    { id: "treatwell", name: "Treatwell", url: site.links.treatwell, text: b.treatwell, rating: site.ratings.treatwell },
  ];
  return (
    <section data-header="dark" className="surface-dark grain min-h-[100svh] pb-24 pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+6rem)]">
      <div className="gutter mx-auto max-w-[1200px] text-center">
        <Logo variant="symbol" className="mx-auto h-auto w-40 md:w-56" alt="" />
        <h1 className="display-lg mt-10">{b.title}</h1>
        <p className="lede mx-auto mt-6 max-w-xl text-muted">{b.lead}</p>
      </div>
      <ul className="gutter mx-auto mt-16 grid max-w-[1000px] gap-5 md:grid-cols-2">
        {options.map((o) => (
          <li key={o.id}>
            <a href={o.url} target="_blank" rel="noopener" data-booking={o.id}
              className="group flex h-full flex-col justify-between gap-10 rounded-[2px] border border-line p-8 transition-colors duration-700 hover:border-gold-300 hover:bg-burgundy-700/40 md:p-10">
              <div>
                <p className="font-display text-4xl">{o.name}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{o.text}</p>
              </div>
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
                <span className="text-[13px] text-muted"><span className="text-accent">★ {o.rating.score.toFixed(1)}</span> · {o.rating.count} {dict.common.reviewsOn} {o.name}</span>
                <span className="btn btn-gold !min-h-11 !px-5">{b.choose} {o.name}<Arrow /></span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <p className="gutter mx-auto mt-14 max-w-xl text-center text-[14px] text-muted">
        {b.help}{" "}
        <Link className="link-underline text-accent" href={href(locale, `/treatments/${first.slug}`)}>{t(first.name, locale)}</Link>
      </p>
    </section>
  );
}
