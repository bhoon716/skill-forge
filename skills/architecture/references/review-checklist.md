# Architecture Review Checklist

Use this as a review aid, not as a reason to manufacture findings. Mark each item as supported, unclear, risk, or not applicable and cite evidence.

## Scope and drivers

- Is the system boundary explicit?
- Are actors, business capabilities, non-goals, constraints, and ownership named?
- Are the few quality scenarios that drive the decision measurable?
- Are facts, assumptions, and unknowns separated?

## Boundaries and dependencies

- Does each component or module have a coherent responsibility?
- Is data and behavior ownership unambiguous?
- Are interfaces small, stable, and independent of storage details?
- Is dependency direction intentional and free of unexplained cycles?
- Can the affected units be tested, deployed, and changed at the required boundary?

## Data and contracts

- Is there one authoritative owner for each important datum?
- Are consistency, transaction, ordering, duplication, replay, and idempotency rules explicit?
- Are schema evolution, retention, privacy, and migration addressed?
- Are external contracts versioned or compatibility-tested where needed?

## Runtime and resilience

- Are synchronous and asynchronous paths clear?
- Are timeout, retry, backoff, circuit breaking, queue, and backpressure semantics intentional?
- What fails together, and what remains available during dependency or instance failure?
- Are recovery point, recovery time, and degraded behavior defined?
- Are logs, metrics, traces, alerts, and ownership sufficient to diagnose the design?

## Security and operations

- Are trust boundaries, identity, authorization, secrets, and sensitive-data flows explicit?
- Is the least-privilege model compatible with the proposed boundaries?
- Are deployment, scaling, rollout, rollback, backup, and disaster recovery operationally feasible?
- Does the design fit the team's support and on-call capability?

## Migration and decision quality

- Is the migration incremental where feasible?
- Does each step have a compatibility plan, success signal, rollback, and cleanup condition?
- Were meaningful alternatives compared against the same criteria?
- Are rejected alternatives and accepted risks recorded?
- Are revisit triggers and a validation plan defined?
