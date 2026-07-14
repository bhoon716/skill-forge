# Deep Code Review

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`deep-code-review` orchestrates a read-only, multi-perspective review of a concrete PR, diff, commit, patch, branch, or changed-file set.

## Core pipeline

1. Resolve review scope.
2. Collect applicable repository instructions.
3. Classify the change.
4. Route mandatory and conditional review lenses.
5. Run isolated specialist reviewers.
6. Process dynamic escalation signals.
7. Independently verify every candidate finding.
8. Deduplicate by root cause and synthesize only confirmed issues.

Mandatory lenses for runtime changes are `correctness` and `contract-tests`. Security, reliability, architecture, and infrastructure lenses are selected by trigger rules.

## Install

```bash
skill-forge install deep-code-review --lang en --agent codex
skill-forge install deep-code-review --lang ko --agent codex
skill-forge install deep-code-review --lang zh --agent codex
```

The v0 review knowledge lives in `SKILL.md` and the nine files under `references/`. The skill is read-only and returns only confirmed findings with coverage and limitations.

Final reports are written after synthesis to `.agents/reviews/deep-code-review/<review-id>.md`; intermediate reviewer output is never persisted there.
