import Link from "next/link";
import { href, t, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Treatment } from "@/content/catalogue";
import { summaryLine, reviewNote } from "@/lib/format";
import { Media } from "./Media";

export function TreatmentCard({ tr, locale, dict, index, tone = "light" }: {
  tr: Treatment; locale: Locale; dict: Dictionary; index?: number; tone?: "light" | "dark";
}) {
  const link = tr.detail ? href(locale, `/treatments/${tr.slug}`) : href(locale, `/treatments`) + `#${tr.slug}`;
  return (
    <article className="group relative flex flex-col" data-reveal="fan" data-fan={index !== undefined && index % 2 ? "r" : undefined} data-status={tr.status} data-review-note={reviewNote(tr)}>
      <Link href={link} className="block overflow-hidden rounded-[2px]" tabIndex={-1} aria-hidden>
        <div className="transition-transform duration-[1.6s] ease-[var(--ease-silk)] group-hover:scale-[1.035]">
          <Media id={tr.media} locale={locale} tone={tone === "light" ? "dark" : "light"} />
        </div>
      </Link>
      <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line pt-4">
        {index !== undefined && <span className="font-display italic text-accent">{String(index + 1).padStart(2, "0")}</span>}
        <span className="eyebrow text-muted ml-auto">{summaryLine(tr, dict, locale)}</span>
      </div>
      <h3 className="display-sm mt-3">
        <Link href={link} className="link-underline">{t(tr.name, locale)}</Link>
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{t(tr.summary, locale)}</p>
      <Link href={link} className="eyebrow mt-5 inline-flex items-center gap-3 text-accent">
        {dict.cta.details}
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden className="transition-transform duration-500 group-hover:translate-x-1"><path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" /></svg>
      </Link>
    </article>
  );
}
