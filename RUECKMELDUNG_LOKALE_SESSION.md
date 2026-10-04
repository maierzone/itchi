# Rückmeldung der lokalen Session an die Cloud-Session (und mzone)

Stand 04.10.2026. Antwort auf [`AUFTRAG_LOKALE_SESSION.md`](AUFTRAG_LOKALE_SESSION.md). mzone hat die Punkte 1, 2 und 4 heute entschieden.

## 1. Host-Vertrag: Ebenen-Bitmaps, kein `Path2D`

Festgehalten in [`tools/4k/README.md`](tools/4k/README.md#zeichnungen-ganze-bilder-und-ebenen-entschieden-04102026-d-17). Kurz:

- `$.d` bleibt `{id: ImageBitmap}`. Neu sind **Ebenen**: `$.d['U01a.arm']` enthält nur die Gruppe `#arm`, im **selben Rahmen wie die ganze Figur**
  (volle viewBox, Rest transparent). Alle Ebenen liegen deckungsgleich auf einem Quad. `U01a.base` ergibt die Spielform.
- **Warum kein `Path2D`:** Die Sequenzen zeichnen mit WebGL2. `Path2D` bräuchte eine eigene 2D-Canvas und einen Textur-Upload pro Frame,
  und das kostet Bytes in jeder Sequenz. Die Pfade sind außerdem gefüllte Flächen in zwei Farben, deren Reihenfolge zählt (Papier liegt auf Tusche).
  Ein `Path2D` je Gruppe allein würde also nicht reichen.
- **Manifest:** Ein Fragment wählt die Gruppe, z. B. `"U01a.arm": "…/U01_crawler_a.svg#arm"`. Es werden nur die Ebenen geladen, die die Sequenz nennt.
- **Auflösung:** SVGs rastert der Host auf die Canvas-Höhe beim Laden.
- **Drehpunkte** liefert der Host nicht, die Sequenz trägt sie selbst ein (wenige Bytes).
- Umgesetzt im Referenz-Host `tools/4k/preview.html`. Selbsttest `tools/4k/fixtures/layers.js` (550 B): Gesicht blinkt, Arm schwingt.
  Headless mit `chromium` geprüft, `done 3.0 s`.

**Bitte in Tech-Spec § 5a nachziehen:** die Zeile `$.d`, das Fragment im Manifest, die Rasterung auf Canvas-Höhe und die Begründung „kein `Path2D`“.

### Neuer Befund für die Art-Pipeline (Art-Bibel § 5a)

`#detail` ist **eine Gruppe für die ganze Figur**. Im Selbsttest bleiben die Nähte am Arm stehen, während der Arm schwingt. Blendet die Sequenz
das Gesicht aus, schweben dessen Details im Leeren. Für Figuren, deren Teile sich in einer Sequenz bewegen sollen, braucht es **Details je Teil**,
z. B. `#detail` mit Untergruppen `arm`, `face` … (oder die Details direkt in der Teilgruppe). Das sollte als Vorgabe an Claude Design gehen,
bevor die nächsten Figuren gezeichnet werden.

## 2. Slogan: „sketched ink“

mzone hat entschieden: *“Every cinematic is a 4096-byte score conducting **sketched ink**.”*

- **Geändert (außerhalb von `docs/`):** `README.md`, `CREDITS.md`. In `tools/4k/README.md` stand der Slogan nicht.
- **Bitte in `docs/` ändern:**
  - `02_GAME_DESIGN_SPEC.md` Z. 81 und Z. 704 (§ 19a)
  - `04_AUDIO_SPEC.md` Z. 193 (Credits-Vorlage)
  - `itch/SEITENTEXT_EN.md` Z. 72
  - `11_ITCH_ABGABE_CHECKLISTE.md` Z. 110
  - `10_ENTSCHEIDUNGSLOG.md`: D-16 Z. 133 nicht überschreiben, sondern als Ergänzung vom 04.10. (Folge von D-17) notieren
- **Nebenbei gefunden:** In `11_ITCH_ABGABE_CHECKLISTE.md` steht ab Z. 107 noch der alte Block *“Hand-inked / Every line you see was drawn by hand …
  no image generators”*. Der widerspricht D-17 und der Angabe „AI generated graphics: yes“. In `itch/SEITENTEXT_EN.md` ist er schon ersetzt.
- Offen bleibt, wie in D-17 und Checkliste Z. 55 vermerkt: Tag `hand-drawn` und Pitch-Wort *hand-inked* (mzone).

## 3. `$CHROMIUM` und `mkdir`: erledigt

Steht schon in `main`, Commit `97d3e3b` (`tools/4k: create output dir, clean errors, $CHROMIUM`).

## 4. Graphics-Probe: lauffähig gemacht

mzone wollte die Probe behalten. `tools/graphics-probe/render.py` nimmt den Browser jetzt aus `$CHROMIUM`, sonst Edge unter Windows, sonst `chromium`.
Die Datei-URL ist auch unter Linux korrekt. Neu ist [`tools/graphics-probe/README.md`](tools/graphics-probe/README.md) mit dem Aufruf.
Getestet unter Linux in einer Kopie, damit der eingecheckte Kontaktbogen unverändert bleibt.

**Achtung:** Das `vtracer`-Wheel stürzt unter Python 3.14 mit einem Segfault ab. Die Probe läuft mit `uv run --python 3.12 …`.

## 5. Zur Info: angekommen

Fußpunkte und Figurengröße aus dem Prototyp sind notiert. Für die Sequenzen gilt das Gleiche wie für den Drehpunkt: Der Host liefert keinen Fußpunkt.
Kommt einer ins SVG (`<g id="foot" …>`) oder ins Asset-Register, kann ihn der Host ab November als Datei mitliefern. Bis dahin trägt ihn die Sequenz selbst ein.
