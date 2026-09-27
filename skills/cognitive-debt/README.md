# Cognitive Debt

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`cognitive-debt` audits a codebase or subsystem for evidence-backed risks that make its behavior and design intent harder to understand and change. Code patterns are proxies for comprehension risk; the skill does not claim to measure what a team understands.

## Use this skill for

- Finding duplicated rules or competing sources of truth
- Tracing hidden coupling, unclear flows, or unnecessary indirection
- Prioritizing proven dead code, stale scaffolding, or unnecessary dependency growth
- Identifying important intent that cannot be established from code, tests, history, or project documents

## Use another skill for

- A known, behavior-preserving local cleanup: `refactoring`
- Broken behavior: `bugfix`
- New behavior: `feature-dev`
- Intentional architecture or contract changes: `architecture`

## Workflow

1. Bound the audit to the requested repository, subsystem, or flow.
2. Trace representative behavior through its owners, state, side effects, and tests.
3. Validate candidate signals against domain rules, compatibility, runtime behavior, and repository history.
4. Rank findings by evidence, comprehension impact, recurrence, confidence, and remediation risk.
5. Change code only when the user asks for reduction; preserve behavior and verify each bounded change.

## Install

```bash
skill-forge install cognitive-debt --lang en --agent codex
skill-forge install cognitive-debt --lang ko --agent codex
skill-forge install cognitive-debt --lang zh --agent codex
```

## Project hint

Add this to a downstream `AGENTS.md` when useful:

> For a codebase-wide audit of comprehension risks, use `cognitive-debt`. Trace actual behavior and report evidence, impact, confidence, and the smallest useful next step. Treat code smells as signals, not proof, and make changes only when requested.
