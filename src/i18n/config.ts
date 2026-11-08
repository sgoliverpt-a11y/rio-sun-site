// Internationalisation config. Add a locale here + a dictionary file to expand.
export const locales = ["en", "pt-br"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** BCP-47 tags used for <html lang>, hreflang and Open Graph. */
export const localeMeta: Record<Locale, { tag: string; og: string; label: string; short: string }> = {
  en: { tag: "en-GB", og: "en_GB", label: "English", short: "EN" },
  "pt-br": { tag: "pt-BR", og: "pt_BR", label: "Português", short: "PT" },
};

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** Localised string helper used across the content layer. */
export type L10n = Record<Locale, string>;
export const t = (s: L10n, locale: Locale) => s[locale] ?? s.en;

/** Build a locale-prefixed path. path must start with "/" (or be ""). */
export const href = (locale: Locale, path = "") => `/${locale}${path}${path.endsWith("/") ? "" : "/"}`;

export const SITE_URL = "https://www.riosuntherapy.co.uk"; // TODO: confirm production domain
