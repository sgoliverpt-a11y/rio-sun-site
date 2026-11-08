"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Always-reachable booking button on phones. Appears after the first screen. */
export function MobileBookBar({ hrefBook, label, sub }: { hrefBook: string; label: string; sub: string }) {
  const [show, setShow] = useState(false);
  const onBooking = usePathname()?.includes("/booking");
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] transition-transform duration-700 ease-[var(--ease-silk)] md:hidden ${show && !onBooking ? "translate-y-0" : "translate-y-[120%]"}`}>
      <Link href={hrefBook} className="flex items-center justify-between rounded-full bg-burgundy-800/95 py-2 pl-5 pr-2 text-ivory shadow-[0_10px_30px_-10px_rgba(34,1,10,.6)] backdrop-blur">
        <span className="text-[11px] tracking-[.16em] uppercase text-gold-200/80">{sub}</span>
        <span className="btn btn-gold !min-h-10 !px-5">{label}</span>
      </Link>
    </div>
  );
}
