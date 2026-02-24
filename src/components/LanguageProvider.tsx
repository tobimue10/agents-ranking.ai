"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "de" | "en" | "es" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  de: {
    // Navigation
    "nav.models": "Modelle",
    "nav.compare": "Vergleich",
    "nav.benchmarks": "Benchmarks",
    "nav.about": "Über uns",

    // Common
    "common.search": "Suchen",
    "common.filter": "Filter",
    "common.compare": "Vergleichen",
    "common.details": "Details",
    "common.loading": "Laden...",
    "common.close": "Schließen",
    "common.save": "Speichern",
    "common.cancel": "Abbrechen",

    // Model types
    "type.llm": "LLM",
    "type.agent": "Agent",
    "type.image": "Bild",
    "type.video": "Video",
    "type.audio": "Audio",

    // Pricing
    "price.free": "Kostenlos",
    "price.per_million": "/ 1M Tokens",

    // Benchmarks
    "benchmark.mmlu": "MMLU",
    "benchmark.humaneval": "HumanEval",
    "benchmark.math": "MATH",
    "benchmark.gpqa": "GPQA",

    // Footer
    "footer.rights": "Alle Rechte vorbehalten",
    "footer.privacy": "Datenschutz",
    "footer.terms": "AGB",
    "footer.contact": "Kontakt",
  },
  en: {
    // Navigation
    "nav.models": "Models",
    "nav.compare": "Compare",
    "nav.benchmarks": "Benchmarks",
    "nav.about": "About",

    // Common
    "common.search": "Search",
    "common.filter": "Filter",
    "common.compare": "Compare",
    "common.details": "Details",
    "common.loading": "Loading...",
    "common.close": "Close",
    "common.save": "Save",
    "common.cancel": "Cancel",

    // Model types
    "type.llm": "LLM",
    "type.agent": "Agent",
    "type.image": "Image",
    "type.video": "Video",
    "type.audio": "Audio",

    // Pricing
    "price.free": "Free",
    "price.per_million": "/ 1M tokens",

    // Benchmarks
    "benchmark.mmlu": "MMLU",
    "benchmark.humaneval": "HumanEval",
    "benchmark.math": "MATH",
    "benchmark.gpqa": "GPQA",

    // Footer
    "footer.rights": "All rights reserved",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.contact": "Contact",
  },
  es: {
    // Navigation
    "nav.models": "Modelos",
    "nav.compare": "Comparar",
    "nav.benchmarks": "Benchmarks",
    "nav.about": "Nosotros",

    // Common
    "common.search": "Buscar",
    "common.filter": "Filtrar",
    "common.compare": "Comparar",
    "common.details": "Detalles",
    "common.loading": "Cargando...",
    "common.close": "Cerrar",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",

    // Model types
    "type.llm": "LLM",
    "type.agent": "Agente",
    "type.image": "Imagen",
    "type.video": "Video",
    "type.audio": "Audio",

    // Pricing
    "price.free": "Gratis",
    "price.per_million": "/ 1M tokens",

    // Benchmarks
    "benchmark.mmlu": "MMLU",
    "benchmark.humaneval": "HumanEval",
    "benchmark.math": "MATH",
    "benchmark.gpqa": "GPQA",

    // Footer
    "footer.rights": "Todos los derechos reservados",
    "footer.privacy": "Privacidad",
    "footer.terms": "Términos",
    "footer.contact": "Contacto",
  },
  fr: {
    // Navigation
    "nav.models": "Modèles",
    "nav.compare": "Comparer",
    "nav.benchmarks": "Benchmarks",
    "nav.about": "À propos",

    // Common
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.compare": "Comparer",
    "common.details": "Détails",
    "common.loading": "Chargement...",
    "common.close": "Fermer",
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",

    // Model types
    "type.llm": "LLM",
    "type.agent": "Agent",
    "type.image": "Image",
    "type.video": "Vidéo",
    "type.audio": "Audio",

    // Pricing
    "price.free": "Gratuit",
    "price.per_million": "/ 1M tokens",

    // Benchmarks
    "benchmark.mmlu": "MMLU",
    "benchmark.humaneval": "HumanEval",
    "benchmark.math": "MATH",
    "benchmark.gpqa": "GPQA",

    // Footer
    "footer.rights": "Tous droits réservés",
    "footer.privacy": "Confidentialité",
    "footer.terms": "Conditions",
    "footer.contact": "Contact",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "de",
  setLanguage: () => null,
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("de");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && ["de", "en", "es", "fr"].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.de] || translations.en[key as keyof typeof translations.en] || key;
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
