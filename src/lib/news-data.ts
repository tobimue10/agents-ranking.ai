export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: "model" | "agent" | "benchmark" | "pricing" | "release";
  summary: string;
  details: string;
  source: string;
  source_url: string;
  is_highlight?: boolean;
}

export const newsData: NewsItem[] = [
  {
    id: "gpt-4-5-release",
    title: "OpenAI veröffentlicht GPT-4.5",
    date: "2025-02-27",
    category: "release",
    summary: "OpenAIs größtes und bestes Chat-Modell jetzt verfügbar",
    details: "GPT-4.5 ist das Ergebnis erweiterten unsupervised learning. Das Modell bietet höhere 'EQ', natürlichere Konversationen und weniger Halluzinationen. Verfügbar für Pro-User ab sofort, Plus/Team ab nächster Woche.",
    source: "OpenAI",
    source_url: "https://openai.com/index/introducing-gpt-4-5/",
    is_highlight: true,
  },
  {
    id: "claude-3-7-release",
    title: "Claude 3.7 Sonnet veröffentlicht",
    date: "2025-02-24",
    category: "release",
    summary: "Anthropic veröffentlicht erstes Hybrid-Reasoning-Modell am Markt",
    details: "Claude 3.7 Sonnet ist das erste Modell, das sowohl schnelle als auch erweiterte Denkprozesse in einem Modell vereint. Mit Claude Code wird auch ein neues agentisches Coding-Tool eingeführt. Das Modell erreicht State-of-the-Art-Performance auf SWE-bench Verified.",
    source: "Anthropic",
    source_url: "https://www.anthropic.com/news/claude-3-7-sonnet",
    is_highlight: true,
  },
  {
    id: "grok-3-release",
    title: "xAI veröffentlicht Grok 3",
    date: "2025-02-17",
    category: "release",
    summary: "Elon Musks xAI präsentiert neues Reasoning-Modell mit Echtzeit-Daten",
    details: "Grok 3 kommt mit einem neuen Reasoning-Modus und verbesserter Echtzeit-Integration mit X (Twitter). Das Modell soll besonders bei Mathematik und Programmierung überzeugen.",
    source: "xAI",
    source_url: "https://x.ai",
    is_highlight: true,
  },
  {
    id: "gemini-2-release",
    title: "Google Gemini 2.0 Flash & Pro",
    date: "2025-02-05",
    category: "release",
    summary: "Google erweitert Gemini-Familie mit 1M und 2M Token Kontextfenster",
    details: "Gemini 2.0 Flash bietet 1M Token Kontext für $0.10/1M Input, während Gemini 2.0 Pro experimentell 2M Token unterstützt. Beide Modelle sind für Agent-Anwendungen optimiert.",
    source: "Google",
    source_url: "https://blog.google/products/gemini/google-deepmind-gemini-model-updates-february-2025",
    is_highlight: true,
  },
  {
    id: "qwen-2-5-max",
    title: "Alibaba Qwen 2.5 Max in Top 10",
    date: "2025-02-04",
    category: "benchmark",
    summary: "Qwen 2.5 Max erreicht Platz 7 auf LMSYS Arena",
    details: "Alibabas neuestes Modell übertrifft DeepSeek V3, o1-mini und Claude 3.5 Sonnet im LMSYS Arena Ranking. Das Modell ist besonders stark in Coding-Aufgaben.",
    source: "LMSYS Arena",
    source_url: "https://chat.lmsys.org",
  },
  {
    id: "deepseek-pricing-update",
    title: "DeepSeek senkt Preise erneut",
    date: "2025-02-01",
    category: "pricing",
    summary: "API-Preise für DeepSeek V3 um 50% reduziert",
    details: "DeepSeek hat die API-Preise für V3 gesenkt: Jetzt nur $0.28/1M Input und $0.42/1M Output. Damit bleibt DeepSeek eines der günstigsten Modelle am Markt.",
    source: "DeepSeek",
    source_url: "https://api-docs.deepseek.com/quick_start/pricing",
  },
  {
    id: "claude-code-preview",
    title: "Claude Code Research Preview",
    date: "2025-02-24",
    category: "agent",
    summary: "Anthropic startet begrenzte Preview für agentisches Coding-Tool",
    details: "Claude Code ist ein Kommandozeilen-Tool, das Entwickler bei der Suche, Bearbeitung und dem Testing von Code unterstützt. Frühe Tests zeigen, dass Aufgaben, die normalerweise 45+ Minuten dauern, in einem einzigen Durchgang erledigt werden können.",
    source: "Anthropic",
    source_url: "https://www.anthropic.com/news/claude-3-7-sonnet",
    is_highlight: true,
  },
  {
    id: "openai-agents-sdk",
    title: "OpenAI Agents SDK",
    date: "2025-02-20",
    category: "agent",
    summary: "OpenAI veröffentlicht offizielles SDK für Agent-Entwicklung",
    details: "Das neue SDK ermöglicht die Erstellung von Agenten mit Tools, Handoffs zwischen Agents und Guardrails. Konkurrenz für LangChain und CrewAI.",
    source: "OpenAI",
    source_url: "https://github.com/openai/openai-agents-python",
  },
  {
    id: "lmsys-arena-update",
    title: "LMSYS Arena Leaderboard Update",
    date: "2025-02-04",
    category: "benchmark",
    summary: "Neue Rankings mit Qwen 2.5 Max und aktualisierten Elo-Scores",
    details: "Das aktuelle Leaderboard zeigt: Gemini 2.5 Pro führt weiterhin, gefolgt von GPT-4o und Claude 3.5 Sonnet. Neue Einträge: Qwen 2.5 Max auf Platz 7 und DeepSeek V3 auf Platz 12.",
    source: "LMSYS",
    source_url: "https://lmarena.ai",
  },
];

// Benchmark Updates
export const benchmarkUpdates = {
  last_updated: "2026-02-28",
  source: "LMSYS Arena (lmarena.ai)",
  top_5: [
    { rank: 1, model: "Claude Opus 4.6 Thinking", provider: "Anthropic", elo: 1506 },
    { rank: 2, model: "Claude Opus 4.6", provider: "Anthropic", elo: 1502 },
    { rank: 3, model: "Gemini 3.1 Pro", provider: "Google", elo: 1500 },
    { rank: 4, model: "Gemini 3 Pro", provider: "Google", elo: 1486 },
    { rank: 5, model: "GPT-5.2", provider: "OpenAI", elo: 1478 },
  ],
  notable_changes: [
    "Claude Opus 4.6 Thinking führt mit 1506 Elo (neu)",
    "Anthropic dominiert Top 2 mit Opus 4.6 Serie",
    "Gemini 3.1 Pro erreicht 1500 Elo Marke (neu)",
    "Google mit Gemini 3 Pro auf Platz 4",
    "GPT-5.2 komplettiert Top 5",
  ],
};

// Preis-Updates
export const pricingUpdates = [
  {
    date: "2025-02-27",
    provider: "OpenAI",
    change: "Neues Premium-Modell",
    details: "GPT-4.5: $75/1M Input, $150/1M Output - OpenAIs teuerstes Modell",
  },
  {
    date: "2025-02-01",
    provider: "DeepSeek",
    change: "Preissenkung",
    details: "V3: $0.28 → $0.14 (Input), R1: $0.55 → $0.28 (Input)",
  },
  {
    date: "2025-02-05",
    provider: "Google",
    change: "Neue Preise",
    details: "Gemini 2.0 Flash: $0.10/1M Input, Pro: $1.25/1M Input",
  },
  {
    date: "2025-02-24",
    provider: "Anthropic",
    change: "Preis beibehalten",
    details: "Claude 3.7 Sonnet: Gleicher Preis wie 3.5 ($3/$15)",
  },
];
