# Architecture Decision Verification

## When to use this reference

- Verifying high-level technology choices (e.g., framework, database engine, cloud provider)
- Evaluating system topology (e.g., monolith vs. microservices, serverless vs. container)
- Comparing technical tradeoffs of multiple system-wide options
- Reviewing Architectural Decision Records (ADRs) before committing

## When not to use this reference

- Small developer-level design critiques (e.g., code structure, utility classes) → Use `technical-design-grill.md`
- Verifying business viability or market segments → Use `business-strategy-grill.md`
- Building boilerplate server templates

## Question Priority

1. **Core Technical Goals** — What is the primary problem this architecture solves?
2. **Evaluation Criteria** — What is the most critical constraint? (e.g., speed, maintainability, team skill)
3. **Alternative Options** — What alternative architectures were considered?
4. **Tradeoffs (Pros/Cons)** — What are we sacrificing to achieve this architecture?
5. **Reversibility** — How expensive is it to undo or change this decision in 6 months?
6. **Operational Overhead** — How complex is this to deploy, monitor, and debug?
7. **Cost / Resource Implications** — How does this impact infra billing and developer velocity?
8. **Failure & Migration Path** — How do we migrate from the old system without downtime?

## Strong Question Patterns

- "Why is a monolith no longer sufficient? What specific scaling bottleneck forces us to go to microservices?"
- "What alternative database engine did you consider? Why was it rejected?"
- "This architecture introduces significant network overhead. How do you plan to handle distributed tracing and network latency?"
- "Is this decision reversible? If we need to migrate off this database next year, how much code must we rewrite?"

## Weak Question Patterns

- "Is this the best framework?"
- "Is this architecture standard?"
- "Is it easy to use?"

## Recommended Option Rules

- **Criteria Ambiguity**: Recommend `(Recommended) Minimizing operational overhead and matching current team skillsets` criteria and include bleeding-edge hype-based alternatives to build the option set.
- **Single Option Ambiguity**: Recommend `(Recommended) Maintain current architecture (status quo) as baseline` option to build a comparative option set.
- **Reversibility Ambiguity**: Recommend `(Recommended) Assume this is an irreversible choice (Type 1 Decision) and establish mitigation fallbacks` and include lightweight, temporary-change alternatives to build the option set.

## Handling Vague Answers

- "Both options are good" → Propose differentiator: "Between A and B, which one has the lower operational complexity? Let's use that as our tie-breaker criteria."
- "We'll build it to scale infinitely" → Force limits: "Shall we set a concrete horizon constraint, such as 'supporting 10x current scale for 12 months', to avoid over-engineering?"
- "It is easily reversible" → Force reality check: "If we had to revert, would it require database schema migration? Let's mark this as a Type 1 (high-risk, irreversible) decision for safety."

## Stopping Conditions

In addition to common stopping conditions, ensure:
- Clear architectural goals are defined.
- Tradeoffs (what we are actively giving up) are explicitly listed.
- At least one alternative option (including status quo) has been compared.
- The cost/maintenance overhead is quantified.
- The migration path is outline.

## Final Synthesis Required Items

Add the following to the common final synthesis format:
- Chosen Architectural Option
- Active Tradeoffs (Pros vs. Cons)
- Rejected Alternatives and Why
- Reversibility Assessment (Type 1 vs. Type 2)
- Operational Risk Mitigations
