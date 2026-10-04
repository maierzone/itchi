# Notizen · Cyborg-Strike (Stand der Entscheidungen)

Repo: maierzone/itchi (Art-Bibel docs/03, Asset-Register, Theme-Playbook "Hybrid"). D-11: Grafik soll handgezeichnet sein -> diese Figuren sind KI-Entwurf (Experiment).

Antworten des Users:
- Figuren: CRAWLER (U01), CRITIC (U04), EXECUTOR (U02) aus der Skizze IMG_1672
- Cyborg: alle drei = Maschine mit menschlichen Zügen (Auge, Mund, Ohr, Hand), Menschenteile zeichnerisch echt (Augapfel mit Lid, Zähne)
- Übergang Mensch/Maschine: Stichnähte (Kreuzstiche)
- Treue zur Skizze: "nur als Idee" (frei entwickelt)
- Farbe: nur Tusche #221d17 + Papier #efe8d6 (keine Akzente)
- Ausdruck: CRAWLER gierig, CRITIC pedantisch, EXECUTOR ausführungsfreudig
- Detail: ein SVG, #base (Spielform) + #detail (abschaltbar: Nähte, Nieten, Kabel)

Technik:
- tools/art/ink_gen.js (Tusche-Engine) + tools/art/ink_figuren.js (Figuren). Seed A/B = Line-Boil.
- Ausgabe: art/svg/<ID>_<name>_a|b.svg (voll) und art/svg/spielform/ (nur #base)
- Skizzen-Crops: art/skizzen/
- Review-Seite: "Cyborg Figuren.dc.html" (Schrift IBM Plex Mono + Spectral, Palette aus der Art-Bibel)

Zweite Lieferung (04.10., aus dem Asset-Register abgeleitet, ohne neue Skizzen):
- Neu: U03 SCOUT, U05 PLANNER, U06 TRANSFORMER, U07 INJECTOR, U08 BATCH, E01 SHARD, E02 SCRAPER, E03 BRUTEFORCE, E04 SPAMMER (v1-v3), N04 WRACK klein, N04b WRACK gross
- Regel: ORCHESTRA = Kreuzstich-Naht, MONOLITH = Klammern, schwarz gefuellt, Schlitz-Auge + Menschenauge
- tools/art/ink_figuren2.js (neue Bausteine, Auto-Skalierung auf 300 Einheiten), Marken fuer die Review-Seite per B.mark()
- Offen: Trojanisches Pferd aus der Skizze steht nicht im Register
