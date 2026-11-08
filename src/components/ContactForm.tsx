"use client";
import { useState } from "react";
import { t, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { treatments } from "@/content/catalogue";
import { site } from "@/content/site";

/**
 * Contact form → e-mail to Rio Sun via FormSubmit (static site, no backend).
 * First submission ever sends an activation e-mail to the inbox; one click there enables delivery.
 * Honeypot field filters most bots. Nothing is stored by the website.
 */
export function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = dict.contact.form;
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data._honey) return;
    setState("sending");
    try {
      const res = await fetch(site.contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name, email: data.email, phone: data.phone || "-", treatment: data.treatment || "-", message: data.message,
          language: locale === "en" ? "English" : "Português",
          _subject: `${f.subject} · ${data.name}`, _replyto: data.email, _template: "table", _captcha: "false",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === "false" || json.success === false) throw new Error("send failed");
      setState("sent"); form.reset();
    } catch {
      setState("error");
    }
  }

  const field = "mt-2 w-full rounded-none border-0 border-b border-burgundy-800/25 bg-transparent px-0 py-3 text-[16px] text-ink outline-none transition-colors focus:border-burgundy-800";
  const label = "eyebrow text-accent";

  if (state === "sent") {
    return <p role="status" className="display-sm border-t border-line pt-8 text-burgundy-800">{f.sent}</p>;
  }
  return (
    <form onSubmit={submit} className="grid gap-7 sm:grid-cols-2" noValidate={false}>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="block"><span className={label}>{f.name}</span>
        <input name="name" required autoComplete="name" className={field} /></label>
      <label className="block"><span className={label}>{f.email}</span>
        <input name="email" type="email" required autoComplete="email" className={field} /></label>
      <label className="block"><span className={label}>{f.phone}</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} /></label>
      <label className="block"><span className={label}>{f.treatment}</span>
        <select name="treatment" className={`${field} cursor-pointer`} defaultValue="">
          <option value="">{f.treatmentNone}</option>
          {treatments.map((tr) => <option key={tr.slug} value={t(tr.name, "en")}>{t(tr.name, locale)}</option>)}
        </select></label>
      <label className="block sm:col-span-2"><span className={label}>{f.message}</span>
        <textarea name="message" required rows={5} className={`${field} resize-y`} /></label>
      <label className="flex items-start gap-3 text-[14px] leading-relaxed text-muted sm:col-span-2">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[var(--color-burgundy-800)]" />
        <span>{f.consent}</span>
      </label>
      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button type="submit" disabled={state === "sending"} className="btn btn-burgundy disabled:opacity-60">
          {state === "sending" ? f.sending : f.send}
        </button>
        {state === "error" && (
          <p role="alert" className="text-[14px] text-burgundy-700">
            {f.error} <a className="link-underline font-semibold" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
