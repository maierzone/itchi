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
