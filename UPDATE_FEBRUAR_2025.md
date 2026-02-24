# Update: agents-ranking.ai - Februar 2025

## Zusammenfassung

Dieses Update aktualisiert die agents-ranking.ai Website mit den neuesten KI-Modellen, AI Agents und Benchmarks vom Februar 2025.

## Neue Modelle (Februar 2025)

### 1. Claude 3.7 Sonnet (Anthropic)
- **Release:** 24. Februar 2025
- **Besonderheit:** Erstes Hybrid-Reasoning-Modell am Markt
- **Preis:** $3.00/1M Input, $15.00/1M Output
- **Kontext:** 200K Tokens
- **Benchmarks:** MMLU 88.5%, HumanEval 92.5%
- **Neu:** Claude Code Agent für agentisches Coding
- **Quelle:** https://www.anthropic.com/news/claude-3-7-sonnet

### 2. Gemini 2.0 Flash (Google)
- **Release:** 5. Februar 2025
- **Besonderheit:** 1M Token Kontextfenster, sehr günstig
- **Preis:** $0.10/1M Input, $0.40/1M Output
- **Kontext:** 1M Tokens
- **Benchmarks:** MMLU 84.5%
- **Quelle:** https://blog.google/products/gemini/google-deepmind-gemini-model-updates-february-2025

### 3. Gemini 2.0 Pro (Google)
- **Release:** 5. Februar 2025
- **Besonderheit:** 2M Token Kontextfenster (experimentell)
- **Preis:** $1.25/1M Input, $10.00/1M Output
- **Kontext:** 2M Tokens
- **Benchmarks:** MMLU 87.8%
- **Quelle:** https://ai.google.dev/gemini-api/docs/pricing

### 4. Grok 3 (xAI)
- **Release:** 17. Februar 2025
- **Besonderheit:** Echtzeit-X-Integration, Reasoning-Modus
- **Preis:** $3.00/1M Input, $15.00/1M Output
- **Kontext:** 128K Tokens
- **Benchmarks:** MMLU 86.5%
- **Quelle:** https://x.ai

### 5. Qwen 2.5 Max (Alibaba)
- **Release:** 28. Januar 2025
- **Besonderheit:** Top 10 auf LMSYS Arena
- **Preis:** $1.60/1M Input, $6.40/1M Output
- **Kontext:** 128K Tokens
- **Benchmarks:** MMLU 86.0%, Arena Elo 1332
- **Quelle:** https://chat.lmsys.org

## Aktualisierte Preise

| Modell | Input/1M | Output/1M | Kontext |
|--------|----------|-----------|---------|
| Gemini 2.0 Flash | $0.10 | $0.40 | 1M |
| Gemini 2.0 Pro | $1.25 | $10.00 | 2M |
| Claude 3.7 Sonnet | $3.00 | $15.00 | 200K |
| Claude 3.5 Sonnet | $3.00 | $15.00 | 200K |
| GPT-4o | $2.50 | $10.00 | 128K |
| DeepSeek V3 | $0.28 | $0.42 | 128K |
| DeepSeek R1 | $0.55 | $2.19 | 128K |
| Grok 3 | $3.00 | $15.00 | 128K |

## AI Agents Update

### Neue Agents
1. **Claude Code** (Anthropic) - Kostenlose Research Preview
2. **Windsurf** (Codeium) - $15/Monat, Alternative zu Cursor
3. **Grok 3** (xAI) - Mit Reasoning-Fähigkeiten

### Agent Frameworks
- OpenAI Agents SDK (neu)
- LangChain / LangGraph
- CrewAI
- AutoGen
- LlamaIndex
- Pydantic AI
- SmolAgents

## LMSYS Arena Rankings (Februar 2025)

### Top 5
1. **Gemini 2.5 Pro** - Elo 1368
2. **GPT-4o** - Elo 1345
3. **Claude 3.7 Sonnet** - Elo 1335
4. **Qwen 2.5 Max** - Elo 1332
5. **Grok 3** - Elo 1310

### Wichtige Änderungen
- Claude 3.7 Sonnet springt auf Platz 3 (neu)
- Qwen 2.5 Max überholt DeepSeek V3 und Claude 3.5 Sonnet
- Grok 3 erreicht Top 5 bei Debüt
- Gemini 2.0 Pro klettert auf Platz 6

## Geänderte Dateien

### 1. `/src/lib/models-data.ts`
- Vollständige Überarbeitung der Modelldaten
- Neue Modelle hinzugefügt: Claude 3.7, Gemini 2.0, Grok 3, Qwen 2.5
- Aktualisierte Preise und Benchmarks
- Neue Exporte: `topModels`, `newThisWeek`, `priceComparison`

### 2. `/src/lib/agents-data.ts` (NEU)
- Vollständig neue Datei
- 10 AI Agents mit Details
- 8 Agent Frameworks
- Vergleich: Cursor vs Windsurf vs Devin

### 3. `/src/lib/news-data.ts` (NEU)
- Vollständig neue Datei
- 8 News-Einträge für Februar 2025
- Benchmark-Updates
- Preis-Updates

### 4. `/src/app/page.tsx`
- Neue Sektionen hinzugefügt:
  - Top 5 Modelle
  - Neu diese Woche
  - Preis-Vergleich
  - AI Agents
  - Benchmarks
- Aktualisierte Hero-Sektion
- Neue Badge "Stand: Februar 2025"

## Quellen

### Offizielle Anbieter
- Anthropic: https://www.anthropic.com/news/claude-3-7-sonnet
- OpenAI: https://openai.com/api/pricing/
- Google AI: https://ai.google.dev/gemini-api/docs/pricing
- DeepSeek: https://api-docs.deepseek.com/quick_start/pricing
- xAI: https://x.ai

### Benchmarks
- LMSYS Arena: https://chat.lmsys.org / https://lmarena.ai
- Artificial Analysis: https://artificialanalysis.ai

### AI Agents
- Cursor: https://cursor.com
- Windsurf: https://windsurf.com
- Claude Code: https://claude.ai/code
- Devin: https://devin.ai

## Nächste Schritte

1. Changes committen
2. Push zu GitHub
3. Vercel deployed automatisch

## Git Commit

```bash
git add .
git commit -m "Update Februar 2025: Neue Modelle (Claude 3.7, Gemini 2.0, Grok 3), AI Agents, Benchmarks"
git push origin main
```
