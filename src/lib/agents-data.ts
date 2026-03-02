export interface AgentData {
  id: string;
  name: string;
  provider: string;
  category: string;
  description: string;
  pricing: {
    free?: boolean;
    monthly?: number;
    per_task?: number;
  };
  features: string[];
  pros: string[];
  cons: string[];
  best_for: string[];
  release_date: string;
  website: string;
  is_new?: boolean;
  is_archived?: boolean;
}

export const agentsData: AgentData[] = [
  // Devin - Cognition AI
  {
    id: "devin",
    name: "Devin",
    provider: "Cognition AI",
    category: "Coding Agent",
    description: "Autonomer Software-Engineering-Agent. Kann komplette Projekte von der Planung bis zur Implementierung durchführen.",
    pricing: { monthly: 500 },
    features: ["Autonomes Coding", "End-to-End-Entwicklung", "GitHub-Integration", "Debugging", "Deployment"],
    pros: ["Vollautonom", "End-to-End-Workflow", "Echtzeit-Zusammenarbeit"],
    cons: ["Sehr teuer", "Warteliste", "Nicht für alle Use-Cases"],
    best_for: ["Enterprise", "Komplexe Projekte", "Full-Stack-Entwicklung"],
    release_date: "2024-03-12",
    website: "https://devin.ai",
  },
  // Cursor
  {
    id: "cursor",
    name: "Cursor",
    provider: "Anysphere",
    category: "AI IDE",
    description: "KI-gestützte IDE mit Agent-Modus. Basiert auf VS Code mit integriertem Claude/GPT.",
    pricing: { monthly: 20, free: true },
    features: ["Agent-Modus", "Tab-Autovervollständigung", "Chat-Interface", "Code-Editor", "Multi-File-Editing"],
    pros: ["Sehr beliebt (14.7M Visits/Monat)", "Reifer Agent-Modus", "VS Code-Kompatibel", "Schnell"],
    cons: ["$20/Monat für Pro", "Kann bei großen Codebases langsam werden"],
    best_for: ["Tägliches Coding", "Refactoring", "Debugging", "Prototyping"],
    release_date: "2023-03-01",
    website: "https://cursor.com",
  },
  // Windsurf
  {
    id: "windsurf",
    name: "Windsurf",
    provider: "Codeium",
    category: "AI IDE",
    description: "Agentische IDE mit 'Cascade' - einem Agenten, der mehrere Dateien gleichzeitig bearbeiten kann.",
    pricing: { monthly: 15, free: true },
    features: ["Cascade Agent", "Multi-File-Editing", "Terminal-Integration", "Git-Integration", "VS Code-Kompatibel"],
    pros: ["Günstiger als Cursor ($15)", "Sehr gute Agent-Funktionen", "Cognition-Backing", "Schnell"],
    cons: ["Neuer am Markt", "Kleinere Community", "Gelegentlich inkonsistent"],
    best_for: ["Budget-bewusste Entwickler", "Agent-basiertes Coding", "Full-Stack"],
    release_date: "2024-08-01",
    website: "https://windsurf.com",
    is_new: true,
  },
  // Claude Code
  {
    id: "claude-code",
    name: "Claude Code",
    provider: "Anthropic",
    category: "Coding Agent",
    description: "Kommandozeilen-Tool für agentisches Coding. Forschungs-Preview mit Claude 3.7 Sonnet.",
    pricing: { free: true },
    features: ["Terminal-basiert", "Code-Suche", "Datei-Editing", "Test-Ausführung", "Git-Integration"],
    pros: ["Kostenlos (für Preview)", "Integriert mit Claude 3.7", "Sehr mächtig", "GitHub-Integration"],
    cons: ["Nur Preview", "Terminal-only", "Begrenzte Verfügbarkeit"],
    best_for: ["Terminal-User", "Claude-Fans", "Debugging", "Refactoring"],
    release_date: "2025-02-24",
    website: "https://claude.ai/code",
    is_new: true,
  },
  // GitHub Copilot
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    provider: "GitHub/OpenAI",
    category: "AI IDE",
    description: "Der bekannteste Coding-Assistent. Integriert in VS Code, JetBrains, Neovim.",
    pricing: { monthly: 10, free: true },
    features: ["Code-Vervollständigung", "Chat (Copilot Chat)", "Multi-IDE-Support", "GitHub-Integration", "Workspace-Agent"],
    pros: ["Sehr verbreitet", "Gute IDE-Integration", "Zuverlässig", "Große Community"],
    cons: ["Weniger agentisch als Cursor/Windsurf", "Code bleibt in der Cloud", "Manchmal generisch"],
    best_for: ["Tägliches Coding", "Einsteiger", "Alle IDEs", "GitHub-User"],
    release_date: "2021-06-29",
    website: "https://github.com/features/copilot",
  },
  // Replit Agent
  {
    id: "replit-agent",
    name: "Replit Agent",
    provider: "Replit",
    category: "Full-Stack Agent",
    description: "Vollständige Entwicklungsumgebung mit integriertem Agenten für Web-Apps.",
    pricing: { monthly: 7, free: true },
    features: ["Full-Stack-Entwicklung", "Hosting inklusive", "Datenbank-Integration", "One-Click-Deploy", "Agent-Modus"],
    pros: ["All-in-One", "Sehr günstig", "Hosting inklusive", "Einfach für Anfänger"],
    cons: ["Replit-Ökosystem gebunden", "Weniger flexibel", "Nicht für Enterprise"],
    best_for: ["Anfänger", "Prototyping", "Web-Apps", "Lernen"],
    release_date: "2024-09-01",
    website: "https://replit.com",
  },
  // Lovable
  {
    id: "lovable",
    name: "Lovable",
    provider: "Lovable",
    category: "No-Code Agent",
    description: "KI-gestützter No-Code-Builder für Web-Apps. Natürlichsprachliche Prompts zu funktionierenden Apps.",
    pricing: { monthly: 20, free: true },
    features: ["No-Code", "Prompt-to-App", "Supabase-Integration", "GitHub-Sync", "Hosting"],
    pros: ["Keine Coding-Kenntnisse nötig", "Schnell", "Gute UI-Generierung", "GitHub-Export"],
    cons: ["Weniger flexibel", "Nur Web-Apps", "Abhängigkeit von Plattform"],
    best_for: ["No-Code-Entwickler", "Prototyping", "MVP-Builder", "Designer"],
    release_date: "2024-01-01",
    website: "https://lovable.dev",
  },
  // v0
  {
    id: "v0",
    name: "v0",
    provider: "Vercel",
    category: "Frontend Agent",
    description: "KI-gestützter UI-Generator von Vercel. React-Komponenten aus Prompts.",
    pricing: { monthly: 20, free: true },
    features: ["UI-Generierung", "React/Next.js", "Tailwind CSS", "Shadcn/UI", "Vercel-Deploy"],
    pros: ["Hervorragende UI-Qualität", "Next.js-Integration", "Vercel-Ökosystem", "Schnell"],
    cons: ["Nur Frontend", "React-only", "Vercel-gebunden"],
    best_for: ["Frontend-Entwickler", "Next.js", "UI-Prototyping", "Vercel-User"],
    release_date: "2023-09-01",
    website: "https://v0.dev",
  },
  // Bolt
  {
    id: "bolt",
    name: "Bolt",
    provider: "StackBlitz",
    category: "Full-Stack Agent",
    description: "Full-Stack-Web-Entwicklung im Browser. Keine Setup-Zeit.",
    pricing: { monthly: 9, free: true },
    features: ["Browser-basiert", "Full-Stack", "Instant-Deploy", "npm-Unterstützung", "GitHub-Integration"],
    pros: ["Kein Setup", "Schnell", "Günstig", "Browser-basiert"],
    cons: ["Browser-limitiert", "Weniger mächtig als Desktop-IDEs"],
    best_for: ["Schnelles Prototyping", "Unterwegs", "Anfänger", "Web-Apps"],
    release_date: "2024-05-01",
    website: "https://bolt.new",
  },
  // Aider
  {
    id: "aider",
    name: "Aider",
    provider: "Open Source",
    category: "Coding Agent",
    description: "Open-Source Terminal-basierter Coding-Agent. Multi-File-Editing mit Git-Integration.",
    pricing: { free: true },
    features: ["Terminal-basiert", "Multi-File-Editing", "Git-Integration", "Open Source", "Mehrere Modelle"],
    pros: ["Kostenlos", "Open Source", "Flexibel", "Git-native", "Viele Modelle"],
    cons: ["Terminal-only", "Steile Lernkurve", "Weniger intuitiv"],
    best_for: ["Open-Source-Fans", "Terminal-User", "Git-Power-User", "Budget"],
    release_date: "2023-05-01",
    website: "https://aider.chat",
  },
];

// Agent Frameworks
export const agentFrameworks = [
  {
    name: "LangChain",
    provider: "LangChain Inc.",
    description: "Framework für LLM-Anwendungen mit Chains, Agents und Memory.",
    language: "Python/JS",
    github_stars: "95k+",
    website: "https://langchain.com",
  },
  {
    name: "LangGraph",
    provider: "LangChain Inc.",
    description: "Erweiterung für LangChain mit Graph-basierten Workflows.",
    language: "Python/JS",
    github_stars: "10k+",
    website: "https://langchain.com/langgraph",
  },
  {
    name: "CrewAI",
    provider: "CrewAI",
    description: "Framework für Multi-Agent-Systeme mit Rollenverteilung.",
    language: "Python",
    github_stars: "25k+",
    website: "https://crewai.com",
  },
  {
    name: "AutoGen",
    provider: "Microsoft",
    description: "Multi-Agent-Framework von Microsoft Research.",
    language: "Python",
    github_stars: "35k+",
    website: "https://microsoft.github.io/autogen",
  },
  {
    name: "LlamaIndex",
    provider: "LlamaIndex",
    description: "Framework für RAG und Daten-Integration mit LLMs.",
    language: "Python",
    github_stars: "40k+",
    website: "https://llamaindex.ai",
  },
  {
    name: "OpenAI Agents SDK",
    provider: "OpenAI",
    description: "Offizielles SDK für OpenAI-Agenten mit Tools und Handoffs.",
    language: "Python",
    github_stars: "15k+",
    website: "https://github.com/openai/openai-agents-python",
    is_new: true,
  },
  {
    name: "Pydantic AI",
    provider: "Pydantic",
    description: "Type-safe Agent-Framework auf Basis von Pydantic.",
    language: "Python",
    github_stars: "8k+",
    website: "https://ai.pydantic.dev",
  },
  {
    name: "SmolAgents",
    provider: "Hugging Face",
    description: "Minimales Agent-Framework von Hugging Face.",
    language: "Python",
    github_stars: "12k+",
    website: "https://github.com/huggingface/smolagents",
  },
];

// Vergleich: Cursor vs Windsurf vs Devin
export const ideComparison = {
  title: "AI IDE Vergleich: Cursor vs Windsurf vs Devin",
  last_updated: "2025-02-24",
  comparison: [
    {
      feature: "Preis/Monat",
      cursor: "$20 (Pro)",
      windsurf: "$15 (Pro)",
      devin: "$500+",
    },
    {
      feature: "Agent-Fähigkeiten",
      cursor: "Sehr gut (Agent-Modus)",
      windsurf: "Sehr gut (Cascade)",
      devin: "Exzellent (Vollautonom)",
    },
    {
      feature: "Monatliche Visits",
      cursor: "14.7M",
      windsurf: "2.7M",
      devin: "552K",
    },
    {
      feature: "Zielgruppe",
      cursor: "Professionelle Entwickler",
      windsurf: "Budget-bewusste Entwickler",
      devin: "Enterprise",
    },
    {
      feature: "Verfügbarkeit",
      cursor: "Sofort",
      windsurf: "Sofort",
      devin: "Warteliste",
    },
  ],
};
