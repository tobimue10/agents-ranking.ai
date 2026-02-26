# Interne Verlinkungs-Strategie für agents-ranking.ai

## Aktuelle Verlinkungsstruktur

### Hauptnavigation
```
Home
├── Modelle
├── Vergleich (Anchor auf Home)
└── Benchmarks
```

### Empfohlene erweiterte Struktur

```
Home
├── Modelle
│   ├── GPT-4o
│   ├── Claude 3.5 Sonnet
│   ├── Gemini Pro 1.5
│   ├── Llama 3.3
│   └── ...
├── Vergleiche
│   ├── GPT-4o vs Claude 3.5
│   ├── Beste KI für Coding
│   ├── Günstigste KI-API
│   └── Open Source vs Closed Source
├── Benchmarks
│   ├── MMLU erklärt
│   ├── HumanEval erklärt
│   └── LMSYS Arena
└── Guides
    ├── KI für Anfänger
    ├── API-Integration
    └── Preisvergleich
```

---

## Contextual Links (Content-Links)

### Auf der Startseite (index.html):

#### Top 5 Modelle Sektion:
Jedes Modell sollte verlinken zu:
- Detailseite des Modells
- "Vergleiche mit [anderem Top-Modell]"

Beispiel:
```html
<div class="model-card">
  <h3>Claude Opus 4.6</h3>
  <a href="/models/claude-opus-4-6">Details →</a>
  <a href="/vergleich/claude-vs-gpt-4o">Vergleiche mit GPT-4o →</a>
</div>
```

#### Vergleichstabelle:
- Jede Zeile → Modell-Detailseite
- "Alle Modelle vergleichen" → /models

---

### Auf Modell-Detailseiten:

#### GPT-4o Seite:
```html
<!-- Related Comparisons -->
<section class="related-comparisons">
  <h3>Beliebte Vergleiche mit GPT-4o</h3>
  <ul>
    <li><a href="/vergleich/gpt-4o-vs-claude-3-5">GPT-4o vs Claude 3.5</a></li>
    <li><a href="/vergleich/gpt-4o-vs-gemini-pro">GPT-4o vs Gemini Pro</a></li>
    <li><a href="/vergleich/gpt-4o-vs-llama-3">GPT-4o vs Llama 3.3</a></li>
  </ul>
</section>

<!-- Related Models -->
<section class="related-models">
  <h3>Ähnliche Modelle</h3>
  <ul>
    <li><a href="/models/gpt-4-turbo">GPT-4 Turbo</a></li>
    <li><a href="/models/gpt-4o-mini">GPT-4o Mini</a></li>
    <li><a href="/models/claude-3-5-sonnet">Claude 3.5 Sonnet</a></li>
  </ul>
</section>

<!-- Back to Overview -->
<a href="/models" class="back-link">← Alle Modelle</a>
```

---

### Footer-Links (SEO-wichtig):

```html
<footer>
  <div class="footer-sections">
    
    <!-- Beliebte Vergleiche -->
    <div class="footer-column">
      <h4>Beliebte Vergleiche</h4>
      <ul>
        <li><a href="/vergleich/gpt-4o-vs-claude-3-5">GPT-4o vs Claude 3.5</a></li>
        <li><a href="/vergleich/gemini-vs-gpt-4">Gemini vs GPT-4</a></li>
        <li><a href="/vergleich/llama-vs-kommerziell">Llama vs Kommerziell</a></li>
        <li><a href="/vergleich/deepseek-vs-gpt-4">DeepSeek vs GPT-4</a></li>
      </ul>
    </div>
    
    <!-- Kategorien -->
    <div class="footer-column">
      <h4>Kategorien</h4>
      <ul>
        <li><a href="/kategorie/beste-ki-coding">Beste KI für Coding</a></li>
        <li><a href="/kategorie/guenstigste-api">Günstigste KI-APIs</a></li>
        <li><a href="/kategorie/open-source">Open Source KI</a></li>
        <li><a href="/kategorie/ki-fuer-anfaenger">KI für Anfänger</a></li>
      </ul>
    </div>
    
    <!-- Guides -->
    <div class="footer-column">
      <h4>Guides</h4>
      <ul>
        <li><a href="/guide/mmlu-erklaert">MMLU Benchmark erklärt</a></li>
        <li><a href="/guide/humaneval-erklaert">HumanEval erklärt</a></li>
        <li><a href="/guide/api-integration">API-Integration Guide</a></li>
        <li><a href="/guide/preise-vergleichen">KI-Preise vergleichen</a></li>
      </ul>
    </div>
    
  </div>
</footer>
```

---

## Anchor-Text-Optimierung

### Gute Anchor-Texte:
- "GPT-4o im Detail" (statt "hier klicken")
- "Vergleiche Claude 3.5 mit GPT-4o" (deskriptiv)
- "Beste KI für Coding 2025" (keyword-reich)
- "Günstigste KI-APIs im Vergleich" (long-tail)

### Zu vermeiden:
- "Hier"
- "Klicken Sie hier"
- "Mehr"
- "Link"

---

## Link-Verteilung pro Seite

### Homepage:
- 3-5 Links zu Top-Modellen
- 2-3 Links zu Vergleichs-Seiten
- 1 Link zu Benchmark-Erklärungen

### Modell-Detailseiten:
- 1 Link zurück zur Übersicht
- 2-3 Links zu verwandten Vergleichen
- 2-3 Links zu ähnlichen Modellen

### Vergleichs-Seiten:
- Links zu beiden verglichenen Modellen
- Links zu weiteren relevanten Vergleichen
- Link zu Preis-Guide

---

## Breadcrumb-Implementierung

Siehe: `/components/breadcrumb.html`

Jede Seite sollte Breadcrumbs haben für:
- Bessere User Experience
- SEO (Google zeigt sie in SERPs)
- Schema.org Structured Data

---

## Implementierungs-Priorität

### Phase 1 (Sofort):
1. [ ] Footer-Links erweitern
2. [ ] Breadcrumb-Navigation hinzufügen
3. [ ] "Zurück zur Übersicht" Links

### Phase 2 (Diese Woche):
4. [ ] Related Comparisons auf Modell-Seiten
5. [ ] Related Models auf Modell-Seiten
6. [ ] Contextual Links in Content

### Phase 3 (Nächste Woche):
7. [ ] Neue Vergleichs-Seiten erstellen
8. [ ] Guide-Seiten erstellen
9. [ ] Interne Link-Audits durchführen

---

*Erstellt: 26. Februar 2025*
