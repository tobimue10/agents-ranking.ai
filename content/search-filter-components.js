// search.js - Client-seitige Suchfunktion für AgentRank.ai

/**
 * AgentRank Search Module
 * Einfache client-seitige Suche über alle Modelle und Inhalte
 */

class AgentRankSearch {
  constructor(options = {}) {
    this.data = options.data || [];
    this.searchInput = document.querySelector(options.searchInput || '#search-input');
    this.resultsContainer = document.querySelector(options.resultsContainer || '#search-results');
    this.minChars = options.minChars || 2;
    this.debounceMs = options.debounceMs || 150;
    
    this.init();
  }

  init() {
    if (!this.searchInput || !this.resultsContainer) {
      console.warn('Search elements not found');
      return;
    }

    this.searchInput.addEventListener('input', this.debounce(
      (e) => this.handleSearch(e.target.value),
      this.debounceMs
    ));

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.clearResults();
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        this.clearResults();
      }
    });
  }

  debounce(fn, ms) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), ms);
    };
  }

  handleSearch(query) {
    if (query.length < this.minChars) {
      this.clearResults();
      return;
    }

    const results = this.search(query);
    this.renderResults(results, query);
  }

  search(query) {
    const normalizedQuery = query.toLowerCase().trim();
    const terms = normalizedQuery.split(/\s+/);

    return this.data
      .map(item => {
        const score = this.calculateScore(item, terms);
        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Top 10 results
  }

  calculateScore(item, terms) {
    let score = 0;
    const searchableText = [
      item.name,
      item.description,
      item.provider,
      item.category,
      ...(item.tags || [])
    ].join(' ').toLowerCase();

    terms.forEach(term => {
      // Exact match in name
      if (item.name?.toLowerCase().includes(term)) score += 10;
      
      // Exact match in provider
      if (item.provider?.toLowerCase().includes(term)) score += 8;
      
      // Match in description
      if (item.description?.toLowerCase().includes(term)) score += 5;
      
      // Match in tags
      if (item.tags?.some(tag => tag.toLowerCase().includes(term))) score += 4;
      
      // Partial match
      if (searchableText.includes(term)) score += 2;
    });

    return score;
  }

  renderResults(results, query) {
    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="search-no-results">
          <p>Keine Ergebnisse für "${this.escapeHtml(query)}"</p>
          <span>Versuche: GPT-4, Claude, Gemini, Coding, Preise...</span>
        </div>
      `;
      return;
    }

    const html = results.map(item => this.renderResultItem(item)).join('');
    this.resultsContainer.innerHTML = html;
    this.resultsContainer.classList.add('active');
  }

  renderResultItem(item) {
    const categoryLabels = {
      model: 'Modell',
      comparison: 'Vergleich',
      guide: 'Guide',
      benchmark: 'Benchmark'
    };

    return `
      <a href="${item.url}" class="search-result-item" data-category="${item.category}">
        <div class="search-result-icon">
          ${this.getIcon(item.category)}
        </div>
        <div class="search-result-content">
          <h4>${this.highlightMatch(item.name)}</h4>
          <p>${this.truncate(this.highlightMatch(item.description), 100)}</p>
          <div class="search-result-meta">
            <span class="badge">${categoryLabels[item.category] || item.category}</span>
            ${item.provider ? `<span class="provider">${item.provider}</span>` : ''}
          </div>
        </div>
      </a>
    `;
  }

  getIcon(category) {
    const icons = {
      model: '🤖',
      comparison: '⚖️',
      guide: '📖',
      benchmark: '📊'
    };
    return icons[category] || '📄';
  }

  highlightMatch(text) {
    if (!text) return '';
    const query = this.searchInput.value.trim();
    if (!query) return this.escapeHtml(text);
    
    const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
    return this.escapeHtml(text).replace(regex, '<mark>$1</mark>');
  }

  truncate(text, length) {
    if (!text || text.length <= length) return text;
    return text.substring(0, length) + '...';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  clearResults() {
    this.resultsContainer.innerHTML = '';
    this.resultsContainer.classList.remove('active');
  }
}

// Filter Module für Modelle
class ModelFilter {
  constructor(options = {}) {
    this.container = document.querySelector(options.container || '#models-grid');
    this.models = options.models || [];
    this.filters = {
      type: [],
      provider: [],
      priceRange: null,
      contextSize: null
    };
    
    this.init();
  }

  init() {
    this.renderFilters();
    this.renderModels(this.models);
  }

  renderFilters() {
    const filterHTML = `
      <div class="filter-bar">
        <div class="filter-group">
          <label>Kategorie</label>
          <select id="filter-type">
            <option value="">Alle</option>
            <option value="flagship">Flagship</option>
            <option value="balanced">Balanced</option>
            <option value="fast">Fast/Cheap</option>
            <option value="opensource">Open Source</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Anbieter</label>
          <select id="filter-provider">
            <option value="">Alle</option>
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="google">Google</option>
            <option value="meta">Meta</option>
            <option value="other">Andere</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Max Preis/1M Tokens</label>
          <input type="range" id="filter-price" min="0" max="20" step="1" value="20">
          <span id="price-value">$20</span>
        </div>
        
        <div class="filter-group">
          <label>Min. Kontext</label>
          <select id="filter-context">
            <option value="">Alle</option>
            <option value="128k">128K+</option>
            <option value="200k">200K+</option>
            <option value="1m">1M+</option>
          </select>
        </div>
        
        <button id="filter-reset" class="btn-secondary">Zurücksetzen</button>
      </div>
    `;

    this.container.insertAdjacentHTML('beforebegin', filterHTML);
    this.attachFilterListeners();
  }

  attachFilterListeners() {
    document.getElementById('filter-type')?.addEventListener('change', (e) => {
      this.filters.type = e.target.value ? [e.target.value] : [];
      this.applyFilters();
    });

    document.getElementById('filter-provider')?.addEventListener('change', (e) => {
      this.filters.provider = e.target.value ? [e.target.value] : [];
      this.applyFilters();
    });

    document.getElementById('filter-price')?.addEventListener('input', (e) => {
      this.filters.priceRange = parseFloat(e.target.value);
      document.getElementById('price-value').textContent = `$${e.target.value}`;
      this.applyFilters();
    });

    document.getElementById('filter-context')?.addEventListener('change', (e) => {
      this.filters.contextSize = e.target.value;
      this.applyFilters();
    });

    document.getElementById('filter-reset')?.addEventListener('click', () => {
      this.resetFilters();
    });
  }

  applyFilters() {
    let filtered = this.models;

    if (this.filters.type.length > 0) {
      filtered = filtered.filter(m => this.filters.type.includes(m.type));
    }

    if (this.filters.provider.length > 0) {
      filtered = filtered.filter(m => this.filters.provider.includes(m.provider));
    }

    if (this.filters.priceRange !== null) {
      filtered = filtered.filter(m => m.priceInput <= this.filters.priceRange);
    }

    if (this.filters.contextSize) {
      const minContext = {
        '128k': 128000,
        '200k': 200000,
        '1m': 1000000
      }[this.filters.contextSize];
      filtered = filtered.filter(m => m.contextWindow >= minContext);
    }

    this.renderModels(filtered);
  }

  resetFilters() {
    this.filters = { type: [], provider: [], priceRange: null, contextSize: null };
    document.getElementById('filter-type').value = '';
    document.getElementById('filter-provider').value = '';
    document.getElementById('filter-price').value = 20;
    document.getElementById('price-value').textContent = '$20';
    document.getElementById('filter-context').value = '';
    this.renderModels(this.models);
  }

  renderModels(models) {
    const grid = this.container.querySelector('.models-grid') || this.container;
    
    if (models.length === 0) {
      grid.innerHTML = '<p class="no-results">Keine Modelle gefunden. Passe die Filter an.</p>';
      return;
    }

    grid.innerHTML = models.map(model => this.renderModelCard(model)).join('');
  }

  renderModelCard(model) {
    return `
      <div class="model-card" data-id="${model.id}">
        <div class="model-header">
          <h3>${model.name}</h3>
          <span class="provider-badge ${model.provider}">${model.provider}</span>
        </div>
        <p class="model-description">${model.description}</p>
        <div class="model-specs">
          <div class="spec">
            <span class="spec-label">Kontext</span>
            <span class="spec-value">${this.formatContext(model.contextWindow)}</span>
          </div>
          <div class="spec">
            <span class="spec-label">Input</span>
            <span class="spec-value">$${model.priceInput}/1M</span>
          </div>
          <div class="spec">
            <span class="spec-label">Output</span>
            <span class="spec-value">$${model.priceOutput}/1M</span>
          </div>
        </div>
        <div class="model-actions">
          <a href="${model.url}" class="btn-primary">Details</a>
          <button class="btn-compare" data-id="${model.id}">Vergleichen</button>
        </div>
      </div>
    `;
  }

  formatContext(tokens) {
    if (tokens >= 1000000) return `${(tokens / 1000000).toFixed(0)}M`;
    if (tokens >= 1000) return `${(tokens / 1000).toFixed(0)}K`;
    return tokens;
  }
}

// Vergleichs-Tool
class ModelComparison {
  constructor(options = {}) {
    this.maxCompare = options.maxCompare || 3;
    this.selectedModels = [];
    this.container = document.querySelector(options.container || '#comparison-tool');
    
    this.init();
  }

  init() {
    this.renderComparisonTool();
    this.attachEventListeners();
  }

  renderComparisonTool() {
    this.container.innerHTML = `
      <div class="comparison-tool">
        <h2>Modelle vergleichen</h2>
        <p class="comparison-hint">Wähle bis zu ${this.maxCompare} Modelle zum Vergleichen</p>
        
        <div class="comparison-selector">
          <select id="model-select">
            <option value="">Modell hinzufügen...</option>
            ${this.getModelOptions()}
          </select>
        </div>
        
        <div class="comparison-slots">
          ${Array(this.maxCompare).fill(0).map((_, i) => `
            <div class="comparison-slot ${i === 0 ? 'required' : ''}" data-slot="${i}">
              <span class="slot-label">Modell ${i + 1}${i === 0 ? ' *' : ''}</span>
              <div class="slot-content">Nicht ausgewählt</div>
              <button class="slot-remove" data-slot="${i}" style="display:none">×</button>
            </div>
          `).join('')}
        </div>
        
        <button id="compare-btn" class="btn-primary" disabled>
          Vergleichen
        </button>
      </div>
      
      <div id="comparison-results" class="comparison-results"></div>
    `;
  }

  getModelOptions() {
    // Wird aus Datenbank geladen
    return `
      <optgroup label="OpenAI">
        <option value="gpt-5">GPT-5</option>
        <option value="gpt-4o">GPT-4o</option>
        <option value="gpt-4o-mini">GPT-4o Mini</option>
      </optgroup>
      <optgroup label="Anthropic">
        <option value="claude-4-opus">Claude 4 Opus</option>
        <option value="claude-4-sonnet">Claude 4 Sonnet</option>
        <option value="claude-3.5-sonnet">Claude 3.5 Sonnet</option>
      </optgroup>
      <optgroup label="Google">
        <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
        <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
      </optgroup>
    `;
  }

  attachEventListeners() {
    document.getElementById('model-select')?.addEventListener('change', (e) => {
      if (e.target.value) {
        this.addModel(e.target.value);
        e.target.value = '';
      }
    });

    document.getElementById('compare-btn')?.addEventListener('click', () => {
      this.performComparison();
    });

    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('slot-remove')) {
        this.removeModel(parseInt(e.target.dataset.slot));
      }
    });
  }

  addModel(modelId) {
    if (this.selectedModels.length >= this.maxCompare) {
      alert(`Maximal ${this.maxCompare} Modelle zum Vergleichen`);
      return;
    }

    if (this.selectedModels.includes(modelId)) {
      alert('Dieses Modell ist bereits ausgewählt');
      return;
    }

    this.selectedModels.push(modelId);
    this.updateUI();
  }

  removeModel(slotIndex) {
    this.selectedModels.splice(slotIndex, 1);
    this.updateUI();
  }

  updateUI() {
    const slots = this.container.querySelectorAll('.comparison-slot');
    
    slots.forEach((slot, i) => {
      const content = slot.querySelector('.slot-content');
      const removeBtn = slot.querySelector('.slot-remove');
      
      if (this.selectedModels[i]) {
        const modelName = this.getModelName(this.selectedModels[i]);
        content.textContent = modelName;
        slot.classList.add('filled');
        removeBtn.style.display = 'block';
      } else {
        content.textContent = 'Nicht ausgewählt';
        slot.classList.remove('filled');
        removeBtn.style.display = 'none';
      }
    });

    const compareBtn = document.getElementById('compare-btn');
    compareBtn.disabled = this.selectedModels.length < 2;
  }

  getModelName(modelId) {
    const names = {
      'gpt-5': 'GPT-5',
      'gpt-4o': 'GPT-4o',
      'gpt-4o-mini': 'GPT-4o Mini',
      'claude-4-opus': 'Claude 4 Opus',
      'claude-4-sonnet': 'Claude 4 Sonnet',
      'claude-3.5-sonnet': 'Claude 3.5 Sonnet',
      'gemini-2.5-pro': 'Gemini 2.5 Pro',
      'gemini-2.5-flash': 'Gemini 2.5 Flash'
    };
    return names[modelId] || modelId;
  }

  performComparison() {
    const resultsContainer = document.getElementById('comparison-results');
    
    // Hier würden die tatsächlichen Daten geladen werden
    resultsContainer.innerHTML = `
      <div class="comparison-table-wrapper">
        <h3>Vergleichsergebnis</h3>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Merkmal</th>
              ${this.selectedModels.map(id => `<th>${this.getModelName(id)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Anbieter</td>
              <td colspan="${this.selectedModels.length}">Lade Daten...</td>
            </tr>
          </tbody>
        </table>
        <p class="comparison-note">
          <a href="/vergleich/${this.selectedModels.join('-vs-')}">Detaillierter Vergleich →</a>
        </p>
      </div>
    `;
    
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
  }
}

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AgentRankSearch, ModelFilter, ModelComparison };
}
