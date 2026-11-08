/**
 * AMBIENT MUSIC — one site-wide, gapless, low-volume loop.
 *
 * - Browsers forbid sound before the visitor interacts, so "on by default" means: it starts
 *   softly on the first tap / click / key press anywhere (unless the visitor switched it off).
 * - Nothing is downloaded before that first interaction (no effect on page load).
 * - Gapless loop via Web Audio: the file plays its short intro once, then loops
 *   [LOOP_START, LOOP_END] sample-accurately (the seam was cross-faded on the beat grid).
 * - Ducks automatically while any other <video>/<audio> on the page plays with sound.
 * - Pauses when the tab is hidden. The visitor's choice is remembered (localStorage).
 */
const SRC = "/media/rio-sun-ambient.m4a";
const LOOP_START = 4.25;
const LOOP_END = 52.248549;
const BASE = 0.2; // low background level
const DUCK = 0.04; // while another media plays with sound
const KEY = "riosun-sound";

type State = { enabled: boolean; playing: boolean };
let state: State = { enabled: true, playing: false };
const subs = new Set<() => void>();
const emit = () => { state = { ...state }; subs.forEach((f) => f()); };

let ctx: AudioContext | null = null;
let gain: GainNode | null = null;
let loading: Promise<void> | null = null;
let ducked = false;
let inited = false;

const target = () => (state.enabled && !document.hidden ? (ducked ? DUCK : BASE) : 0);
function ramp(sec = 1.2) {
  if (!ctx || !gain) return;
  const t = ctx.currentTime;
  gain.gain.cancelScheduledValues(t);
  gain.gain.setValueAtTime(gain.gain.value, t);
  gain.gain.linearRampToValueAtTime(target(), t + sec);
}

async function load() {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(ctx.destination);
  void ctx.resume();
  const buf = await fetch(SRC).then((r) => r.arrayBuffer());
  const audio = await new Promise<AudioBuffer>((res, rej) => ctx!.decodeAudioData(buf, res, rej));
  const src = ctx.createBufferSource();
  src.buffer = audio;
  src.loop = true;
  src.loopStart = LOOP_START;
  src.loopEnd = Math.min(LOOP_END, audio.duration);
  src.connect(gain);
  src.start();
  state.playing = true; emit();
  ramp(2.5);
}

function start() {
  if (!state.enabled) return;
  if (!loading) loading = load().catch(() => { loading = null; });
  else if (ctx && ctx.state !== "running") void ctx.resume().then(() => ramp());
  else ramp();
}

export function toggleAmbient() {
  if (!loading) { state.enabled = true; save(); emit(); start(); return; } // first press = start it
  state.enabled = !state.enabled; save(); emit();
  if (state.enabled) { void ctx?.resume(); ramp(1.2); }
  else { ramp(0.6); }
}
function save() { try { localStorage.setItem(KEY, state.enabled ? "on" : "off"); } catch {} }

export function subscribeAmbient(f: () => void) { subs.add(f); return () => { subs.delete(f); }; }
export const getAmbient = () => state;
export const getAmbientServer = (): State => ({ enabled: true, playing: false });

export function initAmbient() {
  if (inited || typeof window === "undefined") return;
  inited = true;
  try {
    const saved = localStorage.getItem(KEY);
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    state.enabled = saved ? saved === "on" : !saveData;
  } catch {}
  emit();

  // first interaction anywhere starts the music (the toggle handles its own press)
  // (kept until the audio is really running: a touch-scroll is not a valid "gesture" for browsers, a tap is)
  const evs = ["pointerdown", "pointerup", "keydown", "touchend", "click"];
  const first = (e: Event) => {
    if (ctx?.state === "running") { evs.forEach((n) => removeEventListener(n, first, true)); return; }
    if ((e.target as Element | null)?.closest?.("[data-ambient-toggle]")) return;
    start();
  };
  evs.forEach((n) => addEventListener(n, first, { capture: true, passive: true }));

  // duck under any other media playing with sound
  const check = () => {
    const loud = Array.from(document.querySelectorAll<HTMLMediaElement>("video, audio"))
      .some((m) => !m.paused && !m.ended && !m.muted && m.volume > 0);
    if (loud !== ducked) { ducked = loud; ramp(loud ? 0.5 : 1.5); }
  };
  ["play", "pause", "ended", "volumechange"].forEach((n) => document.addEventListener(n, check, true));

  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) { ramp(0.3); setTimeout(() => { if (document.hidden) void ctx?.suspend(); }, 350); }
    else if (state.enabled) { void ctx.resume().then(() => ramp(1.2)); }
  });
}
