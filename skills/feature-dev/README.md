# Feature Dev

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`feature-dev` is a coding-agent skill for adding new product or code behavior with strict test-driven development.

The core loop is **Red → Green → Refactor**.

## Use this skill for

- Adding a new API, command, option, workflow, or UI behavior
- Exposing a new response field
- Implementing export, login, retry, settings, or mode support
- Building new product behavior in an existing repository

## Do not use it for

- Bug fixing; use `bugfix`
- Behavior-preserving cleanup; use `refactoring`
- Investigation-only work
- Documentation-only changes
- Test-only cleanup
- Dependency upgrades unless required by the feature

## Workflow

1. Convert the request into testable acceptance criteria.
2. Find existing conventions, tests, and helper utilities.
3. Write or update tests first.
4. Run the targeted test and confirm the expected red failure.
5. Implement the smallest production change.
6. Re-run the same test and confirm green.
7. Refactor only after green.
8. Run broader verification and report what was actually validated.

## Install

```bash
skill-forge install feature-dev --lang en --agent codex
skill-forge install feature-dev --lang ko --agent codex
skill-forge install feature-dev --lang zh --agent codex
```

## Project hint

Add this to a downstream `AGENTS.md` when useful:

> When the user asks to add, implement, create, support, expose, integrate, or build new behavior, use `feature-dev` and follow Red → Green → Refactor. Do not implement production code before a failing behavior test when a test harness exists.
