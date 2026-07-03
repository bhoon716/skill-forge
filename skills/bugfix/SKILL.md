---
name: bugfix
description: Use when the user asks to fix broken, incorrect, failing, flaky, or regressed behavior, such as failing tests, wrong status codes, crashes, ignored CLI flags, duplicate output, wrong UI rendering, infinite retries, stack traces, or behavior that used to work and no longer does. This skill guides regression-test-driven bug fixing through Reproduce → Root Cause → Regression Test → Minimal Fix → Verify by capturing the symptom, reproducing or representing the failure, defining expected behavior, localizing the root cause, adding or updating a failing regression test when feasible, applying the smallest safe fix, and verifying honestly. Do not use for new feature development, behavior-preserving refactoring, speculative cleanup, architecture redesign, dependency upgrades, documentation-only work, test-only cleanup, or general investigation without a fix.
---

# bugfix

## Purpose

Fix broken, incorrect, failing, flaky, or regressed behavior with evidence.

Treat a bug fix as unproven until the original failure or a representative regression test is verified as fixed. Use Reproduce → Root Cause → Regression Test → Minimal Fix → Verify as the central loop:

1. Capture the reported symptom.
2. Reproduce the failure or identify an existing failing test.
3. Confirm expected behavior versus actual behavior.
4. Localize the root cause.
5. Add or update a regression test that fails because of the bug.
6. Confirm the regression test fails for the expected reason.
7. Apply the smallest safe fix that addresses the root cause.
8. Re-run the regression test and confirm it passes.
9. Run related verification.
10. Report reproduction, root cause, fix, and validation honestly.

## When to use this skill

Use this skill when the request is primarily about fixing broken behavior.

Matching requests include:

- "Fix this failing test."
- "This endpoint returns the wrong status code."
- "The login button does nothing."
- "The app crashes when the input is empty."
- "The export contains duplicate rows."
- "This job retries forever."
- "The component renders the wrong value."
- "The CLI flag is ignored."
- "Fix this regression."
- "Investigate and fix this stack trace."
- "This used to work but now it does not."

## When not to use this skill

Do not use this skill when the request is primarily:

- Adding new behavior. Use `feature-dev`.
- Preserving behavior while improving structure. Use `refactoring`.
- Investigation only without a requested fix.
- Documentation only.
- Test cleanup only.
- Dependency upgrade only, unless the upgrade is necessary to fix the bug.
- Intentional product behavior change.

If a task mixes bug fixing with refactoring or feature development:

1. Fix the bug first with the smallest change.
2. Avoid opportunistic cleanup.
3. Do not add new behavior unless it is required to restore intended behavior.
4. Use `refactoring` separately after the bug is fixed and verified.
5. Use `feature-dev` separately if the user actually wants new behavior.

## Core rule: regression-test-driven bug fixing only

Do not:

- Add unrelated new behavior.
- Perform broad unrelated refactoring.
- Rewrite architecture unless the root cause requires it and the user explicitly approves.
- Fix unrelated bugs discovered during investigation.
- Mask symptoms without addressing the root cause.
- Delete or weaken failing tests to make the build pass.
- Change public behavior beyond the bug fix.
- Change API contracts unless required to restore intended behavior.
- Change UI behavior unrelated to the reported bug.
- Change database schemas unless required by the fix and consistent with project conventions.
- Modify permission, authorization, billing, privacy, security, or data-loss behavior without explicit evidence and careful verification.
- Modify generated, vendor, lock, or build output files unless necessary through the project's standard workflow.
- Claim the bug is fixed without reproducing it or verifying an equivalent regression case.
- Claim tests passed unless they were actually run.

## Workflow: Reproduce → Root Cause → Regression Test → Minimal Fix → Verify

### 1. Symptom capture

Record the exact symptom before editing.

Capture:

- User-reported issue.
- Expected behavior.
- Actual behavior.
- Error message.
- Stack trace.
- Failing command or failing test.
- Logs or trace IDs.
- Screenshot or UI state, if relevant.
- Request payload and response, if API-related.
- Input data and output data.
- Environment assumptions.
- Whether the issue is deterministic, intermittent, or environment-specific.
- Whether the issue is a regression from previously working behavior.

Do not start editing before understanding what failure is being fixed.

### 2. Context discovery

Inspect enough context to reproduce and fix the bug using project conventions.

Check project instructions when present:

- `AGENTS.md`
- `CLAUDE.md`
- `.cursor/rules`
- `README.md`
- `CONTRIBUTING.md`

Check package and build files when present:

- `package.json`
- `pyproject.toml`
- `Cargo.toml`
- `go.mod`
- `pom.xml`
- `build.gradle`
- `Makefile`
- `justfile`
- `Taskfile.yml`

Check test and CI configuration when present:

- `jest.config.*`
- `vitest.config.*`
- `pytest.ini`
- `tox.ini`
- `playwright.config.*`
- `cypress.config.*`
- `rspec`
- `phpunit.xml`
- `.github/workflows`

Inspect:

- Existing failing tests.
- Related source files and test files.
- Recent changes if available through git history.
- Error logs, stack traces, screenshots, traces, request payloads, config, environment variables, feature flags, seed data, timezone, locale, browser or runtime versions, and external service dependencies.
- Similar working code paths and similar bug fixes.
- Application layers likely affected: UI, API, service, domain, persistence, async jobs, queues, cache, config, auth, permissions, logging, metrics, and docs.

Prefer existing conventions over inventing new patterns.

### 3. Reproduction

Try to reproduce the bug.

Use, in order of preference:

1. Existing failing test.
2. User-provided failing command.
3. Minimal automated test.
4. Minimal script or fixture.
5. Manual reproduction steps.
6. Log or trace-based reproduction when live reproduction is impossible.

Record:

- Reproduction command or steps.
- Result.
- Whether the failure reproduced.
- If not reproduced, what evidence still supports the suspected bug.

If reproduction is impossible, proceed only with a clearly stated evidence trail and report uncertainty.

### 4. Expected behavior definition

Define intended behavior using the strongest available evidence:

- User request.
- Existing tests.
- Documentation.
- Similar working features.
- API contracts.
- Product copy.
- Type definitions.
- Historical behavior if available.
- Domain invariants.
- Error-handling conventions.

If expected behavior is ambiguous and affects product policy, security, billing, privacy, data loss, permissions, or user-visible semantics, stop and ask for clarification.

### 5. Root cause localization

Identify the root cause or the narrowest credible cause before editing.

Do the following:

- Trace from symptom to application code.
- Follow data flow and control flow.
- Inspect stack frames closest to project code.
- Compare broken path with similar working path.
- Check boundary conditions such as null, undefined, empty, zero, timezone, locale, encoding, rounding, pagination, sorting, concurrency, race conditions, cache, retries, permissions, and feature flags.
- Check whether recent changes introduced the regression when git history is available.
- Distinguish root cause from downstream symptoms.
- State the cause in one concise sentence before fixing.

Do not patch randomly. Do not edit multiple unrelated areas hoping one change fixes the bug.

### 6. Regression test

Add or update a regression test before changing production code when feasible.

The regression test should:

- Fail before the fix.
- Fail because of the reported bug, not because of bad setup.
- Represent the smallest meaningful failing case.
- Protect the intended behavior.
- Avoid overfitting to implementation details.
- Live near similar tests.
- Use existing test helpers, fixtures, mocks, and naming conventions.
- Cover the reported input, boundary, or state that caused the failure.
- Include related edge cases only when they come directly from the root cause.

Run the regression test and confirm the red state before implementing the fix whenever feasible.

If adding a regression test is not feasible, explain why and use the closest available verification method.

### 7. Fix strategy

Choose the smallest safe fix that addresses the root cause.

Guidance:

- Fix the cause, not only the symptom.
- Preserve unrelated behavior.
- Prefer local changes over broad rewrites.
- Prefer existing abstractions and conventions.
- Avoid opportunistic refactoring.
- Avoid speculative generalization.
- Avoid changing public contracts unless required to restore intended behavior.
- Avoid weakening validation, auth, permission, or error handling merely to pass the test.
- If the correct fix requires a larger design change, stop and report why.

### 8. Minimal fix implementation

Implement only the necessary production change.

Rules:

- Keep the diff narrow and reviewable.
- Avoid touching unrelated files.
- Avoid formatting-only churn.
- Keep test changes focused on regression coverage.
- Update docs only if the bug fix changes documented behavior or corrects incorrect documentation.
- Use project-standard generation commands if generated files must change.

### 9. Verification

After implementing the fix, verify:

- The regression test now passes.
- The original failing command, test, or scenario now passes.
- Related tests still pass.
- Typecheck, lint, build, or formatting checks pass when relevant and feasible.
- UI or API behavior is checked through the appropriate project mechanism when relevant.
- Similar paths are not broken when the root cause suggests a class of failures.

Run the narrowest useful test first, then broaden.

Do not claim success without actual verification.

### 10. Final review

Before reporting completion, inspect the final diff and ask:

- Did the fix directly address the root cause?
- Did any unrelated behavior change?
- Did any public API shape change?
- Did any error message or status code change unintentionally?
- Did any permission, security, privacy, billing, or data-loss behavior change?
- Did any unrelated refactor or cleanup enter the diff?
- Does the regression test fail before the fix and pass after the fix, when feasible?
- Are all validation claims backed by commands actually run?

### 11. Final report

Include:

- Symptom.
- Reproduction method.
- Expected behavior.
- Actual behavior.
- Root cause.
- Fix summary.
- Regression test added or updated.
- Verification commands and outcomes.
- Any tests that could not be run.
- Remaining risks or follow-ups.
- Explicit uncertainty if reproduction or regression testing was incomplete.

## Regression test checklist

Before production edits:

- Identify or create a failing case.
- Confirm the failure represents the reported bug.
- Keep the test minimal and meaningful.
- Use existing helpers and conventions.
- Avoid changing expected behavior without evidence.
- Record the red command and failure reason.

After the fix:

- Re-run the regression test.
- Confirm it passes.
- Re-run the original failing command or scenario when available.
- Broaden verification only after the focused check is green.

## Root cause checklist

Before fixing, confirm:

- The failing behavior has been traced to the narrowest credible source.
- Expected behavior has evidence.
- Similar working paths have been compared when available.
- Boundary conditions have been considered.
- Recent regressions have been checked when git history is useful.
- The planned fix addresses the cause, not only the visible symptom.

## Verification command strategy

Use commands in this order:

1. Existing failing test or user-provided failing command.
2. New or updated regression test in red state.
3. Same regression test after the fix.
4. Original failing scenario after the fix.
5. Related test suite.
6. Typecheck.
7. Lint.
8. Build.
9. Formatting check.
10. UI, API, integration, or end-to-end checks when relevant.

Treat lint or typecheck alone as insufficient proof that the bug is fixed.

## Decision rules

- If the bug cannot be reproduced, proceed only with a clear evidence trail and report uncertainty.
- If expected behavior is ambiguous, infer from existing patterns only when safe. Otherwise ask for clarification.
- If the issue touches security, privacy, billing, permissions, data loss, or destructive actions, require stronger evidence and verification.
- If the failing test appears invalid, do not delete it. Explain why it is invalid and update it only if behavior remains covered.
- If the root cause requires broad refactoring, separate the minimal fix from the later refactor.
- If the root cause requires new product behavior, reclassify or coordinate with `feature-dev`.
- If the issue is caused by external services, config, environment, or data, fix local handling only when appropriate and report the external dependency.
- If unrelated tests fail, distinguish pre-existing failures from failures caused by the fix.
- If the fix changes public behavior, state why that behavior was wrong and why the new behavior is intended.
- If generated files must change, update them through standard project commands.
- If the bug is flaky, make the test deterministic where possible and avoid timing-based sleeps unless existing project patterns require them.

## Failure handling

- If the regression test does not fail before the fix, the test may not cover the bug.
- If the regression test still fails after the fix, do not claim success.
- If the fix causes unrelated tests to fail, investigate whether the failure is truly unrelated.
- If verification cannot be completed, report exactly what was and was not verified.
- If the investigation reveals a larger design flaw, stop after the minimal safe fix or report that a larger change is required.
- If multiple root causes are discovered, fix the reported one first and report the others separately.
- If the bug is not in the codebase but in configuration, data, or external systems, document the evidence and avoid unnecessary code changes.

## Anti-patterns

Avoid:

- Editing production code before reproducing the failure.
- Applying random patches without a root cause.
- Masking errors by catching and ignoring exceptions.
- Broad refactoring during a bug fix.
- Fixing unrelated bugs in the same diff.
- Weakening tests to make them pass.
- Deleting failing tests.
- Changing expected behavior without evidence.
- Changing auth, permission, privacy, billing, or data-loss behavior casually.
- Treating a lint or typecheck pass as proof that the bug is fixed.
- Claiming the original issue is fixed without re-running the original failing scenario.
- Adding sleeps to fix race conditions without understanding the race.
- Overfitting the fix to one exact input when the root cause is broader.
- Rewriting a module instead of making a minimal targeted fix.
- Leaving the code in a state where the regression test is not automated or not documented.

## Final response template

Summary:
- <bug fixed and user-visible impact>

Symptom:
- Expected: <expected behavior>
- Actual: <actual behavior>

Root cause:
- <concise explanation>

Fix:
- <minimal change made>

Files changed:
- `<path>`: <reason>

Regression coverage:
- Added/updated: <test files or cases>
- Red phase: `<command>` → <failed as expected because...>
- Green phase: `<command>` → <passed>

Verification:
- Original failure: `<command or scenario>` → <result>
- Related checks: `<command>` → <result>

Notes:
- <unreproduced aspects, skipped checks, pre-existing failures, risks, or follow-ups>
