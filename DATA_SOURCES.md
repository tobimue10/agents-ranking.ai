# Datenquellen-Richtlinie für agents-ranking.ai

## ⚠️ WICHTIG: Kein Vertrauen auf Trainingsdaten

**Regel:** Bei jedem Modell-Update-Cronjob dürfen NUR aktuelle Daten von verifizierten Quellen verwendet werden. Trainingsdaten sind veraltet und unzuverlässig für Versionsnummern.

## Verifizierte Primärquellen

### OpenAI
- **URL:** https://openai.com/models
- **API-Docs:** https://platform.openai.com/docs/models
- **Blog:** https://openai.com/blog
- **Was zu prüfen:** Aktuelle GPT-Versionen, Verfügbarkeit, Preise

### Anthropic
- **URL:** https://www.anthropic.com/claude
- **API-Docs:** https://docs.anthropic.com/en/docs/about-claude/models
- **Was zu prüfen:** Claude-Versionen (Opus, Sonnet, Haiku), Release-Dates

### Moonshot AI (Kimi)
- **URL:** https://www.moonshot.cn/
- **API-Docs:** https://platform.moonshot.cn/docs/intro
- **Was zu prüfen:** Kimi k1.5, k2, etc.

### Google DeepMind
- **URL:** https://deepmind.google/technologies/gemini/
- **API-Docs:** https://ai.google.dev/models
- **Was zu prüfen:** Gemini-Versionen (1.5 Pro, Flash, Ultra)

### Meta AI
- **URL:** https://ai.meta.com/models/
- **Was zu prüfen:** Llama-Versionen (3.1, 3.2, etc.)

### Alibaba Cloud (Qwen)
- **URL:** https://qwenlm.github.io/
- **GitHub:** https://github.com/QwenLM/Qwen
- **Was zu prüfen:** Qwen2, Qwen2.5, etc.

### Mistral AI
- **URL:** https://mistral.ai/models
- **Was zu prüfen:** Mistral Large, Medium, Small, Nemo

### Cohere
- **URL:** https://cohere.com/models
- **Was zu prüfen:** Command R, Command R+

## Benchmark-Quellen

### LMSYS Chatbot Arena
- **URL:** https://chat.lmsys.org/
- **Leaderboard:** https://chat.lmsys.org/?leaderboard
- **Was zu prüfen:** Aktuelle Rankings, ELO-Scores, neue Einträge

### Hugging Face Open LLM Leaderboard
- **URL:** https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard
- **Was zu prüfen:** Benchmark-Scores, neue Modelle

## Check-Prozess für Cronjobs

1. **Vor jedem Update:** Alle oben genannten URLs besuchen
2. **Versionsnummern:** Direkt von der Hersteller-Website kopieren
3. **Release-Dates:** Notieren für "Aktualität"-Tracking
4. **Preise:** Aktuelle API-Preise prüfen
5. **Benchmarks:** LMSYS Arena für aktuelle Rankings

## Dokumentation

- Alle gefundenen Änderungen in CHANGELOG.md notieren
- Screenshots von Hersteller-Websites als Beweis speichern
- Datum des Checks vermerken

## Letzter Check

- **Datum:** 2026-02-25
- **Durchgeführt von:** Kimi Claw (Sub-Agent)
- **Notiz:** Erste Umstellung auf reine Web-Quellen statt Trainingsdaten
