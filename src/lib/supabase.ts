import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types
export interface Model {
  id: string;
  name: string;
  provider: string;
  type: 'llm' | 'agent' | 'image' | 'video' | 'audio';
  release_date: string;
  context_window: number;
  pricing_input: number;
  pricing_output: number;
  api_available: boolean;
  website_url: string;
  description: string;
  features: Record<string, unknown>;
}

export interface Benchmark {
  id: string;
  model_id: string;
  benchmark_name: string;
  score: number;
  rank: number;
  tested_at: string;
  source: string;
}

export interface Comparison {
  id: string;
  title: string;
  slug: string;
  model_ids: string[];
  content: string;
  summary: string;
  pros: Record<string, string[]>;
  cons: Record<string, string[]>;
  published: boolean;
}

// API Functions
export async function getModels(type?: string) {
  let query = supabase.from('models').select('*');
  if (type) {
    query = query.eq('type', type);
  }
  const { data, error } = await query.order('name');
  if (error) throw error;
  return data as Model[];
}

export async function getModelById(id: string) {
  const { data, error } = await supabase
    .from('models')
    .select('*, benchmarks(*)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Model & { benchmarks: Benchmark[] };
}

export async function getComparisons() {
  const { data, error } = await supabase
    .from('comparisons')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Comparison[];
}

export async function getComparisonBySlug(slug: string) {
  const { data, error } = await supabase
    .from('comparisons')
    .select('*, models(*)')
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return data as Comparison & { models: Model[] };
}

export async function getBenchmarks(benchmarkName?: string) {
  let query = supabase
    .from('benchmarks')
    .select('*, models(name, provider)')
    .order('score', { ascending: false });
  
  if (benchmarkName) {
    query = query.eq('benchmark_name', benchmarkName);
  }
  
  const { data, error } = await query.limit(50);
  if (error) throw error;
  return data as (Benchmark & { models: { name: string; provider: string } })[];
}
