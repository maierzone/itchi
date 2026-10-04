# tools/4k – Packer und Größen-Wächter für 4K-Sequenzen

Asset-Werkzeug zu Entscheidung **D-16 „4K-Sequenzen“**. Eine Sequenz ist ein JavaScript-Programm
von **höchstens 4096 Bytes**, das mzones Zeichnungen dirigiert: Der Code erfindet keine Linien, er
bewegt, enthüllt, betuscht und belichtet vorhandene Zeichnungen und spielt das Leitmotiv.
Zeichnungen, Stimmaufnahmen und Musik-Tracks liefert das Spiel, sie zählen nicht zu den 4096 B.

Entstanden im Oktober 2026 vor dem Jam, als Werkzeug (D-14). Die Sequenzen selbst entstehen
ab 01.11. unter `game/src/sequences/`.

## Benutzung

```sh
npm install
node pack.mjs <quelle.js> [-o dist/name.js] [--iter 500] [--no-terser]   # packen + Bilanz
node pack.mjs --check dist/*.js                                         # Größen-Wächter (CI)
node headless.mjs dist/name.js --shots 1,5,10 [--size 1920x1080] [--gpu] # Lauf + Screenshots
                                          # Browser: $CHROMIUM, sonst `chromium`
node test.mjs                                                            # Selbsttest des Packers
```

Selbsttest der Zeichnungs-Ebenen (aus dem Repo-Wurzelverzeichnis, damit `art/` erreichbar ist):

```sh
node tools/4k/pack.mjs tools/4k/fixtures/layers.js -o tools/4k/dist/layers.js
node tools/4k/headless.mjs tools/4k/dist/layers.js --m tools/4k/fixtures/layers.json --shots 1.2,1.9
```

`pack.mjs` beendet sich mit Exit-Code 1, sobald eine Datei 4097 Bytes oder mehr hat.
Die Vorschau im Browser: einen statischen Server in diesem Ordner starten und
`preview.html?s=dist/name.js&hud=1` öffnen (optional `&m=manifest.json`, `&p={...}`).

## Pipeline

1. **GLSL-Blöcke** (Template-Literale mit dem Präfix `/*glsl*/`) werden von Kommentaren und
   überflüssigem Leerraum befreit. Interpolation `${}` ist in diesen Blöcken nicht erlaubt.
2. **terser** minifiziert das JS (`bare_returns`, Toplevel-Mangling, ASCII-Ausgabe).
3. **zopfli** komprimiert als rohes Deflate (`deflate-raw`).
4. Ein **Stub mit 166 B** entpackt zur Laufzeit über `DecompressionStream` und ruft den Code als
   `Function('$', code)($)` auf. Die komprimierten Bytes stehen unverändert in einem
   Template-Literal. Nur `\`, `` ` ``, `${` und CR werden maskiert.

Gemessen wird die **ausgelieferte Datei**, nicht die gzip-Größe des Servers.

## Vertrag mit dem Host (Entwurf, wird im November `game/src/sequences/API.md`)

Der Host lädt die Datei als Bytes, macht daraus einen String mit **einem Zeichen pro Byte**
(Zeichencode = Byte, also weder UTF-8 noch windows-1252) und ruft `Function('$', text)($)` auf.
Das Ergebnis ist ein Promise, das sich auflöst, wenn die Sequenz zu Ende ist.

| Feld | Inhalt |
|------|--------|
| `$.c` | Canvas, bildschirmfüllend. Der Host setzt `width`/`height` in Gerätepixeln, auch bei Resize. Die Sequenz liest die Größe **jeden Frame** neu. |
| `$.a` | `AudioContext`, schon gestartet (der Klick des Spielers ist vorher passiert) |
| `$.o` | Audio-Ausgang der Sequenz (`GainNode`). Der Host kann ihn ducken oder abschalten. |
| `$.d` | Zeichnungen `{id: ImageBitmap}`, z. B. `K01`, `M01a`, `UI13` (IDs aus `ASSET_REGISTER.csv`), dazu Ebenen wie `U01a.arm` (siehe unten) |
| `$.v` | Stimmaufnahmen `{id: AudioBuffer}` (CONDUCTOR-Lines) |
| `$.m` | Musik-Tracks `{id: AudioBuffer}` (MU1 …) |
| `$.p` | Parameter der Sequenz, z. B. Statistik `{time, hallucinations, scrapers}` |
| `$.q` | `AbortSignal` fürs Überspringen (Esc/SKIP). Ist `$.q.aborted` gesetzt, stoppt die Sequenz ihre Audioquellen und löst ihr Promise auf. |

Der Host liefert **nur Daten, keine Logik**. Alles, was man sieht und hört, steuert die
Sequenz selbst innerhalb ihrer 4096 Bytes.

### Zeichnungen: ganze Bilder und Ebenen (entschieden 04.10.2026, D-17)

Die Hybrid-SVGs aus D-17 sind in benannte Gruppen gegliedert (CRAWLER: `tank`, `tread`, `body`,
`face`, `sign`, `arm` unter `#base`, dazu `#detail`). Der Host liefert sie **gerastert als
`ImageBitmap`**, kein `Path2D`: Die Sequenzen zeichnen mit WebGL2, ein `Path2D` bräuchte dort
eine eigene 2D-Canvas und einen Textur-Upload pro Frame, und beides kostet Bytes in jeder Sequenz.

- **Ganze Figur:** `$.d.U01a` ist die vollständige Zeichnung (Frame A, mit `#detail`).
- **Ebene:** `$.d['U01a.arm']` enthält nur die Gruppe `#arm`. Jede Ebene hat **denselben Rahmen
  wie die ganze Figur** (volle viewBox, Rest transparent). Alle Ebenen einer Figur liegen also
  deckungsgleich auf demselben Quad, die Sequenz bewegt nur die, die sie braucht.
  `U01a.base` ergibt die Spielform ohne Details.
- **Malreihenfolge** ist die Reihenfolge im SVG. Wer eine Figur aus Ebenen zusammensetzt,
  zeichnet sie in dieser Reihenfolge.
- **Drehpunkte** (Schulter, Achse) liefert der Host nicht. Die Sequenz trägt sie selbst als
  Anteil der viewBox ein (z. B. Schulter des CRAWLER bei 0,6 / 0,725), das sind wenige Bytes.
- **Auflösung:** SVGs rastert der Host auf die Höhe der Canvas beim Laden, damit Großaufnahmen
  scharf bleiben. Welche Ebenen geladen werden, legt das Manifest der Sequenz fest, es gibt
  keine Ebenen auf Vorrat. Im Manifest steht dafür ein Fragment an der Datei:
  `"U01a.arm": "…/U01_crawler_a.svg#arm"` (Referenz: `preview.html`, Beispiel: `fixtures/layers.json`).
- **Grenze:** `#detail` ist bisher eine Gruppe für die ganze Figur. Bewegt die Sequenz den Arm,
  bleiben seine Nähte stehen. Für bewegliche Teile müssen die Details je Teil gegliedert sein
  (z. B. `#detail` mit Untergruppen `arm`, `face`), das ist eine Vorgabe an die Art-Pipeline.

## Browser

Nötig sind WebGL2, `DecompressionStream('deflate-raw')` (Chrome 80+, Firefox 113+,
Safari 16.4+) und WebAudio.
