#!/usr/bin/env python3
"""Erzeugt art/SKIZZEN_UEBERSICHT.html aus art/ASSET_REGISTER.csv.

Für jedes Element eine Karte mit Platzhalter. Liegt schon eine Datei
art/svg/<ID>_*.svg oder art/cut/<ID>_*.(png|jpg|webp) vor, wird sie statt des
Platzhalters gezeigt. Nach neuen Scans einfach erneut ausführen:

    python3 art/uebersicht.py
"""
import csv
import html
import re
from collections import Counter
from pathlib import Path

ART = Path(__file__).resolve().parent
OUT = ART / "SKIZZEN_UEBERSICHT.html"

# Batches aus Art-Bibel § 6 (Must-Batches 0–5). S → 6, C → 7.
BATCHES = {
    "0": ["U02", "B03", "K01"],
    "1": ["U01", "U02", "U03", "U04", "E01", "E02", "N04", "N04b"],
    "2": ["B01", "B03", "B04", "B08", "M01a", "M02", "N01", "N01b", "N01c", "N06", "N06b"],
    "3": ["K01", "K03"],
    "4": ["UI01", "UI03..UI09d", "UI11", "UI12", "UI13", "UI13b", "UI13c", "UI16"],
    "5": ["FX01", "FX02", "FX04", "SM01", "SM02", "SM03", "SM05", "SM06"],
}
BATCH_INFO = {
    "0": "Stil-Proben · So 11.10. · Gate",
    "1": "Must-Einheiten · So 18.10.",
    "2": "Must-Gebäude & Felder · So 18.10.",
    "3": "Karte · So 25.10.",
    "4": "Must-UI · Sa 31.10.",
    "5": "Must-FX & Marker · Sa 31.10.",
    "6": "Should · 01.–20.11. (Theme-abhängig)",
    "7": "Could · 22.–27.11. (nach Gate M3)",
    "–": "nicht gezeichnet (Code, Capture, Font, MZP)",
}
GROUPS = [
    ("Einheiten", ["Einheit ORCHESTRA", "Einheit MONOLITH"]),
    ("Gebäude", ["Gebäude ORCHESTRA", "Gebäude MONOLITH"]),
    ("Welt", ["Neutral", "Overlay", "Karte"]),
    ("Effekte & Marker", ["Effekt", "Marker"]),
    ("Oberfläche", ["UI", "Font"]),
    ("Sequenzen (D-16)", ["Sequenz"]),
    ("itch-Seite & Marketing", ["Marketing"]),
]
STATUS = ["offen", "gezeichnet", "gescannt", "im Spiel"]
HAND = {"Hand", "Scan", "Hybrid"}  # Hybrid (D-17): mzone skizziert, Claude Design tuscht


def expand(ids, order):
    out = []
    for i in ids:
        if ".." in i:
            a, b = i.split("..")
            out += order[order.index(a): order.index(b) + 1]
        else:
            out.append(i)
    return out


def find_image(aid):
    pat = re.compile(rf"^{re.escape(aid)}(_|\.)", re.I)
    for sub, exts in (("svg", {".svg"}), ("sonnet/art/svg", {".svg"}), ("cut", {".png", ".jpg", ".jpeg", ".webp"})):
        d = ART / sub
        if d.is_dir():
            for f in sorted(d.iterdir()):
                if f.suffix.lower() in exts and pat.match(f.name):
                    return f"{sub}/{f.name}"
    return None


def main():
    rows = list(csv.DictReader(open(ART / "ASSET_REGISTER.csv", encoding="utf-8")))
    order = [r["ID"] for r in rows]
    batch_of = {}
    for b, ids in BATCHES.items():
        for i in expand(ids, order):
            batch_of.setdefault(i, b)
    for r in rows:
        r["hand"] = r["Quelle"] in HAND
        if not r["hand"]:
            r["batch"] = "–"
        else:
            r["batch"] = batch_of.get(r["ID"]) or {"S": "6", "C": "7"}.get(r["Prio"], "?")
        r["n"] = int(r["Zeichnungen"]) if r["Zeichnungen"].isdigit() else 0
        r["img"] = find_image(r["ID"])

    e = html.escape
    hand = [r for r in rows if r["hand"]]
    total = sum(r["n"] for r in hand)
    st = Counter(r["Status"] for r in hand)
    done = sum(st[s] for s in STATUS[1:])
    prio = Counter(r["Prio"] for r in hand)

    cards = []
    for title, cats in GROUPS:
        items = [r for r in rows if r["Kategorie"] in cats]
        if not items:
            continue
        cards.append(f'<section class="group"><h2>{e(title)} <small>{len(items)} Elemente · '
                     f'{sum(r["n"] for r in items if r["hand"])} Zeichnungen</small></h2><div class="grid">')
        for r in items:
            st_cls = "s" + str(STATUS.index(r["Status"]) if r["Status"] in STATUS else 0)
            if r["img"]:
                pic = f'<img src="{e(r["img"])}" alt="{e(r["ID"])}" loading="lazy">'
            elif r["hand"]:
                pic = (f'<div class="ph"><span class="pid">{e(r["ID"])}</span>'
                       f'<span>Skizze fehlt</span>'
                       f'<code>art/cut/{e(r["ID"])}_….png</code></div>')
            else:
                pic = (f'<div class="ph auto"><span class="pid">{e(r["ID"])}</span>'
                       f'<span>entsteht per {e(r["Quelle"])}</span></div>')
            multi = f'<span class="tag">× {r["n"]}</span>' if r["n"] > 1 else ""
            search = " ".join(r[k] for k in ("ID", "Name", "Kategorie", "Zeichen-Briefing")).lower()
            cards.append(
                f'<article class="card {st_cls}" data-prio="{e(r["Prio"])}" data-batch="{r["batch"]}" '
                f'data-hand="{int(r["hand"])}" data-status="{e(r["Status"])}" data-q="{e(search)}">'
                f'<div class="pic">{pic}</div><div class="body">'
                f'<div class="head"><b>{e(r["ID"])}</b> <span class="prio p{e(r["Prio"])}">{e(r["Prio"])}</span>'
                f'<span class="tag" title="{e(BATCH_INFO[r["batch"]])}">Batch {r["batch"]}</span>{multi}'
                f'<span class="status">{e(r["Status"])}</span></div>'
                f'<h3>{e(r["Name"])}</h3><p>{e(r["Zeichen-Briefing"])}</p>'
                f'<dl><dt>Bogen</dt><dd>{e(r["Bogen"])}</dd><dt>Papier</dt><dd>{e(r["Papiermass_mm"])} mm</dd>'
                f'<dt>Bildschirm</dt><dd>{e(r["Bildschirm_1x_px"])} px</dd><dt>Weg</dt>'
                f'<dd>{e(r["Quelle"])} → {e(r["Pipeline"])}</dd></dl></div></article>')
        cards.append("</div></section>")

    batch_opts = "".join(f'<option value="{b}">Batch {b} – {e(t)}</option>' for b, t in BATCH_INFO.items())
    page = TEMPLATE.format(
        total=total, n_hand=len(hand), n_all=len(rows), done=done,
        pct=round(100 * done / max(len(hand), 1)),
        m=prio["M"], s=prio["S"], c=prio["C"],
        batch_opts=batch_opts, cards="\n".join(cards),
    )
    OUT.write_text(page, encoding="utf-8")
    print(f"{OUT.relative_to(ART.parent)}: {len(rows)} Elemente, {total} Zeichnungen, "
          f"{sum(1 for r in rows if r['img'])} mit Bild")


TEMPLATE = """<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Skizzen-Übersicht</title>
<!-- erzeugt von art/uebersicht.py aus ASSET_REGISTER.csv – nicht von Hand bearbeiten -->
<style>
:root {{
  --sheet:#efe8d6; --paper:#ded4bf; --card:#f0e9db; --ink:#221d17; --ink-soft:#6b6154;
  --grid:#ded3bd; --petrol:#3f7186; --rust:#a85c3c; --rust-deep:#8c3f21; --gold:#b8892f;
}}
* {{ box-sizing:border-box; }}
body {{ margin:0; overflow-wrap:anywhere; background:var(--paper); color:var(--ink);
  font:15px/1.45 "IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace; }}
header {{ padding:28px 16px 12px; max-width:1400px; margin:auto; }}
h1 {{ font:700 clamp(24px,4vw,40px)/1.1 Georgia, "Spectral", serif; margin:0 0 4px; letter-spacing:.02em; }}
.sub {{ color:var(--ink-soft); margin:0 0 16px; }}
.stats {{ display:flex; flex-wrap:wrap; gap:10px; margin-bottom:14px; }}
.stat {{ background:var(--card); border:1.5px solid var(--ink); padding:8px 12px; flex:1 1 140px; }}
.stat b {{ display:block; font-size:22px; }}
.bar {{ height:8px; background:var(--grid); border:1.5px solid var(--ink); margin:6px 0 14px; }}
.bar i {{ display:block; height:100%; background:var(--petrol); }}
.filters {{ display:flex; flex-wrap:wrap; gap:8px; position:sticky; top:0; z-index:2;
  background:var(--paper); padding:10px 16px; max-width:1400px; margin:auto; border-bottom:1.5px solid var(--ink); }}
.filters input, .filters select {{ font:inherit; background:var(--card); color:var(--ink);
  border:1.5px solid var(--ink); padding:6px 8px; min-width:0; flex:1 1 160px; }}
.filters label {{ display:flex; align-items:center; gap:6px; flex:0 0 auto; white-space:nowrap; }}
main {{ max-width:1400px; margin:auto; padding:0 16px 60px; }}
.group h2 {{ font:700 22px Georgia, "Spectral", serif; border-bottom:2px solid var(--ink); padding-bottom:4px; margin:28px 0 12px; }}
.group h2 small {{ font:13px "IBM Plex Mono", monospace; color:var(--ink-soft); }}
.grid {{ display:grid; grid-template-columns:repeat(auto-fill, minmax(min(260px, 100%), 1fr)); gap:14px; }}
.card {{ background:var(--card); border:1.5px solid var(--ink); display:flex; flex-direction:column; }}
.card.hide, .group.hide {{ display:none; }}
.pic {{ aspect-ratio:4/3; background:var(--sheet); border-bottom:1.5px solid var(--ink);
  display:flex; align-items:center; justify-content:center; overflow:hidden; }}
.pic img {{ max-width:92%; max-height:92%; object-fit:contain; }}
.ph {{ width:86%; height:82%; border:2px dashed var(--ink-soft); display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:4px; color:var(--ink-soft); text-align:center; font-size:12px;
  background:repeating-linear-gradient(-45deg, transparent 0 9px, rgba(34,29,23,.05) 9px 10px); }}
.ph.auto {{ border-style:dotted; background:none; }}
.ph .pid {{ font:700 28px Georgia, serif; color:var(--ink); }}
.ph code {{ font-size:11px; word-break:break-all; padding:0 6px; }}
.body {{ padding:10px 12px 12px; }}
.head {{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; font-size:13px; }}
.prio, .tag, .status {{ border:1.2px solid var(--ink); padding:0 5px; font-size:11px; }}
.prio.pM {{ background:var(--ink); color:var(--card); }}
.prio.pS {{ background:var(--petrol); color:var(--card); border-color:var(--petrol); }}
.prio.pC {{ color:var(--ink-soft); border-style:dashed; }}
.status {{ margin-left:auto; color:var(--rust-deep); border-color:var(--rust-deep); }}
.s1 .status, .s2 .status {{ color:var(--gold); border-color:var(--gold); }}
.s3 .status {{ color:var(--petrol); border-color:var(--petrol); }}
.card h3 {{ font:700 16px/1.25 Georgia, "Spectral", serif; margin:8px 0 4px; }}
.card p {{ margin:0 0 8px; font-size:13px; }}
dl {{ display:grid; grid-template-columns:auto 1fr; gap:1px 10px; margin:0; font-size:12px; color:var(--ink-soft); }}
dd {{ margin:0; color:var(--ink); }}
footer {{ max-width:1400px; margin:auto; padding:0 16px 40px; color:var(--ink-soft); font-size:13px; }}
@media print {{ .filters {{ display:none; }} .card {{ break-inside:avoid; }} body {{ background:#fff; }} }}
</style>
</head>
<body>
<header>
  <h1>ORCHESTRATE &amp; DOMINATE · Skizzen-Übersicht</h1>
  <p class="sub">Alles, was mzone für das Spiel zeichnet. Quelle: <code>art/ASSET_REGISTER.csv</code>, Briefings ausführlich in der Art-Bibel § 6.</p>
  <div class="stats">
    <div class="stat"><b>{total}</b>Zeichnungen</div>
    <div class="stat"><b>{n_hand}</b>von Hand (von {n_all} Elementen)</div>
    <div class="stat"><b>{m} · {s} · {c}</b>Must · Should · Could</div>
    <div class="stat"><b>{done} / {n_hand}</b>gezeichnet oder weiter</div>
  </div>
  <div class="bar" title="{pct} %"><i style="width:{pct}%"></i></div>
</header>
<div class="filters">
  <input id="q" type="search" placeholder="Suchen: ID, Name, Briefing …" aria-label="Suchen">
  <select id="prio" aria-label="Priorität"><option value="">alle Prioritäten</option>
    <option value="M">M – Must</option><option value="S">S – Should</option><option value="C">C – Could</option></select>
  <select id="batch" aria-label="Batch"><option value="">alle Batches</option>{batch_opts}</select>
  <select id="status" aria-label="Status"><option value="">jeder Status</option>
    <option>offen</option><option>gezeichnet</option><option>gescannt</option><option>im Spiel</option></select>
  <label><input id="hand" type="checkbox" checked> nur Handzeichnungen</label>
</div>
<main>
{cards}
</main>
<footer>
  Platzhalter werden ersetzt, sobald unter <code>art/svg/&lt;ID&gt;_*.svg</code> oder <code>art/cut/&lt;ID&gt;_*.png</code> eine Datei liegt
  (Dateinamen nach Art-Bibel § 5). Danach <code>python3 art/uebersicht.py</code> ausführen. Status pflegst du in der CSV.
</footer>
<script>
const $ = (id) => document.getElementById(id);
const f = ["q", "prio", "batch", "status", "hand"].map($);
function apply() {{
  const q = $("q").value.trim().toLowerCase();
  document.querySelectorAll(".card").forEach((c) => {{
    const d = c.dataset;
    const ok = (!q || d.q.includes(q)) && (!$("prio").value || d.prio === $("prio").value)
      && (!$("batch").value || d.batch === $("batch").value)
      && (!$("status").value || d.status === $("status").value)
      && (!$("hand").checked || d.hand === "1");
    c.classList.toggle("hide", !ok);
  }});
  document.querySelectorAll(".group").forEach((g) =>
    g.classList.toggle("hide", !g.querySelector(".card:not(.hide)")));
}}
f.forEach((el) => el.addEventListener("input", apply));
apply();
</script>
</body>
</html>
"""

if __name__ == "__main__":
    main()
