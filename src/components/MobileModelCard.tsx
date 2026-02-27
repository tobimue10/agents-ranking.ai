"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageProvider";
import { Sparkles, ArrowRight, Crown, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Model {
  id: string;
  name: string;
  provider: string;
  type: string;
  category: string[];
  pricing_input: number;
  context_window: number;
  is_new?: boolean;
  is_top?: boolean;
  benchmarks?: { mmlu?: number };
  description: string;
  pros: string[];
  cons: string[];
}

interface MobileModelCardProps {
  model: Model;
  isSelected: boolean;
  onToggleCompare: () => void;
  index?: number;
}

// Provider color mapping for visual distinction
const providerColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  "OpenAI": { 
    bg: "bg-emerald-500/10", 
    text: "text-emerald-600", 
    border: "border-emerald-500/20",
    gradient: "from-emerald-500 to-teal-500"
  },
  "Anthropic": { 
    bg: "bg-orange-500/10", 
    text: "text-orange-600", 
    border: "border-orange-500/20",
    gradient: "from-orange-500 to-amber-500"
  },
  "Google": { 
    bg: "bg-blue-500/10", 
    text: "text-blue-600", 
    border: "border-blue-500/20",
    gradient: "from-blue-500 to-cyan-500"
  },
  "Meta": { 
    bg: "bg-indigo-500/10", 
    text: "text-indigo-600", 
    border: "border-indigo-500/20",
    gradient: "from-indigo-500 to-violet-500"
  },
  "Mistral": { 
    bg: "bg-rose-500/10", 
    text: "text-rose-600", 
    border: "border-rose-500/20",
    gradient: "from-rose-500 to-pink-500"
  },
  "DeepSeek": { 
    bg: "bg-violet-500/10", 
    text: "text-violet-600", 
    border: "border-violet-500/20",
    gradient: "from-violet-500 to-purple-500"
  },
  "xAI": { 
    bg: "bg-slate-500/10", 
    text: "text-slate-600", 
    border: "border-slate-500/20",
    gradient: "from-slate-500 to-zinc-500"
  },
  "Moonshot AI": { 
    bg: "bg-amber-500/10", 
    text: "text-amber-600", 
    border: "border-amber-500/20",
    gradient: "from-amber-500 to-yellow-500"
  },
  "Alibaba": { 
    bg: "bg-red-500/10", 
    text: "text-red-600", 
    border: "border-red-500/20",
    gradient: "from-red-500 to-rose-500"
  },
};

export function MobileModelCard({ 
  model, 
  isSelected, 
  onToggleCompare,
  index = 0
}: MobileModelCardProps) {
  const { language } = useLanguage();
  
  const providerStyle = providerColors[model.provider] || { 
    bg: "bg-primary/10", 
    text: "text-primary", 
    border: "border-primary/20",
    gradient: "from-violet-500 to-fuchsia-500"
  };

  // Calculate stagger delay based on index
  const staggerDelay = Math.min(index * 80, 800);
  
  return (
    <Card 
      className={`
        relative overflow-hidden border-0 shadow-lg 
        transition-all duration-500 ease-out
        hover:shadow-2xl hover:-translate-y-1.5
        active:scale-[0.98] active:duration-150
        ${model.is_new ? 'ring-2 ring-green-500/40 shadow-green-500/10' : ''}
        ${model.is_top ? 'ring-2 ring-amber-400/50 shadow-amber-500/10' : ''}
      `}
      style={{
        animation: `mobileCardSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms forwards`,
        opacity: 0,
        transform: 'translateY(30px)'
      }}
    >
      {/* Animated gradient background on hover */}
      <div 
        className={`
          absolute inset-0 bg-gradient-to-br ${providerStyle.gradient} opacity-0 
          transition-opacity duration-500 group-hover:opacity-5
        `}
      />
      
      {/* Top accent line with gradient */}
      <div 
        className={`
          absolute top-0 left-0 right-0 h-1 
          bg-gradient-to-r ${providerStyle.gradient}
          ${model.is_new ? 'animate-pulse' : ''}
        `} 
      />
      
      {/* Rank badge for top models */}
      {model.is_top && (
        <div className="absolute -top-1 -right-1 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400 blur-md opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-lg rounded-tr-sm shadow-lg flex items-center gap-1">
              <Crown className="w-3 h-3" />
              TOP
            </div>
          </div>
        </div>
      )}
      
      {/* New badge */}
      {model.is_new && !model.is_top && (
        <div className="absolute -top-1 -right-1 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 blur-md opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-lg rounded-tr-sm shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {language === 'de' ? 'NEU' : 'NEW'}
            </div>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-3 space-y-3 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              {/* Provider icon/avatar */}
              <div 
                className={`
                  w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold
                  ${providerStyle.bg} ${providerStyle.text} border ${providerStyle.border}
                  transition-transform duration-300 group-hover:scale-110
                `}
              >
                {model.provider.charAt(0)}
              </div>
              
              <h3 className="font-bold text-base truncate">{model.name}</h3>
            </div>
            
            {/* Provider name with subtle styling */}
            <p className={`text-xs font-medium ${providerStyle.text} opacity-80`}>
              {model.provider}
            </p>
          </div>
          
          {/* Compare checkbox with enhanced styling */}
          <div className="flex flex-col items-end gap-1">
            <label 
              className={`
                flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer
                transition-all duration-200
                ${isSelected 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }
              `}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={onToggleCompare}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                aria-label={`${model.name} zum Vergleich hinzufügen`}
              />
              <span className="text-[10px] font-medium">
                {language === 'de' ? 'Vgl.' : 'Cmp.'}
              </span>
            </label>
          </div>
        </div>
        
        {/* Category badges with enhanced styling */}
        <div className="flex flex-wrap gap-1.5">
          {model.category.slice(0, 3).map((cat, idx) => (
            <Badge 
              key={cat} 
              variant="secondary" 
              className={`
                text-[10px] px-2 py-0.5 font-medium
                transition-all duration-300
                hover:scale-105 hover:shadow-sm
              `}
              style={{
                animationDelay: `${staggerDelay + (idx * 100)}ms`
              }}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        {/* Stats grid with enhanced visual design */}
        <div className="grid grid-cols-3 gap-2">
          {/* Price stat */}
          <div 
            className={`
              relative overflow-hidden rounded-xl p-2.5 text-center
              bg-gradient-to-br from-muted/80 to-muted/40
              border border-border/50
              transition-all duration-300 hover:shadow-md hover:border-primary/20
              group/stat
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover/stat:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-[10px] text-muted-foreground mb-1 font-medium uppercase tracking-wide">
                {language === 'de' ? 'Preis' : 'Price'}
              </div>
              <div className={`font-bold text-sm ${model.pricing_input === 0 ? 'text-green-600' : 'text-foreground'}`}>
                {model.pricing_input === 0 
                  ? (language === 'de' ? 'Free' : 'Free')
                  : `$${model.pricing_input}`
                }
              </div>
            </div>
          </div>
          
          {/* Context stat */}
          <div 
            className={`
              relative overflow-hidden rounded-xl p-2.5 text-center
              bg-gradient-to-br from-muted/80 to-muted/40
              border border-border/50
              transition-all duration-300 hover:shadow-md hover:border-primary/20
              group/stat
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover/stat:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="text-[10px] text-muted-foreground mb-1 font-medium uppercase tracking-wide">
                {language === 'de' ? 'Kontext' : 'Context'}
              </div>
              <div className="font-bold text-sm">
                {model.context_window > 0 
                  ? `${(model.context_window / 1000).toFixed(0)}k` 
                  : '-'
                }
              </div>
            </div>
          </div>
          
          {/* MMLU stat with special styling for high scores */}
          <div 
            className={`
              relative overflow-hidden rounded-xl p-2.5 text-center
              ${model.benchmarks?.mmlu && model.benchmarks.mmlu >= 85 
                ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/30' 
                : 'bg-gradient-to-br from-muted/80 to-muted/40 border-border/50'
              }
              border
              transition-all duration-300 hover:shadow-md hover:border-primary/20
              group/stat
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover/stat:opacity-100 transition-opacity" />
            <div className="relative">
              <div className={`
                text-[10px] mb-1 font-medium uppercase tracking-wide flex items-center justify-center gap-0.5
                ${model.benchmarks?.mmlu && model.benchmarks.mmlu >= 85 ? 'text-amber-600' : 'text-muted-foreground'}
              `}>
                MMLU
                {model.benchmarks?.mmlu && model.benchmarks.mmlu >= 85 && (
                  <TrendingUp className="w-3 h-3" />
                )}
              </div>
              <div className={`font-bold text-sm ${model.benchmarks?.mmlu && model.benchmarks.mmlu >= 85 ? 'text-amber-600' : 'text-primary'}`}>
                {model.benchmarks?.mmlu ? `${model.benchmarks.mmlu}%` : '-'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Action button with enhanced styling */}
        <Link href={`/models/${model.id}`} className="block">
          <Button 
            size="sm" 
            variant="ghost" 
            className={`
              w-full h-10 text-xs font-medium
              bg-gradient-to-r from-muted/50 to-muted/30
              hover:from-primary/10 hover:to-primary/5
              hover:text-primary
              border border-border/50 hover:border-primary/30
              transition-all duration-300
              group/btn
            `}
          >
            <span>{language === 'de' ? 'Details ansehen' : 'View details'}</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
      
      {/* Bottom shimmer effect on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
    </Card>
  );
}
