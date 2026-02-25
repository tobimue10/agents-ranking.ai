"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageProvider";

interface Model {
  id: string;
  name: string;
  provider: string;
  type: string;
  category: string[];
  pricing_input: number;
  context_window: number;
  is_new?: boolean;
  benchmarks?: { mmlu?: number };
  description: string;
  pros: string[];
  cons: string[];
}

interface MobileModelCardProps {
  model: Model;
  isSelected: boolean;
  onToggleCompare: () => void;
  index: number;
}

export function MobileModelCard({ 
  model, 
  isSelected, 
  onToggleCompare,
  index 
}: MobileModelCardProps) {
  const { language } = useLanguage();
  
  return (
    <Card 
      className={`border-0 shadow-soft card-lift overflow-hidden ${
        model.is_new ? 'ring-1 ring-green-500/30' : ''
      } animate-row-in stagger-${Math.min(index + 1, 10)}`}
    >
      <CardHeader className="pb-3 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-base truncate">{model.name}</h3>
              {model.is_new && (
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px] badge-new shrink-0">
                  Neu
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{model.provider}</p>
          </div>
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggleCompare}
            className="mt-1 shrink-0"
            aria-label={`${model.name} zum Vergleich hinzufügen`}
          />
        </div>
        
        <div className="flex flex-wrap gap-1">
          {model.category.slice(0, 2).map((cat) => (
            <Badge key={cat} variant="secondary" className="text-[10px] px-1.5 py-0.5">
              {cat}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-muted/50 rounded-lg p-2 text-center">
            <div className="text-xs text-muted-foreground mb-0.5">
              {language === 'de' ? 'Preis' : 'Price'}
            </div>
            <div className={`font-semibold text-sm ${model.pricing_input === 0 ? 'text-green-600' : ''}`}>
              {model.pricing_input === 0 
                ? (language === 'de' ? 'Kostenlos' : 'Free')
                : `$${model.pricing_input}`
              }
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-2 text-center">
            <div className="text-xs text-muted-foreground mb-0.5">
              {language === 'de' ? 'Kontext' : 'Context'}
            </div>
            <div className="font-semibold text-sm">
              {model.context_window > 0 
                ? `${(model.context_window / 1000).toFixed(0)}k` 
                : '-'
              }
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-2 text-center">
            <div className="text-xs text-muted-foreground mb-0.5">MMLU</div>
            <div className="font-semibold text-sm text-primary">
              {model.benchmarks?.mmlu ? `${model.benchmarks.mmlu}%` : '-'}
            </div>
          </div>
        </div>
        
        <Button 
          size="sm" 
          variant="ghost" 
          className="w-full h-9 text-xs hover:bg-primary/10 hover:text-primary transition-colors"
        >
          {language === 'de' ? 'Details ansehen' : 'View details'}
        </Button>
      </CardContent>
    </Card>
  );
}