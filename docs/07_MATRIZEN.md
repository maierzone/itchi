# 07 · Matrizen

> Entscheidungen auf einen Blick: Was bauen wir in welcher Reihenfolge, was zahlt auf welche Bewertungskategorie ein, was kann schiefgehen, wer macht was, und warum diese Engine, diese Perspektive, diese KI-Umsetzung?

## Inhalt

1. [Feature-Priorisierungsmatrix](#1-feature-priorisierungsmatrix)
2. [Bewertungskategorie-Abdeckungsmatrix](#2-bewertungskategorie-abdeckungsmatrix)
3. [Risikomatrix](#3-risikomatrix)
4. [Verantwortungsmatrix (RACI)](#4-verantwortungsmatrix-raci)
5. [Entscheidungsmatrix Engine](#5-entscheidungsmatrix-engine)
6. [Entscheidungsmatrix Perspektive](#6-entscheidungsmatrix-perspektive)
7. [Entscheidungsmatrix KI-Integration](#7-entscheidungsmatrix-ki-integration)
8. [Scope-Szenario-Matrix](#8-scope-szenario-matrix)
9. [Werkzeug-Zuständigkeitsmatrix](#9-werkzeug-zuständigkeitsmatrix)

---

## 1. Feature-Priorisierungsmatrix

**Wirkung je Bewertungskategorie:** 0 = keine · 1 = gering · 2 = deutlich · 3 = entscheidend. **h** = Stunden mzone (mit Claude Code). **Risiko** = technisches/Planungsrisiko (L/M/H).

<!-- FEATURE_TABLE_START -->
| ID | Feature | Prio | h | Gameplay | Graphics | Audio | Innovation | Theme | Overall | Risiko | Termin |
|----|---------|:----:|--:|:--------:|:--------:|:-----:|:----------:|:-----:|:-------:|:------:|--------|
| | **MUST (Tier 0)** | | | | | | | | | | |
| F01 | Setup, CI, Deploy-Pfad | **M** | 3 | · | · | · | · | · | 1 | L | 02.11. |
| F02 | Karte laden & Kamera | **M** | 2 | 1 | 2 | · | · | · | 1 | L | 03.11. |
| F03 | Auswahl & Befehle | **M** | 4 | 2 | · | · | · | · | 2 | L | 04.11. |
| F04 | Wegfindung & Gruppenbewegung | **M** | 6 | 3 | · | · | · | · | 2 | H | 05.–06.11. |
| F05 | Ökonomie (CRAWLER, TOKENIZER, Tokens) | **M** | 3 | 2 | 1 | · | · | · | 2 | L | 07.11. |
| F06 | Bau-Sidebar, Produktion, Platzierung | **M** | 6 | 2 | 1 | · | · | · | 2 | M | 07.–08.11. |
| F07 | Kampf & Schadensmatrix | **M** | 3 | 3 | 1 | · | · | · | 2 | L | 09.11. |
| F08 | Monolith: Wachstum, Stufen, BROOD NODES, Schild | **M** | 4 | 3 | 2 | · | 2 | 1 | 3 | M | 10.11. |
| F09 | Director: Wellen, SCRAPER, Reaktionen | **M** | 4 | 3 | · | · | 1 | · | 2 | M | 11.–12.11. |
| F10 | Sieg/Niederlage, Endbildschirm | **M** | 2 | 2 | 1 | · | · | · | 2 | L | 13.11. |
| F11 | Fog of War (einfach) | **M** | 2 | 1 | 2 | · | 1 | · | 1 | L | 13.11. |
| F12 | Squads + ORCHESTRATION BAR | **M** | 4 | 2 | 1 | · | 2 | · | 2 | M | 14.11. |
| F13 | Direktiven EXPLORE/HOLD/HUNT + FLOW | **M** | 5 | 3 | · | · | 3 | 1 | 3 | H | 14.–15.11. |
| F14 | Halluzination | **M** | 2 | 2 | 1 | 1 | 3 | · | 2 | L | 15.11. |
| F15 | Onboarding (CONDUCTOR-Hinweise) | **M** | 3 | 3 | · | 1 | · | · | 3 | M | 19.11. |
| F16 | Audio-System, Must-SFX, Ansager, Musik | **M** | 3 | 1 | · | 3 | · | · | 2 | L | 18.11. |
| F17 | Menüs, Pause, Optionen, Schwierigkeit | **M** | 3 | 2 | 1 | · | · | · | 2 | L | 20.11. |
| F18 | Art-Integration (Atlas, Sockel, Tiefensortierung) | **M** | 4 | · | 3 | · | 1 | · | 2 | M | 08. + 22.11. |
| F19 | Theme-Modul Ebene 1–2 | **M** | 4 | 1 | 1 | · | 1 | 3 | 2 | H | 16.–17.11. |
| F20 | Balancing & Playtest-Fixes | **M** | 6 | 3 | · | · | · | · | 3 | M | 23.–24.11. |
| F21 | itch-Seite, Screenshots, GIF, Abgabe | **M** | 3 | · | 1 | · | · | · | 2 | M | 28.–30.11. |
| | **SHOULD (Tier 1)** | | | | | | | | | | |
| F22 | COMPUTE + LOW COMPUTE | **S** | 2 | 2 | · | · | · | · | 1 | L | Block 21./22.11. |
| F23 | MODEL FACTORY + TRANSFORMER | **S** | 4 | 2 | 1 | · | 1 | · | 1 | L | Block |
| F24 | TELEMETRY + Minimap | **S** | 4 | 2 | 1 | · | · | · | 1 | M | Block |
| F25 | PLANNER + Bedingungen | **S** | 4 | 2 | · | · | 2 | · | 2 | M | Reserve (§ 4a) |
| F26 | Synergien/Pipelines + ORCHESTRATED | **S** | 4 | 3 | 1 | 1 | 3 | · | 2 | M | Reserve (§ 4a) |
| F27 | ASSAULT + Zusatzziele | **S** | 2 | 1 | · | · | 1 | · | 1 | L | Block |
| F28 | Gelände-Effekte + Sichtlinien | **S** | 4 | 2 | 1 | · | 1 | · | 1 | M | Block |
| F29 | BRUTEFORCE + OVERFITTER | **S** | 4 | 2 | 1 | · | 2 | · | 1 | L | Block |
| F30 | CONTEXT FLOOD | **S** | 3 | 2 | 2 | 2 | 1 | · | 2 | L | Block |
| F31 | Tinten-Fog („Karte zeichnet sich“) | **S** | 3 | · | 3 | 1 | 3 | · | 2 | M | Reserve, teilt Technik mit F49 |
| F32 | Line Boil + Monolith-Stufen-Optik | **S** | 3 | · | 3 | · | 1 | · | 2 | L | Reserve (§ 4a) |
| F33 | Musik-Intensitätsschichten | **S** | 2 | · | · | 3 | · | · | 1 | L | Block |
| F34 | Briefing + Statistik-Endbildschirm | **S** | 2 | 1 | 1 | · | · | 1 | 1 | L | Block |
| F35 | Theme-Modul Ebene 3 (Mechanik) | **S** | 5 | 2 | 1 | · | 2 | 3 | 2 | H | Gate M2 entscheidet (§ 4a) |
| F46 | Sequenz-Host (playSequence) + 4K-Größencheck im Build | **S** | 2 | · | · | · | · | · | · | M | 21.11. |
| F47 | SQ-DOMINATED (Sieg-Sequenz) | **S** | 3 | · | 2 | 2 | 1 | · | 2 | L | 21.11. |
| F48 | SQ-SINGULARITY (Niederlage B) | **S** | 2 | · | 2 | 2 | 1 | · | 2 | L | 21.11. |
| F49 | SQ-INTRO (Uplink, Prämisse, Leitmotiv) | **S** | 5 | · | 3 | 3 | 2 | 1 | 3 | M | 22.11. (oder F35) |
| F50 | SQ-DISCONNECTED (Niederlage A) | **S** | 2 | · | 1 | 1 | · | · | 1 | L | Cut-Liste #2 |
| | **COULD (Tier 2)** | | | | | | | | | | |
| F36 | INJECTOR + LEGACY SERVER | **C** | 6 | 2 | 1 | 1 | 2 | · | 1 | M | nach M3 |
| F37 | RESEARCH LAB + TUNING FORK + EXTENDED CONTEXT | **C** | 6 | 2 | 2 | 1 | 1 | · | 1 | M | nach M3 |
| F38 | BATCH (Artillerie) | **C** | 3 | 1 | 1 | · | · | · | · | L | nach M3 |
| F39 | SPAMMER | **C** | 2 | 1 | 1 | · | 1 | · | · | L | nach M3 |
| F40 | Freitext-Prompt (Keyword-Parser) | **C** | 4 | 1 | · | · | 3 | 1 | 1 | M | nach M3 |
| F41 | 2 Zusatzmissionen | **C** | 8 | 2 | · | · | · | 1 | 1 | M | nach M3 |
| F42 | Einheiten-Stimmen / Chirps | **C** | 2 | · | · | 2 | · | · | 1 | L | nach M3 |
| F43 | FIREWALL | **C** | 2 | 1 | · | · | · | · | · | L | nach M3 |
| F44 | Handschrift-Font + Tischdeko | **C** | 2 | · | 2 | · | · | · | 1 | L | nach M3 |
| F45 | Tastenbelegung | **C** | 2 | 1 | · | · | · | · | · | L | nach M3 |
| F51 | SQ-RADIO Funkfenster (parametrisiert) | **C** | 4 | 1 | 2 | 1 | 1 | · | 1 | M | nach M3 / Cut-Liste #1 |
| | **Σ Tier 0 (M)** | | **76** | **39** | **18** | **5** | **14** | **5** | **43** | | |
| | **Σ Tier 1 (M+S)** | | **136** | **60** | **41** | **20** | **35** | **10** | **71** | | |
| | **Σ Tier 2 (alle)** | | **177** | **72** | **50** | **25** | **43** | **12** | **78** | | |
<!-- FEATURE_TABLE_END -->

---

## 2. Bewertungskategorie-Abdeckungsmatrix

Summe der Wirkungspunkte aus § 1, getrennt nach Scope-Stufe:

<!-- COVERAGE_TABLE_START -->
| Stufe | Stunden | Gameplay | Graphics | Audio | Innovation | Theme | Overall |
|-------|--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Tier 0 (M) | 76 | 39 | 18 | 5 | 14 | 5 | 43 |
| Tier 1 (M+S) | 136 | 60 | 41 | 20 | 35 | 10 | 71 |
| Tier 2 (alle) | 177 | 72 | 50 | 25 | 43 | 12 | 78 |
| *davon Sequenzen (F46–F51)* | 18 | 1 | 10 | 9 | 5 | 1 | 9 |
<!-- COVERAGE_TABLE_END -->

**Ehrliche Lesart:**

| Kategorie | Abdeckung | Wo der eigentliche Hebel liegt | Lücke / Maßnahme |
|-----------|-----------|--------------------------------|------------------|
| **Gameplay** | 🟢 stark | Wegfindung, Direktiven, Director, Balancing | RTS-Komplexität bremst Jam-Voter → **Onboarding + STORY-Schwierigkeit** |
| **Graphics** | 🟡 → 🟢 | Steckt vor allem in den **Zeichnungen** (Oktober), nicht in Features. Die Sequenzen (D-16) inszenieren genau diese Zeichnungen | **Stil-Gate 11.10.** ist kritisch. F31 (Tinten-Fog) und SQ-INTRO (F49) nutzen dieselbe Tusche-Masken-Technik |
| **Audio** | 🔴 → 🟡 | Steckt fast komplett in den **Aufnahmen** (Ansager, Schreibtisch-SFX) und der Musik. **Neu durch D-16:** Leitmotiv von mzone + Sequenz-Lines V31–V36 | **Audio-Session 1 bis 25.10.** (inkl. V31–V36), **Leitmotiv bis 25.10.**, **Musik bis 15.10. anfragen**. F33 nur, wenn Musik als Stems vorliegt |
| **Innovation** | 🟢 stark | F13 Direktiven, F14 Halluzination, F26 Synergien, F31 „Karte zeichnet sich“ | Die Innovation muss **in den ersten 2 Minuten erlebbar** sein (Onboarding-Schritte 4–6) |
| **Theme** | 🔴 → ? | **Hängt am 01.11.** F19 + F35 und das [Theme-Playbook](09_THEME_PLAYBOOK.md) | Theme-Abend nach Protokoll. **Achtung:** F35 konkurriert mit den Sequenzen um das Should-Budget ([Zeitplan § 4a](06_ZEITPLAN.md#4a-kapazitäts-check-d-16-4k-sequenzen)). Ersatz für Ebene 1: Theme-Satz im SQ-INTRO |
| **Overall** | 🟢 | Summe + **Polish + Fehlerfreiheit + erster Eindruck** | Woche 4 ist reine Polish-Woche, nicht verhandelbar |

---

## 3. Risikomatrix

**W** = Wahrscheinlichkeit (1–5) · **A** = Auswirkung (1–5) · **Score** = W × A · 🔴 ≥ 15 · 🟠 10–14 · 🟡 5–9 · 🟢 < 5

| ID | Risiko | W | A | Score | Gegenmaßnahme | Frühwarnsignal | Owner |
|----|--------|:-:|:-:|:-----:|---------------|----------------|-------|
| R01 | **Scope-Explosion** („RA2 muss rein“) | 4 | 5 | 🔴 20 | Tier-Modell, Cut-Liste, Gates, Feature Freeze 22.11. | Gate M1 verfehlt | mzone |
| R03 | **Wegfindung/Bewegung fehlerhaft** | 4 | 4 | 🔴 16 | Woche 1 zuerst, Budget-Queue, Stresstest-Szenario | Einheiten stecken in Playtest 1 fest | Claude Code |
| R10 | **Zu schwer/unverständlich** für Voter | 4 | 4 | 🔴 16 | Onboarding, STORY, NORMAL auf ~60 % Sieg, Playtest 3 mit **neuen** Leuten | Erstspieler verlieren > 50 % | beide |
| R02 | **Zu wenig Zeit** (Job, Krankheit) | 3 | 5 | 🔴 15 | Puffer 30.11./01.12., Plan Z, Must zuerst | < 75 % der geplanten Stunden in Woche 1 | mzone |
| R04 | **Spiel macht keinen Spaß** | 3 | 5 | 🔴 15 | Papier-Prototyp im Oktober, Fun-Check M2, Plan Z | Fun-Check ≤ 3× Ja | mzone |
| R06 | **Zeichnungen bei 48 px unleserlich** | 3 | 4 | 🟠 12 | Strichregeln, Stil-Gate 11.10., Silhouettentest | Stil-Proben im Testbild matschig | mzone |
| R07 | **Zeichen-Rückstand** (55 Must-Zeichnungen) | 4 | 3 | 🟠 12 | Batches, Must zuerst, Gate M0 | < 50 % Must bis 25.10. | mzone |
| R16 | **Burnout / Motivation** | 3 | 4 | 🟠 12 | Tagesritual, keine Nachtschichten, Erfolgsdefinition (Grill A3) | 2 Tage ohne Commit | mzone |
| R17 | **Zu wenige Ratings** | 3 | 4 | 🟠 12 | Browser-Build, starke Seite + GIF, ≥ 50 Spiele bewerten (Karma), Devlog | < 20 Ratings bis 15.12. | mzone |
| R09 | **Web-Build läuft auf itch nicht** | 2 | 5 | 🟠 10 | Release-Probelauf 15.11., `base: './'`, CI-Smoke | Probe-Upload scheitert | Claude Code |
| R05 | **Theme passt nicht** | 3 | 3 | 🟡 9 | Theme-Playbook, Theme-Slot-Architektur | Keine Idee mit Score ≥ 12 am Theme-Abend | beide |
| R08 | **Audio schwach/fehlt** | 3 | 3 | 🟡 9 | Audio-Session im Oktober, CC0-Fallback | Session 1 bis 25.10. nicht erledigt | mzone |
| R14 | **Performance auf schwachen Geräten** | 3 | 3 | 🟡 9 | Budgets, Masken-Fog, Kartenkacheln | FPS < 45 im Stresstest | Claude Code |
| R15 | **Halluzination frustriert** | 3 | 3 | 🟡 9 | niedrige Raten, CRITIC, nie tödlich, auf STORY halbiert | Tester flucht statt lacht | beide |
| R18 | **Sequenzen (D-16) fressen Should-Zeit / sprengen 4096 B** | 3 | 3 | 🟡 9 | erst nach Gate M2, feste Reihenfolge, harter Build-Check, Rückfall GDD § 14 immer gebaut, Cut-Liste #1/#2 | Ende-Sequenzen am 21.11. nicht fertig | beide |
| R11 | **KI-Gegenwind in der Community** | 2 | 3 | 🟡 6 | Handmade-Versprechen, ehrliche Offenlegung, Meta-Story | negative Kommentare zur KI | mzone |
| R12 | **Regeländerung 2026** (z. B. KI-Einschränkung) | 1 | 5 | 🟡 5 | Regel-Check 01.11., Code-Herkunft dokumentiert | neue Regeln | mzone |
| R13 | **Rechtliches** (Marken, Lizenzen) | 1 | 4 | 🟢 4 | keine EA-Namen/-Assets, `CREDITS.md`, Lizenzprüfung | – | mzone |

**Heatmap**

| W ↓ / A → | 1 | 2 | 3 | 4 | 5 |
|-----------|---|---|---|---|---|
| **5** | | | | | |
| **4** | | | R07 | R03 · R10 | **R01** |
| **3** | | | R05 · R08 · R14 · R15 · R18 | R06 · R16 · R17 | R02 · R04 |
| **2** | | | R11 | | R09 |
| **1** | | | | R13 | R12 |

---

## 4. Verantwortungsmatrix (RACI)

**R** = macht es · **A** = trägt die Verantwortung, entscheidet · **C** = wird konsultiert · **I** = wird informiert

| Aktivität | mzone | Claude Code | MZP | Claude Design | Tester |
|-----------|:-----:|:-----------:|:---:|:-------------:|:------:|
| Vision, Scope-Entscheidungen, Cut-Liste anwenden | **A/R** | C | – | – | I |
| Grill beantworten, Entscheidungslog bestätigen | **A/R** | C | – | – | – |
| Spec pflegen (Docs) | A | **R** | – | – | – |
| Zeichnen (alle sichtbaren Grafiken) | **A/R** | I | – | – | – |
| Scannen | **A/R** | I | – | – | – |
| Asset-Pipeline-Skripte (Schneiden, Tracing, Atlas) | A | **R** | – | – | – |
| Diagramme (How-to-play, Tech-Tree, Briefing) | A | R | **R** | – | – |
| UI-Layout-Mockups | A | C | – | **R** | – |
| Spielcode (Simulation, Render, UI) | A | **R** | – | – | – |
| Tests, CI, Build, Deploy | I | **A/R** | – | – | – |
| Tägliches Spielen + Feedback | **A/R** | I | – | – | – |
| Balancing (Zahlen) | **A** | R | – | – | C |
| Ansager- und SFX-Aufnahmen | **A/R** | – | – | – | – |
| Audio-Bearbeitung (Skript-Kette) | A | **R** | – | – | – |
| Musik beschaffen, Lizenzen prüfen | **A/R** | C | – | – | – |
| **Leitmotiv komponieren** (D-16) | **A/R** | C (Synth) | – | – | – |
| **`tools/4k/`** (Packer, Größen-Check, Vorschau) | A | **R** (lokale Session) | – | – | – |
| **4K-Sequenzen** in `game/src/sequences/` | A | **R** (lokale Session) | – | – | C |
| Host-Vertrag `playSequence` im Spiel | I | **R** | – | – | – |
| Playtests durchführen | **A/R** | C (Protokoll) | – | – | **R** |
| itch-Seite (Texte, Bilder) | **A/R** | C | C | C | I |
| KI-Offenlegung, Credits, Lizenzen | **A/R** | C | – | – | – |
| Jam-Einreichung (Klick auf „Submit“) | **A/R** | – | – | – | – |
| Voting-Phase, Community | **A/R** | – | – | – | – |

---

## 5. Entscheidungsmatrix Engine

Gewichtete Bewertung, Punkte 1–5. **„Vorerfahrung mzone“ steht neutral auf 3, bis Grill B4 beantwortet ist.**

| Kriterium | Gewicht | **Phaser 3 + TS** | Godot 4 (GDScript) | Unity 6 | PixiJS + Eigenbau |
|-----------|:-------:|:-----------------:|:------------------:|:-------:|:-----------------:|
| Web-Export-Qualität (Größe, Start, itch-iframe) | 20 % | 5 | 3 | 2 | 5 |
| KI-gestütztes Coden & Testbarkeit (alles Text, headless) | 20 % | 5 | 3 | 2 | 4 |
| Vorerfahrung mzone | 15 % | 3 | 3 | 3 | 3 |
| RTS-Bausteine eingebaut (Navigation, Tilemap) | 15 % | 3 | 5 | 4 | 1 |
| SVG-/2D-Asset-Pipeline | 10 % | 4 | 4 | 2 | 4 |
| Editor / Level-Werkzeuge | 10 % | 2 (Tiled extern) | 5 | 5 | 1 |
| Download-Größe / Ladezeit | 10 % | 5 | 3 | 2 | 5 |
| **Gewichtete Summe** | | **4,00** ✅ | 3,60 | 2,75 | 3,40 |

**Empfindlichkeit:** Wenn mzone Godot sicher beherrscht (Erfahrung Godot 5, Phaser 1), dreht sich das Ergebnis: **Godot 3,90 vs. Phaser 3,70**. → **Grill B4 entscheidet.** Ohne Antwort gilt Phaser.

---

## 6. Entscheidungsmatrix Perspektive

| Kriterium | Gewicht | Isometrisch (wie RA2) | Draufsicht, Figuren rotieren | **Lagekarte + Vogelschau-Spielsteine** |
|-----------|:-------:|:---------------------:|:----------------------------:|:--------------------------------------:|
| Zeichenaufwand (5 = wenig) | 30 % | 1 (8 Richtungen je Einheit) | 3 (1 Zeichnung, aber Draufsicht ist schwer erkennbar zu zeichnen) | **5** (1 Zeichnung, ¾-Ansicht, nur gespiegelt) |
| Lesbarkeit der Einheiten | 25 % | 3 | 3 | **4** |
| RA2-Gefühl | 15 % | 5 | 2 | 3 |
| Stil-Originalität | 15 % | 3 | 2 | **5** |
| Technik-Aufwand (5 = wenig) | 15 % | 2 (Iso-Sortierung, Iso-Picking) | 4 | 4 (Y-Sortierung) |
| **Gewichtete Summe** | | 2,55 | 2,85 | **4,30** ✅ |

---

## 7. Entscheidungsmatrix KI-Integration

| Kriterium | Gewicht | **Simuliert** (Zustandsautomaten) | **Simuliert + Keyword-Parser** | BYOK-LLM (Spieler-Key) | Server-Proxy (eigener Key) | Lokales Browser-LLM |
|-----------|:-------:|:---------------------------------:|:------------------------------:|:----------------------:|:--------------------------:|:-------------------:|
| Zugänglichkeit für Voter | 30 % | 5 | 5 | 1 | 4 | 1 (GB-Download, GPU) |
| Kosten | 15 % | 5 | 5 | 4 | 1 (Missbrauchsrisiko) | 5 |
| Zuverlässigkeit / Latenz | 20 % | 5 | 5 | 3 | 3 | 2 |
| Innovations-Wirkung | 20 % | 3 | 4 | 5 | 5 | 4 |
| Aufwand (5 = wenig) | 15 % | 5 | 4 | 2 | 1 | 1 |
| **Gewichtete Summe** | | **4,60** ✅ (M) | **4,65** (Parser = C) | 2,80 | 3,10 | 2,40 |

→ **Entscheidung D-03:** Simuliert als Must, Parser als Could. Die LLM-Varianten kommen erst post-jam (siehe [Tech-Spec § 11](05_TECH_SPEC.md#11-ausblick-wont-im-jam-echte-llm-direktiven)).

---

## 8. Scope-Szenario-Matrix

| Szenario | Stunden/Woche (Nov.) | Summe Nov. | Erreichbar | Empfohlener Inhalt | Risiko |
|----------|:--------------------:|:----------:|------------|--------------------|:------:|
| **A · Knapp** | ~12 h | ~50 h | **Plan Z** | „Defend the Conductor“: feste Basis, 3 Direktiven, Halluzination, Wellen, 1 Karte | 🟡 |
| **B · Standard (Default)** | ~22 h | **~92 h** | **Tier 0 + ~15 h Should** | alle Must + **Sequenzen F46–F49** (D-16) + ggf. F31. F35 nur, wenn Gate M2 es vorzieht ([Zeitplan § 4a](06_ZEITPLAN.md#4a-kapazitäts-check-d-16-4k-sequenzen)) | 🟠 |
| **C · Ambitioniert** | ~35 h | ~145 h | **Tier 1 + ~9 h Could** | alle Should (inkl. aller Sequenzen außer SQ-RADIO) + F40 (Freitext-Prompt) oder F51 (SQ-RADIO) | 🟠 |
| **D · Urlaub genommen** | ≥ 45 h | ~190 h | **Tier 2** | alles + 2 Zusatzmissionen + mehr Polish | 🔴 (Burnout) |

**Aufwandsmodell:** Plan Z ≈ 45 h · Tier 0 (Must) ≈ **76 h** · Tier 1 (Must + Should) ≈ **136 h** (davon 14 h Sequenzen) · Tier 2 (alles) ≈ **177 h** (davon 18 h Sequenzen). Pre-Production im Oktober (~35 h) ist **nicht** eingerechnet. Erfahrungsgemäß kommen **+20 % Unvorhergesehenes** dazu, und genau dafür sind Puffer und Cut-Liste da.

---

## 9. Werkzeug-Zuständigkeitsmatrix

● = Hauptwerkzeug · ○ = unterstützend

| Aufgabe / Asset | Papier & Tusche | Scanner / Scan-App | potrace / vtracer | MZP (`analog`) | Claude Design | Claude Code | Audacity / ffmpeg | Tiled |
|-----------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Einheiten, Gebäude, FX, Icons | ● | ● | ● | | | ○ (Skripte) | | |
| Hauptkarte K01 | ● | ● | | | | ○ (Bleistift-Variante) | | ○ (Kollision) |
| Kollisions-/Gelände-Layer | | | | | | ○ | | ● |
| Palette, Fonts, Strichcharakter | ○ | | | ● | ○ | | | |
| How-to-play, Tech-Tree, Briefing | ○ | | | ● | | ○ | | |
| HUD-/Menü-Layout | | | | | ● | ○ | | |
| UI-Rahmen im Spiel | ● | ● | ● | | ○ (Maße) | ○ | | |
| Spielcode, Tests, Build | | | | | | ● | | |
| Ansager, SFX | | | | | | ○ (Kette) | ● | |
| itch-Seite | ○ | | | ○ | ● (Layout) | ○ | | |
| Devlog-Grafiken | ○ | | | ● | | | | |
| 4K-Sequenzen (D-16) | ● (Zeichnungen) | ● | ○ | | | ● (Code, lokal) | ○ (Stimme) | |
