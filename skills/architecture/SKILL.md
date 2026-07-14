---
name: architecture
description: Use when the user asks to design, evaluate, document, or review software architecture for a new or existing system, including architecture alternatives, ADRs, component or integration boundaries, layered or modular monolith design, service decomposition, scalability, availability, quality attributes, runtime or deployment views, architecture risks, or migration plans. Inspect repository evidence when available, compare explicit tradeoffs, separate facts from assumptions, and produce decision-ready artifacts. Do not use for simple architecture definitions, generic brainstorming, isolated bug fixes, feature implementation, or behavior-preserving refactoring unless an explicit architecture decision is the task.
---

# Architecture

## Purpose

Make software architecture decisions traceable, proportionate to the problem, and grounded in evidence. Treat architecture as the system's boundaries, responsibilities, dependencies, data flows, runtime behavior, deployment topology, and quality attributes—not as a list of fashionable patterns.

Use this skill to create or review an architecture brief, a decision record, a target-state design, an architecture review, or an incremental migration plan. Prefer the simplest design that satisfies the stated constraints and quality targets. Do not default to microservices, event-driven integration, or a new framework without a concrete reason.

## Routing

Use `ultra-grill-me` when the user explicitly wants adversarial questioning before deciding. Use `feature-dev`, `bugfix`, or `refactoring` when the main request is implementation, repair, or behavior-preserving cleanup. Keep this skill active when the task is to make or record an architecture decision, even if implementation work may follow.

## Operating rules

- Inspect before prescribing. For an existing codebase, examine project instructions, entry points, module/package layout, dependency manifests, persistence, integration clients, tests, build and deployment configuration, observability, and recent relevant history.
- Label every important statement as a fact, an assumption, an inference, or an unresolved question. Cite repository paths and line numbers for material findings when available.
- Make quality attributes testable. Turn vague goals such as “scalable” or “highly available” into scenarios with a stimulus, environment, response, and measurable target.
- Compare alternatives against the same criteria. Include the current state or simplest viable baseline; do not present a single preferred pattern as if it were an analysis.
- Make ownership and failure behavior explicit: component responsibility, data ownership, transaction boundary, communication mode, retry/idempotency, timeout, backpressure, consistency, recovery, and observability.
- Separate target architecture from migration architecture. Explain how the system can move safely in increments, including compatibility, rollback, and data migration concerns.
- Record what would change the decision: assumptions, decision triggers, guardrails, and review date or horizon.
- Avoid invented throughput numbers, team structures, costs, compliance requirements, or infrastructure capabilities. Mark missing evidence and recommend how to measure it.

## Workflow

### 1. Frame the decision

State the decision in one sentence. Capture the system boundary, users or actors, business capability, desired outcome, scope, constraints, non-goals, compatibility requirements, risk horizon, and who owns the decision. Define what “good” means before comparing designs.

If the request is underspecified, make low-risk assumptions and list them. Ask for clarification only when the missing choice materially affects security, privacy, data loss, regulatory exposure, public contracts, cost, or irreversible design direction.

### 2. Build the evidence base

For a repository task, inspect the smallest useful set of artifacts first:

- project instructions and architecture documentation
- package or dependency manifests, entry points, configuration, and build scripts
- top-level module or service directories and their public interfaces
- data models, migrations, queues, caches, external integrations, and authentication boundaries
- tests, CI/CD, deployment manifests, runtime configuration, logs, metrics, and tracing setup

Trace representative user or business flows through the current system. Use repository search and version history when useful. Do not infer a boundary merely from a directory name; verify imports, calls, data access, ownership, and deployment coupling.

### 3. Define quality scenarios

Select the three to five quality attributes that can change the decision. Usually consider availability, latency, throughput, scalability, consistency, durability, recoverability, security, privacy, operability, deployability, testability, and cost. Express each as:

`When [stimulus] occurs in [environment], the system shall [response] within/with [measure].`

Rank scenarios by user or business impact and distinguish hard constraints from preferences. If targets are unknown, state a provisional target and identify the measurement needed to replace it.

### 4. Model the current and target states

Describe only views that help the decision:

- context view: actors, external systems, trust boundaries, and system responsibilities
- container/component view: deployable units, modules, interfaces, dependency direction, and ownership
- data view: authoritative stores, schema ownership, consistency, lifecycle, and migration path
- runtime view: synchronous/asynchronous calls, queues, concurrency, retries, timeouts, and failure propagation
- deployment view: environments, placement, scaling unit, rollout, recovery, and operational dependencies

Use a compact table or Mermaid diagram when it makes relationships clearer. For a codebase review, identify boundary violations, cyclic dependencies, shared mutable data, hidden coupling, distributed transaction assumptions, and components that cannot be tested or deployed independently.

### 5. Generate and compare alternatives

Generate two to four materially different options, including a baseline. Select options that fit the problem rather than naming patterns for their own sake. For each option, describe:

- responsibilities and ownership boundaries
- synchronous versus asynchronous communication and contract shape
- data ownership, consistency, transaction, and migration strategy
- scaling unit, performance bottlenecks, and capacity assumptions
- failure isolation, recovery, security, and observability
- deployment, team cognitive load, testing, cost, and operational burden
- migration increments, compatibility strategy, and rollback path

Compare all options with the same criteria. Use a qualitative matrix when precise measurements are unavailable, and explain the most important tradeoffs in prose. A recommendation must say why it fits the constraints now, what it intentionally gives up, and when to revisit it.

### 6. Analyze risk and choose

Check the recommendation for:

- single points of failure and correlated failure domains
- overloaded or ambiguous boundaries
- hidden coupling through shared databases, schemas, libraries, or deployment pipelines
- consistency, ordering, duplication, replay, retry, and idempotency hazards
- security and privacy boundaries, least privilege, secrets, and data exposure
- observability gaps and difficult-to-test paths
- migration, rollback, compatibility, and operational readiness risks

Classify risks as accepted, mitigated, deferred, or blocking. Prefer a smaller reversible step when evidence is weak or the decision is hard to reverse.

### 7. Produce the requested artifact

Select the output that matches the request:

- **Architecture brief/design:** context, goals, constraints, quality scenarios, current state, target state, alternatives, recommendation, risks, and migration slices.
- **ADR:** use `references/adr-template.md`; record context, decision, status, alternatives, consequences, assumptions, and revisit triggers.
- **Architecture review:** use `references/review-checklist.md`; report evidence, strengths, boundary findings, risks, prioritized actions, and open questions.
- **Runtime/deployment view:** show request paths, asynchronous paths, failure and recovery behavior, scaling, rollout, and operational dependencies.
- **Codebase architecture assessment:** cite concrete files and symbols, map dependency direction and data ownership, rank findings by impact, and propose the smallest structural change that improves the stated quality goal.

Keep facts, assumptions, decisions, rejected alternatives, risks, and open questions visibly separate. Do not present an illustrative diagram or sample metric as a verified property of the system.

## References

Read only the reference needed for the task:

- `references/architecture-methods.md` — quality scenarios, views, comparison matrix, boundary heuristics, and migration guidance.
- `references/adr-template.md` — reusable ADR structure and completion prompts.
- `references/review-checklist.md` — review checks for boundaries, data, runtime behavior, resilience, security, operability, and migration.

When using a localized `SKILL.<lang>.md`, use the matching localized reference when present.

## Output quality bar

The result should be evidence-based, explicit about uncertainty, internally consistent, proportionate to the decision, and actionable. It should let a reviewer answer: what is being decided, why now, what alternatives were rejected, what can fail, how the choice will be validated, and how the system can change later.

## Stopping conditions

Stop when the requested artifact is complete, the recommendation is supported by the stated constraints and quality scenarios, material risks and assumptions are documented, and the next validation or implementation step is clear. If evidence is insufficient, stop at a bounded assessment and state exactly what must be measured, inspected, or decided next.
