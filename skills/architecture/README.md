# Architecture

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`architecture` is a software-architecture decision skill for designing and reviewing new or existing systems with evidence, explicit tradeoffs, and reusable artifacts.

## Use this skill for

- Comparing architecture alternatives such as a layered system, modular monolith, or service decomposition
- Writing ADRs and architecture briefs
- Reviewing component, integration, data, or module boundaries in a codebase
- Analyzing quality attributes, scalability, availability, resilience, security, operability, and cost
- Producing context, container/component, runtime, or deployment views
- Planning incremental architecture migrations with compatibility and rollback

## Workflow

1. Frame the decision and constraints.
2. Inspect repository evidence when available.
3. Define measurable quality scenarios.
4. Model current and target states.
5. Compare two to four alternatives against the same criteria.
6. Analyze risks, migration, and validation.
7. Produce the requested brief, ADR, review, view, or migration plan.

## Install

```bash
skill-forge install architecture --lang en --agent codex
skill-forge install architecture --lang ko --agent codex
skill-forge install architecture --lang zh --agent codex
```

## Do not use it for

Simple factual explanations, isolated bug fixes, feature implementation, or behavior-preserving refactoring unless an explicit architecture decision is part of the request.
