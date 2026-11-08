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
from PIL import Image, ImageFilter

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
# the arc's foot: the short stub between the arc's end and the lower band's top edge
# (measured top edge under the foot: y≈231 at x=722 → y≈221 at x=746). It belongs to the arc;
# left in the band layer it shows as a broken spike when the bands are used without the arc.
stub = (xs >= 726) & (xs <= 744) & (ys >= 200) & (ys < 230 - (xs - 722) * 10 / 24)
stub &= np.array(Image.fromarray(((alpha >= 200) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))) > 0
arc_fit = arc.copy()
arc |= stub
# 3) bands: split on the gap midline; past the merge the ribbon is the lower band's tail
MERGE = 770
upper = (~arc) & (((xs < 240) & (ys < 262)) | ((xs >= 240) & (xs < MERGE) & (ys < gap(xs))))
lower = (~arc) & (~upper)

foot_box = (xs >= 726) & (xs <= 744) & (ys >= 195) & (ys < 230 - (xs - 722) * 10 / 24)

def layer(mask, fill_stub=False):
    out = A.astype(float).copy(); out[..., 3] = A[..., 3] * mask
    if fill_stub:
        # the soft glow the arc's foot sat on: carried across the foot row by row,
        # so the bands used without the arc show neither a spike nor a hole
        for y in np.unique(np.nonzero(foot_box)[0]):
            cols = np.nonzero(foot_box[y])[0]; x0, x1 = 725, 745
            for x in cols:
                t = (x - x0) / (x1 - x0); out[y, x] = out[y, x0] * (1 - t) + out[y, x1] * t
    return out

def save(arr, name):
    Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGBA").save(OUT + name, quality=92)

import os; os.makedirs(OUT, exist_ok=True)
L_up, L_lo, L_arc = layer(upper), layer(lower, fill_stub=True), layer(arc)
save(L_up, "band-upper.webp"); save(L_lo, "band-lower.webp"); save(L_arc, "sun-arc.webp")

# 3b) light-surface variants: the original art carries a soft copper halo, made for the
# burgundy background; on ivory/cream it reads as a smudge. The *-light layers fade only
# that halo: translucent, copper-toned pixels reachable from the empty background.
# Opaque metal, gold-toned translucent ribbon and the anti-aliased edges are untouched.
def mf(m, k, op): return np.array(Image.fromarray((m * 255).astype(np.uint8)).filter(op(k))) > 0
opaque = alpha >= 250
# seal the small gaps in the metal's outline so the flood cannot leak into the
# translucent body of the ribbons (that translucency is part of the material)
barrier = mf(mf(opaque, 9, ImageFilter.MaxFilter), 9, ImageFilter.MinFilter)
edge = mf(opaque, 3, ImageFilter.MaxFilter)          # 1px anti-aliasing stays
free = ~barrier & ~edge
reach = alpha == 0
while True:
    nxt = reach | (mf(reach, 3, ImageFilter.MaxFilter) & free)
    if (nxt == reach).all(): break
    reach = nxt
w = (reach & (alpha > 0) & free).astype(float)
w = np.array(Image.fromarray((w * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.0))) / 255.0
w *= ~edge
# the glow inside the lower ribbon where it folds under the upper one is translucent material, keep it
w[235:315, 500:705] = 0
print("halo pixels faded in light variants:", int((w > 0.05).sum()))
for arr, name in ((L_up, "band-upper-light.webp"), (L_lo, "band-lower-light.webp"), (L_arc, "sun-arc-light.webp")):
    o = arr.copy(); o[..., 3] *= (1 - w)
    if arr is L_lo: o[..., 3] *= ~foot_box   # the glow carried across the arc's foot is halo too
    save(o, name)

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
yy, xx = np.nonzero(arc_fit & solid)
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
arc_d = f"M{P0[0]:.1f},{P0[1]:.1f} A{r:.1f},{r:.1f} 0 {large} 1 {P1[0]:.1f},{P1[1]:.1f} L734.5,231.0"

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
