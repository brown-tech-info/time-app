# Decision Log

Record notable decisions that affect architecture, scope, security, or operations.

## Format
- Date:
- Decision:
- Context:
- Options considered:
- Chosen option:
- Consequences:
- Follow-ups:

---

## Decisions

### D-001: Frontend framework
- Date: 2026-04-13
- Decision: Use React with TypeScript
- Context: Need a component-based framework for interactive UI with type safety.
- Options considered: React, Vue, Svelte, Vanilla JS
- Chosen option: React + TypeScript — large ecosystem, strong component model, type safety.
- Consequences: Requires JSX/TSX build step; larger bundle than Svelte but acceptable for this scope.
- Follow-ups: None.

### D-002: Build tooling
- Date: 2026-04-13
- Decision: Use Vite for project scaffolding and dev server
- Context: Need a fast, modern build tool for a React + TypeScript SPA.
- Options considered: Vite, Next.js, Create React App
- Chosen option: Vite — fast dev server, modern defaults, lightweight for a static SPA.
- Consequences: No SSR out of the box (not needed for this project).
- Follow-ups: None.

### D-003: City/timezone data source
- Date: 2026-04-13
- Decision: Bundle a static JSON dataset of cities with IANA timezone IDs
- Context: Resolves open question Q1 from requirements. Need to map city names to time zones.
- Options considered: Bundled dataset vs. third-party API (GeoNames, TimeZoneDB)
- Chosen option: Bundled dataset — no external API dependency, works offline, no API key needed.
- Consequences: Dataset must be curated and maintained manually; may miss obscure cities.
- Follow-ups: Determine minimum city count (~500+) and source for initial dataset.

### D-004: Styling approach
- Date: 2026-04-13
- Decision: Use Tailwind CSS
- Context: Need responsive, utility-first styling for rapid prototyping.
- Options considered: Tailwind CSS, CSS Modules, plain CSS
- Chosen option: Tailwind CSS — fast prototyping, built-in responsive utilities.
- Consequences: Adds a build dependency; team must be comfortable with utility-class approach.
- Follow-ups: None.
