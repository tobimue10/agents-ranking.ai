"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Calculator, 
  TrendingDown, 
  TrendingUp, 
  DollarSign,
  Sparkles,
  Info
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { modelsData } from "@/lib/models-data";

interface PriceCalculatorProps {
  showComparison?: boolean;
}

export function PriceCalculator({ showComparison = true }: PriceCalculatorProps) {
  const { language } = useLanguage();
  const [monthlyTokens, setMonthlyTokens] = useState([1000000]); // 1M tokens
  const [inputRatio, setInputRatio] = useState([70]); // 70% input, 30% output

  const inputTokens = Math.round(monthlyTokens[0] * (inputRatio[0] / 100));
  const outputTokens = Math.round(monthlyTokens[0] * ((100 - inputRatio[0]) / 100));

  // Calculate costs for all models
  const modelCosts = useMemo(() => {
    return modelsData
      .filter(model => model.pricing_input > 0 || model.pricing_output > 0)
      .map(model => {
        const inputCost = (inputTokens / 1000000) * model.pricing_input;
        const outputCost = (outputTokens / 1000000) * model.pricing_output;
        const totalCost = inputCost + outputCost;
        
        return {
          ...model,
          calculatedInputCost: inputCost,
          calculatedOutputCost: outputCost,
          totalCost,
        };
      })
      .sort((a, b) => a.totalCost - b.totalCost);
  }, [inputTokens, outputTokens]);

  const cheapestModel = modelCosts[0];
  const mostExpensiveModel = modelCosts[modelCosts.length - 1];
  const savingsPercent = mostExpensiveModel 
    ? Math.round(((mostExpensiveModel.totalCost - cheapestModel.totalCost) / mostExpensiveModel.totalCost) * 100)
    : 0;

  const formatCurrency = (amount: number) => {
    if (amount < 0.01) return "< $0.01";
    return `$${amount.toFixed(2)}`;
  };

  const formatTokens = (tokens: number) => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    }
    if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(0)}k`;
    }
    return tokens.toString();
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            {language === 'de' ? 'Token-Rechner' : 'Token Calculator'}
          </CardTitle>
          <CardDescription>
            {language === 'de' 
              ? 'Berechne die monatlichen Kosten für deine Token-Nutzung'
              : 'Calculate monthly costs for your token usage'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Monthly Tokens Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-base">
                {language === 'de' ? 'Token pro Monat' : 'Tokens per month'}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={monthlyTokens[0]}
                  onChange={(e) => setMonthlyTokens([Math.max(0, parseInt(e.target.value) || 0)])}
                  className="w-32 text-right"
                />
              </div>
            </div>
            <Slider
              value={monthlyTokens}
              onValueChange={setMonthlyTokens}
              max={10000000}
              min={10000}
              step={10000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10k</span>
              <span>1M</span>
              <span>5M</span>
              <span>10M</span>
            </div>
          </div>

          {/* Input/Output Ratio Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-base">
                {language === 'de' ? 'Input / Output Verhältnis' : 'Input / Output Ratio'}
              </Label>
              <span className="text-sm font-medium">{inputRatio[0]}% / {100 - inputRatio[0]}%</span>
            </div>
            <Slider
              value={inputRatio}
              onValueChange={setInputRatio}
              max={90}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{language === 'de' ? 'Mehr Output' : 'More Output'}</span>
              <span>{language === 'de' ? 'Gleich' : 'Equal'}</span>
              <span>{language === 'de' ? 'Mehr Input' : 'More Input'}</span>
            </div>
          </div>

          {/* Token Breakdown */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{language === 'de' ? 'Input Tokens' : 'Input Tokens'}</p>
              <p className="text-xl font-bold text-blue-600">{formatTokens(inputTokens)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{language === 'de' ? 'Output Tokens' : 'Output Tokens'}</p>
              <p className="text-xl font-bold text-purple-600">{formatTokens(outputTokens)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      {showComparison && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1">
                <TrendingDown className="w-4 h-4 text-green-600" />
                {language === 'de' ? 'Günstigste Option' : 'Cheapest Option'}
              </CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(cheapestModel?.totalCost || 0)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{cheapestModel?.name}</p>
              <p className="text-sm text-muted-foreground">{cheapestModel?.provider}</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-red-600" />
                {language === 'de' ? 'Teuerste Option' : 'Most Expensive'}
              </CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(mostExpensiveModel?.totalCost || 0)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{mostExpensiveModel?.name}</p>
              <p className="text-sm text-muted-foreground">{mostExpensiveModel?.provider}</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-blue-600" />
                {language === 'de' ? 'Potenzielle Ersparnis' : 'Potential Savings'}
              </CardDescription>
              <CardTitle className="text-2xl text-green-600">{savingsPercent}%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {language === 'de' 
                  ? `Durch Wahl von ${cheapestModel?.name}` 
                  : `By choosing ${cheapestModel?.name}`}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Comparison Table */}
      {showComparison && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              {language === 'de' ? 'Kosten-Vergleich aller Modelle' : 'Cost Comparison of All Models'}
            </CardTitle>
            <CardDescription>
              {language === 'de' 
                ? 'Sortiert nach Gesamtkosten (günstigste zuerst)'
                : 'Sorted by total cost (cheapest first)'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{language === 'de' ? 'Rang' : 'Rank'}</TableHead>
                    <TableHead>{language === 'de' ? 'Modell' : 'Model'}</TableHead>
                    <TableHead>{language === 'de' ? 'Anbieter' : 'Provider'}</TableHead>
                    <TableHead className="text-right">{language === 'de' ? 'Input-Kosten' : 'Input Cost'}</TableHead>
                    <TableHead className="text-right">{language === 'de' ? 'Output-Kosten' : 'Output Cost'}</TableHead>
                    <TableHead className="text-right">{language === 'de' ? 'Gesamt' : 'Total'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modelCosts.map((model, index) => (
                    <TableRow key={model.id} className={index === 0 ? "bg-green-50/50 dark:bg-green-950/20" : ""}>
                      <TableCell>
                        {index === 0 ? (
                          <Badge className="bg-green-600">#1</Badge>
                        ) : index === 1 ? (
                          <Badge variant="secondary">#2</Badge>
                        ) : index === 2 ? (
                          <Badge variant="secondary">#3</Badge>
                        ) : (
                          <span className="text-muted-foreground">#{index + 1}</span>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{model.name}</TableCell>
                      <TableCell>{model.provider}</TableCell>
                      <TableCell className="text-right text-blue-600">
                        {formatCurrency(model.calculatedInputCost)}
                      </TableCell>
                      <TableCell className="text-right text-purple-600">
                        {formatCurrency(model.calculatedOutputCost)}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {formatCurrency(model.totalCost)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 p-3 bg-muted rounded-lg flex items-start gap-2">
              <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
              <p className="text-xs text-muted-foreground">
                {language === 'de' 
                  ? 'Preise sind Schätzungen basierend auf den aktuellen API-Preisen. Tatsächliche Kosten können je nach Nutzungsmuster variieren.'
                  : 'Prices are estimates based on current API pricing. Actual costs may vary depending on usage patterns.'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
