# Agentic Workflow Starter (Process + Guardrails)

This repository is a reusable **starter template** for running structured, guardrail‑driven projects using **GitHub Copilot (CLI and VS Code)**.

It provides a consistent **operating model, documentation flow, security guardrails, and role‑based agents** — without assuming any language, framework, or tech stack.

---

## What this repo gives you

- A consistent operating model:  
  **Charter → Requirements → Plan → Execute → Review Gates → Ship**
- Strong guardrails that reduce thrash:
  - scope control
  - documentation discipline
  - decision logging
  - security & privacy hard stops
- A standard set of artifacts under `/docs` that preserve context across sessions
- A curated set of **specialized Copilot agents** (planner, architect, developer, security reviewer, etc.)

---

## Non‑goals

- This repo does **not** assume a programming language, framework, build system, or test runner.
- This repo does **not** provide a product or application template.
- This repo is **about process and workflow**, not code scaffolding.

---

## How this workflow works (high level)

1. Create or update `docs/00-charter.md`
2. Create or update `docs/01-requirements.md` (with acceptance criteria)
3. Produce `docs/plan.md` (tasks mapped to concrete artifacts/files)
4. Execute work (optionally in parallel, using agents)
5. Run Review Gates:
   - summarize changes
   - risks
   - validation steps
6. Keep `docs/04-decision-log.md` current for meaningful choices

The workflow is intentionally explicit to make long‑running or complex work resilient to context loss.

This workflow is intentionally explicit to mitigate context loss in long‑running or complex projects.

---

## How to use this repository (recommended path)

This repository is intended to be **cloned** and used as the starting point for a project.

### 1. Clone the repo
```bash
git clone https://github.com/brown-tech-info/agentic-workflow.git
cd agentic-workflow

### an example prompt 

I’ve cloned this repository to start a brand‑new project.
Treat this as a real downstream project (not the template).

Guide me through Phase 1 by helping me create a project‑specific Charter.
Ask me questions if needed, and update only docs/00-charter.md.
Do not proceed to requirements yet.
