# Agent Operating Rules (Repo-Level)

These rules apply to any agentic workflow used with this repository.

## Always start with artifacts
If the project is new or unclear:
- Update `docs/00-charter.md` first
- Then update `docs/01-requirements.md`
- Then create/update `docs/plan.md`

## Stop Rules (must ask before proceeding)
Ask the human before:
- introducing new external dependencies
- making architecture-changing decisions
- handling real data (PII/PHI/customer data)
- deleting files or large refactors

## Behavior
- Prefer small, reviewable changes
- Keep scope tight and explicitly mapped to requirements
- Write down assumptions; do not hide them

## Deliverable-first outputs
Every significant step should result in an artifact in /docs:
- charter, requirements, plan, decision log entries, risk notes, runbook notes