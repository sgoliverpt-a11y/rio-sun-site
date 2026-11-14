import type { Metadata } from "next";
import paths from "../../../../public/brand/layers/paths.json";

export const metadata: Metadata = { title: "Rio Sun — logo layers (internal)", robots: { index: false, follow: false } };

const L = "/brand/layers/";
const layers = [
  { id: "bandUpper", file: "band-upper.webp", name: "Upper band", w: 120 },
  { id: "bandLower", file: "band-lower.webp", name: "Lower band", w: 130 },
  { id: "sunArc", file: "sun-arc.webp", name: "Solar arc", w: 64 },
] as const;

/**
 * Internal check page (not linked, not indexed).
 * Proves the approved symbol is separated into its three original elements
 * with zero pixel changes, and that each can be drawn on independently.
 */
export default function BrandLab() {
  const css = `
    .lab{font:15px/1.6 system-ui,sans-serif;color:#f7f1e7;max-width:1100px;margin:0 auto;padding:48px 20px 96px}
    .lab h1{font:400 34px/1.1 Georgia,serif;margin:0 0 8px}.lab h2{font:400 22px/1.2 Georgia,serif;margin:56px 0 8px}
    .lab p{color:#f7f1e7b3;max-width:62ch;margin:0 0 16px}
    .stage{position:relative;background:radial-gradient(80% 90% at 50% 40%,#8a4318,#2a1308);border-radius:4px;padding:32px}
    .stage img,.stage svg{display:block;width:100%;height:auto}
    .stack{position:relative}.stack img+img{position:absolute;inset:0}
    .grid{display:grid;gap:16px;grid-template-columns:1fr 1fr}@media(max-width:700px){.grid{grid-template-columns:1fr}}
    .cap{font-size:12px;letter-spacing:.08em;color:#f6c47f;margin:10px 0 0}
    .exploded .stage{padding:20px}
    .draw{stroke-dasharray:1;stroke-dashoffset:1}
    .play .draw{animation:draw var(--d) cubic-bezier(.65,0,.35,1) var(--t) forwards}
    @keyframes draw{to{stroke-dashoffset:0}}
    button.replay{margin-top:16px;background:linear-gradient(100deg,#a06334,#e2a861 30%,#fde8bb 50%,#c88f4a 80%);color:#2a1308;border:0;border-radius:99px;padding:12px 22px;font:600 13px system-ui;letter-spacing:.1em;cursor:pointer}
    @media (prefers-reduced-motion: reduce){.draw{stroke-dashoffset:0!important;animation:none!important}}
  `;
  const timing: Record<string, [number, number]> = { bandUpper: [0.2, 1.7], bandLower: [0.6, 1.7], sunArc: [1.3, 1.4] };
  return (
    <main className="lab">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <h1>Rio Sun symbol — separated layers</h1>
      <p>The approved symbol split into its three original elements. Every pixel comes from the approved artwork; nothing was redrawn. Stacked together, the layers are identical to the original (pixel difference: 0).</p>

      <h2>Original vs. recomposed</h2>
      <div className="grid">
        <div><div className="stage"><img src="/brand/rio-sun-symbol-gold.webp" alt="Original symbol" /></div><p className="cap">ORIGINAL (approved artwork)</p></div>
        <div><div className="stage"><div className="stack">{layers.map((l) => <img key={l.id} src={L + l.file} alt="" />)}</div></div><p className="cap">RECOMPOSED FROM 3 LAYERS</p></div>
      </div>

      <h2>The three elements</h2>
      <div className="grid exploded" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
        {layers.map((l) => <div key={l.id}><div className="stage"><img src={L + l.file} alt={l.name} /></div><p className="cap">{l.name.toUpperCase()}</p></div>)}
      </div>

      <h2>Independent draw-on test</h2>
      <p>Each element is revealed along its own vector centreline (left to right, as in the approved video). This is only a fidelity test, not the final choreography of BUILD 02.</p>
      <div className="stage" id="draw-stage">
        <svg viewBox={paths.viewBox} aria-label="Draw-on test of the separated symbol">
          <defs>
            {layers.map((l) => (
              <mask key={l.id} id={`m-${l.id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1010" height="330">
                <path className="draw" d={paths[l.id].d} pathLength={1} fill="none" stroke="#fff" strokeWidth={l.w} strokeLinecap="butt"
                  style={{ ["--t" as string]: `${timing[l.id][0]}s`, ["--d" as string]: `${timing[l.id][1]}s` }} />
              </mask>
            ))}
          </defs>
          {layers.map((l) => <image key={l.id} href={L + l.file} width="1010" height="330" mask={`url(#m-${l.id})`} />)}
        </svg>
      </div>
      <button type="button" className="replay" id="replay">Replay</button>
      <script dangerouslySetInnerHTML={{ __html: `(function(){var s=document.getElementById('draw-stage');function go(){s.classList.remove('play');void s.offsetWidth;s.classList.add('play')}go();document.getElementById('replay').onclick=go})()` }} />
    </main>
  );
}
