import type { Metadata } from "next";
import { locales, localeMeta, type Locale } from "@/i18n/config";

/** Per-page metadata with canonical + hreflang alternates (en-GB / pt-BR / x-default). */
export function pageMeta(locale: Locale, path: string, title: string | undefined, description: string): Metadata {
  const p = path === "" || path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].tag] = `/${l}${p}`;
  languages["x-default"] = `/en${p}`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: `/${locale}${p}`, languages },
    openGraph: { title: title ?? undefined, description, locale: localeMeta[locale].og, url: `/${locale}${p}` },
  };
}
