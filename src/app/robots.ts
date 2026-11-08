import type { MetadataRoute } from "next";
import { SITE_URL } from "@/i18n/config";

export const dynamic = "force-static";

// Preview: disallow all. Switch to allow at launch (BUILD 03).
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
