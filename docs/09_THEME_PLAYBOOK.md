# 09 · Theme-Playbook

> **Das Theme kommt am So 01.11.2026 um 22:37 MEZ.** „Theme Interpretation“ ist 1 von 6 Kategorien.
> Dieses Playbook sorgt dafür, dass du am Theme-Abend **nicht improvisierst**, sondern ein geübtes Verfahren abarbeitest.

---

## 1. Prinzipien

1. **Das Theme ist ein Gewürz, kein neues Gericht.** Die vier Design-Säulen (P1 Orchestrieren, P2 Handgemacht, P3 RA2-Gefühl, P4 Lesbar in 60 s) bleiben unangetastet.
2. **Ebene 1 + 2 + 3** (siehe [GDD § 20](02_GAME_DESIGN_SPEC.md#20-theme-modul-slot)): Erzählung + Ziel + **eine** Mechanik. Ebene 4 (Kern-Twist) nur, wenn das Theme perfekt passt **und** es weniger als 15 h kostet.
3. **Die erste Idee haben hundert andere auch.** Sie wird nur genommen, wenn sie mechanisch klar die beste ist.
4. **Notfall-Strategie:** Passt gar nichts, beschreibt das Theme **die Natur des Monolithen**, also *wogegen* du kämpfst. Das geht immer.
5. **Budget:** max. **6 neue Zeichnungen**, **4 neue Ansager-Lines**, **~9 h** Code (F19 + F35). Alles im `theme/themeModule.ts`.

---

## 2. Protokoll für den Theme-Abend (60 Minuten)

| Min. | Schritt | Wie |
|------|---------|-----|
| 0–5 | **Wort zerlegen** | Wörtliche Bedeutung · übertragene Bedeutung · technische Bedeutung (IT/KI!) · emotionale Bedeutung · Gegenteil · 5 Synonyme |
| 5–20 | **20 Ideen**, 4 pro Linse | **Linse A Monolith** (was ist er?) · **B Agenten/Squads** (neue Direktive? Rolle?) · **C Karte/Gelände** · **D Ökonomie/Ressource** · **E Präsentation/Meta** (Ansager, UI, Papier) |
| 20–35 | **Bewerten** (Tabelle unten) | Jede Idee 4 × 1–5 Punkte. Ideen unter 12 Punkten fliegen raus |
| 35–50 | **Top 3 ausarbeiten** | Je: Ebene-1-Satz, Ebene-2-Ziel, Ebene-3-Mechanik, Zeichnungen, Lines, Stunden |
| 50–60 | **Säulen-Check** | Verletzt eine Top-3-Idee P1–P4? → raus. Notizen weg, **schlafen** |
| Mo 02.11. | **Entscheidung** | mit frischem Kopf, eintragen als **D-12** im [Entscheidungslog](10_ENTSCHEIDUNGSLOG.md) |

### Bewertungsbogen

| Kriterium | 1 | 3 | 5 |
|-----------|---|---|---|
| **Fit** – erkennt ein Voter das Theme sofort? | muss erklärt werden | erkennbar | springt ins Auge |
| **Tiefe** – verändert es, wie man spielt? | nur Text | ein Ziel | eine Mechanik, die Entscheidungen verändert |
| **Aufwand** (5 = wenig) | > 15 h | 6–10 h | ≤ 4 h |
| **Originalität** – machen das 50 andere? | ja, offensichtlich | vielleicht | nur wir (wegen Agenten/Papier) |

**Mindestens 12 von 20 Punkten.** Bei Gleichstand gewinnt die höhere **Tiefe**.

---

## 3. Vorbereitete Andock-Ideen: 18 Theme-Kandidaten

**9 echte Game-Off-Themes** (2017–2025) als Training und **9 plausible neue Kandidaten**. Die Spalte **Score** ist meine Vorab-Schätzung (Fit/Tiefe/Aufwand/Originalität, max. 20).

| Theme | Ebene 1 · Erzählung | Ebene 2 · Ziel | Ebene 3 · Mechanik | Neue Zeichnungen | Score |
|-------|---------------------|----------------|--------------------|:----------------:|:-----:|
| **Throwback** *(2017)* | Der Monolith ist ein „Legacy-Modell“, das alte Technik wiederbelebt | 3 LEGACY SERVER einnehmen = Monolith-Schild aus | **ROLLBACK**-Direktive: Squad springt 1× pro Minute auf Position und HP von vor 10 s zurück | Rollback-Spirale, Retro-Ansager-Rahmen | 15 |
| **Hybrid** *(2018)* | Mensch-KI-Hybride | Sieg nur mit ≥ 2 Hybrid-Squads | **MERGE**: Zwei Agenten zu einem Hybrid verschmelzen (z. B. CRITIC + EXECUTOR = REVIEWER, kämpft und heilt) | 2–3 Hybrid-Figuren | 16 |
| **Leaps and Bounds** *(2019)* | Der Monolith wächst in Sprüngen | Stufen springen schneller, Gegenmittel einsammeln | **LEAP**-Verb: Squad springt 1× über den DATA LAKE (4 Kacheln) | Sprung-Bogen-Effekt | 14 |
| **Moonshot** *(2020)* | „Der große Wurf“ | Alternativer Sieg: MOONSHOT-Projekt fertigstellen | **MOONSHOT**: teures Projekt mit Erfolgschance, die jeder CRITIC in der Basis erhöht. Scheitert es, wächst der Monolith | Rakete aus Papier, Mond-Stempel | 15 |
| **Bug** *(2021)* | Halluzinationen sind **Bugs** | 3 „Bug-Nester“ debuggen | Halluzinationen erzeugen **echte kleine Bug-Kreaturen**, die stören. CRITIC heißt jetzt DEBUGGER und zertritt sie | 2 Bug-Figuren, Debugger-Lupe | **17** |
| **Cliché** *(2022)* | RTS-Klischee-Parodie, der Ansager kommentiert Klischees | Den „Panzer-Rush“ des Monolithen überleben | **PREDICT**: Der nächste Monolith-Angriff wird als Klischee-Karte angekündigt („TANK RUSH IN 30 s“) und kann gekontert werden | Klischee-Karten-Rahmen | 13 |
| **Scale** *(2023)* | Der Monolith *ist* Skalierung | wie Basis | **SCALE UP vs. SCALE OUT**: Squads verschmelzen zu einem großen Agenten oder bleiben viele kleine. Der Monolith skaliert sichtbar mit | 1 „großer Agent“ | **18** |
| **Secrets** *(2024)* | Der Monolith verbirgt seinen Kern | Kern muss erst gefunden werden (zufällige von 3 Positionen) | **INTEL**: SCOUTs decken geheime Schwachstellen auf (+50 % Schaden an markierten Nodes) | Siegel-/Akten-Stempel | 15 |
| **Waves** *(2025)* | Daten kommen in Wellen | Monolith-Wellen sind ohnehin Kern | **GEZEITEN**: Der DATA LAKE flutet periodisch Tiefland, Wege öffnen und schließen sich | Flut-Overlay | 15 |
| **Echo** | Der Monolith lernt von dir | – | **ECHO**: Der Monolith kopiert die Zusammensetzung deines letzten Squads. Wer abwechselt, gewinnt | Echo-Wellen-Effekt | 16 |
| **Connection / Connected** | Der CONDUCTOR braucht Verbindung | Funknetz bis zum Monolithen aufbauen | **LINK-REICHWEITE**: Squads empfangen Direktiven nur in Reichweite verbundener Relais. Der Monolith kappt Leitungen | Relais-Mast, Kabel | **17** |
| **Balance** | Alignment als Waage | Monolith aus dem Gleichgewicht bringen | **WAAGE**: Aggression vs. Verteidigung. Zu aggressiv → Halluzinationen steigen, zu defensiv → Monolith wächst schneller | Waage im HUD | 13 |
| **Loop** | „Die Karte erinnert sich“ | – | **ZEITSCHLEIFE**: Nach einer Niederlage startest du neu, aber **die Karte bleibt gezeichnet** und alle Erkenntnisse bleiben. Der Monolith startet stärker | Schleifen-Stempel | 16 |
| **Layers** | Transparentpapier-Schichten | Zweite Ebene unter der Karte | **SCHICHTWECHSEL**: Squads wechseln auf eine Unter-Ebene (Pausenpapier), um Klippen zu umgehen | zweite Karten-Ebene (teuer!) | 12 |
| **Signal** | Signal vs. Rauschen | Störsender des Monolithen zerstören | **STÖRFELD**: Im Rauschen des Monolithen verlieren Squads ihre Direktive | Rausch-Kritzel, Störsender | 15 |
| **Fragile** | Papier ist zerbrechlich | – | **RISSE**: Wo der Monolith läuft, reißt die Karte (unpassierbar). Agenten „flicken“ mit Klebeband | Riss-Decals, Klebeband | 14 |
| **Chaos** | **KAOD!** Ordnung (Monolith) vs. kontrolliertes Chaos (du) | – | **CHAOS-MODUS**: Halluzinationen bewusst auslösen, das verwirrt OVERFITTER (Typwechsel) | Chaos-Wirbel | **17** |
| **Cozy** *(Stresstest)* | Der Krieg ist ein Schreibtischspiel beim Tee | Den Monolithen **bekehren** statt zerstören | **ALIGN statt ZERSTÖREN**: Monolith-Einheiten werden „aligned“ und laufen über (INJECTOR wird Must) | Teetasse, Herz-Stempel | 11 → Notfall-Strategie |

> **Beobachtung:** Viele Themes docken an der **Halluzination**, am **Monolith-Wachstum** oder an **Direktiven** an. Das spricht dafür, dass das Konzept theme-robust ist.

---

## 4. Theme-Training (ein Abend in KW 44)

1. Ziehe **3 zufällige Themes** aus der Liste oben, decke dabei die Spalten 2–6 ab.
2. Führe für jedes das **Protokoll in 20 Minuten** (Kurzversion) durch.
3. Vergleiche mit der Tabelle: Was hattest du, was hatte ich, was ist besser?
4. Notiere, **welche Linse (A–E) dir die besten Ideen gibt**. Mit der fängst du am 01.11. an.

---

## 5. Regel-Check am 01.11. (vor dem Brainstorming)

- [ ] Theme-Ankündigung 2026 gelesen (GitHub Blog, Jam-Seite)
- [ ] **KI-Policy 2026** unverändert („AI-assisted development is allowed“)? → sonst sofort Entscheidungslog D-11 prüfen
- [ ] **Repo-Regel** (öffentlich, Code auf GitHub) unverändert?
- [ ] **Assets/Tools-Regel** (eigene Kreationen erlaubt) unverändert? → betrifft die Oktober-Zeichnungen
- [ ] **Deadline** 01.12., 13:37 PST bestätigt?
- [ ] **Updates während des Votings** erlaubt?
- [ ] Abweichungen in [Kontext § 1.3](01_KONTEXT_UND_AMBITION.md#13-regeln-2025-für-2026-noch-zu-bestätigen-a) eintragen

---

## 6. Ergebnis-Vorlage (am 02.11. ausfüllen → D-12)

```
THEME 2026:            ____________________
Gewählte Idee:         ____________________   Score: __/20
Ebene 1 (Erzählung):   Untertitel: "Orchestrate & Dominate: ____________"
                       Briefing-Satz: ____________________
Ebene 2 (Ziel):        ____________________
Ebene 3 (Mechanik):    ____________________
Neue Zeichnungen (≤6): ____________________
Neue Lines (≤4):       ____________________
Aufwand (h):           F19: __ h · F35: __ h
Verworfen (Top 2/3):   ____________________ (Grund: ____)
```
