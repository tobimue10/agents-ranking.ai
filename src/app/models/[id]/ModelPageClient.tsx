"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  ExternalLink, 
  Check, 
  X, 
  Star,
  Code,
  FileText,
  Calculator,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Zap,
  Globe,
  Cpu,
  DollarSign,
  Calendar,
  BarChart3
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface Props {
  id: string;
}

// Extended models data
const models: Record<string, Record<string, unknown>> = {
  "gpt-4-turbo": {
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    type: "llm",
    description: "Leistungsstarkes LLM mit 128k Kontextfenster. Hervorragend für Coding, komplexe Aufgaben und kreative Projekte. GPT-4 Turbo bietet eine signifikante Verbesserung gegenüber dem Standard GPT-4, insbesondere bei der Verarbeitung langer Dokumente.",
    context_window: 128000,
    pricing_input: 0.01,
    pricing_output: 0.03,
    api_available: true,
    website_url: "https://openai.com/gpt-4",
    release_date: "2023-11-06",
    features: ["128k Kontext", "JSON Mode", "Function Calling", "Vision", "DALL-E Integration"],
    pros: [
      "Hervorragende Code-Generierung und Debugging",
      "Großes Ökosystem mit vielen Integrationen",
      "Zuverlässige API mit hoher Verfügbarkeit",
      "Ausgezeichnete Dokumentation",
      "Starke Community-Unterstützung"
    ],
    cons: [
      "Höherer Preis als Konkurrenten",
      "Manchmal übermäßig vorsichtig bei sensiblen Themen",
      "Kein Internet-Zugriff in Echtzeit",
      "Trainingsdaten haben Cutoff-Datum"
    ],
    best_for: ["Coding", "API-Integration", "Komplexe Aufgaben", "Content-Erstellung"],
    benchmarks: { 
      mmlu: 86.4, 
      humaneval: 87.2, 
      math: 72.9, 
      gpqa: 48.0,
      drop: 80.9,
      gsm8k: 92.0
    },
    use_cases: [
      { title: "Software-Entwicklung", description: "Code-Generierung, Debugging, Code-Review" },
      { title: "Content-Marketing", description: "Blog-Artikel, Social Media, E-Mail-Marketing" },
      { title: "Datenanalyse", description: "CSV-Analyse, Berichte, Visualisierungen" },
      { title: "Kundenservice", description: "Chatbots, Ticket-Klassifizierung, Antworten" }
    ],
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    related_models: ["claude-3-5-sonnet", "gpt-4o", "gemini-pro-1-5"]
  },
  "claude-3-5-sonnet": {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    type: "llm",
    description: "Hervorragendes Reasoning und Coding. Claude 3.5 Sonnet überzeugt durch seine Fähigkeit, komplexe Probleme zu analysieren und präzise Lösungen zu liefern. Mit 200k Kontextfenster ideal für lange Dokumente.",
    context_window: 200000,
    pricing_input: 0.003,
    pricing_output: 0.015,
    api_available: true,
    website_url: "https://anthropic.com/claude",
    release_date: "2024-06-20",
    features: ["200k Kontext", "Artifacts", "Computer Use", "Vision", "Constitutional AI"],
    pros: [
      "Exzellentes Reasoning und logisches Denken",
      "Großes Kontextfenster für lange Dokumente",
      "Natürliche, menschenähnliche Konversation",
      "Hervorragende Anweisungsbefolgung",
      "Sichere und verlässliche Ausgaben"
    ],
    cons: [
      "Kein Internet-Zugriff",
      "Manchmal langsamer als Konkurrenten",
      "Weniger Integrationen als OpenAI",
      "Keine native Bildgenerierung"
    ],
    best_for: ["Recherche", "Dokumentenanalyse", "Schreiben", "Reasoning"],
    benchmarks: { 
      mmlu: 88.7, 
      humaneval: 92.0, 
      math: 71.1, 
      gpqa: 59.4,
      drop: 83.1,
      gsm8k: 91.6
    },
    use_cases: [
      { title: "Wissenschaftliche Recherche", description: "Paper-Analyse, Literatur-Reviews, Zusammenfassungen" },
      { title: "Rechtliche Dokumente", description: "Vertragsanalyse, Compliance, Due Diligence" },
      { title: "Kreatives Schreiben", description: "Romane, Drehbücher, Geschichten" },
      { title: "Bildungsinhalte", description: "Tutorien, Erklärungen, Lernmaterialien" }
    ],
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    related_models: ["gpt-4-turbo", "claude-3-opus", "kimi-k2-5"]
  },
  "gemini-pro-1-5": {
    name: "Gemini Pro 1.5",
    provider: "Google",
    type: "llm",
    description: "Bis zu 1 Million Token Kontextfenster. Gemini Pro 1.5 ist ein Meisterwerk der Effizienz und bietet unerreichte Fähigkeiten in der Verarbeitung extrem langer Dokumente und Multimodal-Aufgaben.",
    context_window: 1000000,
    pricing_input: 0.0035,
    pricing_output: 0.0105,
    api_available: true,
    website_url: "https://deepmind.google/gemini",
    release_date: "2024-02-15",
    features: ["1M Kontext", "Multimodal", "Google Integration", "Vision", "Audio"],
    pros: [
      "Riesiges Kontextfenster (bis zu 1M Tokens)",
      "Nahtlose Google-Workspace-Integration",
      "Starke Multimodal-Fähigkeiten",
      "Wettbewerbsfähige Preise",
      "Schnelle Verarbeitung"
    ],
    cons: [
      "Inkonsistente Ergebnisse bei komplexen Aufgaben",
      "Weniger beliebt in der Entwickler-Community",
      "Eingeschränkte Verfügbarkeit in manchen Regionen",
      "Weniger ausgereifte API-Dokumentation"
    ],
    best_for: ["Lange Dokumente", "Video-Analyse", "Google-Ökosystem", "Multimodal"],
    benchmarks: { 
      mmlu: 85.9, 
      humaneval: 84.1, 
      math: 67.7, 
      gpqa: 46.0,
      drop: 74.4,
      gsm8k: 87.8
    },
    use_cases: [
      { title: "Video-Analyse", description: "Stundenlange Videos verstehen und zusammenfassen" },
      { title: "Codebases", description: "Gesamte Repositories analysieren und verstehen" },
      { title: "Bücher", description: "Romane, Fachbücher, Archive durchsuchen" },
      { title: "Forschungsdaten", description: "Große Datensätze analysieren" }
    ],
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    related_models: ["gpt-4-turbo", "gemini-ultra", "claude-3-5-sonnet"]
  },
  "llama-3-1-405b": {
    name: "Llama 3.1 405B",
    provider: "Meta",
    type: "llm",
    description: "Open Source LLM mit 405B Parametern. Kostenlos nutzbar für kommerzielle Zwecke. Llama 3.1 405B ist das größte Open-Source-Modell und bietet Performance auf Augenhöhe mit kommerziellen Alternativen.",
    context_window: 128000,
    pricing_input: 0,
    pricing_output: 0,
    api_available: true,
    website_url: "https://llama.meta.com",
    release_date: "2024-07-23",
    features: ["Open Source", "405B Parameter", "Kostenlos", "Commercial Use", "Multilingual"],
    pros: [
      "Vollständig kostenlos und Open Source",
      "Hohe Privatsphäre durch Self-Hosting",
      "Volle Kontrolle über das Modell",
      "Keine API-Limits oder Rate-Limits",
      "Starke Community und Ökosystem"
    ],
    cons: [
      "Hohe Hardware-Anforderungen (mehrere GPUs)",
      "Komplexe Einrichtung und Wartung",
      "Kein offizieller Support",
      "Aufwand für Sicherheitsupdates"
    ],
    best_for: ["Selbst-Hosting", "Datenschutz", "Forschung", "Enterprise"],
    benchmarks: { 
      mmlu: 85.2, 
      humaneval: 89.0, 
      math: 73.0, 
      gpqa: 50.0,
      drop: 78.5,
      gsm8k: 89.0
    },
    use_cases: [
      { title: "On-Premise Deployment", description: "Volle Datenkontrolle im eigenen Rechenzentrum" },
      { title: "Forschung", description: "Modell-Training, Fine-Tuning, Experimente" },
      { title: "Enterprise", description: "Interne Tools ohne Datenweitergabe" },
      { title: "Bildung", description: "Lehrmittel, kostenlose KI-Zugänge" }
    ],
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    related_models: ["gpt-4-turbo", "mixtral-8x22b", "qwen-2-72b"]
  },
  "kimi-k2-5": {
    name: "Kimi K2.5",
    provider: "Moonshot AI",
    type: "llm",
    description: "Starke Performance in Coding und Reasoning. Kimi K2.5 überzeugt durch seine Effizienz und Präzision bei komplexen Aufgaben. Mit 256k Kontextfenster ideal für Entwickler und technische Anwendungen.",
    context_window: 256000,
    pricing_input: 0.002,
    pricing_output: 0.008,
    api_available: true,
    website_url: "https://kimi.moonshot.cn",
    release_date: "2025-01-20",
    features: ["256k Kontext", "Coding", "Reasoning", "Vision", "Long Context"],
    pros: [
      "Sehr günstiger Preis",
      "Langer Kontext (256k)",
      "Starke Coding-Performance",
      "Schnelle Antwortzeiten",
      "Gute asiatische Sprachunterstützung"
    ],
    cons: [
      "Weniger bekannt außerhalb Asiens",
      "Begrenzte Dokumentation auf Englisch",
      "Kleinere Community",
      "Weniger Integrationen"
    ],
    best_for: ["Coding", "Budget-Projekte", "Asiatische Sprachen", "Lange Dokumente"],
    benchmarks: { 
      mmlu: 87.2, 
      humaneval: 90.5, 
      math: 75.2, 
      gpqa: 55.0,
      drop: 81.2,
      gsm8k: 93.5
    },
    use_cases: [
      { title: "Coding", description: "Code-Generierung, Debugging, Refactoring" },
      { title: "Budget-Projekte", description: "Kostengünstige KI-Integration" },
      { title: "Dokumentenverarbeitung", description: "Lange Texte analysieren" },
      { title: "Mehrsprachige Anwendungen", description: "Chinesisch, Englisch, weitere Sprachen" }
    ],
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    related_models: ["claude-3-5-sonnet", "gpt-4-turbo", "gemini-pro-1-5"]
  },
  "gpt-4o": {
    name: "GPT-4o",
    provider: "OpenAI",
    type: "multimodal",
    description: "OpenAIs schnellstes multimodales Modell. Text, Bild und Audio in Echtzeit. GPT-4o ('o' für 'omni') ist das vielseitigste Modell von OpenAI.",
    context_window: 128000,
    pricing_input: 0.005,
    pricing_output: 0.015,
    api_available: true,
    website_url: "https://openai.com/gpt-4o",
    release_date: "2024-05-13",
    features: ["Multimodal", "Echtzeit", "Vision", "Audio", "Schnell"],
    pros: [
      "Sehr schnelle Antwortzeiten",
      "Echte Multimodalität (Text, Bild, Audio)",
      "Gute Preis-Leistung",
      "Hervorragende Vision-Fähigkeiten",
      "Natürliche Sprachinteraktion"
    ],
    cons: [
      "Weniger leistungsfähig als GPT-4 Turbo bei komplexen Aufgaben",
      "Begrenzte Vision bei Detail-Erkennung",
      "Audio noch nicht in allen Regionen verfügbar"
    ],
    best_for: ["Echtzeit-Anwendungen", "Bildanalyse", "Sprachassistenten", "Chatbots"],
    benchmarks: { 
      mmlu: 88.7, 
      humaneval: 90.2, 
      math: 76.6, 
      gpqa: 53.6,
      drop: 83.4,
      gsm8k: 95.8
    },
    use_cases: [
      { title: "Sprachassistenten", description: "Natürliche Sprachinteraktion in Echtzeit" },
      { title: "Bildanalyse", description: "Objekterkennung, OCR, Diagramme lesen" },
      { title: "Live-Chat", description: "Schnelle Kundenservice-Interaktionen" },
      { title: "Bildbeschreibung", description: "Detaillierte Bildanalyse und Beschreibung" }
    ],
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    related_models: ["gpt-4-turbo", "claude-3-5-sonnet", "gemini-pro-1-5"]
  },
  "claude-3-opus": {
    name: "Claude 3 Opus",
    provider: "Anthropic",
    type: "llm",
    description: "Anthropics leistungsstärkstes Modell für komplexe Aufgaben. Claude 3 Opus bietet die höchste Qualität bei anspruchsvollen Reasoning-Aufgaben.",
    context_window: 200000,
    pricing_input: 0.015,
    pricing_output: 0.075,
    api_available: true,
    website_url: "https://anthropic.com/claude",
    release_date: "2024-03-04",
    features: ["Premium Qualität", "200k Kontext", "Reasoning", "Vision"],
    pros: [
      "Höchste Qualität bei komplexen Aufgaben",
      "Tiefe Analyse und Durchdringung",
      "Hervorragende Kreativität",
      "Sehr gute Anweisungsbefolgung",
      "Zuverlässige Ergebnisse"
    ],
    cons: [
      "Sehr teuer im Vergleich zu Konkurrenten",
      "Langsamere Antwortzeiten",
      "Overkill für einfache Aufgaben",
      "Hohe Kosten bei großen Volumen"
    ],
    best_for: ["Premium-Projekte", "Kreative Arbeit", "Forschung", "Strategie"],
    benchmarks: { 
      mmlu: 86.8, 
      humaneval: 84.9, 
      math: 60.1, 
      gpqa: 50.4,
      drop: 79.0,
      gsm8k: 90.4
    },
    use_cases: [
      { title: "Strategieberatung", description: "Komplexe Geschäftsanalysen und Empfehlungen" },
      { title: "Wissenschaftliche Forschung", description: "Hypothesen-Generierung, Experiment-Design" },
      { title: "Kreative Projekte", description: "Hochwertige Inhalte, Kunst, Design" },
      { title: "Architektur-Reviews", description: "System-Design, Code-Architektur" }
    ],
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    related_models: ["claude-3-5-sonnet", "gpt-4-turbo", "gemini-ultra"]
  },
};

export default function ModelPageClient({ id }: Props) {
  const model = models[id] as {
    name: string;
    provider: string;
    type: string;
    description: string;
    context_window: number;
    pricing_input: number;
    pricing_output: number;
    api_available: boolean;
    website_url: string;
    release_date: string;
    features: string[];
    pros: string[];
    cons: string[];
    best_for: string[];
    benchmarks: Record<string, number>;
    use_cases: Array<{ title: string; description: string }>;
    video_url: string;
    related_models: string[];
  } | undefined;
  
  if (!model) {
    notFound();
  }

  const shareUrl = `https://agents-ranking.ai/models/${id}`;
  const shareText = `Schau dir ${model.name} auf agents-ranking.ai an - der beste KI Vergleich!`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <section className="container mx-auto px-4 py-12">
        {/* Back Button & Share */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/models">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Übersicht
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Teilen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Teile {model.name}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <Twitter className="w-6 h-6 text-blue-400" />
                  <span className="text-sm">Twitter</span>
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-blue-700" />
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <Facebook className="w-6 h-6 text-blue-600" />
                  <span className="text-sm">Facebook</span>
                </a>
              </div>
              <div className="mt-4">
                <Label>Link kopieren</Label>
                <div className="flex gap-2 mt-2">
                  <Input value={shareUrl} readOnly />
                  <Button 
                    variant="outline" 
                    onClick={() => navigator.clipboard.writeText(shareUrl)}
                  >
                    Kopieren
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Badge className="text-lg px-3 py-1">{model.type.toUpperCase()}</Badge>
            {model.api_available && <Badge variant="outline">API Verfügbar</Badge>}
            {model.pricing_input === 0 && <Badge variant="secondary">Kostenlos</Badge>}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{model.name}</h1>
          <div className="flex items-center gap-2 text-xl text-muted-foreground">
            <Zap className="w-5 h-5" />
            {model.provider}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Überblick
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">{model.description}</p>
                
                {/* Interne Verlinkung zu Vergleichen */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-3">Direkte Vergleiche:</p>
                  <div className="flex flex-wrap gap-2">
                    {model.related_models.slice(0, 3).map((relatedId) => {
                      const related = models[relatedId];
                      if (!related) return null;
                      return (
                        <Link key={relatedId} href={`/models/${relatedId}`}>
                          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                            vs {related.name as string} →
                          </Badge>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {model.features.map((feature) => (
                    <Badge key={feature} variant="secondary">{feature}</Badge>
                  ))}
                </div>
                
                <div className="mt-6">
                  <a 
                    href={model.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button className="gap-2">
                      <Globe className="w-4 h-4" />
                      Zur Website
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Video Section */}
            <Card>
              <CardHeader>
                <CardTitle>Video Review & Tutorial</CardTitle>
                <CardDescription>
                  Lerne {model.name} in Aktion kennen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={model.video_url}
                    title={`${model.name} Review`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    Vorteile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {model.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <X className="w-5 h-5" />
                    Nachteile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {model.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Benchmarks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Benchmarks
                </CardTitle>
                <CardDescription>
                  Leistung in unabhängigen Tests - Vergleiche alle Modelle in unserem <Link href="/benchmarks" className="text-primary hover:underline">Benchmark-Überblick</Link>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(model.benchmarks).map(([name, score]) => (
                    <div 
                      key={name}
                      className="p-4 bg-muted rounded-lg text-center"
                    >
                      <p className="text-sm text-muted-foreground uppercase">{name}</p>
                      <p className="text-3xl font-bold mt-1">{score}%</p>
                      <div className="w-full bg-background rounded-full h-2 mt-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Benchmark-Erklärungen</h4>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="font-medium">MMLU</dt>
                      <dd className="text-muted-foreground">Massive Multitask Language Understanding - Wissen in 57 Fächern</dd>
                    </div>
                    <div>
                      <dt className="font-medium">HumanEval</dt>
                      <dd className="text-muted-foreground">Code-Generierung und Problemlösung</dd>
                    </div>
                    <div>
                      <dt className="font-medium">MATH</dt>
                      <dd className="text-muted-foreground">Mathematisches Reasoning auf Wettkampfniveau</dd>
                    </div>
                    <div>
                      <dt className="font-medium">GPQA</dt>
                      <dd className="text-muted-foreground">Graduate-Level Google-Proof Q&A für Expertenwissen</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Anwendungsfälle
                </CardTitle>
                <CardDescription>
                  Ideale Einsatzgebiete für {model.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {model.use_cases.map((useCase) => (
                    <div key={useCase.title} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-1">{useCase.title}</h4>
                      <p className="text-sm text-muted-foreground">{useCase.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technical Specs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Technische Daten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {model.context_window > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Kontextfenster
                      </span>
                      <span className="font-medium">
                        {(model.context_window / 1000).toFixed(0)}k Tokens
                      </span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  {(model.pricing_input > 0 || model.pricing_output > 0) ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Input Preis
                        </span>
                        <span className="font-medium">${model.pricing_input}/1M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Output Preis
                        </span>
                        <span className="font-medium">${model.pricing_output}/1M</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Preis
                      </span>
                      <Badge variant="secondary">Kostenlos</Badge>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Release
                    </span>
                    <span className="font-medium">
                      {new Date(model.release_date).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best For */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Ideal für
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {model.best_for.map((use) => (
                    <Badge key={use} variant="secondary">{use}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Preis-Rechner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PriceCalculator 
                  inputPrice={model.pricing_input} 
                  outputPrice={model.pricing_output} 
                />
              </CardContent>
            </Card>

            {/* Related Models */}
            <Card>
              <CardHeader>
                <CardTitle>Ähnliche Modelle</CardTitle>
                <CardDescription>
                  Vergleiche {model.name} mit Alternativen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {model.related_models.map((relatedId) => {
                    const related = models[relatedId];
                    if (!related) return null;
                    return (
                      <Link key={relatedId} href={`/models/${relatedId}`}>
                        <div className="p-3 border rounded-lg hover:bg-muted transition-colors flex justify-between items-center">
                          <div>
                            <p className="font-medium">{related.name as string}</p>
                            <p className="text-sm text-muted-foreground">{related.provider as string}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">Vergleichen →</Badge>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Link href="/models">
                    <Button variant="outline" className="w-full gap-2">
                      Alle Modelle ansehen
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

// Price Calculator Component
function PriceCalculator({ inputPrice, outputPrice }: { inputPrice: number; outputPrice: number }) {
  if (inputPrice === 0 && outputPrice === 0) {
    return (
      <div className="text-center py-4">
        <Badge variant="secondary" className="text-lg">Kostenlos!</Badge>
        <p className="text-sm text-muted-foreground mt-2">
          Dieses Modell ist Open Source und kostenlos nutzbar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">Input:</span>
          <span className="font-medium">${inputPrice} / 1M tokens</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Output:</span>
          <span className="font-medium">${outputPrice} / 1M tokens</span>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Verwende den Preis-Rechner auf der Startseite für detaillierte Kalkulationen.
      </p>
    </div>
  );
}
