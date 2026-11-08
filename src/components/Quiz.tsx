"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { href, t, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getTreatment, type Treatment } from "@/content/catalogue";
import { quiz, type QuestionId } from "@/content/quiz";
import { summaryLine } from "@/lib/format";
import { Media } from "./Media";
import { BookingButtons } from "./BookingButtons";

export function Quiz({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const q = dict.quiz;
  const [path, setPath] = useState<QuestionId[]>(["goal"]);
  const [result, setResult] = useState<[string, string?] | null>(null);
  const top = useRef<HTMLDivElement>(null);
  const focusTop = () => requestAnimationFrame(() => top.current?.focus({ preventScroll: false }));

  const current = quiz[path[path.length - 1]];
  const choose = (i: number) => {
    const o = current.options[i];
    if (o.result) setResult(o.result); else if (o.next) setPath([...path, o.next]);
    focusTop();
  };
  const back = () => { if (result) setResult(null); else setPath(path.slice(0, -1)); focusTop(); };
  const restart = () => { setResult(null); setPath(["goal"]); focusTop(); };
  const link = (tr: Treatment) => (tr.detail ? href(locale, `/treatments/${tr.slug}`) : href(locale, "/treatments") + `#${tr.slug}`);

  const main = result && getTreatment(result[0]);
  const alt = result?.[1] ? getTreatment(result[1]) : undefined;

  return (
    <div ref={top} tabIndex={-1} className="outline-none" aria-live="polite">
      {!main ? (
        <div key={current.id} className="quiz-step">
          <p className="eyebrow text-accent">{q.step} {String(path.length).padStart(2, "0")}</p>
          <h2 className="display-md mt-5 max-w-[22ch] text-burgundy-800">{t(current.title, locale)}</h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {current.options.map((o, i) => (
              <li key={i}>
                <button type="button" onClick={() => choose(i)}
                  className="group flex w-full items-center justify-between gap-6 border border-burgundy-800/20 px-6 py-5 text-left font-display text-[1.2rem] text-burgundy-800 transition-colors duration-300 hover:border-burgundy-800 hover:bg-burgundy-800 hover:text-ivory focus-visible:bg-burgundy-800 focus-visible:text-ivory">
                  {t(o.label, locale)}
                  <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden className="shrink-0 transition-transform duration-500 group-hover:translate-x-1"><path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" /></svg>
                </button>
              </li>
            ))}
          </ul>
          {path.length > 1 && <button type="button" onClick={back} className="eyebrow link-underline mt-10 text-muted">← {q.back}</button>}
        </div>
      ) : (
        <div className="quiz-step grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Media id={main.media} locale={locale} tone="dark" fill shape="arch" label={false} />
            </div>
          </div>
          <div className="md:col-span-7 md:pt-6">
            <p className="eyebrow text-accent">{q.resultEyebrow}</p>
            <h2 className="display-md mt-5 text-burgundy-800">{t(main.name, locale)}</h2>
            <p className="eyebrow mt-4 text-muted">{summaryLine(main, dict, locale)}</p>
            <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-muted">{t(main.summary, locale)}</p>
            <BookingButtons dict={dict} on={main.bookOn} tone="light" className="mt-9" />
            <Link href={link(main)} className="eyebrow link-underline mt-6 inline-block text-accent">{q.details}</Link>
            {alt && (
              <div className="mt-12 border-t border-line pt-6">
                <p className="eyebrow text-muted">{q.alsoConsider}</p>
                <Link href={link(alt)} className="mt-3 inline-block font-display text-[1.35rem] text-burgundy-800 link-underline">{t(alt.name, locale)}</Link>
                <span className="ml-3 text-[14px] text-muted">{summaryLine(alt, dict, locale)}</span>
              </div>
            )}
            <p className="mt-10 max-w-[56ch] text-[13px] leading-relaxed text-muted">{q.note}</p>
            <div className="mt-8 flex gap-8">
              <button type="button" onClick={back} className="eyebrow link-underline text-muted">← {q.back}</button>
              <button type="button" onClick={restart} className="eyebrow link-underline text-accent">{q.restart}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
