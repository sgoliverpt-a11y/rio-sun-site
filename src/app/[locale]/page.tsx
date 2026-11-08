import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMeta } from "@/lib/seo";
import { Hero, Philosophy, Story, Treatments, Expertise, Experience, Invitation } from "@/components/home/Chapters";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return { ...pageMeta(locale, "/", undefined, d.meta.defaultDescription), title: { absolute: d.meta.defaultTitle } };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const p = { locale, dict };
  return (
    <>
      <Hero {...p} />
      <Philosophy {...p} />
      <Story {...p} />
      <Treatments {...p} />
      <Expertise {...p} />
      <Experience {...p} />
      <Invitation {...p} />
    </>
  );
}
