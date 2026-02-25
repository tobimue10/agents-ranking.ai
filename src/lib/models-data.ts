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
  // Einfache Text-Modelle für Konversation, Reasoning, Coding
  // ============================================

  // Claude 3.7 Sonnet (Feb 2025)
  {
    id: "claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet",
    provider: "Anthropic",
    type: "llm",
    section: "chatbot",
    category: ["llm", "coding", "reasoning"],
    description: "Erstes Hybrid-Reasoning-Modell am Markt. Kann zwischen schnellen und erweiterten Denkprozessen wechseln. State-of-the-art bei Coding.",
    context_window: 200000,
    pricing_input: 3.00,
    pricing_output: 15.00,
    api_available: true,
    release_date: "2025-02-24",
    benchmarks: { mmlu: 88.5, humaneval: 92.5, math: 76.0, gpqa: 62.0, arena_elo: 1335 },
    pros: ["Hybrid-Reasoning: Schnell oder tiefgründig", "Bestes Coding-Modell", "Kontrollierbares Thinking-Budget"],
    cons: ["Teuer im Extended-Thinking-Modus", "Thinking Tokens kosten extra"],
    best_for: ["Coding", "Debugging", "Refactoring", "Reasoning"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_new: true,
  },
  // GPT-4.5 (OpenAI - Feb 27, 2025)
  {
    id: "gpt-4-5",
    name: "GPT-4.5",
    provider: "OpenAI",
    type: "llm",
    section: "chatbot",
    category: ["llm", "reasoning"],
    description: "OpenAIs größtes und bestes Chat-Modell. Erweitertes unsupervised learning für natürlichere Interaktionen.",
    context_window: 128000,
    pricing_input: 75.00,
    pricing_output: 150.00,
    api_available: true,
    release_date: "2025-02-27",
    benchmarks: { mmlu: 89.0, humaneval: 91.5, math: 78.0, gpqa: 62.0, arena_elo: 1340 },
    pros: ["Höchste 'EQ' aller GPT-Modelle", "Weniger Halluzinationen", "Natürlichere Konversation", "Starke Kreativität"],
    cons: ["Extrem teuer", "Kein Reasoning wie o1", "Nur für Pro/Plus User"],
    best_for: ["Writing", "Coaching", "Brainstorming", "Kreative Aufgaben"],
    video_url: "https://www.youtube.com/embed/-AJoByRGkgU",
    is_new: true,
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
// Sortiert nach: Aktualität (Release-Datum), Benchmarks (MMLU/Elo), Verfügbarkeit
export const topModels = [
  {
    rank: 1,
    name: "Gemini 2.5 Pro",
    provider: "Google",
    arena_elo: 1350,
    mmlu: 89.5,
    context: "1M",
    price_input: 1.25,
    price_output: 10.00,
    highlight: "State-of-the-art (Jun 2025)",
    release_date: "2025-06-01",
  },
  {
    rank: 2,
    name: "Claude 3.7 Sonnet",
    provider: "Anthropic",
    arena_elo: 1335,
    mmlu: 88.5,
    context: "200K",
    price_input: 3.00,
    price_output: 15.00,
    highlight: "Bestes Coding (Feb 2025)",
    release_date: "2025-02-24",
  },
  {
    rank: 3,
    name: "GPT-4.5",
    provider: "OpenAI",
    arena_elo: 1340,
    mmlu: 89.0,
    context: "128K",
    price_input: 75.00,
    price_output: 150.00,
    highlight: "Höchste EQ (Feb 2025)",
    release_date: "2025-02-27",
  },
  {
    rank: 4,
    name: "Qwen 2.5 Max",
    provider: "Alibaba",
    arena_elo: 1332,
    mmlu: 86.0,
    context: "128K",
    price_input: 1.60,
    price_output: 6.40,
    highlight: "Bestes chinesisches Modell (Jan 2025)",
    release_date: "2025-01-28",
  },
  {
    rank: 5,
    name: "DeepSeek R1",
    provider: "DeepSeek",
    arena_elo: 1295,
    mmlu: 87.5,
    context: "128K",
    price_input: 0.55,
    price_output: 2.19,
    highlight: "Bestes Reasoning/Preis (Jan 2025)",
    release_date: "2025-01-20",
  },
];

// Neue Modelle diese Woche
export const newThisWeek = [
  {
    name: "Gemini 2.5 Pro",
    provider: "Google",
    release_date: "2025-06-01",
    description: "Googles leistungsstärkstes Modell mit 1M Kontext und State-of-the-art Coding",
    category: "Multimodal / Reasoning",
  },
  {
    name: "Gemini 2.5 Flash",
    provider: "Google",
    release_date: "2025-06-01",
    description: "Schnelles multimodales Modell mit adaptivem Thinking und 1M Kontext",
    category: "Multimodal / Fast",
  },
  {
    name: "Gemini 2.5 Flash-Lite",
    provider: "Google",
    release_date: "2025-07-01",
    description: "Kostengünstigste Gemini 2.5 Variante für High-Volume-Anwendungen",
    category: "Multimodal / Budget",
  },
];

// Preisvergleich
export const priceComparison = [
  { model: "Gemini 2.5 Flash-Lite", provider: "Google", input: 0.075, output: 0.30, context: "1M" },
  { model: "Gemini 2.5 Flash", provider: "Google", input: 0.15, output: 0.60, context: "1M" },
  { model: "Llama 3.3 70B", provider: "Meta", input: 0.12, output: 0.30, context: "128K" },
  { model: "GPT-4o Mini", provider: "OpenAI", input: 0.15, output: 0.60, context: "128K" },
  { model: "DeepSeek V3", provider: "DeepSeek", input: 0.28, output: 0.42, context: "128K" },
  { model: "Gemini 2.5 Pro", provider: "Google", input: 1.25, output: 10.00, context: "1M" },
  { model: "GPT-4o", provider: "OpenAI", input: 2.50, output: 10.00, context: "128K" },
  { model: "Claude 3.7 Sonnet", provider: "Anthropic", input: 3.00, output: 15.00, context: "200K" },
  { model: "GPT-4.5", provider: "OpenAI", input: 75.00, output: 150.00, context: "128K" },
];
