# 06 · Zeitplan

> **Basis-Annahme (Grill B1/B2, Szenario B):** Oktober ~8 h/Woche · November **Mo–Fr 2 h, Sa/So 6 h** = **~92 h** im Jam.
> Feature-IDs (F01 …) siehe [Matrizen § 1](07_MATRIZEN.md#1-feature-priorisierungsmatrix). Asset-Batches siehe [Art-Bibel § 10](03_ART_UND_ASSET_BIBEL.md#10-zeichen-reihenfolge-verbindlich).
> Alle Zeiten in **MEZ/MESZ (Deutschland)**. Zeitumstellung am **So 25.10.2026**, danach gilt MEZ = UTC+1.

---

## 1. Überblick

```mermaid
gantt
    title ORCHESTRATE & DOMINATE – Game Off 2026
    dateFormat  YYYY-MM-DD
    axisFormat  %d.%m.
    section Pre-Production
    Spec lesen & Grill beantworten        :a1, 2026-10-03, 5d
    Entscheidungen fix (Mi)               :milestone, m00, 2026-10-07, 0d
    Batch 0 Stil-Proben + Pipeline-Test   :a2, 2026-10-05, 7d
    Batch 1+2 Einheiten & Gebäude         :a3, 2026-10-12, 7d
    Papier-Prototyp, Tester, Musik        :a4, 2026-10-12, 7d
    Batch 3 Karte A3 + Audio-Session 1    :a5, 2026-10-19, 7d
    Claude Design HUD-Mockups             :a6, 2026-10-19, 10d
    Batch 4+5 UI, FX, Marker              :a7, 2026-10-22, 10d
    Gate M0 Pre-Production fertig         :milestone, m0, 2026-10-31, 0d
    section Jam (November)
    Theme-Abend 22:37                     :crit, t0, 2026-11-01, 1d
    Woche 1 Core Loop                     :b1, 2026-11-02, 7d
    Gate M1 Core Loop                     :milestone, m1, 2026-11-08, 0d
    Woche 2 Kampf, Monolith, Orchestrierung :b2, 2026-11-09, 7d
    Gate M2 First Playable + Probe-Upload :crit, milestone, m2, 2026-11-15, 0d
    Woche 3 Theme, Audio, Onboarding, Should :b3, 2026-11-16, 7d
    Gate M3 Feature Freeze                :milestone, m3, 2026-11-22, 0d
    Woche 4 Polish, Balancing, itch-Seite :b4, 2026-11-23, 7d
    Gate M4 Release Candidate             :milestone, m4, 2026-11-29, 0d
    Abgabe (intern 22:00)                 :crit, s1, 2026-11-30, 1d
    Puffer / harte Deadline 22:37         :crit, s2, 2026-12-01, 1d
    section Voting
    Spielen, bewerten, kommentieren       :c1, 2026-12-02, 31d
```

| Phase | Zeitraum | Stunden (Annahme) | Ergebnis |
|-------|----------|:-----------------:|----------|
| **Pre-Production** | Sa 03.10. – Sa 31.10. | ~35 h | Entscheidungen, 55 Must-Zeichnungen, Karte, Pipeline, Audio-Session, Mockups, Tester |
| **Jam** | So 01.11. – Mo 30.11. | **~92 h** | Spiel, Seite, Abgabe |
| **Puffer** | Di 01.12. bis 22:37 | 0 h (Notfall) | – |
| **Voting** | Mi 02.12. – Fr 01.01.2027 | ~1 h/Tag (erste 10 Tage) | ≥ 50 bewertete Spiele, Devlog, Kommentare |

---

## 2. Oktober – Pre-Production

> **Regel-Hinweis:** Laut Game-Off-Regeln 2025 sind eigene Assets und Werkzeuge erlaubt, aber das Spiel soll „from scratch“ entstehen. Deshalb gilt im Oktober: **Zeichnungen, Audio, Spec, Asset-Werkzeuge: ja. Spielcode: nein.** Das schreiben wir offen ins README. Ein Wegwerf-Prototyp zum **Lernen** der Engine (eigenes, privates Repo, wird nicht eingereicht) ist ok.

| KW | Zeitraum | mzone | Claude Code | Ergebnis / Prüfpunkt |
|----|----------|-------|-------------|----------------------|
| 40 | Sa 03.10. – So 04.10. | Spec lesen, **Grill beantworten** | Spec-Fragen beantworten | Antworten im Grill-Protokoll |
| 41 | Mo 05.10. – So 11.10. | **Mi 07.10. Entscheidungen bestätigen** (Entscheidungslog). Vorlagen drucken + Testdruck (10 mm nachmessen). **Batch 0: Stil-Proben** U02, B03, Kartenausschnitt | Pipeline-Werkzeuge (`slice_sheet.py`, `trace.sh`, `colorize.py`, `build_atlas.ts`) bauen. Stil-Proben in ein **Testbild** setzen (statische Seite, die zeigt, wie es im Spiel aussehen würde) | **So 11.10.: Stil-Gate.** Sehen die Proben bei 1x gut aus? Wenn nein: Stifte/Maßstab anpassen, **bevor** die Serie beginnt |
| 42 | Mo 12.10. – So 18.10. | **Batch 1 + 2** (19 Zeichnungen). **Papier-Prototyp** an einem Abend mit 1–2 Leuten spielen (Brettspiel-Version: Monolith-Würfel, Direktiven-Karten). **Tester rekrutieren (≥ 5) und Musik anfragen bis Do 15.10.** | Batches durch die Pipeline schicken, Register-Status pflegen | 19 Assets im Testbild, Erkenntnisse aus dem Papier-Prototyp im Entscheidungslog |
| 43 | Mo 19.10. – So 25.10. | **Batch 3: Karte A3** (Wochenende!). **Audio-Session 1**: 16 Must-Ansager-Lines + Schreibtisch-SFX. Batch 4 beginnen | Karte: Raster-Weg + Bleistift-Variante. Audio-Bearbeitungskette als Skript. **Claude Design CD1/CD2** vorbereiten | Karte gescannt, Lines + SFX bearbeitet |
| 44 | Mo 26.10. – So 01.11. | **Batch 4 + 5** fertig. Auf itch.io: **„Join jam“** auf der Jam-Seite, privaten Projektentwurf über `itch.io/game/new` anlegen, butler installieren, `BUTLER_API_KEY` als Repo-Secret. **Theme-Training** (1 Abend, [Playbook § 4](09_THEME_PLAYBOOK.md)) | CD3-Mockups, Repo-Struktur vorbereiten (`game/` leer, CI-Vorlage), Theme-Playbook-Übung auswerten | **Sa 31.10.: Gate M0.** So 01.11. tagsüber: **Pause.** |

---

## 3. Der Theme-Abend – So 01.11.2026

| Uhrzeit (MEZ) | Was |
|---------------|-----|
| 22:00 | Bereit sein: Theme-Playbook offen, Notizblock, Tee |
| **22:37** | **Theme-Bekanntgabe** (GitHub Blog / Jam-Seite) |
| 22:40 – 22:55 | **Regel-Check 2026**: KI-Policy, Repo-Regel, Assets → Abweichungen in [Kontext § 1.3](01_KONTEXT_UND_AMBITION.md#13-regeln-2025-für-2026-noch-zu-bestätigen-a) eintragen |
| 22:55 – 23:40 | **Theme-Workshop** nach [Playbook § 2](09_THEME_PLAYBOOK.md#2-protokoll-für-den-theme-abend-60-minuten): 20 Ideen → bewerten → Top 3 |
| 23:40 – 00:00 | Top 3 notieren, **schlafen gehen** |
| Mo 02.11. Abend | Top 3 mit frischem Kopf, **Entscheidung D-12** eintragen, Theme-Zeichnungen und -Lines planen |

---

## 4. November – Tagesplan

**Legende:** ⬛ Engineering (mzone + Claude Code) · 🎨 Zeichnen · 🔊 Audio · 🧪 Test · 🚀 Release · ⭐ Gate

| Datum | Tag | h | Fokus | Features / Aufgaben | Ergebnis des Tages |
|-------|-----|:-:|-------|---------------------|--------------------|
| 01.11. | So | 2 | Theme | Theme-Abend (§ 3), `game/` aus Vite-Template anlegen | Top 3 Theme-Ideen, Repo-Skelett |
| 02.11. | Mo | 2 | ⬛ | **D-12 Theme fix** · F01 Setup, CI, Deploy-Pfad (GitHub Pages) | leere Szene läuft im Browser + CI grün |
| 03.11. | Di | 2 | ⬛ | F02 Karte (K01) + Kamera | Karte scrollbar |
| 04.11. | Mi | 2 | ⬛ | F03 Auswahl & Befehle | Einheiten auswählbar, Rechtsklick bewegt (gerade Linie) |
| 05.11. | Do | 2 | ⬛ | F04 Wegfindung I (A*, Budget, Glättung) | Einheiten laufen um Klippen und Wasser herum |
| 06.11. | Fr | 2 | ⬛ | F04 Wegfindung II (Gruppen, Separation, Feststecken) | 12 Einheiten erreichen gemeinsam ein Ziel |
| 07.11. | Sa | 6 | ⬛🎨🔊 | F05 Ökonomie · F06 Sidebar I · **Theme-Zeichnungen** · **Audio-Session 2 (Theme-Lines)** | CRAWLER sammelt, Tokens steigen |
| 08.11. | So | 6 | ⬛⭐ | F06 Sidebar II (Produktion, Platzierung) · F18 Art-Integration I | **Gate M1** |
| 09.11. | Mo | 2 | ⬛ | F07 Kampf + Schadensmatrix | Einheiten kämpfen und sterben |
| 10.11. | Di | 2 | ⬛ | F08 Monolith: Wachstum, Stufen, BROOD NODES, Schild | Balken wächst, Nodes erzeugen SHARDs |
| 11.11. | Mi | 2 | ⬛ | F09 Director I (Wellen) | Wellen greifen an |
| 12.11. | Do | 2 | ⬛ | F09 Director II (SCRAPER, Reaktionen) | SCRAPER klauen Daten |
| 13.11. | Fr | 2 | ⬛ | F10 Sieg/Niederlage/Endbildschirm · F11 Fog (einfach) | Partie kann enden |
| 14.11. | Sa | 6 | ⬛ | F12 Squads + ORCHESTRATION BAR · F13 Direktiven I | Squads mit EXPLORE/HOLD |
| 15.11. | So | 6 | ⬛🧪🚀⭐ | F13 Direktiven II (HUNT, FLOW) · F14 Halluzination · **Release-Probelauf** (private itch-Seite) · **Playtest 1** | **Gate M2 + Fun-Check** |
| 16.11. | Mo | 2 | ⬛ | Fixes aus Playtest 1 · F19 Theme-Modul I | – |
| 17.11. | Di | 2 | ⬛ | F19 Theme-Modul II | Theme spielbar (Ebene 1–2) |
| 18.11. | Mi | 2 | ⬛🔊 | F16 Audio-System, Must-SFX, CONDUCTOR-Warteschlange, Musik | Spiel klingt |
| 19.11. | Do | 2 | ⬛ | F15 Onboarding (8 Hinweise) | Erstspieler kommt allein klar |
| 20.11. | Fr | 2 | ⬛ | F17 Menüs, Pause, Optionen, Schwierigkeit | vollständiger Spielablauf |
| 21.11. | Sa | 6 | ⬛🎨 | **Should-Block 1** (Auswahl bei Gate M2, Vorschlag: F25 PLANNER + F26 Synergien + F35 Theme Ebene 3) | – |
| 22.11. | So | 6 | ⬛🧪⭐ | **Should-Block 2** (Vorschlag: F31 Tinten-Fog + F32 Line Boil) · F18 Art-Integration II · **Playtest 2** | **Gate M3 Feature Freeze** |
| 23.11. | Mo | 2 | 🧪 | Bugfixes Playtest 2 | – |
| 24.11. | Di | 2 | ⬛ | F20 Balancing (Szenario-Tests + Handtests) | NORMAL getunt |
| 25.11. | Mi | 2 | ⬛🔊 | Polish: Juice-Liste (GDD § 19), Audio-Mix | – |
| 26.11. | Do | 2 | 🧪 | Performance, Browser-Tests (Chrome, Firefox, Edge, Safari falls möglich) | Budgets eingehalten |
| 27.11. | Fr | 2 | 🧪 | **Playtest 3** (neue Tester!) → Fixes | – |
| 28.11. | Sa | 6 | 🚀 | F21 itch-Seite: Texte, Cover, 5 Screenshots, GIF, KI-Offenlegung, Credits · letztes Balancing | Seite fertig (privat) |
| 29.11. | So | 6 | 🚀⭐ | **v1.0.0-rc1** bauen, Abgabe-Checkliste komplett, Upload, Inkognito-Test in 2 Browsern | **Gate M4 Release Candidate** |
| **30.11.** | **Mo** | 2 | 🚀 | Nur kritische Fixes · **Seite öffentlich · Jam-Einreichung bis 22:00** | ✅ **ABGEGEBEN** |
| 01.12. | Di | 0 | – | **Puffer.** Harte Deadline **22:37 MEZ**. Nur im Notfall anfassen | – |

**Summe:** 21 Werktage × 2 h + 8 Wochenendtage × 6 h + Theme-Abend 2 h = **92 h**.

---

## 5. Meilenstein-Gates

| Gate | Datum | Muss erfüllt sein | Wenn nicht … |
|------|-------|-------------------|--------------|
| **M0 · Pre-Production** | Sa 31.10. | Grill beantwortet, Entscheidungen bestätigt · ≥ 90 % der Must-Zeichnungen gescannt · Pipeline erzeugt Atlas für ≥ 10 Assets · K01 gescannt · Audio-Session 1 erledigt · Jam beigetreten · ≥ 5 Tester · Theme-Training gemacht | Fehlende Zeichnungen wandern auf die November-Wochenenden (je 2 h). **Kein** Engineering-Tag wird dafür geopfert |
| **M1 · Core Loop** | So 08.11. | Karte, Kamera, Auswahl, Wegfindung, CRAWLER-Ökonomie, Bau über Sidebar, Einheiten produzieren · Theme-Entscheidung dokumentiert | > 1 Tag Rückstand: Gruppenbewegung vereinfachen (kein Formations-Offset). > 3 Tage: **Plan Z** prüfen |
| **M2 · First Playable** | So 15.11. | Ganze Partie von Start bis Sieg/Niederlage · Monolith wächst, Wellen kommen · Squads + 3 Direktiven + Halluzination · **Build läuft auf privater itch-Seite** · **Fun-Check** (unten) | siehe Fun-Check |
| **M3 · Feature Freeze** | So 22.11. | Alle Must-Features + ausgewählte Should · Theme-Modul drin · alle Must-Assets und -Sounds im Spiel · Onboarding · Menüs | Was nicht fertig ist, fliegt raus (Cut-Liste). **Ab hier keine neuen Features.** |
| **M4 · Release Candidate** | So 29.11. | Kein bekannter Absturz · 3 Browser getestet · itch-Seite komplett · NORMAL-Siegquote Erstspieler 50–70 % (Playtests) · Performance-Budgets · Credits, Lizenzen, KI-Offenlegung | Abgabe trotzdem am 30.11., denn **ein fertiges Spiel mit Macken schlägt ein perfektes, das nicht ankommt** |

### Fun-Check (Gate M2)

1. Will ich nach einer Partie **direkt noch eine** spielen?
2. Gab es mindestens **einen Moment, in dem Orchestrieren besser war als Klicken**?
3. Hat ein Tester **das Ziel ohne Erklärung in < 2 min** verstanden?
4. Ist die **Bedrohung durch den Monolithen spürbar** (Tester schaut auf den Balken)?
5. Läuft es **auf itch.io im Browser** ohne Fehler?

**≥ 4× Ja** → weiter nach Plan · **2–3× Ja** → Woche 3 beginnt mit dem schwächsten Punkt (die Should-Blöcke schrumpfen) · **≤ 1× Ja** → **Plan Z: „Defend the Conductor“** (feste Basis, Wellen, Direktiven, Halluzination, keine Expansion; erreichbar in ~45 h).

---

## 6. Playtest-Protokoll

| Punkt | Vorgabe |
|-------|---------|
| Ablauf | Link schicken, **nichts erklären**. Am besten per Bildschirmteilung zuschauen und **schweigen**. 10–15 min |
| Beobachten | Zeit bis zum ersten Gebäude · findet Squads/Prompts? · schaut auf den Monolith-Balken? · Reaktion auf Halluzination (lacht / flucht) · Verwirrungsmomente mit Zeitstempel · Bugs |
| 5 Fragen danach | (1) Was ist das Ziel? (2) Was hat dich frustriert? (3) Coolster Moment? (4) Was ist ein „Prompt“ in diesem Spiel? (5) Nochmal spielen? 1–5 |
| Jam-Simulation | Tester bewertet **die 6 Kategorien mit 1–5 Sternen**, so wie später im Jam |
| Ablage | `playtest/LOG.md` (Datum, Tester-Kürzel, Beobachtungen, Antworten, Sterne) |
| Termine | **15.11.** (2–3 Personen) · **22.11.** (3–5) · **27.11.** (**neue** Personen, die das Spiel nie gesehen haben) |

---

## 7. Cut-Liste (Reihenfolge ist verbindlich)

Wenn Zeit fehlt, wird **von oben nach unten** gestrichen. In der Krise wird nicht diskutiert, sondern gestrichen.

| # | Streichen | Ersatz |
|---|-----------|--------|
| 1 | alle **Could**-Features, die bis 22.11. nicht begonnen sind | – |
| 2 | F33 Musik-Intensitätsschichten | ein Kampf-Loop |
| 3 | F32 Line Boil | prozedurales Wackeln oder statisch |
| 4 | F24 TELEMETRY + Minimap | keine Minimap, dafür Leertaste = zum Ereignis springen |
| 5 | F30 CONTEXT FLOOD | Stufe III = nur stärkere Wellen |
| 6 | F28 Gelände-Effekte | nur passierbar/unpassierbar |
| 7 | F23 MODEL FACTORY + TRANSFORMER | nur Fußeinheiten |
| 8 | F31 Tinten-Fog-Animation | weicher Fog-Rand ohne Animation |
| 9 | F22 COMPUTE | kein Strom |
| 10 | F29 BRUTEFORCE + OVERFITTER | nur SHARD + SCRAPER |
| 11 | F27 ASSAULT + Zusatzziele | HUNT ANY ersetzt es |
| 12 | F25 PLANNER + Bedingungen | – |
| 13 | F26 Synergien | CRITIC senkt Halluzinationen trotzdem (Teil von F14) |

**Niemals gestrichen:** F13 Direktiven (mindestens HOLD + HUNT) · F14 Halluzination · F15 Onboarding · F16 Audio-Grundausstattung · F10 Sieg/Niederlage · F19 Theme (Ebene 1–2) · F21 Release.

---

## 8. Dezember – Voting-Phase

| Zeitraum | Aufgabe | Warum |
|----------|---------|-------|
| 02.–12.12. | **≥ 5 Spiele pro Tag** spielen, bewerten, **konstruktiv kommentieren** (Ziel ≥ 50) | Wer bewertet, wird gesehen: itch.io sortiert Jam-Einträge u. a. nach „Karma“ (aktive Bewerter werden sichtbarer) |
| 02.12. | Devlog-Post „Making of“ mit MZP-Figuren (Skizze → Spiel) | Aufmerksamkeit, Meta-Story |
| laufend | Auf jeden Kommentar unter dem eigenen Spiel antworten | Community, mehr Ratings |
| laufend | Bugs nur fixen, **wenn die Jam-Regeln Updates während des Votings erlauben**, sonst Post-Jam-Version separat hochladen | Regelkonformität |
| 01.01.2027 | Voting-Ende 22:37 MEZ | – |
| ~Mitte Jan. | Ergebnisse, Retrospektive in `docs/RETRO.md` | Lernen |

---

## 9. Tagesritual im November

1. **Start (5 min):** gestrige Devlog-Zeile lesen, heutige Zeile im Tagesplan lesen.
2. **Arbeiten:** ein Feature, nicht drei.
3. **Ende (20 min):** **15 min den aktuellen Build spielen** → 3 Sätze in `playtest/LOG.md` → Commit → 1 Zeile Devlog.
4. **Hinter Plan?** Nicht länger aufbleiben, sondern die **Cut-Liste** anwenden.
