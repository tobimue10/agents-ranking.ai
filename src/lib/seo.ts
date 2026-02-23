// SEO helper functions for page-specific metadata
export function getPageSEO({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    title: `${title} | agents-ranking.ai`,
    description,
    alternates: {
      canonical: `https://agents-ranking.ai${path}`,
    },
    openGraph: {
      title: `${title} | agents-ranking.ai`,
      description,
      url: `https://agents-ranking.ai${path}`,
    },
  };
}

// JSON-LD structured data helpers
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'agents-ranking.ai',
    url: 'https://agents-ranking.ai',
    logo: 'https://agents-ranking.ai/logo.png',
    description: 'Die führende unabhängige Vergleichsplattform für KI-Modelle und Agents',
    sameAs: [
      'https://twitter.com/agentsranking',
      'https://linkedin.com/company/agents-ranking',
      'https://github.com/agents-ranking',
    ],
  };
}

export function getWebsiteSchema() {
  return {
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
}

export function getComparisonSchema({
  name,
  description,
  models,
}: {
  name: string;
  description: string;
  models: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ComparisonTable',
    name,
    description,
    about: models.map(model => ({
      '@type': 'SoftwareApplication',
      name: model,
    })),
  };
}

export function getSoftwareApplicationSchema(model: {
  name: string;
  provider: string;
  description: string;
  url: string;
  rating?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: model.name,
    applicationCategory: 'AIApplication',
    author: {
      '@type': 'Organization',
      name: model.provider,
    },
    description: model.description,
    url: model.url,
    ...(model.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: model.rating,
        bestRating: 100,
      },
    }),
  };
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
