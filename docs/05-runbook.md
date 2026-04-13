# Runbook

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm (included with Node.js)

## Install
```bash
npm install
```

## Build
```bash
npm run build
```
Output is written to `dist/`. TypeScript type-checking runs automatically before the Vite build.

## Dev Server
```bash
npm run dev
```
Opens a local dev server at http://localhost:5173 with hot module reload.

## Type Check (standalone)
```bash
npx tsc --noEmit
```

## Lint
```bash
npm run lint
```

## Preview Production Build
```bash
npm run preview
```

## Deploy

### Azure Static Web Apps (primary)

The app is deployed to Azure Static Web Apps via GitHub Actions.

**CI/CD pipeline** (`.github/workflows/azure-static-web-apps.yml`):
- Triggers on push to `main` and on pull requests
- Runs lint, tests, and build
- Deploys `dist/` to Azure Static Web Apps
- Creates staging environments for PRs (auto-cleaned on close)

**Live URL**: https://lemon-sand-04663830f.7.azurestaticapps.net

**Required GitHub secret**: `AZURE_STATIC_WEB_APPS_API_TOKEN` (SWA deployment token)

**To redeploy manually**:
```bash
npm run build
npx @azure/static-web-apps-cli deploy ./dist \
  --deployment-token <your-token>
```

### Other static hosting
The app is a fully static SPA — deploy the `dist/` folder to any static hosting:
- **GitHub Pages**: Push `dist/` to a `gh-pages` branch
- **Vercel / Netlify**: Set build command to `npm run build`, output directory to `dist`
- **Any web server**: Serve `dist/` as static files

## Notes
- No backend or database required.
- No environment variables or secrets needed.
- The app is stateless — no user data is stored anywhere.
