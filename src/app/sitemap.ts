import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://agents-ranking.ai';
  
  const modelPages = [
    'gpt-4-turbo',
    'claude-3-5-sonnet', 
    'gemini-pro-1-5',
    'llama-3-1-405b',
    'kimi-k2-5',
    'gpt-4o',
    'claude-3-opus',
    'deepseek-r1',
    'deepseek-v3',
    'grok-3',
    'gemini-2-0-flash',
    'gemini-2-0-pro',
    'llama-3-3-70b',
    'o3-mini',
    'o1',
    'mistral-large-2',
    'qwen-2-5',
    'command-r-plus',
    'kimi-k2-5',
    'gpt-4-5',
    'claude-3-7-sonnet',
    'gemini-2-5-pro',
  ];
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/models`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...modelPages.map(id => ({
      url: `${baseUrl}/models/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/vergleiche`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/benchmarks`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/agents`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/preise`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/beste-ki-fuer-coding-2025`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
}
