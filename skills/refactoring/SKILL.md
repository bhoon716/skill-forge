---
name: refactoring
description: Use when the user asks to refactor, clean up, simplify, extract, rename, remove duplication, improve readability, split files, improve separation of concerns, or make code easier to test while preserving externally observable behavior. This skill guides conservative, test-protected refactoring through Baseline → Transform → Same Tests by defining the behavior boundary, running baseline tests before editing, applying one small safe transformation at a time, re-running the same tests, and stopping if behavior preservation cannot be verified. Do not use for feature development, bug fixing, intentional behavior changes, speculative rewrites, architectural redesigns, dependency upgrades, or broad cleanup.
---

# refactoring

## Purpose

Improve code structure while preserving externally observable behavior.

Treat refactoring as unsafe until behavior preservation is demonstrated. Use Baseline → Transform → Same Tests as the central loop:

1. Define the behavior boundary that must remain unchanged.
2. Find existing tests that cover the target code or target behavior.
3. Run those tests before editing.
4. Record the baseline result.
5. Apply one small, safe transformation.
6. Re-run the same tests after the transformation.
7. Continue only if the same tests still pass.
8. Stop, revert, or narrow scope if behavior preservation cannot be verified.

## When to use this skill

Use this skill when the request is primarily about changing internal code structure while preserving behavior.

Matching requests include:

- "Refactor this module."
- "Clean up this component."
- "Simplify this function."
- "Extract this logic into a helper."
- "Remove duplication."
- "Improve readability."
- "Split this large file."
- "Rename these methods for clarity."
- "Improve separation of concerns."
- "Make this code easier to test without changing behavior."

## When not to use this skill

Do not use this skill when the request is primarily:

- Adding new behavior. Use `feature-dev`.
- Fixing broken behavior. Use a bugfix workflow.
- Investigating an issue only.
- Updating dependencies only.
- Changing architecture intentionally.
- Changing product behavior intentionally.
- Rewriting from scratch.

If a task mixes refactoring with feature development or bug fixing:

1. Do not mix concerns silently.
2. Use a bugfix workflow first if current behavior is broken.
3. Use `feature-dev` first if new behavior is required.
4. Use this skill only for the behavior-preserving cleanup portion.
5. Keep the refactoring diff separate from behavior-changing diffs whenever possible.

## Core rule: test-protected refactoring only

Do not:

- Add new product behavior.
- Fix unrelated bugs.
- Change API contracts unless explicitly requested.
- Change UI behavior unless explicitly requested.
- Change database schemas unless explicitly requested.
- Change permission, authorization, billing, privacy, security, or data-loss behavior.
- Rewrite architecture under the label of refactoring.
- Combine refactoring with feature development.
- Combine refactoring with broad dependency upgrades.
- Edit generated, vendor, lock, or build output files unless required by the repo's standard workflow.
- Delete tests because they fail.
- Modify tests only to make the refactor pass unless the test is clearly coupled to internal implementation details and the behavior remains covered.
- Claim behavior preservation without running tests or equivalent verification.

## Workflow: Baseline → Transform → Same Tests

### 1. Refactoring objective

Identify the precise reason for refactoring before editing.

Possible objectives:

- Reduce duplication.
- Improve readability.
- Extract function, class, component, module, or service.
- Improve naming.
- Simplify control flow.
- Isolate side effects.
- Reduce coupling.
- Improve cohesion.
- Separate responsibilities.
- Improve testability.
- Reduce complexity.
- Remove dead code only when it is proven unused.
- Normalize existing patterns.

State the objective in one or two sentences before editing. Vague objectives like "make it better" are not sufficient for broad changes.

### 2. Behavior boundary

Define what must remain unchanged.

Inspect and preserve:

- Public API shape.
- Function signatures.
- Return values.
- Error types and messages, unless internal-only.
- UI text and visible states.
- Routes, commands, flags, and configuration names.
- Database reads, writes, migrations, and transaction semantics.
- Authentication and authorization behavior.
- Billing, privacy, security, and data-loss behavior.
- Logging and metrics behavior when externally consumed or tested.
- Performance characteristics when relevant.
- Timing, concurrency, caching, and retry behavior.

If the behavior boundary cannot be identified, narrow the refactor or stop.

### 3. Context discovery

Before editing, inspect enough repository context to follow local conventions.

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

- Existing test directories and naming conventions.
- Existing tests that cover the target code.
- Similar code paths and similar tests.
- Current public interfaces, API contracts, UI states, data persistence, side effects, logs, metrics, permissions, and error behavior.
- Generated file conventions and formatting or linting commands.

Prefer existing conventions over inventing new patterns.

### 4. Test discovery

Find existing tests before editing.

Look for:

- Unit tests for the target functions or modules.
- Integration tests covering the affected flow.
- Component tests for UI behavior.
- API or contract tests.
- Snapshot tests.
- End-to-end tests.
- Golden file tests.
- Type-level tests.
- Build, typecheck, or lint checks that protect the change.
- CI workflow commands.

If no relevant tests exist:

1. Add characterization tests when feasible.
2. Use the smallest possible characterization test that captures current behavior.
3. Avoid inventing new expected behavior.
4. If characterization tests are not feasible, restrict changes to mechanical low-risk transformations.
5. Explicitly report that the refactor is weakly protected.

### 5. Baseline test run

Before editing production code, run the relevant existing tests.

Record:

- Command run.
- Result.
- Failure summary, if any.
- Whether the failure is related to the target code.
- Whether the baseline is safe enough to continue.

Rules:

- If baseline tests pass, proceed with the refactor.
- If baseline tests fail for reasons unrelated to the refactor, report them and narrow the scope.
- If baseline tests fail in the target area, do not proceed with broad refactoring. Use a bugfix workflow first or ask for direction.
- If tests cannot be run, explain why and use the closest available static verification, but do not overstate confidence.

### 6. Refactor plan

Split the refactor into small transformations.

Separate mechanical changes from logic-looking transformations whenever possible. A mechanical rename that touches many files should not be combined with logic changes.

### 7. Transform phase

Apply one meaningful transformation at a time.

Rules:

- Keep the diff small and reviewable.
- Do not combine unrelated transformations.
- Do not change tests merely to match new internals unless behavior remains covered.
- Do not introduce new behavior.
- Do not fix unrelated issues discovered during refactoring.
- Do not chase style preferences beyond the stated objective.
- Check the diff after each transformation for accidental behavior changes.

### 8. Same Tests phase

After each meaningful transformation, re-run the same tests used for the baseline.

Required behavior:

- Run the identical command when possible.
- Compare the result to baseline.
- If tests still pass, continue.
- If tests fail, identify whether the transformation caused it.
- If the transformation caused the failure, fix the transformation or revert it.
- If the failure is unrelated or flaky, record evidence and avoid expanding scope.
- Do not continue layering additional transformations on top of a failing state.

This phase is strict.

### 9. Broader verification

After planned transformations are complete, run the same baseline test first, then broader checks when feasible.

Relevant broader checks include:

- Related test suite.
- Typecheck.
- Lint.
- Build.
- Formatting check.
- API contract tests.
- UI, component, or end-to-end tests if UI behavior could be affected.
- Performance checks if performance-sensitive code was touched.

If tests are too slow, run the most targeted relevant tests first and clearly state what was not run.

### 10. Final review

Before reporting completion, inspect the final diff and ask:

- Did any public behavior change?
- Did any test expectation change?
- Did any public interface change?
- Did any error message or status code change?
- Did any permission or security behavior change?
- Did any persistence behavior change?
- Did any logging or metrics behavior change?
- Did any unrelated cleanup enter the diff?
- Is the diff smaller and clearer than a rewrite?
- Are the verification claims backed by commands actually run?

### 11. Final report

Do not claim behavior preservation unless tests or equivalent checks were actually performed.

Include:

- Refactoring objective.
- Behavior preservation boundary.
- Files changed.
- Baseline tests run before editing.
- Same tests run after transformation.
- Additional verification commands and outcomes.
- Any characterization tests added.
- Any tests that could not be run.
- Any known risks or follow-ups.
- Explicit note if the refactor was weakly protected due to missing tests.

## Safe transformations

Allowed safe transformations include:

- Rename local variables for clarity.
- Extract function.
- Extract component.
- Extract constant.
- Extract helper.
- Inline unnecessary indirection.
- Remove obvious duplication.
- Simplify conditionals without changing truth tables.
- Move code without changing logic.
- Separate pure logic from side effects.
- Replace ad-hoc code with an existing project abstraction.
- Improve module boundaries without changing public contracts.
- Delete dead code only when there is strong evidence it is unreachable or unused.

## Risky transformations

Avoid or require explicit extra caution for:

- Changing public APIs.
- Changing database schema or migrations.
- Changing authorization logic.
- Changing error semantics.
- Changing concurrency or async ordering.
- Changing caching behavior.
- Changing retry behavior.
- Changing time, timezone, locale, encoding, or rounding logic.
- Changing serialization or deserialization.
- Changing dependency versions.
- Replacing entire subsystems.
- Rewriting working code from scratch.
- Large file moves combined with logic changes.

## Acceptance criteria checklist

The refactor is acceptable only when:

- The refactoring objective is specific.
- The behavior boundary is explicit.
- Baseline verification was run before production edits, or the lack of baseline verification is clearly reported.
- Each meaningful transformation is small and reviewable.
- The same tests were run after transformation when possible.
- No new behavior was introduced.
- No unrelated bug fix was mixed in.
- No public contract changed unless explicitly requested.
- Final verification evidence is recorded.

## Test protection checklist

Before editing:

- Identify relevant existing tests.
- Add characterization tests if coverage is missing and feasible.
- Run baseline tests and record results.
- Stop or narrow scope if baseline failures affect the target area.

After each transformation:

- Re-run the same tests.
- Compare with baseline.
- Stop on failures caused by the refactor.
- Keep uncertainty visible.

## Verification command strategy

Use commands in this order:

1. The smallest targeted test that covers the target behavior.
2. The same targeted test after each transformation.
3. Related test suite.
4. Typecheck.
5. Lint.
6. Build.
7. Formatting check.
8. Contract, UI, end-to-end, or performance checks when relevant.

Treat typecheck or lint alone as insufficient proof of behavior preservation unless no executable behavior test exists and the change is purely mechanical.

## Decision rules

- If no relevant tests exist, add characterization tests before refactoring when feasible.
- If characterization tests cannot be added, restrict the refactor to mechanical low-risk changes and report weak protection.
- If baseline tests are red in the target area, stop and use a bugfix workflow first.
- If baseline tests are red outside the target area, proceed only with narrow scope and report the pre-existing failure.
- If a refactor requires changing public behavior, stop and reclassify the task as `feature-dev` or bugfix.
- If the refactor uncovers a bug, do not fix it silently. Report it or switch to a bugfix workflow.
- If a broad architectural redesign is required, stop and ask for explicit approval or create a separate design task.
- If a mechanical rename touches many files, avoid combining it with logic changes.
- If tests are too slow, run the most targeted relevant tests first and clearly state what was not run.
- If a generated file must change, use the project's standard generation command.
- If behavior preservation cannot be verified, stop expanding the refactor.

## Failure handling

A failing post-transform test is a stop signal.

When a post-transform test fails:

- Do not continue adding changes while tests are failing.
- First determine whether the failure is caused by the refactor.
- If caused by the refactor, revert or correct the transformation.
- If unrelated, record evidence and avoid expanding scope.
- If flaky, rerun once if reasonable, then report uncertainty.
- If the baseline was not clean, do not claim that the refactor is fully verified.

## Anti-patterns

Avoid:

- "While I'm here" cleanup.
- Refactoring and feature development in one diff.
- Refactoring and bug fixing in one diff.
- Rewriting a module instead of making safe transformations.
- Updating tests to match changed internals while losing behavior coverage.
- Deleting failing tests.
- Changing public API shape accidentally.
- Changing error messages or status codes accidentally.
- Changing auth, billing, privacy, or data-loss behavior accidentally.
- Moving files and changing logic in the same step.
- Large formatting-only diffs mixed with logic-looking changes.
- Claiming equivalence without running the baseline tests again.
- Treating typecheck or lint alone as behavior preservation.
- Broad cleanup when the requested refactor was local.

## Final response template

Summary:
- <refactoring objective and result>

Behavior preservation:
- Boundary preserved: <public behavior, API, UI, persistence, errors, permissions, etc.>
- Characterization added: <yes/no, details>

Files changed:
- `<path>`: <reason>

Verification:
- Baseline before editing: `<command>` → <result>
- Same tests after transform: `<command>` → <result>
- Additional checks: `<command>` → <result>

Notes:
- <pre-existing failures, skipped checks, weak test coverage, risks, or follow-ups>
