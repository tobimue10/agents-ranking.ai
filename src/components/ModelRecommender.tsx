"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Code, 
  MessageSquare, 
  Bot, 
  Wallet, 
  Zap, 
  Sparkles, 
  Target,
  Check,
  ArrowLeft,
  Lightbulb,
  Calculator
} from "lucide-react";
import { modelsData, ModelData } from "@/lib/models-data";
import { agentsData, AgentData } from "@/lib/agents-data";
import { useLanguage } from "@/components/LanguageProvider";

interface RecommendationResult {
  type: 'model' | 'agent';
  item: ModelData | AgentData;
  matchScore: number;
  reasons: string[];
}

export function ModelRecommender() {
  const { language } = useLanguage();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: "goal",
      question: language === 'de' ? "Was ist dein Hauptziel?" : "What is your main goal?",
      options: [
        { id: "coding", label: language === 'de' ? "Coding & Entwicklung" : "Coding & Development", icon: Code },
        { id: "chat", label: language === 'de' ? "Chat & Konversation" : "Chat & Conversation", icon: MessageSquare },
        { id: "agent", label: language === 'de' ? "Autonome Agenten" : "Autonomous Agents", icon: Bot },
        { id: "multimodal", label: language === 'de' ? "Bilder/Videos/Audio" : "Images/Videos/Audio", icon: Sparkles },
      ]
    },
    {
      id: "budget",
      question: language === 'de' ? "Wie wichtig ist der Preis?" : "How important is price?",
      options: [
        { id: "free", label: language === 'de' ? "Kostenlos bevorzugt" : "Free preferred", icon: Wallet },
        { id: "budget", label: language === 'de' ? "Budget-freundlich" : "Budget-friendly", icon: Calculator },
        { id: "balanced", label: language === 'de' ? "Preis-Leistung" : "Price-Performance", icon: Target },
        { id: "performance", label: language === 'de' ? "Beste Performance" : "Best Performance", icon: Zap },
      ]
    },
    {
      id: "context",
      question: language === 'de' ? "Wie viel Kontext brauchst du?" : "How much context do you need?",
      options: [
        { id: "small", label: language === 'de' ? "Kurze Chats (< 4k Tokens)" : "Short chats (< 4k tokens)", icon: MessageSquare },
        { id: "medium", label: language === 'de' ? "Mittel (4k-128k)" : "Medium (4k-128k)", icon: Target },
        { id: "large", label: language === 'de' ? "Große Dokumente (128k-1M)" : "Large documents (128k-1M)", icon: Lightbulb },
      ]
    },
    {
      id: "api",
      question: language === 'de' ? "Brauchst du API-Zugang?" : "Do you need API access?",
      options: [
        { id: "yes", label: language === 'de' ? "Ja, für Integration" : "Yes, for integration", icon: Code },
        { id: "no", label: language === 'de' ? "Nein, nur Chat-Interface" : "No, chat interface only", icon: MessageSquare },
        { id: "maybe", label: language === 'de' ? "Weiß noch nicht" : "Not sure yet", icon: Lightbulb },
      ]
    }
  ];

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const getRecommendations = useMemo((): RecommendationResult[] => {
    const results: RecommendationResult[] = [];
    
    // Filter non-archived models
    const activeModels = modelsData.filter(m => !m.is_archived);
    const activeAgents = agentsData.filter(a => !a.is_archived);

    // Score each model based on answers
    activeModels.forEach(model => {
      let score = 0;
      const reasons: string[] = [];

      // Goal matching
      if (answers.goal === 'coding' && model.category.includes('coding')) {
        score += 30;
        reasons.push(language === 'de' ? "Optimiert für Coding" : "Optimized for coding");
      }
      if (answers.goal === 'chat' && model.category.includes('llm') && !model.category.includes('coding')) {
        score += 25;
        reasons.push(language === 'de' ? "Gut für Konversationen" : "Good for conversations");
      }
      if (answers.goal === 'agent' && model.category.includes('agentic')) {
        score += 35;
        reasons.push(language === 'de' ? "Agentic Capabilities" : "Agentic capabilities");
      }
      if (answers.goal === 'multimodal' && model.category.includes('multimodal')) {
        score += 35;
        reasons.push(language === 'de' ? "Multimodal (Bild/Text)" : "Multimodal (image/text)");
      }

      // Budget matching
      const totalPrice = model.pricing_input + model.pricing_output;
      if (answers.budget === 'free' && totalPrice === 0) {
        score += 30;
        reasons.push(language === 'de' ? "Kostenlos verfügbar" : "Free available");
      } else if (answers.budget === 'budget' && totalPrice < 5) {
        score += 25;
        reasons.push(language === 'de' ? "Sehr günstig" : "Very affordable");
      } else if (answers.budget === 'balanced' && totalPrice < 20) {
        score += 20;
        reasons.push(language === 'de' ? "Gutes Preis-Leistung" : "Good price-performance");
      } else if (answers.budget === 'performance' && model.benchmarks?.mmlu && model.benchmarks.mmlu > 89) {
        score += 25;
        reasons.push(language === 'de' ? "Top Performance" : "Top performance");
      }

      // Context matching
      if (answers.context === 'small' && model.context_window <= 32000) {
        score += 15;
      } else if (answers.context === 'medium' && model.context_window >= 32000 && model.context_window <= 256000) {
        score += 20;
        reasons.push(language === 'de' ? `Guter Kontext (${(model.context_window/1000).toFixed(0)}k)` : `Good context (${(model.context_window/1000).toFixed(0)}k)`);
      } else if (answers.context === 'large' && model.context_window >= 256000) {
        score += 25;
        reasons.push(language === 'de' ? `Riesiger Kontext (${(model.context_window/1000000).toFixed(1)}M)` : `Huge context (${(model.context_window/1000000).toFixed(1)}M)`);
      }

      // API matching
      if (answers.api === 'yes' && model.api_available) {
        score += 15;
        reasons.push(language === 'de' ? "API verfügbar" : "API available");
      }

      if (score > 40) {
        results.push({ type: 'model', item: model, matchScore: score, reasons });
      }
    });

    // Score agents if goal is agent-related
    if (answers.goal === 'agent' || answers.goal === 'coding') {
      activeAgents.forEach(agent => {
        let score = 0;
        const reasons: string[] = [];

        if (answers.goal === 'agent') {
          score += 30;
          reasons.push(language === 'de' ? "Autonomer Agent" : "Autonomous agent");
        }
        if (answers.goal === 'coding' && agent.category.includes('Coding')) {
          score += 35;
          reasons.push(language === 'de' ? "Spezialisiert auf Coding" : "Specialized for coding");
        }

        // Budget matching for agents
        if (answers.budget === 'free' && agent.pricing.free) {
          score += 30;
          reasons.push(language === 'de' ? "Kostenlos" : "Free");
        } else if (answers.budget === 'budget' && (agent.pricing.free || (agent.pricing.monthly && agent.pricing.monthly < 20))) {
          score += 25;
          reasons.push(language === 'de' ? "Budget-freundlich" : "Budget-friendly");
        }

        if (score > 30) {
          results.push({ type: 'agent', item: agent, matchScore: score, reasons });
        }
      });
    }

    return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  }, [answers, language]);

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <Card className="border-0 shadow-soft overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>
              {language === 'de' ? "KI-Modell Finder" : "AI Model Finder"}
            </CardTitle>
            <CardDescription>
              {language === 'de' 
                ? "Finde das perfekte Modell für deinen Use-Case in 4 Schritten"
                : "Find the perfect model for your use case in 4 steps"}
            </CardDescription>
          </div>
        </div>
        <Progress value={progress} className="mt-4" />
      </CardHeader>

      <CardContent className="p-6">
        {step < questions.length ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{questions[step].question}</h3>
              <span className="text-sm text-muted-foreground">
                {step + 1} / {questions.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {questions[step].options.map((option) => {
                const Icon = option.icon;
                const isSelected = answers[questions[step].id] === option.id;
                
                return (
                  <Button
                    key={option.id}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-auto py-4 px-4 justify-start gap-3 text-left ${
                      isSelected ? 'ring-2 ring-violet-500' : ''
                    }`}
                    onClick={() => handleAnswer(questions[step].id, option.id)}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="font-medium">{option.label}</span>
                    {isSelected && <Check className="w-4 h-4 ml-auto" />}
                  </Button>
                );
              })}
            </div>

            {step > 0 && (
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === 'de' ? "Zurück" : "Back"}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'de' ? "Deine Empfehlungen" : "Your Recommendations"}
              </h3>
              <p className="text-muted-foreground">
                {language === 'de' 
                  ? "Basierend auf deinen Antworten empfehlen wir:"
                  : "Based on your answers, we recommend:"}
              </p>
            </div>

            <div className="space-y-4">
              {getRecommendations.map((rec, index) => (
                <Card key={rec.item.id || rec.item.name} className={`border-0 shadow-soft ${
                  index === 0 ? 'ring-2 ring-violet-500/50' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        index === 0 
                          ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white' 
                          : 'bg-muted'
                      }`}>
                        {index === 0 ? <Sparkles className="w-5 h-5" /> : <span className="font-bold">#{index + 1}</span>}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-lg">{rec.item.name}</h4>
                          <Badge variant="outline">{rec.item.provider}</Badge>
                          <Badge variant={rec.type === 'agent' ? "secondary" : "default"}>
                            {rec.type === 'agent' ? 'Agent' : 'LLM'}
                          </Badge>
                          {index === 0 && (
                            <Badge className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                              {language === 'de' ? "Beste Wahl" : "Best Choice"}
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {rec.item.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {rec.reasons.slice(0, 3).map((reason, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              <Check className="w-3 h-3 mr-1" />
                              {reason}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm">
                          {rec.type === 'model' ? (
                            <>
                              <span className="text-muted-foreground">
                                {(rec.item as ModelData).pricing_input === 0 && (rec.item as ModelData).pricing_output === 0
                                  ? (language === 'de' ? "Kostenlos" : "Free")
                                  : `$${(rec.item as ModelData).pricing_input}/1M tokens`
                                }
                              </span>
                              {(rec.item as ModelData).benchmarks?.mmlu && (
                                <span className="text-muted-foreground">
                                  MMLU: {(rec.item as ModelData).benchmarks.mmlu}%
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-muted-foreground">
                              {(rec.item as AgentData).pricing.free
                                ? (language === 'de' ? "Kostenlos" : "Free")
                                : (rec.item as AgentData).pricing.monthly
                                  ? `$${(rec.item as AgentData).pricing.monthly}/Monat`
                                  : ''
                              }
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button onClick={reset} className="w-full gap-2">
              <ArrowLeft className="w-4 h-4" />
              {language === 'de' ? "Neu starten" : "Start Over"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
