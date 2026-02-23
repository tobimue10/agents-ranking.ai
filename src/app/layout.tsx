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
  title: "agents-ranking.ai | KI Vergleich 2025 - Agent & LLM Vergleichsplattform",
  description: "Der umfassendste KI Vergleich 2025: Vergleiche GPT-4o, Claude 3.5, Gemini Pro, Llama 3.1 & 50+ weitere KI-Modelle. Unabhängige Benchmarks, aktuelle Preise, detaillierte Tests. Finde das beste LLM für Coding, Text & mehr!",
  keywords: ["KI Vergleich", "KI Vergleich 2025", "LLM Vergleich", "Agent Vergleich", "GPT-4o vs Claude 3.5", "bestes KI Modell", "KI Modelle Vergleich", "AI Vergleich", "ChatGPT Alternative", "Claude vs GPT", "Llama 3.1 Test", "Künstliche Intelligenz Vergleich", "KI Benchmarks", "LLM Ranking", "beste AI 2025"],
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
    title: "agents-ranking.ai | KI Vergleich 2025 - Agent & LLM Vergleichsplattform",
    description: "Der umfassendste KI Vergleich 2025: Vergleiche GPT-4o, Claude 3.5, Gemini Pro, Llama 3.1 & 50+ weitere KI-Modelle. Unabhängige Benchmarks & aktuelle Preise.",
    url: "https://agents-ranking.ai",
    siteName: "agents-ranking.ai",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "agents-ranking.ai - KI Vergleich 2025: GPT-4o, Claude 3.5, Gemini Pro, Llama 3.1 Vergleich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "agents-ranking.ai | KI Vergleich 2025 - Agent & LLM Vergleichsplattform",
    description: "Der umfassendste KI Vergleich 2025: Vergleiche GPT-4o, Claude 3.5, Gemini Pro, Llama 3.1 & mehr!",
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
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
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
