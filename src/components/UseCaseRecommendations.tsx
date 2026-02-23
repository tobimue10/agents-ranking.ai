"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  PenTool, 
  Search, 
  Check, 
  Star,
  ArrowRight,
  Zap,
  Brain,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import Link from "next/link";

interface UseCaseRecommendationsProps {
  variant?: 'compact' | 'full';
}

interface Recommendation {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  topPick: {
    name: string;
    provider: string;
    reason: string;
    reasonEn: string;
    badges: string[];
  };
  alternatives: {
    name: string;
    provider: string;
    reason: string;
    reasonEn: string;
  }[];
  features: string[];
  featuresEn: string[];
}

const recommendations: Recommendation[] = [
  {
    id: "coding",
    title: "Beste KI für Coding",
    titleEn: "Best AI for Coding",
    description: "Optimale Modelle für Code-Generierung, Debugging und Software-Entwicklung",
    descriptionEn: "Optimal models for code generation, debugging and software development",
    icon: Code2,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    topPick: {
      name: "Claude 4.6 Sonnet",
      provider: "Anthropic",
      reason: "79.6% SWE-bench, Opus-Level Performance",
      reasonEn: "79.6% SWE-bench, Opus-level performance",
      badges: ["#1 Coding", "79.6% SWE-bench", "1M Context"]
    },
    alternatives: [
      {
        name: "DeepSeek V3",
        provider: "DeepSeek",
        reason: "85% HumanEval, extrem günstig (1.50$/1M)",
        reasonEn: "85% HumanEval, extremely cheap ($1.50/1M)"
      },
      {
        name: "Qwen 2.5 Coder",
        provider: "Alibaba",
        reason: "Bester chinesischer Coder, 90% HumanEval",
        reasonEn: "Best Chinese coder, 90% HumanEval"
      }
    ],
    features: [
      "Code-Generierung & Autocomplete",
      "Debugging & Fehleranalyse", 
      "Code-Review & Refactoring",
      "Mehrere Programmiersprachen"
    ],
    featuresEn: [
      "Code generation & autocomplete",
      "Debugging & error analysis",
      "Code review & refactoring", 
      "Multiple programming languages"
    ]
  },
  {
    id: "writing",
    title: "Beste KI für Writing",
    titleEn: "Best AI for Writing",
    description: "Ideale Modelle für Content-Erstellung, Textverbesserung und kreatives Schreiben",
    descriptionEn: "Ideal models for content creation, text improvement and creative writing",
    icon: PenTool,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    topPick: {
      name: "Claude 4.6 Sonnet",
      provider: "Anthropic",
      reason: "Natürlichster Schreibstil, 1M Kontext",
      reasonEn: "Most natural writing style, 1M context",
      badges: ["#1 Writing", "Natürlicher Stil", "1M Context"]
    },
    alternatives: [
      {
        name: "GPT-4o",
        provider: "OpenAI",
        reason: "Vielseitig, schnell, günstig",
        reasonEn: "Versatile, fast, affordable"
      },
      {
        name: "Kimi K1.5",
        provider: "Moonshot AI",
        reason: "200k Kontext, guter chinesischer Support",
        reasonEn: "200k context, good Chinese support"
      }
    ],
    features: [
      "Blog-Artikel & Content",
      "Marketing-Texte & Copywriting",
      "E-Mails & Geschäftsbriefe",
      "Kreatives Schreiben & Storytelling"
    ],
    featuresEn: [
      "Blog articles & content",
      "Marketing copy & copywriting",
      "Emails & business letters",
      "Creative writing & storytelling"
    ]
  },
  {
    id: "research",
    title: "Beste KI für Research",
    titleEn: "Best AI for Research",
    description: "Leistungsstarke Modelle für Recherche, Dokumentenanalyse und Wissensarbeit",
    descriptionEn: "Powerful models for research, document analysis and knowledge work",
    icon: Search,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    topPick: {
      name: "Gemini 3.1 Pro",
      provider: "Google",
      reason: "77.1% ARC-AGI-2, 2x besseres Reasoning, 1M Kontext",
      reasonEn: "77.1% ARC-AGI-2, 2x better reasoning, 1M context",
      badges: ["#1 Research", "77.1% ARC-AGI-2", "1M Context"]
    },
    alternatives: [
      {
        name: "Claude 4.6 Sonnet",
        provider: "Anthropic",
        reason: "1M Kontext, exzellentes Reasoning",
        reasonEn: "1M context, excellent reasoning"
      },
      {
        name: "Kimi K1.5",
        provider: "Moonshot AI",
        reason: "200k Kontext, sehr günstig",
        reasonEn: "200k context, very affordable"
      }
    ],
    features: [
      "Lange Dokumente analysieren",
      "Wissenschaftliche Recherche",
      "Datenextraktion & Synthese",
      "Video- & Audio-Analyse"
    ],
    featuresEn: [
      "Analyze long documents",
      "Scientific research",
      "Data extraction & synthesis",
      "Video & audio analysis"
    ]
  }
];

export function UseCaseRecommendations({ variant = 'full' }: UseCaseRecommendationsProps) {
  const { language } = useLanguage();

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className={`${rec.bgColor} border-0`}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${rec.color}`}>
                  <rec.icon className="w-5 h-5" />
                </div>
                <Badge variant="secondary" className="ml-auto">
                  <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
                  Top Pick
                </Badge>
              </div>
              <CardTitle className="text-lg">{language === 'de' ? rec.title : rec.titleEn}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <p className="font-semibold">{rec.topPick.name}</p>
                  <p className="text-xs text-muted-foreground">{rec.topPick.provider}</p>
                </div>
                <Link href={`/models`}>
                  <Button variant="ghost" size="sm" className="w-full gap-1">
                    {language === 'de' ? 'Alle Modelle' : 'All Models'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">
          {language === 'de' ? 'KI-Empfehlungen nach Use-Case' : 'AI Recommendations by Use Case'}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === 'de' 
            ? 'Finde die perfekte KI für deinen spezifischen Anwendungsfall. Basierend auf Benchmarks, Preisen und Fähigkeiten.'
            : 'Find the perfect AI for your specific use case. Based on benchmarks, pricing and capabilities.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="flex flex-col">
            <CardHeader className={`${rec.bgColor}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm ${rec.color}`}>
                  <rec.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">{language === 'de' ? rec.title : rec.titleEn}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-sm">
                {language === 'de' ? rec.description : rec.descriptionEn}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 space-y-4 pt-4">
              {/* Top Pick */}
              <div className="border rounded-xl p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-yellow-200">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                  <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                    {language === 'de' ? 'Top Empfehlung' : 'Top Recommendation'}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold mb-1">{rec.topPick.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{rec.topPick.provider}</p>
                
                <p className="text-sm mb-3">{language === 'de' ? rec.topPick.reason : rec.topPick.reasonEn}</p>
                
                <div className="flex flex-wrap gap-1">
                  {rec.topPick.badges.map((badge, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {language === 'de' ? 'Ideal für:' : 'Ideal for:'}
                </p>
                <ul className="space-y-1">
                  {(language === 'de' ? rec.features : rec.featuresEn).map((feature, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Alternatives */}
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  {language === 'de' ? 'Alternativen:' : 'Alternatives:'}
                </p>
                <div className="space-y-2">
                  {rec.alternatives.map((alt, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-muted-foreground">•</span>
                      <div>
                        <span className="font-medium">{alt.name}</span>
                        <span className="text-muted-foreground"> ({alt.provider}) – {language === 'de' ? alt.reason : alt.reasonEn}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link href={`/models`}>
                <Button className="w-full mt-4 gap-2">
                  {language === 'de' ? 'Alle Modelle vergleichen' : 'Compare all models'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
