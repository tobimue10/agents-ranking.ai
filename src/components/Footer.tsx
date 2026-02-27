"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Twitter, 
  Linkedin, 
  Github, 
  ArrowRight
} from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Subscribe:", email);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const footerLinks = {
    product: [
      { label: language === "de" ? "Modelle" : "Models", href: "/models" },
      { label: language === "de" ? "Vergleich" : "Compare", href: "/#comparison-table" },
      { label: language === "de" ? "Benchmarks" : "Benchmarks", href: "/models" },
      { label: language === "de" ? "Preise" : "Pricing", href: "/#price-comparison" },
    ],
    comparisons: [
      { label: "GPT-4o vs Claude 3.5", href: "/models/gpt-4o" },
      { label: "DeepSeek-R1 Test", href: "/models/deepseek-r1" },
      { label: "Grok 3 Benchmark", href: "/models/grok-3" },
      { label: "Llama 3.3 Kostenlos", href: "/models/llama-3-3-70b" },
    ],
    resources: [
      { label: language === "de" ? "Blog" : "Blog", href: "/blog/beste-ki-fuer-coding-2025" },
      { label: language === "de" ? "Beste KI für Coding" : "Best AI for Coding", href: "/blog/beste-ki-fuer-coding-2025" },
      { label: language === "de" ? "FAQ" : "FAQ", href: "#faq" },
    ],
    company: [
      { label: language === "de" ? "Über uns" : "About", href: "#" },
      { label: language === "de" ? "Kontakt" : "Contact", href: "#" },
    ],
    legal: [
      { label: language === "de" ? "Datenschutz" : "Privacy", href: "#" },
      { label: language === "de" ? "AGB" : "Terms", href: "#" },
      { label: language === "de" ? "Impressum" : "Imprint", href: "#" },
    ],
  };

  const FooterLink = ({ href, label }: { href: string; label: string }) => (
    <Link 
      href={href} 
      className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block"
    >
      {label}
    </Link>
  );

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12 border-b">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              {language === "de" 
                ? "Bleib auf dem Laufenden" 
                : "Stay up to date"}
            </h3>
            <p className="text-muted-foreground">
              {language === "de"
                ? "Erhalte wöchentlich die neuesten KI-Updates und Benchmarks."
                : "Get weekly AI updates and benchmarks delivered to your inbox."}
            </p>
          </div>
          <div className="flex items-center">
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                placeholder={language === "de" ? "Deine E-Mail" : "Your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" disabled={subscribed} className="transition-all duration-200 hover:scale-105">
                {subscribed 
                  ? (language === "de" ? "✓" : "✓")
                  : <ArrowRight className="w-4 h-4" />
                }
              </Button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <span className="text-white font-bold text-sm">AR</span>
              </div>
              <span className="font-bold transition-colors duration-200 group-hover:text-primary">agents-ranking.ai</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {language === "de"
                ? "Die führende unabhängige Vergleichsplattform für KI-Modelle und Agents."
                : "The leading independent comparison platform for AI models and agents."}
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 transition-all duration-200 hover:scale-110 hover:bg-primary/10" asChild>
                <a href="https://twitter.com/agentsranking" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 transition-all duration-200 hover:scale-110 hover:bg-primary/10" asChild>
                <a href="https://linkedin.com/company/agents-ranking" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 transition-all duration-200 hover:scale-110 hover:bg-primary/10" asChild>
                <a href="https://github.com/agents-ranking" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">
              {language === "de" ? "Produkt" : "Product"}
            </h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">
              {language === "de" ? "Vergleiche" : "Comparisons"}
            </h4>
            <ul className="space-y-2">
              {footerLinks.comparisons.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">
              {language === "de" ? "Ressourcen" : "Resources"}
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">
              {language === "de" ? "Rechtliches" : "Legal"}
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 agents-ranking.ai. {language === "de" ? "Alle Rechte vorbehalten." : "All rights reserved."}
          </p>
          <p className="text-sm text-muted-foreground">
            {language === "de" 
              ? "Täglich aktualisiert • Unabhängige Benchmarks"
              : "Daily updated • Independent benchmarks"}
          </p>
        </div>
      </div>
    </footer>
  );
}