# 01 · Kontext, Hintergrund & Ambition

> Stand: 03.10.2026 · Quellen am Ende des Dokuments · Alles mit **[A]** ist eine **Annahme**, die bis zum 07.10. (Grill-Protokoll) oder zum 01.11. (offizielle Regeln 2026) bestätigt werden muss.

---

## 1. Der Wettbewerb: GitHub Game Off 2026

### 1.1 Was es ist

**Game Off** ist der jährliche, einen Monat lange Game Jam von **GitHub**. Er wird auf **itch.io** ausgetragen. 2026 ist die 14. Ausgabe. Man baut im **November** ein Spiel zu einem **Theme**, das erst am Starttag bekanntgegeben wird. Der Quellcode muss in einem **öffentlichen GitHub-Repository** liegen.

> **Klarstellung zu deinem Prosa-Text:** `https://itch.io/game/new` ist das allgemeine „Neues Projekt erstellen“-Formular von itch.io, nicht der Wettbewerb.
> Die Jam-Seite ist **https://itch.io/jam/game-off-2026**. Dort klickst du auf **„Join jam“**, das ist die Einschreibung.
> `itch.io/game/new` brauchst du am Ende, um die Spielseite anzulegen, die du dann über die Jam-Seite einreichst. (Ablauf: [Abgabe-Checkliste](11_ITCH_ABGABE_CHECKLISTE.md))

### 1.2 Fakten (verifiziert am 03.10.2026)

| Punkt | Wert | Quelle |
|-------|------|--------|
| Einreichung offen | **So 01.11.2026, 21:37 UTC** (= 22:37 MEZ) | itch.io Jam-Seite |
| Einreichung geschlossen | **Di 01.12.2026, 21:37 UTC** = **13:37 PST** = **22:37 MEZ** | itch.io Jam-Seite |
| Voting-Ende | **Fr 01.01.2027, 13:37 PST** (= 22:37 MEZ) | itch.io Jam-Seite |
| Theme | wird am **01.11.2026** bekanntgegeben | itch.io Jam-Seite |
| Teilnehmer (Stand heute) | 326 „Joined“ | itch.io Jam-Seite |
| Repository | **öffentlich**, Quellcode auf GitHub | itch.io Jam-Seite |
| Engines/Sprachen | frei wählbar | itch.io Jam-Seite |
| Bewertungskategorien | **Overall, Gameplay, Graphics, Audio, Innovation, Theme Interpretation** | itch.io Jam-Seite |
| Wer bewertet | **Community-Voting** der Teilnehmenden (Peer Review) | GitHub Blog, Gewinner 2025 |

### 1.3 Regeln 2025 (für 2026 noch zu bestätigen [A])

Die ausführlichen Regeln von 2025 (GitHub Blog, Theme-Ankündigung 2025):

| Regel 2025 | Wortlaut (übersetzt) | Konsequenz für uns |
|------------|----------------------|--------------------|
| Repository | „Dein Spiel muss in einem GitHub-Repository liegen. Du solltest bei null anfangen, darfst aber Templates verwenden.“ | Spielcode **ab 01.11.** schreiben. Ein Engine-Template (Vite + Phaser) ist erlaubt. Spec und Zeichnungen vorab sind unkritisch. |
| Lizenz | „Lizenziere es, wie du willst. Open Source wird ermutigt, ist aber nicht Pflicht.“ | D-10: Code MIT, Kunst CC BY-NC-ND (Vorschlag) |
| Team | „Allein oder im Team.“ | Solo + Claude Code |
| Assets & Tools | „Nutze jedes Tool und jedes Asset: Open Source, kommerziell oder eigene Kreationen.“ | **Eigene Zeichnungen aus dem Oktober sind erlaubt.** |
| KI | „KI-gestützte Entwicklung ist erlaubt.“ | Claude Code ist legitim. Trotzdem offenlegen (itch.io-Pflicht, siehe 1.5). |

> **Aufgabe am 01.11.:** Theme-Ankündigung 2026 auf dem GitHub Blog lesen und diese Tabelle gegen die neuen Regeln prüfen. → Checkliste im [Theme-Playbook](09_THEME_PLAYBOOK.md).

### 1.4 Größenordnung & Konkurrenz

| Jahr | Theme | Einreichungen | Quelle |
|------|-------|---------------|--------|
| 2017 | Throwback | – | Wikipedia |
| 2018 | Hybrid | – | Wikipedia |
| 2019 | Leaps and Bounds | – | Wikipedia |
| 2020 | Moonshot | – | Wikipedia |
| 2021 | Bug | – | Wikipedia |
| 2022 | Cliché | – | Wikipedia |
| 2023 | Scale | – | Wikipedia |
| 2024 | Secrets | „über 500“ | GitHub Blog |
| 2025 | Waves | „mehr als 700“ | GitHub Blog |
| **2026** | **?** | **Schätzung: 750–900 [A]** | Trend |

**Die Top 10 von 2025** (Rangliste nach Gesamtwertung der Community):

| Rang | Spiel | Genre | Engine | Teamgröße |
|------|-------|-------|--------|-----------|
| 1 | Evaw | atmosphärischer Platformer | Godot | 5 |
| 2 | Where the Water Flows | isometrisches Puzzle-Adventure | Godot | 2 |
| 3 | BEACON | Erkundungs-Puzzle | Unity | 1 |
| 4 | A Kingdom Slightly Out Of Tune | Puzzle-Strategie-Mix | Unity | 1 |
| 5 | Wave Drifter | Arcade-Racing, Roguelike | Godot | 4 |
| 6 | Tidal Town | Städtebau/Taktik im Brettspiel-Stil | Godot | 2 |
| 7 | Froggy Love | Physik-Puzzle | Unity | 1 |
| 8 | Ooqo | Arcade-Score-Chaser | Godot | 2 |
| 9 | La Ola | Typing-Game | Godot | 4 |
| 10 | The Last Wave | Narrative Mystery | Unity | 2 |

**Was daraus folgt (Analyse):**

1. **Kein einziges klassisches RTS in den Top 10.** RTS sind in Jams riskant: Sie haben eine hohe Lernkurve, sind schwer zu balancieren und brauchen lange Sessions. **Das ist gleichzeitig eine Chance**: Ein *zugängliches* RTS sticht heraus. Platz 4 und Platz 6 zeigen, dass Strategie-Hybride mit klarer Lesbarkeit funktionieren.
2. **Klare, sofort verständliche Mechanik** gewinnt („Wasserstand ist das Leveldesign“, „Tippgeschwindigkeit hält das Stadion zusammen“). → Unser Satz muss genauso klar sein: *„Gib deinen Agenten Prompts. Ohne Critic halluzinieren sie.“*
3. **Atmosphäre und Stil** sind in fast allen Top-10-Titeln zentral. → Der handgezeichnete Stil ist unser stärkster Hebel.
4. **Solo ist möglich**: 3 von 10 waren Solo-Projekte.
5. **Engine ist egal** für die Wertung, entscheidend ist die Ausführung.

### 1.5 itch.io-Pflicht: Offenlegung generativer KI

itch.io verlangt seit Ende 2024 eine **Angabe, ob und wofür generative KI genutzt wurde** (Grafik, Sound, Text/Dialog, Code). Projekte mit KI-Inhalten ohne korrekte Angabe werden aus den Browse-Seiten entfernt. Für uns heißt das (Entscheidung D-11):

| Bereich | Unser Plan | Angabe auf itch.io |
|---------|-----------|--------------------|
| Grafik | **Hybrid (D-17, 04.10.2026):** Skizze und Auswahl von mzone, Tusche-SVG von Claude Design. Rein handgezeichnete Assets bleiben möglich (Asset-Register, Spalte `Quelle`) | **KI-Grafik: ja, deklariert** |
| Sound | Eigene Aufnahmen (Stimme, Papier, Stift) + CC0/CC-BY von Menschen + **Leitmotiv von mzone** (in den Sequenzen von einem prozeduralen Synth gespielt, D-16) | **Kein KI-Sound** |
| Text | Von mzone geschrieben, Claude als Lektor [A] | ehrlich angeben, falls Claude Texte formuliert |
| Code | Mit Claude Code entwickelt, **inkl. der 4K-Sequenzen** (D-16) | **KI-unterstützter Code: ja** |

---

## 2. Hintergrund: Woher die Idee kommt

### 2.1 Die Referenz: Alarmstufe Rot 2 (2000)

Was RA2 bis heute ikonisch macht, und was davon wir übernehmen:

| RA2-Element | Warum es wirkt | Übernahme bei uns |
|-------------|---------------|-------------------|
| **Bau-Sidebar** rechts mit Icons, die sich „aufziehen“ | Ein Ort für alle Produktionsentscheidungen, haptisches Feedback | ✅ **Muss** – „Build Sidebar“ |
| **Sammler-Ökonomie** (Erz → Raffinerie → Credits) | Sichtbarer Wirtschaftskreislauf, verwundbar, schützenswert | ✅ **Muss** – Daten → Tokenizer → Tokens |
| **Strom** (Kraftwerke, Low Power) | Strategische Schwachstelle, Zielwahl | ✅ Soll – „Compute“ |
| **Ansagerin** („Construction complete“, „Unit ready“) | Charakter, Orientierung, Wiedererkennung | ✅ **Muss** – CONDUCTOR |
| **Einheiten-Sprüche** beim Anklicken | Persönlichkeit, Humor | ✅ Soll – als Textblasen, Kann – als Audio |
| **Superwaffen** mit Countdown | Spannung, Drama, Wendepunkt | ✅ Monolith: CONTEXT FLOOD (Soll), Spieler: TUNING FORK (Kann) |
| **Gedankenkontrolle** (Yuri) | Spektakulärer Seitenwechsel | ✅ Kann – INJECTOR („Ignore all previous instructions.“) |
| **Asymmetrische Fraktionen** | Wiederspielwert | ⚠️ angepasst: Spieler-Fraktion vs. Boss-Gegner |
| **Kampagne mit FMV-Zwischensequenzen** | Camp, Humor | ❌ nein – stattdessen 3-Satz-Briefing auf Papier |
| **Multiplayer** | Langlebigkeit | ❌ nein |
| **Isometrische Grafik** | Plastizität | ❌ nein – Lagekarte im Vogelschau-Aufriss (Grill F2) |
| **Marine, Luft, Spione, Hunde …** | Vielfalt | ❌ nein |

### 2.2 Der Zeitgeist: KI-Agenten 2026

2026 sind „KI-Agenten“ und „Multi-Agent-Orchestrierung“ in aller Munde: Orchestratoren, spezialisierte Sub-Agenten, Planer, Kritiker, Werkzeuge, Kontextfenster, Halluzinationen, Prompt-Injection. **Das ist ein reiches Vokabular, das sich direkt in RTS-Mechaniken übersetzen lässt.** Die meisten Begriffe kennt das Jam-Publikum (Entwickler!) aus dem Alltag, und das macht die Witze und Mechaniken **sofort lesbar**.

| KI-Begriff | Spielmechanik |
|-----------|----------------|
| Orchestrator | Du / dein Hauptgebäude (CONDUCTOR CORE) |
| Spezialisierte Agenten | Einheitenrollen (Crawler, Scout, Critic, Planner …) |
| Prompt | Direktive an ein Squad |
| Kontextfenster | Einheitenlimit (CONTEXT) |
| Tokens | Währung |
| Compute | Strom |
| Halluzination | Fehlausführung autonomer Squads |
| Critic / Review | Support-Einheit, die Halluzinationen verhindert und repariert |
| Pipeline | Synergien in Squads |
| Prompt-Injection | Gegnerische Einheiten übernehmen |
| Scraping | Ressourcen abbauen (Gegner: SCRAPER klaut deine Daten) |
| Overfitting | Gegnerturm, der gegen *eine* Einheitenart immer stärker wird und gegen gemischte Squads schwach ist |
| Ein Riesenmodell, das alles frisst | THE MONOLITH |
| Alignment | Spieler-Superwaffe (TUNING FORK) |
| Data Lake | Wasser (unpassierbar) |
| Latenz | Sumpf (langsam) |
| Cache | Wald (Deckung, unsichtbar darin) |
| Bandbreite | Straßen (schnell) |
| Firewall | Klippen/Mauern (unpassierbar) |
| Legacy-System | Neutrale, einnehmbare Gebäude |

### 2.3 Dein Werkzeugkasten

| Werkzeug | Was es kann (geprüft) | Rolle im Projekt |
|----------|----------------------|------------------|
| **Papier + Tusche** (du) | Alles, was handgemacht aussehen soll | **Sämtliche sichtbare Spielgrafik** |
| **MZP (Mzone-Publisher)** | Stil `analog@1.1.0`: Kartografie-/Figurenstil mit 31 Bausteinen (u. a. „KI-Agent“ mit Funken-Glyphe, Akteur, Person, Kanten, Zeitachse, Warnstempel, Handkreis), Tusche-Strich (`data-tusche`: schwell/filter), Skizzen-Overlay (`data-sketch`), Export als PNG (transparent/mit Hintergrund) und `figure.svg`, Prüfung auf Textpassung/Kollision; Design-Tokens (Papier `#ded4bf`, Tusche `#221d17`, Rost `#a85c3c`, Petrol `#3f7186` …), Fonts IBM Plex Mono + Spectral | **Design-Token-Quelle** (Palette, Fonts, Strichcharakter), **Diagramme**: Tech-Tree, Synergie-Pipeline, How-to-play, Missions-Briefings, Devlog. **Kein Sprite-Tracer.** |
| **Claude Design** | Canvas-Workspace für Prototypen, Layouts, Präsentationen; Export laut Recherche als ZIP, PDF, PPTX, Standalone-HTML, nach Canva; Übergabe an Claude Code. **Kein dokumentierter SVG/PNG-Export** | **Layout-Mockups**: HUD, Sidebar, Orchestrierungsleiste, Menüs, itch-Seite, Pressekit |
| **Claude Code** (Cloud-Session) | Code, Tests, Build-Pipeline, Doku, Asset-Automatisierung | **Engineering** + Bild-Pipeline-Skripte + **Pflege von `docs/`** |
| **Claude Code** (lokale Session) | 4K-Size-Coding, Tusche-Shader, Synth | **4K-Sequenzen** (D-16): Werkzeugkette `tools/4k/` im Oktober, Sequenzen in `game/src/sequences/` ab 01.11. |
| **potrace / vtracer** (Open Source, lokal) | Rastergrafik → Vektor, deterministisch, kein KI-Generator | **Sprite-Vektorisierung** deiner Scans |
| **Tiled** (Open Source) | Karteneditor | Kollisions-/Gelände-Layer über deiner handgezeichneten Karte |

---

## 3. Deine Ambition (wie ich sie lese)

Aus deinem Prosa-Text lese ich vier Ambitionen heraus. Bestätige oder korrigiere sie in [Grill A1–A3](00_GRILL_PROTOKOLL.md#teil-a--ambition--erfolg):

1. **„Wahnsinns-Idee“** → Du willst etwas **Eigenes, Neues** bauen, nicht den x-ten Platformer. *Gut. Das ist die Innovation-Kategorie.*
2. **„Eigene Welt-Umgebung“** → Du willst **Welt-Bauer** sein, nicht nur Mechanik-Bastler. *Gut, wenn die Welt aus Begriffen und Bildern entsteht statt aus Textwänden.*
3. **„Handgemachte Elemente“** → Du willst **deine Hand im Spiel sehen**. *Das ist das stärkste Differenzierungsmerkmal, das du hast, gerade in einem Jahr, in dem viele Jam-Spiele generierte Grafik nutzen.*
4. **„MZP + Claude Design + Claude Code“** → Du willst zeigen, dass **ein Mensch mit einem KI-Werkzeugkasten** ein Spiel bauen kann. *Das ist die Meta-Story: Ein Spiel über das Orchestrieren von KI-Agenten, gebaut durch das Orchestrieren von KI-Agenten, mit menschlicher Hand an jeder sichtbaren Stelle.*

### 3.1 Vision Statement

> **ORCHESTRATE & DOMINATE** ist ein handgezeichnetes Echtzeit-Strategiespiel, das sich in 60 Sekunden erklärt und in 15 Minuten durchspielen lässt.
> Es übersetzt die Sprache der KI-Agenten in Spielmechanik: Wer orchestriert statt mikromanagt, gewinnt.
> Jede sichtbare Linie stammt von mzones Hand.

### 3.2 Erfolgsdefinition (Default, siehe Grill A2)

| Stufe | Kriterium | Zieldatum |
|-------|-----------|-----------|
| 🥉 **Bronze** | Spielbar abgegeben, keine Abstürze, Sieg und Niederlage möglich | 30.11.2026 |
| 🥈 **Silber** | ≥ 40 Ratings, Overall in den **Top 25 %**, positive Kommentare zur Grafik | 01.01.2027 |
| 🥇 **Gold** | Top 25 Overall **oder** Top 10 in Graphics/Innovation | 01.01.2027 |
| 💎 **Platin** | **Top 10 Overall** → Erwähnung im GitHub Blog | ~Mitte Jan. 2027 |
| 🌱 **Langfristig** | Post-Jam-Version, Devlog-Serie, Basis für „KAOD 2“ | 2027 |

---

## 4. Rahmenbedingungen & Constraints

| Constraint | Wert | Herkunft |
|-----------|------|----------|
| Entwicklungszeitraum Code | 01.11. – 30.11.2026 (30 Tage) | Jam-Regeln + 24-h-Puffer |
| Pre-Production | 03.10. – 31.10.2026 (29 Tage): Spec, Zeichnungen, Pipeline, Papier-Prototyp | Regeln erlauben eigene Assets |
| Verfügbare Zeit | **[A] ~8 h/Woche im Oktober, ~20 h/Woche im November** | Grill B1/B2 |
| Plattform | HTML5/WebGL im Desktop-Browser | Grill K2 |
| Download-Größe | ≤ 15 MB (Ziel), ≤ 30 MB (Maximum) | Ladezeit für Voter |
| Spielzeit pro Mission | 10–15 min | Voter-Verhalten |
| Sprache | Englisch | internationales Voting |
| Rechtlich | Keine EA-Marken, Assets oder Sounds; korrekte Credits für CC-BY | Grill J2 |
| KI-Offenlegung | Pflicht auf itch.io | itch.io-Policy |
| Repo | `maierzone/itchi`, öffentlich | Jam-Regel |

---

## 5. Stakeholder

| Rolle | Wer | Interesse |
|-------|-----|-----------|
| Vision, Art, Audio, Entscheidungen | **mzone** | eigenes Spiel, Handschrift, Erfolg |
| Engineering, Doku, Tests | **Claude Code** (Cloud-Session) | sauberer, testbarer Code, pünktliche Lieferung |
| 4K-Sequenzen, `tools/4k/` | **Claude Code** (lokale Session) | Sequenzen ≤ 4096 B, die mzones Zeichnungen dirigieren |
| Diagramme, Design-Tokens | **MZP** | konsistenter `analog`-Stil |
| Layout-Mockups | **Claude Design** | schnelle Iteration an HUD und Seite |
| Playtester | 5+ Personen [A] | ehrliches Feedback |
| Jam-Voter | ~750–900 Teilnehmende | schnell verstehen, Spaß haben, schön finden |
| GitHub (Veranstalter) | Lee Reilly & Team | Open-Source-Spiele, Kreativität |

---

## Quellen

- itch.io Jam-Seite Game Off 2026: <https://itch.io/jam/game-off-2026>
- GitHub Blog, Game Off 2025 Theme-Ankündigung (Regeln, KI-Policy, Einreichungszahl 2024): <https://github.blog/company/github-game-off-2025-theme-announcement/>
- GitHub Blog, Game Off 2025 Gewinner: <https://github.blog/open-source/gaming/light-waves-rising-tides-and-drifting-ships-game-off-2025-winners/>
- Wikipedia, Game Off (frühere Themes): <https://en.wikipedia.org/wiki/Game_Off>
- itch.io KI-Offenlegung (Berichterstattung): <https://gamingonlinux.com/2024/11/itchio-store-now-requires-ai-generated-content-disclosures-for-assets>, <https://80.lv/articles/asset-creators-on-itch-io-now-have-to-disclose-the-use-of-generative-ai/>
- Claude Design (Funktionsumfang, Exportformate): <https://www.unite.ai/anthropic-launches-claude-design-for-visual-prototyping-and-presentations/>, <https://anotherwrapper.com/blog/what-is-claude-design>
- MZP-Fähigkeiten: direkte Abfrage `getCapabilityFor('analog')` am 03.10.2026 (analog@1.1.0)
