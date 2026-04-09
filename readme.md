# Agentic Workflow Starter (Process + Guardrails)

This repository is a reusable starter template for running structured, guardrail-driven projects with GitHub Copilot (CLI and VS Code).

## What this repo gives you
- A consistent operating model: Charter → Requirements → Plan → Execute → Review Gates → Ship
- Guardrails that reduce thrash (scope control, documentation discipline, decision logging)
- A standard set of artifacts under /docs that preserve context across sessions

## Non-goals
- This repo does NOT assume a language, framework, build system, or test runner.
- This repo does NOT provide a product template (it provides a workflow template).

## Operating Model (high level)
1. Create/Update `docs/00-charter.md`
2. Create/Update `docs/01-requirements.md` (with acceptance criteria)
3. Produce `docs/plan.md` (tasks mapped to concrete artifacts/files)
4. Execute work (optionally in parallel)
5. Run Review Gates: summarize changes, risks, validation steps, and update docs
6. Keep `docs/04-decision-log.md` current for key choices


## Phase 3: Orchestrator Agent
This repo provides a planning-only custom agent: `orchestrator`.
Use it to create or validate Charter/Requirements/Plan artifacts before any implementation.


## Definition of Done (for the workflow)
A project is considered “workflow-complete” when:
- Charter exists and is current
- Requirements include acceptance criteria
- A plan exists and maps work to artifacts
- Changes have an explicit validation approach
- Decision log updated (for meaningful changes)