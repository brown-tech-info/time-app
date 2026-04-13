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
The app is a fully static SPA — deploy the `dist/` folder to any static hosting:
- **GitHub Pages**: Push `dist/` to a `gh-pages` branch
- **Vercel / Netlify**: Set build command to `npm run build`, output directory to `dist`
- **Any web server**: Serve `dist/` as static files

## Notes
- No backend or database required.
- No environment variables or secrets needed.
- The app is stateless — no user data is stored anywhere.
