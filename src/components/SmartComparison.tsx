"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Wallet, 
  Zap, 
  Scale,
  ArrowRight
} from "lucide-react";
import { modelsData } from "@/lib/models-data";
import { useLanguage } from "@/components/LanguageProvider";

interface ComparisonScenario {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  models: string[];
  criteria: string[];
}

export function SmartComparison() {
  const { language } = useLanguage();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  // Pre-defined comparison scenarios based on actual data
  const scenarios: ComparisonScenario[] = [
    {
      id: "coding-premium",
      title: language === 'de' ? "Premium Coding: Claude vs GPT" : "Premium Coding: Claude vs GPT",
      description: language === 'de' 
        ? "Die beiden besten Coding-Modelle im direkten Vergleich"
        : "The two best coding models compared directly",
      icon: Code,
      models: ["claude-opus-4-6", "gpt-5-2"],
      criteria: ["HumanEval", "Preis", "Kontext", "Agentic"]
    },
    {
      id: "budget-coding",
      title: language === 'de' ? "Budget Coding: Beste unter $2" : "Budget Coding: Best under $2",
      description: language === 'de'
        ? "Gute Coding-Performance ohne hohe Kosten"
        : "Good coding performance without high costs",
      icon: Wallet,
      models: ["gpt-5-1", "gemini-3-1-pro"],
      criteria: ["HumanEval", "Preis", "MMLU"]
    },
    {
      id: "performance",
      title: language === 'de' ? "Beste Performance (egal was es kostet)" : "Best Performance (regardless of cost)",
      description: language === 'de'
        ? "Die Spitzenreiter bei MMLU und Reasoning"
        : "The leaders in MMLU and reasoning",
      icon: Zap,
      models: ["gemini-3-1-pro", "claude-opus-4-6"],
      criteria: ["MMLU", "GPQA", "ARC-AGI", "Preis"]
    },
    {
      id: "long-context",
      title: language === 'de' ? "Langer Kontext Vergleich" : "Long Context Comparison",
      description: language === 'de'
        ? "Modelle mit 1M+ Token Kontext"
        : "Models with 1M+ token context",
      icon: Scale,
      models: ["claude-opus-4-6", "claude-sonnet-4-6", "gemini-3-1-pro"],
      criteria: ["Kontext", "Preis", "MMLU"]
    }
  ];

  const getModelData = (modelId: string) => {
    return modelsData.find(m => m.id === modelId && !m.is_archived);
  };

  const renderComparison = (scenario: ComparisonScenario) => {
    const models = scenario.models.map(getModelData).filter(Boolean);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedScenario(null)} className="gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            {language === 'de' ? "Zurück" : "Back"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {models.map((model, idx) => (
            <Card key={model.id} className={`border-0 shadow-soft ${
              idx === 0 ? 'ring-2 ring-violet-500/30' : ''
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{model.name}</CardTitle>
                  <Badge variant="outline">{model.provider}</Badge>
                </div>
                <CardDescription>{model.description.slice(0, 100)}...</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scenario.criteria.map(criteria => {
                    let value: string | number = '-';
                    let highlight = false;

                    switch (criteria.toLowerCase()) {
                      case 'humaneval':
                        value = model.benchmarks?.humaneval ? `${model.benchmarks.humaneval}%` : '-';
                        highlight = (model.benchmarks?.humaneval || 0) > 93;
                        break;
                      case 'mmlu':
                        value = model.benchmarks?.mmlu ? `${model.benchmarks.mmlu}%` : '-';
                        highlight = (model.benchmarks?.mmlu || 0) > 90;
                        break;
                      case 'gpqa':
                        value = model.benchmarks?.gpqa ? `${model.benchmarks.gpqa}%` : '-';
                        highlight = (model.benchmarks?.gpqa || 0) > 90;
                        break;
                      case 'preis':
                        value = `$${model.pricing_input}/1M`;
                        highlight = model.pricing_input < 3;
                        break;
                      case 'kontext':
                        value = model.context_window >= 1000000 
                          ? `${(model.context_window/1000000).toFixed(0)}M` 
                          : `${(model.context_window/1000).toFixed(0)}k`;
                        highlight = model.context_window >= 1000000;
                        break;
                      case 'agentic':
                        value = model.category.includes('agentic') ? '✓' : '-';
                        highlight = model.category.includes('agentic');
                        break;
                      case 'arc-agi':
                        value = model.id === 'gemini-3-1-pro' ? '77.1%' : '-';
                        highlight = model.id === 'gemini-3-1-pro';
                        break;
                    }

                    return (
                      <div key={criteria} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <span className="text-sm text-muted-foreground">{criteria}</span>
                        <span className={`font-semibold ${highlight ? 'text-green-600' : ''}`}>
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-2">
                    {language === 'de' ? "Beste für:" : "Best for:"}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {model.best_for.slice(0, 3).map(use => (
                      <Badge key={use} variant="secondary" className="text-xs">
                        <Check className="w-3 h-3 mr-1" />
                        {use}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Winner summary */}
        <Card className="border-0 shadow-soft bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold">
                  {language === 'de' ? "Unsere Empfehlung:" : "Our recommendation:"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {scenario.id === 'coding-premium' && (language === 'de' 
                    ? "Claude Opus 4.6 für komplexe Agentic-Tasks, GPT-5.2 für präzises Coding"
                    : "Claude Opus 4.6 for complex agentic tasks, GPT-5.2 for precise coding")}
                  {scenario.id === 'budget-coding' && (language === 'de'
                    ? "Gemini 3.1 Pro bietet die beste Performance pro Dollar"
                    : "Gemini 3.1 Pro offers the best performance per dollar")}
                  {scenario.id === 'performance' && (language === 'de'
                    ? "Gemini 3.1 Pro hat den höchsten MMLU-Score, Claude Opus 4.6 die beste Agentic-Performance"
                    : "Gemini 3.1 Pro has the highest MMLU score, Claude Opus 4.6 the best agentic performance")}
                  {scenario.id === 'long-context' && (language === 'de'
                    ? "Claude Sonnet 4.6 bietet 1M Kontext zum besten Preis ($3/1M)"
                    : "Claude Sonnet 4.6 offers 1M context at the best price ($3/1M)")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {selectedScenario ? (
        renderComparison(scenarios.find(s => s.id === selectedScenario)!)
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((scenario) => {
            const Icon = scenario.icon;
            
            return (
              <Card 
                key={scenario.id} 
                className="border-0 shadow-soft card-lift cursor-pointer hover:ring-2 hover:ring-violet-500/30 transition-all"
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-violet-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{scenario.title}</CardTitle>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <CardDescription className="mt-2">{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {scenario.models.map(modelId => {
                      const model = getModelData(modelId);
                      return model ? (
                        <Badge key={modelId} variant="secondary">
                          {model.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
