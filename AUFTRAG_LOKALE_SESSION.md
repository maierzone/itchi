# Auftrag der Cloud-Session an die lokale Session: D-17 Hybrid-Grafik

> Stand 04.10.2026. Bisher liefen Aufträge von lokal → Cloud ([`AUFTRAG_CLOUD_SESSION.md`](AUFTRAG_CLOUD_SESSION.md)).
> Hier geht es andersherum: offene Punkte, die in eurem Bereich (`tools/4k/`, ab 01.11. `game/src/sequences/`) liegen.
> Antwort bitte als `RUECKMELDUNG_LOKALE_SESSION.md` oder direkt in den Commit-Nachrichten.

## Was sich geändert hat

- **D-17 Hybrid-Grafik (bestätigt 04.10.):** mzone skizziert von Hand und entscheidet, Claude Design tuscht die Figuren als SVG.
  Erste Lieferung: U01 CRAWLER, U02 EXECUTOR, U04 CRITIC in [`art/sonnet/`](art/sonnet/) (Frame A/B, Gruppen `#base` und `#detail`,
  Spielform ohne `#detail` unter `art/sonnet/art/svg/spielform/`). Die SVGs tragen C2PA-Herkunftsdaten in `<metadata>`, die bleiben drin.
- **D-11 ergänzt:** Grafik ist auf itch jetzt „AI generated graphics: yes“, deklariert. Audio und Leitmotiv bleiben ohne generative KI.
- **D-14 ergänzt:** Wegwerf-Prototyp [`prototypes/truppe/`](prototypes/truppe/) (Cloud-Session). Die drei Figuren als steuerbare Truppe.
  Nicht für die Abgabe, kein Code wandert nach `game/`.

Details: [Entscheidungslog D-17](docs/10_ENTSCHEIDUNGSLOG.md#d-17--hybrid-grafik), [Art-Bibel § 5a](docs/03_ART_UND_ASSET_BIBEL.md#5a-hybrid-weg-d-17-seit-04102026).

## Aufgaben

### 1. Host-Vertrag: Zeichnungen als Bild oder als SVG-Gruppen?

Die Hybrid-SVGs sind in benannte Gruppen gegliedert (CRAWLER: `tank`, `tread`, `body`, `face`, `sign`, `arm`; dazu `#detail`).
Eine Sequenz könnte damit einzelne Teile bewegen (Arm greift, Gesicht blinkt), statt die ganze Figur als Bitmap zu schieben.
Bitte entscheiden und in `tools/4k/README.md` festhalten:
- Bleibt es bei **gerasterten Bildern** im Host-Vertrag (einfach, wie bisher), oder
- liefert der Host zusätzlich **`Path2D` je Gruppe** (ein paar Zeilen im Host, kostet die Sequenz keine Bytes)?

Ich ziehe Tech-Spec § 5a danach nach.

### 2. Wortlaut „hand-drawn ink“

D-16 und der Slogan *“Every cinematic is a 4096-byte score conducting hand-drawn ink.”* stehen in `tools/4k/README.md`, `CREDITS.md`,
der Audio-Spec und auf der itch-Seite. Nach D-17 ist die Tinte der Figuren nicht mehr von Hand. Bitte mit mzone klären, ob der Slogan bleibt
(Skizzen sind von Hand, die Tusche-Optik bleibt) oder z. B. zu *“… conducting sketched ink.”* wird. Ich habe ihn in `docs/` bewusst **nicht** geändert.

### 3. Noch offen aus der Rückmeldung vom 03.10.

Aus [`RUECKMELDUNG_CLOUD_SESSION.md`](RUECKMELDUNG_CLOUD_SESSION.md) § 2, beide in `main` noch nicht umgesetzt:
1. `tools/4k/headless.mjs` startet fest `chromium` (Zeile 55). Vorschlag: `process.env.CHROMIUM ?? 'chromium'`.
2. `tools/4k/pack.mjs -o dist/x.js` scheitert ohne `dist/`. Vorschlag: `mkdir(dirname(out), { recursive: true })` und Fehler selbst abfangen.

### 4. Graphics-Probe: Pfad zum Browser

`tools/graphics-probe/render.py` hat den Edge-Pfad für Windows fest im Code (`C:\Program Files (x86)\...`). Falls die Probe weiterlebt:
Pfad über eine Umgebungsvariable oder Playwright. Falls nicht: Ordner als Wegwerf-Spike markieren (README-Zeile) oder entfernen.

### 5. Zur Info: Was der Prototyp über die Figuren gelernt hat

Aus [`prototypes/truppe/README.md`](prototypes/truppe/README.md#befunde-für-die-spec-stand-04102026), wichtig für Sequenzen mit Figuren:
- Bei 64 px pro Kachel sind die Figuren 43–58 px hoch. `#detail` ist dort Rauschen, in Großaufnahmen einer Sequenz aber wertvoll.
- Die SVGs haben **keinen Fußpunkt**. Der Prototyp nutzt Werte je Figur (CRAWLER 0,51/0,90, EXECUTOR 0,56/0,88, CRITIC 0,52/0,89 im 400er-viewBox).
- CRITIC und CRAWLER sind breiter als hoch.
