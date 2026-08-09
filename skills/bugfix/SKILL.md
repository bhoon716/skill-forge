---
name: bugfix
description: Use when the user asks to diagnose and fix broken, incorrect, failing, flaky, or regressed behavior, such as failing tests, wrong status codes, crashes, ignored CLI flags, duplicate output, incorrect UI rendering, infinite retries, stack traces, or behavior that used to work. Follow an evidence-driven Reproduce or Establish Evidence → Root Cause → Minimal Fix → Verify workflow, adding a regression test when it provides durable protection at proportionate cost. Do not use for new feature development, behavior-preserving refactoring, speculative cleanup, architecture redesign, dependency upgrades, documentation-only work, test-only cleanup, or investigation without a requested fix.
---

# bugfix

## Purpose

Fix broken behavior with evidence while keeping the change narrow and reviewable.

Use this core loop:

1. Reproduce the failure or establish a credible evidence trail.
2. Define expected behavior and identify the narrowest credible root cause.
3. Decide which verification will most directly prove the fix.
4. Apply the smallest safe change that addresses the cause.
5. Verify the original behavior and relevant surrounding behavior.
6. Report what was and was not proven.

A new regression test is one valuable verification method, not a universal completion gate. Verification is always required; the form of verification depends on the bug, risk, and repository.

## Non-negotiable rules

- Understand the reported failure before editing.
- Fix the root cause rather than suppressing the symptom.
- Preserve unrelated behavior and keep the diff focused.
- Follow repository instructions and existing conventions.
- Do not delete or weaken valid tests merely to make checks pass.
- Do not claim a command, test, or scenario passed unless it was actually run.
- Do not claim the bug is fixed without direct verification or clearly qualified evidence.
- Treat security, authorization, privacy, billing, data-loss, destructive-action, concurrency, and public-contract changes as high risk and require stronger evidence.
- Avoid unrelated features, cleanup, refactoring, and dependency changes.

## Workflow

### 1. Capture the failure

Collect only the context needed to define the problem:

- reported symptom;
- expected and actual behavior;
- error, stack trace, logs, screenshot, request/response, or failing command;
- relevant input, state, environment, version, configuration, or external dependency;
- whether the failure is deterministic, intermittent, environment-specific, or a known regression.

Inspect applicable project guidance such as `AGENTS.md`, `CLAUDE.md`, `.cursor/rules`, `README.md`, and `CONTRIBUTING.md`, plus the relevant source, tests, build configuration, and recent history when useful.

Do not inventory the whole repository when a narrow inspection is sufficient.

### 2. Reproduce or establish evidence

Prefer the cheapest direct signal available:

1. Existing failing test or user-provided failing command.
2. Minimal automated or scripted reproduction.
3. Manual UI, API, or CLI reproduction.
4. Logs, traces, screenshots, or a reliable static evidence trail when live reproduction is unavailable.

Record the command or steps and the observed result. If the bug cannot be reproduced, continue only when the remaining evidence supports a specific fix; state the uncertainty.

### 3. Define expected behavior

Use the strongest available source:

- explicit user intent;
- existing tests or documented contract;
- similar working behavior;
- type or API definitions;
- historical behavior;
- domain and error-handling invariants.

If expected behavior is materially ambiguous, ask before changing product semantics. Always ask when ambiguity affects security, permissions, privacy, billing, or data loss.

### 4. Localize the root cause

Trace the symptom to the narrowest credible cause before patching. Compare broken and working paths, follow control and data flow, and inspect relevant boundaries such as empty values, encoding, timezones, pagination, caching, retries, races, permissions, and feature flags.

State the cause in one concise sentence. Do not patch multiple unrelated areas hoping one change works.

### 5. Choose regression coverage and verification

Add or update a regression test when it provides durable protection at reasonable cost. It is usually justified when:

- the bug can be expressed deterministically with the existing test infrastructure;
- expected behavior is stable and meaningful;
- the failure could plausibly recur;
- the impact or risk makes future detection valuable; and
- the test does not overfit implementation details.

A regression test is strongly expected for high-risk logic involving security, authorization, billing, data integrity, destructive behavior, concurrency, or public contracts unless a compelling technical reason prevents it.

Do not add a new test solely to satisfy process when:

- an existing failing test already covers the behavior;
- the cause is external configuration, environment, service state, or data and local code is not changing;
- a manual, visual, log-based, or end-to-end signal is more direct;
- meaningful automation would require disproportionate infrastructure or broad refactoring; or
- the only possible test would be brittle or tied to implementation details.

When adding or changing a regression test, demonstrate that it fails before the fix when practical and inexpensive. Confirm the failure is caused by the bug rather than bad setup. Red-before-green is preferred evidence in this case, not a universal completion condition.

If no new automated test is added, use the closest direct verification and mention the limitation only when it materially affects confidence or future coverage.

### 6. Apply the minimal fix

- Change only what is needed to address the root cause.
- Prefer local changes and existing abstractions over rewrites.
- Avoid formatting churn and opportunistic cleanup.
- Do not change public contracts unless restoring intended behavior requires it.
- Do not weaken validation, authorization, permissions, or error handling to make a check pass.
- Update generated files only through the project-standard workflow.
- If the correct solution requires a broad redesign or new product behavior, stop and explain the scope change.

### 7. Verify

Run the narrowest direct check first, then broaden according to risk:

1. Original failing test, command, or reproduction scenario.
2. New or updated regression test, when one was justified.
3. Closely related tests or scenarios.
4. Relevant typecheck, build, lint, formatting, integration, or end-to-end checks.

Use screenshots, browser interaction, logs, traces, or output comparison when they are the best evidence. Lint or typecheck alone does not prove a behavioral bug is fixed when a more direct check is available.

Do not run an expensive full suite by default when a focused check provides adequate confidence. Expand verification when the change has broad reach or high risk.

If verification cannot be completed, report exactly what remains unverified and do not present the result as fully proven.

### 8. Review the diff

Before reporting, confirm:

- the fix addresses the identified cause;
- unrelated behavior and public API shape remain unchanged unless explicitly required;
- no unrelated refactor, cleanup, or generated-file churn entered the diff;
- test changes, if any, protect behavior rather than implementation details;
- every verification claim is backed by an observed result.

## Decision rules

- If an existing test is failing, fix the production behavior unless evidence shows the test or expected behavior is wrong. Do not silently weaken the test.
- If a proposed regression test passes before the fix, reconsider whether it represents the bug.
- If unrelated checks fail, distinguish pre-existing failures from failures introduced by the fix.
- If the cause lies outside the codebase, avoid unnecessary code changes; improve local handling only when that is part of the intended behavior.
- For flaky bugs, seek deterministic evidence and avoid sleeps unless the repository already uses a justified timing strategy.
- If multiple bugs are discovered, fix the requested one and report the others separately.
- Separate any desirable follow-up refactor or feature work from the minimal fix.

## Final report

Lead with the outcome. Include only the sections needed to substantiate it:

- root cause;
- minimal fix;
- verification performed and observed result;
- tests added or updated, if any;
- material unverified areas, pre-existing failures, or remaining risks.

Do not force empty `Regression coverage`, `Red phase`, or `Green phase` sections when no new regression test was warranted.
