"use client";
import { useEffect, useSyncExternalStore } from "react";
import { getAmbient, getAmbientServer, initAmbient, subscribeAmbient, toggleAmbient } from "@/lib/ambient";

/** Discreet sound on/off in the header: four thin bars that move while the music plays. */
export function SoundToggle({ on, off, className = "" }: { on: string; off: string; className?: string }) {
  useEffect(() => { initAmbient(); }, []);
  const s = useSyncExternalStore(subscribeAmbient, getAmbient, getAmbientServer);
  const live = s.enabled && s.playing;
  return (
    <button type="button" data-ambient-toggle onClick={toggleAmbient} aria-pressed={s.enabled}
      aria-label={s.enabled ? off : on} title={s.enabled ? off : on}
      className={`sound-toggle flex h-9 w-9 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100 ${live ? "is-live" : ""} ${className}`}>
      <span aria-hidden className="flex h-4 items-end gap-[3px]">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="sound-bar w-[2px] rounded-full bg-current" style={{ height: s.enabled ? `${[55, 100, 70, 40][i]}%` : "20%", animationDelay: `${i * -0.37}s` }} />
        ))}
      </span>
    </button>
  );
}
