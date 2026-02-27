"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Wallet, 
  Zap, 
  GraduationCap,
  Briefcase,
  Sparkles,
  ArrowRight,
  Check
} from "lucide-react";
import { modelsData } from "@/lib/models-data";
import { agentsData } from "@/lib/agents-data";
import { useLanguage } from "@/components/LanguageProvider";

interface UseCaseCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  recommended: {
    name: string;
    provider: string;
    reason: string;
    price: string;
  }[];
  tags: string[];
}

export function UseCaseRecommendations() {
  const { language } = useLanguage();

  // Generate use cases based on actual data
  const useCases: UseCaseCard[] = [
    {
      id: "beginner",
      title: language === 'de' ? "Beste Einstieg" : "Best for Beginners",
      description: language === 'de' 
        ? "Einfach zu nutzen, gute Dokumentation, fairer Preis"
        : "Easy to use, good documentation, fair price",
      icon: GraduationCap,
      recommended: [
        {
          name: "Gemini 3 Flash",
          provider: "Google",
          reason: language === 'de' ? "1M Kontext, günstig, einfach" : "1M context, affordable, simple",
          price: "$0.50/1M"
        },
        {
          name: "GPT-5 Mini",
          provider: "OpenAI",
          reason: language === 'de' ? "Sehr günstig, zuverlässig" : "Very cheap, reliable",
          price: "$0.15/1M"
        }
      ],
      tags: ["budget", "einfach", "schnell"]
    },
    {
      id: "coding",
      title: language === 'de' ? "Bestes für Coding" : "Best for Coding",
      description: language === 'de'
        ? "Hohe HumanEval-Scores, gute IDE-Integration"
        : "High HumanEval scores, good IDE integration",
      icon: Code,
      recommended: [
        {
          name: "Claude Opus 4.6",
          provider: "Anthropic",
          reason: language === 'de' ? "94% HumanEval, beste Agentic" : "94% HumanEval, best agentic",
          price: "$5.00/1M"
        },
        {
          name: "GPT-5.2",
          provider: "OpenAI",
          reason: language === 'de' ? "93.5% HumanEval, präzise" : "93.5% HumanEval, precise",
          price: "$5.00/1M"
        }
      ],
      tags: ["coding", "agentic", "enterprise"]
    },
    {
      id: "budget",
      title: language === 'de' ? "Bestes Preis-Leistung" : "Best Price-Performance",
      description: language === 'de'
        ? "Gute Performance bei niedrigem Preis"
        : "Good performance at low price",
      icon: Wallet,
      recommended: [
        {
          name: "GPT-5.1",
          provider: "OpenAI",
          reason: language === 'de' ? "89.8% MMLU, nur $1.25/1M" : "89.8% MMLU, only $1.25/1M",
          price: "$1.25/1M"
        },
        {
          name: "Gemini 3.1 Pro",
          provider: "Google",
          reason: language === 'de' ? "91.8% MMLU, nur $2.00/1M" : "91.8% MMLU, only $2.00/1M",
          price: "$2.00/1M"
        }
      ],
      tags: ["budget", "mmlu", "api"]
    },
    {
      id: "performance",
      title: language === 'de' ? "Beste Performance" : "Best Performance",
      description: language === 'de'
        ? "Höchste Benchmark-Scores, egal was es kostet"
        : "Highest benchmark scores, regardless of cost",
      icon: Zap,
      recommended: [
        {
          name: "Gemini 3.1 Pro",
          provider: "Google",
          reason: language === 'de' ? "91.8% MMLU, 77.1% ARC-AGI" : "91.8% MMLU, 77.1% ARC-AGI",
          price: "$2.00/1M"
        },
        {
          name: "Claude Opus 4.6",
          provider: "Anthropic",
          reason: language === 'de' ? "91.0% MMLU, beste Agentic" : "91.0% MMLU, best agentic",
          price: "$5.00/1M"
        }
      ],
      tags: ["premium", "mmlu", "arc-agi"]
    },
    {
      id: "longcontext",
      title: language === 'de' ? "Langer Kontext" : "Long Context",
      description: language === 'de'
        ? "Für große Dokumente, Bücher, Codebases"
        : "For large documents, books, codebases",
      icon: Sparkles,
      recommended: [
        {
          name: "Claude Opus 4.6",
          provider: "Anthropic",
          reason: language === 'de' ? "1M Token Kontext" : "1M token context",
          price: "$5.00/1M"
        },
        {
          name: "Gemini 3.1 Pro",
          provider: "Google",
          reason: language === 'de' ? "1M Token, günstiger" : "1M token, cheaper",
          price: "$2.00/1M"
        }
      ],
      tags: ["1M-context", "dokumente", "research"]
    },
    {
      id: "agent",
      title: language === 'de' ? "Autonome Agenten" : "Autonomous Agents",
      description: language === 'de'
        ? "Für komplexe Workflows, die selbstständig arbeiten"
        : "For complex workflows that work autonomously",
      icon: Briefcase,
      recommended: [
        {
          name: "Claude Opus 4.6",
          provider: "Anthropic",
          reason: language === 'de' ? "Beste Agentic-Capabilities" : "Best agentic capabilities",
          price: "$5.00/1M"
        },
        {
          name: "GPT-5.3-Codex",
          provider: "OpenAI",
          reason: language === 'de' ? "77.3% Terminal-Bench" : "77.3% Terminal-Bench",
          price: "$1.75/1M"
        }
      ],
      tags: ["agentic", "workflows", "autonom"]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {useCases.map((useCase) => {
        const Icon = useCase.icon;
        
        return (
          <Card key={useCase.id} className="border-0 shadow-soft card-lift overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </div>
              </div>
              <CardDescription className="mt-2">{useCase.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                {useCase.recommended.map((rec, idx) => (
                  <div 
                    key={rec.name}
                    className={`p-3 rounded-lg ${
                      idx === 0 
                        ? 'bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20' 
                        : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{rec.name}</span>
                        <Badge variant="outline" className="text-xs">{rec.provider}</Badge>
                        {idx === 0 && <Badge className="text-xs bg-violet-500 text-white">#1</Badge>}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{rec.reason}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-green-600">{rec.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1 mt-4">
                {useCase.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
