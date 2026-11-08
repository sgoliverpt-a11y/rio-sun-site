"""
Separates the approved Rio Sun symbol into its three original elements
(upper band, lower band, solar arc) WITHOUT redrawing anything:
every output pixel is an original pixel of the approved artwork.

Outputs (public/brand/layers/):
  band-upper.webp, band-lower.webp, sun-arc.webp  — same canvas as the symbol, stack = original
  paths.json   — vector centrelines (SVG path data) of each element, for draw-on masks in the motion system
  check.png    — colour-coded verification image
Run: python3 scripts/separate-logo.py
"""
import json, numpy as np
from PIL import Image

SRC = "public/brand/rio-sun-symbol-gold.webp"
OUT = "public/brand/layers/"
im = Image.open(SRC).convert("RGBA")
A = np.array(im)
alpha = A[..., 3].astype(float)
H, W = alpha.shape
solid = alpha > 60

def runs(col):
    r, y = [], 0
    while y < len(col):
        if col[y]:
            s = y
            while y < len(col) and col[y]: y += 1
            r.append((s, y))
        y += 1
    return r

# 1) band gap midline from columns where the two bands are clearly apart
gx, gy, topx, topy = [], [], [], []
for x in range(W):
    rr = [r for r in runs(solid[:, x]) if r[1] - r[0] > 3]
    band = [r for r in rr if r[0] > 120 or x < 390]           # ignore the arc (top) runs
    if len(band) >= 2 and 240 <= x <= 690:
        (a0, a1), (b0, b1) = band[-2], band[-1]
        gx.append(x); gy.append((a1 + b0) / 2)
    if band and 540 <= x <= 700:
        topx.append(x); topy.append(band[0][0])
gap = np.poly1d(np.polyfit(gx, gy, 3))
btop = np.poly1d(np.polyfit(topx, topy, 2))

ys = np.arange(H)[:, None]; xs = np.arange(W)[None, :]
# 2) the arc: above the upper band's top edge, within its horizontal span
arc = (xs >= 385) & (xs <= 745) & (ys < btop(xs) - 3) & (ys < 235)
# the arc's left end sits just above the upper band: select it by distance to the fitted circle
_yy, _xx = np.nonzero(arc & solid)
_M = np.c_[2 * _xx, 2 * _yy, np.ones_like(_xx)]; _cx, _cy, _c = np.linalg.lstsq(_M, _xx**2 + _yy**2, rcond=None)[0]
_r = np.sqrt(_c + _cx**2 + _cy**2)
_d = np.sqrt((xs - _cx) ** 2 + (ys - _cy) ** 2); _ang = np.degrees(np.arctan2(ys - _cy, xs - _cx))
arc |= (np.abs(_d - _r) < 16) & (_ang > -172) & (_ang < -120) & (ys < 137)
# 3) bands: split on the gap midline; past the merge the ribbon is the lower band's tail
MERGE = 770
upper = (~arc) & (((xs < 240) & (ys < 262)) | ((xs >= 240) & (xs < MERGE) & (ys < gap(xs))))
lower = (~arc) & (~upper)

def save(mask, name):
    out = A.copy(); out[..., 3] = (A[..., 3] * mask).astype(np.uint8)
    Image.fromarray(out, "RGBA").save(OUT + name, quality=92)
    return out

import os; os.makedirs(OUT, exist_ok=True)
save(upper, "band-upper.webp"); save(lower, "band-lower.webp"); save(arc, "sun-arc.webp")

# 4) vector centrelines (weighted by alpha)
def centreline(mask, x0, x1, step=6):
    pts = []
    for x in range(x0, x1, step):
        w = alpha[:, x] * mask[:, x]
        if w.sum() > 400: pts.append((x, float((w * np.arange(H)).sum() / w.sum())))
    return pts

def smooth_path(pts):
    # Catmull-Rom → cubic Bézier, SVG path data
    p = pts
    d = f"M{p[0][0]:.1f},{p[0][1]:.1f}"
    for i in range(len(p) - 1):
        p0 = p[i - 1] if i else p[i]; p1 = p[i]; p2 = p[i + 1]; p3 = p[i + 2] if i + 2 < len(p) else p2
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C{c1[0]:.1f},{c1[1]:.1f} {c2[0]:.1f},{c2[1]:.1f} {p2[0]:.1f},{p2[1]:.1f}"
    return d

up_pts = centreline(upper, 20, MERGE + 40)
lo_pts = centreline(lower, 230, 1000)
# arc: least-squares circle fit on arc pixels, path along the visible sweep
yy, xx = np.nonzero(arc & solid)
Am = np.c_[2 * xx, 2 * yy, np.ones_like(xx)]; bm = xx**2 + yy**2
cx, cy, c = np.linalg.lstsq(Am, bm, rcond=None)[0]; r = float(np.sqrt(c + cx**2 + cy**2))
ang = np.degrees(np.arctan2(yy - cy, xx - cx))
a0, a1 = float(np.percentile(ang, 0.5)), float(np.percentile(ang, 99.5))
# visible sweep runs from the left end (≈ west-north-west) clockwise to the bottom end (≈ south-east)
def pt(a): return (cx + r * np.cos(np.radians(a)), cy + r * np.sin(np.radians(a)))
angles = sorted(ang)
# find the largest angular gap (the invisible part of the circle)
s = np.sort(ang); gaps = np.diff(np.r_[s, s[0] + 360]); i = int(np.argmax(gaps))
start = s[(i + 1) % len(s)]; end = s[i] + (360 if s[i] < start else 0)
P0, P1 = pt(start), pt(end)
large = 1 if (end - start) > 180 else 0
arc_d = f"M{P0[0]:.1f},{P0[1]:.1f} A{r:.1f},{r:.1f} 0 {large} 1 {P1[0]:.1f},{P1[1]:.1f}"

paths = {
    "viewBox": f"0 0 {W} {H}",
    "bandUpper": {"d": smooth_path(up_pts), "maxWidth": 90},
    "bandLower": {"d": smooth_path(lo_pts), "maxWidth": 80},
    "sunArc": {"d": arc_d, "maxWidth": 40, "circle": {"cx": round(float(cx), 1), "cy": round(float(cy), 1), "r": round(r, 1)}},
}
json.dump(paths, open(OUT + "paths.json", "w"), indent=2)

# 5) verification: stack == original, colour-coded view
re = np.zeros_like(A, dtype=float)
for m in (upper, lower, arc): re[..., 3] += A[..., 3] * m
print("max alpha diff after restacking:", float(np.abs(re[..., 3] - A[..., 3]).max()))
chk = np.zeros((H, W, 3), np.uint8) + 20  # verification only
for m, col in ((upper, (255, 120, 80)), (lower, (80, 200, 255)), (arc, (255, 230, 60))):
    k = (alpha * m) > 30; chk[k] = col
Image.fromarray(chk).save("scripts/separate-logo-check.png")
print("circle", cx, cy, r, "sweep", start, end)
