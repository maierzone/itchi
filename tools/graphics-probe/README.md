# tools/graphics-probe – Wegwerf-Spike vom 04.10.2026

Foto der Handskizze → Tusche-Maske → vtracer → Stil als Parameter (`none` | `cyborg`).
Ergebnis ist der Kontaktbogen in [`art/probe/`](../../art/probe/). Hintergrund: [D-17](../../docs/10_ENTSCHEIDUNGSLOG.md#d-17--hybrid-grafik).

Aufruf aus dem Repo-Wurzelverzeichnis (überschreibt `art/probe/kontaktbogen.html` und `.png`):

```sh
uv run --python 3.12 --with pillow,vtracer,numpy,scipy python tools/graphics-probe/render.py [crawler1 krieger …]
```

- **Python 3.12:** Das `vtracer`-Wheel stürzt unter Python 3.14 mit einem Segfault ab (Stand 04.10.2026).
- **Browser:** `$CHROMIUM`, sonst unter Windows Edge, sonst `chromium` aus dem PATH.
