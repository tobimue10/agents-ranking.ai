import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import FeedbackButton from "@/components/FeedbackButton";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "KI Vergleich 2025 | agents-ranking.ai - 50+ Modelle: GPT-4o, Claude 3.5, DeepSeek",
  description: "✓ Der umfassendste KI Vergleich 2025: GPT-4o, Claude 3.5 Sonnet, DeepSeek-R1, Grok 3, Gemini 2.0, Llama 3.3 & 50+ Modelle. Unabhängige Benchmarks, aktuelle Preise, detaillierte Tests. Jetzt das beste LLM für Coding, Reasoning & AI Agents finden!",
  keywords: ["KI Vergleich", "KI Vergleich 2025", "KI Vergleich März 2025", "LLM Vergleich", "Agent Vergleich", "GPT-4o vs Claude 3.5", "bestes KI Modell", "KI Modelle Vergleich", "AI Vergleich", "ChatGPT Alternative", "Claude vs GPT", "Llama 3.3 Test", "Künstliche Intelligenz Vergleich", "KI Benchmarks", "LLM Ranking", "beste AI 2025", "DeepSeek vs GPT-4", "Kimi K2.5 Test", "o3 mini Test", "Grok 3 Benchmarks", "KI Modelle März 2025", "Open Source LLM", "kostenlose KI Modelle", "KI für Coding", "Reasoning Modelle", "AI Modelle Vergleich", "LLM Ranking 2025", "beste KI", "ChatGPT Alternative 2025", "Claude 3.7 Sonnet", "Gemini 2.0 Flash", "Mistral Large", "Qwen 2.5", "Künstliche Intelligenz Modelle", "KI Tools Vergleich", "AI Agent Vergleich", "LLM Preise", "KI API Vergleich", "OpenAI Alternativen", "Anthropic Claude Test", "Google Gemini Vergleich", "xAI Grok Test", "Meta Llama Vergleich", "DeepSeek R1 Test", "Perplexity AI Alternative", "Copilot vs ChatGPT", "KI für Unternehmen", "Enterprise LLM Vergleich", "Kimi K2.5", "Mistral Large 2", "DeepSeek V3", "Gemma 2", "Command R+", "Nous Hermes", "WizardLM", "Yi 34B", "Mixtral 8x22B"],
  authors: [{ name: "agents-ranking.ai" }],
  creator: "agents-ranking.ai",
  publisher: "agents-ranking.ai",
  metadataBase: new URL("https://agents-ranking.ai"),
  alternates: {
    canonical: "/",
    languages: {
      'de': '/de',
      'en': '/en',
    },
  },
  openGraph: {
    title: "KI Vergleich 2025 | agents-ranking.ai - 50+ Modelle: GPT-4o, Claude 3.5, DeepSeek",
    description: "✓ Der umfassendste KI Vergleich 2025: GPT-4o, Claude 3.5 Sonnet, DeepSeek-R1, Grok 3, Gemini 2.0, Llama 3.3 & 50+ Modelle. Unabhängige Benchmarks & aktuelle Preise. Jetzt das beste LLM finden!",
    url: "https://agents-ranking.ai",
    siteName: "agents-ranking.ai",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "agents-ranking.ai - KI Vergleich 2025: GPT-4o, Claude 3.5, DeepSeek, Grok 3, Gemini 2.0, Llama 3.3 Vergleich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KI Vergleich 2025 | agents-ranking.ai - 50+ Modelle: GPT-4o, Claude 3.5, DeepSeek",
    description: "✓ Der umfassendste KI Vergleich 2025: GPT-4o, Claude 3.5, DeepSeek-R1, Grok 3 & mehr! Unabhängige Benchmarks.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// JSON-LD Structured Data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'agents-ranking.ai',
  url: 'https://agents-ranking.ai',
  logo: 'https://agents-ranking.ai/logo.png',
  description: 'Die führende unabhängige Vergleichsplattform für KI-Modelle und Agents',
  sameAs: [
    'https://twitter.com/agentsranking',
    'https://linkedin.com/company/agents-ranking',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'agents-ranking.ai',
  url: 'https://agents-ranking.ai',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://agents-ranking.ai/models?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Was ist das beste KI-Modell 2025?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Das beste KI-Modell 2025 hängt vom Anwendungsfall ab. GPT-4o führt bei multimodalen Aufgaben, Claude 3.7 Sonnet bei Reasoning und Coding, während DeepSeek-R1 bei mathematischen Problemen überzeugt. Für kostenlose Nutzung ist Llama 3.3 die beste Wahl. Gemini 2.0 Flash bietet die beste Balance aus Geschwindigkeit und Qualität.'
      }
    },
    {
      '@type': 'Question',
      name: 'Welche KI ist besser als ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Claude 3.7 Sonnet übertrifft ChatGPT (GPT-4o) bei Coding und langen Dokumenten. DeepSeek-R1 ist besser für komplexes Reasoning und deutlich günstiger. Gemini 2.0 Pro bietet das größte Kontextfenster. Perplexity AI ist eine starke Alternative für Recherche-Aufgaben. Die beste Alternative hängt von deinen spezifischen Anforderungen ab.'
      }
    },
    {
      '@type': 'Question',
      name: 'Ist Llama 3.3 wirklich kostenlos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, Llama 3.3 ist Open Source und vollständig kostenlos für kommerzielle Nutzung. Du kannst es selbst hosten oder über Anbieter wie Groq, Together AI oder Fireworks AI kostenlos nutzen. Die selbst gehostete Version erfordert jedoch leistungsstarke Hardware. Qwen 2.5 ist eine weitere starke kostenlose Alternative aus China.'
      }
    },
    {
      '@type': 'Question',
      name: 'Was kostet GPT-4o?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GPT-4o kostet über die API $2.50 pro 1 Million Input-Tokens und $10.00 pro 1 Million Output-Tokens. Über ChatGPT Plus ist es für $20/Monat verfügbar. Es gibt auch eine kostenlose Version mit eingeschränkten Nutzungslimits. Für günstigere Alternativen bieten sich DeepSeek-V3 oder Gemini 2.0 Flash an.'
      }
    },
    {
      '@type': 'Question',
      name: 'Was sind die besten Open Source LLMs 2025?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die besten Open Source LLMs 2025 sind Llama 3.3 70B von Meta, Qwen 2.5 72B von Alibaba, DeepSeek-V3 und Mistral Large 2. Diese Modelle bieten nahezu kommerzielle Qualität, sind aber vollständig kostenlos und selbst hostbar. Besonders Llama 3.3 und Qwen 2.5 überzeugen bei Coding-Aufgaben.'
      }
    },
    {
      '@type': 'Question',
      name: 'Welche KI ist am besten für Coding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Claude 3.7 Sonnet ist aktuell die beste KI für Coding mit 92%+ HumanEval Score. GPT-4o folgt dicht dahinter. Für Budget-Projekte ist DeepSeek-V3 mit 89% HumanEval bei deutlich niedrigeren Kosten die beste Wahl. Gemini 2.0 Pro überzeugt durch das riesige 2M Token Kontextfenster für große Codebases.'
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema, faqSchema]),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <FeedbackButton />
            <Analytics />
            <Toaster />
            <Script
              id="hotjar"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                `,
              }}
            />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
