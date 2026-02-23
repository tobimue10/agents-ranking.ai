import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Search, 
  Filter,
  ArrowUpDown,
  Brain,
  Sparkles,
  Palette,
  Video,
  Zap
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Extended models data
const models = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    type: "llm",
    description: "Leistungsstarkes LLM mit 128k Kontextfenster. Hervorragend für Coding und komplexe Aufgaben.",
    context_window: 128000,
    pricing_input: 0.01,
    pricing_output: 0.03,
    api_available: true,
    release_date: "2023-11-06",
    benchmarks: { mmlu: 86.4, humaneval: 87.2, math: 72.9, gpqa: 48.0 },
    features: ["128k Kontext", "JSON Mode", "Function Calling", "Vision"],
    pros: ["Hervorragende Code-Generierung", "Großes Ökosystem", "Zuverlässige API"],
    cons: ["Höherer Preis", "Manchmal übermäßig vorsichtig"],
    best_for: ["Coding", "API-Integration", "Komplexe Aufgaben"],
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    type: "llm",
    description: "Hervorragendes Reasoning und Coding. 200k Kontextfenster für lange Dokumente.",
    context_window: 200000,
    pricing_input: 0.003,
    pricing_output: 0.015,
    api_available: true,
    release_date: "2024-06-20",
    benchmarks: { mmlu: 88.7, humaneval: 92.0, math: 71.1, gpqa: 59.4 },
    features: ["200k Kontext", "Artifacts", "Computer Use", "Vision"],
    pros: ["Exzellentes Reasoning", "Großes Kontextfenster", "Natürliche Konversation"],
    cons: ["Kein Internet-Zugriff", "Manchmal langsam"],
    best_for: ["Recherche", "Dokumentenanalyse", "Schreiben"],
  },
  {
    id: "gemini-pro-1-5",
    name: "Gemini Pro 1.5",
    provider: "Google",
    type: "llm",
    description: "Bis zu 1 Million Token Kontextfenster. Stark in Multimodal-Aufgaben.",
    context_window: 1000000,
    pricing_input: 0.0035,
    pricing_output: 0.0105,
    api_available: true,
    release_date: "2024-02-15",
    benchmarks: { mmlu: 85.9, humaneval: 84.1, math: 67.7, gpqa: 46.0 },
    features: ["1M Kontext", "Multimodal", "Google Integration", "Vision"],
    pros: ["Riesiges Kontextfenster", "Google-Integration", "Multimodal"],
    cons: ["Inkonsistente Ergebnisse", "Weniger beliebt"],
    best_for: ["Lange Dokumente", "Video-Analyse", "Google-Ökosystem"],
  },
  {
    id: "llama-3-1-405b",
    name: "Llama 3.1 405B",
    provider: "Meta",
    type: "llm",
    description: "Open Source LLM mit 405B Parametern. Kostenlos nutzbar für kommerzielle Zwecke.",
    context_window: 128000,
    pricing_input: 0,
    pricing_output: 0,
    api_available: true,
    release_date: "2024-07-23",
    benchmarks: { mmlu: 85.2, humaneval: 89.0, math: 73.0, gpqa: 50.0 },
    features: ["Open Source", "405B Parameter", "Kostenlos", "Commercial Use"],
    pros: ["Kostenlos", "Open Source", "Hohe Privatsphäre"],
    cons: ["Hohe Hardware-Anforderungen", "Komplexe Einrichtung"],
    best_for: ["Selbst-Hosting", "Datenschutz", "Forschung"],
  },
  {
    id: "kimi-k2-5",
    name: "Kimi K2.5",
    provider: "Moonshot AI",
    type: "llm",
    description: "Starke Performance in Coding und Reasoning. 256k Kontextfenster.",
    context_window: 256000,
    pricing_input: 0.002,
    pricing_output: 0.008,
    api_available: true,
    release_date: "2025-01-20",
    benchmarks: { mmlu: 87.2, humaneval: 90.5, math: 75.2, gpqa: 55.0 },
    features: ["256k Kontext", "Coding", "Reasoning", "Vision"],
    pros: ["Sehr günstig", "Langer Kontext", "Starke Performance"],
    cons: ["Weniger bekannt", "Begrenzte Dokumentation"],
    best_for: ["Coding", "Budget-Projekte", "Asiatische Sprachen"],
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    type: "multimodal",
    description: "OpenAIs schnellstes multimodales Modell. Text, Bild und Audio in Echtzeit.",
    context_window: 128000,
    pricing_input: 0.005,
    pricing_output: 0.015,
    api_available: true,
    release_date: "2024-05-13",
    benchmarks: { mmlu: 88.7, humaneval: 90.2, math: 76.6, gpqa: 53.6 },
    features: ["Multimodal", "Echtzeit", "Vision", "Audio"],
    pros: ["Schnell", "Multimodal", "Gute Preis-Leistung"],
    cons: ["Weniger leistungsfähig als Turbo", "Begrenzte Vision"],
    best_for: ["Echtzeit-Anwendungen", "Bildanalyse", "Sprachassistenten"],
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    type: "llm",
    description: "Anthropics leistungsstärkstes Modell für komplexe Aufgaben.",
    context_window: 200000,
    pricing_input: 0.015,
    pricing_output: 0.075,
    api_available: true,
    release_date: "2024-03-04",
    benchmarks: { mmlu: 86.8, humaneval: 84.9, math: 60.1, gpqa: 50.4 },
    features: ["Premium Qualität", "200k Kontext", "Reasoning"],
    pros: ["Höchste Qualität", "Tiefe Analyse", "Kreativität"],
    cons: ["Sehr teuer", "Langsamer"],
    best_for: ["Premium-Projekte", "Kreative Arbeit", "Forschung"],
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "Mistral AI",
    type: "llm",
    description: "Europäisches LLM mit starken multilingualen Fähigkeiten.",
    context_window: 128000,
    pricing_input: 0.003,
    pricing_output: 0.009,
    api_available: true,
    release_date: "2024-02-26",
    benchmarks: { mmlu: 81.2, humaneval: 81.2, math: 61.2, gpqa: 40.0 },
    features: ["Multilingual", "EU-basiert", "128k Kontext"],
    pros: ["EU-Datenschutz", "Gute Preise", "Multilingual"],
    cons: ["Weniger bekannt", "Kleinere Community"],
    best_for: ["EU-Projekte", "Mehrsprachigkeit", "Datenschutz"],
  },
];

const typeColors: Record<string, string> = {
  llm: "bg-blue-500",
  multimodal: "bg-purple-500",
  agent: "bg-green-500",
  image: "bg-pink-500",
  video: "bg-red-500",
  audio: "bg-yellow-500",
};

const typeLabels: Record<string, string> = {
  llm: "LLM",
  multimodal: "Multimodal",
  agent: "Agent",
  image: "Bild",
  video: "Video",
  audio: "Audio",
};

// Generate metadata for SEO
export const metadata = {
  title: "KI Modelle Vergleich 2025 | GPT-4o, Claude 3.5, Gemini, Llama 3.1",
  description: "Vergleiche über 50 KI-Modelle 2025: GPT-4o, Claude 3.5 Sonnet, Gemini Pro 1.5, Llama 3.1 405B, Kimi K2.5 & mehr. Aktuelle Benchmarks, Preise & Features. Finde das beste LLM für Coding, Text & KI-Agents!",
  keywords: ["KI Modelle 2025", "LLM Vergleich", "KI Modelle Vergleich", "GPT-4o", "Claude 3.5", "Gemini Pro", "Llama 3.1", "Kimi K2.5", "bestes KI Modell", "AI Agents", "KI Benchmarks"],
  alternates: {
    canonical: "https://agents-ranking.ai/models",
  },
  openGraph: {
    title: "KI Modelle Vergleich 2025 | GPT-4o, Claude 3.5, Gemini, Llama 3.1",
    description: "Vergleiche über 50 KI-Modelle 2025: GPT-4o, Claude 3.5, Gemini Pro, Llama 3.1 & mehr. Aktuelle Benchmarks & Preise.",
    url: "https://agents-ranking.ai/models",
  },
};

export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <section className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            📊 {models.length}+ Modelle
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KI-Modelle & Agents
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vergleiche die führenden KI-Modelle. Finde das beste Tool für dein Projekt mit 
            detaillierten Benchmarks und Preisvergleichen.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Modelle suchen..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="w-4 h-4" />
                Sortieren
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">LLMs</p>
                <p className="text-sm text-muted-foreground">{models.filter(m => m.type === 'llm').length} Modelle</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Agents</p>
                <p className="text-sm text-muted-foreground">20+ Agents</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="font-medium">Bild-KI</p>
                <p className="text-sm text-muted-foreground">15+ Modelle</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium">Video-KI</p>
                <p className="text-sm text-muted-foreground">8+ Modelle</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <Link key={model.id} href={`/models/${model.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={typeColors[model.type]}>
                      {typeLabels[model.type]}
                    </Badge>
                    <div className="flex gap-1">
                      {model.api_available && (
                        <Badge variant="outline" className="text-xs">API</Badge>
                      )}
                      {model.pricing_input === 0 && (
                        <Badge variant="secondary" className="text-xs">Kostenlos</Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {model.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {model.provider}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {model.description}
                  </p>

                  {/* Benchmarks Preview */}
                  {model.benchmarks && (
                    <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted rounded-lg">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">MMLU</p>
                        <p className="font-bold text-sm">{model.benchmarks.mmlu}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">HumanEval</p>
                        <p className="font-bold text-sm">{model.benchmarks.humaneval}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">MATH</p>
                        <p className="font-bold text-sm">{model.benchmarks.math}%</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2 text-sm">
                    {model.context_window > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kontext:</span>
                        <span className="font-medium">
                          {(model.context_window / 1000).toFixed(0)}k Tokens
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Preis:</span>
                      <span className="font-medium">
                        {model.pricing_input === 0 ? (
                          <Badge variant="secondary" className="text-xs">Kostenlos</Badge>
                        ) : (
                          `$${model.pricing_input}/1M tokens`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Release:</span>
                      <span className="font-medium">
                        {new Date(model.release_date).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-4">
                    {model.best_for.slice(0, 2).map((use) => (
                      <Badge key={use} variant="outline" className="text-xs">
                        {use}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* SEO Content */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle>Der umfassendste LLM Vergleich 2025</CardTitle>
            <CardDescription>
              Finde das beste KI-Modell für dein Projekt
            </CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              agents-ranking.ai bietet den umfassendsten <strong>KI Vergleich</strong> für 
              Large Language Models (LLMs), AI Agents und spezialisierte KI-Tools. Unsere 
              unabhängigen Benchmarks helfen dir, das beste Modell für deine Anforderungen zu finden.
            </p>
            
            <h3 className="text-lg font-semibold mt-4">Beliebte Vergleiche</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Link href="/models/gpt-4-turbo" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <p className="font-medium">GPT-4 Turbo vs Claude 3.5</p>
                <p className="text-sm text-muted-foreground">Der Klassiker unter den LLM-Vergleichen</p>
              </Link>
              <Link href="/models/gemini-pro-1-5" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <p className="font-medium">Gemini Pro 1.5 vs GPT-4</p>
                <p className="text-sm text-muted-foreground">Wer hat das größere Kontextfenster?</p>
              </Link>
              <Link href="/models/llama-3-1-405b" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <p className="font-medium">Llama 3.1 vs kommerzielle Modelle</p>
                <p className="text-sm text-muted-foreground">Open Source vs. Closed Source</p>
              </Link>
              <Link href="/models/kimi-k2-5" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <p className="font-medium">Kimi K2.5 vs Claude 3.5</p>
                <p className="text-sm text-muted-foreground">Das beste Preis-Leistungs-Verhältnis?</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
