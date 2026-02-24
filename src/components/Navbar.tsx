"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Moon, 
  Sun, 
  Globe, 
  Sparkles,
  BarChart3,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/models", label: language === "de" ? "Modelle" : "Models", icon: Sparkles },
    { href: "/#comparison-table", label: language === "de" ? "Vergleich" : "Compare", icon: BarChart3 },
    { href: "/models", label: language === "de" ? "Benchmarks" : "Benchmarks", icon: BarChart3 },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? "bg-background/80 backdrop-blur-xl shadow-soft border-b border-border/50" 
            : "bg-background/50 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-accent to-info rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-sm">AR</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline gradient-text-subtle">agents-ranking.ai</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted flex items-center gap-2"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-lg hover:bg-muted"
                >
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                <DropdownMenuItem 
                  onClick={() => setLanguage("de")}
                  className="cursor-pointer flex items-center justify-between"
                >
                  <span>🇩🇪 Deutsch</span>
                  {language === "de" && <span className="text-primary">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage("en")}
                  className="cursor-pointer flex items-center justify-between"
                >
                  <span>🇬🇧 English</span>
                  {language === "en" && <span className="text-primary">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage("es")}
                  className="cursor-pointer flex items-center justify-between"
                >
                  <span>🇪🇸 Español</span>
                  {language === "es" && <span className="text-primary">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage("fr")}
                  className="cursor-pointer flex items-center justify-between"
                >
                  <span>🇫🇷 Français</span>
                  {language === "fr" && <span className="text-primary">✓</span>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-lg hover:bg-muted"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-lg hover:bg-muted md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <span 
                  className={`absolute left-0 block w-5 h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "top-2 rotate-45" : "top-1"
                  }`} 
                />
                <span 
                  className={`absolute left-0 top-2 block w-5 h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`} 
                />
                <span 
                  className={`absolute left-0 block w-5 h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "top-2 -rotate-45" : "top-3"
                  }`} 
                />
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden transition-all duration-300 ${
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 pt-24 pb-8 h-full overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between p-4 text-lg font-medium rounded-xl transition-all duration-300 ${
                  mobileMenuOpen 
                    ? "translate-x-0 opacity-100" 
                    : "translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <link.icon className="w-5 h-5 text-primary" />
                  </span>
                  {link.label}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          <div className={`mt-8 pt-8 border-t transition-all duration-300 delay-200 ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}>
            <p className="text-sm text-muted-foreground text-center">
              © 2025 agents-ranking.ai
            </p>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
}
