/**
 * Type definitions for AI models in the agents-ranking application
 */

export interface ModelBenchmarks {
  mmlu: number;
  humaneval: number;
  math: number;
  gpqa: number;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  type: ModelType;
  description: string;
  context_window: number;
  pricing_input: number;
  pricing_output: number;
  api_available: boolean;
  release_date: string;
  benchmarks: ModelBenchmarks;
  features: string[];
  pros: string[];
  cons: string[];
  best_for: string[];
  is_archived?: boolean;
}

export type ModelType = 
  | 'llm' 
  | 'multimodal' 
  | 'agent' 
  | 'image' 
  | 'video' 
  | 'audio';

export interface TypeConfig {
  color: string;
  label: string;
  icon: string;
}

export const TYPE_COLORS: Record<ModelType, string> = {
  llm: 'bg-blue-500',
  multimodal: 'bg-purple-500',
  agent: 'bg-green-500',
  image: 'bg-pink-500',
  video: 'bg-red-500',
  audio: 'bg-yellow-500',
};

export const TYPE_LABELS: Record<ModelType, string> = {
  llm: 'LLM',
  multimodal: 'Multimodal',
  agent: 'Agent',
  image: 'Bild',
  video: 'Video',
  audio: 'Audio',
};

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
}
