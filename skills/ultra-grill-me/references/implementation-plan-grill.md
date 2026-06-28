# Implementation Plan Verification

## When to use this reference

- Reviewing step-by-step project execution plans or roadmap milestones
- Checking development sequence, dependency paths, and scheduling risks
- Verifying deployment, rollout, migration, or fallback strategies
- Stress-testing delivery timelines before launching sprint schedules

## When not to use this reference

- Reviewing code designs or API specifications → Use `technical-design-grill.md`
- Critique of product market fit or user persona → Use `product-idea-grill.md`
- Directly generating project timeline charts or Gantt graphics

## Question Priority

1. **Definition of Done (DoD)** — What does "completed" mean for each task?
2. **Task Decomposition** — Are tasks broken down into chunks smaller than 3 developer-days?
3. **Dependency Path** — Which tasks must be completed before others can begin?
4. **Critical Path & Bottlenecks** — Which sequence of tasks determines the final release date?
5. **External Dependencies** — Are there external APIs, reviews, or approvals outside our control?
6. **Milestones & Checkpoints** — Where and when do we verify the path is correct?
7. **Rollout & Migration Strategy** — How do we deploy this change to production safely?
8. **Rollback & Fallback Plan** — What is the plan if the deployment fails?
9. **Timeline Buffers** — How much schedule risk is allocated to high-uncertainty tasks?
10. **Smallest Next Action** — What is the single smallest task that can start today?

## Strong Question Patterns

- "How do we define 'Done' for this phase? Does it include test automation and staging deployments?"
- "If Task B is delayed by 5 days, how does that impact the target release date?"
- "What task in this timeline has the highest uncertainty? Should we build a prototype first to reduce this risk?"
- "If the production deployment fails, can we revert to the previous version in less than 5 minutes?"

## Weak Question Patterns

- "Is this timeline realistic?"
- "Will everyone work hard to meet the deadline?"
- "Do you have enough developers?"

## Recommended Option Rules

- **DoD Ambiguity**: Recommend `(Recommended) Functionally working + Test coverage met + Code reviewed before merge` and include looser "developer-done" alternatives to build the option set.
- **Checkpoint Ambiguity**: Recommend `(Recommended) Validate core happy path E2E at 30% of total timeline` and include launch-day-only validation alternatives to build the option set.
- **Rollback Ambiguity**: Recommend `(Recommended) 5-minute automated rollback capability using previous build pipeline` and include hotfix patch alternatives to build the option set.

## Handling Vague Answers

- "The timeline should be fine" → Push for reality: "What is the single most uncertain task in this list? If it takes twice as long, how does that affect other tasks?"
- "We'll deal with deployment failures when they happen" → Force fallback: "Shall we set a default rollback policy, such as 'Revert to previous build version if errors exceed 1% in 5 minutes'?"
- "Tasks are self-contained" → Map order: "Does the frontend task depend on database schema deployment? Let's establish that database migration must happen first."

## Stopping Conditions

In addition to common stopping conditions, ensure:
- Clear Definition of Done (DoD) is established.
- Tasks are decomposed into small units (<3 days).
- Core dependencies and the critical path are mapped.
- Staging verification milestones are defined.
- Rollback protocols are defined.

## Final Synthesis Required Items

Add the following to the common final synthesis format:
- Clear Definition of Done (DoD)
- Sequence of Tasks (Critical Path)
- Key Project Checkpoints (Milestones)
- External Dependencies List
- Deployment & Rollback Strategy
