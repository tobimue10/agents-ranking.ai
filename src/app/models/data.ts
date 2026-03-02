/**
 * AI Models data for agents-ranking.ai
 * Centralized data source for all AI model information
 * Last updated: 2026-03-02
 */

import type { AIModel, ModelType } from '@/types/model';

// Type colors and labels for UI
export const TYPE_COLORS: Record<ModelType, string> = {
  llm: 'bg-blue-500',
  multimodal: 'bg-purple-500',
  agent: 'bg-green-500',
  image: 'bg-pink-500',
  video: 'bg-red-500',
  audio: 'bg-yellow-500',
};

export const TYPE_LABELS: Record<ModelType, string> = {
  llm: 'LLM',
  multimodal: 'Multimodal',
  agent: 'Agent',
  image: 'Bild',
  video: 'Video',
  audio: 'Audio',
};

// Heute: 2026-03-02
// Archiv-Grenze: 2025-09-02 (6 Monate zurück)

export const models: AIModel[] = [
  // === AKTIVE MODELLE (nicht älter als 6 Monate) ===
  
  // Google Gemini 3.1 Pro - NEU (2026-02-19)
  {
    id: 'gemini-3-1-pro',
    name: 'Gemini 3.1 Pro',
    provider: 'Google',
    type: 'multimodal',
    description: 'Googles leistungsstärkstes Modell mit 77.1% auf ARC-AGI-2. 1M Token Kontextfenster.',
    context_window: 1000000,
    pricing_input: 2.00,
    pricing_output: 12.00,
    api_available: true,
    release_date: '2026-02-19',
    benchmarks: { mmlu: 91.8, humaneval: 80.6, math: 94.3, gpqa: 94.3 },
    features: ['1M Kontext', 'Multimodal', 'ARC-AGI-2 Leader', 'Vision', 'Agentic'],
    pros: ['Beste Reasoning-Fähigkeiten', 'Riesiges Kontextfenster', 'Hervorragende Coding-Performance'],
    cons: ['Hoher Preis', 'Beta-Status'],
    best_for: ['Komplexe Reasoning-Aufgaben', 'Agentic Coding', 'Lange Dokumente'],
    is_archived: false,
  },
  
  // Claude Opus 4.6 - NEU (2026-02-05)
  {
    id: 'claude-opus-4-6',
    name: 'Claude Opus 4.6',
    provider: 'Anthropic',
    type: 'llm',
    description: 'Anthropics leistungsstärkstes Modell. Führend bei Humanity\'s Last Exam und Terminal-Bench 2.0.',
    context_window: 1000000,
    pricing_input: 5.00,
    pricing_output: 25.00,
    api_available: true,
    release_date: '2026-02-05',
    benchmarks: { mmlu: 91.0, humaneval: 80.8, math: 91.3, gpqa: 91.3 },
    features: ['1M Kontext (Beta)', 'Agent Teams', 'Computer Use', 'Adaptive Thinking'],
    pros: ['Beste Coding-Performance', 'Hervorragendes Reasoning', 'Lange Kontexte'],
    cons: ['Sehr teuer', 'Langsame Antworten'],
    best_for: ['Premium Coding', 'Forschung', 'Komplexe Agenten-Aufgaben'],
    is_archived: false,
  },
  
  // Claude Sonnet 4.6 - NEU (2026-02-17)
  {
    id: 'claude-sonnet-4-6',
    name: 'Claude Sonnet 4.6',
    provider: 'Anthropic',
    type: 'llm',
    description: 'Opus-level Performance bei deutlich niedrigerem Preis. 1M Token Kontext in Beta.',
    context_window: 1000000,
    pricing_input: 3.00,
    pricing_output: 15.00,
    api_available: true,
    release_date: '2026-02-17',
    benchmarks: { mmlu: 90.2, humaneval: 79.6, math: 89.9, gpqa: 89.9 },
    features: ['1M Kontext (Beta)', 'Computer Use', 'Artifacts', 'Vision'],
    pros: ['Hervorragendes Preis-Leistungs-Verhältnis', 'Weniger Overengineering', 'Bessere Instruction Following'],
    cons: ['Beta-Kontextfenster', 'Manchmal langsam'],
    best_for: ['Coding', 'Dokumentenanalyse', 'Agentic Workflows'],
    is_archived: false,
  },
  
  // GPT-5.2 - (2025-11)
  {
    id: 'gpt-5-2',
    name: 'GPT-5.2',
    provider: 'OpenAI',
    type: 'llm',
    description: 'OpenAIs intelligentestes Reasoning-Modell mit konfigurierbarem Reasoning-Aufwand.',
    context_window: 128000,
    pricing_input: 2.00,
    pricing_output: 10.00,
    api_available: true,
    release_date: '2025-11-01',
    benchmarks: { mmlu: 90.5, humaneval: 80.0, math: 92.4, gpqa: 92.4 },
    features: ['128k Kontext', 'Konfigurierbares Reasoning', 'Vision', 'JSON Mode'],
    pros: ['Hervorragende Reasoning-Fähigkeiten', 'Flexibel einstellbar', 'Zuverlässige API'],
    cons: ['Höherer Preis', 'Kann überdenken'],
    best_for: ['Komplexe Reasoning-Aufgaben', 'Coding', 'Forschung'],
    is_archived: false,
  },
  
  // GPT-5.3-Codex - NEU (2026-02-05)
  {
    id: 'gpt-5-3-codex',
    name: 'GPT-5.3-Codex',
    provider: 'OpenAI',
    type: 'agent',
    description: 'Der fähigste agentische Coding-Modell. 77.3% auf Terminal-Bench 2.0, 56.8% auf SWE-Bench Pro.',
    context_window: 128000,
    pricing_input: 1.75,
    pricing_output: 14.00,
    api_available: true,
    release_date: '2026-02-05',
    benchmarks: { mmlu: 88.0, humaneval: 77.3, math: 85.0, gpqa: 85.0 },
    features: ['Agentic Coding', 'Terminal-Bench Leader', 'OSWorld', 'Vision'],
    pros: ['Beste agentische Coding-Performance', '25% schneller', 'End-to-End Software-Entwicklung'],
    cons: ['Hoher Output-Preis', 'Begrenzte Verfügbarkeit'],
    best_for: ['Agentic Coding', 'Software-Entwicklung', 'Debugging'],
    is_archived: false,
  },
  
  // Gemini 3 Flash - NEU (2026-02-05)
  {
    id: 'gemini-3-flash',
    name: 'Gemini 3 Flash',
    provider: 'Google',
    type: 'multimodal',
    description: 'Schnelles multimodales Modell mit 1M Token Kontextfenster.',
    context_window: 1000000,
    pricing_input: 0.50,
    pricing_output: 3.00,
    api_available: true,
    release_date: '2026-02-05',
    benchmarks: { mmlu: 88.0, humaneval: 76.2, math: 91.9, gpqa: 91.9 },
    features: ['1M Kontext', 'Multimodal', 'Schnell', 'Vision'],
    pros: ['Sehr günstig', 'Riesiges Kontextfenster', 'Schnell'],
    cons: ['Weniger leistungsfähig als Pro', 'Beta-Status'],
    best_for: ['Budget-Projekte', 'Schnelle Antworten', 'Multimodale Aufgaben'],
    is_archived: false,
  },
  
  // GPT-5.1 - (2025-11-13)
  {
    id: 'gpt-5-1',
    name: 'GPT-5.1',
    provider: 'OpenAI',
    type: 'llm',
    description: 'Verbesserte Version von GPT-5 mit konfigurierbarem Reasoning.',
    context_window: 128000,
    pricing_input: 1.25,
    pricing_output: 10.00,
    api_available: true,
    release_date: '2025-11-13',
    benchmarks: { mmlu: 89.8, humaneval: 78.0, math: 90.0, gpqa: 90.0 },
    features: ['128k Kontext', 'Konfigurierbares Reasoning', 'Vision'],
    pros: ['Gute Preis-Leistung', 'Flexibel', 'Zuverlässig'],
    cons: ['Nicht das neueste Modell'],
    best_for: ['Allgemeine Aufgaben', 'Coding', 'Reasoning'],
    is_archived: false,
  },
  
  // GPT-5 - (2025-11)
  {
    id: 'gpt-5',
    name: 'GPT-5',
    provider: 'OpenAI',
    type: 'llm',
    description: 'OpenAis neueste GPT-Generation mit verbessertem Reasoning.',
    context_window: 128000,
    pricing_input: 1.50,
    pricing_output: 6.00,
    api_available: true,
    release_date: '2025-11-01',
    benchmarks: { mmlu: 89.5, humaneval: 75.0, math: 88.0, gpqa: 88.0 },
    features: ['128k Kontext', 'Reasoning', 'Vision', 'JSON Mode'],
    pros: ['Gute Allround-Performance', 'Zuverlässige API'],
    cons: ['Von neueren Modellen übertroffen'],
    best_for: ['Allgemeine Aufgaben', 'Coding', 'Text-Generierung'],
    is_archived: false,
  },
  
  // Kimi K2.5 - (2026-01-27)
  {
    id: 'kimi-k2-5',
    name: 'Kimi K2.5',
    provider: 'Moonshot AI',
    type: 'llm',
    description: 'Starke Performance in Coding und Reasoning mit Visual Agentic Intelligence.',
    context_window: 256000,
    pricing_input: 2.00,
    pricing_output: 8.00,
    api_available: true,
    release_date: '2026-01-27',
    benchmarks: { mmlu: 87.2, humaneval: 90.5, math: 75.2, gpqa: 55.0 },
    features: ['256k Kontext', 'Coding', 'Reasoning', 'Vision', 'Agentic'],
    pros: ['Sehr günstig', 'Langer Kontext', 'Starke Performance'],
    cons: ['Weniger bekannt', 'Begrenzte Dokumentation'],
    best_for: ['Coding', 'Budget-Projekte', 'Asiatische Sprachen'],
    is_archived: false,
  },
  
  // === ARCHIVIERTE MODELLE (älter als 6 Monate) ===
  
  // GPT-4 Turbo - ARCHIVIERT (2023-11-06)
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    type: 'llm',
    description: 'Leistungsstarkes LLM mit 128k Kontextfenster. Hervorragend für Coding und komplexe Aufgaben.',
    context_window: 128000,
    pricing_input: 0.01,
    pricing_output: 0.03,
    api_available: true,
    release_date: '2023-11-06',
    benchmarks: { mmlu: 86.4, humaneval: 87.2, math: 72.9, gpqa: 48.0 },
    features: ['128k Kontext', 'JSON Mode', 'Function Calling', 'Vision'],
    pros: ['Hervorragende Code-Generierung', 'Großes Ökosystem', 'Zuverlässige API'],
    cons: ['Veraltet', 'Von neueren Modellen übertroffen'],
    best_for: ['Legacy-Projekte'],
    is_archived: true,
  },
  
  // Claude 3.5 Sonnet - ARCHIVIERT (2024-06-20)
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    type: 'llm',
    description: 'Hervorragendes Reasoning und Coding. 200k Kontextfenster für lange Dokumente.',
    context_window: 200000,
    pricing_input: 0.003,
    pricing_output: 0.015,
    api_available: true,
    release_date: '2024-06-20',
    benchmarks: { mmlu: 88.7, humaneval: 92.0, math: 71.1, gpqa: 59.4 },
    features: ['200k Kontext', 'Artifacts', 'Computer Use', 'Vision'],
    pros: ['Exzellentes Reasoning', 'Großes Kontextfenster', 'Natürliche Konversation'],
    cons: ['Veraltet', 'Durch Sonnet 4.6 ersetzt'],
    best_for: ['Legacy-Projekte'],
    is_archived: true,
  },
  
  // Gemini Pro 1.5 - ARCHIVIERT (2024-02-15)
  {
    id: 'gemini-pro-1-5',
    name: 'Gemini Pro 1.5',
    provider: 'Google',
    type: 'llm',
    description: 'Bis zu 1 Million Token Kontextfenster. Stark in Multimodal-Aufgaben.',
    context_window: 1000000,
    pricing_input: 0.0035,
    pricing_output: 0.0105,
    api_available: true,
    release_date: '2024-02-15',
    benchmarks: { mmlu: 85.9, humaneval: 84.1, math: 67.7, gpqa: 46.0 },
    features: ['1M Kontext', 'Multimodal', 'Google Integration', 'Vision'],
    pros: ['Riesiges Kontextfenster', 'Google-Integration', 'Multimodal'],
    cons: ['Veraltet', 'Durch Gemini 3 ersetzt'],
    best_for: ['Legacy-Projekte'],
    is_archived: true,
  },
  
  // Llama 3.1 405B - ARCHIVIERT (2024-07-23)
  {
    id: 'llama-3-1-405b',
    name: 'Llama 3.1 405B',
    provider: 'Meta',
    type: 'llm',
    description: 'Open Source LLM mit 405B Parametern. Kostenlos nutzbar für kommerzielle Zwecke.',
    context_window: 128000,
    pricing_input: 0,
    pricing_output: 0,
    api_available: true,
    release_date: '2024-07-23',
    benchmarks: { mmlu: 85.2, humaneval: 89.0, math: 73.0, gpqa: 50.0 },
    features: ['Open Source', '405B Parameter', 'Kostenlos', 'Commercial Use'],
    pros: ['Kostenlos', 'Open Source', 'Hohe Privatsphäre'],
    cons: ['Veraltet', 'Hohe Hardware-Anforderungen'],
    best_for: ['Selbst-Hosting', 'Forschung'],
    is_archived: true,
  },
  
  // GPT-4o - ARCHIVIERT (2024-05-13)
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    type: 'multimodal',
    description: 'OpenAIs schnellstes multimodales Modell. Text, Bild und Audio in Echtzeit.',
    context_window: 128000,
    pricing_input: 0.005,
    pricing_output: 0.015,
    api_available: true,
    release_date: '2024-05-13',
    benchmarks: { mmlu: 88.7, humaneval: 90.2, math: 76.6, gpqa: 53.6 },
    features: ['Multimodal', 'Echtzeit', 'Vision', 'Audio'],
    pros: ['Schnell', 'Multimodal', 'Gute Preis-Leistung'],
    cons: ['Veraltet', 'Durch GPT-5-Familie ersetzt'],
    best_for: ['Legacy-Projekte'],
    is_archived: true,
  },
  
  // Claude 3 Opus - ARCHIVIERT (2024-03-04)
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    type: 'llm',
    description: 'Anthropics leistungsstärkstes Modell für komplexe Aufgaben.',
    context_window: 200000,
    pricing_input: 0.015,
    pricing_output: 0.075,
    api_available: true,
    release_date: '2024-03-04',
    benchmarks: { mmlu: 86.8, humaneval: 84.9, math: 60.1, gpqa: 50.4 },
    features: ['Premium Qualität', '200k Kontext', 'Reasoning'],
    pros: ['Höchste Qualität', 'Tiefe Analyse', 'Kreativität'],
    cons: ['Veraltet', 'Durch Opus 4.6 ersetzt'],
    best_for: ['Legacy-Projekte'],
    is_archived: true,
  },
  
  // Mistral Large - ARCHIVIERT (2024-02-26)
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral AI',
    type: 'llm',
    description: 'Europäisches LLM mit starken multilingualen Fähigkeiten.',
    context_window: 128000,
    pricing_input: 0.003,
    pricing_output: 0.009,
    api_available: true,
    release_date: '2024-02-26',
    benchmarks: { mmlu: 81.2, humaneval: 81.2, math: 61.2, gpqa: 40.0 },
    features: ['Multilingual', 'EU-basiert', '128k Kontext'],
    pros: ['EU-Datenschutz', 'Gute Preise', 'Multilingual'],
    cons: ['Veraltet', 'Weniger bekannt'],
    best_for: ['Legacy-Projekte'],
    is_archived: true,
  },
];

/**
 * Get models by type
 */
export function getModelsByType(type: AIModel['type']): AIModel[] {
  return models.filter((model) => model.type === type);
}

/**
 * Get model by ID
 */
export function getModelById(id: string): AIModel | undefined {
  return models.find((model) => model.id === id);
}

/**
 * Get unique providers
 */
export function getUniqueProviders(): string[] {
  const providers = models.map((model) => model.provider);
  return Array.from(new Set(providers));
}

/**
 * Get models count by type
 */
export function getModelsCountByType(type: AIModel['type']): number {
  return models.filter((model) => model.type === type).length;
}

/**
 * Format context window for display
 */
export function formatContextWindow(tokens: number): string {
  return `${(tokens / 1000).toFixed(0)}k Tokens`;
}

/**
 * Format pricing for display
 */
export function formatPricing(price: number): string {
  if (price === 0) return 'Kostenlos';
  return `$${price}/1M tokens`;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('de-DE');
}

/**
 * Get active models (not archived)
 */
export function getActiveModels(): AIModel[] {
  return models.filter((model) => !model.is_archived);
}

/**
 * Get archived models
 */
export function getArchivedModels(): AIModel[] {
  return models.filter((model) => model.is_archived);
}

/**
 * Get top 5 models by MMLU score (active only)
 * Sort: MMLU desc, then GPQA desc, then release_date desc
 */
export function getTop5Models(): AIModel[] {
  return getActiveModels()
    .sort((a, b) => {
      // Primary: MMLU (higher first)
      if (b.benchmarks.mmlu !== a.benchmarks.mmlu) {
        return b.benchmarks.mmlu - a.benchmarks.mmlu;
      }
      // Secondary: GPQA (higher first)
      if (b.benchmarks.gpqa !== a.benchmarks.gpqa) {
        return b.benchmarks.gpqa - a.benchmarks.gpqa;
      }
      // Tertiary: Release date (newer first)
      return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    })
    .slice(0, 5);
}
