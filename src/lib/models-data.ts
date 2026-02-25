// === SEKTIONEN ===
// Die Modelle sind in 3 Hauptsektionen eingeteilt:
// 1. CHATBOTS & LLMs - Einfache Text-Modelle für Konversation und Reasoning
// 2. AI AGENTS - Autonome Agenten für Coding und komplexe Workflows
// 3. SPEZIAL-KI - Video, Audio, Bildgenerierung, Multimodal-Spezialisten

export type ModelSection = 'chatbot' | 'agent' | 'specialist';

export interface ModelData {
  id: string;
  name: string;
  provider: string;
  type: string;
  section: ModelSection; // Hauptsektion für die Gruppierung
  category: string[];
  description: string;
  context_window: number;
  pricing_input: number;
  pricing_output: number;
  api_available: boolean;
  release_date: string;
  benchmarks: {
    mmlu?: number;
    humaneval?: number;
    math?: number;
    gpqa?: number;
    aesthetics?: number;
    prompt_adherence?: number;
    quality?: number;
    coherence?: number;
    arena_elo?: number;
  };
  pros: string[];
  cons: string[];
  best_for: string[];
  video_url: string;
  is_new?: boolean;
  is_archived?: boolean;
}

export const modelsData: ModelData[] = [
  // ============================================
  // SEKTION 1: CHATBOTS & LLMs
  // Aktuelle Modelle (Stand: 25. Februar 2026)
  // ============================================

  // Claude Opus 4.6 (Anthropic - Feb 5, 2026) - AKTUELL
  {
    id: "claude-opus-4-6",
    name: "Claude Opus 4.6",
    provider: "Anthropic",
    type: "llm",
    section: "chatbot",
    category: ["llm", "coding", "reasoning", "agentic"],
    description: "Anthropics smartestes Modell. Führend bei agentic coding, computer use, tool use und enterprise AI.",
    context_window: 200000,
    pricing_input: 15.00,
    pricing_output: 75.00,
    api_available: true,
    release_date: "2026-02-05",
    benchmarks: { mmlu: 91.0, humaneval: 94.0, math: 85.0, gpqa: 72.0, arena_elo: 1380 },
    pros: ["Industry-leading agentic coding", "Computer use capabilities", "Bestes Enterprise AI", "Tool use & search"],
    cons: ["Sehr teuer", "Hohe Latenz bei komplexen Tasks"],
    best_for: ["Enterprise Coding", "Agentic Workflows", "Computer Automation", "Complex Reasoning"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_new: true,
  },
  // GPT-5.2 (OpenAI - Jan 2026) - AKTUELL
  {
    id: "gpt-5-2",
    name: "GPT-5.2",
    provider: "OpenAI",
    type: "llm",
    section: "chatbot",
    category: ["llm", "coding", "reasoning"],
    description: "OpenAIs neuestes Flaggschiff. Smarter und präziser als GPT-5. Führend bei Coding und agentic Tasks.",
    context_window: 256000,
    pricing_input: 5.00,
    pricing_output: 15.00,
    api_available: true,
    release_date: "2026-01-15",
    benchmarks: { mmlu: 90.5, humaneval: 93.5, math: 82.0, gpqa: 70.0, arena_elo: 1375 },
    pros: ["Höchste Präzision", "256K Kontext", "Bestes Coding", "Nativer Tool Support"],
    cons: ["Teuer", "Rate Limits bei hoher Nachfrage"],
    best_for: ["Complex Coding", "Long Context Tasks", "Agentic Workflows", "Research"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_new: true,
  },
  // GPT-5 (OpenAI - Dec 2025) - AKTUELL
  {
    id: "gpt-5",
    name: "GPT-5",
    provider: "OpenAI",
    type: "llm",
    section: "chatbot",
    category: ["llm", "coding", "reasoning"],
    description: "OpenAIs Hauptmodell für Coding und agentic Tasks. Configurable reasoning effort.",
    context_window: 128000,
    pricing_input: 2.50,
    pricing_output: 10.00,
    api_available: true,
    release_date: "2025-12-10",
    benchmarks: { mmlu: 89.5, humaneval: 92.0, math: 80.0, gpqa: 68.0, arena_elo: 1360 },
    pros: ["Ausgewogenes Preis-Leistung", "Guter Kontext", "Zuverlässig", "Großes Ökosystem"],
    cons: ["Weniger leistungsfähig als 5.2", "Keine Echtzeit-Informationen"],
    best_for: ["Daily Coding", "General Tasks", "API Integration", "Prototyping"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_new: true,
  },
  // GPT-5 mini (OpenAI - Dec 2025) - AKTUELL
  {
    id: "gpt-5-mini",
    name: "GPT-5 Mini",
    provider: "OpenAI",
    type: "llm",
    section: "chatbot",
    category: ["llm", "fast", "budget"],
    description: "Schnellste, kosteneffizienteste Version von GPT-5. Für gut definierte Tasks.",
    context_window: 128000,
    pricing_input: 0.15,
    pricing_output: 0.60,
    api_available: true,
    release_date: "2025-12-10",
    benchmarks: { mmlu: 85.0, humaneval: 88.0, math: 75.0, gpqa: 58.0, arena_elo: 1320 },
    pros: ["Sehr günstig", "Schnell", "Gut für einfache Tasks", "128K Kontext"],
    cons: ["Weniger leistungsfähig", "Kein Reasoning"],
    best_for: ["Simple Tasks", "High Volume", "Prototyping", "Chatbots"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_new: true,
  },

  // ============================================
  // ARCHIV: Modelle älter als 6 Monate (vor Aug 2025)
  // ============================================

  // Claude 3.7 Sonnet (Feb 2025) - ARCHIV (>12 Monate alt)
  {
    id: "claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet",
    provider: "Anthropic",
    type: "llm",
    section: "chatbot",
    category: ["llm", "coding", "reasoning", "archiv"],
    description: "[ARCHIV - Feb 2025] Von Claude Opus 4.6 abgelöst. War das erste Hybrid-Reasoning-Modell.",
    context_window: 200000,
    pricing_input: 3.00,
    pricing_output: 15.00,
    api_available: true,
    release_date: "2025-02-24",
    benchmarks: { mmlu: 88.5, humaneval: 92.5, math: 76.0, gpqa: 62.0, arena_elo: 1335 },
    pros: ["Hybrid-Reasoning", "Gutes Coding", "Großer Kontext"],
    cons: ["Veraltet", "Von Opus 4.6 überholt"],
    best_for: ["Historische Vergleiche"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_archived: true,
  },
  // GPT-4.5 (OpenAI - Feb 27, 2025) - ARCHIV (>12 Monate alt)
  {
    id: "gpt-4-5",
    name: "GPT-4.5",
    provider: "OpenAI",
    type: "llm",
    section: "chatbot",
    category: ["llm", "reasoning", "archiv"],
    description: "[ARCHIV - Feb 2025] Von GPT-5 und GPT-5.2 abgelöst. War OpenAIs größtes Chat-Modell.",
    context_window: 128000,
    pricing_input: 75.00,
    pricing_output: 150.00,
    api_available: true,
    release_date: "2025-02-27",
    benchmarks: { mmlu: 89.0, humaneval: 91.5, math: 78.0, gpqa: 62.0, arena_elo: 1340 },
    pros: ["Hohe EQ", "Weniger Halluzinationen"],
    cons: ["Veraltet", "Von GPT-5 überholt", "Teuer"],
    best_for: ["Historische Vergleiche"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_archived: true,
  },
  // DeepSeek R1 (Reasoning)
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    provider: "DeepSeek",
    type: "llm",
    section: "chatbot",
    category: ["llm", "reasoning", "open-source"],
    description: "Reasoning-Modell mit Chain-of-Thought. Konkurrenzfähig mit o1, aber viel günstiger.",
    context_window: 128000,
    pricing_input: 0.55,
    pricing_output: 2.19,
    api_available: true,
    release_date: "2025-01-20",
    benchmarks: { mmlu: 87.5, humaneval: 91.5, math: 91.2, gpqa: 65.0, arena_elo: 1295 },
    pros: ["Hervorragendes Reasoning", "Sichtbares Chain-of-Thought", "Sehr günstig", "Open Source"],
    cons: ["Nur Englisch/Chinesisch", "Zensur"],
    best_for: ["Mathematik", "Wissenschaft", "Logik", "Reasoning"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
  },
  // DeepSeek V3
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    provider: "DeepSeek",
    type: "llm",
    section: "chatbot",
    category: ["llm", "coding", "open-source"],
    description: "Open-Source-Modell mit extrem günstigen Preisen. 128K Kontext, hervorragendes Reasoning.",
    context_window: 128000,
    pricing_input: 0.28,
    pricing_output: 0.42,
    api_available: true,
    release_date: "2024-12-26",
    benchmarks: { mmlu: 85.2, humaneval: 89.8, math: 74.0, gpqa: 55.0, arena_elo: 1278 },
    pros: ["Extrem günstig", "Open Source", "Hervorragendes Reasoning", "128K Kontext"],
    cons: ["Zensur bei sensiblen Themen", "Weniger bekannt"],
    best_for: ["Budget-Projekte", "Coding", "Reasoning", "API-Integration"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
  },
  // Qwen 2.5 Max (Alibaba)
  {
    id: "qwen-2-5-max",
    name: "Qwen 2.5 Max",
    provider: "Alibaba",
    type: "llm",
    section: "chatbot",
    category: ["llm", "coding", "open-source"],
    description: "Alibabas stärkstes Modell. Top 10 auf LMSYS Arena.",
    context_window: 128000,
    pricing_input: 1.60,
    pricing_output: 6.40,
    api_available: true,
    release_date: "2025-01-28",
    benchmarks: { mmlu: 86.0, humaneval: 88.5, math: 73.0, gpqa: 54.0, arena_elo: 1332 },
    pros: ["Top-Performance", "Gute Chinesisch-Übersetzung", "Open-Source-Varianten"],
    cons: ["Weniger bekannt außerhalb Chinas", "Begrenzte Dokumentation"],
    best_for: ["Coding", "Asiatische Märkte", "Mehrsprachige Apps"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
  },
  // Grok 3 (xAI)
  {
    id: "grok-3",
    name: "Grok 3",
    provider: "xAI",
    type: "llm",
    section: "chatbot",
    category: ["llm", "real-time"],
    description: "xAIs neuestes Modell mit Echtzeit-X-Integration und Reasoning-Fähigkeiten.",
    context_window: 128000,
    pricing_input: 3.00,
    pricing_output: 15.00,
    api_available: true,
    release_date: "2025-02-17",
    benchmarks: { mmlu: 86.5, humaneval: 89.0, math: 78.0, gpqa: 58.0, arena_elo: 1310 },
    pros: ["Echtzeit-X-Integration", "Weniger zensiert", "Reasoning-Modus"],
    cons: ["Nur über X/Twitter", "Weniger reif"],
    best_for: ["News-Analyse", "Social Media", "Echtzeit-Informationen"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
  },
  // Llama 3.3 70B
  {
    id: "llama-3-3-70b",
    name: "Llama 3.3 70B",
    provider: "Meta",
    type: "llm",
    section: "chatbot",
    category: ["llm", "open-source"],
    description: "Effizientes Open-Source-Modell. Fast gleiche Performance wie 405B.",
    context_window: 128000,
    pricing_input: 0.12,
    pricing_output: 0.30,
    api_available: true,
    release_date: "2024-12-06",
    benchmarks: { mmlu: 82.1, humaneval: 86.5, math: 70.0, gpqa: 48.0, arena_elo: 1250 },
    pros: ["Kostenlos", "Open Source", "Effizient", "Großes Ökosystem"],
    cons: ["Weniger leistungsfähig als Top-Modelle", "Selbst-Hosting erforderlich"],
    best_for: ["Selbst-Hosting", "Datenschutz", "Forschung", "Budget"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
  },
  // GPT-4o Mini
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    type: "llm",
    section: "chatbot",
    category: ["llm", "budget"],
    description: "Günstige Alternative zu GPT-4o. Für einfache Aufgaben ideal.",
    context_window: 128000,
    pricing_input: 0.15,
    pricing_output: 0.60,
    api_available: true,
    release_date: "2024-07-18",
    benchmarks: { mmlu: 78.9, humaneval: 81.2, math: 68.0, gpqa: 42.0, arena_elo: 1220 },
    pros: ["Sehr günstig", "Schnell", "Multimodal"],
    cons: ["Weniger leistungsfähig", "Eingeschränkte Fähigkeiten"],
    best_for: ["Einfache Aufgaben", "Prototyping", "Low-Budget"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
  },
  // Mistral Large 2
  {
    id: "mistral-large-2",
    name: "Mistral Large 2",
    provider: "Mistral AI",
    type: "llm",
    section: "chatbot",
    category: ["llm", "european"],
    description: "Europäisches Modell mit starken Multilingual-Fähigkeiten.",
    context_window: 128000,
    pricing_input: 2.00,
    pricing_output: 6.00,
    api_available: true,
    release_date: "2024-07-24",
    benchmarks: { mmlu: 81.8, humaneval: 85.2, math: 68.0, gpqa: 48.0, arena_elo: 1245 },
    pros: ["Europäisch", "Multilingual", "Gute Preisgestaltung"],
    cons: ["Weniger bekannt", "Kleinere Community"],
    best_for: ["Europäische Unternehmen", "Multilingual", "GDPR"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
  },

  // ============================================
  // SEKTION 2: AI AGENTS
  // Autonome Agenten für Coding, Planung, Workflows
  // ============================================

  // Devin - Cognition AI
  {
    id: "devin",
    name: "Devin",
    provider: "Cognition AI",
    type: "agent",
    section: "agent",
    category: ["agent", "coding", "autonomous"],
    description: "Autonomer Software-Engineering-Agent. Kann komplette Projekte von der Planung bis zur Implementierung durchführen.",
    context_window: 128000,
    pricing_input: 0,
    pricing_output: 0,
    api_available: false,
    release_date: "2024-03-12",
    benchmarks: { humaneval: 95.0 },
    pros: ["Vollautonom", "End-to-End-Workflow", "Echtzeit-Zusammenarbeit"],
    cons: ["Sehr teuer ($500+/Monat)", "Warteliste", "Nicht für alle Use-Cases"],
    best_for: ["Enterprise", "Komplexe Projekte", "Full-Stack-Entwicklung"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
  },
  // Claude Code
  {
    id: "claude-code",
    name: "Claude Code",
    provider: "Anthropic",
    type: "agent",
    section: "agent",
    category: ["agent", "coding", "terminal"],
    description: "Kommandozeilen-Tool für agentisches Coding. Forschungs-Preview mit Claude 3.7 Sonnet.",
    context_window: 200000,
    pricing_input: 3.00,
    pricing_output: 15.00,
    api_available: true,
    release_date: "2025-02-24",
    benchmarks: { humaneval: 92.5 },
    pros: ["Kostenlos (für Preview)", "Integriert mit Claude 3.7", "Sehr mächtig", "GitHub-Integration"],
    cons: ["Nur Preview", "Terminal-only", "Begrenzte Verfügbarkeit"],
    best_for: ["Terminal-User", "Claude-Fans", "Debugging", "Refactoring"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_new: true,
  },
  // GitHub Copilot
  {
    id: "github-copilot-agent",
    name: "GitHub Copilot",
    provider: "GitHub/OpenAI",
    type: "agent",
    section: "agent",
    category: ["agent", "coding", "ide"],
    description: "Der bekannteste Coding-Assistent mit Workspace-Agent. Integriert in VS Code, JetBrains, Neovim.",
    context_window: 128000,
    pricing_input: 0,
    pricing_output: 0,
    api_available: false,
    release_date: "2021-06-29",
    benchmarks: { humaneval: 88.0 },
    pros: ["Sehr verbreitet", "Gute IDE-Integration", "Zuverlässig", "Große Community"],
    cons: ["Weniger agentisch als Cursor", "Code bleibt in der Cloud", "Manchmal generisch"],
    best_for: ["Tägliches Coding", "Einsteiger", "Alle IDEs", "GitHub-User"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
  },

  // ============================================
  // SEKTION 3: SPEZIAL-KI
  // Video, Audio, Bildgenerierung, Multimodal-Spezialisten
  // ============================================

  // Gemini 2.5 Pro (Juni 2025) - AKTUELL
  {
    id: "gemini-2-5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    type: "multimodal",
    section: "specialist",
    category: ["multimodal", "vision", "long-context", "reasoning"],
    description: "Googles leistungsstärkstes Modell mit 1M Token Kontextfenster. State-of-the-art für Coding und komplexe Reasoning-Aufgaben.",
    context_window: 1000000,
    pricing_input: 1.25,
    pricing_output: 10.00,
    api_available: true,
    release_date: "2025-06-01",
    benchmarks: { mmlu: 89.5, humaneval: 92.0, math: 80.0, gpqa: 65.0, arena_elo: 1350 },
    pros: ["1M Token Kontextfenster", "State-of-the-art Coding", "Native Multimodalität", "Thinking/Reasoning"],
    cons: ["Noch experimentell für einige Features", "Höhere Latenz als Flash"],
    best_for: ["Riesige Dokumente", "Complex Coding", "Forschung", "Enterprise"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_new: true,
  },
  // Gemini 2.5 Flash (Juni 2025) - AKTUELL
  {
    id: "gemini-2-5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google",
    type: "multimodal",
    section: "specialist",
    category: ["multimodal", "vision", "fast", "reasoning"],
    description: "Schnelles multimodales Modell mit adaptivem Thinking. Bestes Preis-Leistungs-Verhältnis bei Google.",
    context_window: 1000000,
    pricing_input: 0.15,
    pricing_output: 0.60,
    api_available: true,
    release_date: "2025-06-01",
    benchmarks: { mmlu: 86.5, humaneval: 89.0, math: 75.0, gpqa: 58.0, arena_elo: 1310 },
    pros: ["1M Token Kontextfenster", "Sehr günstig", "Adaptive Thinking-Budget", "Schnell"],
    cons: ["Weniger leistungsfähig als Pro", "Thinking manchmal inkonsistent"],
    best_for: ["Lange Dokumente", "Agent-Apps", "Kostenbewusste Projekte", "Echtzeit"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_new: true,
  },
  // Gemini 2.5 Flash-Lite (Juli 2025) - AKTUELL
  {
    id: "gemini-2-5-flash-lite",
    name: "Gemini 2.5 Flash-Lite",
    provider: "Google",
    type: "multimodal",
    section: "specialist",
    category: ["multimodal", "vision", "fast", "budget"],
    description: "Kostengünstigste Variante der Gemini 2.5 Familie. Für High-Volume-Anwendungen optimiert.",
    context_window: 1000000,
    pricing_input: 0.075,
    pricing_output: 0.30,
    api_available: true,
    release_date: "2025-07-01",
    benchmarks: { mmlu: 84.0, humaneval: 86.0, math: 70.0, gpqa: 52.0, arena_elo: 1280 },
    pros: ["Sehr günstig", "1M Kontext", "Schnell", "Hoher Durchsatz"],
    cons: ["Weniger leistungsfähig", "Kein Thinking-Modus"],
    best_for: ["High-Volume Apps", "Echtzeit", "Budget-Projekte"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_new: true,
  },
  // ARCHIV: Gemini 2.0 Pro (veraltet durch 2.5)
  {
    id: "gemini-2-0-pro",
    name: "Gemini 2.0 Pro",
    provider: "Google",
    type: "multimodal",
    section: "specialist",
    category: ["multimodal", "vision", "long-context", "archiv"],
    description: "[ARCHIV] Von Gemini 2.5 Pro abgelöst. War Googles leistungsstärkstes Modell mit 2M Token.",
    context_window: 2000000,
    pricing_input: 1.25,
    pricing_output: 10.00,
    api_available: true,
    release_date: "2025-02-05",
    benchmarks: { mmlu: 87.8, humaneval: 90.2, math: 75.0, gpqa: 58.0, arena_elo: 1320 },
    pros: ["Größtes Kontextfenster (2M)", "Hervorragendes Reasoning", "Multimodal"],
    cons: ["Von 2.5 Pro abgelöst", "Höhere Latenz"],
    best_for: ["Riesige Dokumente", "Codebases", "Forschung"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_archived: true,
  },
  // ARCHIV: Gemini 2.0 Flash (veraltet durch 2.5)
  {
    id: "gemini-2-0-flash",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    type: "multimodal",
    section: "specialist",
    category: ["multimodal", "vision", "fast", "archiv"],
    description: "[ARCHIV] Von Gemini 2.5 Flash abgelöst. War schnelles multimodales Modell mit 1M Kontext.",
    context_window: 1000000,
    pricing_input: 0.10,
    pricing_output: 0.40,
    api_available: true,
    release_date: "2025-02-05",
    benchmarks: { mmlu: 84.5, humaneval: 87.0, math: 72.0, gpqa: 52.0, arena_elo: 1280 },
    pros: ["Riesiges 1M Kontextfenster", "Sehr günstig", "Multimodal"],
    cons: ["Von 2.5 Flash abgelöst", "Kein Thinking"],
    best_for: ["Lange Dokumente", "Video-Analyse"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_archived: true,
  },
  // GPT-4o (Multimodal)
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    type: "multimodal",
    section: "specialist",
    category: ["multimodal", "vision", "audio"],
    description: "OpenAIs multimodales Flaggschiff. Text, Bild, Audio und Video in Echtzeit.",
    context_window: 128000,
    pricing_input: 2.50,
    pricing_output: 10.00,
    api_available: true,
    release_date: "2024-05-13",
    benchmarks: { mmlu: 87.2, humaneval: 90.1, math: 76.6, gpqa: 53.6, arena_elo: 1312 },
    pros: ["Multimodal", "Großes Ökosystem", "Zuverlässige API", "Echtzeit-Audio"],
    cons: ["Höherer Preis", "Weniger transparent"],
    best_for: ["Multimodale Apps", "Echtzeit-Anwendungen", "API-Integration"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
  },

  // === ARCHIV SECTION ===
  // Veraltete Modelle nur für historische Vergleiche
  
  // ARCHIV: Claude 3.5 Sonnet (veraltet durch 3.7)
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    type: "llm",
    section: "chatbot",
    category: ["llm", "coding", "reasoning", "archiv"],
    description: "[ARCHIV] Ausgezeichnetes Preis-Leistungs-Verhältnis. Von Claude 3.7 Sonnet abgelöst.",
    context_window: 200000,
    pricing_input: 3.00,
    pricing_output: 15.00,
    api_available: true,
    release_date: "2024-06-20",
    benchmarks: { mmlu: 85.4, humaneval: 92.0, math: 71.1, gpqa: 59.4, arena_elo: 1301 },
    pros: ["Exzellentes Coding", "Großes Kontextfenster", "Natürliche Konversation"],
    cons: ["Von 3.7 abgelöst", "Kein Reasoning-Modus"],
    best_for: ["Coding", "Dokumentenanalyse", "Schreiben"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_archived: true,
  },
  // ARCHIV: Midjourney v6
  {
    id: "midjourney-v6",
    name: "Midjourney v6",
    provider: "Midjourney",
    type: "image",
    section: "specialist",
    category: ["image", "art", "archiv"],
    description: "[ARCHIV] Führendes KI-Bildgenerierungsmodell für künstlerische Bilder.",
    context_window: 0,
    pricing_input: 8.00,
    pricing_output: 0,
    api_available: false,
    release_date: "2023-12-21",
    benchmarks: { aesthetics: 95, prompt_adherence: 92 },
    pros: ["Beste Bildqualität", "Künstlerischer Stil", "Aktive Community"],
    cons: ["Keine API", "Discord erforderlich", "Teuer"],
    best_for: ["Kunst", "Marketing", "Konzept-Design"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_archived: true,
  },
  // ARCHIV: DALL-E 3
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    provider: "OpenAI",
    type: "image",
    section: "specialist",
    category: ["image", "api", "archiv"],
    description: "[ARCHIV] OpenAIs Bildgenerierungsmodell mit exzellenter Prompt-Einhaltung.",
    context_window: 0,
    pricing_input: 4.00,
    pricing_output: 0,
    api_available: true,
    release_date: "2023-10-01",
    benchmarks: { aesthetics: 85, prompt_adherence: 95 },
    pros: ["API verfügbar", "Gute Prompt-Einhaltung", "ChatGPT-Integration"],
    cons: ["Weniger künstlerisch", "Eingeschränkte Kontrolle"],
    best_for: ["API-Integration", "Content-Erstellung", "ChatGPT-User"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_archived: true,
  },
  // ARCHIV: Sora
  {
    id: "sora",
    name: "Sora",
    provider: "OpenAI",
    type: "video",
    section: "specialist",
    category: ["video", "multimodal", "archiv"],
    description: "[ARCHIV] KI-Modell für die Generierung realistischer Videos aus Text.",
    context_window: 0,
    pricing_input: 0,
    pricing_output: 0,
    api_available: false,
    release_date: "2024-12-09",
    benchmarks: { quality: 90, coherence: 88 },
    pros: ["Realistische Videos", "Lange Sequenzen", "Physik-Verständnis"],
    cons: ["Nur für ausgewählte User", "Hohe Kosten"],
    best_for: ["Video-Produktion", "Storyboarding", "Marketing"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_archived: true,
  },
];

// Top 5 Modelle für Februar 2026
// Nur Modelle < 6 Monate alt (nach Aug 2025)
export const topModels = [
  {
    rank: 1,
    name: "Claude Opus 4.6",
    provider: "Anthropic",
    arena_elo: 1380,
    mmlu: 91.0,
    context: "200K",
    price_input: 15.00,
    price_output: 75.00,
    highlight: "Industry Leader (Feb 2026)",
    release_date: "2026-02-05",
  },
  {
    rank: 2,
    name: "GPT-5.2",
    provider: "OpenAI",
    arena_elo: 1375,
    mmlu: 90.5,
    context: "256K",
    price_input: 5.00,
    price_output: 15.00,
    highlight: "Beste Präzision (Jan 2026)",
    release_date: "2026-01-15",
  },
  {
    rank: 3,
    name: "GPT-5",
    provider: "OpenAI",
    arena_elo: 1360,
    mmlu: 89.5,
    context: "128K",
    price_input: 2.50,
    price_output: 10.00,
    highlight: "Bestes Preis-Leistung (Dez 2025)",
    release_date: "2025-12-10",
  },
  {
    rank: 4,
    name: "GPT-5 Mini",
    provider: "OpenAI",
    arena_elo: 1320,
    mmlu: 85.0,
    context: "128K",
    price_input: 0.15,
    price_output: 0.60,
    highlight: "Bestes Budget (Dez 2025)",
    release_date: "2025-12-10",
  },
  {
    rank: 5,
    name: "Gemini 2.5 Pro",
    provider: "Google",
    arena_elo: 1350,
    mmlu: 89.5,
    context: "1M",
    price_input: 1.25,
    price_output: 10.00,
    highlight: "Größter Kontext (Jun 2025)",
    release_date: "2025-06-01",
  },
];

// Neue Modelle (letzte 30 Tage)
export const newThisWeek = [
  {
    name: "Claude Opus 4.6",
    provider: "Anthropic",
    release_date: "2026-02-05",
    description: "Anthropics smartestes Modell - führend bei agentic coding und enterprise AI",
    category: "LLM / Agentic",
  },
];

// Preisvergleich - Aktuelle Modelle (Stand: Feb 2026)
export const priceComparison = [
  { model: "GPT-5 Mini", provider: "OpenAI", input: 0.15, output: 0.60, context: "128K", release: "2025-12" },
  { model: "Gemini 2.5 Flash-Lite", provider: "Google", input: 0.075, output: 0.30, context: "1M", release: "2025-07" },
  { model: "Gemini 2.5 Flash", provider: "Google", input: 0.15, output: 0.60, context: "1M", release: "2025-06" },
  { model: "GPT-5", provider: "OpenAI", input: 2.50, output: 10.00, context: "128K", release: "2025-12" },
  { model: "Gemini 2.5 Pro", provider: "Google", input: 1.25, output: 10.00, context: "1M", release: "2025-06" },
  { model: "GPT-5.2", provider: "OpenAI", input: 5.00, output: 15.00, context: "256K", release: "2026-01" },
  { model: "Claude Opus 4.6", provider: "Anthropic", input: 15.00, output: 75.00, context: "200K", release: "2026-02" },
];
  { model: "Llama 3.3 70B", provider: "Meta", input: 0.12, output: 0.30, context: "128K" },
  { model: "GPT-4o Mini", provider: "OpenAI", input: 0.15, output: 0.60, context: "128K" },
  { model: "DeepSeek V3", provider: "DeepSeek", input: 0.28, output: 0.42, context: "128K" },
  { model: "Gemini 2.5 Pro", provider: "Google", input: 1.25, output: 10.00, context: "1M" },
  { model: "GPT-4o", provider: "OpenAI", input: 2.50, output: 10.00, context: "128K" },
  { model: "Claude 3.7 Sonnet", provider: "Anthropic", input: 3.00, output: 15.00, context: "200K" },
  { model: "GPT-4.5", provider: "OpenAI", input: 75.00, output: 150.00, context: "128K" },
];
