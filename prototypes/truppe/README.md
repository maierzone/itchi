# Truppen-Prototyp (Wegwerf)

> **Nicht Teil der Abgabe.** Entstanden am 04.10.2026 auf Wunsch von mzone ([D-14, Ergänzung](../../docs/10_ENTSCHEIDUNGSLOG.md#d-14--repository)).
> Kein Code von hier wandert nach `game/`. Der Spielcode entsteht ab 01.11. neu (Phaser, D-01).

Die drei Hybrid-Figuren aus [`art/sonnet/`](../../art/sonnet/) ([D-17](../../docs/10_ENTSCHEIDUNGSLOG.md#d-17--hybrid-grafik)) als steuerbare Truppe,
im Gefühl von Alarmstufe Rot 2: **U01 CRAWLER** sammelt DATA, **U02 EXECUTOR** kämpft, **U04 CRITIC** heilt.
Ziel der Partie: die **BROOD NODE** oben rechts zerstören, bevor die Monolith-Wellen TOKENIZER und AGENT FORGE schleifen.

## Starten

`index.html` im Browser öffnen (Doppelklick reicht, kein Server, kein Build). Die Seite lädt die Spielform-SVGs aus
`../../art/sonnet/art/svg/spielform/`. Für eine Kopie außerhalb des Repos den Pfad in `<body data-art="…">` anpassen.

Rauchtest (headless, legt Screenshots nach `shots/`):

```bash
node prototypes/truppe/smoke.mjs
```

## Steuerung

| Eingabe | Wirkung |
|---------|---------|
| Linksklick / Rahmen ziehen | auswählen · **Shift** = hinzufügen · **Doppelklick** = alle dieses Typs im Bild |
| Rechtsklick | bewegen in Formation · auf Gegner = angreifen · CRAWLER auf DATA = sammeln |
| A, dann Linksklick | Angriffsbewegung |
| S | Stopp |
| **Shift + 1–5** (Strg + 1–5, wo der Browser es durchlässt) | Squad aus der Auswahl bilden |
| 1–5 · zweimal | Squad wählen · Kamera hin |
| Q / W / E | Prompt ans gewählte Squad: EXPLORE / HOLD / HUNT ANY · **Backspace** löscht ihn |
| Pfeiltasten / Bildschirmrand / mittlere Maustaste ziehen | Kamera |
| Mausrad | Zoom 0,6 / 1,0 / 1,5 |
| Sidebar-Icon (Rechtsklick = abbrechen) | EXECUTOR, CRITIC, CRAWLER bauen |
| H · P · Esc | Hilfe · Pause · Auswahl/Modus aufheben |

## Was drin ist

| Aus der Spec | Umsetzung hier |
|--------------|----------------|
| Figuren als Spielsteine, nur gespiegelt (D-02) | SVG Frame A/B, Spiegelung nach Laufrichtung, Fußpunkt auf dem Sockel |
| Teamfarbe nur im Sockel (D-13) | Kreis Petrol = ORCHESTRA, Sechseck Rost = MONOLITH |
| Line-Boil (GDD § 19) | Frame A/B mit 7 fps, Phase je Einheit versetzt |
| Handkreis bei Auswahl (GDD § 19) | wackelige Tusche-Ellipse, zeichnet sich in 150 ms ein |
| Werte (GDD § 6.2, § 8, § 10.3–10.4) | HP, Tempo, Sicht, Reichweite, Schaden, Heilung 4 HP/s in R 3, CRAWLER 100 DATA / 10 s / 3 s entladen, BROOD NODE 1200 HP, alle 20 s ein SHARD |
| Fog (GDD § 18, Tier 0) | leeres Papier · Bleistift (erforscht) · volle Tusche (sichtbar), weiche Kanten |
| Squads, Prompts, FLOW (GDD § 7.1–7.3) | Squad-Karten unten, EXPLORE / HOLD / HUNT ANY, nach 5 s ohne direkten Befehl FLOW (+20 % Feuerrate, +10 % Tempo), nach 3 s Leerlauf nimmt das Squad den Prompt wieder auf |
| REVIEW-LOOP (GDD § 7.5) | CRITIC im Squad zieht feine Pipeline-Linien zu den Mitgliedern |
| Feedback (GDD § 19) | Tusche-Pfeil beim Bewegen, Rost-X beim Angriff, Tusche-Strich als Schuss, Spritzer, Klecks beim Tod, Sprechblasen mit den Einzeilern aus GDD § 3 |

**Platzhalter aus Code** (sind keine Assets): TOKENIZER, AGENT FORGE, DATA FIELD, SHARD, BROOD NODE, Papiertextur.
**Fehlt bewusst:** Wegfindung um Hindernisse (keine Hindernisse), Halluzinationen, PLANNER-Bedingungen, Bauplatzierung, Compute/Context, Monolith-Wachstum, Audio.

## Befunde für die Spec (Stand 04.10.2026)

1. **Strg + 1–5 funktioniert im Browser nicht verlässlich.** Chrome und Firefox schalten damit die Tabs um, die Seite bekommt die Taste oft gar nicht.
   GDD § 16 / § 7.1 sehen Strg + 1…5 vor. Vorschlag: **Shift + 1…5** als Hauptbelegung, Strg nur zusätzlich.
2. **Tastenkonflikt in GDD § 16:** Kamera auf **WASD**, gleichzeitig **A** = Angriffsbewegung, **S** = Stopp, **W** = HOLD.
   Hier gilt: Kamera nur Pfeile, Rand und mittlere Maustaste, die Buchstaben sind Befehle.
3. **Figurengröße:** Bei Zoom 1,0 (64 px pro Kachel) sind die Figuren 43–58 px hoch und gut lesbar, `#detail` wäre dort nur Rauschen. Die Spielform ohne `#detail` trägt.
   Bei 0,6 bleiben Silhouette und Sockel lesbar, Gesichter nicht mehr.
4. **Breite Figuren:** CRITIC und CRAWLER sind breiter als hoch. Der Sockel (Ellipse) muss sich nach der Breite richten, nicht nach der Höhe.
5. **Fußpunkt:** Die SVGs haben keinen ausgezeichneten Fußpunkt. Der Prototyp nutzt Werte je Figur (`ax`/`ay` in `truppe.js`).
   Für die Pipeline wäre ein Fußpunkt-Marker im SVG (z. B. `<g id="foot" transform="translate(x,y)"/>`) oder eine Spalte im Asset-Register sauberer.
