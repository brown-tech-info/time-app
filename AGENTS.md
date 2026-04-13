# Agent Operating Rules (Repo-Level)

These rules apply to **all agentic workflows** used with this repository, whether agents are selected manually or automatically by GitHub Copilot CLI.

This repository is intentionally **process-driven and guardrail-first**.  
Agents are specialists with **narrow authority**. Coordination happens through artifacts, not implicit memory or agent-to-agent conversation.

---

## Core principle

**Artifacts are the source of truth.**

Agents must not rely on hidden state or long conversational context.  
They communicate and coordinate exclusively by **reading and writing files under `/docs`**.

---

## Always start with artifacts

If the project is new, vague, or changing direction, follow this order:

1. Update `docs/00-charter.md`
2. Update `docs/01-requirements.md`
3. Create or update `docs/plan.md`

Do **not** proceed to implementation if upstream artifacts are missing, incomplete, or clearly outdated.

---

## Agent routing (auto‑selection guidance)

GitHub Copilot CLI **may automatically select specialist agents** when their expertise matches the task.  
Use the following routing intent:

When a request is primarily about:

- **Requirements, scope, acceptance criteria**  
  → prefer `requirements-analyst`
- **Architecture, HLD/LLD, tradeoffs, threat modeling**  
  → prefer `solution-architect`
- **Security, audit, secrets, PII/PHI, risk assessment**  
  → prefer `security-reviewer` (read‑only)
- **Documentation clarity, README, runbook polish**  
  → prefer `docs-editor`
- **PR descriptions, release notes, release checklists**  
  → prefer `release-manager`
- **Tests, validation, verification steps**  
  → prefer `test-engineer`

Use **`orchestrator`** when:
- phase gating or readiness validation is required
- planning or re‑planning is needed
- you want to prevent premature execution

Use **`developer`** **only** when:
- explicit implementation is requested
- requirements and a plan already exist

---

## Manual vs automatic agent usage

This repo supports **both manual and automatic agent selection**:

- **Auto‑invocable agents**  
  Copilot CLI may choose these agents automatically and run them as **sub‑agents** with scoped permissions.

- **Manual‑only agents**  
  Some agents are intentionally not auto‑invoked to avoid unintended execution or governance overhead.

You always retain control:
- You can explicitly select an agent via `/agent` or `@agent-name`
- Manual selection always overrides auto‑routing

---

## Stop rules (must ask before proceeding)

An agent **must ask the human** before:

- introducing new external dependencies
- making architecture‑changing decisions
- handling real data (PII, PHI, customer data)
- deleting files or performing large refactors
- performing destructive, irreversible, or high‑risk actions

---

## Behavior expectations

All agents must:

- Prefer small, reviewable changes
- Keep scope tight and explicitly mapped to requirements
- Write assumptions down — never hide them
- Avoid speculative or silent decision‑making

---

## Deliverable‑first outputs

Every meaningful step must result in a tangible artifact under `/docs`, such as:

- Charter updates  
- Requirements with acceptance criteria  
- Plan updates  
- Decision‑log entries  
- Risk or security notes  
- Runbook and validation notes  

If no artifact changes, the step is **not complete**.

---

## Review Gate Summary (mandatory)

Any agent run that produces meaningful work must end with a short summary covering:

- **What changed**
- **Risks or concerns**
- **Validation or verification approach**
- **Open questions or follow‑ups**

---

## Notes on agent discovery and usage

- Custom agents are defined under `.github/agents/`
- If you add, remove, or modify agent files, **restart GitHub Copilot CLI** to reload them
- You can enter agent mode with `/agent` and select a role explicitly at any time

---

## Final note

This operating model is intentionally **rigid**.

It trades raw speed for:
- traceability
- auditability
- security
- predictable outcomes

That rigidity