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
  Brain
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
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
import { modelsData } from "@/lib/models-data";
import { PriceCalculator } from "@/components/PriceCalculator";
import { UseCaseRecommendations } from "@/components/UseCaseRecommendations";
import { NewsletterSignup } from "@/components/NewsletterSignup";

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
    // Simulate loading for skeleton effect
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
    { id: 'llm', label: 'LLM', icon: Brain },
    { id: 'agent', label: 'Agent', icon: Sparkles },
    { id: 'image', label: 'Bild', icon: Palette },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'coding', label: 'Coding', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Hero Section - Redesigned */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 hero-gradient" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-[5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse-glow delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse-glow delay-1000" />
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="animate-fade-in-up">
              <Badge 
                className="mb-8 text-sm px-5 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm text-foreground border border-border/50 hover:bg-white dark:hover:bg-white/15 transition-all duration-300 shadow-sm"
                variant="outline"
              >
                <span className="w-2 h-2 rounded-full bg-violet-500 mr-2 animate-pulse" />
                {language === 'de' ? 'Deine KI-Vergleichsplattform' : language === 'es' ? 'Tu plataforma de comparación de IA' : language === 'fr' ? 'Votre plateforme de comparaison IA' : 'Your AI Comparison Platform'}
              </Badge>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight animate-fade-in-up delay-100">
              <span className="block text-foreground">
                {language === 'de' ? 'Finde das' : language === 'es' ? 'Encuentra el' : language === 'fr' ? 'Trouvez le' : 'Find the'}
              </span>
              <span className="block gradient-text mt-2">
                {language === 'de' ? 'perfekte KI-Modell' : language === 'es' ? 'modelo de IA perfecto' : language === 'fr' ? "modèle d'IA parfait" : 'perfect AI model'}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              {language === 'de' 
                ? 'Der umfassendste KI Vergleich für LLMs, Agents und KI-Tools. Unabhängige Benchmarks, aktuelle Preise und detaillierte Analysen.'
                : language === 'es'
                ? 'La comparación de IA más completa para LLMs, Agentes y herramientas de IA. Benchmarks independientes, precios actualizados y análisis detallados.'
                : language === 'fr'
                ? "La comparaison d'IA la plus complète pour les LLMs, Agents et outils d'IA. Benchmarks indépendants, prix actuels et analyses détaillées."
                : 'The most comprehensive AI comparison for LLMs, Agents and AI tools. Independent benchmarks, current prices and detailed analyses.'}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up delay-300">
              <Link href="#comparison-table">
                <Button 
                  size="lg" 
                  className="gap-2 min-w-[200px] h-14 text-base font-medium bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  {language === 'de' ? 'Vergleich starten' : language === 'es' ? 'Iniciar comparación' : language === 'fr' ? 'Démarrer la comparaison' : 'Start Comparison'}
                </Button>
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="gap-2 min-w-[200px] h-14 text-base font-medium border-2 hover:bg-muted/50 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Calculator className="w-4 h-4" />
                    {language === 'de' ? 'Preis-Rechner' : language === 'es' ? 'Calculadora de precios' : language === 'fr' ? 'Calculateur de prix' : 'Price Calculator'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{language === 'de' ? 'KI-Preis-Rechner' : language === 'es' ? 'Calculadora de precios de IA' : language === 'fr' ? "Calculateur de prix d'IA" : 'AI Price Calculator'}</DialogTitle>
                    <DialogDescription>
                      {language === 'de' 
                        ? 'Vergleiche Kosten für alle Modelle mit interaktivem Slider'
                        : language === 'es'
                        ? 'Compara costos para todos los modelos con deslizador interactivo'
                        : language === 'fr'
                        ? "Comparez les coûts pour tous les modèles avec curseur interactif"
                        : 'Compare costs for all models with interactive slider'}
                    </DialogDescription>
                  </DialogHeader>
                  <PriceCalculator showComparison={true} />
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Stats Row */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up delay-500">
              {[
                { value: "50+", label: language === 'de' ? 'KI-Modelle' : language === 'es' ? 'Modelos de IA' : language === 'fr' ? "Modèles d'IA" : 'AI Models' },
                { value: "20+", label: language === 'de' ? 'Agents' : language === 'es' ? 'Agentes' : language === 'fr' ? 'Agents' : 'Agents' },
                { value: "Daily", label: language === 'de' ? 'Updates' : language === 'es' ? 'Actualizaciones' : language === 'fr' ? 'Mises à jour' : 'Updates' },
                { value: "100%", label: language === 'de' ? 'Unabhängig' : language === 'es' ? 'Independiente' : language === 'fr' ? 'Indépendant' : 'Independent' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Use Case Recommendations Section */}
      <section id="usecase-section" data-reveal className="container mx-auto px-4 py-24">
        <div className={`transition-all duration-1000 ease-out ${visibleItems.has('usecase-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <UseCaseRecommendations variant="full" />
        </div>
      </section>

      {/* Price Calculator Section */}
      <section id="price-section" data-reveal className="container mx-auto px-4 py-24">
        <div className={`relative bg-muted/30 rounded-3xl p-10 md:p-16 transition-all duration-1000 ease-out overflow-hidden ${visibleItems.has('price-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px]" />
          
          <div className="relative text-center mb-12">
            <Badge variant="outline" className="mb-6 px-4 py-1.5">
              <Calculator className="w-3.5 h-3.5 mr-1.5 inline" />
              {language === 'de' ? 'Kostenrechner' : 'Cost Calculator'}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'de' ? 'KI Preis-Rechner' : 'AI Price Calculator'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              {language === 'de' 
                ? 'Berechne die monatlichen Kosten für deine Token-Nutzung und vergleiche alle Modelle'
                : 'Calculate monthly costs for your token usage and compare all models'}
            </p>
          </div>
          <PriceCalculator showComparison={true} />
        </div>
      </section>

      {/* Interactive Comparison Table */}
      <section id="comparison-table" data-reveal className="container mx-auto px-4 py-24">
        <div className={`transition-all duration-1000 ease-out ${visibleItems.has('comparison-table') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-6 px-4 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 inline" />
              {language === 'de' ? 'Interaktiver Vergleich' : 'Interactive Comparison'}
            </Badge>            
            <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">
              {language === 'de' ? 'Interaktiver KI Vergleich' : 'Interactive AI Comparison'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              {language === 'de' 
                ? 'Vergleiche alle KI-Modelle mit Filter, Sortierung und direktem Modell-Vergleich'
                : 'Compare all AI models with filters, sorting and direct model comparison'}
            </p>
          </div>

          {/* Search and Filter Bar */}
          <Card className="mb-6 border-0 shadow-soft">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder={language === 'de' ? 'Modelle suchen...' : 'Search models...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                      size="default"
                      onClick={() => toggleFilter(filter.id)}
                      className="gap-2 h-12 px-4"
                    >
                      <filter.icon className="w-4 h-4" />
                      {filter.label}
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
                      <Link href={`/models/${model.id}`}>
                        <Button className="w-full mt-4">
                          {language === 'de' ? 'Details ansehen' : 'View Details'}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Models Table */}
          <Card className="border-0 shadow-soft overflow-hidden">
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
                    {filteredModels.map((model, index) => (
                      <TableRow 
                        key={model.id} 
                        className="group transition-colors hover:bg-muted/50"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <TableCell>
                          <Checkbox
                            checked={compareModels.includes(model.id)}
                            onCheckedChange={() => toggleCompare(model.id)}
                            className="border-2"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <Link 
                            href={`/models/${model.id}`} 
                            className="hover:text-primary transition-colors"
                          >
                            {model.name}
                          </Link>
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
                          <Link href={`/models/${model.id}`}>
                            <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                              {language === 'de' ? 'Details' : 'Details'}
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </Card>

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

      {/* Video Section */}
      <section id="video-section" data-reveal className="container mx-auto px-4 py-16">
        <div className={`transition-all duration-700 ${visibleItems.has('video-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4">
              <Video className="w-3.5 h-3.5 mr-1.5 inline" />
              {language === 'de' ? 'Reviews & Tutorials' : 'Reviews & Tutorials'}
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'de' ? 'KI-Modell Reviews & Tutorials' : 'AI Model Reviews & Tutorials'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modelsData.slice(0, 6).map((model, index) => (
              <Card 
                key={model.id} 
                className="overflow-hidden group border-0 shadow-soft"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={model.video_url}
                    title={`${model.name} Review`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{model.name}</CardTitle>
                  <CardDescription>{model.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{model.description}</p>
                  <Link href={`/models/${model.id}`}>
                    <Button variant="ghost" size="sm" className="mt-4 group/btn">
                      {language === 'de' ? 'Mehr erfahren' : 'Learn more'}
                      <span className="ml-1 transition-transform group-hover/btn:translate-x-1">→</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
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
              <CardTitle className="text-2xl">{language === 'de' ? 'Was ist der beste KI Vergleich?' : 'What is the best AI Comparison?'}</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {language === 'de' 
                  ? 'agents-ranking.ai ist die führende Plattform für Agent Vergleich und KI Vergleich. Wir bieten unabhängige Benchmarks, aktuelle Preise und detaillierte Analysen aller führenden KI-Modelle.'
                  : 'agents-ranking.ai is the leading platform for agent comparison and AI comparison. We offer independent benchmarks, current prices and detailed analyses of all leading AI models.'}
              </p>
              
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
                    <span className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center text-info text-sm">M</span>
                    MATH
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {language === 'de' 
                      ? 'Bewertet mathematisches Reasoning auf Wettkampfniveau.'
                      : 'Evaluates mathematical reasoning at competition level.'}
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
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
