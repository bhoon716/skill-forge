---
name: feature-dev
description: Use when the user asks to add, implement, create, support, enable, expose, integrate, or build a new capability, API, UI behavior, command, option, workflow, or product behavior in a codebase using strict test-driven development. This skill guides feature development through Red → Green → Refactor by framing the requested behavior, writing or updating tests before production code, confirming meaningful failure, implementing the smallest passing change, refactoring only after green, and reporting real validation. Do not use for bug fixing, behavior-preserving refactoring, investigation-only tasks, documentation-only changes, test-only cleanup, or dependency upgrades unless the upgrade is directly required for the feature.
---

# Feature Dev

## Purpose

Implement new product or code behavior with strict test-driven development.

Use Red → Green → Refactor as the central loop:

1. Convert the requested feature into testable behavior.
2. Write or update tests before implementing production code.
3. Run the tests and confirm they fail for the expected reason.
4. Implement the smallest production change required to pass.
5. Run the tests again and confirm they pass.
6. Refactor only after the tests are green.
7. Run related verification commands.
8. Report what changed and how it was validated.

## Skill routing

Use this skill when the request is primarily about adding new behavior.

Matching requests include:

- "Add support for GitHub login."
- "Implement CSV export."
- "Create a settings page."
- "Add a command-line flag."
- "Expose this field in the API response."
- "Support dark mode for this component."
- "Build a retry mechanism for failed jobs."

Do not use this skill when the request is primarily:

- Bug fixing. Use a bugfix workflow instead.
- Behavior-preserving code cleanup. Use a refactoring workflow instead.
- Investigation only.
- Documentation only.
- Test-only cleanup.
- Dependency upgrade only, unless the upgrade is necessary for the feature.

If a task mixes feature development with bug fixing or refactoring:

1. Keep the feature implementation focused.
2. Avoid unrelated cleanup.
3. Use a bugfix workflow first if existing broken behavior blocks the feature.
4. Use a separate refactoring workflow after the feature works if structural cleanup is still needed.

## Non-goals

Do not:

- Perform broad unrelated refactoring.
- Fix unrelated bugs.
- Rewrite architecture unless required by the feature.
- Add product behavior that was not requested.
- Skip tests when a test harness exists.
- Treat unexecuted tests as proof of correctness.
- Claim validation that was not performed.
- Change public behavior unrelated to the requested feature.
- Modify generated, vendor, lock, or build output files unless necessary.

## Context discovery

Before changing code, inspect the repository enough to follow its conventions.

Check for project instructions when present:

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
- Similar features and their tests.
- Test helpers, factories, fixtures, mocks, stubs, snapshots, and integration utilities.
- Application layers likely affected: UI, API, service, domain, persistence, config, auth, permissions, logging, metrics, and docs.
- Existing commands for targeted tests, broader suites, typecheck, lint, build, and formatting.

Prefer existing project conventions over inventing new patterns.

## Workflow

### 1. Feature framing

Translate the user request into concrete behavior before writing tests.

Identify:

- New behavior.
- Actor or user.
- Inputs.
- Outputs.
- State changes.
- Error cases.
- Edge cases.
- Permission or authorization implications.
- Data persistence implications.
- API contract implications.
- UI states, if relevant.
- Backward compatibility concerns.
- Observability needs such as logs or metrics, if relevant.

Write concise acceptance criteria. Each criterion should be testable.

If a product decision is missing, infer from existing patterns only when the inference is low-risk. Ask for clarification when the decision would materially change public behavior, security, privacy, data loss, billing, or permissions.

### 2. Test discovery

Find the tests that should describe the new behavior.

Look for:

- Existing tests near the target code.
- Similar feature tests.
- Test helpers, factories, fixtures, mocks, stubs, snapshot patterns, and integration utilities.
- Existing commands for targeted test runs.
- The layer the project normally tests for this behavior: unit, integration, component, end-to-end, contract, or snapshot.

Prefer the test style already used for the affected layer.

### 3. Test design

Design tests before writing production code.

Cover the behavior that matters to users or external callers. Include, as appropriate:

- Happy path.
- Important edge cases.
- Validation errors.
- Permission or authorization failures.
- Empty states.
- Loading states.
- Failure states.
- API request and response shape.
- Persistence side effects.
- Event emission.
- Logs or metrics, only if the project already tests those.
- Backward compatibility.

Prefer behavior-oriented tests over implementation-detail tests. A good test should fail when the requested behavior is absent and continue passing through reasonable internal refactors.

### 4. Red phase

Write or update tests first.

Then run the narrowest useful test command and confirm:

- The test fails.
- The failure is for the expected reason.
- The failure proves the requested behavior is missing or incomplete.

If the test passes before implementation, revise the test or reassess whether the feature already exists. Do not duplicate an existing feature.

If the test fails for an unrelated reason, fix the test setup if the fix is local and clearly required. Otherwise, report the blocker and separate it from the feature work.

Record:

- Command used.
- Failure summary.
- Why the failure is meaningful.

### 5. Green phase

Implement the smallest production change required to pass the failing test.

Follow these rules:

- Follow existing project conventions.
- Reuse existing abstractions where appropriate.
- Keep changes focused on the requested behavior.
- Avoid broad refactoring.
- Avoid changing unrelated public behavior.
- Add configuration, migration, documentation, or examples only when directly required by the feature.
- Modify generated files only through the project's standard generation command.
- Update lock files only when dependency changes are necessary for the feature.

Run the targeted test again. Confirm it passes.

### 6. Refactor phase

Refactor only after the targeted tests are green.

Allowed refactoring:

- Remove duplication introduced by the implementation.
- Improve names or extraction when it directly improves clarity.
- Align the new code with established local patterns.

Keep refactoring small and directly related to the feature. If cleanup becomes broad, stop and recommend a separate refactoring task.

Run the same targeted tests again after refactoring.

### 7. Broader verification

After targeted tests pass, broaden verification when feasible.

Run the narrowest useful command first, then broaden to relevant checks:

- Related test suite.
- Typecheck.
- Lint.
- Build.
- Formatting check.
- API contract tests.
- UI, component, or end-to-end tests when relevant.
- Manual verification commands when no automated coverage exists.

If tests are too expensive to run, run the most targeted feasible command and state what was not run.

If unrelated tests fail, distinguish pre-existing failures from failures caused by the feature change.

## Decision rules

- If no test harness exists, create the smallest practical test harness only if it is consistent with the repository. Otherwise perform the closest available verification and report the limitation.
- If the feature already exists, do not duplicate it. Add tests or documentation only if useful, and report that the behavior already existed.
- If implementation requires an unspecified product decision, infer from existing patterns when safe. Otherwise ask for clarification.
- If a security, privacy, data-loss, billing, or permission implication is unclear, stop and ask for clarification.
- If a migration is needed, follow existing migration patterns and include rollback or compatibility considerations when the repository has such conventions.
- If generated files are normally checked in, update them only through the standard generation command.
- If generated, vendor, lock, or build output changes appear unexpectedly, investigate before keeping them.

## Final report

Report only validation that actually happened.

Include:

- Summary of new behavior.
- Files changed.
- Tests added or updated.
- Red phase result: command and expected failure summary.
- Green phase result: command and passing result.
- Additional verification commands and outcomes.
- Limitations, risks, skipped checks, or follow-ups.

Do not claim tests passed unless they were actually run.

## Quality criteria

The completed feature should:

- Satisfy the stated acceptance criteria.
- Be covered by tests at the appropriate layer when a test harness exists.
- Preserve unrelated public behavior.
- Follow local conventions.
- Keep implementation scope narrow.
- Leave validation evidence that another engineer can inspect.
