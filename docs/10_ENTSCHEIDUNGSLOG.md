# 10 · Entscheidungslog

> Jede wichtige Entscheidung steht hier **einmal**, mit Begründung und Status.
> **Status:** 🟡 *vorgeschlagen* (Default aus der Spec) · 🟢 *bestätigt* (von mzone) · 🔴 *verworfen* · ⚪ *offen*
> **Regel:** Alles, was am **Mi 07.10.2026** noch 🟡 ist, gilt als 🟢 bestätigt. Danach ändern wir Entscheidungen nur mit neuem Eintrag (nicht überschreiben).

## Übersicht

| ID | Entscheidung | Status | Grill-Bezug |
|----|-------------|:------:|-------------|
| D-01 | Engine: **Phaser 3 + TypeScript + Vite** | 🟡 | B4 |
| D-02 | Perspektive: **Lagekarte + Vogelschau-Spielsteine** | 🟡 | F2 |
| D-03 | KI im Spiel: **simuliert**, Keyword-Parser = Could, echte LLMs = Won’t | 🟡 | E1 |
| D-04 | Titel: **ORCHESTRATE & DOMINATE**, Codename **KAOD** | 🟡 | I1 |
| D-05 | Plattform: **Browser (HTML5), Desktop, Maus + Tastatur** | 🟡 | K2 |
| D-06 | Sprache: **Englisch im Spiel**, Deutsch in der Doku | 🟡 | K3 |
| D-07 | **1 spielbare Fraktion** gegen asymmetrischen Monolith, **kein Multiplayer** | 🟡 | C5, C6 |
| D-08 | Steuerung: **Hybrid** (direkt + Direktiven mit FLOW-Bonus) | 🟡 | C2 |
| D-09 | Scope: **Szenario B** (Tier 0 + Should-Favoriten), Cut-Liste verbindlich | 🟡 | B1, D2 |
| D-10 | Lizenzen: Code **MIT**, Kunst/Audio **CC BY-NC-ND 4.0** | 🟡 | J1 |
| D-11 | **Handmade-Versprechen** + ehrliche KI-Offenlegung | 🟡 | E3, F5, G2 |
| D-12 | Theme-Interpretation | ⚪ bis 02.11. | H1, H2 |
| D-13 | Farbe: **Tusche schwarz auf Papier**, Farbe digital, Teamfarbe im Sockel | 🟡 | F4 |
| D-14 | Repository: **`maierzone/itchi`** ist das Spiel-Repo, Spielcode ab 01.11. unter `game/` | 🟡 | – |
| D-15 | Audio: **eigene Stimme** als CONDUCTOR (EN), Schreibtisch-SFX, Musik von Menschen (CC0/CC-BY oder eigen) | 🟡 | G1, G2 |
| D-16 | **4K-Sequenzen**: wenige Echtzeit-Sequenzen, je ≤ 4096 B JavaScript, die mzones Zeichnungen dirigieren | 🟢 03.10.2026 | N1–N3 |
| D-17 | **Hybrid-Grafik**: mzone skizziert und entscheidet, KI tuscht die Figur als SVG. Offen als KI-Grafik deklariert | 🟢 04.10.2026 | E3, F5, G2 |

---

## D-01 · Engine

- **Kontext:** Browser-Jam, KI-gestütztes Coden, SVG-Pipeline, RTS-Bausteine nötig.
- **Entscheidung:** Phaser 3 + TypeScript + Vite. Aktuelle stabile Version am 01.11. festnageln.
- **Alternativen:** Godot 4 (GDScript): stärker bei Navigation und Editor, gewinnt, **wenn mzone Godot beherrscht**. Unity: zu schwer fürs Web. PixiJS + Eigenbau: zu viel Eigenarbeit.
- **Begründung:** [Matrizen § 5](07_MATRIZEN.md#5-entscheidungsmatrix-engine) (4,00 vs. 3,60).
- **Konsequenzen:** Wegfindung selbst bauen (A* + Budget), Karteneditor Tiled extern.
- **Status:** 🟡 · Bestätigt am: ______

## D-02 · Perspektive

- **Kontext:** RA2 ist isometrisch, und Handzeichnung in 8 Richtungen ist nicht machbar.
- **Entscheidung:** Karte von oben, Gebäude/Figuren im Vogelschau-Aufriss, Figuren als Spielsteine auf Sockeln, nur gespiegelt.
- **Begründung:** [Matrizen § 6](07_MATRIZEN.md#6-entscheidungsmatrix-perspektive) (4,30 vs. 2,55 Iso).
- **Konsequenzen:** Y-Sortierung, keine Schrift auf Figuren, 1 Zeichnung pro Einheit (+1 Line-Boil-Frame).
- **Status:** 🟡 · Bestätigt am: ______

## D-03 · KI im Spiel

- **Entscheidung:** Agenten sind simuliert (Zustandsautomaten, Utility-Zielwahl). Direktiven fühlen sich an wie Prompts (Chips, Prompt-Zeile). Freitext-Parser = Could. LLM-Anbindung (BYOK) = post-jam.
- **Begründung:** [Matrizen § 7](07_MATRIZEN.md#7-entscheidungsmatrix-ki-integration). Voter geben keine API-Keys ein, und Kosten und Latenz sind für einen Jam untragbar.
- **Status:** 🟡 · Bestätigt am: ______

## D-04 · Titel

- **Entscheidung:** Spieltitel **ORCHESTRATE & DOMINATE**, Codename **KAOD** (= KI-Agent-Orchestrate-And-Dominate, gesprochen „Chaos“). itch-URL `orchestrate-and-dominate`. Untertitel theme-variabel.
- **Alternative:** „Ki-Agent-Orchestrate-And-Dominate“ (Original). Verworfen wegen Sprachmix, Länge und Thumbnail-Abschnitt.
- **Status:** 🟡 · Bestätigt am: ______

## D-05 · Plattform

- **Entscheidung:** Nur Browser, Desktop, Maus + Tastatur. Kein Mobile/Touch, kein Download-Build.
- **Status:** 🟡 · Bestätigt am: ______

## D-06 · Sprache

- **Entscheidung:** Spiel komplett Englisch. Alle Texte in `strings.en.ts`. Deutsch = Could.
- **Status:** 🟡 · Bestätigt am: ______

## D-07 · Fraktionen & Modi

- **Entscheidung:** ORCHESTRA (spielbar) gegen THE MONOLITH (Director-KI). Kein Multiplayer, keine zweite spielbare Fraktion.
- **Status:** 🟡 · Bestätigt am: ______

## D-08 · Steuerung

- **Entscheidung:** Direkte Befehle immer möglich und zuverlässig. Squads unter Direktive bekommen FLOW (+20 % Feuerrate, +10 % Tempo), riskieren aber Halluzinationen.
- **Status:** 🟡 · Bestätigt am: ______

## D-09 · Scope

- **Entscheidung:** Szenario B (~92 h): alle Must-Features + Should-Favoriten (F25, F26, F31, F32, F35), sofern Gate M2 grün ist. Die Cut-Liste in [Zeitplan § 7](06_ZEITPLAN.md#7-cut-liste-reihenfolge-ist-verbindlich) ist verbindlich. Plan Z als Rückfallebene.
- **Ergänzung 03.10.2026 (D-16):** Die 4K-Sequenzen gehen in der Should-Reihenfolge vor. Damit passen von den bisherigen Favoriten in Szenario B voraussichtlich nur noch F31 hinein ([Zeitplan § 4a](06_ZEITPLAN.md#4a-kapazitäts-check-d-16-4k-sequenzen)). Über F35 vs. SQ-INTRO wird bei Gate M2 entschieden.
- **Ergänzung 03.10.2026 (Auftrag 2):** Die 92 h sind mzones Stunden. Die lokale Session baut die Sequenzen parallel, mzone kosten sie nur ~6–7 h (Host F46 + Review). Damit passen in Szenario B voraussichtlich F31 **und** F35 (F35 mit der ganzen Reserve). Neue Rechnung: [Zeitplan § 4a](06_ZEITPLAN.md#4a-kapazitäts-check-d-16-4k-sequenzen).
- **Status:** 🟡 · Bestätigt am: ______

## D-10 · Lizenzen

- **Entscheidung:** Code: MIT (`LICENSE`). Kunst & Audio von mzone: CC BY-NC-ND 4.0 (`art/LICENSE`, `audio/LICENSE`). Fonts: SIL OFL 1.1. Fremd-Assets: laut `CREDITS.md`.
- **Hinweis:** Die Lizenzdateien werden mit dem ersten Spielcode am 01.11. angelegt, nachdem die Entscheidung bestätigt ist.
- **Ergänzung 03.10.2026:** Auf Wunsch von mzone schon jetzt vorbereitet (`LICENSE`, `art/LICENSE`, `audio/LICENSE`, `CREDITS.md`), weil Zeichnungen und Vorlagen bereits im Repo liegen. Ändert sich D-10 bei der Bestätigung, werden die Dateien angepasst.
- **Status:** 🟡 · Bestätigt am: ______

## D-11 · Handmade-Versprechen & KI-Offenlegung

- **Entscheidung:**
  - **Grafik:** 100 % von mzone gezeichnet. Vektorisierung deterministisch (potrace/vtracer). Claude Design nur für Layout-Entwürfe. MZP-Diagramme bestehen aus Bausteinen nach mzones Skizzen. → itch: **keine KI-Grafik**.
  - **Audio:** eigene Aufnahmen + menschgemachte CC0/CC-BY-Quellen, keine TTS, keine Musik-Generatoren. → itch: **kein KI-Sound**.
  - **Code:** mit Claude Code entwickelt. → itch: **KI-unterstützter Code offen deklariert**.
  - **Texte:** von mzone. Wenn Claude Formulierungen liefert, wird das deklariert.
  - **Sequenzen (D-16):** Die Sequenzen sind **Code (KI-unterstützt)**. Die Grafik darin sind **mzones Zeichnungen**, der Ton ist **mzones Stimme und Komposition** (Leitmotiv, gespielt von einem prozeduralen Synth, kein generatives Modell).
- **Begründung:** itch.io-Pflicht, Community-Akzeptanz, Meta-Story.
- **Ergänzung 04.10.2026 (D-17):** Der Punkt **Grafik** gilt nicht mehr in der Form „100 % von mzone gezeichnet“. Figuren entstehen hybrid: mzone skizziert von Hand und entscheidet, Claude Design setzt die Figur als Tusche-SVG um. → itch: **KI-Grafik ja, deklariert** (welche Assets, welcher Weg). Audio, Code und Texte bleiben wie oben. Wo Assets weiterhin rein von Hand entstehen, steht es im Asset-Register (Spalte `Quelle`).
- **Status:** 🟡 · Bestätigt am: ______

## D-12 · Theme-Interpretation

- **Entscheidung:** ⚪ offen. Wird am **Mo 02.11.** nach [Theme-Playbook § 6](09_THEME_PLAYBOOK.md#6-ergebnis-vorlage-am-0211-ausfüllen--d-12) eingetragen.

## D-13 · Farbe

- **Entscheidung:** Auf Papier nur schwarze Tusche (Vorzeichnung hellblau). Farbe digital aus der Palette ([Art-Bibel § 2](03_ART_UND_ASSET_BIBEL.md#2-palette)). Teamfarbe nur im Sockel.
- **Status:** 🟡 · Bestätigt am: ______

## D-14 · Repository

- **Entscheidung:** `maierzone/itchi` (öffentlich) ist das Spiel-Repo. Spec unter `docs/`, Zeichnungen unter `art/`, Werkzeuge unter `tools/`, Spielcode **ab 01.11.** unter `game/`. Das README legt offen, was vor dem Jam entstanden ist (Spec, Zeichnungen, Audio, Asset-Werkzeuge) und was im Jam (Spielcode).
- **Ergänzung 04.10.2026 (Truppen-Prototyp):** Auf Wunsch von mzone liegt ein **Wegwerf-Prototyp** unter **`prototypes/truppe/`** (Cloud-Session). Er prüft die Hybrid-Figuren (D-17) als Truppe im RA2-Gefühl: Auswahl, Formation, Kampf, Heilung, Sammeln, Squads mit Prompts. Er ist Vanilla-JS ohne Engine und Build, **wird nicht eingereicht**, und kein Code daraus wandert nach `game/`. Der Spielcode entsteht wie geplant ab 01.11. neu (Phaser, D-01). Das README legt den Prototyp offen. Was er lehrt, fließt als Text in die Spec.
- **Ergänzung 03.10.2026 (D-16):** Im Oktober entsteht zusätzlich die Werkzeugkette **`tools/4k/`** (Packer, Größen-Check, Vorschauseite) als Asset-Werkzeug der lokalen Claude-Code-Session. **Wegwerf-Experimente zu Tusche-Shader und Synth** entstehen außerhalb des Repos und werden im README offengelegt. Die Sequenzen selbst entstehen ab 01.11. neu in `game/src/sequences/`. In `docs/` schreibt nur die Cloud-Session.
- **Status:** 🟡 · Bestätigt am: ______

## D-15 · Audio

- **Entscheidung:** CONDUCTOR = mzones Stimme (EN, Funkfilter). SFX überwiegend selbst aufgenommen (Schreibtisch-Session). Musik: eigene/befreundete Komposition oder menschgemachte CC0/CC-BY-Tracks.
- **Ergänzung 03.10.2026 (D-16):** mzone komponiert das **Leitmotiv** (MU0, 4–5 Töne), dazu kommen 6 Sequenz-Lines (V31–V36). Siehe [Audio-Spec](04_AUDIO_SPEC.md).
- **Status:** 🟡 · Bestätigt am: ______

## D-16 · 4K-Sequenzen

- **Kontext:** mzone hat mit einer lokalen Claude-Code-Session Echtzeit-Sequenzen ausgearbeitet. Die Entscheidung ist von mzone bestätigt.
- **Entscheidung:** Das Spiel bekommt wenige Echtzeit-Sequenzen. Jede ist ein eigenständiges JavaScript-Programm von **höchstens 4096 Bytes** (selbst entpackend, der Build-Check bricht bei 4097 B ab). Eine Sequenz ist eine **Partitur, die mzones Zeichnungen dirigiert**: Der Code erfindet keine Linien, er bewegt, enthüllt, betuscht und belichtet vorhandene Zeichnungen und setzt Timing, Tinte, Licht und den Synth für das Leitmotiv. Zeichnungen, Stimmaufnahmen und Musik-Tracks kommen aus dem Asset-Pool des Spiels und zählen nicht zu den 4096 B.
- **Katalog:** SQ-INTRO, SQ-SINGULARITY, SQ-DISCONNECTED, SQ-DOMINATED (S) · SQ-RADIO (C) → [GDD § 19a](02_GAME_DESIGN_SPEC.md#19a-sequenzen-4k-partituren).
- **Warum:** Disziplin (klare Bilder statt Aufwand) und Story-Gimmick: *“Every cinematic is a 4096-byte score conducting hand-drawn ink.”* Das passt zur Kernmetapher (Orchester/Dirigent) und hält Säule P2 ein.
- **Konsequenzen:**
  - „Kampagne mit Zwischensequenzen“ bleibt ein Nicht-Ziel (keine Kampagne, kein FMV). Im Spiel gibt es **keine Vollbild-Unterbrechung**. Die Sequenzen laufen nur vor dem Spiel, am Ende und als kleines Funkfenster.
  - Host-Vertrag `playSequence(id, params) → Promise`, der Host liefert nur Daten → [Tech-Spec § 5a](05_TECH_SPEC.md#5a-sequenzen-d-16).
  - Neue Assets SQ01–SQ03 ([Art-Bibel § 11](03_ART_UND_ASSET_BIBEL.md#11-sequenzen-d-16-was-die-4k-partituren-aus-deinen-zeichnungen-machen)), Leitmotiv MU0 und Lines V31–V36 ([Audio-Spec](04_AUDIO_SPEC.md)).
  - Zeitplan: Ende-Sequenzen nach Gate M2, danach SQ-INTRO. SQ-RADIO und SQ-DISCONNECTED stehen auf der Cut-Liste. **Kapazitätskonflikt mit den bisherigen Should-Favoriten** → [Zeitplan § 4a](06_ZEITPLAN.md#4a-kapazitäts-check-d-16-4k-sequenzen).
  - Rückfall: Die Darstellung aus GDD § 14 wird immer gebaut.
  - Arbeitsteilung: Die lokale Session baut `tools/4k/` (Oktober) und `game/src/sequences/` (ab 01.11.). Die Cloud-Session pflegt `docs/`.
- **Status:** 🟢 bestätigt am 03.10.2026 (mzone)

## D-17 · Hybrid-Grafik

- **Kontext:** mzone hat am 04.10. die ersten Handskizzen gezeichnet ([`art/vorlagen/FirstDraftSomeSketchesSTRIKE.jpeg`](../art/vorlagen/FirstDraftSomeSketchesSTRIKE.jpeg)). Das Ergebnis rein von Hand hat mzone nicht gefallen. Zwei Proben am selben Tag:
  1. **Graphics-Probe** ([`tools/graphics-probe/`](../tools/graphics-probe/), Kontaktbogen [`art/probe/`](../art/probe/)): Foto → Tusche-Maske → vtracer → Stil als Parameter (`none` | `cyborg`). Die Handlinie bleibt, der Stil legt nur Zusatz darüber.
  2. **Claude Design** ([`art/sonnet/`](../art/sonnet/)): aus der Skizze drei Cyborg-Figuren **U01 CRAWLER, U02 EXECUTOR, U04 CRITIC** als SVG, erzeugt von einer Code-Tusche-Engine (`tools/art/ink_gen.js`, `ink_figuren.js` im Ordner). Nur Tusche `#221d17` auf Papier `#efe8d6`, Frame A/B als Line-Boil, Gruppen `#base` (Spielform) und `#detail` (Nähte, Nieten, Kabel). Review-Seite: `Cyborg Figuren.dc.html`.
- **Entscheidung:** Grafik entsteht **hybrid**. mzone liefert Idee, Skizze, Charakter und die Auswahl (Art Direction, letzte Entscheidung). Claude Design bzw. Claude Code setzt die Figur als Tusche-SVG im Stil der Art-Bibel um (Palette § 2, Strichregeln § 4, Namensschema, Frame A/B, `#base`/`#detail`). Welche Asset-Klassen hybrid entstehen und welche von Hand bleiben, entscheidet mzone je Batch und vermerkt es im Asset-Register.
- **Offenlegung:** Ehrlich und konkret. itch: **„AI generated graphics: yes“** mit einem Satz, wie (Skizze von Hand, Tusche von KI). Die C2PA-Herkunftsdaten in den SVGs (`<metadata>`) bleiben in den Quelldateien erhalten. Formulierung für die itch-Seite: [`docs/itch/SEITENTEXT_EN.md`](itch/SEITENTEXT_EN.md) (Vorschlag, mzone entscheidet).
- **Warum:** Der Stil trägt, ist konsistent über alle Figuren und bei 48 px lesbar. Er lässt sich schneller variieren als Tusche auf Papier. Das Spiel handelt vom Dirigieren von Agenten, und dazu passt die ehrliche Meta-Story: *sketched by hand, inked by agents*.
- **Konsequenzen:**
  - D-11 ist ergänzt (Grafik). Das Argument „100 % handgezeichnet“ entfällt in README, GDD (USP 4), Kontext § 1.5, itch-Text und Checkliste (Grill F5/G2 hatte das als Red Flag vorhergesagt, jetzt bewusst so entschieden).
  - **Pitch-Wörter** wie *hand-inked* bleiben vorerst stehen, weil die Figuren in Tusche-Optik bleiben und die Skizzen von Hand sind. Ob „hand-inked“ im Pitch bleibt, entscheidet mzone (Texte kommen von mzone, D-11).
  - D-16 (Sequenzen) bleibt gültig. Der Code erfindet weiterhin keine Linien, er dirigiert die Assets aus dem Pool, ob von Hand oder hybrid.
  - Lizenz: Die rechtliche Schutzfähigkeit KI-erzeugter Bildanteile ist unsicher. `art/LICENSE` (CC BY-NC-ND 4.0) bleibt, deckt aber sicher nur mzones eigene Anteile ab. Bei Bedarf prüfen.
  - Ablage: Die Lieferung von Claude Design bleibt vorerst unverändert in `art/sonnet/`. Der Prototyp liest `art/sonnet/art/svg/spielform/`. Ins kanonische `art/svg/` (Art-Bibel § 5) wandern die Figuren erst, wenn mzone sie freigibt.
  - Erste Nutzung: Wegwerf-Prototyp `prototypes/truppe/` (D-14, Ergänzung 04.10.2026).
- **Status:** 🟢 bestätigt am 04.10.2026 (mzone)

---

## Änderungsprotokoll

| Datum | ID | Änderung | Grund |
|-------|----|----------|-------|
| 03.10.2026 | D-01 … D-15 | angelegt (vorgeschlagen) | Spec v0.1 |
| 03.10.2026 | D-16 | neu, bestätigt | Auftrag mzone (4K-Sequenzen aus der lokalen Session) |
| 03.10.2026 | D-09, D-11, D-14, D-15 | ergänzt (nicht überschrieben) | Folgen von D-16 |
| 03.10.2026 | D-10 | ergänzt (nicht überschrieben) | Lizenzdateien vorbereitet |
| 03.10.2026 | D-09 | ergänzt (nicht überschrieben) | Auftrag 2: Sequenzen kosten mzone nur Review, § 4a nachgerechnet |
| 04.10.2026 | D-17 | neu, bestätigt | mzone: rein handgezeichnet gefiel nicht, Hybrid-Weg mit Claude Design |
| 04.10.2026 | D-11 | ergänzt (nicht überschrieben) | Folge von D-17: KI-Grafik wird deklariert |
| 04.10.2026 | D-14 | ergänzt (nicht überschrieben) | Wegwerf-Prototyp `prototypes/truppe/` auf Wunsch von mzone |
