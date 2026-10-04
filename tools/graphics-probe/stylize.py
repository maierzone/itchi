"""Wegwerf-Spike: Foto-Ausschnitt -> Tusche-Vektoren -> Stil (none | cyborg) -> SVG.
Schnittstelle: STYLES[name](fig) -> SVG-String. Der Stil erfindet nur Zusatz, die Tusche bleibt unangetastet."""
import math, random, re, tempfile
import numpy as np, vtracer
from PIL import Image
from scipy.ndimage import label, distance_transform_edt, binary_dilation
from extract import SRC, BOXES, F, ink_mask

P = dict(sheet="#efe8d6", ink="#221d17", petrol="#3f7186", pdeep="#2c5566",
         rust="#a85c3c", rdeep="#8c3f21", gold="#b8892f")  # nur Art-Bibel-Palette
MAXS = 600
ST8 = np.ones((3, 3))


def border_labels(lab):
    return set(np.unique(np.r_[lab[0], lab[-1], lab[:, 0], lab[:, -1]]))


def prep(name):
    c = Image.open(SRC).crop(tuple(int(v * F) for v in BOXES[name]))
    m = ink_mask(c)
    s = MAXS / max(m.shape)
    size = (int(m.shape[1] * s), int(m.shape[0] * s))
    m = np.asarray(Image.fromarray(m.astype(np.uint8) * 255).resize(size, Image.LANCZOS)) > 127
    lab, _ = label(m, structure=ST8)
    area = np.bincount(lab.ravel())[1:]
    edge = border_labels(lab) - {0}
    keep = [i + 1 for i, a in enumerate(area) if a >= 15 and not (i + 1 in edge and a < 0.15 * area.max())]
    return np.isin(lab, keep)  # Nachbar-Fetzen am Rand + Staub raus


def trace(mask):
    with tempfile.TemporaryDirectory() as t:
        Image.fromarray(np.where(mask, 0, 255).astype(np.uint8)).save(f"{t}/i.png")
        vtracer.convert_image_to_svg_py(f"{t}/i.png", f"{t}/o.svg", colormode="binary", mode="spline",
                                        filter_speckle=3, corner_threshold=70, length_threshold=3.5, path_precision=1)
        s = open(f"{t}/o.svg").read()
    out = []
    for p in re.findall(r"<path[^>]*>", s):
        d = re.search(r' d="([^"]+)"', p).group(1)
        tr = re.search(r'transform="([^"]+)"', p)
        out.append(f'<path d="{d}" transform="{tr.group(1) if tr else ""}"/>')
    return "".join(out)


def svg(w, h, body, defs=""):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}"><defs>{defs}</defs>{body}</svg>'


def plain(fig):
    h, w = fig["mask"].shape
    return svg(w, h, f'<g fill="{P["ink"]}">{fig["ink"]}</g>')


def cyborg(fig):
    m, fac = fig["mask"], fig["faction"]
    h, w = m.shape
    hud = fig.get("hud", True)
    pad = 46 if hud else 8
    main, deep = (P["rust"], P["rdeep"]) if fac == "monolith" else (P["petrol"], P["pdeep"])
    other = P["petrol"] if fac == "monolith" else P["rust"]
    rng = random.Random(fig["name"])
    u = fig.get("uid", "x")
    gap = binary_dilation(m, iterations=4)            # Lücken in der Handlinie schließen
    lab, n = label(~gap)
    border = border_labels(lab)
    panels, leds = [], []
    for i in range(1, n + 1):
        if i in border:
            continue
        r = binary_dilation(lab == i, iterations=4) & ~m   # zurück bis an die Tusche
        a = int(r.sum())
        ys, xs = np.nonzero(r)
        bw, bh = np.ptp(xs) + 1, np.ptp(ys) + 1
        if a < 25:
            continue
        if a < 1800 and a / (bw * bh) > .35 and max(bw, bh) / min(bw, bh) < 2.2:
            leds.append((r, a, xs.mean(), ys.mean()))
        elif a >= 900:
            panels.append((r, a))
    panels.sort(key=lambda p: -p[1])

    def union(rs):  # Füllung leicht unter die Tusche schieben
        acc = np.zeros_like(m)
        for r in rs:
            acc |= binary_dilation(r, iterations=2)
        return acc

    o = []
    # 0 Neon: weich geglühte Tusche in Fraktionsfarbe als Aura
    o.append(f'<g fill="{main}" opacity=".55" filter="url(#blur{u})">{fig["ink"]}</g>')
    # 1 Glitch: versetzte Tusche-Geister in beiden Fraktionsfarben
    o.append(f'<g fill="{other}" opacity=".5" transform="translate(4,-2)">{fig["ink"]}</g>')
    o.append(f'<g fill="{main}" opacity=".45" transform="translate(-3,2)">{fig["ink"]}</g>')
    # 2 Panels: flache Metallfläche + Schraffur + Scanlines
    if panels:
        pd_ = trace(union([r for r, _ in panels]))
        o.append(f'<clipPath id="cp{u}">{pd_}</clipPath>')
        for k, (r, _) in enumerate(panels):  # Panels wechseln Farbe: Haupt, dunkel, Gegenfraktion
            o.append(f'<g fill="{(main, deep, other)[k % 3]}" opacity=".8">{trace(union([r]))}</g>')
        o.append(f'<g clip-path="url(#cp{u})"><rect width="{w}" height="{h}" fill="url(#hatch{u})"/><rect width="{w}" height="{h}" fill="url(#scan{u})"/></g>')
    # 3 Tusche
    o.append(f'<g fill="{P["ink"]}">{fig["ink"]}</g>')
    # 4 LEDs = kleine geschlossene Flächen -> leuchtende Sensoren mit Fadenkreuz
    if leds:
        o.append(f'<g fill="{P["gold"]}" filter="url(#glow{u})">{trace(union([l[0] for l in leds]))}</g>')
        for _, a, cx, cy in sorted(leds, key=lambda l: -l[1])[:3]:  # Fadenkreuz nur an den größten Sensoren
            R = 1.7 * math.sqrt(a / math.pi) + 5
            o.append(f'<g stroke="{P["gold"]}" stroke-width="1.3" fill="none"><circle cx="{cx:.1f}" cy="{cy:.1f}" r="{R:.1f}" stroke-dasharray="3 3"/>'
                     f'<path d="M{cx-R-4:.1f} {cy:.1f}h5M{cx+R-1:.1f} {cy:.1f}h5M{cx:.1f} {cy-R-4:.1f}v5M{cx:.1f} {cy+R-1:.1f}v5"/></g>'
                     f'<circle cx="{cx-1.5:.1f}" cy="{cy-1.5:.1f}" r="1.6" fill="{P["sheet"]}"/>')
    # 5 Nieten an den Eckpunkten großer Panels
    for r, a in panels[:3]:
        if a < 4000:
            continue
        ys, xs = np.nonzero(r)
        cx, cy = xs.mean(), ys.mean()
        for k in (xs + ys, xs - ys, -(xs + ys), ys - xs):
            j = k.argmax()
            x = xs[j] + (cx - xs[j]) * .09
            y = ys[j] + (cy - ys[j]) * .09
            if not r[int(y), int(x)]:
                continue
            o.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="3.6" fill="{P["sheet"]}" stroke="{P["ink"]}" stroke-width="1.3"/>'
                     f'<path d="M{x-2:.1f} {y-.6:.1f}l4 1.2" stroke="{P["ink"]}" stroke-width="1"/>')
    # 5b Schaltkreis-Leiterbahnen im größten Panel (nur wo sie komplett im Panel bleiben)
    if panels:
        dt = distance_transform_edt(panels[0][0])
        ys, xs = np.nonzero(dt > 14)
        done = 0
        for _ in range(80):
            if done >= 5 or not len(xs):
                break
            j = rng.randrange(len(xs))
            x, y = float(xs[j]), float(ys[j])
            pts = [(x, y)]
            dx, dy = rng.choice((-1, 1)), rng.choice((-1, 1))
            for dv, ln in (((dx, 0), rng.randint(25, 70)), ((dx, dy), rng.randint(15, 40)), ((0, dy), rng.randint(20, 60))):
                x += dv[0] * ln
                y += dv[1] * ln
                pts.append((x, y))
            samples = [(ax + (bx - ax) * t / 12, ay + (by - ay) * t / 12)
                       for (ax, ay), (bx, by) in zip(pts, pts[1:]) for t in range(13)]
            if not all(0 <= int(py) < h and 0 <= int(px) < w and dt[int(py), int(px)] > 9 for px, py in samples):
                continue
            s = P["sheet"]
            o.append(f'<polyline points="{" ".join(f"{a:.1f},{b:.1f}" for a, b in pts)}" fill="none" stroke="{s}" stroke-width="1.8" opacity=".85"/>'
                     f'<circle cx="{pts[0][0]:.1f}" cy="{pts[0][1]:.1f}" r="3" fill="{s}"/>'
                     f'<circle cx="{pts[-1][0]:.1f}" cy="{pts[-1][1]:.1f}" r="3.6" fill="none" stroke="{s}" stroke-width="1.8"/>')
            done += 1
    # 6 HUD: Eckklammern, Kennung, Statusbalken
    ys, xs = np.nonzero(m)
    if not hud:
        xs = ys = np.array([0, 0])
    x0, x1, y0, y1 = xs.min() - 14, xs.max() + 14, ys.min() - 14, ys.max() + 14
    L = 24
    if hud:
        o.append(f'<path stroke="{deep}" stroke-width="2.4" fill="none" d="M{x0} {y0+L}V{y0}H{x0+L}M{x1-L} {y0}H{x1}V{y0+L}M{x1} {y1-L}V{y1}H{x1-L}M{x0+L} {y1}H{x0}V{y1-L}"/>')
        o.append(f'<text x="{x0}" y="{y0-8}" font-family="IBM Plex Mono,Consolas,monospace" font-size="15" fill="{deep}" font-weight="700">UNIT/{fig["name"].upper()} ◈ {fac[:4].upper()}</text>')
        o.append(f'<g fill="{deep}">' + "".join(f'<rect x="{x1-4-(5-i)*11}" y="{y1+7}" width="8" height="5" opacity="{1 if i < 4 else .25}"/>' for i in range(5)) + '</g>')
    defs = (f'<pattern id="hatch{u}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="{P["ink"]}" stroke-width="1" opacity=".22"/></pattern>'
            f'<pattern id="scan{u}" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1.3" fill="{P["ink"]}" opacity=".12"/></pattern>'
            f'<filter id="blur{u}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>'
            f'<filter id="glow{u}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>')
    return svg(w + 2 * pad, h + 2 * pad, f'<g transform="translate({pad},{pad})">{"".join(o)}</g>', defs)


STYLES = {"none": plain, "cyborg": cyborg}


def stylize(name, style, faction, hud=True):
    m = prep(name)
    return STYLES[style](dict(name=name, mask=m, ink=trace(m), faction=faction, hud=hud, uid=f"{name}{int(hud)}"))


if __name__ == "__main__":
    import sys
    names = sys.argv[1:] or list(BOXES)
    for name in names:
        fac = "monolith" if name.startswith("crawler") else "orchestra"
        for st in STYLES:
            open(f"art/probe/{name}.{st}.svg", "w", encoding="utf-8").write(stylize(name, st, fac))
        print(name, "ok")
