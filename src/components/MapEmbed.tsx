"use client";
import { useState } from "react";

/** Click-to-load map: no third-party cookies or weight until the visitor asks for it. */
export function MapEmbed({ src, title, cta, note }: { src: string; title: string; cta: string; note: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
      {on ? (
        <iframe src={src} title={title} className="absolute inset-0 h-full w-full grayscale-[.4] sepia-[.2]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_40%,#efe7dc,#e8d9ca)] p-6 text-center">
          <svg width="28" height="36" viewBox="0 0 28 36" aria-hidden><path d="M14 0C6.3 0 0 6.2 0 13.9 0 24.3 14 36 14 36s14-11.7 14-22.1C28 6.2 21.7 0 14 0zm0 19a5 5 0 110-10 5 5 0 010 10z" fill="#4b5a3e" /></svg>
          <button type="button" onClick={() => setOn(true)} className="btn btn-burgundy !min-h-11">{cta}</button>
          <p className="max-w-xs text-[12px] text-ink/60">{note}</p>
        </div>
      )}
    </div>
  );
}
