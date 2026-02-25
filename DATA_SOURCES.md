# Datenquellen-Richtlinie für agents-ranking.ai

## ⚠️ WICHTIG: Kein Vertrauen auf Trainingsdaten

**Regel:** Bei jedem Modell-Update-Cronjob dürfen NUR aktuelle Daten von verifizierten Quellen verwendet werden. Trainingsdaten sind veraltet und unzuverlässig für Versionsnummern.

## 🗓️ DATUMS-REGEL (KRITISCH)

**Aktuelles Datum:** 25. Februar 2026

**Archiv-Grenze:** Alle Modelle mit Release-Datum vor **August 2025** sind >6 Monate alt und müssen ins Archiv verschoben werden.

**Cronjob-Prüfung:**
1. **Immer zuerst:** Aktuelles Datum ermitteln (`date` oder API)
2. **6-Monats-Regel anwenden:** `release_date < (heute - 6 Monate)` → archivieren
3. **Keine Ausnahmen:** Auch "beliebte" alte Modelle werden archiviert

## Verifizierte Primärquellen

### OpenAI
- **URL:** https://openai.com/models
- **API-Docs:** https://platform.openai.com/docs/models
- **Blog:** https://openai.com/blog
- **Was zu prüfen:** Aktuelle GPT-Versionen, Verfügbarkeit, Preise

### Anthropic
- **URL:** https://www.anthropic.com/news
- **API-Docs:** https://docs.anthropic.com/en/docs/about-claude/models
- **Was zu prüfen:** Claude-Versionen (Opus, Sonnet, Haiku), Release-Dates

### Google DeepMind
- **URL:** https://deepmind.google/technologies/gemini/
- **API-Docs:** https://ai.google.dev/models
- **Was zu prüfen:** Gemini-Versionen (2.5 Pro, Flash, etc.)

### Weitere Quellen
- **Moonshot AI:** https://www.moonshot.cn/
- **Meta AI:** https://ai.meta.com/models/
- **Alibaba Qwen:** https://qwenlm.github.io/
- **Mistral AI:** https://mistral.ai/models

## Benchmark-Quellen

### LMSYS Chatbot Arena
- **URL:** https://chat.lmsys.org/?leaderboard
- **Was zu prüfen:** Aktuelle Rankings, ELO-Scores

## Check-Prozess für Cronjobs

### Schritt 1: Datum prüfen
```
Heute: 2026-02-25
Archiv-Grenze: 2025-08-25 (6 Monate zurück)
```

### Schritt 2: Hersteller-Websites crawlen
- Alle URLs besuchen
- Release-Daten extrahieren
- Mit Archiv-Grenze vergleichen

### Schritt 3: Modelle kategorisieren
- **Aktiv:** Release >= Archiv-Grenze
- **Archiv:** Release < Archiv-Grenze
- **Neu:** Release in letzten 30 Tagen

### Schritt 4: Top 5 aktualisieren
Nur aktive Modelle berücksichtigen
Sortiert nach: MMLU > Elo > Aktualität

### Schritt 5: Daten aktualisieren
- models-data.ts aktualisieren
- Alte Modelle markieren (is_archived: true)
- Neue Modelle hinzufügen
- Top 5 neu berechnen

## Dokumentation

- Alle Änderungen in CHANGELOG.md notieren
- Datum des Checks vermerken
- Screenshots als Beweis speichern

## Letzter Check

- **Datum:** 2026-02-25
- **Durchgeführt von:** Kimi Claw
- **Ergebnis:** 4 neue Modelle hinzugefügt, 10+ alte Modelle archiviert
