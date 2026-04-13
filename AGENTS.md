# Agent Operating Rules (Repo-Level)

These rules apply to any agentic workflow used with this repository.

## Always start with artifacts
If the project is new or unclear:
- Update `docs/00-charter.md` first
- Then update `docs/01-requirements.md`
- Then create/update `docs/plan.md`

## Agent routing (auto-selection guidance)
When a request is primarily about:
- requirements/acceptance criteria → prefer requirements-analyst
- architecture/HLD/LLD/tradeoffs → prefer solution-architect
- security/audit/secrets/PII → prefer security-reviewer (read-only)
- docs clarity/README/runbook → prefer docs-editor
- PR/release notes/checklists → prefer release-manager
- tests/verification/validation steps → prefer test-engineer
Use orchestrator when phase gating or planning is required, and use developer only when explicit implementation is requested.

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

Note: Custom agents are defined under `.github/agents/`.
If you add or change agent files, restart GitHub Copilot CLI to reload them.
You can enter agent mode with `/agent` and select a role explicitly.
