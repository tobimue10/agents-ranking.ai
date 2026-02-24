"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Bell, 
  Sparkles, 
  Zap,
  TrendingUp,
  CheckCircle2,
  Loader2,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

interface NewsletterSignupProps {
  variant?: 'inline' | 'card' | 'hero';
  showBenefits?: boolean;
}

const benefits = {
  de: [
    { icon: Zap, text: "Neue KI-Modelle sofort" },
    { icon: TrendingUp, text: "Preis-Updates & Benchmarks" },
    { icon: Sparkles, text: "Exklusive Use-Case Tipps" }
  ],
  en: [
    { icon: Zap, text: "New AI models instantly" },
    { icon: TrendingUp, text: "Price updates & benchmarks" },
    { icon: Sparkles, text: "Exclusive use-case tips" }
  ]
};

export function NewsletterSignup({ variant = 'card', showBenefits = true }: NewsletterSignupProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: language === 'de' ? "Ungültige E-Mail" : "Invalid email",
        description: language === 'de' 
          ? "Bitte gib eine gültige E-Mail-Adresse ein."
          : "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubscribed(true);
    
    toast({
      title: language === 'de' ? "Erfolgreich angemeldet! 🎉" : "Successfully subscribed! 🎉",
      description: language === 'de'
        ? "Du erhältst ab sofort unsere wöchentlichen KI-Updates."
        : "You'll now receive our weekly AI updates.",
    });
  };

  const currentBenefits = language === 'de' ? benefits.de : benefits.en;

  if (isSubscribed) {
    return (
      <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
                {language === 'de' ? "Du bist dabei! 🎉" : "You're in! 🎉"}
              </h3>
              <p className="text-green-700 dark:text-green-300 mt-1">
                {language === 'de' 
                  ? "Wir haben dich für unsere KI-Updates angemeldet."
                  : "We've signed you up for our AI updates."}
              </p>
            </div>
            <Badge variant="outline" className="bg-white dark:bg-gray-800">
              {email}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder={language === 'de' ? "Deine E-Mail-Adresse" : "Your email address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {language === 'de' ? "Wird angemeldet..." : "Subscribing..."}
            </>
          ) : (
            <>
              <Bell className="w-4 h-4 mr-2" />
              {language === 'de' ? "Anmelden" : "Subscribe"}
            </>
          )}
        </Button>
      </form>
    );
  }

  if (variant === 'hero') {
    return (
      <div className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 rounded-2xl p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            {language === 'de' ? 'Wöchentliche KI-Updates' : 'Weekly AI Updates'}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'de' 
              ? "Bleib auf dem Laufenden mit KI-Entwicklungen"
              : "Stay updated with AI developments"}
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            {language === 'de'
              ? "Erhalte jede Woche die neuesten KI-Modelle, Preisänderungen und Benchmarks direkt in dein Postfach."
              : "Get the latest AI models, price changes and benchmarks delivered to your inbox every week."}
          </p>

          {showBenefits && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {currentBenefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                    <benefit.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder={language === 'de' ? "Deine E-Mail-Adresse" : "Your email address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
                disabled={isLoading}
              />
            </div>
            <Button type="submit" size="lg" disabled={isLoading} className="gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {language === 'de' ? "Wird angemeldet..." : "Subscribing..."}
                </>
              ) : (
                <>
                  {language === 'de' ? "Kostenlos anmelden" : "Subscribe for free"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            {language === 'de' 
              ? "Kein Spam. Jederzeit abmeldbar. Deine Daten sind sicher."
              : "No spam. Unsubscribe anytime. Your data is secure."}
          </p>
        </div>
      </div>
    );
  }

  // Default card variant
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 p-1">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>
                {language === 'de' ? "KI-Updates per E-Mail" : "AI Updates via Email"}
              </CardTitle>
              <CardDescription>
                {language === 'de' ? "Wöchentliche KI-Updates" : "Weekly AI updates"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {showBenefits && (
            <div className="space-y-2">
              {currentBenefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <benefit.icon className="w-4 h-4 text-primary" />
                  {benefit.text}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="email">
                {language === 'de' ? "E-Mail-Adresse" : "Email address"}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={language === 'de' ? "name@beispiel.de" : "name@example.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {language === 'de' ? "Wird angemeldet..." : "Subscribing..."}
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4" />
                  {language === 'de' ? "Kostenlos anmelden" : "Subscribe for free"}
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            {language === 'de' 
              ? "Kein Spam. Jederzeit abmeldbar."
              : "No spam. Unsubscribe anytime."}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
