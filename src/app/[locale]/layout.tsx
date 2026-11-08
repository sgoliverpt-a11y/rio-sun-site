import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales, localeMeta, SITE_URL, href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBookBar } from "@/components/MobileBookBar";
import { RevealObserver } from "@/components/RevealObserver";
import { ReviewModeToggle } from "@/components/ReviewModeToggle";
import { MotionProvider } from "@/motion/MotionProvider";
import { site } from "@/content/site";

export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export const viewport: Viewport = { themeColor: "#3f000b", width: "device-width", initialScale: 1, viewportFit: "cover" };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: d.meta.defaultTitle, template: `%s · Rio Sun` },
    description: d.meta.defaultDescription,
    icons: { icon: "/icon.png", apple: "/apple-touch-icon.png" },
    openGraph: { siteName: d.meta.siteName, locale: localeMeta[locale].og, type: "website" },
    robots: { index: false, follow: false }, // preview builds: no indexing until launch
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: site.name,
  description: "Brazilian lymphatic drainage, sculpting massage and facial treatments.",
  address: { "@type": "PostalAddress", streetAddress: `${site.venue.host}, ${site.venue.street}`, addressLocality: site.venue.city, postalCode: site.venue.postcode, addressCountry: "GB" },
  sameAs: [site.links.instagram, site.links.treatwell, site.links.freshaProfile],
  url: SITE_URL,
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  return (
    <html lang={localeMeta[locale].tag}>
      <body>
        <Header locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
        <MobileBookBar hrefBook={href(locale, "/booking")} label={dict.nav.book} sub="Rio Sun · Fulham" />
        <ReviewModeToggle label={dict.review.toggle} hint={dict.review.hint} />
        <RevealObserver />
        <MotionProvider />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
