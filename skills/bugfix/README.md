# Bugfix

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`bugfix` is a coding-agent skill for fixing broken, incorrect, failing, flaky, or regressed behavior with evidence.

The core loop is **Reproduce → Root Cause → Regression Test → Minimal Fix → Verify**.

## Use this skill for

- Fixing failing tests
- Fixing crashes, stack traces, wrong status codes, ignored CLI flags, duplicate output, or wrong rendering
- Fixing regressions where behavior used to work and no longer does
- Investigating a reported failure when the user wants a fix

## Do not use it for

- Adding new behavior; use `feature-dev`
- Behavior-preserving cleanup; use `refactoring`
- Investigation-only work without a fix
- Documentation-only changes
- Test-only cleanup
- Dependency upgrades unless required to fix the bug

## Workflow

1. Capture the exact symptom.
2. Reproduce the failure or identify an existing failing test.
3. Define expected behavior versus actual behavior.
4. Localize the root cause before editing.
5. Add or update a regression test when feasible.
6. Confirm the regression test fails for the expected reason.
7. Apply the smallest safe fix.
8. Re-run the regression test and original failing scenario.
9. Run related verification and report uncertainty honestly.

## Install

```bash
skill-forge install bugfix --lang en --agent codex
skill-forge install bugfix --lang ko --agent codex
skill-forge install bugfix --lang zh --agent codex
```

## Project hint

Add this to a downstream `AGENTS.md` when useful:

> When the user asks to fix broken, failing, flaky, or regressed behavior, use `bugfix`. Reproduce the failure, identify the root cause, add or update a regression test when feasible, make the smallest fix, and verify the original failure is resolved.
