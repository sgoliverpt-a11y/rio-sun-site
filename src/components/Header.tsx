"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SoundToggle } from "./SoundToggle";

/**
 * Discreet header that adapts to the section underneath it.
 * Sections declare `data-header="dark" | "light"`.
 */
export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY, raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > lastY + 4 ? true : y < lastY - 4 ? false : (h) => h);
      lastY = y;
      const sections = document.querySelectorAll<HTMLElement>("[data-header]");
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= 34 && r.bottom > 34) { setTheme((s.dataset.header as "dark" | "light") ?? "dark"); break; }
      }
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [pathname]);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const nav = [
    { href: href(locale, "/treatments"), label: dict.nav.treatments },
    { href: href(locale, "/our-story"), label: dict.nav.story },
    { href: href(locale, "/journal"), label: dict.nav.journal },
    { href: href(locale, "/contact"), label: dict.nav.contact },
  ];
  const dark = open || theme === "dark";
  const isActive = (h: string) => pathname?.startsWith(h);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink">{dict.nav.skip}</a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,box-shadow] duration-700 ease-[var(--ease-silk)]
          ${hidden && !open ? "-translate-y-full" : "translate-y-0"}
          ${dark ? "text-ivory" : "text-burgundy-800"}
          ${scrolled && !open ? (dark ? "bg-burgundy-900/70 backdrop-blur-md" : "bg-ivory/80 backdrop-blur-md shadow-[0_1px_0_rgba(63,0,11,.08)]") : "bg-transparent"}`}
      >
        <div className="gutter mx-auto flex h-[var(--header-h)] max-w-[1600px] items-center justify-between gap-6">
          <Link href={href(locale)} className="relative z-10 block shrink-0" aria-label={`${dict.meta.siteName} — ${dict.nav.home}`}>
            <Logo variant="full" className="h-10 w-auto sm:h-11" priority alt="" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[12px] font-medium tracking-[.16em] uppercase">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined}
                    className={`link-underline pb-1 ${isActive(n.href) ? "bg-[length:100%_1px]" : ""}`}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3 sm:gap-5">
            <SoundToggle on={dict.sound.on} off={dict.sound.off} />
            <LanguageSwitcher locale={locale} label={dict.nav.language} />
            <Link href={href(locale, "/booking")}
              className={`btn hidden sm:inline-flex !min-h-10 !px-5 ${dark ? "btn-gold" : "btn-burgundy"}`}>{dict.nav.book}</Link>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu"
              className="lg:hidden -mr-2 flex h-11 w-11 items-center justify-center" aria-label={open ? dict.nav.close : dict.nav.menu}>
              <span className="relative block h-3 w-6">
                <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px bg-current transition-all duration-500 ${open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div id="mobile-menu" hidden={!open}
        className="surface-dark grain fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto pb-10 pt-[calc(var(--header-h)+2rem)] lg:hidden">
        <nav aria-label="Mobile" className="gutter">
          <ul className="space-y-1">
            {[{ href: href(locale), label: dict.nav.home }, ...nav].map((n, i) => (
              <li key={n.href} style={{ animationDelay: `${i * 60}ms` }} className="animate-[menu-in_.7s_var(--ease-silk)_both]">
                <Link href={n.href} className="display-md block py-2" aria-current={pathname === n.href ? "page" : undefined}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="gutter space-y-6">
          <Link href={href(locale, "/booking")} className="btn btn-gold w-full">{dict.cta.book}</Link>
          <p className="eyebrow text-muted">659 Fulham Road · London SW6 5PY</p>
        </div>
        <style>{`@keyframes menu-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}`}</style>
      </div>
    </>
  );
}
