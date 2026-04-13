# 🌍 Time Zone Meeting Planner

A fast, stateless web app that helps remote professionals find the best meeting time across up to 10 time zones. No sign-up required.

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-6-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue) ![Vite](https://img.shields.io/badge/Vite-8-purple)

---

## Features

- **City autocomplete** — search 550+ cities worldwide with instant fuzzy matching
- **Auto-detect location** — your timezone is detected automatically on first load
- **Color-coded time cards** — green (business hours), yellow (early/late), red (overnight)
- **Up to 10 comparison zones** — add cities and see all local times at a glance
- **Shareable links** — generate a URL that encodes your full comparison (no server needed)
- **Mobile-responsive** — works on any screen size down to 320px
- **DST-aware** — uses the IANA timezone database for accurate conversions
- **Fully static** — no backend, no accounts, no data collection

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm (included with Node.js)

### Install & Run

```bash
# Clone the repository
git clone https://github.com/brown-tech-info/time-app.git
cd time-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
```

Output is written to `dist/`. Serve it with any static file server:

```bash
npm run preview     # Preview the production build locally
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Timezone data | Bundled city dataset (550+ cities, IANA tz IDs) |
| Deployment | Static SPA — deploy anywhere (Vercel, Netlify, GitHub Pages, S3, etc.) |

---

## Project Structure

```
src/
├── components/
│   ├── App.tsx              # Root layout and state management
│   ├── CitySearch.tsx       # Autocomplete city input
│   ├── DateTimePicker.tsx   # Date + time picker
│   ├── TimeCard.tsx         # Single location card (color-coded)
│   ├── TimeCardGrid.tsx     # Grid of comparison cards
│   ├── ShareButton.tsx      # Generate & copy shareable URL
│   └── Header.tsx           # App header
├── data/
│   └── cities.json          # Bundled city → timezone dataset
├── hooks/
│   ├── useGeolocation.ts    # Auto-detect user timezone
│   └── useShareUrl.ts       # Encode/decode shareable URLs
├── utils/
│   ├── timezone.ts          # Time conversion & DST logic
│   ├── colorCode.ts         # Business-hours classification
│   └── sanitize.ts          # Input sanitization (XSS prevention)
├── types/
│   └── index.ts             # Shared TypeScript types
├── main.tsx                 # App entry point
└── index.css                # Tailwind base styles
```

---

## How It Works

1. **Select your location** — type a city name or let the app auto-detect your timezone
2. **Pick a meeting time** — choose a date and time using the picker
3. **Add comparison cities** — search and add up to 10 other locations
4. **Read the cards** — each card shows the local time with a color indicator:
   - 🟢 **Green** — 08:00–18:00 (business hours)
   - 🟡 **Yellow** — 06:00–08:00 or 18:00–22:00 (early/late)
   - 🔴 **Red** — 22:00–06:00 (overnight)
5. **Share** — click the Share button to copy a link that reconstructs your comparison

---

## Deployment

This is a fully static site with no backend. Deploy the `dist/` folder to any static hosting provider:

- **GitHub Pages**: Push `dist/` to a `gh-pages` branch
- **Vercel / Netlify**: Connect the repo; set build command to `npm run build` and output directory to `dist`
- **Any web server**: Serve the `dist/` folder as static files

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

This project is open source. See the repository for license details.
