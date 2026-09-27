---
name: cognitive-debt
description: Use when the user asks to audit, explain, prioritize, or reduce codebase cognitive debt or comprehension burden across existing code, such as duplicated rules, competing sources of truth, hidden coupling, unclear intent, unnecessary indirection, dead code, or proliferating dependencies and infrastructure. Ground findings in repository evidence and make only bounded, behavior-preserving changes when asked. Do not use for a known local refactor, bug fix, feature implementation, or intentional architecture redesign.
---

# Cognitive Debt

## Purpose

Find codebase conditions that make behavior and design intent difficult to discover, explain, test, or change safely. In this skill, **codebase cognitive debt** means a potential gap between the implementation and an evidence-backed shared explanation of how and why it works.

Repository evidence can reveal comprehension risks, but it cannot measure what a person or team understands. Treat code smells as signals to investigate, not proof of debt. AI authorship, file length, abstraction count, and complexity metrics alone do not make code a problem.

## Use this skill when

- The user asks for a codebase or subsystem audit focused on accumulated complexity, comprehension, or cognitive debt.
- The user wants to find and prioritize duplicated business rules, competing sources of truth, hidden coupling, unclear intent, unnecessary indirection, proven dead code, or unnecessary dependency and infrastructure growth.
- The user asks to reduce these problems across a code path or repository, rather than perform one already-specified local cleanup.

## Do not use this skill when

- The user has identified a specific behavior-preserving cleanup. Use `refactoring`.
- Existing behavior is broken. Use `bugfix`.
- The task adds a capability or product behavior. Use `feature-dev`.
- The user asks for an intentional architecture or contract change. Use `architecture` to assess the decision first.
- The user asks only what cognitive debt means. Explain it directly.

## Audit workflow

### 1. Bound the scope

Use the subsystem, flow, or concern named by the user. For a broad request, start with representative user-facing paths, recent high-change areas, or the most relevant modules; do not imply an exhaustive repository audit unless one was requested and completed. State what was inspected and what was not.

### 2. Trace the implementation

Read applicable repository instructions and the smallest useful set of architecture notes, entry points, manifests, tests, and configuration. Trace at least one representative path through its callers, data or state ownership, side effects, and tests. Use version history when it can clarify intent or reveal repeated fixes. Verify actual imports and calls; directory names are not proof of module boundaries.

### 3. Investigate candidate signals

Look for evidence of:

- The same business rule or policy implemented in multiple places, or more than one apparent source of truth.
- Hidden coupling through shared state, databases, configuration, or side effects.
- Call chains, wrappers, or concepts that obscure rather than clarify the behavior.
- Dead code or obsolete scaffolding that can be proven unused.
- Dependencies, services, queues, configuration layers, or infrastructure added without a demonstrated need.
- Names or documentation that contradict the behavior shown by code and tests.
- Important design intent that cannot be established from existing code, tests, history, or project documentation.

Do not count a pattern as debt just because it looks unusual. Check whether it protects a domain invariant, compatibility boundary, security property, reliability requirement, measured performance need, or established project convention. Account for dynamic dispatch, plugins, reflection, generated code, and consumers outside the repository before calling code unused.

### 4. Rank findings by evidence and impact

Keep observations separate from interpretations. For each finding, report:

- **Location:** precise files, symbols, and relevant call path.
- **Evidence:** what code, tests, configuration, or history demonstrates.
- **Comprehension risk:** what is harder to discover or reason about, and for which change or failure scenario.
- **Confidence and impact:** use plain high, medium, or low judgments with a short reason; do not invent a numeric score.
- **Smallest useful next step:** a bounded change, a question about missing intent, or no change when the complexity is justified.

Prioritize risks that affect multiple flows or recur during changes, while accounting for the cost and risk of remediation. A tidy-looking diff is not a success criterion if it hides behavior or adds concepts.

Return an audit with the inspected scope, a concise flow map, prioritized findings, justified complexity, and unresolved questions. If the user requested diagnosis only, keep the work read-only.

## Reduction workflow

When the user asks to reduce identified debt, make only changes supported by the audit:

1. Choose a bounded finding whose behavior and ownership can be established.
2. State the invariant that must remain unchanged and find the tests or equivalent checks that cover it. Run a baseline before editing.
3. Consider, in order, whether code can be safely removed, consolidated with an existing implementation, or needs something new. This is a decision aid, not a rule to delete code or avoid useful abstractions.
4. Make one small change at a time. Add an abstraction, dependency, service, or infrastructure component only when it addresses demonstrated complexity or a stated constraint, not a hypothetical future need.
5. Re-run the same relevant checks after each change, inspect the diff for behavior changes and stale code, and stop or revert if the evidence no longer supports the change.
6. Report the change, the baseline and follow-up results, remaining uncertainty, and any findings left for a separate decision.

Do not silently change product behavior, public contracts, data schemas, permissions, security, privacy, billing, or deployment topology as “cleanup.” If reducing a finding requires one of those changes, describe the evidence and decision needed, then route the design to `architecture` or ask the user. If a functional bug appears, report it or use `bugfix`; do not mix it into cleanup.

## Understanding handoff

Close with a short explanation of the traced behavior and the rationale established by evidence. Mark missing intent as unknown instead of inventing it. A generated map or summary can make a system easier to inspect, but it does not prove that the team has regained shared understanding. Create or update durable documentation only when requested or when it records a verified, stable decision.

## Stopping conditions

Stop when the requested audit has evidence-backed, ranked findings and clear scope limits, or when the requested bounded changes have been verified. Stop expanding when the next step depends on unresolved product intent, a risky contract or architecture choice, or unsupported assumptions; report exactly what needs a decision.
