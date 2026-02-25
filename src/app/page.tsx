"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { 
  Search, 
  ArrowUpDown, 
  Check, 
  X,
  Code,
  Palette,
  Video,
  Calculator,
  Sparkles,
  Brain,
  TrendingUp,
  Zap,
  Bot,
  Cpu,
  MessageSquare,
  Wand2,
  Layers
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/components/LanguageProvider";
import { modelsData, topModels, newThisWeek, priceComparison } from "@/lib/models-data";
import { agentsData } from "@/lib/agents-data";
import { benchmarkUpdates } from "@/lib/news-data";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MobileModelCard } from "@/components/MobileModelCard";

// Animation hook for scroll reveal
function useScrollReveal() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const newSet = new Set(prev);
              newSet.add(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return visibleItems;
}

type SortField = 'name' | 'provider' | 'pricing_input' | 'context_window' | 'mmlu';
type SortDirection = 'asc' | 'desc';

export default function Home() {
  const { language } = useLanguage();
  const visibleItems = useScrollReveal();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [compareModels, setCompareModels] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort models
  const filteredModels = useMemo(() => {
    const result = modelsData.filter(model => {
      const matchesSearch = 
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = selectedFilters.length === 0 || 
        selectedFilters.some(filter => model.category.includes(filter));
      
      return matchesSearch && matchesFilter;
    });

    result.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;
      
      if (sortField === 'mmlu') {
        aValue = a.benchmarks?.mmlu || 0;
        bValue = b.benchmarks?.mmlu || 0;
      } else {
        aValue = (a as unknown as Record<string, string | number>)[sortField] || 0;
        bValue = (b as unknown as Record<string, string | number>)[sortField] || 0;
      }
      
      if (typeof aValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue);
      }
      
      return sortDirection === 'asc' ? aValue - (bValue as number) : (bValue as number) - aValue;
    });

    return result;
  }, [searchQuery, selectedFilters, sortField, sortDirection]);

  // Models nach Sektionen gruppieren
  const chatbotModels = useMemo(() => 
    filteredModels.filter(m => m.section === 'chatbot' && !m.is_archived),
    [filteredModels]
  );
  
  const agentModels = useMemo(() => 
    filteredModels.filter(m => m.section === 'agent' && !m.is_archived),
    [filteredModels]
  );
  
  const specialistModels = useMemo(() => 
    filteredModels.filter(m => m.section === 'specialist' && !m.is_archived),
    [filteredModels]
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const toggleCompare = (modelId: string) => {
    setCompareModels(prev => {
      if (prev.includes(modelId)) {
        return prev.filter(id => id !== modelId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), modelId];
      }
      return [...prev, modelId];
    });
  };

  const comparisonModels = modelsData.filter(m => compareModels.includes(m.id));

  const filterOptions = [
    { id: 'llm', label: language === 'de' ? 'Chatbots' : 'Chatbots', icon: MessageSquare },
    { id: 'agent', label: language === 'de' ? 'Agents' : 'Agents', icon: Bot },
    { id: 'multimodal', label: language === 'de' ? 'Spezial-KI' : 'Specialist AI', icon: Wand2 },
    { id: 'coding', label: 'Coding', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="absolute top-1/4 left-[5%] w-[600px] h-[600px] bg-violet-500/15 rounded-full blur-[120px] animate-pulse-glow animate-blob" />
        <div className="absolute bottom-1/4 right-[5%] w-[500px] h-[500px] bg-fuchsia-500/12 rounded-full blur-[100px] animate-pulse-glow delay-700 animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/8 rounded-full blur-[140px] animate-pulse-glow delay-1000" />
        
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <Badge 
                className="mb-6 sm:mb-8 text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 bg-white/90 dark:bg-white/10 backdrop-blur-md text-foreground border border-border/50 hover:bg-white dark:hover:bg-white/15 transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-105"
                variant="outline"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mr-2 animate-pulse" />
                {language === 'de' ? 'Stand: Februar 2025' : 'Updated: February 2025'}
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-[1.1] tracking-tight animate-fade-in-up delay-100">
              <span className="block text-foreground">
                {language === 'de' ? 'KI Modelle &' : 'AI Models &'}
              </span>
              <span className="block gradient-text mt-1 sm:mt-2">
                {language === 'de' ? 'Agent Ranking' : 'Agent Ranking'}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0 animate-fade-in-up delay-200">
              {language === 'de' 
                ? 'Der umfassendste Vergleich für LLMs, AI Agents und KI-Tools. Aktuelle Benchmarks für GPT-4o, Claude 3.5, DeepSeek-R1, Grok 3, Gemini 2.0, Llama 3.3 und mehr.'
                : 'The most comprehensive comparison for LLMs, AI Agents and AI tools. Current benchmarks for GPT-4o, Claude 3.5, DeepSeek-R1, Grok 3, Gemini 2.0, Llama 3.3 and more.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in-up delay-300 px-4 sm:px-0">
              <Link href="#top-models" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="gap-2 w-full sm:min-w-[200px] h-12 sm:h-14 text-sm sm:text-base font-medium bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] btn-shine"
                >
                  <TrendingUp className="w-4 h-4" />
                  {language === 'de' ? 'Top 5 Modelle' : 'Top 5 Models'}
                </Button>
              </Link>
              <Link href="#comparison-table" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 w-full sm:min-w-[200px] h-12 sm:h-14 text-sm sm:text-base font-medium border-2 hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] btn-shine"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  {language === 'de' ? 'Alle vergleichen' : 'Compare All'}
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 animate-fade-in-up delay-500 px-4 sm:px-0">
              {[
                { value: "50+", label: language === 'de' ? 'KI-Modelle' : 'AI Models' },
                { value: "10+", label: language === 'de' ? 'AI Agents' : 'AI Agents' },
                { value: "Feb 2025", label: language === 'de' ? 'Aktualisiert' : 'Updated' },
                { value: "100%", label: language === 'de' ? 'Unabhängig' : 'Independent' },
              ].map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Top 5 Modelle Section */}
      <section id="top-models" data-reveal className="container mx-auto px-4 py-16 sm:py-20">
        <div className={`transition-all duration-1000 ease-out ${visibleItems.has('top-models') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-3 py-1.5">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5 inline" />
              {language === 'de' ? 'LMSYS Arena Rankings' : 'LMSYS Arena Rankings'}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'de' ? 'Top 5 KI-Modelle Februar 2025' : 'Top 5 AI Models February 2025'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'de' 
                ? 'Basierend auf LMSYS Arena Elo-Ratings und aktuellen Benchmarks'
                : 'Based on LMSYS Arena Elo ratings and current benchmarks'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {topModels.map((model, index) => (
              <Card key={model.name} className={`relative overflow-hidden border-0 shadow-soft card-lift ${index === 0 ? 'ring-2 ring-violet-500/50' : ''}`}>
                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs px-2 py-1 rounded-bl-lg font-medium">
                    #1
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{model.provider}</Badge>
                    <span className="text-2xl font-bold text-muted-foreground">#{model.rank}</span>
                  </div>
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                  <CardDescription className="text-xs">{model.highlight}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-muted/50 rounded-lg p-2 text-center">
                      <div className="font-semibold text-primary">{model.arena_elo}</div>
                      <div className="text-xs text-muted-foreground">Elo</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2 text-center">
                      <div className="font-semibold">{model.mmlu}%</div>
                      <div className="text-xs text-muted-foreground">MMLU</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Kontext:</span>
                      <span className="font-medium">{model.context}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Input:</span>
                      <span className="font-medium">${model.price_input}/1M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Output:</span>
                      <span className="font-medium">${model.price_output}/1M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Neu diese Woche Section */}
      <section id="new-this-week" data-reveal className="container mx-auto px-4 py-16 sm:py-20">
        <div className={`transition-all duration-1000 ease-out ${visibleItems.has('new-this-week') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-3 py-1.5 bg-green-500/10 text-green-600 border-green-500/20">
              <Zap className="w-3.5 h-3.5 mr-1.5 inline" />
              {language === 'de' ? 'Neu diese Woche' : 'New This Week'}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'de' ? 'Neue Releases & Updates' : 'New Releases & Updates'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {newThisWeek.map((item) => (
              <Card key={item.name} className="border-0 shadow-soft card-lift">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                      {item.release_date}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{item.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription className="text-xs">{item.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preis-Vergleich Section */}
      <section id="price-comparison" data-reveal className="container mx-auto px-4 py-16 sm:py-20">
        <div className={`transition-all duration-1000 ease-out ${visibleItems.has('price-comparison') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-3 py-1.5">
              <Calculator className="w-3.5 h-3.5 mr-1.5 inline" />
              {language === 'de' ? 'Preisvergleich' : 'Price Comparison'}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'de' ? 'API-Preise pro 1M Tokens' : 'API Prices per 1M Tokens'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'de' 
                ? 'Vergleich der Input/Output-Preise für beliebte Modelle (in USD)'
                : 'Comparison of input/output prices for popular models (in USD)'}
            </p>
          </div>

          <Card className="border-0 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Modell</TableHead>
                    <TableHead>Anbieter</TableHead>
                    <TableHead className="text-right">Input/1M</TableHead>
                    <TableHead className="text-right">Output/1M</TableHead>
                    <TableHead className="text-right">Kontext</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {priceComparison.map((item) => (
                    <TableRow key={item.model} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{item.model}</TableCell>
                      <TableCell className="text-muted-foreground">{item.provider}</TableCell>
                      <TableCell className="text-right">
                        <span className={item.input < 0.5 ? "text-green-600 font-medium" : ""}>
                          ${item.input.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={item.output < 1 ? "text-green-600 font-medium" : ""}>
                          ${item.output.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">{item.context}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </section>

      {/* AI Agents Section */}
      <section id="ai-agents" data-reveal className="container mx-auto px-4 py-16 sm:py-20">
        <div className={`transition-all duration-1000 ease-out ${visibleItems.has('ai-agents') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-3 py-1.5">
              <Bot className="w-3.5 h-3.5 mr-1.5 inline" />
              {language === 'de' ? 'AI Agents' : 'AI Agents'}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'de' ? 'Coding Agents & AI IDEs' : 'Coding Agents & AI IDEs'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'de' 
                ? 'Die besten Tools für agentisches Coding: Cursor, Windsurf, Devin und mehr'
                : 'The best tools for agentic coding: Cursor, Windsurf, Devin and more'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentsData.slice(0, 6).map((agent) => (
              <Card key={agent.id} className={`border-0 shadow-soft card-lift ${agent.is_new ? 'ring-1 ring-green-500/30' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{agent.category}</Badge>
                    {agent.is_new && (
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">Neu</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <CardDescription className="text-xs">{agent.provider}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm text-muted-foreground">Preis:</span>
                    <span className="font-medium">
                      {agent.pricing.free ? 'Kostenlos' : `$${agent.pricing.monthly}/Monat`}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benchmarks Section */}
      <section id="benchmarks" data-reveal className="container mx-auto px-4 py-16 sm:py-20">
        <div className={`transition-all duration-1000 ease-out ${visibleItems.has('benchmarks') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-3 py-1.5">
              <Cpu className="w-3.5 h-3.5 mr-1.5 inline" />
              {language === 'de' ? 'Benchmarks' : 'Benchmarks'}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'de' ? 'Aktuelle Benchmark-Scores' : 'Current Benchmark Scores'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'de' 
                ? `Letztes Update: ${benchmarkUpdates.last_updated} | Quelle: ${benchmarkUpdates.source}`
                : `Last updated: ${benchmarkUpdates.last_updated} | Source: ${benchmarkUpdates.source}`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">LMSYS Arena Top 5</CardTitle>
                <CardDescription>Elo-Ratings basierend auf Community-Votes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {benchmarkUpdates.top_5.map((model) => (
                    <div key={model.model} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                          {model.rank}
                        </span>
                        <div>
                          <div className="font-medium">{model.model}</div>
                          <div className="text-xs text-muted-foreground">{model.provider}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{model.elo}</div>
                        <div className="text-xs text-muted-foreground">Elo</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Wichtige Änderungen</CardTitle>
                <CardDescription>Neue Entwicklungen im Ranking</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {benchmarkUpdates.notable_changes.map((change, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Comparison Table */}
      <section id="comparison-table" data-reveal className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className={`transition-all duration-1000 ease-out ${visibleItems.has('comparison-table') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-8 sm:mb-12">
            <Badge variant="outline" className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 text-xs sm:text-sm hover:scale-105 transition-transform">
              <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 inline" />
              {language === 'de' ? 'Interaktiver Vergleich' : 'Interactive Comparison'}
            </Badge>            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-5 tracking-tight">
              {language === 'de' ? 'Alle KI-Modelle im Vergleich' : 'All AI Models Compared'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4 sm:px-0">
              {language === 'de' 
                ? 'Vergleiche alle Modelle mit Filter, Sortierung und direktem Modell-Vergleich'
                : 'Compare all models with filters, sorting and direct model comparison'}
            </p>
          </div>

          {/* Search and Filter Bar */}
          <Card className="mb-4 sm:mb-6 border-0 shadow-soft hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 sm:p-5">
              <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  <Input
                    placeholder={language === 'de' ? 'Modelle suchen...' : 'Search models...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter(filter.id)}
                      className="gap-1.5 sm:gap-2 h-9 sm:h-12 px-2.5 sm:px-4 text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 focus-ring"
                    >
                      <filter.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{filter.label}</span>
                      <span className="sm:hidden">{filter.label.slice(0, 3)}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Mode Toggle */}
          {compareModels.length > 0 && (
            <Card className="mb-6 border-primary/30 bg-primary/5 animate-fade-in">
              <CardContent className="p-5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-medium text-sm">
                      {language === 'de' ? 'Zum Vergleich:' : 'To compare:'}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {compareModels.map(id => {
                        const model = modelsData.find(m => m.id === id);
                        return (
                          <Badge key={id} variant="secondary" className="gap-1.5 px-3 py-1.5">
                            {model?.name}
                            <button 
                              onClick={() => toggleCompare(id)} 
                              className="ml-1 hover:bg-muted rounded-full p-0.5 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCompareModels([])}>
                      {language === 'de' ? 'Zurücksetzen' : 'Reset'}
                    </Button>
                    <Button size="sm" onClick={() => setShowComparison(true)}>
                      {language === 'de' ? 'Vergleichen' : 'Compare'} ({compareModels.length})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Comparison Modal */}
          <Dialog open={showComparison} onOpenChange={setShowComparison}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{language === 'de' ? 'Direkter Modell-Vergleich' : 'Direct Model Comparison'}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {comparisonModels.map(model => (
                  <Card key={model.id} className="border-0 shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-xl">{model.name}</CardTitle>
                      <CardDescription>{model.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div>
                        <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          {language === 'de' ? 'Vorteile' : 'Pros'}
                        </p>
                        <ul className="text-sm space-y-2">
                          {model.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                              <span className="text-green-500 mt-0.5">•</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <X className="w-4 h-4 text-red-500" />
                          {language === 'de' ? 'Nachteile' : 'Cons'}
                        </p>
                        <ul className="text-sm space-y-2">
                          {model.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                              <span className="text-red-500 mt-0.5">•</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium">MMLU</span>
                          <span className="text-2xl font-bold gradient-text">{model.benchmarks?.mmlu}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{language === 'de' ? 'Preis/1M Input' : 'Price/1M Input'}</span>
                          <span className="text-2xl font-bold">${model.pricing_input}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Models Table - Desktop */}
          <Card className="border-0 shadow-soft overflow-hidden hidden md:block">
            <div className="table-scroll">
              {isLoading ? (
                <div className="p-8 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton h-14 w-full" />
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-12"></TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort('name')} className="gap-2 font-semibold">
                          {language === 'de' ? 'Name' : 'Name'}
                          <ArrowUpDown className="w-4 h-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort('provider')} className="gap-2 font-semibold">
                          {language === 'de' ? 'Anbieter' : 'Provider'}
                          <ArrowUpDown className="w-4 h-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="font-semibold">{language === 'de' ? 'Typ' : 'Type'}</TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort('pricing_input')} className="gap-2 font-semibold">
                          {language === 'de' ? 'Preis/1M' : 'Price/1M'}
                          <ArrowUpDown className="w-4 h-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort('context_window')} className="gap-2 font-semibold">
                          {language === 'de' ? 'Kontext' : 'Context'}
                          <ArrowUpDown className="w-4 h-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort('mmlu')} className="gap-2 font-semibold">
                          MMLU
                          <ArrowUpDown className="w-4 h-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="font-semibold">{language === 'de' ? 'Aktion' : 'Action'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* SEKTION 1: CHATBOTS & LLMs */}
                    {chatbotModels.length > 0 && (
                      <>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableCell colSpan={8} className="py-3">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4 text-primary" />
                              <span className="font-semibold text-sm">
                                {language === 'de' ? 'Chatbots & LLMs' : 'Chatbots & LLMs'}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {chatbotModels.length}
                              </Badge>
                            </div>
                          </TableCell>
                        </TableRow>
                        {chatbotModels.map((model, index) => (
                          <TableRow 
                            key={model.id} 
                            className={`group ${model.is_new ? 'bg-green-500/[0.02]' : ''}`}
                          >
                            <TableCell>
                              <Checkbox
                                checked={compareModels.includes(model.id)}
                                onCheckedChange={() => toggleCompare(model.id)}
                                className="border-2"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {model.name}
                                {model.is_new && (
                                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px] badge-new">Neu</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{model.provider}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">{model.type}</Badge>
                            </TableCell>
                            <TableCell>
                              {model.pricing_input === 0 ? (
                                <Badge variant="success">{language === 'de' ? 'Kostenlos' : 'Free'}</Badge>
                              ) : (
                                <span className="font-medium">${model.pricing_input}</span>
                              )}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {model.context_window > 0 ? `${(model.context_window / 1000).toFixed(0)}k` : '-'}
                            </TableCell>
                            <TableCell>
                              {model.benchmarks?.mmlu ? (
                                <span className="font-semibold text-primary">{model.benchmarks.mmlu}%</span>
                              ) : (
                                '-'
                              )}
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                                {language === 'de' ? 'Details' : 'Details'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                    
                    {/* SEKTION 2: AI AGENTS */}
                    {agentModels.length > 0 && (
                      <>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableCell colSpan={8} className="py-3">
                            <div className="flex items-center gap-2">
                              <Bot className="w-4 h-4 text-violet-500" />
                              <span className="font-semibold text-sm">
                                {language === 'de' ? 'AI Agents' : 'AI Agents'}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {agentModels.length}
                              </Badge>
                            </div>
                          </TableCell>
                        </TableRow>
                        {agentModels.map((model, index) => (
                          <TableRow 
                            key={model.id} 
                            className={`group ${model.is_new ? 'bg-green-500/[0.02]' : ''}`}
                          >
                            <TableCell>
                              <Checkbox
                                checked={compareModels.includes(model.id)}
                                onCheckedChange={() => toggleCompare(model.id)}
                                className="border-2"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {model.name}
                                {model.is_new && (
                                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px] badge-new">Neu</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{model.provider}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize bg-violet-500/10 text-violet-600 border-violet-500/20">{model.type}</Badge>
                            </TableCell>
                            <TableCell>
                              {model.pricing_input === 0 ? (
                                <Badge variant="success">{language === 'de' ? 'Kostenlos' : 'Free'}</Badge>
                              ) : (
                                <span className="font-medium">${model.pricing_input}</span>
                              )}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {model.context_window > 0 ? `${(model.context_window / 1000).toFixed(0)}k` : '-'}
                            </TableCell>
                            <TableCell>
                              {model.benchmarks?.mmlu ? (
                                <span className="font-semibold text-primary">{model.benchmarks.mmlu}%</span>
                              ) : (
                                '-'
                              )}
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                                {language === 'de' ? 'Details' : 'Details'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                    
                    {/* SEKTION 3: SPEZIAL-KI */}
                    {specialistModels.length > 0 && (
                      <>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableCell colSpan={8} className="py-3">
                            <div className="flex items-center gap-2">
                              <Wand2 className="w-4 h-4 text-amber-500" />
                              <span className="font-semibold text-sm">
                                {language === 'de' ? 'Spezial-KI (Multimodal, Video, Audio)' : 'Specialist AI (Multimodal, Video, Audio)'}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {specialistModels.length}
                              </Badge>
                            </div>
                          </TableCell>
                        </TableRow>
                        {specialistModels.map((model, index) => (
                          <TableRow 
                            key={model.id} 
                            className={`group ${model.is_new ? 'bg-green-500/[0.02]' : ''}`}
                          >
                            <TableCell>
                              <Checkbox
                                checked={compareModels.includes(model.id)}
                                onCheckedChange={() => toggleCompare(model.id)}
                                className="border-2"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {model.name}
                                {model.is_new && (
                                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px] badge-new">Neu</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{model.provider}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize bg-amber-500/10 text-amber-600 border-amber-500/20">{model.type}</Badge>
                            </TableCell>
                            <TableCell>
                              {model.pricing_input === 0 ? (
                                <Badge variant="success">{language === 'de' ? 'Kostenlos' : 'Free'}</Badge>
                              ) : (
                                <span className="font-medium">${model.pricing_input}</span>
                              )}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {model.context_window > 0 ? `${(model.context_window / 1000).toFixed(0)}k` : '-'}
                            </TableCell>
                            <TableCell>
                              {model.benchmarks?.mmlu ? (
                                <span className="font-semibold text-primary">{model.benchmarks.mmlu}%</span>
                              ) : (
                                '-'
                              )}
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                                {language === 'de' ? 'Details' : 'Details'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </Card>

          {/* Mobile Cards Grid - Grouped by Section */}
          <div className="md:hidden space-y-8">
            {/* Chatbots Section */}
            {chatbotModels.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4 px-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{language === 'de' ? 'Chatbots & LLMs' : 'Chatbots & LLMs'}</h3>
                  <Badge variant="secondary">{chatbotModels.length}</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {chatbotModels.map((model, index) => (
                    <MobileModelCard
                      key={model.id}
                      model={model}
                      isSelected={compareModels.includes(model.id)}
                      onToggleCompare={() => toggleCompare(model.id)}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* AI Agents Section */}
            {agentModels.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4 px-2">
                  <Bot className="w-5 h-5 text-violet-500" />
                  <h3 className="font-semibold">{language === 'de' ? 'AI Agents' : 'AI Agents'}</h3>
                  <Badge variant="secondary">{agentModels.length}</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {agentModels.map((model, index) => (
                    <MobileModelCard
                      key={model.id}
                      model={model}
                      isSelected={compareModels.includes(model.id)}
                      onToggleCompare={() => toggleCompare(model.id)}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Specialist AI Section */}
            {specialistModels.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4 px-2">
                  <Wand2 className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold">{language === 'de' ? 'Spezial-KI' : 'Specialist AI'}</h3>
                  <Badge variant="secondary">{specialistModels.length}</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {specialistModels.map((model, index) => (
                    <MobileModelCard
                      key={model.id}
                      model={model}
                      isSelected={compareModels.includes(model.id)}
                      onToggleCompare={() => toggleCompare(model.id)}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {filteredModels.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">
                {language === 'de' ? 'Keine Modelle gefunden' : 'No models found'}
              </p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => {setSearchQuery(''); setSelectedFilters([]);}}
              >
                {language === 'de' ? 'Filter zurücksetzen' : 'Reset filters'}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter-section" data-reveal className="container mx-auto px-4 py-16">
        <div className={`transition-all duration-700 ${visibleItems.has('newsletter-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <NewsletterSignup variant="hero" />
        </div>
      </section>

      {/* SEO Content Section */}
      <section id="seo-section" data-reveal className="container mx-auto px-4 py-16">
        <div className={`transition-all duration-700 ${visibleItems.has('seo-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card className="border-0 shadow-soft">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl">{language === 'de' ? 'Über agents-ranking.ai' : 'About agents-ranking.ai'}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {language === 'de' 
                  ? 'agents-ranking.ai ist die führende Plattform für KI-Vergleiche. Wir bieten unabhängige Benchmarks, aktuelle Preise und detaillierte Analysen aller führenden KI-Modelle und AI Agents. Unsere Daten werden täglich aktualisiert und basieren auf offiziellen Quellen wie LMSYS Arena, Hersteller-Websites und eigenen Tests.'
                  : 'agents-ranking.ai is the leading platform for AI comparisons. We offer independent benchmarks, current prices and detailed analyses of all leading AI models and AI agents. Our data is updated daily and based on official sources such as LMSYS Arena, manufacturer websites and our own tests.'}
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">
                {language === 'de' ? 'Beliebte KI-Vergleiche 2025' : 'Popular AI Comparisons 2025'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 not-prose">
                <Link href="/models/claude-3-5-sonnet" className="p-4 border rounded-lg hover:bg-muted transition-colors group">
                  <p className="font-medium group-hover:text-primary">Claude 3.5 Sonnet</p>
                  <p className="text-sm text-muted-foreground">Der beste LLM für Coding 2025?</p>
                </Link>
                <Link href="/models/gpt-4o" className="p-4 border rounded-lg hover:bg-muted transition-colors group">
                  <p className="font-medium group-hover:text-primary">GPT-4o</p>
                  <p className="text-sm text-muted-foreground">OpenAIs multimodales Flaggschiff</p>
                </Link>
                <Link href="/models/gemini-pro-1-5" className="p-4 border rounded-lg hover:bg-muted transition-colors group">
                  <p className="font-medium group-hover:text-primary">Gemini Pro 1.5</p>
                  <p className="text-sm text-muted-foreground">1 Million Token Kontextfenster</p>
                </Link>
                <Link href="/models/llama-3-1-405b" className="p-4 border rounded-lg hover:bg-muted transition-colors group">
                  <p className="font-medium group-hover:text-primary">Llama 3.3</p>
                  <p className="text-sm text-muted-foreground">Bestes Open Source LLM</p>
                </Link>
                <Link href="/models/kimi-k2-5" className="p-4 border rounded-lg hover:bg-muted transition-colors group">
                  <p className="font-medium group-hover:text-primary">Kimi K2.5</p>
                  <p className="text-sm text-muted-foreground">Bestes Preis-Leistungs-Verhältnis</p>
                </Link>
                <Link href="/models" className="p-4 border rounded-lg hover:bg-muted transition-colors group">
                  <p className="font-medium group-hover:text-primary">Alle Modelle →</p>
                  <p className="text-sm text-muted-foreground">50+ KI-Modelle im Vergleich</p>
                </Link>
              </div>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">
                {language === 'de' ? 'Unsere Benchmarks erklärt' : 'Our Benchmarks Explained'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-5 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">M</span>
                    MMLU
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {language === 'de' 
                      ? 'Massive Multitask Language Understanding - Testet Wissen in 57 Fächern von Mathematik bis Geschichte.'
                      : 'Tests knowledge across 57 subjects from mathematics to history.'}
                  </p>
                </div>
                
                <div className="p-5 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm">H</span>
                    HumanEval
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {language === 'de' 
                      ? 'Misst die Fähigkeit zur Code-Generierung und Problemlösung.'
                      : 'Measures code generation and problem-solving abilities.'}
                  </p>
                </div>
                
                <div className="p-5 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center text-info text-sm">E</span>
                    Elo (LMSYS)
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {language === 'de' 
                      ? 'Community-basiertes Ranking basierend auf direkten Modell-Vergleichen.'
                      : 'Community-based ranking based on direct model comparisons.'}
                  </p>
                </div>
                
                <div className="p-5 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center text-success text-sm">G</span>
                    GPQA
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {language === 'de' 
                      ? 'Graduate-Level Google-Proof Q&A für Expertenwissen.'
                      : 'Graduate-Level Google-Proof Q&A for expert knowledge.'}
                  </p>
                </div>
              </div>

              <div className="mt-8 p-5 rounded-xl bg-violet-500/5 border border-violet-500/10">
                <h4 className="font-semibold mb-2">{language === 'de' ? 'Quellen & Methodik' : 'Sources & Methodology'}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {language === 'de' 
                    ? 'Unsere Daten stammen aus folgenden Quellen: LMSYS Chatbot Arena (Elo-Rankings), Artificial Analysis (Benchmarks), offizielle API-Dokumentationen der Anbieter (Preise), eigene Tests und Community-Feedback. Letzte Aktualisierung: Februar 2025.'
                    : 'Our data comes from the following sources: LMSYS Chatbot Arena (Elo rankings), Artificial Analysis (benchmarks), official API documentation from providers (prices), our own tests and community feedback. Last updated: February 2025.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
