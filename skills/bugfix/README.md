# Bugfix

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`bugfix` is a coding-agent skill for fixing broken, incorrect, failing, flaky, or regressed behavior with evidence.

The core loop is **Reproduce or Establish Evidence → Root Cause → Minimal Fix → Verify**. Verification is required; a new regression test is added when it provides durable protection at proportionate cost.

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
2. Reproduce the failure or establish a credible evidence trail.
3. Define expected behavior versus actual behavior.
4. Localize the root cause before editing.
5. Choose the most direct verification method; add a regression test when it is stable, valuable, and proportionate.
6. Apply the smallest safe fix.
7. Verify the original failure and relevant surrounding behavior.
8. Report evidence, limitations, and uncertainty honestly.

## Install

```bash
skill-forge install bugfix --lang en --agent codex
skill-forge install bugfix --lang ko --agent codex
skill-forge install bugfix --lang zh --agent codex
```

## Project hint

Add this to a downstream `AGENTS.md` when useful:

> When the user asks to fix broken, failing, flaky, or regressed behavior, use `bugfix`. Reproduce the failure or establish evidence, identify the root cause, make the smallest fix, and verify the original failure. Add a regression test when it provides durable protection at proportionate cost.
