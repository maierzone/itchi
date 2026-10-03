# Auftrag 2 an die Cloud-Session: Nachträge zu D-16

Review der lokalen Session zu Commit b65becb. Die Einarbeitung ist vollständig und stimmig,
danke. Bitte drei Punkte nachtragen. `main` enthält jetzt auch `tools/4k/` (Commits 40d945d, 94aa0c7).

## 1. Tech-Spec § 5a: Übergabe Intro → Spiel (Kamera-Parameter)

Das Beat-Sheet SQ-INTRO (GDD § 19a.3) endet „nahtlos ins Spiel, denn es ist dieselbe Karte“.
Die Sequenz zeichnet aber auf eine **eigene Canvas**, das Spiel auf die Phaser-Canvas. Ein
pixelgleicher Schnitt würde die 4K-Sequenz eng an Kamera, Maßstab und Fog-Rendering des Spiels
koppeln.

Bitte so festlegen:
- Der Host übergibt SQ-INTRO in `params` die Startansicht des Spiels:
  `cam: [x, y, zoom]` (Kartenkoordinaten in Kacheln, Zoom wie Kamera § 18) und
  `start: [x, y]` (Mittelpunkt der Startbasis).
- Die Sequenz fährt am Ende auf diese Ansicht und zieht die Tusche bis auf den Startbereich
  zurück. Der eigentliche Wechsel ist eine **kurze Tusche-Überblendung (~0,5 s)**, kein
  pixelgleicher Schnitt. Der Host startet das Spiel darunter, bevor das Promise sich erfüllt.
- Dazu den Host-Vertrag festhalten: Das Feld `$.q` ist das `AbortSignal` (so umgesetzt in
  `tools/4k/preview.html`).

## 2. Zeitplan § 4a: Wessen Stunden sind die 92 h?

§ 4a rechnet die Sequenzen mit ~12 h gegen das Should-Budget von Szenario B. Gebaut werden sie
aber von der **lokalen Session parallel** zur Cloud-Session. Bitte klären und dokumentieren:
- Sind die 92 h **mzones Stunden** (Aufmerksamkeit, Review, Entscheidungen) oder
  **Engineering-Stunden der Cloud-Session**?
- Sind es mzones Stunden, kosten die Sequenzen ihn eher **Review und Feinschliff (~4–5 h)**.
  Der Host F46 (~2 h) bleibt bei der Cloud-Session. Dann ist der Konflikt in Grill N1
  (SQ-INTRO gegen F35) deutlich kleiner. Tabelle und N1 entsprechend nachrechnen.

## 3. Kleine Korrektur in § 4a: F31 und SQ-INTRO

„Wer SQ-INTRO baut, hat F31 halb fertig“ stimmt nur für **Look und Shader-Idee**. Code teilen
die beiden nicht: Die Sequenz ist ein eigenständiges 4K-Programm, der Fog läuft über eine
Phaser-Pipeline. Bitte umformulieren, etwa: „F31 übernimmt Look und Shader-Idee aus SQ-INTRO
(Tuschefront mit Wasserrand), der Code wird für Phaser neu geschrieben.“ Die Reihenfolge der
Liste bleibt.

## Zur Info (keine Änderung nötig)

- SQ-RADIO mit ≤ 2 ms pro Frame bedeutet einen zweiten WebGL-Kontext neben Phaser. Die lokale
  Session misst das. Rückfall wäre Canvas2D fürs Funkfenster.
- Der Look-Test „Karte tuscht sich ein“ (Bleistiftskizze zittert, Tuschefront mit warmem
  Wasserrand fixiert sie) läuft mit 1642 B bei 60 fps. Er liegt außerhalb des Repos.
