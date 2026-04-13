# Project Charter

## One-liner
A mobile-responsive web app that lets users visualize and compare meeting times across up to 10 time zones simultaneously.

## Context
- Why now: Remote work is the norm; scheduling across time zones is a daily friction point for distributed professionals.
- Who cares: Remote professionals who regularly coordinate meetings with colleagues, clients, or partners in different cities/time zones.
- Current pain: Mentally converting between multiple time zones is error-prone, and existing tools are either too complex or don't show all zones at a glance.

## Goals (what success looks like)
- G1: User can specify their location (city) and a proposed meeting time.
- G2: User can add up to 10 additional locations and instantly see the corresponding local times.
- G3: The app provides a clear visual indication of whether a proposed time is reasonable (e.g., business hours vs. early morning/late night) for each location.
- G4: Works well on both desktop and mobile browsers.

## Non-goals (explicitly out of scope)
- N1: Calendar integration (Google Calendar, Outlook, etc.).
- N2: User accounts, authentication, or persistent data storage.
- N3: Meeting invitations or email/notification features.
- N4: Native mobile apps (iOS/Android).

## Users / Stakeholders
- Primary user: Remote professionals scheduling meetings across time zones.
- Sponsor / approver: Solo developer (repo owner).

## Constraints & Guardrails
- Stateless/anonymous — no user accounts, no server-side data persistence.
- Tech stack to be decided during the architecture phase.
- Human-in-the-loop for architectural and security decisions.
- Documentation-first discipline.

## Security & Privacy (mandatory)

### Data classification assumption
- Default classification: Public
- Data types expected: Code only; no user data stored.
- PII/PHI: None. The app is stateless and does not collect or store personal information.

### Hard stop (must ask before proceeding)
Ask the human before ANY of the following:
- Adding external dependencies (packages, containers, services) or enabling network access patterns
- Creating anything that could materially change costs, security posture, or data residency
- Writing automation that can modify or delete data/resources (cloud, SaaS, GitHub, etc.)

### Non-negotiable rules
- Never commit secrets (API keys, tokens, certs, passwords).
- Use synthetic examples only for any test data.
- Prefer least privilege: minimal permissions, minimal scope, minimal exposure.
- Every project must include a validation plan that includes security checks (even if lightweight).

### Threat model (lite)
- Assets to protect (what matters):
  - A1: Application availability and integrity (no defacement or injection).
  - A2: User trust — the app must display correct time zone data.
- Attack surfaces (where it could go wrong):
  - S1: Client-side input (city names) — potential XSS if not sanitized.
  - S2: Third-party time zone API (if used) — dependency on external service availability and data accuracy.
- Top threats / mitigations:
  - T1: XSS via city name input → M1: Sanitize/escape all user input before rendering.
  - T2: Incorrect time zone data from stale library → M2: Use a well-maintained time zone library (e.g., IANA tz database) and keep it updated.

### Security definition of done (minimum)
- Security assumptions documented (data classification, use of synthetic vs real data).
- No secrets required (stateless, no auth).
- Input sanitization implemented for all user-facing inputs.
- Risks captured in this charter.

## Assumptions
- A1: Users know the city or general location of their meeting participants (not necessarily the exact time zone name).
- A2: Business hours are roughly 08:00–18:00 local time for the purpose of visual indicators.
- A3: The app does not need to handle historical time zone changes — current offsets only.

## Risks (top 3)
- R1: Time zone data accuracy — DST transitions and edge cases may cause incorrect conversions.
- R2: City-to-timezone mapping — ambiguous or unrecognized city names could frustrate users.
- R3: Scope creep — calendar integration and account features are common requests that must stay out of scope.

## Definition of Done (minimum)
- DoD1: User can enter a location and meeting time and see it converted across up to 10 additional locations.
- DoD2: Visual indicator shows whether each location's local time falls within business hours.
- DoD3: App is mobile-responsive and works on modern browsers.
- DoD4: No user data is collected or stored.

## Next step
Proceed to `docs/01-requirements.md` to define detailed requirements with acceptance criteria.
