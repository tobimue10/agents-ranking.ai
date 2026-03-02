# Changelog - Agents Ranking

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

## [2026-03-01] - SEO-Optimierung Tag 2 & Backlink-Recherche

### SEO-Optimierungen
- **Keywords erweitert**: Von 22 auf 40+ Begriffe
  - Neue Keywords: AI Modelle Vergleich, LLM Ranking 2025, ChatGPT Alternative 2025
  - Neue Modelle: Claude 3.7 Sonnet, Gemini 2.0 Flash, Mistral Large, Qwen 2.5
  - Enterprise-Fokus: KI für Unternehmen, Enterprise LLM Vergleich
  - Tool-Vergleiche: KI Tools Vergleich, AI Agent Vergleich, LLM Preise
- **Schema.org FAQ erweitert**: 2 neue FAQ-Einträge (6 statt 4)
- **Interne Verlinkung verbessert**: Neue Vergleichs-Links in Footer und Models-Page

### Backlink-Recherche
- **Product Hunt (DR 91)**: Als neue Top-Priorität identifiziert
- **Hacker News (DR 94)**: Show HN Post geplant
- **Reddit r/LocalLLaMA (DR 91)**: Community-Engagement geplant

### Code-Qualitäts-Verbesserungen
- **TypeScript**: Zentrale Typendefinitionen in `src/types/model.ts`
- **Daten-Layer**: Refactored in `src/app/models/data.ts`
- **ESLint**: Erweiterte Regeln für bessere Code-Qualität
- **Security**: Headers in `next.config.mjs` hinzugefügt

---

## [2026-02-27] - SEO-Optimierung (Content Update 13 Uhr)

### Hinzugefügt
- **FAQ Schema.org Markup** für Rich Snippets in Google
  - 4 häufige Fragen mit strukturierten Antworten
  - Verbesserte Chance auf Featured Snippets
  - JSON-LD Format für maximale Kompatibilität

- **Erweiterte interne Verlinkung**
  - Footer: Neue "Vergleiche"-Sektion mit direkten Links zu populären Modell-Seiten
  - Footer: Aktualisierte Links zu DeepSeek-R1, Grok 3, Llama 3.3
  - Models-Page: Erweiterte FAQ-Sektion mit internen Links
  - Mehr kontextuelle Links zwischen Modell-Seiten

- **SEO-Content Erweiterungen**
  - Models-Page: Erweiterte FAQ-Sektion mit 3 Fragen
  - Keyword-optimierte Beschreibungen
  - Interne Verlinkung zu spezifischen Modell-Seiten

### Aktualisiert
- **Sitemap.xml**: Neue Modelle hinzugefügt
  - gpt-4-5, claude-3-7-sonnet, gemini-2-5-pro
  - Duplikate entfernt (kimi-k2-5)

- **Footer Grid**: Angepasstes Layout für 6 Spalten (inkl. Vergleiche)

---

## [2026-02-27] - Täglicher Modelle-Check

### Hinzugefügt
- **Claude Sonnet 4.6** (Anthropic, 2026-02-17)
  - Anthropics leistungsstärkstes Sonnet-Modell
  - Opus-level Performance bei deutlich niedrigerem Preis
  - 1M Token Kontextfenster (Beta)
  - Preis: $3.00/$15.00 pro 1M Tokens
  - MMLU: 90.2, Elo: 1372
  - Hervorragende Computer Use Fähigkeiten
  - Bessere Instruction Following, weniger Overengineering

### Aktualisiert
- **Top 5 Modelle** (Februar 2026)
  1. Gemini 3.1 Pro (Google) - MMLU: 91.8, Elo: 1370
  2. Claude Opus 4.6 (Anthropic) - MMLU: 91.0, Elo: 1380
  3. Claude Sonnet 4.6 (Anthropic) - MMLU: 90.2, Elo: 1372
  4. GPT-5.2 (OpenAI) - MMLU: 90.5, Elo: 1375
  5. GPT-5.1 (OpenAI) - MMLU: 89.8, Elo: 1365

### Archiv-Status
- Keine neuen Archivierungen (keine Modelle älter als 6 Monate seit letztem Check)
- Alle Modelle vor 27. August 2025 bleiben archiviert

### Preisvergleich aktualisiert
- Claude Sonnet 4.6 hinzugefügt: $3/$15 (1M Kontext)
- Reihenfolge nach Input-Preis sortiert

---

## [2026-02-26] - Mobile UI Polish

### Visuelle Verbesserungen
- **MobileModelCard Redesign**: Vollständige Überarbeitung der mobilen Modellkarten
  - Provider-Farbcodierung (jeder Anbieter hat einzigartige Farbidentität)
  - Gradient-Top-Border für visuelle Hierarchie
  - "NEU" und "TOP" Badges mit Glow-Effekt
  - Verbesserte Stat-Boxen mit Hover-Effekten
  - MMLU Highlight für Scores ≥85%
  - Slide-Up Animationen mit Stagger-Effekt
  - Touch-Feedback für mobile Geräte

### Technische Änderungen
- Neue CSS-Animationen: `mobileCardSlideUp`, Touch-Feedback
- Provider-Color-Mapping in MobileModelCard
- Verbesserte Interaktivität mit Hover-Transitions

---

## [2026-02-26] - Täglicher Modelle-Check

### Hinzugefügt
- **Gemini 3.1 Pro** (Google, 2026-02-19)
  - 77.1% auf ARC-AGI-2 (mehr als doppelt so gut wie Gemini 3 Pro)
  - 80.6% auf SWE-Bench Verified
  - 94.3% auf GPQA Diamond
  - 1M Token Kontextfenster
  - Preis: $2.00/$12.00 pro 1M Tokens
  - MMLU: 91.8

- **Gemini 3 Flash** (Google, 2026-02-05)
  - Schnelles multimodales Modell
  - 1M Token Kontextfenster
  - Preis: $0.50/$3.00 pro 1M Tokens
  - MMLU: 88.0

- **GPT-5.3-Codex** (OpenAI, 2026-02-05)
  - Der fähigste agentische Coding-Modell bis heute
  - 77.3% auf Terminal-Bench 2.0
  - 56.8% auf SWE-Bench Pro
  - Preis: $1.75/$14.00 pro 1M Tokens

- **GPT-5.1** (OpenAI, 2025-11-13)
  - Verbesserte Version von GPT-5
  - Konfigurierbares Reasoning
  - Preis: $1.25/$10.00 pro 1M Tokens
  - MMLU: 89.8

### Aktualisiert
- **Claude Opus 4.6** Preise korrigiert
  - Alt: $15.00/$75.00
  - Neu: $5.00/$25.00 pro 1M Tokens
  - Kontextfenster aktualisiert: 200K → 1M Token (Beta)
  - GPQA: 72.0 → 91.3

### Archiviert (älter als 6 Monate - vor 26.08.2025)
- Gemini 2.5 Pro → durch Gemini 3.1 Pro ersetzt
- Gemini 2.5 Flash → durch Gemini 3 Flash ersetzt
- Gemini 2.5 Flash-Lite → durch Gemini 3 Flash ersetzt
- Gemini 2.0 Pro → archiviert
- Gemini 2.0 Flash → archiviert
- Grok 3 (Feb 2025) → archiviert
- DeepSeek R1 (Jan 2025) → archiviert
- DeepSeek V3 (Dec 2024) → archiviert
- Qwen 2.5 Max (Jan 2025) → archiviert
- Llama 3.3 70B (Dec 2024) → archiviert
- GPT-4o Mini (Jul 2024) → archiviert
- Mistral Large 2 (Jul 2024) → archiviert
- GPT-4o (May 2024) → archiviert
- Claude 3.7 Sonnet → durch Opus 4.6 ersetzt
- GPT-4.5 → durch GPT-5-Familie ersetzt
- Claude Code → durch Opus 4.6 ersetzt
- Devin → durch GPT-5.3-Codex ersetzt
- Claude 3.5 Sonnet → archiviert
- Midjourney v6 → archiviert
- DALL-E 3 → archiviert
- Sora → archiviert

### Neue Top 5 (Februar 2026)
1. **Claude Opus 4.6** (Anthropic) - MMLU: 91.0, Elo: 1380
2. **Gemini 3.1 Pro** (Google) - MMLU: 91.8, Elo: 1370
3. **GPT-5.2** (OpenAI) - MMLU: 90.5, Elo: 1375
4. **GPT-5.1** (OpenAI) - MMLU: 89.8, Elo: 1365
5. **GPT-5** (OpenAI) - MMLU: 89.5, Elo: 1360

### Preisänderungen
- Claude Opus 4.6: $15/$75 → $5/$25 (deutliche Preissenkung!)
- Gemini 3.1 Pro: Gleicher Preis wie Gemini 2.5 Pro ($2/$12)
- Gemini 3 Flash: $0.50/$3.00 (neues Budget-Modell mit 1M Kontext)

---

## [2025-02-25] - Vorheriger Stand

### Enthaltene Modelle
- Claude Opus 4.6 (Anthropic)
- GPT-5.2, GPT-5, GPT-5 Mini (OpenAI)
- Gemini 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite (Google)
- Grok 3 (xAI)
- DeepSeek R1, V3 (DeepSeek)
- Qwen 2.5 Max (Alibaba)
- Llama 3.3 70B (Meta)
- Und weitere...

### Archivierte Modelle
- Claude 3.7 Sonnet
- GPT-4.5
- Claude 3.5 Sonnet
- Gemini 2.0 Pro/Flash
- Midjourney v6
- DALL-E 3
- Sora
