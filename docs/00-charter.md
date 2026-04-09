# Project Charter

## One-liner
Provide a reusable, language-agnostic process template for guardrail-driven, agentic workflows using GitHub Copilot.

## Context
- Why now: Teams adopting Copilot agents often lack a consistent operating model, leading to scope creep, rework, and loss of context.
- Who cares: Developers, architects, and technical leads experimenting with agentic workflows.
- Current pain: Ad-hoc prompting, undocumented decisions, and agents acting without structure.

## Goals (what success looks like)
- G1: Enforce a clear Charter → Requirements → Plan → Execute → Review pipeline.
- G2: Preserve project context across sessions using durable `/docs` artifacts.
- G3: Enable safe experimentation with agents without assuming tech stacks.

## Non-goals (explicitly out of scope)
- N1: Prescribing any specific programming language or framework.
- N2: Providing application or product starter code.
- N3: Automating CI/CD or deployment workflows (process only).

## Users / Stakeholders
- Primary user: Individual developer or architect using Copilot CLI.
- Secondary user: Teams standardizing agentic workflows.
- Sponsor / approver: Repo owner.

## Constraints & Guardrails
- Language/framework agnostic.
- Human-in-the-loop for architectural and security decisions.
- Documentation-first discipline.

## Assumptions
- A1: Users are familiar with GitHub Copilot CLI or VS Code Copilot.
- A2: Users want repeatable process more than speed.

## Risks (top 3)
- R1: Template becomes too heavyweight.
- R2: Users bypass the process under time pressure.
- R3: Agents are added too early without clear guardrails.

## Definition of Done (minimum)
- DoD1: Charter, requirements, and plan templates exist.
- DoD2: Repo-wide instructions and AGENTS.md enforce the model.
- DoD3: Phase 1 audit passes with no blocking gaps.

## Next step
Create a minimal `docs/plan.md` representing the bootstrap of this template.
``