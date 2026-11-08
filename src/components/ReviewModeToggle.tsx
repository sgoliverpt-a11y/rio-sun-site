"use client";
import { useEffect, useState } from "react";

/** Preview-only helper: outlines content still awaiting confirmation. Remove before launch. */
export function ReviewModeToggle({ label, hint }: { label: string; hint: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let v = false;
    try { v = localStorage.getItem("riosun-review") === "1" || new URLSearchParams(location.search).has("review"); } catch {}
    setOn(v);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("review-mode", on);
    try { localStorage.setItem("riosun-review", on ? "1" : "0"); } catch {}
  }, [on]);
  return (
    <button type="button" onClick={() => setOn((v) => !v)} title={hint} aria-pressed={on}
      className="fixed bottom-24 left-3 z-[60] flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-black shadow md:bottom-4">
      <span className={`h-2 w-2 rounded-full ${on ? "bg-amber-400" : "bg-neutral-300"}`} />
      Build 01 · {label}
    </button>
  );
}
