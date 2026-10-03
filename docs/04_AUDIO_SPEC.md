# 04 · Audio-Spec

> Audio ist **1 von 6 Bewertungskategorien**, also ~17 % der Gesamtwertung. Im ursprünglichen Prosa-Text fehlte es komplett (Grill Red Flag 6).
> **Leitbild: Handgemachtes Audio.** Die Grafik ist Tusche auf Papier, also klingt das Spiel nach **Papier, Feder, Stempel und einer menschlichen Stimme**.

---

## 1. Klang-Leitbild

| Ebene | Klangcharakter | Quelle |
|-------|----------------|--------|
| **Ansager (CONDUCTOR)** | Deine Stimme, Englisch, ruhig, präzise, leicht trocken. Mit **Funk-/Röhrenfilter** und einem Hauch Roboter. Genau das versteckt jeden Akzent. | **Aufnahme mzone** |
| **UI & Bauen** | Papier, Stift, **Stempel**, Karteikarten, Lochkarten-Rattern | **Aufnahme mzone** (Handy reicht) |
| **Kampf** | Stilisiert statt realistisch: Feder-Kratzer als Schüsse, Papier-Reißen als Treffer, Zerknüllen als Tod. Für Wucht kommen **CC0-Explosionen** darunter | Aufnahme + CC0 |
| **Monolith** | Tiefes Brummen, Puls, Glas/Kristall, Rückwärts-Hall | CC0 + Bearbeitung |
| **Musik** | Treibend-industriell mit Orchester-Motiv (Streicher-Ostinato, Pauken, Synth-Bass), eine Hommage an den RTS-Sound der 2000er, **ohne** etwas zu kopieren | CC0/CC-BY von Menschen **oder** eigene Komposition |
| **Leitmotiv & Sequenzen** (D-16) | Ein 4–5-Ton-Motiv, industriell und marschartig. In den 4K-Sequenzen spielt es ein kleiner Synth: **verstimmt → sauber** (Intro), **voll** (Sieg), **zerfallend** (Niederlage) | **Komposition mzone**. Der Synth ist Code, also nur das Instrument |

**Kein KI-generierter Ton** (keine TTS-Stimme, keine Musik-Generatoren). So bleibt „Kein KI-Sound“ auf itch.io wahr (Entscheidung D-11).

---

## 2. CONDUCTOR – Ansager-Skript

**Prio M = 16 Lines, S = 16 Lines (davon 6 nur für die Sequenzen, V31–V36), C = 4 Lines.** Jede Line wird **3× aufgenommen**, die beste kommt ins Spiel.

| ID | Auslöser | Line (EN) | Prio | Hinweis zur Betonung |
|----|----------|-----------|:----:|----------------------|
| V01 | Spielstart | *“Orchestrator online.”* | M | ruhig, erwachend |
| V02 | Gebäude fertig (Countdown) | *“Build complete.”* | M | das RA2-Gefühl, sachlich |
| V03 | Einheit fertig | *“Agent ready.”* | M | |
| V04 | Bau gestartet | *“Building.”* | M | kurz |
| V05 | Bau pausiert | *“On hold.”* | S | |
| V06 | Bau abgebrochen | *“Cancelled.”* | S | |
| V07 | Zu wenig Tokens | *“Insufficient tokens.”* | M | leicht genervt |
| V08 | Einheitenlimit | *“Context window full.”* | M | trocken-ironisch |
| V09 | LOW COMPUTE | *“Low compute.”* | S | |
| V10 | Basis wird angegriffen | *“Our base is under attack.”* | M | dringlich |
| V11 | Einheit verloren | *“Agent lost.”* | M | |
| V12 | Gebäude verloren | *“Structure lost.”* | M | |
| V13 | Neue Direktive | *“Prompt acknowledged.”* | M | |
| V14 | Halluzination (max. alle 30 s) | *“Hallucination detected.”* | M | ein Hauch Belustigung |
| V15 | ORCHESTRATED-Squad | *“Squad orchestrated.”* | S | stolz |
| V16 | Monolith STAGE II | *“The Monolith is growing.”* | M | ernst |
| V17 | Monolith STAGE III | *“Warning. The Monolith has reached stage three.”* | M | alarmiert |
| V18 | CONTEXT FLOOD Warnung | *“Warning: context flood detected.”* | S | Sirenenhaft |
| V19 | BROOD NODE zerstört | *“Brood node destroyed.”* | M | |
| V20 | Schild fällt (letzte Node) | *“The Monolith is exposed. Strike now.”* | M | Höhepunkt |
| V21 | SCRAPER liefert ab (max. alle 45 s) | *“Data stolen.”* | S | |
| V22 | Datenfeld leer | *“Data field depleted.”* | S | |
| V23 | TUNING FORK bereit | *“Tuning fork ready.”* | C | |
| V24 | TUNING FORK ausgelöst | *“Alignment in progress.”* | C | |
| V25 | LEGACY SERVER eingenommen | *“Legacy server acquired.”* | C | |
| V26 | Einheit konvertiert | *“Agent converted.”* | C | |
| V27 | Sieg | *“The Monolith has fallen. Well conducted.”* | M | warm, triumphierend |
| V28 | Niederlage (CORE) | *“Connection lost.”* | S | resigniert |
| V29 | Niederlage (Singularität) | *“Singularity reached.”* | S | leise, düster |
| V30 | Onboarding 1–8 | siehe [GDD § 17](02_GAME_DESIGN_SPEC.md#17-onboarding-die-ersten-120-sekunden) (8 Lines) | S | freundlich, erklärend |
| V31 | SQ-INTRO, Satz 1 | *“The world is a map, and the map is on your desk.”* | S | ruhig, wie ein Erzähler über einer Karte |
| V32 | SQ-INTRO, Satz 2 | *“A single model – THE MONOLITH – is consuming every data field it can reach, growing toward singularity.”* | S | dunkler, „THE MONOLITH“ abgesetzt |
| V33 | SQ-INTRO, Satz 3 | *“You are the Conductor. Orchestrate your agents. Dominate the map. Break the Monolith.”* | S | steigernd, vier kurze Schläge wie ein Taktstock |
| V34 | SQ-DOMINATED | *“The Monolith is broken. The orchestra plays on.”* (Vorschlag) | S | warm, getragen |
| V35 | SQ-SINGULARITY | *“Singularity reached. There is only one voice now.”* (Vorschlag) | S | leise, kalt |
| V36 | SQ-DISCONNECTED | *“Conductor offline. The orchestra… is silent.”* (Vorschlag) | S | brüchig, die Pause hörbar |

> **Sequenz-Lines (D-16):** V31–V33 sind die Prämissen-Sätze aus [GDD § 4.1](02_GAME_DESIGN_SPEC.md#41-die-prämisse-3-sätze-mehr-story-gibt-es-nicht). **Jeden Satz einzeln aufnehmen**, damit die Sequenz Bild und Satz synchronisieren kann. V34–V36 sind Textvorschläge: Bestätige oder ändere sie vor der Aufnahme (Grill N3). **V27–V29 bleiben** für die Rückfall-Darstellung (GDD § 14). Läuft eine Sequenz, ersetzen V34–V36 sie. SQ-RADIO nutzt die vorhandenen Lines V15–V20.

> **Theme-Lines:** 2–4 zusätzliche Lines nach dem 01.11. für das Theme-Modul. **Plane eine zweite, kurze Aufnahme-Session am 07./08.11. ein.**

### 2.1 Einheiten-Stimmen (C)

Text-Einzeiler stehen in [GDD § 3](02_GAME_DESIGN_SPEC.md#3-spielerfantasie--ton). Als Audio (Could) bekommt jede Einheit **2 Lines (Auswahl + Befehl)**. Das sind **16 Lines** für 8 Einheiten, jede mit eigener Stimmfärbung (Tonhöhe ±3 Halbtöne). Alternative ohne Aufnahme: **„Gebrabbel“-Chirps** (kurze Silben, z. B. per jsfxr/ChipTone, die Tonhöhe hängt von der Einheit ab). Das ist charmant und schnell gemacht.

---

## 3. SFX-Liste

**Quelle:** **REC** = selbst aufnehmen · **CC0** = gemeinfreie Bibliothek (z. B. freesound.org mit Filter CC0, Kenney Audio Packs) · **SYN** = synthetisiert (jsfxr/ChipTone, lokal)

| ID | Ereignis | Klangidee | Quelle | Prio |
|----|----------|-----------|:------:|:----:|
| S01 | UI Klick | Kugelschreiber-Klick | REC | M |
| S02 | UI Hover | leises Papier-Streifen | REC | S |
| S03 | Auswahl Einheit | Stift-Tick auf Tisch | REC | M |
| S04 | Bewegungsbefehl | kurzes Papier-Wischen | REC | M |
| S05 | Angriffsbefehl | Stempel, kurz und trocken | REC | M |
| S06 | Gebäude platzieren | **Stempel „klonk“** (Holzstempel auf Tisch) | REC | M |
| S07 | Gebäude zeichnet sich ein | Federkratzen, 1 s | REC | M |
| S08 | Verkaufen | Münzen + Papier-Reißen | REC | S |
| S09 | Schuss BURST | schnelles Feder-Kratzen (3 Varianten) | REC | M |
| S10 | Schuss PIERCE | Lochkarten-Stanzen „tschack“ | REC/CC0 | S |
| S11 | Schuss SPLASH / BATCH | Lochkarten-Rattern + dumpfer Aufschlag | REC/CC0 | C |
| S12 | Treffer | Tupfen/Papier-Pop (3 Varianten) | REC | M |
| S13 | Tod Einheit | Papier zerknüllen | REC | M |
| S14 | Gebäude zerstört | Zerreißen + CC0-Explosion darunter | REC+CC0 | M |
| S15 | CRAWLER sammelt (Loop) | Kratzen/Schaben, leise | REC | S |
| S16 | Entladen am TOKENIZER | Münzen in eine Dose | REC | M |
| S17 | Halluzination | „Boing“ + leichtes Pfeifen | SYN | M |
| S18 | ORCHESTRATED | Stimmgabel angeschlagen | REC/CC0 | S |
| S19 | Heilung (CRITIC) | Radiergummi-Wisch, sanft | REC | S |
| S20 | Monolith-Puls (Stufenwechsel) | tiefes Brummen, 1,5 s | CC0 | M |
| S21 | Monolith GAZE-Strahl | Glas-Sirren | CC0 | S |
| S22 | CONTEXT FLOOD Warnung | Alarmton (Loop, 30 s) | SYN/CC0 | S |
| S23 | CONTEXT FLOOD Einschlag | Tintenwelle: Wasser + Bass | CC0 | S |
| S24 | Fog-Reveal (Karte zeichnet sich) | ganz leises Feder-Schraffieren | REC | S |
| S25 | Sieg-Stempel | großer Stempel + Hall | REC | M |
| S26 | Niederlage-Stempel | Stempel + tiefer Ton | REC | M |
| S27 | Konvertierung (INJECTOR) | Spritze „pfft“ + Glissando | REC/SYN | C |
| S28 | TUNING FORK | lange Stimmgabel + Hall-Welle | REC/CC0 | C |
| S29 | Produktion fertig (Sidebar) | Karteikarte einstecken | REC | S |
| S30 | Nicht möglich | dumpfer Holz-Tock | REC | M |

**Prio M = 16 SFX.** Mit einer einzigen **Aufnahme-Session „Schreibtisch“** (1–2 h) deckst du ~70 % ab.

---

## 4. Musik

| ID | Track | Länge | Stimmung | Prio |
|----|-------|-------|----------|:----:|
| **MU0** | **Leitmotiv** (D-16), **komponiert von mzone** | 4–5 Töne, 2–4 Takte | industriell, marschartig. **Keimzelle** von MU2, MU4 und MU5 | **M** (für Sequenzen) |
| MU1 | **Hauptmenü** „The Desk“ | 1:30–2:00 Loop | ruhig, Streicher-Pizzicato + Klavier, Spannung angedeutet | M |
| MU2 | **Kampf** „Orchestrate“ | 2:30–3:30 Loop | treibend, 120–135 BPM, Pauken, Synth-Bass, Streicher-Ostinato | M |
| MU3 | **Kampf-Intensitätsschicht** | wie MU2, Stems | ab STAGE II Percussion-Layer, ab STAGE III Bläser/Chor-Layer einblenden | S |
| MU4 | **Sieg-Stinger** | 5–8 s | Dur-Akkord, Orchester | M |
| MU5 | **Niederlage-Stinger** | 5–8 s | absteigend, tief | M |

**Leitmotiv MU0 (D-16):**
- **mzone komponiert es.** Abzuliefern sind nur Tonhöhen, Notenwerte und Tempo. Notation reicht, z. B. als Datei `audio/leitmotiv.md` in der Form `Ton Dauer · Ton Dauer · … · Tempo` (etwa `E2 Viertel · G2 Achtel · … · 112 BPM`; **nur ein Format-Beispiel, nicht die Melodie**) oder als Foto einer Notenskizze.
- **Ziel-Datum: So 25.10.** (zusammen mit Audio-Session 1), damit die lokale Session das Motiv im Synth der 4K-Vorschauseite (`tools/4k/`) ausprobieren kann.
- **Keimzelle:** MU4 (Sieg-Stinger) = Motiv voll ausgespielt, MU5 (Niederlage-Stinger) = Motiv zerfallend. Damit decken die Sequenzen die Stinger mit ab. MU2 zitiert das Motiv, **wenn** MU2 selbst komponiert wird. Kommt MU2 aus einer CC-BY-Quelle, lebt das Motiv nur in MU4, MU5 und den Sequenzen.
- Der 4K-Synth ist **prozedurale Klangerzeugung im Code**, kein Musik-Generator. Komposition und Klangidee stammen von mzone.

**Beschaffung, Reihenfolge der Präferenz:**
1. **Eigene Komposition** oder ein Bekannter (Grill G1). Anfrage **bis 15.10.**
2. **CC0/CC-BY-Musik von Menschen** (z. B. OpenGameArt, freesound, CC-BY-Bibliotheken bekannter Komponisten). **Lizenz prüfen und in `CREDITS.md` vermerken.**
3. **Nicht:** KI-Musikgeneratoren (Offenlegungspflicht, Community-Risiko), kommerzielle Tracks, Original-RTS-Soundtracks.

---

## 5. Aufnahme-Anleitung (für mzone)

### 5.1 Setup

| Punkt | Empfehlung |
|-------|-----------|
| Gerät | USB-Mikrofon oder **Smartphone** (Sprachmemo in höchster Qualität) |
| Raum | klein, Teppich/Vorhänge; zur Not **unter einer Decke** oder vor dem offenen Kleiderschrank |
| Abstand | 15–20 cm, leicht seitlich (gegen Plopp-Laute) |
| Format | **WAV, 48 kHz, 24 bit** (Handy: höchste Stufe, später konvertieren) |
| Takes | **3 pro Line**, dazwischen 2 s Stille. Pro Datei eine ganze Session, das Schneiden macht das Skript |
| Raumton | am Anfang 10 s Stille aufnehmen (für die Rauschreduzierung) |

### 5.2 Bearbeitungskette Ansager (in Audacity, kostenlos)

1. **Rauschreduzierung** (Profil aus den 10 s Stille)
2. **Hochpass 120 Hz**
3. **Bandpass 300–3400 Hz** (Funk-Charakter), alternativ für „Röhre“: leichte Sättigung
4. **Ringmodulator/Vocoder dezent** (Roboter-Hauch, Mix 15–25 %)
5. **Kompressor** (Ratio 3:1)
6. **Normalisieren auf −16 LUFS**, Spitzen ≤ −1 dBFS
7. Export als **OGG + MP3** (siehe § 6)

> Claude Code kann die Kette als **Skript (ffmpeg/sox)** bauen. Dann bearbeitest du nichts von Hand, und alle Lines klingen identisch.

### 5.3 Schreibtisch-Session (SFX)

Material bereitlegen: Kugelschreiber, Füller, Fineliner, Holzstempel (oder Tacker/Locher), Karteikarten, Papierbögen, Münzen + Blechdose, Radiergummi, Stimmgabel (falls vorhanden). Jedes Geräusch **5–10× aufnehmen** (mit Variationen in Stärke und Tempo). Das Spiel spielt zufällige Varianten mit ±5 % Tonhöhe ab, damit nichts mechanisch klingt.

---

## 6. Technische Vorgaben

| Punkt | Vorgabe |
|-------|---------|
| Formate | **OGG Vorbis** + **MP3** als Fallback (die Engine wählt automatisch) |
| SFX | als **Audio-Sprite** (eine Datei + JSON-Marker), ≤ 1,5 MB |
| Musik | Streams, ≤ 4 MB gesamt (128 kbps), nahtlose Loops (Loop-Punkte prüfen) |
| Lautheit | Stimme −16 LUFS · SFX Spitzen ≤ −3 dBFS · Musik −20 LUFS (Kampf), −22 LUFS (Menü) |
| Mixer | Master / Musik / SFX / Stimme in den Optionen. Musik wird bei Ansager-Lines um 6 dB abgesenkt (Ducking) |
| **Browser-Autoplay** | Audio startet **erst nach der ersten Nutzerinteraktion**. Mit SQ-INTRO ist das der **Uplink-Tastendruck** (oder ein Klick). Ohne Intro übernimmt der Titelbildschirm „CLICK TO CONDUCT“ |
| **Sequenzen** (D-16) | Der Host übergibt `AudioContext` und dekodierte Buffer (Stimme, Musik). Der Synth erzeugt nur das Leitmotiv. Lautheit Synth wie Musik (−20 LUFS). Während SQ-RADIO wird die Spielmusik um 6 dB abgesenkt |
| Gleichzeitigkeit | max. 24 Stimmen. Gleiche SFX max. 4× gleichzeitig (Schuss-Spam vermeiden) |
| Ansager-Warteschlange | Priorität (Angriff > Verlust > Bau), Wiederholsperre je Line 3–30 s |

---

## 7. Credits-Vorlage (`CREDITS.md`, wird im Spiel angezeigt)

```
VOICE OF THE CONDUCTOR ...... mzone
MAIN THEME .................. composed by mzone
CINEMATICS .................. 4096-byte scores conducting hand-drawn ink
SOUND RECORDINGS ............ mzone (a desk, a pen, a stamp)
MUSIC ....................... <Titel> by <Autor> – <Lizenz> – <URL>
ADDITIONAL SFX .............. <Titel> by <Autor> – CC0 – <URL>
FONTS ....................... IBM Plex Mono (SIL OFL 1.1), Spectral (SIL OFL 1.1)
```
