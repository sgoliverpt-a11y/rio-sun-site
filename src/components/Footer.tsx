import Link from "next/link";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="surface-dark grain border-t border-line" data-header="dark">
      <div className="gutter mx-auto grid max-w-[1600px] gap-14 pb-28 pt-20 md:grid-cols-12 md:pb-14">
        <div className="md:col-span-4">
          <Logo className="h-auto w-52" />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-muted">{dict.footer.tagline}</p>
        </div>
        <nav aria-label={dict.footer.explore} className="md:col-span-2">
          <h2 className="eyebrow text-accent">{dict.footer.explore}</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li><Link className="link-underline" href={href(locale, "/treatments")}>{dict.nav.treatments}</Link></li>
            <li><Link className="link-underline" href={href(locale, "/our-story")}>{dict.nav.story}</Link></li>
            <li><Link className="link-underline" href={href(locale, "/journal")}>{dict.nav.journal}</Link></li>
            <li><Link className="link-underline" href={href(locale, "/booking")}>{dict.nav.book}</Link></li>
          </ul>
        </nav>
        <div className="md:col-span-3">
          <h2 className="eyebrow text-accent">{dict.footer.visit}</h2>
          <address className="mt-5 not-italic text-[15px] leading-relaxed">
            Rio Sun Massage Therapy<br />
            <span className="text-muted">{dict.common.insideCullinan}</span><br />
            {site.venue.street}<br />{site.venue.city} {site.venue.postcode}
          </address>
          <p className="mt-4 space-y-1 text-[15px]">
            <a className="link-underline block w-fit" href={site.contact.phoneHref}>{site.contact.phone}</a>
            <a className="link-underline block w-fit break-all" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </p>
          <Link className="link-underline mt-4 inline-block text-[15px]" href={href(locale, "/contact")}>{dict.cta.directions}</Link>
        </div>
        <div className="md:col-span-3">
          <h2 className="eyebrow text-accent">{dict.footer.follow}</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li><a className="link-underline" href={site.links.instagram} target="_blank" rel="noopener">Instagram</a></li>
            <li><a className="link-underline" href={site.links.treatwell} target="_blank" rel="noopener">Treatwell</a></li>
            <li><a className="link-underline" href={site.links.freshaProfile} target="_blank" rel="noopener">Fresha</a></li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 border-t border-line pt-8 text-[12px] text-muted md:col-span-12 md:flex-row md:items-center md:justify-between">
          <p>© {year} Rio Sun Massage Therapy. {dict.footer.rights}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link className="link-underline" href={href(locale, "/legal/privacy")}>{dict.footer.privacy}</Link></li>
            <li><Link className="link-underline" href={href(locale, "/legal/cookies")}>{dict.footer.cookies}</Link></li>
            <li><Link className="link-underline" href={href(locale, "/legal/terms")}>{dict.footer.terms}</Link></li>
          </ul>
          <p>{dict.footer.credit}</p>
        </div>
      </div>
    </footer>
  );
}
