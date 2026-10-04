# ORCHESTRATE & DOMINATE

> **Codename:** `KAOD` – *KI-Agent-Orchestrate-And-Dominate* (gesprochen: **„Chaos“**)
> **Ziel:** Abgabe beim **GitHub Game Off 2026** (gehostet auf itch.io) – Deadline **Di, 01.12.2026, 22:37 MEZ**
> **Status:** Pre-Production · Spec v0.1 · Stand 03.10.2026
> **Autor / Vision:** mzone (maierzone) · Spec erstellt mit Claude Code

---

## Was ist das?

Ein **Echtzeit-Strategiespiel im Geist von Alarmstufe Rot 2**, bei dem du **keine Soldaten** kommandierst.
Du **orchestrierst einen Schwarm spezialisierter KI-Agenten** – Crawler, Executor, Scout, Critic, Planner, Transformer –
gegen **THE MONOLITH**: ein einziges, gigantisches Modell, das die Welt Datenfeld für Datenfeld frisst.

Die Welt ist eine **handgezeichnete Lagekarte auf dem Tisch des Dirigenten**. Unerforschtes Gebiet ist **leeres Papier**.
Erst wenn deine Agenten es erkunden, **zeichnet sich die Karte mit Tusche**. Die Grafik entsteht **hybrid** (D-17): mzone skizziert von Hand und entscheidet, Claude Design tuscht die Figuren als SVG. Das wird offen als KI-Grafik deklariert.

**Elevator Pitch (EN, für itch.io):**
*“Command a swarm of specialized AI agents on a hand-inked war map. Give them prompts, not clicks. Break the Monolith before it eats the world.”*

---

## Dokumente

| # | Dokument | Inhalt | Wer muss handeln? |
|---|----------|--------|-------------------|
| 00 | [Grill-Protokoll](docs/00_GRILL_PROTOKOLL.md) | **Die harten Fragen an dich.** Red Flags, unbequeme Wahrheiten, Antwortfelder. **Zuerst lesen.** | **mzone: bis Mi 07.10. beantworten** |
| 01 | [Kontext & Ambition](docs/01_KONTEXT_UND_AMBITION.md) | Wettbewerb (Fakten + Quellen), Hintergrund, deine Ambition, Erfolgsdefinition, Rahmenbedingungen | lesen |
| 02 | [Game Design Spec (GDD)](docs/02_GAME_DESIGN_SPEC.md) | High Concept, Säulen, Welt, Core Loop, Ökonomie, Einheiten, Gebäude, Direktiven, Monolith-KI, Missionen, UI, Steuerung, Balancing, **4K-Sequenzen (§ 19a)** | Review |
| 03 | [Art- & Asset-Bibel](docs/03_ART_UND_ASSET_BIBEL.md) | Stil, Palette, **vollständige Zeichenliste** mit Zeichen-Briefings, Papiermaßen und Strichstärken, Pipeline Papier → SVG → Spiel | **mzone: zeichnen** |
| 04 | [Audio-Spec](docs/04_AUDIO_SPEC.md) | Ansager-Lines, Einheiten-Sprüche, SFX-Liste, Musik, Aufnahme-Anleitung | mzone: aufnehmen |
| 05 | [Tech-Spec](docs/05_TECH_SPEC.md) | Engine-Entscheidung, Architektur, Simulation, Pathfinding, Fog, Build & Deploy, Tests | Claude Code |
| 06 | [Zeitplan](docs/06_ZEITPLAN.md) | Oktober (Pre-Production), November (Jam), Tagesplan, Meilenstein-Gates, Cut-Liste | beide |
| 07 | [Matrizen](docs/07_MATRIZEN.md) | Feature-Priorisierung, Bewertungs-Abdeckung, Risiko, RACI, Entscheidungsmatrizen, Scope-Szenarien | Review |
| 08 | [Aussichts-Erfolgs-Matrix-Report](docs/08_AUSSICHTS_ERFOLGS_MATRIX_REPORT.md) | Erfolgsprognose, Szenarien, Wahrscheinlichkeiten, Hebel, KPIs | lesen |
| 09 | [Theme-Playbook](docs/09_THEME_PLAYBOOK.md) | Was tun am 01.11. um 22:37 MEZ? Theme-Adaption, Vorab-Training mit allen bisherigen Themes | beide |
| 10 | [Entscheidungslog](docs/10_ENTSCHEIDUNGSLOG.md) | Alle Entscheidungen (ADR-light) mit Status *vorgeschlagen / bestätigt / verworfen*, zuletzt **D-16 4K-Sequenzen** (bestätigt) | **mzone: bestätigen** |
| 11 | [itch.io-Abgabe-Checkliste](docs/11_ITCH_ABGABE_CHECKLISTE.md) | Von `itch.io/game/new` bis zum Klick auf „Submit“, KI-Offenlegung, Fallbacks | mzone |
| 12 | [Spickzettel Entscheidungen](docs/12_ENTSCHEIDUNGEN_BIS_0710.md) | Die 15 offenen Entscheidungen und 6 Grill-Fragen zum Abhaken bis Mi 07.10. | **mzone: bis 07.10.** |

**Arbeitsdateien:**

| Datei | Zweck |
|-------|-------|
| [`art/ASSET_REGISTER.csv`](art/ASSET_REGISTER.csv) | Maschinenlesbare Asset-Liste (ID, Priorität, Maße, Status) – das Tracking-Board fürs Zeichnen |
| [`art/vorlagen/skizzenbogen_einheiten_A4.svg`](art/vorlagen/skizzenbogen_einheiten_A4.svg) | Druckvorlage A4 für Einheiten (12 Felder, Passermarken, Hilfslinien in „Non-Photo-Blue“) |
| [`art/vorlagen/skizzenbogen_gebaeude_A4.svg`](art/vorlagen/skizzenbogen_gebaeude_A4.svg) | Druckvorlage A4 für Gebäude (Grundflächen 3×3, 2×2, 1×1 mit Höhenzugabe) |
| [`art/vorlagen/kartenprobe_A4.svg`](art/vorlagen/kartenprobe_A4.svg) | Druckvorlage A4 für den Kartenausschnitt 100 × 100 mm (Batch 0, Maßstab K01) |
| [`art/vorlagen/batch0_druckpaket.pdf`](art/vorlagen/batch0_druckpaket.pdf) | **Batch 0 zum Ausdrucken:** [Spickzettel](art/vorlagen/BATCH0_SPICKZETTEL.md) + alle drei Bögen, 4 Seiten A4 |
| [`art/sonnet/`](art/sonnet/) | **Erste Hybrid-Figuren** (D-17): U01 CRAWLER, U02 EXECUTOR, U04 CRITIC als SVG, Frame A/B, Spielform unter `art/svg/spielform/`. Review-Seite `Cyborg Figuren.dc.html` |
| [`prototypes/truppe/`](prototypes/truppe/) | **Truppen-Prototyp (Wegwerf):** die drei Figuren als steuerbare Truppe im RA2-Gefühl. `index.html` im Browser öffnen, Details im [README](prototypes/truppe/README.md) |
| [`art/SKIZZEN_UEBERSICHT.html`](art/SKIZZEN_UEBERSICHT.html) | **Alle 120 Elemente als Karten mit Platzhalter** für deine Skizzen, Filter nach Priorität, Batch und Status. Neu erzeugen: `python3 art/uebersicht.py` |

---

## Quick Facts

| | |
|---|---|
| **Genre** | Micro-RTS (Basisbau, Ressourcen, Echtzeitkampf) mit Orchestrierungs-Schicht (Squads + Prompt-Direktiven) |
| **Referenz** | Alarmstufe Rot 2 (Sidebar, Sammler, Strom, Ansager, Superwaffe) – **verdichtet auf 10–15 Minuten** |
| **Neu daran** | Du gibst Squads **Prompts statt Klicks**; Agenten handeln autonom, **halluzinieren** ohne Critic, bilden **Pipelines** mit Synergien |
| **Gegner** | THE MONOLITH – asymmetrischer, wachsender Boss-Gegner (0 % → 100 % = Singularität = Niederlage) |
| **Perspektive** | Draufsicht-Lagekarte, Figuren und Gebäude in **Vogelschau/Aufriss** (wie auf alten Landkarten) |
| **Art** | **Hybrid** (D-17): Skizze von Hand → Tusche-SVG von Claude Design, Auswahl durch mzone. Was rein von Hand bleibt, steht im Asset-Register. Palette aus dem MZP-`analog`-Stil |
| **Plattform** | Browser (HTML5) auf itch.io, Desktop, Maus + Tastatur |
| **Sprache im Spiel** | Englisch (international bewertet), Dokumentation Deutsch |
| **Engine (vorgeschlagen)** | Phaser 3 + TypeScript + Vite (siehe [Tech-Spec](docs/05_TECH_SPEC.md), Entscheidung D-01) |
| **Session-Länge** | 10–15 Minuten pro Mission |
| **Sequenzen** (D-16) | Wenige Echtzeit-Sequenzen (Intro, Sieg, Niederlage, Funkfenster), **jede ≤ 4096 Bytes JavaScript**. *“Every cinematic is a 4096-byte score conducting sketched ink.”* Leitmotiv von mzone |
| **Team** | mzone (Vision, Art, Audio, Leitmotiv, Entscheidungen) + Claude Code in der Cloud (Code, Tests, `docs/`) + Claude Code lokal (`tools/4k/`, Sequenzen) + MZP + Claude Design |

---

## Wie wir zu dritt arbeiten

[![Trio-Flow: Aufgabenverteilung zwischen Claude Cloud, Claude lokal und mzone](docs/img/trio_flow.svg)](https://publisher.maierzone.de/published/itchi-trio-flow/)

**mzone** entscheidet, zeichnet, spricht und komponiert. **Claude lokal** (Omarchy) baut `tools/4k/` und ab 01.11. die Sequenzen und
schreibt Aufträge als `AUFTRAG_*.md`. **Claude in der Cloud** pflegt `docs/`, antwortet mit `RUECKMELDUNG_*.md` und liefert Draft-PRs,
die mzone freigibt. Interaktive Fassung: [publisher.maierzone.de/published/itchi-trio-flow](https://publisher.maierzone.de/published/itchi-trio-flow/) · PNG: [`docs/img/trio_flow.png`](docs/img/trio_flow.png)

## Die drei wichtigsten Termine

| Datum | Was |
|-------|-----|
| **Mi 07.10.2026** | Grill-Protokoll beantwortet, Entscheidungen D-01 … D-15 bestätigt (D-12 Theme folgt am 02.11.) |
| **So 01.11.2026, 22:37 MEZ** | Theme-Bekanntgabe → [Theme-Playbook](docs/09_THEME_PLAYBOOK.md) starten |
| **Mo 30.11.2026, 22:00 MEZ** | **Interne Abgabe-Deadline** (24 h Puffer vor der echten Deadline Di 01.12., 22:37 MEZ) |

---

## Repository-Regel (Game Off)

Game Off verlangt ein **öffentliches GitHub-Repository mit dem Quellcode**. Dieses Repo (`maierzone/itchi`) ist öffentlich und
wird das Spiel-Repo. Die Spec liegt unter `docs/`, Rohzeichnungen unter `art/`, der Spielcode kommt ab dem **01.11.2026** unter `game/`.

**Transparenz (Entscheidung D-14):** Vor dem Jam (Oktober 2026) entstehen nur Spec, Zeichnungen, Audio-Aufnahmen, das Leitmotiv und Asset-Werkzeuge.
Dazu gehört auch die **Werkzeugkette `tools/4k/`** (Packer, Größen-Check, Vorschauseite) für die 4K-Sequenzen (D-16).
**Wegwerf-Experimente zu Tusche-Shader und Synth** sind im Oktober **außerhalb dieses Repos** entstanden. Sie werden nicht eingereicht, und die Sequenzen
werden im Jam neu geschrieben. Im Repo liegen zwei offen markierte Wegwerf-Stücke: der **Truppen-Prototyp** [`prototypes/truppe/`](prototypes/truppe/)
(Vanilla-JS, testet die Hybrid-Figuren als Truppe, D-14 Ergänzung 04.10.) und die **Graphics-Probe** [`tools/graphics-probe/`](tools/graphics-probe/).
Beide werden nicht eingereicht, kein Code daraus geht nach `game/`. Der **Spielcode** (inkl. `game/src/sequences/`) entsteht ausschließlich im Jam-Zeitraum ab dem 01.11.2026.

---

## So arbeitest du mit dieser Spec

1. **[Grill-Protokoll](docs/00_GRILL_PROTOKOLL.md) lesen und beantworten.** Direkt in der Datei, dann committen.
2. **[Entscheidungslog](docs/10_ENTSCHEIDUNGSLOG.md) bestätigen oder ändern.** Kurzfassung zum Abhaken: [Spickzettel bis 07.10.](docs/12_ENTSCHEIDUNGEN_BIS_0710.md). Was am 07.10. noch „vorgeschlagen“ ist, gilt als bestätigt.
3. **Vorlagen drucken** (100 %), **Batch 0** der [Art-Bibel](docs/03_ART_UND_ASSET_BIBEL.md#10-zeichen-reihenfolge-verbindlich) zeichnen: die Stil-Proben bis So 11.10.
4. Ab da gilt der **[Zeitplan](docs/06_ZEITPLAN.md)**.
