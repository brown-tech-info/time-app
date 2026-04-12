# Using Agents in this Repository

This repo provides specialized custom agents under `.github/agents/`.

## Recommended flow
1) Orchestrator: ensure Charter/Requirements/Plan are in place.
2) Requirements Analyst: tighten requirements + acceptance criteria.
3) Solution Architect: produce HLD/LLD and key tradeoffs.
4) Developer: implement the plan with minimal diffs.
5) Test Engineer: add tests and validation steps.
6) Security Reviewer: review changes and provide a Ship/No-Ship call.
7) Docs Editor: polish docs for public clarity.
8) Release Manager: generate PR/release notes.

## Role boundaries (important)
- security-reviewer is findings-only (no file edits).
- solution-architect and requirements-analyst are docs-only.
- developer is implementation-only and must follow plan + guardrails.
