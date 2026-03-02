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
  Calculator,
  TrendingUp,
  Zap,
  Bot,
  MessageSquare,
  Wand2,
  Target,
  Scale
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

// Übersetzungs-Hilfsfunktion
const getText = (lang: string, de: string, en: string, es: string, fr: string) => {
  if (lang === 'de') return de;
  if (lang === 'es') return es;
  if (lang === 'fr') return fr;
  return en;
};
function useCurrentDate(language: string) {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const monthNames = {
      de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
    };
    const month = monthNames[language as keyof typeof monthNames]?.[now.getMonth()] || monthNames.en[now.getMonth()];
    setCurrentDate(`${month} ${now.getFullYear()}`);
  }, [language]);

  return currentDate;
}
import { modelsData, newThisWeek, priceComparison } from "@/lib/models-data";
import { agentsData } from "@/lib/agents-data";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MobileModelCard } from "@/components/MobileModelCard";
import { ModelRecommender } from "@/components/ModelRecommender";
import { UseCaseRecommendations } from "@/components/UseCaseRecommendations";
import { SmartComparison } from "@/components/SmartComparison";

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
  const currentDate = useCurrentDate(language);
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
    { id: 'llm', label: getText(language, 'Chatbots', 'Chatbots', 'Chatbots', 'Chatbots'), icon: MessageSquare },
    { id: 'agent', label: getText(language, 'Agents', 'Agents', 'Agentes', 'Agents'), icon: Bot },
    { id: 'multimodal', label: getText(language, 'Spezial-KI', 'Specialist AI', 'IA Especialista', 'IA Spécialiste'), icon: Wand2 },
    { id: 'coding', label: 'Coding', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden min-h-[95vh] flex items-center mesh-grid">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.02] via-transparent to-fuchsia-500/[0.02] animate-gradient-xy" />
        
        {/* Aurora Flow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[600px] bg-gradient-to-b from-violet-500/10 via-fuchsia-500/5 to-transparent blur-[100px] aurora-flow pointer-events-none" />

        {/* Floating Orbs with Enhanced Animation */}
        <div className="absolute top-[15%] left-[8%] w-[500px] h-[500px] bg-gradient-to-br from-violet-500/20 to-purple-500/10 rounded-full blur-[100px] float-orb pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-gradient-to-br from-fuchsia-500/15 to-pink-500/10 rounded-full blur-[80px] float-orb-slow pointer-events-none" style={{ animationDelay: '-5s' }} />
        <div className="absolute bottom-[25%] left-[20%] w-[450px] h-[450px] bg-gradient-to-br from-blue-500/12 to-cyan-500/8 rounded-full blur-[90px] float-orb-fast pointer-events-none" style={{ animationDelay: '-10s' }} />
        <div className="absolute bottom-[30%] right-[15%] w-[350px] h-[350px] bg-gradient-to-br from-indigo-500/15 to-violet-500/10 rounded-full blur-[70px] float-orb pointer-events-none" style={{ animationDelay: '-15s' }} />

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.8}s`,
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
                background: i % 2 === 0 
                  ? 'hsl(var(--brand-violet) / 0.2)' 
                  : 'hsl(var(--brand-fuchsia) / 0.15)'
              }}
            />
          ))}
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge with Glow Effect */}
            <div className="animate-text-reveal-blur" style={{ animationDelay: '0ms' }}>
              <Badge
                className="mb-8 sm:mb-10 text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 glass-card badge-glow hover:scale-105 transition-transform duration-500"
                variant="outline"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mr-2.5 animate-pulse" />
                {language === 'de'
                  ? `Stand: ${currentDate || 'Lade...'}`
                  : language === 'es'
                  ? `Actualizado: ${currentDate || 'Cargando...'}`
                  : language === 'fr'
                  ? `À jour: ${currentDate || 'Chargement...'}`
                  : `As of: ${currentDate || 'Loading...'}`}
              </Badge>
            </div>

            {/* Main Heading with Premium Gradient */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 sm:mb-10 leading-[1.05] tracking-tight" style={{ animationDelay: '150ms' }}>
              <span className="block text-foreground animate-text-reveal-blur hero-text-glow" style={{ animationDelay: '100ms' }}>
                {getText(language, 'KI Modelle &', 'AI Models &', 'Modelos de IA &', 'Modèles IA &')}
              </span>
              <span className="block gradient-text-premium mt-2 sm:mt-3 animate-text-reveal-blur" style={{ animationDelay: '250ms' }}>
                {getText(language, 'Agent Ranking', 'Agent Ranking', 'Ranking de Agentes', 'Classement des Agents')}
              </span>
            </h1>

            {/* Description with Fade In */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 sm:mb-14 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0 animate-text-reveal-blur" style={{ animationDelay: '400ms' }}>
              {language === 'de'
                ? `Der umfassendste Vergleich für LLMs, AI Agents und KI-Tools. Aktuelle Benchmarks, Preise und Analysen für ${currentDate}.`
                : language === 'es'
                ? `La comparación más completa de LLMs, AI Agents y herramientas de IA. Benchmarks actuales, precios y análisis para ${currentDate}.`
                : language === 'fr'
                ? `La comparaison la plus complète des LLMs, AI Agents et outils d'IA. Benchmarks actuels, prix et analyses pour ${currentDate}.`
                : `The most comprehensive comparison for LLMs, AI Agents and AI tools. Current benchmarks, pricing and analysis for ${currentDate}.`}
            </p>

            {/* CTA Buttons with Enhanced Hover */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center animate-text-reveal-blur px-4 sm:px-0" style={{ animationDelay: '550ms' }}>
              <Link href="#comparison-table" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="gap-2.5 w-full sm:min-w-[220px] h-13 sm:h-14 text-sm sm:text-base font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 btn-lift shine-sweep shadow-lg shadow-violet-500/25"
                >
                  <TrendingUp className="w-5 h-5" />
                  {getText(language, 'Modelle entdecken', 'Discover Models', 'Descubrir Modelos', 'Découvrir les Modèles')}
                </Button>
              </Link>
              <Link href="#comparison-table" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2.5 w-full sm:min-w-[220px] h-13 sm:h-14 text-sm sm:text-base font-semibold border-2 border-foreground/20 hover:bg-foreground/5 hover:border-foreground/30 btn-lift shine-sweep"
                >
                  <ArrowUpDown className="w-5 h-5" />
                  {getText(language, 'Alle vergleichen', 'Compare All', 'Comparar Todo', 'Tout Comparer')}
                </Button>
              </Link>
            </div>

            {/* Stats with Enhanced Glow Effect */}
            <div className="mt-14 sm:mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 animate-text-reveal-blur px-4 sm:px-0" style={{ animationDelay: '700ms' }}>
              {[
                { value: "50+", label: language === 'de' ? 'KI-Modelle' : language === 'es' ? 'Modelos de IA' : language === 'fr' ? 'Modèles IA' : 'AI Models' },
                { value: "10+", label: language === 'de' ? 'AI Agents' : language === 'es' ? 'Agentes IA' : language === 'fr' ? 'Agents IA' : 'AI Agents' },
                { value: currentDate || "...", label: language === 'de' ? 'Aktualisiert' : language === 'es' ? 'Actualizado' : language === 'fr' ? 'Mis à jour' : 'Updated' },
                { value: "100%", label: language === 'de' ? 'Unabhängig' : language === 'es' ? 'Independiente' : language === 'fr' ? 'Indépendant' : 'Independent' },
              ].map((stat, idx) => (
                <div key={stat.label} className="text-center group cursor-default relative">
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 stat-glow count-animate delay-counter-${idx + 1}`}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </section>

      {/* Interactive Comparison Table - Zuerst */}
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
                        {chatbotModels.map((model) => (
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
                        {agentModels.map((model) => (
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
                        {specialistModels.map((model) => (
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

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="skeleton h-32 w-full" />
                ))}
              </div>
            ) : (
              <>
                {/* Chatbots Section */}
                {chatbotModels.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4 px-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">{language === 'de' ? 'Chatbots & LLMs' : 'Chatbots & LLMs'}</h3>
                      <Badge variant="secondary" className="text-xs">{chatbotModels.length}</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {chatbotModels.map((model) => (
                        <MobileModelCard 
                          key={model.id} 
                          model={model} 
                          isSelected={compareModels.includes(model.id)}
                          onToggleCompare={() => toggleCompare(model.id)}
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
                      <Badge variant="secondary" className="text-xs">{agentModels.length}</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {agentModels.map((model) => (
                        <MobileModelCard 
                          key={model.id} 
                          model={model} 
                          isSelected={compareModels.includes(model.id)}
                          onToggleCompare={() => toggleCompare(model.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Specialist Section */}
                {specialistModels.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4 px-2">
                      <Wand2 className="w-5 h-5 text-amber-500" />
                      <h3 className="font-semibold">{language === 'de' ? 'Spezial-KI' : 'Specialist AI'}</h3>
                      <Badge variant="secondary" className="text-xs">{specialistModels.length}</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {specialistModels.map((model) => (
                        <MobileModelCard 
                          key={model.id} 
                          model={model} 
                          isSelected={compareModels.includes(model.id)}
                          onToggleCompare={() => toggleCompare(model.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Comparison Button */}
          {compareModels.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Button
                size="lg"
                onClick={() => setShowComparison(true)}
                className="gap-2"
              >
                <Scale className="w-4 h-4" />
                {language === 'de'
                  ? `${compareModels.length} Modelle vergleichen`
                  : `Compare ${compareModels.length} models`}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Model Recommender Section */}
      <section id="model-recommender" data-reveal className="container mx-auto px-4 py-16 sm:py-20">
        <div className={`transition-all duration-1000 ease-out ${visibleItems.has('model-recommender') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-3xl mx-auto">
            <ModelRecommender />
          </div>
        </div>
      </section>

      {/* Use Case Recommendations Section */}
      <section id="use-cases" data-reveal className="container mx-auto px-4 py-16 sm:py-20">
        <div className={`transition-all duration-1000 ease-out ${visibleItems.has('use-cases') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-3 py-1.5">
              <Target className="w-3.5 h-3.5 mr-1.5 inline" />
              {language === 'de' ? 'Empfohlen für' : 'Recommended for'}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'de' ? 'Für deinen Use-Case' : 'For Your Use Case'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'de'
                ? 'Schnelle Empfehlungen für die häufigsten Anwendungsfälle'
                : 'Quick recommendations for the most common use cases'}
            </p>
          </div>
          <UseCaseRecommendations />
        </div>
      </section>

      {/* Smart Comparison Section */}
      <section id="smart-comparison" data-reveal className="container mx-auto px-4 py-16 sm:py-20">
        <div className={`transition-all duration-1000 ease-out ${visibleItems.has('smart-comparison') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-3 py-1.5">
              <Scale className="w-3.5 h-3.5 mr-1.5 inline" />
              {language === 'de' ? 'Direkte Vergleiche' : 'Direct Comparisons'}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'de' ? 'Häufige Vergleiche' : 'Common Comparisons'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'de'
                ? 'Die wichtigsten Unterschiede auf einen Blick'
                : 'The key differences at a glance'}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <SmartComparison />
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
              <Card key={item.name} className="border-0 shadow-soft card-lift card-shine tilt-card gradient-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs badge-new">
                      {item.release_date}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{item.category}</Badge>
                  </div>
                  <CardTitle className="text-lg hover-underline cursor-default">{item.name}</CardTitle>
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
              <Card key={agent.id} className={`border-0 shadow-soft card-lift card-shine tilt-card ${agent.is_new ? 'ring-1 ring-green-500/30' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs glow-border">{agent.category}</Badge>
                    {agent.is_new && (
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs badge-new">Neu</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg hover-underline cursor-default">{agent.name}</CardTitle>
                  <CardDescription className="text-xs">{agent.provider}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs hover:bg-secondary/80 transition-colors">
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
                        {chatbotModels.map((model) => (
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
                        {agentModels.map((model) => (
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
                        {specialistModels.map((model) => (
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
                  {chatbotModels.map((model) => (
                    <MobileModelCard
                      key={model.id}
                      model={model}
                      isSelected={compareModels.includes(model.id)}
                      onToggleCompare={() => toggleCompare(model.id)}
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
                  {agentModels.map((model) => (
                    <MobileModelCard
                      key={model.id}
                      model={model}
                      isSelected={compareModels.includes(model.id)}
                      onToggleCompare={() => toggleCompare(model.id)}
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
                  {specialistModels.map((model) => (
                    <MobileModelCard
                      key={model.id}
                      model={model}
                      isSelected={compareModels.includes(model.id)}
                      onToggleCompare={() => toggleCompare(model.id)}
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

      {/* Preis-Leistungs-Ranking - Kompakte Tabelle */}
      <section id="value-ranking" data-reveal className="container mx-auto px-4 py-16">
        <div className={`transition-all duration-700 ${visibleItems.has('value-ranking') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 px-3 py-1.5">
              <Calculator className="w-3.5 h-3.5 mr-1.5 inline" />
              {language === 'de' ? 'Preis-Leistung' : 'Value'}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {language === 'de' ? 'Bestes Preis-Leistungs-Verhältnis' : 'Best Value for Money'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                model: 'Gemini 2.5 Flash-Lite',
                provider: 'Google',
                price: '$0.075',
                context: '1M',
                release: '2025-07',
                score: language === 'de' ? 'Bestes Budget' : 'Best Budget',
                color: 'bg-green-500/10 text-green-600 border-green-500/20'
              },
              {
                model: 'Gemini 2.5 Flash',
                provider: 'Google',
                price: '$0.15',
                context: '1M',
                release: '2025-06',
                score: language === 'de' ? 'Beste Balance' : 'Best Balance',
                color: 'bg-violet-500/10 text-violet-600 border-violet-500/20'
              },
              {
                model: 'Claude 3.7 Sonnet',
                provider: 'Anthropic',
                price: '$3.00',
                context: '200K',
                release: '2025-02',
                score: language === 'de' ? 'Bestes Coding' : 'Best Coding',
                color: 'bg-blue-500/10 text-blue-600 border-blue-500/20'
              },
            ].map((item, i) => (
              <Card key={item.model} className={`border-0 shadow-soft ${i === 0 ? 'ring-2 ring-green-500/30' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={`${item.color} text-xs`}>{item.score}</Badge>
                    <span className="text-2xl font-bold">#{i + 1}</span>
                  </div>
                  <CardTitle className="text-lg mt-2">{item.model}</CardTitle>
                  <CardDescription>{item.provider} • {item.release}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-xl font-bold">{item.price}</div>
                      <div className="text-xs text-muted-foreground">/ 1M tokens</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-xl font-bold">{item.context}</div>
                      <div className="text-xs text-muted-foreground">context</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              {language === 'de'
                ? 'Nur Modelle < 6 Monate alt (Stand: Feb 2026). Aktuelle Preise von Hersteller-Websites.'
                : 'Only models < 6 months old (as of Feb 2026). Current prices from manufacturer websites.'}
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter-section" data-reveal className="container mx-auto px-4 py-16">
        <div className={`transition-all duration-700 ${visibleItems.has('newsletter-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <NewsletterSignup variant="hero" />
        </div>
      </section>
    </div>
  );
}
