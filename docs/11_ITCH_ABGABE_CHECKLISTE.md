# 11 · itch.io-Abgabe-Checkliste

> Von der Anmeldung bis zum Klick auf „Submit“. **Abhaken direkt in dieser Datei.**
> Zur Erinnerung: **`itch.io/jam/game-off-2026`** = der Wettbewerb (Einschreibung). **`itch.io/game/new`** = das Formular für deine Spielseite. Du brauchst beides.

---

## A · Vorbereitung (KW 44, bis Sa 31.10.)

- [ ] itch.io-Konto **maierzone** vorhanden, Profil ausgefüllt (Avatar, Link zu GitHub)
- [ ] Auf **https://itch.io/jam/game-off-2026** auf **„Join jam“** geklickt (mit GitHub-Login möglich)
- [ ] Über **https://itch.io/game/new** einen **Entwurf** anlegen:
  - [ ] Title: **ORCHESTRATE & DOMINATE**
  - [ ] Project URL: `orchestrate-and-dominate`
  - [ ] Short description: *Orchestrate a swarm of AI agents on a hand-inked war map. Prompts, not clicks.*
  - [ ] Classification: **Games**
  - [ ] Kind of project: **HTML**
  - [ ] Release status: *In development* (am 30.11. → *Released*)
  - [ ] Pricing: **No payments** (kostenlos)
  - [ ] Visibility: **Draft** (Tester-Phase: *Restricted* mit geheimem Link)
- [ ] **butler** installiert und eingeloggt. API-Key als GitHub-Secret `BUTLER_API_KEY` im Repo `maierzone/itchi` hinterlegt
- [ ] Discord/itch-Forum des Jams angesehen (Fragen, Ankündigungen)

## B · Release-Probelauf (So 15.11. – Gate M2)

- [ ] `npm run build` → `dist/` als ZIP, `index.html` **im Wurzelverzeichnis** des ZIPs
- [ ] Upload auf den **Entwurf**: Haken bei *„This file will be played in the browser“*
- [ ] **Embed options:**
  - [ ] Viewport: **1280 × 720** (manuell gesetzt)
  - [ ] **Fullscreen button**: an
  - [ ] Mobile friendly: aus
  - [ ] Automatically start on page load: **aus** (Klick zum Starten, gut für den Audio-Start)
  - [ ] Enable scrollbars: aus
  - [ ] SharedArrayBuffer support: **aus** (wird nicht gebraucht)
- [ ] Im **Inkognito-Fenster** mit dem geheimen Link testen: lädt? Ton nach Klick? Fullscreen? Keine Konsolenfehler?
- [ ] Ergebnis in `playtest/LOG.md` notieren

## C · Seite fertig machen (Sa 28.11.)

**Medien**
- [ ] **Cover-Bild 630 × 500 px** (MK01), wirkt auch verkleinert auf 315 × 250
- [ ] **5 Screenshots** (MK03): Basisbau · Squad mit Prompt · Halluzination · Monolith STAGE III · Sieg-Stempel
- [ ] **GIF** (MK04, 5–8 s, ≤ 3 MB) **ganz oben** in die Beschreibung
- [ ] Seiten-Design: Hintergrund Papiertextur (MK05), Farben aus der Palette, Banner (MK02)

**Metadaten**
- [ ] Genre: **Strategy**
- [ ] Tags (max. 10): `real-time-strategy`, `rts`, `strategy`, `hand-drawn`, `base-building`, `artificial-intelligence`, `singleplayer`, `short`, `game-off`, `ink`
- [ ] Inputs: Keyboard, Mouse · Accessibility: *Pause anytime*, *Adjustable difficulty*, *Subtitles* (Ansager als Text)
- [ ] Average session: *About 15 minutes*
- [ ] **KI-Offenlegung** (Entscheidung D-11): **Code KI-unterstützt** · **Grafik: keine generative KI** · **Sound: keine generative KI** · Texte: nach Stand ausfüllen
- [ ] Links: GitHub-Repo `https://github.com/maierzone/itchi`

**Beschreibungstext** (Vorlage unten, § F)
- [ ] Pitch, Steuerung, Theme-Bezug, Credits, Repo-Link, Handmade-Hinweis
- [ ] Rechtschreibung geprüft (EN)
- [ ] Keine Nennung von EA-Marken außer „inspired by classic early-2000s RTS“

## D · Release Candidate (So 29.11. – Gate M4)

- [ ] Version **v1.0.0** im Titelbildschirm sichtbar
- [ ] **Dev-Cheats und Debug-Overlay im Release-Build deaktiviert**
- [ ] Download-Größe ≤ 15 MB (CI-Bericht)
- [ ] Getestet in **Chrome** und **Firefox** (Inkognito), dazu Edge, Safari falls verfügbar
- [ ] Getestet bei **1366 × 768** (kleiner Laptop) und **2560 × 1440** (HiDPI)
- [ ] Ganze Partie auf STORY und NORMAL gespielt: Sieg und Niederlage funktionieren
- [ ] Credits-Bildschirm vollständig (`CREDITS.md`), Lizenzen im Repo (`LICENSE`, `art/LICENSE`, `audio/LICENSE`, Font-OFL)
- [ ] **README im Repo:** Was ist das Spiel, wie baut man es, was entstand vor/während des Jams, Lizenzen, KI-Offenlegung
- [ ] Letzter Commit gepusht, **Tag `v1.0.0`**, butler-Upload über CI erfolgreich

## E · Abgabe (Mo 30.11., bis 22:00 MEZ)

- [ ] Spielseite: Release status **Released**, Visibility **Public**
- [ ] Auf der **Jam-Seite** → **„Submit your project“** → Projekt auswählen → Fragen beantworten → **Submit**
- [ ] **Bestätigung prüfen:** Das Spiel erscheint in der Einreichungsliste des Jams
- [ ] Screenshot der Bestätigung in `playtest/` ablegen
- [ ] Jam-Seite im Inkognito-Fenster öffnen → Spiel anklicken → startet es?
- [ ] **Danach nichts mehr anfassen.** Harte Deadline: **Di 01.12., 22:37 MEZ (13:37 PST)**

## F · Vorlage: itch-Seitentext (EN)

```markdown
![gameplay](gif)

**Prompts, not clicks.**
A single model – THE MONOLITH – is consuming every data field it can reach.
You are the Conductor. Orchestrate a swarm of specialized AI agents,
give them prompts, and break the Monolith before it reaches singularity.

### How to play
- **Left click / drag** – select · **Right click** – move / attack
- **Ctrl+1–5** – form a squad · **Q/W/E/R** – give a prompt: EXPLORE / HOLD / HUNT / ASSAULT
- Agents under a prompt work on their own and get faster (FLOW) …
  … but without a **CRITIC** in the squad, they **hallucinate**.
- Hunt the **SCRAPERS** – every delivery makes the Monolith stronger.
- Destroy the three **BROOD NODES** to break its shield. Then strike.

### Made for GitHub Game Off 2026 – theme: <THEME>
<1–2 sentences on how the theme is interpreted>

### Hand-inked
Every line you see was drawn by hand on paper by mzone – scanned and vectorized, no image generators.
The voice of the Conductor and most sound effects were recorded at a desk with a pen, a stamp and a microphone.
The code was written together with AI agents (Claude Code) – a game about orchestrating agents, built by orchestrating agents.

### Credits
<aus CREDITS.md>

Source code: https://github.com/maierzone/itchi
Inspired by the classic real-time strategy games of the early 2000s.
```

## G · Nach der Abgabe (Dezember)

- [ ] Devlog-Post „Making of“ (MZP-Figuren: Skizze → Spiel)
- [ ] Täglich ≥ 5 Spiele bewerten und kommentieren (bis ≥ 50)
- [ ] Jeden Kommentar unter dem eigenen Spiel beantworten
- [ ] Updates **nur**, wenn die Jam-Regeln es während des Votings erlauben. Sonst eine Post-Jam-Version als separaten Upload, klar gekennzeichnet
