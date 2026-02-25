# Automatisches Deployment

## Aktueller Status

Das Repository ist für **manuelles Deployment** konfiguriert.

## Deployment-Optionen

### Option 1: Vercel (Empfohlen)
1. Repository auf Vercel importieren: https://vercel.com/new
2. Framework Preset: Next.js
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Environment Variables: Keine nötig

### Option 2: GitHub Pages
1. Repository Settings → Pages
2. Source: GitHub Actions
3. Workflow erstellen (siehe unten)

### Option 3: Netlify
1. Repository auf Netlify importieren
2. Build Command: `npm run build`
3. Publish Directory: `dist`

## Manuelles Deployment

```bash
# Build erstellen
npm run build

# Dist-Ordner auf Server kopieren
# oder
# Vercel CLI verwenden
vercel --prod
```

## Automatisches Deployment einrichten

### Vercel (einfachste Option)
1. Auf https://vercel.com anmelden
2. "Add New Project"
3. GitHub-Repository auswählen
4. Deploy

Vercel deployed automatisch bei jedem Push auf main.

## Konfiguration

Die `next.config.mjs` ist bereits für Static Export konfiguriert:

```javascript
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
};
```

## Nach dem Deployment

- Website wird unter [Domain] verfügbar
- Jeder Push auf main triggered neuen Build
- Cronjobs aktualisieren Daten automatisch
