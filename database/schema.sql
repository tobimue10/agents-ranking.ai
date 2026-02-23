-- Datenbank-Schema für AgentRank.ai
-- PostgreSQL (Supabase)

-- Models Tabelle
CREATE TABLE models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  type VARCHAR(50) CHECK (type IN ('llm', 'agent', 'image', 'video', 'audio')),
  release_date DATE,
  context_window INTEGER,
  pricing_input DECIMAL(10,4),
  pricing_output DECIMAL(10,4),
  api_available BOOLEAN DEFAULT false,
  website_url TEXT,
  description TEXT,
  features JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Benchmarks Tabelle
CREATE TABLE benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID REFERENCES models(id) ON DELETE CASCADE,
  benchmark_name VARCHAR(255) NOT NULL,
  score DECIMAL(10,4),
  rank INTEGER,
  tested_at DATE,
  source VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Comparisons Tabelle
CREATE TABLE comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  model_ids UUID[],
  content TEXT,
  summary TEXT,
  pros JSONB,
  cons JSONB,
  generated_by VARCHAR(50) CHECK (generated_by IN ('ai', 'manual')),
  published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- News Tabelle
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  source VARCHAR(255),
  url TEXT NOT NULL,
  summary TEXT,
  model_id UUID REFERENCES models(id),
  published_at TIMESTAMP,
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Categories Tabelle
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  sort_order INTEGER DEFAULT 0
);

-- Indexes für Performance
CREATE INDEX idx_models_type ON models(type);
CREATE INDEX idx_models_provider ON models(provider);
CREATE INDEX idx_benchmarks_model ON benchmarks(model_id);
CREATE INDEX idx_benchmarks_name ON benchmarks(benchmark_name);
CREATE INDEX idx_comparisons_published ON comparisons(published);
CREATE INDEX idx_news_processed ON news(processed);
CREATE INDEX idx_news_published ON news(published_at);

-- Initial Data: Categories
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
('LLMs', 'llms', 'Large Language Models wie GPT-4, Claude, Gemini', '🤖', 1),
('Agents', 'agents', 'Autonome KI-Agents für spezifische Aufgaben', '🎯', 2),
('Bildgenerierung', 'image-generation', 'KI-Tools für Bilderstellung', '🎨', 3),
('Video-KI', 'video-ai', 'KI-Tools für Videogenerierung', '🎬', 4),
('Audio-KI', 'audio-ai', 'Sprachsynthese und Audio-Generierung', '🎵', 5);

-- Initial Data: Top Models
INSERT INTO models (name, provider, type, release_date, context_window, pricing_input, pricing_output, api_available, website_url, description) VALUES
('GPT-4 Turbo', 'OpenAI', 'llm', '2023-11-06', 128000, 0.0100, 0.0300, true, 'https://openai.com/gpt-4', 'Leistungsstarkes LLM mit 128k Kontext'),
('Claude 3.5 Sonnet', 'Anthropic', 'llm', '2024-06-20', 200000, 0.0030, 0.0150, true, 'https://anthropic.com/claude', 'Hervorragendes Reasoning und Coding'),
('Gemini Pro 1.5', 'Google', 'llm', '2024-02-15', 1000000, 0.0035, 0.0105, true, 'https://deepmind.google/gemini', 'Bis zu 1M Token Kontextfenster'),
('Llama 3.1 405B', 'Meta', 'llm', '2024-07-23', 128000, 0.0000, 0.0000, true, 'https://llama.meta.com', 'Open Source LLM mit 405B Parametern'),
('Kimi K2.5', 'Moonshot AI', 'llm', '2025-01-20', 256000, 0.0020, 0.0080, true, 'https://kimi.moonshot.cn', 'Starke Performance in Coding und Reasoning');
