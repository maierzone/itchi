"""Wegwerf-Spike: Kontaktbogen (Original | Tusche-Trace | Cyborg | Cyborg @48px) als HTML + PNG via Edge headless."""
import base64, io, os, pathlib, subprocess, sys
from PIL import Image
from extract import SRC, BOXES, F
from stylize import stylize

# Browser: $CHROMIUM (wie tools/4k), sonst Edge unter Windows, sonst `chromium` im PATH
BROWSER = os.environ.get("CHROMIUM") or (r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" if os.name == "nt" else "chromium")

def crop_uri(name):
    c = Image.open(SRC).crop(tuple(int(v * F) for v in BOXES[name]))
    c.thumbnail((500, 500))
    b = io.BytesIO(); c.save(b, "JPEG", quality=85)
    return "data:image/jpeg;base64," + base64.b64encode(b.getvalue()).decode()

names = sys.argv[1:] or list(BOXES)
rows = ""
for n in names:
    fac = "monolith" if n.startswith("crawler") else "orchestra"
    rows += (f'<tr><th>{n}</th><td><img src="{crop_uri(n)}"></td><td>{stylize(n, "none", fac)}</td>'
             f'<td>{stylize(n, "cyborg", fac)}</td><td class="s">{stylize(n, "cyborg", fac, hud=False)}</td></tr>')
html = ("<!doctype html><meta charset=utf-8><style>body{background:#efe8d6;font:13px 'IBM Plex Mono',Consolas,monospace;color:#221d17;margin:16px}"
        "table{border-collapse:collapse}td,th{padding:8px 12px;border-bottom:1px solid #ded3bd;vertical-align:middle}"
        "td svg,td img{height:300px;width:auto;display:block}td.s svg{height:48px}</style>"
        "<h3>Probe: gleiche Vektoren, Stil als Parameter</h3><table><tr><th></th><th>Foto</th><th>style=none (Trace)</th><th>style=cyborg</th><th>cyborg @ 48px</th></tr>"
        + rows + "</table>")
open("art/probe/kontaktbogen.html", "w", encoding="utf-8").write(html)
import time
if os.path.exists("art/probe/kontaktbogen.png"): os.remove("art/probe/kontaktbogen.png")
subprocess.run([BROWSER, "--headless=new", "--disable-gpu", "--user-data-dir=" + __import__("tempfile").mkdtemp(), "--hide-scrollbars", f"--window-size=1750,{110 + 340 * len(names)}",
                "--screenshot=" + os.path.abspath("art/probe/kontaktbogen.png"), pathlib.Path("art/probe/kontaktbogen.html").resolve().as_uri()],
               check=True, capture_output=True)
for _ in range(60):  # Edge kehrt vor dem Schreiben zurück
    if os.path.exists("art/probe/kontaktbogen.png"): break
    time.sleep(.5)
print("ok")
