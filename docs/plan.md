# Plan

## Scope
Build a stateless, mobile-responsive web app that lets users compare meeting times across up to 10 time zones, using color-coded cards to indicate business-hours suitability.

## Tech Stack
- **Framework:** React + TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS
- **Timezone data:** Bundled city/timezone JSON dataset + `Intl.DateTimeFormat` / `Temporal` API (or `date-fns-tz` polyfill)
- **Deployment:** Static site (no backend required)

## Project Structure (target)
```
src/
├── components/
│   ├── App.tsx                  # Root layout and state
│   ├── CitySearch.tsx           # Autocomplete city input (FR1)
│   ├── DateTimePicker.tsx       # Date + time picker (FR3)
│   ├── TimeCard.tsx             # Single location card with color coding (FR5)
│   ├── TimeCardGrid.tsx         # Grid/list of all comparison cards (FR4)
│   ├── ShareButton.tsx          # Generate & copy shareable URL (FR6)
│   └── Header.tsx               # App header / branding
├── data/
│   └── cities.json              # Bundled city→timezone dataset
├── hooks/
│   ├── useGeolocation.ts        # Auto-detect user location (FR2)
│   └── useShareUrl.ts           # Encode/decode share URL (FR6)
├── utils/
│   ├── timezone.ts              # Time conversion & DST logic
│   ├── colorCode.ts             # Business-hours classification (green/yellow/red)
│   └── sanitize.ts              # Input sanitization (NFR1)
├── types/
│   └── index.ts                 # Shared TypeScript types
├── main.tsx                     # Vite entry point
└── index.css                    # Tailwind base styles
public/
└── index.html
```

## Tasks

| ID | Task | Description | Depends on | Owner |
|----|------|-------------|------------|-------|
| T1 | Project scaffold | Initialize Vite + React + TypeScript + Tailwind CSS project | — | `developer` |
| T2 | City dataset | Curate and bundle a JSON dataset of major cities with IANA timezone IDs (~500+ cities) | — | `developer` |
| T3 | Timezone utilities | Implement `timezone.ts` — convert a date/time from one IANA zone to another, DST-aware | — | `developer` |
| T4 | Color-code logic | Implement `colorCode.ts` — classify a local hour into green/yellow/red per FR5 rules | T3 | `developer` |
| T5 | City autocomplete | Build `CitySearch.tsx` — fuzzy search over `cities.json`, dropdown UI, returns selected city+tz | T1, T2 | `developer` |
| T6 | Date-time picker | Build `DateTimePicker.tsx` — date + time input, defaults to now (next half-hour) | T1 | `developer` |
| T7 | Geolocation hook | Implement `useGeolocation.ts` — detect user's timezone via browser API, map to nearest city | T1, T2 | `developer` |
| T8 | Time card component | Build `TimeCard.tsx` — displays city, converted time, UTC offset, color-coded background | T3, T4 | `developer` |
| T9 | Card grid + state | Build `TimeCardGrid.tsx` + wire up `App.tsx` — manage home location, comparison list (max 10), real-time updates | T5, T6, T7, T8 | `developer` |
| T10 | Share URL | Implement `useShareUrl.ts` + `ShareButton.tsx` — encode state to URL params, decode on load | T9 | `developer` |
| T11 | Input sanitization | Implement `sanitize.ts` — escape city name inputs before rendering | T5 | `developer` |
| T12 | Responsive layout | Ensure card grid stacks on mobile (320px+), test breakpoints | T9 | `developer` |
| T13 | Accessibility pass | Add ARIA labels, keyboard nav, text labels alongside colors (WCAG 2.1 AA) | T9 | `developer` |
| T14 | Unit tests | Test timezone conversion (including DST edge cases AC4, AC5, AC13), color-code logic, URL encode/decode | T3, T4, T10 | `test-engineer` |
| T15 | Integration tests | Test full user flow: select city → pick time → see cards → share URL → open URL | T9, T10 | `test-engineer` |
| T16 | Final review | Security review, performance audit, docs update | T14, T15 | `security-reviewer` |

## Milestone Summary
1. **M1 — Foundation** (T1–T4): Scaffold, data, and core logic.
2. **M2 — Core UI** (T5–T8): Individual components working in isolation.
3. **M3 — Integration** (T9–T11): Full app wired together with sharing and sanitization.
4. **M4 — Polish** (T12–T13): Responsive layout and accessibility.
5. **M5 — Verify** (T14–T16): Tests, security review, final docs.

## Notes
- No backend is needed — the app is a fully static SPA.
- The bundled city dataset keeps the app offline-capable after initial load (NFR2).
- Shareable URLs use query parameters (no server storage), keeping the app stateless.
- Open questions Q2 (meeting title in share URL) and Q3 (12h/24h format) are deferred to M3.