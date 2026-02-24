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
    "gpt-4-turbo": "GPT-4 Turbo im Test: Benchmarks, Preise, Vor- & Nachteile 2025. Vergleiche mit Claude 3.5 & Gemini Pro. Ist GPT-4 Turbo das beste KI-Modell für Coding?",
    "claude-3-5-sonnet": "Claude 3.5 Sonnet im Test: Der beste LLM 2025? Benchmarks, Preise, Features. Vergleich mit GPT-4o & Gemini Pro. Perfekt für Coding & lange Dokumente!",
    "gemini-pro-1-5": "Gemini Pro 1.5 Test 2025: 1 Million Token Kontext! Benchmarks, Preise, Vergleich mit GPT-4 & Claude. Ist Googles KI-Modell die beste Wahl?",
    "llama-3-1-405b": "Llama 3.1 405B Test 2025: Kostenloses Open Source LLM! Benchmarks, Hardware-Anforderungen, Vergleich mit GPT-4. Die beste Open Source Alternative?",
    "kimi-k2-5": "Kimi K2.5 Test 2025: Das günstigste Top-LLM? Benchmarks, Preise, Features. Vergleich mit Claude 3.5 & GPT-4. Bestes Preis-Leistungs-Verhältnis!",
    "gpt-4o": "GPT-4o Test 2025: OpenAIs schnellstes multimodales Modell. Benchmarks, Preise, Vergleich mit GPT-4 Turbo. Echtzeit-Audio & Bildanalyse!",
    "claude-3-opus": "Claude 3 Opus Test 2025: Anthropics Premium-KI. Benchmarks, Preise, Vergleich mit GPT-4. Höchste Qualität für komplexe Aufgaben?",
  };

  const modelKeywords: Record<string, string[]> = {
    "gpt-4-turbo": ["GPT-4 Turbo Test", "GPT-4 Turbo Preis", "GPT-4 vs Claude", "GPT-4 Turbo Benchmarks", "bestes LLM Coding"],
    "claude-3-5-sonnet": ["Claude 3.5 Sonnet Test", "Claude 3.5 Benchmarks", "Claude vs GPT-4", "bestes KI Modell 2025", "Claude Preise"],
    "gemini-pro-1-5": ["Gemini Pro 1.5 Test", "Google Gemini Benchmarks", "Gemini vs GPT-4", "1 Million Token Kontext", "Gemini Preise"],
    "llama-3-1-405b": ["Llama 3.1 405B Test", "Llama 3.1 Benchmarks", "Open Source LLM", "kostenloses KI Modell", "Llama vs GPT-4"],
    "kimi-k2-5": ["Kimi K2.5 Test", "Kimi Benchmarks", "Moonshot AI", "günstiges LLM", "Kimi vs Claude"],
    "gpt-4o": ["GPT-4o Test", "GPT-4o Benchmarks", "GPT-4o Preis", "multimodales KI Modell", "GPT-4o vs GPT-4 Turbo"],
    "claude-3-opus": ["Claude 3 Opus Test", "Claude Opus Benchmarks", "Claude Opus Preis", "beste KI Qualität", "Anthropic Claude"],
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
