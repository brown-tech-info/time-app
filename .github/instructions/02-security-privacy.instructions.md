---
applyTo: "**"
---

# Security & Privacy Guardrails

These rules are absolute.

## Hard stop rules (must ask the human)
- Introducing new external dependencies
- Architecture-changing decisions
- Handling real data (PII, PHI, customer data)
- Deleting files or large refactors

## Data handling
- Never include secrets in files.
- Use synthetic examples only.
- Document data classification assumptions explicitly.

## Principle
Safety first, progress second.
