import { Metadata } from "next";
import ModelPageClient from "./ModelPageClient";

// Generate static params for all models
export function generateStaticParams() {
  return [
    { id: "gpt-4-turbo" },
    { id: "claude-3-5-sonnet" },
    { id: "gemini-pro-1-5" },
    { id: "llama-3-1-405b" },
    { id: "kimi-k2-5" },
    { id: "gpt-4o" },
    { id: "claude-3-opus" },
  ];
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const modelNames: Record<string, string> = {
    "gpt-4-turbo": "GPT-4 Turbo",
    "claude-3-5-sonnet": "Claude 3.5 Sonnet",
    "gemini-pro-1-5": "Gemini Pro 1.5",
    "llama-3-1-405b": "Llama 3.1 405B",
    "kimi-k2-5": "Kimi K2.5",
    "gpt-4o": "GPT-4o",
    "claude-3-opus": "Claude 3 Opus",
  };

  const modelDescriptions: Record<string, string> = {
    "gpt-4-turbo": "GPT-4 Turbo Test 2025: Aktuelle Benchmarks, Preise, Vor- & Nachteile. Vergleich mit Claude 3.5, DeepSeek-R1 & Gemini 2.0. Ist GPT-4 Turbo noch das beste KI-Modell für Coding? Aktualisiert: Februar 2025.",
    "claude-3-5-sonnet": "Claude 3.5 Sonnet Test 2025: Der beste LLM für Coding? Benchmarks, Preise, Features. Vergleich mit GPT-4o, DeepSeek-R1 & Grok 3. Perfekt für komplexe Aufgaben & lange Dokumente! Aktualisiert: Februar 2025.",
    "gemini-pro-1-5": "Gemini Pro 1.5 Test 2025: 1 Million Token Kontext! Aktuelle Benchmarks, Preise, Vergleich mit GPT-4o & Claude 3.5. Ist Googles Gemini 2.0 die beste Wahl? Aktualisiert: Februar 2025.",
    "llama-3-1-405b": "Llama 3.3 Test 2025: Kostenloses Open Source LLM! Benchmarks, Hardware-Anforderungen, Vergleich mit GPT-4o & DeepSeek. Die beste Open Source Alternative? Aktualisiert: Februar 2025.",
    "kimi-k2-5": "Kimi K2.5 Test 2025: Das günstigste Top-LLM? Benchmarks, Preise, Features. Vergleich mit Claude 3.5, DeepSeek-V3 & GPT-4o. Bestes Preis-Leistungs-Verhältnis! Aktualisiert: Februar 2025.",
    "gpt-4o": "GPT-4o Test 2025: OpenAIs multimodales Flaggschiff. Benchmarks, Preise, Vergleich mit Claude 3.5 & Gemini 2.0. Echtzeit-Audio, Bildanalyse & mehr! Aktualisiert: Februar 2025.",
    "claude-3-opus": "Claude 3 Opus Test 2025: Anthropics Premium-KI. Benchmarks, Preise, Vergleich mit GPT-4o & DeepSeek-R1. Höchste Qualität für komplexe Aufgaben? Aktualisiert: Februar 2025.",
  };

  const modelKeywords: Record<string, string[]> = {
    "gpt-4-turbo": ["GPT-4 Turbo Test", "GPT-4 Turbo Preis 2025", "GPT-4 vs Claude 3.5", "GPT-4 Turbo Benchmarks", "bestes LLM Coding", "GPT-4 vs DeepSeek", "OpenAI GPT-4"],
    "claude-3-5-sonnet": ["Claude 3.5 Sonnet Test", "Claude 3.5 Benchmarks 2025", "Claude vs GPT-4o", "bestes KI Modell 2025", "Claude Preise", "Claude 3.5 vs DeepSeek", "Anthropic Claude"],
    "gemini-pro-1-5": ["Gemini Pro 1.5 Test", "Google Gemini Benchmarks 2025", "Gemini vs GPT-4o", "1 Million Token Kontext", "Gemini Preise", "Gemini 2.0 Test", "Google AI"],
    "llama-3-1-405b": ["Llama 3.3 Test", "Llama 3.3 Benchmarks 2025", "Open Source LLM", "kostenloses KI Modell", "Llama vs GPT-4o", "Meta Llama", "Open Source AI"],
    "kimi-k2-5": ["Kimi K2.5 Test", "Kimi Benchmarks 2025", "Moonshot AI", "günstiges LLM", "Kimi vs Claude 3.5", "Kimi vs DeepSeek", "China KI Modell"],
    "gpt-4o": ["GPT-4o Test", "GPT-4o Benchmarks 2025", "GPT-4o Preis", "multimodales KI Modell", "GPT-4o vs Claude 3.5", "GPT-4o vs Gemini 2.0", "OpenAI GPT-4o"],
    "claude-3-opus": ["Claude 3 Opus Test", "Claude Opus Benchmarks 2025", "Claude Opus Preis", "beste KI Qualität", "Claude Opus vs GPT-4o", "Claude Opus vs DeepSeek", "Anthropic Opus"],
  };

  const modelName = modelNames[params.id] || "KI-Modell";
  const description = modelDescriptions[params.id] || `Detaillierte Analyse von ${modelName}. Benchmarks, Preise, Vor- und Nachteile. Finde das beste KI-Modell für dein Projekt.`;
  const keywords = modelKeywords[params.id] || ["KI Modell", "LLM Vergleich", modelName];

  return {
    title: `${modelName} Test 2025 | Benchmarks, Preise & Vergleich`,
    description,
    keywords,
    alternates: {
      canonical: `https://agents-ranking.ai/models/${params.id}`,
    },
    openGraph: {
      title: `${modelName} Test 2025 | Benchmarks, Preise & Vergleich`,
      description,
      url: `https://agents-ranking.ai/models/${params.id}`,
    },
  };
}

export default function ModelPage({ params }: { params: { id: string } }) {
  return <ModelPageClient id={params.id} />;
}
