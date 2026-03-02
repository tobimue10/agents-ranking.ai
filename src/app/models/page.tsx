import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { 
  Search, 
  Filter,
  ArrowUpDown,
  Brain,
  Sparkles,
  Palette,
  Video,
  Zap
} from 'lucide-react';

import { models, TYPE_COLORS, TYPE_LABELS } from './data';
import { formatContextWindow, formatPricing, formatDate, getModelsCountByType } from './data';

// Generate metadata for SEO
export const metadata = {
  title: 'KI Modelle Vergleich 2025 | 60+ LLMs: GPT-4o, Claude 3.7, DeepSeek, Grok 3, Gemini 2.0',
  description: '✓ Vergleiche über 60 KI-Modelle 2025: GPT-4o, Claude 3.7 Sonnet, DeepSeek-R1, Grok 3, Gemini 2.0 Flash, Llama 3.3, Kimi K2.5 & mehr. Aktuelle Benchmarks, Preise & Features. Finde das beste LLM für Coding, Reasoning & KI-Agents!',
  keywords: ['KI Modelle 2025', 'LLM Vergleich', 'KI Modelle Vergleich', 'GPT-4o', 'Claude 3.7', 'DeepSeek-R1', 'Grok 3', 'Gemini 2.0', 'Llama 3.3', 'Kimi K2.5', 'bestes KI Modell', 'AI Agents', 'KI Benchmarks', 'DeepSeek Test', 'Grok 3 Test', 'Open Source LLM', 'kostenlose KI Modelle', 'LLM Ranking', 'KI für Coding', 'Reasoning Modelle', 'Qwen 2.5', 'Mistral Large', 'Perplexity AI', 'Copilot Alternative', 'KI Tools Vergleich', 'LLM Preise 2025', 'OpenAI Alternative', 'Anthropic Claude', 'Google Gemini', 'xAI Grok', 'Meta Llama', 'Enterprise KI'],
  alternates: {
    canonical: 'https://agents-ranking.ai/models',
  },
  openGraph: {
    title: 'KI Modelle Vergleich 2025 | 60+ LLMs: GPT-4o, Claude 3.7, DeepSeek, Grok 3',
    description: '✓ Vergleiche über 60 KI-Modelle 2025: GPT-4o, Claude 3.7, DeepSeek-R1, Grok 3, Gemini 2.0, Llama 3.3 & mehr. Aktuelle Benchmarks & Preise.',
    url: 'https://agents-ranking.ai/models',
  },
};

export default function ModelsPage(): JSX.Element {
  const llmCount = getModelsCountByType('llm');

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
                <p className="text-sm text-muted-foreground">{llmCount} Modelle</p>
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
                    <Badge className={TYPE_COLORS[model.type]}>
                      {TYPE_LABELS[model.type]}
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
                          {formatContextWindow(model.context_window)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Preis:</span>
                      <span className="font-medium">
                        {model.pricing_input === 0 ? (
                          <Badge variant="secondary" className="text-xs">Kostenlos</Badge>
                        ) : (
                          formatPricing(model.pricing_input)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Release:</span>
                      <span className="font-medium">
                        {formatDate(model.release_date)}
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
        <Card className="mt-16" id="faq">
          <CardHeader>
            <CardTitle>Der umfassendste LLM Vergleich 2025</CardTitle>
            <CardDescription>
              Finde das beste KI-Modell für dein Projekt - Unabhängige Benchmarks & aktuelle Preise
            </CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              agents-ranking.ai bietet den umfassendsten <strong>KI Vergleich</strong> für 
              Large Language Models (LLMs), AI Agents und spezialisierte KI-Tools. Unsere 
              unabhängigen Benchmarks helfen dir, das beste Modell für deine Anforderungen zu finden.
              Aktuell vergleichen wir über 60 KI-Modelle mit täglich aktualisierten Daten.
            </p>
            
            <h3 className="text-lg font-semibold mt-6">Beliebte Vergleiche 2025</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Link href="/models/gpt-4o" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <p className="font-medium">GPT-4o vs Claude 3.7 Sonnet</p>
                <p className="text-sm text-muted-foreground">Der Klassiker unter den LLM-Vergleichen - Wer gewinnt 2025?</p>
              </Link>
              <Link href="/models/deepseek-r1" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <p className="font-medium">DeepSeek-R1 vs o3-mini</p>
                <p className="text-sm text-muted-foreground">Reasoning-Modelle im direkten Vergleich</p>
              </Link>
              <Link href="/models/grok-3" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <p className="font-medium">Grok 3 Test & Benchmarks</p>
                <p className="text-sm text-muted-foreground">xAI&apos;s neuestes Modell im Detail</p>
              </Link>
              <Link href="/models/llama-3-3-70b" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <p className="font-medium">Llama 3.3 vs Qwen 2.5 vs kommerzielle Modelle</p>
                <p className="text-sm text-muted-foreground">Open Source vs. Closed Source - Lohnt sich der Umstieg?</p>
              </Link>
              <Link href="/models/gemini-2-0-flash" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <p className="font-medium">Gemini 2.0 Flash vs GPT-4o mini</p>
                <p className="text-sm text-muted-foreground">Schnelle Modelle für Echtzeit-Anwendungen</p>
              </Link>
              <Link href="/models/mistral-large" className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <p className="font-medium">Mistral Large 2 im Test</p>
                <p className="text-sm text-muted-foreground">Europäische Alternative zu OpenAI und Anthropic</p>
              </Link>
            </div>

            <h3 className="text-lg font-semibold mt-6">Häufig gestellte Fragen (FAQ)</h3>
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium">Was ist das beste KI-Modell 2025?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Das beste KI-Modell hängt vom Anwendungsfall ab. Für Coding empfehlen wir 
                  <Link href="/models/claude-3-7-sonnet" className="text-primary hover:underline"> Claude 3.7 Sonnet</Link>, 
                  für multimodale Aufgaben <Link href="/models/gpt-4o" className="text-primary hover:underline">GPT-4o</Link>, 
                  und für kostenlose Nutzung <Link href="/models/llama-3-3-70b" className="text-primary hover:underline">Llama 3.3</Link> oder 
                  <Link href="/models/qwen-2-5" className="text-primary hover:underline"> Qwen 2.5</Link>.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium">Welche KI ist besser als ChatGPT?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <Link href="/models/claude-3-7-sonnet" className="text-primary hover:underline">Claude 3.7 Sonnet</Link> übertrifft 
                  ChatGPT bei Coding und langen Dokumenten. <Link href="/models/deepseek-r1" className="text-primary hover:underline">DeepSeek-R1</Link> ist 
                  besser für komplexes Reasoning und deutlich günstiger. 
                  <Link href="/models/gemini-2-0-pro" className="text-primary hover:underline">Gemini 2.0 Pro</Link> bietet das größte Kontextfenster.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium">Ist Llama 3.3 wirklich kostenlos?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Ja, <Link href="/models/llama-3-3-70b" className="text-primary hover:underline">Llama 3.3</Link> ist Open Source und 
                  vollständig kostenlos für kommerzielle Nutzung. Du kannst es selbst hosten oder über 
                  Anbieter wie Groq kostenlos nutzen. Auch <Link href="/models/qwen-2-5" className="text-primary hover:underline">Qwen 2.5</Link> ist eine starke kostenlose Alternative.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium">Welche KI ist am besten für Coding?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <Link href="/models/claude-3-7-sonnet" className="text-primary hover:underline">Claude 3.7 Sonnet</Link> ist aktuell die beste KI für Coding 
                  mit über 92% HumanEval Score. Für Budget-Projekte ist 
                  <Link href="/models/deepseek-v3" className="text-primary hover:underline"> DeepSeek-V3</Link> die beste Wahl.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
