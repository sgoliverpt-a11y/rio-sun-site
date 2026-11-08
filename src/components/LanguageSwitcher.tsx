"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeMeta, type Locale } from "@/i18n/config";

/** Discreet EN / PT switch. Keeps the current page when switching. */
export function LanguageSwitcher({ locale, label, className = "" }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${locale}/`;
  const rest = pathname.replace(/^\/(en|pt-br)(?=\/|$)/, "") || "/";
  return (
    <nav aria-label={label} className={`flex items-center gap-1 text-[11px] font-semibold tracking-[.2em] ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden className="opacity-40">/</span>}
          <Link
            href={`/${l}${rest === "/" ? "/" : rest}`}
            hrefLang={localeMeta[l].tag}
            lang={localeMeta[l].tag}
            aria-current={l === locale ? "true" : undefined}
            onClick={() => { try { localStorage.setItem("riosun-locale", l); } catch {} }}
            className={`px-1 py-2 transition-opacity ${l === locale ? "opacity-100" : "opacity-55 hover:opacity-100"}`}
          >
            <span aria-hidden>{localeMeta[l].short}</span>
            <span className="sr-only">{localeMeta[l].label}</span>
          </Link>
        </span>
      ))}
    </nav>
  );
}
