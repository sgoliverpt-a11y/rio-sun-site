import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Quiz } from "@/components/Quiz";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return pageMeta(locale, "/find-your-treatment", d.quiz.title, d.quiz.lead);
}

export default async function FindYourTreatment({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return (
    <>
      <PageHero eyebrow={dict.quiz.eyebrow} title={[dict.quiz.title]} lead={dict.quiz.lead} />
      <section data-header="light" className="surface-light">
        <div className="gutter mx-auto max-w-[1300px] py-20 md:py-28">
          <Quiz locale={locale} dict={dict} />
        </div>
      </section>
    </>
  );
}
