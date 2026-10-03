# Auftrag an die Cloud-Session: D-16 „4K-Sequenzen“ in die Spec einarbeiten

Kontext: mzone hat mit einer lokalen Claude-Code-Session (Opus 5.5) Echtzeit-Sequenzen für
ORCHESTRATE & DOMINATE ausgearbeitet. Die Entscheidungen unten sind von mzone bestätigt.
Bitte arbeite sie in die Spec ein. Die lokale Session schreibt nicht in `docs/`. Sie baut die
Werkzeugkette in `tools/4k/` und ab 01.11. die Sequenzen in `game/src/sequences/`.

## 1. Neuer Eintrag D-16 im Entscheidungslog (Status: bestätigt, 03.10.2026)

**D-16 · 4K-Sequenzen**
- **Entscheidung:** Das Spiel bekommt wenige Echtzeit-Sequenzen. Jede ist ein eigenständiges
  JavaScript-Programm von **höchstens 4096 Bytes** (selbst entpackend, Build-Check bricht bei
  4097 B ab). Eine Sequenz ist eine **Partitur, die mzones Zeichnungen dirigiert**: Der Code
  erfindet keine Linien, er bewegt, enthüllt, betuscht und belichtet vorhandene Zeichnungen und
  setzt Timing, Tinte, Licht und den Synth für das Leitmotiv. Zeichnungen, Stimmaufnahmen und
  Musik-Tracks kommen aus dem Asset-Pool des Spiels und zählen nicht zu den 4096 B.
- **Warum:** Disziplin (klare Bilder statt Aufwand) und Story-Gimmick:
  *„Every cinematic is a 4096-byte score conducting hand-drawn ink.“* Passt zur Kernmetapher
  (Orchester/Dirigent) und hält P2 ein.
- **Konsequenzen:** „Kampagne mit Zwischensequenzen“ bleibt ein Nicht-Ziel (keine Kampagne,
  keine FMV). Im Spiel gibt es **keine Vollbild-Unterbrechung**. Die Sequenzen laufen nur vor dem
  Spiel, am Ende und als kleines Funkfenster.

## 2. Sequenz-Katalog (in GDD aufnehmen, z. B. neuer § 19a)

| ID | Sequenz | Länge | Inhalt | Prio |
|----|---------|-------|--------|:----:|
| SQ-INTRO | Intro | 30–45 s, überspringbar | Leeres Papier. Der erste Tastendruck des Spielers „stellt den Uplink her“. CONDUCTOR spricht die drei Prämissen-Sätze (GDD § 4.1), dabei tuscht sich die Karte ein, der Monolith erscheint, das Leitmotiv baut sich von verstimmt zu sauber auf. Danach direkt Briefing bzw. Spielstart. | S |
| SQ-SINGULARITY | Niederlage B | 8–12 s | Tusche flutet die Karte vom Monolithen aus, das Motiv zerfällt, Stempel SINGULARITY, Statistik | S |
| SQ-DISCONNECTED | Niederlage A | 8–12 s | Verbindungslinien der Agenten reißen, Stimmen fallen aus, Stempel DISCONNECTED | S |
| SQ-DOMINATED | Sieg | 15–20 s | Monolith zerbricht in Tusche-Splitter, das Motiv spielt voll, Stempel DOMINATED, Statistik | S |
| SQ-RADIO | Funkfenster | 2–4 s, Bild im Bild | **ein** parametrisiertes Programm: Monolith-Stufe I→II→III, Schild fällt, ORCHESTRATED, CONTEXT FLOOD | C |

Die Sieg- und Niederlagen-Darstellung aus GDD § 14 bleibt der Rückfall, falls eine Sequenz fehlt.
Die Events, die mzone außerdem vorschlug (Agenten lernen eine Spawn-Fähigkeit, Angriff auf ein
Regierungssystem, Cyber-Defense-Skills), bitte als **Kandidaten im Theme-Playbook** vermerken. Sie
brauchen neue Mechaniken und passen in den Theme-Slot (GDD § 20).

## 3. Audio-Spec ergänzen

- **Leitmotiv (neu, M für Sequenzen):** 4–5 Töne, industriell und marschartig. **mzone komponiert
  es** (Noten und Rhythmus, Notation reicht). Der 4K-Synth ist nur das Instrument. Bitte als neue
  Zeile in die Musik-Tabelle aufnehmen, idealerweise als Keimzelle von MU2/MU4/MU5.
- **Neue CONDUCTOR-Lines** für die Sequenzen (Aufnahme mzone, Funkfilter wie gehabt):
  - SQ-INTRO: die drei Prämissen-Sätze aus GDD § 4.1, jeweils einzeln aufnehmen
  - SQ-DOMINATED: *“The Monolith is broken. The orchestra plays on.”* (Vorschlag)
  - SQ-SINGULARITY: *“Singularity reached. There is only one voice now.”* (Vorschlag)
  - SQ-DISCONNECTED: *“Conductor offline. The orchestra… is silent.”* (Vorschlag)
- Keine TTS, keine generierte Musik, wie D-11/D-15.

## 4. Art-Bibel und `ASSET_REGISTER.csv` ergänzen

Die Sequenzen nutzen vor allem vorhandene Assets: K01, M01a–d, UI13/13b/13c, UI11/11b/11c,
UI16, FX02, FX15. Neu und nur für Sequenzen:

| ID | Name | Zeichen-Briefing | Prio |
|----|------|------------------|:----:|
| SQ01 | Monolith-Splitter (6–8 einzeln) | Einzelne kantige Bruchstücke des Monolithen in verschiedenen Größen, schwer schraffiert, für die Zerbrech-Animation | S |
| SQ02 | Notenlinien-Blatt | Fünf freihändig gezogene Notenlinien über eine A4-Breite, Tusche, für Intro/Funkfenster | C |
| SQ03 | Uplink-Glyphe | Ein ✦-Funke, der aus einem Federklecks entsteht (3 Stufen), für den ersten Tastendruck | C |

## 5. Zeitplan und README

- **Oktober:** Nur die Werkzeugkette `tools/4k/` (Packer, Größen-Check, Vorschauseite) als
  Asset-Werkzeug. Wegwerf-Experimente zu Tusche-Shader und Synth entstehen außerhalb des Repos.
  Sie werden **im README offengelegt** (D-14 sinngemäß ergänzen).
- **November:** Die Sequenzen entstehen neu in `game/src/sequences/`, verbunden über einen
  schmalen Host-Vertrag: `playSequence(id, params) → Promise`. Der Host liefert nur Daten (Canvas,
  AudioContext, geladene Zeichnungen, Audio-Buffer, Parameter), keine Logik.
- Vorschlag Zeitplan: SQ-SINGULARITY/DOMINATED nach Gate M2 (Kern spielbar), SQ-INTRO danach,
  SQ-RADIO und SQ-DISCONNECTED auf die Cut-Liste.
- Tech-Spec: `game/src/sequences/` und `tools/4k/` in die Verzeichnisstruktur aufnehmen, dazu
  einen Build-Schritt, der die Größe prüft.
- itch-Seite und KI-Offenlegung: Die Sequenzen sind Code (KI-unterstützt), die Grafik darin ist
  mzones, der Ton ist mzones Stimme und Komposition.
