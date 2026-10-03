# Batch 0 · Stil-Proben bis So 11.10.

> **Ausdrucken:** [`batch0_druckpaket.pdf`](batch0_druckpaket.pdf) (4 Seiten A4, **100 % / Tatsächliche Größe**).
> Seite 1 dieser Zettel · Seite 2 Einheiten-Bogen · Seite 3 Gebäude-Bogen · Seite 4 Kartenprobe.
> Batch 0 ist ein **Gate**: Sehen die drei Proben im Spiel bei 1x gut aus, zeichnest du ab 12.10. in Serie. Wenn nicht, ändern wir zuerst Stifte oder Maßstab ([Art-Bibel § 10](../../docs/03_ART_UND_ASSET_BIBEL.md#10-zeichen-reihenfolge-verbindlich)).

## Vor dem Zeichnen

- [ ] Testdruck: die 10-mm-Linie auf Seite 4 nachmessen. Ist sie nicht 10 mm, Druckeinstellung auf 100 % stellen.
- [ ] Vorzeichnen nur mit **hellblauem Buntstift** (wird beim Scan entfernt).
- [ ] Auf Papier **nur schwarze Tusche**. Farbe kommt digital (D-13).

## Die drei Proben

| ID | Was | Bogen · Feld | Briefing | Stifte | Im Spiel |
|----|-----|--------------|----------|--------|----------|
| **U02** | EXECUTOR | Einheiten-Bogen, **ein** Feld ø40 mm, Figur ≤ 30 mm hoch | Kleine aufrechte Figur, Kopf = Funken-Glyphe ✦, Werkzeugarm mit kurzem Blaster, Rucksack mit Antenne. ¾-Ansicht, **Blick nach rechts**, keine Schrift, keine Schraffur | Außenkontur **1,0–2,0 mm** · Details **0,5–0,8 mm** | 48 px |
| **B03** | TOKENIZER | Gebäude-Bogen, Feld **3×3** (Grundfläche 60 mm + Höhenzugabe, gesamt 60 × 90 mm) | Großer Trichter, in den Datenwürfel fallen. Unten Rutsche mit ✦-Münzen, seitliche Andockrampe für CRAWLER. Vogelschau, Fassade schräg von vorn (~30°) | Kontur **0,8–1,2 mm** · Details **0,3–0,5 mm** | 192 × 288 px |
| **K01-Probe** | Kartenausschnitt | Kartenprobe-Bogen, **100 × 100 mm** | Stück Fluss mit Brücke, Straße, Waldrand, Klippenecke. Streng von oben. Keine Einheiten, Gebäude, Datenfelder | Linien **0,3–0,5 mm** · Schraffur **0,1–0,3 mm** | 1 Kachel = 6,4 mm = 64 px |

## Nach dem Zeichnen

- [ ] **3-Meter-Test:** Blatt auf 3 m Abstand halten. Erkennst du die Figur? Dann trägt sie auch bei 48 px.
- [ ] Scannen mit **600 dpi, Farbe**, ohne Auto-Korrektur. Handy-Scan-App geht auch (flach, Tageslicht, ohne Schatten).
- [ ] Dateien nach `art/scans/<bogen>_<datum>.png` legen, z. B. `art/scans/einheiten_2026-10-10.png`, und pushen (oder der Cloud-Session schicken).
- [ ] In `art/ASSET_REGISTER.csv` den Status von U02, B03, K01 auf `gezeichnet` bzw. `gescannt` setzen.

Danach schneidet, vektorisiert und färbt Claude die Proben ein und zeigt sie in einem Testbild in Spielgröße ([Zeitplan KW 41](../../docs/06_ZEITPLAN.md)).
