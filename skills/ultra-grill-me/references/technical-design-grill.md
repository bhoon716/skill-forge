# Technical Design Verification

## When to use this reference

- Verifying API design, data models, or system workflows
- Evaluating concrete code implementation plans
- Highlighting system bottlenecks, data consistency, or latency tradeoffs
- Checking developer-level integration plans before code generation

## When not to use this reference

- High-level platform architecture decisions (e.g., monolith vs. MSA) → Use `architecture-decision-grill.md`
- Product roadmap or business logic critique → Use `product-idea-grill.md`
- Generating raw boilerplates directly

## Question Priority

1. **Non-functional Requirements** — What are the performance, scale, and latency targets?
2. **Data Model & Schema** — Are table relations, indexing, and data life cycles defined?
3. **API Contracts** — Are input/output schemas, error codes, and validation rules explicit?
4. **Consistency & Concurrency** — How do we handle race conditions, transaction rollbacks, or sync offsets?
5. **Security & Auth** — Are encryption, RBAC, and input sanitization handled?
6. **Error Handling & Fault Tolerance** — What happens when internal/external dependencies fail?
7. **Test Strategy** — How do we verify this code behaves correctly at scale?
8. **Observability** — How do we trace, log, and alert on errors?

## Strong Question Patterns

- "What is your target scale? (e.g., 500 TPS write, sub-100ms read latency) How does this schema support it?"
- "What happens if the database connection drops halfway through this multi-step transaction? How do you ensure rollback?"
- "If two users request the same resource at the same millisecond, how does your implementation prevent duplicate writes?"
- "How do you verify this integration in tests without relying on live production APIs?"

## Weak Question Patterns

- "Is this database choice fast enough?"
- "Are we going to write unit tests?"
- "Is the code clean?"

## Recommended Option Rules

- **NFR Ambiguity**: Recommend `(Recommended) Target p99 latency < 500ms, SLA 99.9% availability, stateless scaling` and include loose hobby-scale alternatives to build the option set.
- **Test Strategy Ambiguity**: Recommend `(Recommended) 80% coverage unit tests for core logic + Mock integration tests` and include manual-only alternatives to build the option set.
- **Fault Tolerance Ambiguity**: Recommend `(Recommended) Circuit breaker with local fallback cache when dependency fails` and include crash-on-error alternatives to build the option set.

## Handling Vague Answers

- "Performance doesn't matter yet" → Propose safety defaults: "Let's set a baseline target of p99 latency < 500ms at 100 concurrent connections. Shall we use this as our constraint?"
- "We'll test it later" → Emphasize unit tests: "Shall we define that any new API route requires at least 3 automated unit tests covering validation failures before merging?"
- "It won't fail" → Force failure check: "If the authentication service fails, should the API return a cached token fallback, or drop the request immediately with a 503 error?"

## Stopping Conditions

In addition to common stopping conditions, ensure:
- Performance targets (latency, throughput) are established.
- Core database schema and relations are defined.
- Error codes and validation limits are listed.
- Fail-safe strategies for external dependency drops are outlined.

## Final Synthesis Required Items

Add the following to the common final synthesis format:
- Key Data Model Schemas / Fields
- API Spec Draft (Endpoint, Payload, Success/Error codes)
- Error Handling & Fallback Protocols
- Automated Test Requirements
