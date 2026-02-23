# News-Quellen für AgentRank.ai

## Automatische Updates

### RSS Feeds

#### Offizielle Anbieter
| Quelle | URL | Update-Frequenz |
|--------|-----|-----------------|
| OpenAI Blog | https://openai.com/blog/rss.xml | Bei Releases |
| Anthropic News | https://www.anthropic.com/news/rss.xml | Bei Releases |
| Google AI Blog | https://ai.googleblog.com/feeds/posts/default | Wöchentlich |
| DeepSeek Blog | https://deepseek.ai/blog/rss | Bei Releases |
| Mistral AI | https://mistral.ai/news/rss.xml | Bei Releases |
| Cohere Blog | https://cohere.com/blog/rss.xml | Wöchentlich |

#### Aggregatoren
| Quelle | URL | Nutzen |
|--------|-----|--------|
| Hacker News | https://news.ycombinator.com/rss | Community-Diskussionen |
| Reddit r/LocalLLaMA | https://reddit.com/r/LocalLLaMA.rss | Open Source News |
| Reddit r/ChatGPT | https://reddit.com/r/ChatGPT.rss | User-Feedback |
| Papers With Code | https://paperswithcode.com/rss | Neue Papers |
| Hugging Face Blog | https://huggingface.co/blog/feed.xml | Model-Releases |

---

## Benchmark-Updates

### LMSYS Chatbot Arena
- **URL:** https://chat.lmsys.org/
- **Leaderboard:** https://lmarena.ai/
- **Update:** Täglich
- **API:** Keine offizielle API, aber JSON verfügbar
- **Daten:** Elo-Ratings, Win-Rates, Battle-Count

### Hugging Face Open LLM Leaderboard
- **URL:** https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard
- **Update:** Kontinuierlich
- **API:** Hugging Face Datasets API
- **Daten:** MMLU, ARC, HellaSwag, TruthfulQA, etc.

### SEAL Leaderboards
- **URL:** https://scale.com/leaderboard
- **Update:** Wöchentlich
- **Besonderheit:** Human-evaluated, nicht automatisch

### LiveBench
- **URL:** https://livebench.ai/
- **Update:** Monatlich
- **Besonderheit:** Frisch generierte Fragen (kein Datenleck)

---

## Preis-Tracking

### API-Preise

| Anbieter | Preis-Seite | Änderungshistorie |
|----------|-------------|-------------------|
| OpenAI | https://openai.com/api/pricing/ | Keine offizielle |
| Anthropic | https://www.anthropic.com/pricing | Keine offizielle |
| Google | https://ai.google.dev/pricing | Keine offizielle |
| DeepSeek | https://deepseek.ai/pricing | GitHub History |
| Together AI | https://together.ai/pricing | - |
| Fireworks | https://fireworks.ai/pricing | - |

### Tracking-Strategie
```
1. Wöchentliche manuelle Checks
2. Archive.org für historische Daten
3. GitHub Repos für Preis-Dateien
4. Community-Submissions (Reddit, Discord)
```

---

## Community-Quellen

### Discord-Server

| Server | Link | Fokus |
|--------|------|-------|
| OpenAI Developer | https://discord.gg/openai | OpenAI News |
| Anthropic | https://discord.gg/anthropic | Claude Updates |
| LocalLLaMA | https://discord.gg/localllama | Open Source |
| Hugging Face | https://discord.gg/huggingface | Model-Releases |
| MLC LLM | https://discord.gg/MLC-LLM | Edge Deployment |

### Twitter/X Accounts

#### Offizielle
- @OpenAI
- @AnthropicAI
- @GoogleAI
- @DeepSeekAI
- @MistralAI
- @Cohere

#### News & Analysis
- @simonw (Simon Willison)
- @karpathy (Andrej Karpathy)
- @goodside (Riley Goodside)
- @bindureddy (Bindu Reddy)
- @EMostaque (Emad Mostaque)

#### Benchmarks & Research
- @lmsysorg (LMSYS)
- @paperswithcode
- @huggingface
- @weights_biases

### Newsletter

| Newsletter | URL | Frequenz |
|------------|-----|----------|
| Import AI | https://importai.substack.com/ | Wöchentlich |
| The Batch | https://deeplearning.ai/the-batch/ | Wöchentlich |
| TLDR AI | https://tldr.tech/ai | Täglich |
| Ben's Bites | https://bensbites.co/ | Täglich |
| AI Weekly | https://aiweekly.co/ | Wöchentlich |
| Last Week in AI | https://lastweekin.ai/ | Wöchentlich |

---

## Research-Quellen

### arXiv
- **URL:** https://arxiv.org/list/cs.CL/recent
- **Kategorien:** cs.CL (Computation and Language), cs.LG (Learning)
- **Filter:** LLM, Language Models, Benchmark

### Papers With Code
- **URL:** https://paperswithcode.com/
- **SOTA:** https://paperswithcode.com/sota
- **Method:** Automatische Extraktion von Benchmarks

### Semantic Scholar
- **URL:** https://semanticscholar.org/
- **API:** Verfügbar
- **Vorteil:** Zitationsnetzwerk

---

## Automatisierungs-Ideen

### Python-Skript für RSS-Monitoring
```python
# Konzept für News-Monitoring
import feedparser
from datetime import datetime

SOURCES = {
    'openai': 'https://openai.com/blog/rss.xml',
    'anthropic': 'https://www.anthropic.com/news/rss.xml',
    'google': 'https://ai.googleblog.com/feeds/posts/default',
}

def check_new_models():
    """Prüft auf neue Modell-Ankündigungen"""
    pass

def check_price_changes():
    """Prüft auf Preisänderungen"""
    pass

def check_benchmark_updates():
    """Prüft auf neue Benchmark-Ergebnisse"""
    pass
```

### Web-Scraping Targets
```
Zu überwachende Seiten:
1. LMSYS Arena Leaderboard (JSON-Endpoint)
2. Hugging Face Open LLM Leaderboard
3. OpenAI Pricing Page (wöchentlich)
4. Anthropic Pricing Page (wöchentlich)
5. Google AI Pricing Page (wöchentlich)
```

---

## Manuelle Checks

### Täglich
- [ ] Twitter/X: Neue Ankündigungen
- [ ] Hacker News: Trending AI Posts
- [ ] Reddit: r/LocalLLaMA, r/ChatGPT

### Wöchentlich
- [ ] LMSYS Arena Leaderboard
- [ ] Hugging Face Leaderboard
- [ ] Preis-Seiten aller Anbieter
- [ ] Newsletter lesen

### Monatlich
- [ ] Neue Modelle recherchieren
- [ ] Benchmark-Methodiken prüfen
- [ ] Community-Feedback sammeln

---

## Archivierung

### Wayback Machine
```
Wichtige URLs regelmäßig archivieren:
- Preis-Seiten (für Historie)
- Benchmark-Leaderboards
- Modell-Ankündigungen
```

### Git-Tracking
```
Daten als JSON speichern:
/data
  /2025-02
    models.json
    benchmarks.json
    prices.json
  /2025-03
    ...
```

---

*Letzte Aktualisierung: Februar 2025*
