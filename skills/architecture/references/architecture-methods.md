# Architecture Methods

Use this reference when the task needs more detail than the core workflow.

## Quality-attribute scenarios

Convert a quality goal into a testable scenario:

| Field | Question |
| --- | --- |
| Stimulus | What event, load, fault, threat, or change occurs? |
| Source | Who or what causes it? |
| Environment | Under what normal, peak, degraded, or recovery condition? |
| Artifact | Which service, module, data store, or deployment is affected? |
| Response | What should the system do? |
| Measure | How fast, how often, how much, or with what recovery target? |

Example: “During a regional dependency outage, the checkout API shall reject new payment attempts with a safe error within 2 seconds, preserve the order state, and expose an alert within 5 minutes.” Do not treat this example as a target for another system.

## Useful architecture views

Choose views that answer the decision rather than documenting everything.

- **Context:** actors, external systems, responsibilities, trust boundaries, and data leaving the system.
- **Container/module:** deployable units or code modules, interfaces, dependency direction, ownership, and change locality.
- **Data:** authoritative source, read models, schema/version ownership, consistency, retention, and migration.
- **Runtime:** request sequence, asynchronous work, concurrency, queue semantics, timeout, retry, backpressure, and failure propagation.
- **Deployment:** environments, placement, scaling unit, network or identity dependencies, rollout, rollback, and recovery.

Use tables when the relationship is more important than visual layout. Use Mermaid only when it materially clarifies a flow or boundary. Keep diagrams consistent with the prose and label unknowns.

## Alternative comparison matrix

Compare each candidate with the same criteria. Use High/Medium/Low only when the meaning is defined in context.

| Criterion | Baseline | Option A | Option B |
| --- | --- | --- | --- |
| Delivery speed now |  |  |  |
| Boundary strength |  |  |  |
| Operational complexity |  |  |  |
| Independent scaling |  |  |  |
| Failure isolation |  |  |  |
| Data consistency cost |  |  |  |
| Testability |  |  |  |
| Migration risk |  |  |  |
| Cost/cognitive load |  |  |  |

Do not add scores without explaining their meaning. If weights are important, state the weights and show how a different priority would change the result.

## Boundary heuristics

A useful boundary usually has:

- one clear responsibility and vocabulary
- an owner for its behavior and data
- a small, intentional interface
- dependencies that point in an explainable direction
- a transaction and consistency model that callers can understand
- independent tests or a deliberate integration-test boundary
- a change pattern that does not force unrelated modules to move together

Warning signs include shared mutable tables, cyclic imports, “utility” modules with business authority, callbacks that leak internal state, duplicated ownership, synchronized releases, and interfaces that expose persistence details.

## Migration slices

Prefer vertical, reversible slices that keep the system working:

1. Characterize current behavior and add observability at the seam.
2. Introduce an explicit contract or anti-corruption layer.
3. Move one capability or flow while keeping compatibility with the old path.
4. Dual-read or dual-write only with reconciliation and a removal plan.
5. Switch traffic or ownership gradually and define rollback.
6. Remove the old path, schema, or dependency after evidence confirms safety.

For each slice, state invariant, owner, rollout signal, rollback action, data reconciliation, and cleanup condition. Avoid “rewrite everything” plans unless the constraints make incremental migration infeasible and the risk is explicitly accepted.
