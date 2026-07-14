# Architecture Decision Record Template

Copy this structure into the repository's established decision-log location. Preserve local naming and status conventions.

```md
# ADR: <short decision title>

- Status: proposed | accepted | superseded | deprecated
- Date: <YYYY-MM-DD>
- Owners: <people or team>
- Scope: <system, capability, or boundary>

## Context

What decision is required? State the problem, system boundary, users or callers, constraints, compatibility needs, and the evidence available. Separate facts from assumptions and unresolved questions.

## Decision drivers

- <quality attribute or business constraint>
- <operational, security, data, or delivery constraint>

## Quality scenarios

| Scenario | Target or current evidence | Priority |
| --- | --- | --- |
| <stimulus in environment> | <measurable response or unknown> | <high/medium/low> |

## Options considered

### Option A — <name>

<Responsibilities, boundaries, communication, data ownership, runtime and deployment behavior.>

### Option B — <name>

<Same fields as Option A.>

## Decision

Choose <option>. Explain why it fits the drivers now and identify what it intentionally does not optimize.

## Consequences

### Benefits

- <benefit>

### Costs and risks

- <cost, risk, or accepted limitation>

### Mitigations and guardrails

- <mitigation, owner, or validation>

## Migration and validation

<Incremental steps, compatibility strategy, rollout signal, rollback, data reconciliation, and tests or measurements.>

## Revisit triggers

- <measured threshold, product change, incident, or date that should reopen this decision>

## Open questions

- <question that does not block the current decision>
```
