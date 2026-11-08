import type { MetadataRoute } from "next";
import { locales, localeMeta, SITE_URL } from "@/i18n/config";
import { detailSlugs } from "@/content/catalogue";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/treatments/", "/our-story/", "/journal/", "/contact/", "/booking/", ...detailSlugs().map((s) => `/treatments/${s}/`)];
  return paths.map((p) => ({
    url: `${SITE_URL}/en${p}`,
    alternates: { languages: Object.fromEntries(locales.map((l) => [localeMeta[l].tag, `${SITE_URL}/${l}${p}`])) },
  }));
}
