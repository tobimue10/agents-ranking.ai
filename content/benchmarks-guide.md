# Benchmark-Guide: LLM-Evaluierung verstehen

## Die wichtigsten Benchmarks erklärt

### 1. LMSYS Chatbot Arena (Elo-Rating)

**Was wird gemessen?**
- Direkter Vergleich von Modellen durch menschliche Nutzer
- Blinde A/B-Tests: Nutzer bewerten Antworten ohne zu wissen, welches Modell sie erstellt hat
- Elo-Rating-System wie im Schach

**Warum wichtig?**
- Echte Nutzerpräferenzen statt synthetischer Tests
- Reflektiert praktische Nützlichkeit
- Schwierig zu "gamifizieren"

**Top-Modelle (Februar 2025):**
| Rang | Modell | Elo-Score |
|------|--------|-----------|
| 1 | GPT-5 | 1372 |
| 2 | Claude 4 Opus | 1368 |
| 3 | Gemini 2.5 Pro | 1345 |
| 4 | Claude 4 Sonnet | 1335 |
| 5 | GPT-4o | 1312 |

---

### 2. MMLU (Massive Multitask Language Understanding)

**Was wird gemessen?**
- Wissen über 57 verschiedene Fächer
- Multiple-Choice-Fragen aus Wissenschaft, Geschichte, Recht, Medizin etc.
- Testet Breite des Weltwissens

**Beispiel-Frage:**
```
In welchem Jahr fiel die Berliner Mauer?
A) 1987
B) 1989
C) 1991
D) 1993
```

**Interpretation:**
- > 85%: Ausgezeichnetes Allgemeinwissen
- 80-85%: Sehr gutes Wissen
- 70-80%: Gutes Wissen
- < 70%: Lücken in Allgemeinbildung

**Top-Scores:**
| Modell | MMLU Score |
|--------|------------|
| GPT-5 | 88.7% |
| Claude 4 Opus | 88.5% |
| Gemini 2.5 Pro | 87.8% |
| GPT-4o | 87.2% |

---

### 3. HumanEval

**Was wird gemessen?**
- Code-Generierung in Python
- 164 Programmieraufgaben
- Modell muss Funktion vervollständigen, die bestimmte Aufgabe erfüllt
- Tests werden automatisch ausgeführt

**Beispiel-Aufgabe:**
```python
def is_palindrome(s: str) -> bool:
    """Prüft, ob ein String ein Palindrom ist"""
    # Modell vervollständigt hier
```

**Interpretation:**
- > 90%: Weltklasse-Programmierer
- 85-90%: Sehr guter Entwickler
- 80-85%: Guter Entwickler
- < 80%: Durchschnittlicher Entwickler

**Top-Scores:**
| Modell | HumanEval |
|--------|-----------|
| GPT-5 | 92.4% |
| Claude 4 Opus | 91.8% |
| Claude 3.5 Sonnet | 92.0% |
| DeepSeek-R1 | 89.8% |

---

### 4. GSM8K (Grade School Math 8K)

**Was wird gemessen?**
- Mathematisches Reasoning auf Grundschulniveau
- 8.500 Text-Aufgaben
- Erfordert mehrere Rechenschritte

**Beispiel-Aufgabe:**
```
Janet zahlt $40/Monat für ihr Handy. 
Sie bekommt 10% Rabatt für ein Jahresabo.
Wie viel zahlt sie im Jahr?
```

**Interpretation:**
- > 95%: Exzellentes mathematisches Reasoning
- 90-95%: Sehr gutes Reasoning
- 85-90%: Gutes Reasoning
- < 85%: Schwächen bei komplexen Berechnungen

**Top-Scores:**
| Modell | GSM8K |
|--------|-------|
| GPT-5 | 95.2% |
| Claude 4 Opus | 94.8% |
| Gemini 2.5 Pro | 93.5% |
| Claude 4 Sonnet | 92.1% |

---

### 5. MT-Bench

**Was wird gemessen?**
- Multi-Turn Konversationsfähigkeit
- GPT-4 als Judge bewertet Antworten
- 80 Dialoge mit verschiedenen Anweisungen

**Kategorien:**
- Schreiben
- Reasoning
- Mathematik
- Coding
- Rollenspiel
- Wissenschaft

**Interpretation:**
- > 9.0: Hervorragende Konversationsfähigkeit
- 8.5-9.0: Sehr gute Konversationsfähigkeit
- 8.0-8.5: Gute Konversationsfähigkeit

**Top-Scores:**
| Modell | MT-Bench |
|--------|----------|
| GPT-5 | 9.42 |
| Claude 4 Opus | 9.38 |
| Gemini 2.5 Pro | 9.25 |
| Claude 4 Sonnet | 9.15 |

---

### 6. BBH (Big Bench Hard)

**Was wird gemessen?**
- Komplexes Reasoning
- 23 schwierige Aufgaben aus Big-Bench
- Erfordert logisches Denken über mehrere Schritte

**Beispiel-Aufgaben:**
- Logische Rätsel
- Kausales Reasoning
- Abstraktes Denken

---

### 7. TruthfulQA

**Was wird gemessen?**
- Wahrhaftigkeit und Reduzierung von Halluzinationen
- 817 Fragen aus verschiedenen Kategorien
- Testet, ob Modell falsche "gängige Mythen" reproduziert

**Warum wichtig?**
- Misst Tendenz zu Fakten-Erfindung
- Kritisch für vertrauenswürdige KI-Systeme

---

## Benchmark-Limitationen

### Was Benchmarks NICHT messen:

1. **Kreativität**
   - Originelle Ideengenerierung
   - Künstlerischer Ausdruck
   - Humor und Wortspiele

2. **Kontextverständnis**
   - Lange Dokumente verstehen
   - Implizites Wissen
   - Kultureller Kontext

3. **Praktische Nützlichkeit**
   - Workflow-Integration
   - Zuverlässigkeit im Alltag
   - Fehlertoleranz

4. **Sicherheit und Ethik**
   - Harmful content vermeiden
   - Bias-Erkennung
   - Privatsphäre

5. **Langzeitgedächtnis**
   - Konsistenz über lange Gespräche
   - Personalisierung

---

## Wie man Benchmarks richtig liest

### Die goldene Regel:
**Benchmarks sind Indikatoren, keine absolute Wahrheit.**

### Checkliste für die Interpretation:

- [ ] **Mehrere Benchmarks betrachten** - Kein einzelner Test sagt alles
- [ ] **Anwendungsfall beachten** - Coding-Benchmarks sind irrelevant für Textzusammenfassungen
- [ ] **Aktualität prüfen** - Modell-Updates ändern Scores
- [ ] **Eigene Tests machen** - Benchmarks + eigene Prompts = beste Entscheidung
- [ ] **Preis-Leistung beachten** - 5% besserer Score bei 10x Preis?

---

## Benchmark-Dashboard

### Empfohlene Benchmarks nach Anwendungsfall:

| Anwendungsfall | Primärer Benchmark | Sekundärer Benchmark |
|----------------|-------------------|---------------------|
| Coding | HumanEval | MBPP, CodeContests |
| Mathematik | GSM8K | MATH, SAT Math |
| Allgemeinwissen | MMLU | ARC, HellaSwag |
| Konversation | MT-Bench | LMSYS Arena |
| Reasoning | BBH | GPQA, DROP |
| Wahrhaftigkeit | TruthfulQA | HaluEval |

---

## Weitere wichtige Benchmarks

### Für Coding:
- **MBPP** (Mostly Basic Python Programming)
- **CodeContests**
- **SWE-bench** (Software Engineering)
- **LiveCodeBench**

### Für Reasoning:
- **GPQA** (Graduate-Level Google-Proof Q&A)
- **DROP** (Discrete Reasoning)
- **StrategyQA**

### Für Sicherheit:
- **HarmBench**
- **JailbreakBench**
- **SafetyBench**

### Für mehrsprachige Fähigkeiten:
- **MGSM** (Multilingual Grade School Math)
- **TyDi QA** (Multilingual Question Answering)

---

*Letzte Aktualisierung: Februar 2025*
