# 08 · Aussichts-Erfolgs-Matrix-Report

> **Frage:** Wie groß sind die Erfolgsaussichten von ORCHESTRATE & DOMINATE beim Game Off 2026, und wovon hängen sie ab?
> **Methode:** Basisraten aus Game Off 2024/2025 (öffentliche Zahlen) + Musteranalyse der Top 10 2025 + Bewertung des Konzepts gegen die 6 Kategorien + Szenario-Modell (Scope × Ausführung).
> ⚠️ **Alle Wahrscheinlichkeiten sind Experten-Schätzungen, keine Statistik.** Sie sollen Entscheidungen vergleichbar machen, nicht die Zukunft vorhersagen.

---

## 1. Executive Summary

| | |
|---|---|
| **Urteil** | **Die Idee ist stark, der ursprüngliche Anspruch („RA2-artig“) ist das größte Risiko.** Mit einem verdichteten Micro-RTS und hohem Polish-Anteil ist eine Platzierung in den **Top 25 %** realistisch, die **Top 100** sind gut erreichbar und die **Top 10** möglich, aber nicht planbar. |
| **Die 3 größten Hebel** | (1) **Die ersten 60 Sekunden** (Onboarding, klares Ziel) · (2) **Visuelle Identität** (Handzeichnung + „Karte zeichnet sich“) · (3) **Rating-Anzahl** (aktiv bewerten, starke itch-Seite) |
| **Die 3 größten Risiken** | (1) Scope-Explosion · (2) RTS-Lernkurve für Jam-Voter · (3) Wegfindung/Technik in Woche 1 |
| **Empfohlenes Szenario** | **B: Tier 0 + ausgewählte Should-Features + volle Polish-Woche** (~92 h) |
| **Prognose Szenario B** | Abgabe spielbar **~85 %** · Top 25 % **~50 %** · Top 100 **~30 %** · Top 25 **~8 %** · Top 10 **~3 %** |

---

## 2. Ausgangslage & Basisraten

| Kennzahl | Wert | Status |
|----------|------|--------|
| Einreichungen 2024 | „über 500“ | verifiziert (GitHub Blog) |
| Einreichungen 2025 | „mehr als 700“ | verifiziert (GitHub Blog) |
| Einreichungen 2026 | **~750–900** | Schätzung (Trend) |
| Teilnehmende „joined“ am 03.10.2026 | 326 | verifiziert (Jam-Seite), steigt bis November stark |
| Bewertung | Community-Voting der Teilnehmenden, 6 Kategorien | verifiziert |
| Top 10 = | ~1,2 % der Einreichungen | abgeleitet |
| Top 100 = | ~12 % | abgeleitet |

**Annahmen über das Feld (Erfahrungswerte aus Community-Jams, für Game Off nicht verifiziert):** Ein erheblicher Teil der Einreichungen ist unfertig, sehr kurz oder nur als Download verfügbar. **Ein vollständiges, verständliches, browser-spielbares Spiel mit eigenem Stil landet deshalb oft schon in der oberen Hälfte.** Für die Spitze zählen Polish, ein starker erster Eindruck und genügend Ratings.

---

## 3. Musteranalyse: Was hatten die Top 10 von 2025 gemeinsam?

| Erfolgsmuster der Top 10 2025 | Häufigkeit | Unser Konzept | Bewertung |
|-------------------------------|:----------:|---------------|:---------:|
| **Kernmechanik in einem Satz** („Wasserstand ist das Leveldesign“) | 10/10 | „Gib Agenten Prompts. Ohne Critic halluzinieren sie.“ | ✅ |
| **Starke Atmosphäre / eigener Stil** | ~9/10 | Tusche auf Papier, die Karte zeichnet sich | ✅✅ |
| **Kurze, abgeschlossene Erfahrung** | ~10/10 | 10–15 min pro Partie | ✅ |
| **Theme tief in der Mechanik** | ~8/10 | unbekannt, Theme-Slot vorbereitet | ⚠️ |
| **Niedrige Einstiegshürde** (Puzzle, Platformer, Arcade) | ~8/10 | **RTS = hohe Hürde** | ❌ → Onboarding, STORY |
| **Genre RTS** | **0/10** | RTS | ⚠️ Risiko *und* Alleinstellung |
| **Strategie-Hybrid** | 2/10 (Platz 4, 6) | Micro-RTS + Orchestrierung | ✅ |
| **Solo-Projekt** | 3/10 | Solo + Claude Code | ✅ möglich |
| **Engine** | Godot 6, Unity 4 | Phaser (Vorschlag) | neutral, Engine ist kein Wertungsfaktor |

**Fazit:** Das Konzept trifft 5 von 7 inhaltlichen Erfolgsmustern. Die beiden Lücken (**Einstiegshürde** und **Theme**) sind bekannt und haben eigene Gegenmaßnahmen (Onboarding/STORY und Theme-Playbook).

---

## 4. Kategorie-Prognose (Szenario B)

Erwarteter Durchschnitt der Community-Sterne (1–5) bei guter Umsetzung, mit Spanne:

| Kategorie | Erwartung | Spanne | Begründung | Größter Hebel |
|-----------|:---------:|:------:|------------|---------------|
| **Overall** | 3,9 | 3,6–4,1 | vollständig, eigenständig, aber RTS-Hürde | Polish + erste 60 s |
| **Gameplay** | 3,7 | 3,4–3,9 | Orchestrierung ist frisch. RTS braucht Einarbeitung, Balancing ist kurz | NORMAL leicht genug, klare Direktiven |
| **Graphics** | **4,2** | 3,9–4,4 | handgezeichnet, konsistente Palette, Signatur-Effekt Fog | Stil-Gate 11.10., F31 + F32 |
| **Audio** | 3,6 | 3,2–3,9 | eigener Ansager + Papier-SFX = charmant. Musik ist die Unbekannte | Musik-Qualität, Ansager-Timing |
| **Innovation** | **4,1** | 3,8–4,3 | Prompts statt Klicks, Halluzination, Karte zeichnet sich | Innovation in den ersten 2 min erlebbar machen |
| **Theme** | 3,5 | 2,8–4,2 | völlig offen bis 01.11. | Theme auf Ebene 3 (Mechanik) |

> Ohne Gewähr. Top-10-Spiele in Community-Jams liegen typischerweise bei **Ø ≥ 4,2–4,4 Overall** (Erfahrungswert, für Game Off nicht verifiziert).

---

## 5. Die Aussichts-Erfolgs-Matrix

**Zeilen:** Wie viel wird gebaut (Scope). **Spalten:** Wie gut wird es umgesetzt (Ausführung). **Zellen:** erwartetes Platzierungsband **Overall**.

| Scope ↓ / Ausführung → | 🔴 **holprig**<br/>Bugs, kein Onboarding, wenig Audio | 🟡 **solide**<br/>fertig, verständlich, ohne Abstürze | 🟢 **poliert**<br/>Juice, Audio, Onboarding, starkes Theme |
|------------------------|:----------:|:---------:|:----------:|
| **„RA2-komplett“** (ungebremst) | ❌ nicht abgegeben / untere Hälfte | obere Hälfte | (in 30 Tagen nicht erreichbar) |
| **Tier 2** (alles, ~160 h) | untere Hälfte | Top 25–50 % | Top 10–15 % |
| **Tier 1** (Must + Should, ~120 h) | obere Hälfte | Top 25 % | **Top 5–10 %** |
| **Szenario B: Tier 0 + Should-Favoriten** (~92 h) | obere Hälfte | Top 25 % | **Top 5–10 %** ⭐ *Sweet Spot* |
| **Tier 0** (nur Must, ~76 h) | obere Hälfte | Top 25–35 % | Top 10–15 % |
| **Plan Z** („Defend the Conductor“, ~45 h) | obere Hälfte | Top 25–35 % | Top 15 % |

**Lesart:** Ab Tier 0 bestimmt **die Ausführung, nicht der Umfang**, die Platzierung. Szenario B ist der Sweet Spot: genug Inhalt für Innovation und Graphics, genug Zeit (Woche 4) für Polish. **Mehr Scope ohne mehr Zeit verschiebt Projekte nach links**, also in die holprige Spalte.

---

## 6. Wahrscheinlichkeiten je Szenario

Gesamtwahrscheinlichkeit, **einschließlich** des Risikos, nicht oder unfertig abzugeben (geschätzt, ~800 Einreichungen):

| Szenario | Abgabe spielbar | Top 50 % | Top 25 % | Top 100 | Top 25 | Top 10 |
|----------|:---------------:|:--------:|:--------:|:-------:|:------:|:------:|
| „RA2-komplett“ (ungebremst) | 30 % | 20 % | 10 % | 6 % | 1 % | < 0,5 % |
| Plan Z | **95 %** | 70 % | 35 % | 18 % | 3 % | 1 % |
| Tier 0 (nur Must) | 85 % | 70 % | 40 % | 22 % | 5 % | 1,5 % |
| **B: Tier 0 + Should-Favoriten + Polish + Community** ⭐ | **85 %** | **75 %** | **50 %** | **30 %** | **8 %** | **3 %** |
| C: Tier 1 + Could (bei ~145 h) | 75 % | 70 % | 48 % | 30 % | 9 % | 3–4 % |

**Was die Zahlen sagen:**
1. **Der größte Sprung** liegt zwischen „RA2-komplett“ und jedem disziplinierten Szenario: Die Abgabewahrscheinlichkeit verdreifacht sich fast.
2. **Ab Szenario B bringt mehr Scope kaum noch etwas** für die Spitze. Polish und Community-Arbeit bringen mehr.
3. **Top 10 bleibt ein Bonus.** Dafür braucht es zusätzlich ein Theme, das *perfekt* passt, viele Ratings und etwas Glück.

---

## 7. Erfolgshebel (nach Wirkung pro Aufwand)

| Rang | Hebel | Aufwand | Wirkung | Kategorie | Wo geregelt |
|:----:|-------|:-------:|:-------:|-----------|-------------|
| 1 | **Die ersten 60 Sekunden** (klares Ziel, Pfeil, CONDUCTOR) | mittel | ⬆⬆⬆ | Overall, Gameplay | GDD § 17 |
| 2 | **NORMAL leicht genug** (Erstspieler gewinnt knapp) | gering | ⬆⬆⬆ | Overall, Gameplay | GDD § 14, Playtests |
| 3 | **Stil-Gate & Strichregeln** | mittel (Okt.) | ⬆⬆⬆ | Graphics, Overall | Art-Bibel § 4, § 10 |
| 4 | **Rating-Anzahl** (≥ 50 Spiele bewerten, kommentieren) | mittel (Dez.) | ⬆⬆ | alle (Sichtbarkeit) | Zeitplan § 8 |
| 5 | **„Die Karte zeichnet sich“** (F31) | gering | ⬆⬆ | Graphics, Innovation | GDD § 18 |
| 6 | **Ansager mit deiner Stimme** | gering | ⬆⬆ | Audio, Overall | Audio-Spec § 2 |
| 7 | **Theme auf Mechanik-Ebene** (F35) | mittel | ⬆⬆ | Theme | Theme-Playbook |
| 8 | **itch-Seite: GIF ganz oben, 3-Satz-Pitch, Steuerung** | gering | ⬆⬆ | Klickrate → Ratings | Abgabe-Checkliste |
| 9 | **Keine Abstürze, ≥ 55 FPS** | mittel | ⬆⬆ | Overall | Tech-Spec § 6, § 8 |
| 10 | **Meta-Story** („mit KI-Agenten gebaut, von Hand gezeichnet“) im Devlog | gering | ⬆ | Innovation, Sichtbarkeit | Zeitplan § 8 |

---

## 8. Fehlerbilder (so scheitern Jam-RTS typischerweise)

| Fehlerbild | Symptom bei Votern | Frühwarnsignal bei uns | Gegenmittel |
|------------|--------------------|------------------------|-------------|
| **„Ich weiß nicht, was ich tun soll“** | Abbruch nach 1 min, Rating 2 | Playtester fragt „Und jetzt?“ | Onboarding-Pfeile, eine Bedrohung (Balken), ein Ziel |
| **„Einheiten bleiben hängen“** | Frust, „buggy“-Kommentare | Feststecken in Playtest 1 | Wegfindung zuerst, Stresstest |
| **„Zu schwer“** | Niederlage nach 8 min, Rating 3 | Erstspieler-Siegquote < 50 % | STORY, NORMAL-Tuning |
| **„Zu lang“** | Voter hört mittendrin auf | Partie > 15 min | Monolith-Wachstum, kürzere Ziele |
| **„Sieht generiert aus“** | „AI slop“-Kommentare | – | Handmade-Versprechen, sichtbare Handschrift |
| **„Theme? Wo?“** | Theme-Note 2 | Theme nur im Titel | Ebene 2+3 |
| **„Läuft nicht“** | 0 Ratings | Probe-Upload scheitert | Release-Probelauf 15.11. |
| **„Stumm“** | Audio-Note 2 | Audio erst am 28.11. | Audio-System am 18.11., Aufnahmen im Oktober |

---

## 9. KPIs & Messplan

| Phase | KPI | Ziel | Messung |
|-------|-----|------|---------|
| Pre-Production | Must-Zeichnungen gescannt bis 31.10. | ≥ 50 von 55 | Register-Status |
| Pre-Production | Playtester rekrutiert | ≥ 5 | Liste |
| Pre-Production | Audio-Session 1 | erledigt bis 25.10. | Dateien in `audio/raw/` |
| Jam | Zeit bis zum ersten eigenen Gebäude (Median Tester) | ≤ 45 s | Playtest-Protokoll |
| Jam | Erster Kampf | ≤ 2:30 min | Playtest-Protokoll |
| Jam | Ziel ohne Erklärung verstanden | ≥ 80 % der Tester in < 2 min | Frage 1 |
| Jam | „Prompt“ korrekt erklärt | ≥ 60 % der Tester | Frage 4 |
| Jam | Erstspieler-Siegquote NORMAL | 50–70 % | Playtest 3 |
| Jam | Tester-Overall (Jam-Simulation) | ≥ 3,8 | Playtest 3 |
| Jam | FPS / Download | ≥ 55 / ≤ 15 MB | Debug-Overlay / CI |
| Jam | Abstürze in Playtest 3 | 0 | Protokoll |
| Voting | Ratings erhalten | ≥ 40 bis 15.12., ≥ 60 bis 01.01. | itch.io |
| Voting | selbst bewertete Spiele | ≥ 50 | itch.io |
| Voting | unbeantwortete Kommentare | 0 | itch.io |
| Ergebnis | Erfolgsstufe | 🥈 Silber (Top 25 %, ≥ 40 Ratings) | Ergebnisliste |

---

## 10. Empfehlung

1. **Szenario B festlegen** und die Cut-Liste als Vertrag mit dir selbst behandeln.
2. **Im Oktober alles erledigen, was nicht vom Theme abhängt:** Zeichnungen, Karte, Audio, Pipeline, Mockups, Tester.
3. **Wegfindung in Woche 1** als größtes technisches Risiko zuerst angehen.
4. **Woche 4 gehört dem Polish.** Keine neuen Features nach dem 22.11.
5. **Im Dezember genauso arbeiten wie im November**, nur an Ratings statt an Code.

> **Ehrlicher Schlusssatz:** Die Wahrscheinlichkeit, dass du am 30.11. ein Spiel abgibst, auf das du stolz bist, liegt mit diesem Plan bei **~85 %**. Ohne diesen Plan, mit „RA2, aber mit KI“, liegt sie bei **~30 %**. Der Unterschied besteht ausschließlich aus Disziplin.
