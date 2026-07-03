# Refactoring

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`refactoring` is a coding-agent skill for improving code structure while preserving externally observable behavior.

The core loop is **Baseline → Transform → Same Tests**.

## Use this skill for

- Simplifying code without behavior changes
- Extracting helpers, functions, modules, or components
- Removing duplication
- Improving names, readability, cohesion, or separation of concerns
- Making code easier to test without changing behavior

## Do not use it for

- Adding behavior; use `feature-dev`
- Fixing broken behavior; use `bugfix`
- Broad rewrites or architecture redesign
- Dependency upgrades
- Cleanup that cannot be protected by tests or equivalent verification

## Workflow

1. State the precise refactoring objective.
2. Define the behavior boundary that must not change.
3. Find tests that protect the target behavior.
4. Run baseline tests before editing.
5. Apply one small transformation.
6. Re-run the same tests.
7. Continue only while the same tests pass.
8. Stop, revert, or narrow scope if behavior preservation cannot be verified.

## Install

```bash
skill-forge install refactoring --lang en --agent codex
skill-forge install refactoring --lang ko --agent codex
skill-forge install refactoring --lang zh --agent codex
```

## Project hint

Add this to a downstream `AGENTS.md` when useful:

> When the user asks to refactor, clean up, simplify, extract, rename, or remove duplication without changing behavior, use `refactoring`. Run baseline tests first, make one small transformation, and re-run the same tests before continuing.
