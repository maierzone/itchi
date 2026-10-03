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
- **Status:** 🟡 · Bestätigt am: ______

## D-10 · Lizenzen

- **Entscheidung:** Code: MIT (`LICENSE`). Kunst & Audio von mzone: CC BY-NC-ND 4.0 (`art/LICENSE`, `audio/LICENSE`). Fonts: SIL OFL 1.1. Fremd-Assets: laut `CREDITS.md`.
- **Hinweis:** Die Lizenzdateien werden mit dem ersten Spielcode am 01.11. angelegt, nachdem die Entscheidung bestätigt ist.
- **Status:** 🟡 · Bestätigt am: ______

## D-11 · Handmade-Versprechen & KI-Offenlegung

- **Entscheidung:**
  - **Grafik:** 100 % von mzone gezeichnet. Vektorisierung deterministisch (potrace/vtracer). Claude Design nur für Layout-Entwürfe. MZP-Diagramme bestehen aus Bausteinen nach mzones Skizzen. → itch: **keine KI-Grafik**.
  - **Audio:** eigene Aufnahmen + menschgemachte CC0/CC-BY-Quellen, keine TTS, keine Musik-Generatoren. → itch: **kein KI-Sound**.
  - **Code:** mit Claude Code entwickelt. → itch: **KI-unterstützter Code offen deklariert**.
  - **Texte:** von mzone. Wenn Claude Formulierungen liefert, wird das deklariert.
- **Begründung:** itch.io-Pflicht, Community-Akzeptanz, Meta-Story.
- **Status:** 🟡 · Bestätigt am: ______

## D-12 · Theme-Interpretation

- **Entscheidung:** ⚪ offen. Wird am **Mo 02.11.** nach [Theme-Playbook § 6](09_THEME_PLAYBOOK.md#6-ergebnis-vorlage-am-0211-ausfüllen--d-12) eingetragen.

## D-13 · Farbe

- **Entscheidung:** Auf Papier nur schwarze Tusche (Vorzeichnung hellblau). Farbe digital aus der Palette ([Art-Bibel § 2](03_ART_UND_ASSET_BIBEL.md#2-palette)). Teamfarbe nur im Sockel.
- **Status:** 🟡 · Bestätigt am: ______

## D-14 · Repository

- **Entscheidung:** `maierzone/itchi` (öffentlich) ist das Spiel-Repo. Spec unter `docs/`, Zeichnungen unter `art/`, Werkzeuge unter `tools/`, Spielcode **ab 01.11.** unter `game/`. Das README legt offen, was vor dem Jam entstanden ist (Spec, Zeichnungen, Audio, Asset-Werkzeuge) und was im Jam (Spielcode).
- **Status:** 🟡 · Bestätigt am: ______

## D-15 · Audio

- **Entscheidung:** CONDUCTOR = mzones Stimme (EN, Funkfilter). SFX überwiegend selbst aufgenommen (Schreibtisch-Session). Musik: eigene/befreundete Komposition oder menschgemachte CC0/CC-BY-Tracks.
- **Status:** 🟡 · Bestätigt am: ______

---

## Änderungsprotokoll

| Datum | ID | Änderung | Grund |
|-------|----|----------|-------|
| 03.10.2026 | D-01 … D-15 | angelegt (vorgeschlagen) | Spec v0.1 |
