# 00 · Grill-Protokoll

> **Du wolltest gegrillt werden. Bitte sehr.**
> Dieses Dokument ist absichtlich unbequem. Jede Frage hat drei Teile:
>
> - **❓ Frage** – was ich von dir wissen muss.
> - **🔥 Warum ich frage** – die unbequeme Wahrheit dahinter.
> - **🧭 Mein Default** – was in der Spec steht, **solange du nichts anderes sagst**. Die ganze Spec ist auf diese Defaults gebaut.
> - **✍️ Deine Antwort** – hier reinschreiben (direkt in dieser Datei, committen).
>
> **Deadline für deine Antworten: Mittwoch, 07.10.2026.** Danach gelten die Defaults als bestätigt (siehe [Entscheidungslog](10_ENTSCHEIDUNGSLOG.md)).

---

## Teil 0 – Erst mal die Red Flags, ungeschönt

| # | Red Flag | Klartext | Was ich daraus gemacht habe |
|---|----------|----------|------------------------------|
| 🚩1 | **„Wettbewerb bei GitHub, https://itch.io/game/new“** | `itch.io/game/new` ist **kein Wettbewerb**, das ist das ganz normale „Neues Projekt anlegen“-Formular von itch.io. Der Wettbewerb heißt **GitHub Game Off 2026** und liegt unter **[itch.io/jam/game-off-2026](https://itch.io/jam/game-off-2026)**. Dort musst du auf **„Join jam“** klicken. Das ist die „Einschreibung“. `itch.io/game/new` brauchst du erst ganz am Ende für die Spielseite. | [Kontext](01_KONTEXT_UND_AMBITION.md) + [Abgabe-Checkliste](11_ITCH_ABGABE_CHECKLISTE.md) |
| 🚩2 | **Alarmstufe Rot 2 als Messlatte** | RA2 wurde von einem großen Profi-Studio über Jahre gebaut. Du hast **30 Tage**, wahrscheinlich nebenberuflich. Wenn du „RA2, aber mit KI“ baust, gibst du **nichts** ab. RA2 ist für uns ein **Gefühl** (Sidebar, Sammler, Strom, Ansager, Superwaffe), **kein Umfang**. | Micro-RTS mit 1 Karte, 1 spielbarer Fraktion, asymmetrischem Boss-Gegner und 10–15 Minuten Spielzeit |
| 🚩3 | **„Neues Konzept“ – wirklich?** | Nimm die KI-Begriffe weg. Bleibt dann ein C&C-Klon mit umbenannten Einheiten übrig? **Ja, wenn wir nicht aufpassen.** Ein Reskin ist kein neues Konzept. Neu wird es nur, wenn KI-Agenten-Verhalten **die Mechanik verändert** und nicht nur die Namen. | Kern-Neuheit: **Prompt-Direktiven** statt Mikromanagement, **Pipelines/Synergien** je nach Squad-Zusammensetzung, **Halluzination** als Risiko autonomer Agenten |
| 🚩4 | **Dein Titel** | „Ki-Agent-Orchestrate-And-Dominate“ mischt Deutsch und Englisch, hat drei Bindestriche und wird in itch.io-Thumbnails abgeschnitten. Und „KI“ versteht international keiner. | Titel **ORCHESTRATE & DOMINATE**, Codename **KAOD** („Chaos“) bleibt dir intern erhalten |
| 🚩5 | **Das Theme ist noch unbekannt** | „Theme Interpretation“ ist **1 von 6 Bewertungskategorien**. Das Theme kommt am **01.11. um 22:37 MEZ**. Wenn dein Konzept starr ist, verlierst du eine ganze Kategorie. | „Theme-Modul“-Slot im Design + [Theme-Playbook](09_THEME_PLAYBOOK.md) mit Vorab-Training |
| 🚩6 | **Du hast Audio vergessen** | Audio ist **1 von 6 Kategorien**, also ~17 % der Bewertung. In deinem Prosa-Text taucht es nicht auf. | [Audio-Spec](04_AUDIO_SPEC.md): handgemachtes Audio (Papier, Stift, Stempel, deine Stimme als Ansager) |
| 🚩7 | **„Der MZP kann SVG aus Skizzen“** | Ich habe deinen MZP geprüft. Der Stil `analog@1.1.0` ist ein **Figuren-/Diagramm-Stil**: 31 Bausteine (Akteur, KI-Agent, Kanten, Zeitachse, …), Tusche-Strich, Skizzen-Overlay. Er **baut Skizzen als Diagramme nach**. Er ist **kein Sprite-Tracer** für Einheiten und Gebäude. | MZP für Tech-Tree, Briefings, How-to-play-Grafik, Devlog **und als Design-Token-Quelle** (Palette, Fonts). Sprites: lokales Tracing (potrace/vtracer) |
| 🚩8 | **„Wenn nicht MZP, dann 100 % Claude Design“** | Laut aktueller Recherche exportiert Claude Design **kein SVG/PNG**, sondern ZIP, PDF, PPTX, Standalone-HTML, Canva und Übergabe an Claude Code. Für Sprites ist es das falsche Werkzeug. Für **UI-Layouts, Menüs und die itch-Seite** ist es stark. | Claude Design = HUD-/Menü-/Marketing-Mockups → Übergabe an Claude Code |
| 🚩9 | **KI-Spiel + KI-Werkzeuge in der Indie-Community** | Ein Teil der itch.io-Community reagiert allergisch auf generative KI. itch.io verlangt eine **Offenlegung generativer KI** (Grafik, Sound, Text, Code). Wenn deine Grafik KI-generiert *aussieht*, kostet dich das Stimmen. | **Handmade-Versprechen:** Jede sichtbare Grafik ist von deiner Hand, Vektorisierung erfolgt deterministisch (kein Generator). KI-unterstützter **Code** wird offen deklariert |
| 🚩10 | **Echte LLMs im Spiel?** | Ein Browser-Spiel auf itch.io kann **keinen API-Key** mitliefern. Jeder Voter müsste seinen eigenen Key eintippen. Das macht **niemand** in einem Jam mit 700+ Einträgen. Dazu kommen Latenz, Kosten und Ausfälle. | Agenten sind **simuliert** (Zustandsautomaten + Utility-Scoring), sie *fühlen* sich wie Prompts an. Echte LLM-Anbindung (BYOK) = **Won’t** für den Jam |
| 🚩11 | **Markenrecht** | „Command & Conquer“, „Red Alert“, „Alarmstufe Rot“, „EVA“, „Hell March“ und die Original-Sounds gehören EA. **Nichts davon** darf ins Spiel, auf die Seite oder ins Repo. | „Inspired by classic 2000s RTS“ ist ok. Eigene Namen, eigene Sounds, eigener Ansager (CONDUCTOR) |

---

## Teil A – Ambition & Erfolg

**A1 ❓ Warum machst du beim Game Off mit? Wähle EINEN Hauptgrund.**
(a) Gewinnen/Top 10 · (b) Ein fertiges Spiel abliefern · (c) Deinen KI-Workflow (Claude Code + MZP + Claude Design + Handarbeit) öffentlich beweisen · (d) Basis für ein größeres Projekt nach dem Jam · (e) Spaß
🔥 „Alles davon“ ist keine Antwort. (a) und (d) ziehen in entgegengesetzte Richtungen: Für (a) brauchst du einen *kleinen, polierten* Jam-Titel, für (d) baust du eine *erweiterbare* Architektur und unterschätzt dabei den Polish.
🧭 **Default: (b) + (c).** Ein fertiges, poliertes, handgemachtes Micro-RTS, das deinen Workflow zeigt. (a) ist der Bonus, nicht der Plan.
✍️ Deine Antwort: ______________________

**A2 ❓ Was ist für dich am 01.01.2027 (Ende des Votings) ein Erfolg? Gib eine messbare Zahl.**
🔥 Ohne Zahl merkst du nicht, ob du gewonnen oder verloren hast, und du triffst im November keine harten Cut-Entscheidungen.
🧭 **Default:** Abgabe spielbar + **≥ 40 Ratings** + **Top 25 % Overall** + mindestens 1 Kategorie in den Top 10 % (Ziel: Graphics oder Innovation). Details: [Erfolgs-Report](08_AUSSICHTS_ERFOLGS_MATRIX_REPORT.md).
✍️ Deine Antwort: ______________________

**A3 ❓ Was ist für dich ein Misserfolg, bei dem du trotzdem zufrieden wärst?**
🔥 Diese Frage schützt dich vor Burnout in Woche 3.
🧭 **Default:** „Platzierung egal, wenn das Spiel fertig ist, nicht abstürzt und die Leute die Grafik lieben.“
✍️ Deine Antwort: ______________________

**A4 ❓ Solo oder Team? Gibt es jemanden, der Musik oder Sounddesign macht, oder 5 Leute, die im November testen?**
🔥 3 der Top-10-Spiele von 2025 waren Solo-Projekte, 7 waren Teams aus 2–5 Personen. Solo geht, aber **Audio und Playtests** sind solo die üblichen Opfer.
🧭 **Default:** Solo (+ Claude Code). **Mindestens 5 externe Playtester** werden bis 15.10. rekrutiert.
✍️ Deine Antwort: ______________________

---

## Teil B – Zeit & Realität

**B1 ❓ Wie viele Stunden hast du im November WIRKLICH? Pro Woche, ehrlich, nach Job, Familie, Schlaf.**
🔥 Das ist die wichtigste Zahl in diesem ganzen Dokument. Sie entscheidet über den Scope. Mein Aufwandsmodell sagt (deine Stunden, wenn Claude Code den Großteil des Codes schreibt, inklusive Theme, Balancing und Release):
- **Plan Z „Defend the Conductor“** ≈ 45 h
- **Tier 0 „Must“** ≈ 75 h
- **Tier 1 „Must + Should“** ≈ 135 h (inkl. 4K-Sequenzen, D-16)
- **Tier 2 „alles“** ≈ 175 h

Siehe [Matrizen → Scope-Szenarien](07_MATRIZEN.md#8-scope-szenario-matrix).
🧭 **Default: Szenario B = Mo–Fr 2 h + Sa/So 6 h = ~92 h im November.** Ziel ist damit **Tier 0 komplett + ~15 h ausgewählte Should-Features**. Plan Z ist die Rückfallebene.
✍️ Deine Antwort (h/Woche, + feste Tage, an denen du NICHT kannst): ______________________

**B2 ❓ Wie viele Stunden hast du im Oktober (Pre-Production)?**
🔥 Alle Zeichnungen, die nicht vom Theme abhängen, können im Oktober entstehen (die Regeln erlauben eigene Assets). Jede Zeichnung im Oktober ist eine Stunde mehr Code-Zeit im November.
🧭 **Default: ~8 h/Woche im Oktober**, fast nur Zeichnen + Pipeline-Test + Papier-Prototyp.
✍️ Deine Antwort: ______________________

**B3 ❓ Hast du jemals ein Spiel fertig gemacht und veröffentlicht? Irgendeins, auch ein kleines?**
🔥 Wer noch nie „fertig“ gemacht hat, unterschätzt die letzten 20 % (Menüs, Bugs, Upload, Browser-Eigenheiten, Seite) um Faktor 2–3.
🧭 **Default:** Ich gehe von „nein, nicht als Spiel“ aus. Deshalb gibt es einen **Release-Probelauf am 15.11.**: ein hässlicher Build auf einer privaten itch-Seite.
✍️ Deine Antwort: ______________________

**B4 ❓ Wie gut programmierst du selbst? (0 = gar nicht, 5 = Profi.) Welche Sprachen? Welche Engine kennst du?**
🔥 Die Engine-Wahl hängt daran. Wenn du Godot kannst, nimm Godot. Wenn du *mit* Claude Code programmierst und Web-Technik kennst, ist Phaser + TypeScript der kürzeste Weg, weil alles Text und Code ist und sich alles testen lässt.
🧭 **Default: Phaser 3 + TypeScript** (siehe [Entscheidungsmatrix Engine](07_MATRIZEN.md#5-entscheidungsmatrix-engine)).
✍️ Deine Antwort: ______________________

**B5 ❓ Wer schreibt den Code: du, Claude Code, oder ihr beide im Pair-Modus?**
🔥 „Claude macht das“ funktioniert für isolierte Systeme sehr gut (Pathfinding, Ökonomie, Tests). Bei **Spielgefühl** (Steuerung, Kamera, Feedback, Balancing) musst **du** spielen, fühlen und entscheiden, und zwar täglich.
🧭 **Default:** Claude Code implementiert, **du spielst jeden Abend 15 Minuten den aktuellen Build** und schreibst 3 Sätze Feedback in `playtest/LOG.md`.
✍️ Deine Antwort: ______________________

**B6 ❓ Was passiert, wenn du in Woche 2 krank wirst oder der Job eskaliert?**
🔥 Bei 30 Tagen ist eine verlorene Woche ein Viertel deiner Zeit.
🧭 **Default:** Ein **spielbarer Kern** (Gate M2: Start → Sieg/Niederlage, Direktiven, Halluzination) steht bis **So 15.11.** Ab dort wird nur noch vervollständigt und poliert. Die Cut-Liste in [Zeitplan § Cut-Liste](06_ZEITPLAN.md#7-cut-liste-reihenfolge-ist-verbindlich) ist vorab festgelegt, damit du in der Krise **nicht nachdenken** musst.
✍️ Deine Antwort: ______________________

---

## Teil C – Konzept & Neuheit

**C1 ❓ Beschreibe in EINEM Satz, was ein Spieler in deinem Spiel tut, was er in RA2 NICHT tut.**
🔥 Wenn dir das nicht in 10 Sekunden gelingt, gelingt es den Votern auch nicht, und „Innovation“ ist weg.
🧭 **Default:** *„Du gibst Squads aus spezialisierten KI-Agenten kurze Prompts (‚JAGE SCRAPER · RÜCKZUG BEI 30 %‘), und wie gut sie die ausführen, hängt davon ab, wie du das Squad zusammenstellst: Ohne Critic halluzinieren sie.“*
✍️ Dein Satz: ______________________

**C2 ❓ Direkte Steuerung (klick-bewegen-angreifen) ja oder nein?**
🔥 *Nur* indirekte Steuerung (wie bei „Majesty“) ist innovativ, frustriert aber RTS-Fans und überfordert Jam-Voter, die 3 Minuten investieren. *Nur* direkte Steuerung macht die Direktiven überflüssig.
🧭 **Default: Hybrid.** Direkte Befehle sind immer möglich und zuverlässig. Squads unter Direktive sind aber **„im Flow“** (+20 % Angriffstempo, +10 % Tempo) und handeln selbst, **riskieren dafür Halluzinationen**. Der Monolith greift an mehreren Fronten an, und du kannst nicht überall mikromanagen. Genau so wird Orchestrieren zur besten Strategie.
✍️ Deine Antwort: ______________________

**C3 ❓ Wie ernst ist der Ton? Satire, ernst, düster, albern?**
🔥 RA2 war gewollt trashig-überdreht. KI-Satire („Attention is all I need“, sagt der Transformer-Panzer) ist witzig, kann aber schnell zynisch wirken.
🧭 **Default: RA2-Camp + liebevolle Tech-Satire.** Kein Zynismus gegen Menschen, sondern Augenzwinkern über KI-Hype. Der Monolith ist die Karikatur von „ein Modell, das alles frisst“, dein Schwarm steht für spezialisierte Zusammenarbeit.
✍️ Deine Antwort: ______________________

**C4 ❓ „Eigene Welt“ – wie viel Lore willst du wirklich?**
🔥 In einem Jam liest niemand mehr als 3 Sätze Story. Welt entsteht durch **Namen, Bilder und Ansager-Sprüche**, nicht durch Textwände.
🧭 **Default:** Welt in **Begriffen** (Data Lake, Latency Swamp, Cache Forest, Firewall Cliffs, Legacy Server), in einem **3-Satz-Briefing** pro Mission und in **Einzeilern** der Einheiten. Mehr nicht.
✍️ Deine Antwort: ______________________

**C5 ❓ Spielbare Fraktionen: 1 oder 2?**
🔥 Zwei spielbare Fraktionen bedeuten doppelte Assets, doppeltes Balancing und eine echte Gegner-KI für beide Seiten. Das ist nicht machbar.
🧭 **Default: 1 spielbare Fraktion (ORCHESTRA) gegen 1 asymmetrischen Boss-Gegner (THE MONOLITH).** Der Monolith baut nicht wie ein Spieler, er *wächst*. Das ist billiger zu bauen und fühlt sich bedrohlicher an.
✍️ Deine Antwort: ______________________

**C6 ❓ Multiplayer?**
🔥 Nein. Netzwerk-Synchronisation eines RTS in 30 Tagen ist ein Projekt für sich. Und Jam-Voter spielen allein.
🧭 **Default: Nein. Won’t.**
✍️ Bestätigt? ______________________

---

## Teil D – Scope

**D1 ❓ Welche 3 Dinge aus RA2 MÜSSEN drin sein, damit es sich für dich nach RA2 anfühlt? Nur drei.**
🔥 Alles andere ist verhandelbar. Wenn du hier fünf nennst, hast du die Frage nicht ernst genommen.
🧭 **Default:** (1) **Bau-Sidebar** mit Countdown-Icons, (2) **Sammler-Ökonomie** (Crawler fährt zum Datenfeld und zurück), (3) **Ansager** („Construction complete.“ → bei uns: *„Build complete.“* vom CONDUCTOR).
✍️ Deine drei: 1. ________ 2. ________ 3. ________

**D2 ❓ Was davon bist du bereit zu streichen: Superwaffe, Strom/Compute, Minimap, Mauern, Artillerie, 2. und 3. Mission, Held?**
🔥 Wenn „nichts“ deine Antwort ist, streicht die Deadline für dich, und zwar zufällig statt geplant.
🧭 **Default:** Das alles ist **Should/Could**. Fix ist nur Tier 0 (siehe [Matrizen § Feature-Priorisierung](07_MATRIZEN.md#1-feature-priorisierungsmatrix)).
✍️ Deine Antwort: ______________________

**D3 ❓ Wie viele Einheitentypen? Wie viele Gebäude?**
🔥 Jeder Einheitentyp kostet: 1–2 Zeichnungen, Werte, Balancing, Sound, Icon und Tooltip. Rechne mit ~3–5 h pro Typ, alles inklusive.
🧭 **Default:** Tier 0: **4 Agenten, 4 Gebäude** · Tier 1: **6 Agenten, 7 Gebäude** · Monolith: **3–4 Einheiten, 3–4 Strukturen**.
✍️ Deine Antwort: ______________________

**D4 ❓ Eine Karte oder mehrere?**
🔥 Eine handgezeichnete A3-Karte ist ein **Kunstwerk**, also Zeit. Drei Karten bedeuten dreimal so viel.
🧭 **Default:** **1 Hauptkarte (A3)** mit einer Mission, die sich in 3 Phasen entfaltet (Kaltstart → Expansion → Dominate). Weitere Missionen = Could.
✍️ Deine Antwort: ______________________

---

## Teil E – „KI-Agent“ im Spiel

**E1 ❓ Sollen echte Sprachmodelle im Spiel laufen?**
🔥 Siehe Red Flag 10: kein Key, kein Geld, keine Latenz-Toleranz im Jam. Lokale Browser-Modelle (WebLLM o. ä.) bedeuten Gigabyte-Downloads und GPU-Voraussetzungen, und das ist für einen Jam tödlich.
🧭 **Default: Nein.** Simulierte Agenten. **Optional (Could):** Ein *lokaler Schlüsselwort-Parser* erlaubt Freitext-Prompts („hunt scrapers, retreat at 30%“) und zeigt dann „Interpreted as: HUNT SCRAPER · RETREAT 30 %“. Das fühlt sich nach Prompt an und kostet 0 €.
✍️ Deine Antwort: ______________________

**E2 ❓ Ist „Halluzination“ als Mechanik für dich lustig oder nervig?**
🔥 Zufall, der dem Spieler Kontrolle nimmt, ist in Strategiespielen gefährlich. Richtig dosiert ist er ein Running Gag, falsch dosiert ein Rage-Quit.
🧭 **Default:** Halluzinationen nur bei **autonomen Squads**, Basis 10 % pro Entscheidungsfenster (5 s), Dauer 3 s, **mit Critic 2 %**, nie tödlich (kein Friendly Fire). Visuell: Tinten-„?!“-Wolke + Ansager „Hallucination detected.“
✍️ Deine Antwort: ______________________

**E3 ❓ Darf Claude Code den kompletten Spielcode schreiben, und willst du das offen sagen?**
🔥 Die Game-Off-Regeln 2025 erlauben ausdrücklich KI-gestützte Entwicklung (für 2026 nach Veröffentlichung prüfen). Die itch.io-Offenlegung ist trotzdem Pflicht, und Ehrlichkeit ist hier auch Marketing („Handgezeichnet von mzone, orchestriert mit KI-Agenten“, *das passt zum Spiel!*).
🧭 **Default: Ja, offen deklariert.** Die Meta-Ebene wird Teil der Story: *Ein Spiel über das Orchestrieren von KI-Agenten, gebaut durch das Orchestrieren von KI-Agenten.*
✍️ Deine Antwort: ______________________

---

## Teil F – Art & Handarbeit

**F1 ❓ Kannst du 118 Zeichnungen in einem konsistenten Stil liefern? Hast du schon mal eine Serie gezeichnet?**
🔥 Das [Asset-Register](../art/ASSET_REGISTER.csv) zählt **55 Zeichnungen für Tier 0 (Must)**, **118 für Tier 1 (Must + Should, inkl. 8 Monolith-Splitter für die Sequenzen)** und **145 insgesamt**. Viele davon sind klein (Icons, Kleckse, Cursor), dazu kommt aber **eine A3-Karte**, die allein ein Wochenende braucht. 55 Zeichnungen im Oktober sind ~2 pro Tag. Konsistenz (gleiche Strichstärke, gleicher Maßstab, gleiche Formsprache) ist schwerer als die einzelne Zeichnung.
🧭 **Default:** Zuerst **3 Stil-Proben** (1 Einheit, 1 Gebäude, 1 Kartenausschnitt) durch die komplette Pipeline bis ins Spiel. **Erst danach** wird in Serie gezeichnet. Alle Zeichnungen auf den **Skizzenbögen** aus `art/vorlagen/`.
✍️ Deine Antwort: ______________________

**F2 ❓ Isometrisch wie RA2, oder Draufsicht?**
🔥 Isometrie heißt: jede Einheit in **8 Blickrichtungen** zeichnen (RA2 nutzt intern sogar mehr), dazu isometrische Kacheln, Überlappungen und Sortierung. Bei Handzeichnung verachtfacht das deine Arbeit pro Einheit.
🧭 **Default: Lagekarte in Draufsicht, Figuren und Gebäude im „Vogelschau-Aufriss“** wie auf alten Landkarten: Häuser und Berge von schräg vorne, die Karte selbst von oben. Figuren stehen **aufrecht wie Spielfiguren** auf farbigen Sockeln und werden nur horizontal gespiegelt, nie gedreht. **1 Zeichnung pro Einheit statt 8.**
✍️ Deine Antwort: ______________________

**F3 ❓ Strichstärke: Womit zeichnest du?**
🔥 Harte Physik: Eine Einheit, die du **30 mm** groß zeichnest, wird im Spiel ~**48 px** groß. Ein **0,3-mm-Fineliner** wird dabei zu **0,5 px**, also unsichtbar. Das ist der häufigste Fehler bei handgezeichneten Spielen.
🧭 **Default:** Außenkontur **1,0–2,0 mm** (Brush-Pen oder dicker Marker), Innendetails **0,5–0,8 mm**, **keine feinen Schraffuren auf Einheiten**. Gebäude und Karte dürfen feiner sein. Siehe [Art-Bibel § Strichregeln](03_ART_UND_ASSET_BIBEL.md#4-zeichenregeln-für-papier).
✍️ Welche Stifte hast du? ______________________

**F4 ❓ Farbe: Malst du von Hand aus, oder kommt Farbe digital?**
🔥 Handkolorierte Scans sind wunderschön, aber schwer freizustellen und farblich konsistent zu halten. Teamfarben (Petrol vs. Rost) müssen außerdem *steuerbar* sein.
🧭 **Default: Tusche schwarz auf Papier, Farbe kommt digital als flache Fläche** aus der Palette (Papier, Tusche, Rost, Petrol). Teamfarbe steckt im **Sockel** unter der Figur und wird per Code erzeugt. Optional (Could): Aquarell-Texturen, einmal gemalt, als Overlay-Textur.
✍️ Deine Antwort: ______________________

**F5 ❓ Willst du Claude Design für sichtbare Spielgrafik nutzen, oder nur für Layouts?**
🔥 Siehe Red Flag 9. Sobald KI-generierte Grafik im Spiel ist, musst du „AI Generated Graphics“ angeben, und das „100 % handgezeichnet“-Argument ist weg.
🧭 **Default: Claude Design nur für Layout-Entwürfe** (HUD, Menüs, itch-Seite, Pressetext). Was davon ins Spiel kommt, wird **von dir gezeichnet oder von Claude Code als schlichte Geometrie gebaut**. Das hältst du in der KI-Offenlegung fest.
✍️ Deine Antwort: ______________________

---

## Teil G – Audio

**G1 ❓ Machst du Musik? Kennst du jemanden, der Musik macht?**
🔥 Musik ist der größte Einzelhebel für „Audio“, und der Teil, den Solo-Devs am häufigsten mit dem erstbesten Gratis-Loop zukleistern.
🧭 **Default:** 2 Tracks (Menü + Kampf-Loop) aus **CC0/CC-BY-Quellen von Menschen gemacht**, korrekt gecreditet. Wenn du jemanden kennst: **bis 15.10. anfragen**.
✍️ Deine Antwort: ______________________

**G2 ❓ Bist du bereit, deine Stimme als Ansager (CONDUCTOR) aufzunehmen, auf Englisch?**
🔥 Der Ansager ist *das* RA2-Gefühl. Mit Roboter-/Funkfilter ist dein Akzent egal, und es wird charmant. Text-to-Speech wäre „AI Generated Sounds“.
🧭 **Default: Ja, ~25 Lines, eine Aufnahme-Session im Oktober** (Skript: [Audio-Spec](04_AUDIO_SPEC.md)).
✍️ Deine Antwort: ______________________

---

## Teil H – Theme

**H1 ❓ Was machst du, wenn das Theme „Cozy“, „Love“ oder „Tiny“ ist, also etwas, das gar nicht zu Krieg passt?**
🔥 Genau das passiert regelmäßig. Frühere Themes: *Throwback, Hybrid, Leaps and Bounds, Moonshot, Bug, Cliché, Scale, Secrets, Waves*. Die meisten waren abstrakt genug, aber nicht alle passen zu „Dominate“.
🧭 **Default:** Das [Theme-Playbook](09_THEME_PLAYBOOK.md) hat für **18 Theme-Kandidaten** fertige Andock-Ideen, und der Theme-Modul-Slot ist im Code vorgesehen. Notfall-Strategie: Das Theme beschreibt **die Natur des Monolithen**, also *wogegen* du kämpfst.
✍️ Deine Antwort: ______________________

**H2 ❓ Bist du bereit, den Titel oder die Geschichte zu ändern, wenn das Theme es verlangt?**
🧭 **Default:** Titel bleibt, **Untertitel und Missionsname** sind theme-variabel (z. B. „Orchestrate & Dominate: *Waves of the Monolith*“).
✍️ Deine Antwort: ______________________

---

## Teil I – Titel & Marke

**I1 ❓ Titel: „ORCHESTRATE & DOMINATE“ okay, oder bestehst du auf „Ki-Agent-Orchestrate-And-Dominate“?**
🧭 **Default:** Spieltitel **ORCHESTRATE & DOMINATE**, Codename **KAOD**, itch-URL `maierzone.itch.io/orchestrate-and-dominate`.
✍️ Deine Antwort: ______________________

**I2 ❓ Unter welchem Namen trittst du auf: „mzone“, „maierzone“, oder ein Studio-Name?**
🔥 Jam-Spiele sind Visitenkarten. Ein konsistenter Name über GitHub, itch.io und das Logo im Spiel baut eine Marke.
🧭 **Default: „mzone“** (itch-Account: maierzone).
✍️ Deine Antwort: ______________________

---

## Teil J – Recht, Lizenz, Ethik

**J1 ❓ Unter welcher Lizenz soll der Code stehen, und unter welcher deine Kunst?**
🔥 Das Repo muss öffentlich sein. Ohne Lizenz darf es niemand nutzen (das ist ok), aber dann ist es auch nicht „Open Source“. Deine handgezeichnete Kunst ist dein Kapital, und das willst du vielleicht nicht frei geben.
🧭 **Default:** Code **MIT**, Kunst/Audio **CC BY-NC-ND 4.0** (ansehen und teilen ja, kommerziell nutzen oder verändern nein). Entscheidung D-10.
✍️ Deine Antwort: ______________________

**J2 ❓ Bist du ok damit, dass der Name „Alarmstufe Rot“ nirgends auftaucht, auch nicht im Pitch?**
🧭 **Default:** Auf der itch-Seite nur *„inspired by the classic real-time strategy games of the early 2000s“*. Im Devlog darfst du sagen, was dich inspiriert hat, aber ohne Logos, Screenshots oder Sounds daraus.
✍️ Deine Antwort: ______________________

---

## Teil K – Publikum & Plattform

**K1 ❓ Wer ist dein Spieler? Ein RTS-Veteran oder ein Jam-Voter, der 40 Spiele in einer Woche bewertet?**
🔥 Der Jam-Voter. Er gibt dir **60 Sekunden**, um zu verstehen, was zu tun ist, und **3–10 Minuten** insgesamt. Wenn er nach 60 Sekunden noch nicht weiß, was zu tun ist, ist er weg.
🧭 **Default:** Design für den Jam-Voter. Die erste Einheit ist nach **≤ 45 s** gebaut, der erste Kampf passiert nach **≤ 2:30 min**, ein Sieg ist in **10–13 min** möglich, und es gibt einen **Schwierigkeitsgrad „Story“**.
✍️ Deine Antwort: ______________________

**K2 ❓ Nur Browser, oder auch ein Download (Windows/Mac/Linux)?**
🔥 Spiele, die im Browser laufen, bekommen in Jams nachweislich mehr Ratings, denn niemand lädt 50 EXE-Dateien von Fremden herunter.
🧭 **Default: Browser-only (HTML5)**, Desktop-Browser, Chrome/Firefox/Edge. Kein Mobile.
✍️ Deine Antwort: ______________________

**K3 ❓ Sprache im Spiel: Englisch, Deutsch oder beides?**
🧭 **Default: Englisch.** Alle Texte liegen von Anfang an in einer String-Tabelle, Deutsch ist ein Could.
✍️ Deine Antwort: ______________________

---

## Teil L – Prozess

**L1 ❓ Wer testet, und wann?**
🔥 Du bist betriebsblind ab Tag 3. Externe Tester finden in 10 Minuten, was du in 10 Tagen nicht siehst.
🧭 **Default:** Playtests am **15.11., 22.11. und 27.11.**, jeweils 3–5 Personen, nach Protokoll (siehe [Zeitplan](06_ZEITPLAN.md)). Tester-Liste bis **15.10.**
✍️ Namen deiner Tester: ______________________

**L2 ❓ Wie entscheidest du, wenn du hängst: Wer hat das letzte Wort?**
🧭 **Default:** Du. Immer. Claude Code macht Vorschläge, gibt Empfehlungen und warnt. Bei Scope-Fragen gilt die **Cut-Liste**, nicht das Bauchgefühl um 1 Uhr nachts.
✍️ Deine Antwort: ______________________

**L3 ❓ Arbeitest du im November täglich, oder in Blöcken am Wochenende?**
🔥 RTS-Entwicklung braucht kontinuierliches Spielen, Fühlen und Anpassen. Wochenend-Blöcke allein führen zu „Montag weiß ich nicht mehr, wo ich war“.
🧭 **Default:** **Täglich 1–2 h (Mo–Fr) + 5–6 h an Sa/So.** Jeden Abend endet die Session mit einem Commit und einer Zeile im Devlog.
✍️ Deine Antwort: ______________________

---

## Teil M – Die letzte, gemeinste Frage

**M1 ❓ Was machst du, wenn am 15.11. klar ist: Das Spiel macht keinen Spaß?**
🔥 Das passiert häufiger, als jemand zugibt. RTS-Spaß entsteht spät, erst wenn Feedback, Tempo und Balance zusammenkommen.
🧭 **Default:** Am **Gate M2 (15.11.)** gibt es einen ehrlichen Fun-Check (5 Fragen, siehe [Zeitplan § Gates](06_ZEITPLAN.md#5-meilenstein-gates)). Bei „nein“ gilt **Plan Z**: Wir reduzieren auf **„Defend the Conductor“**, also Basis verteidigen gegen Monolith-Wellen mit Direktiven, ohne freie Expansion. Das ist ein Tower-Defense-RTS-Hybrid und in 2 Wochen sicher fertig.
✍️ Deine Antwort: ______________________

---

## Teil N – Nachtrag D-16 (4K-Sequenzen)

> D-16 ist bestätigt. Diese Fragen betreffen nur die **Folgen**.

**N1 ❓ Was ist dir wichtiger: das Intro (SQ-INTRO) oder das Theme auf Mechanik-Ebene (F35)?**
🔥 Im Szenario B (~92 h) ist für Should-Features ~15 h Platz. Die Sequenzen brauchen ~12 h, die bisherigen Should-Favoriten ~19 h. **Beides geht nicht.** SQ-INTRO stärkt den ersten Eindruck (Graphics, Audio, Overall), F35 stärkt eine ganze Kategorie (Theme). Details: [Zeitplan § 4a](06_ZEITPLAN.md#4a-kapazitäts-check-d-16-4k-sequenzen).
🧭 **Default:** Reihenfolge wie von dir vorgeschlagen (Ende-Sequenzen → SQ-INTRO → F31 → F35 …). **Ausnahme:** Ist das Theme bei Gate M2 nur schwach umgesetzt, wird F35 vor SQ-INTRO gezogen. Entschieden wird am **So 15.11.**
✍️ Deine Antwort: ______________________

**N2 ❓ Bis wann steht das Leitmotiv, und in welcher Form lieferst du es?**
🔥 Ohne Motiv kann die lokale Session den Synth nicht stimmen, und die Sequenzen klingen nach Platzhalter. Die Stinger MU4/MU5 hängen ebenfalls am Motiv.
🧭 **Default:** **So 25.10.**, zusammen mit Audio-Session 1, als Notation in `audio/leitmotiv.md` (Ton, Dauer, Tempo) oder als Foto einer Notenskizze.
✍️ Deine Antwort: ______________________

**N3 ❓ Passen die Textvorschläge für die Ende-Sequenzen?**
- SQ-DOMINATED: *“The Monolith is broken. The orchestra plays on.”*
- SQ-SINGULARITY: *“Singularity reached. There is only one voice now.”*
- SQ-DISCONNECTED: *“Conductor offline. The orchestra… is silent.”*

🔥 Du nimmst sie in Audio-Session 1 auf (KW 43). Danach ist eine Änderung eine neue Aufnahme.
🧭 **Default:** Die drei Vorschläge gelten, wenn du bis zur Aufnahme nichts änderst.
✍️ Deine Antwort: ______________________

---

## Auswertung

| Anzahl unbeantworteter Fragen am 07.10. | Bedeutung |
|------------------------------------------|-----------|
| 0–5 | Du bist bereit. Die Defaults für die Lücken gelten. |
| 6–15 | Normal. Die Defaults gelten, aber beantworte **B1, B4, F2, F3, G2** unbedingt. Davon hängt die Planung ab. |
| > 15 | Warnsignal: Entweder fehlt Zeit (siehe B1), oder die Idee ist noch nicht deine. Lieber jetzt 2 Abende investieren als im November 2 Wochen verlieren. |

> **Die fünf Fragen, die du auf keinen Fall offen lassen darfst:** **B1** (Stunden), **B4** (Programmiererfahrung/Engine), **F2** (Perspektive), **F3** (Stifte/Strichstärke), **G2** (Ansager-Stimme).
