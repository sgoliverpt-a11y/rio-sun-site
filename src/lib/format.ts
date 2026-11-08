import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Treatment, Variant } from "@/content/catalogue";

const gbp = (n: number, locale: Locale) =>
  new Intl.NumberFormat(locale === "en" ? "en-GB" : "pt-BR", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

export function formatPrice(v: Variant, dict: Dictionary, locale: Locale) {
  if (!v.price) return dict.common.priceOnRequest;
  return `${v.price.from ? dict.common.from + " " : ""}${gbp(v.price.amount, locale)}`;
}

export function formatDuration(v: Variant, dict: Dictionary) {
  if (!v.minutes) return dict.common.durationOnBooking;
  const h = Math.floor(v.minutes / 60), m = v.minutes % 60;
  if (h && m) return `${h} h ${m} ${dict.common.min}`;
  if (h) return `${h} h`;
  return `${m} ${dict.common.min}`;
}

/** Compact "60 – 90 min · from £88" line for cards. */
export function summaryLine(tr: Treatment, dict: Dictionary, locale: Locale) {
  const mins = tr.variants.map((v) => v.minutes).filter(Boolean) as number[];
  const prices = tr.variants.map((v) => v.price).filter(Boolean) as NonNullable<Variant["price"]>[];
  const dur = mins.length ? (mins.length > 1 ? `${Math.min(...mins)}–${Math.max(...mins)} ${dict.common.min}` : formatDuration({ minutes: mins[0], price: null }, dict)) : null;
  let price: string | null = null;
  if (prices.length) {
    const min = Math.min(...prices.map((p) => p.amount));
    const from = prices.length > 1 || prices.some((p) => p.from);
    price = `${from ? dict.common.from + " " : ""}${gbp(min, locale)}`;
  }
  return [dur, price].filter(Boolean).join(" · ");
}

export function reviewNote(tr: Treatment) {
  if (tr.status === "confirmed") return undefined;
  return `${tr.status === "conflict" ? "CONFLICT" : "TO CONFIRM"}: ${tr.note ?? ""}`;
}
