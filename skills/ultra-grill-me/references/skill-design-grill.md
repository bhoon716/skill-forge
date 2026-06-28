# Agent Skill Design Verification

## When to use this reference

- Stress-testing custom Agent Skill designs before draft generation
- Verifying trigger/non-trigger conditions and workflow steps in `SKILL.md`
- Critiquing skill folder structures, templates, or testing designs
- Evaluating skill scope boundaries or gotchas configurations

## When not to use this reference

- Reviewing standard application logic or code architecture → Use `technical-design-grill.md`
- Verifying business viability or pricing models → Use `business-strategy-grill.md`
- Generating raw markdown templates directly

## Question Priority

1. **Core Repeatable Job** — Is this a specific, repeatable task suitable for a skill?
2. **Trigger Condition** — Exactly what query forms should turn this skill on?
3. **Non-trigger Condition** — Exactly what queries must NOT activate this skill?
4. **Observable Workflow** — Are the internal execution steps testable from the outside?
5. **Output Format** — Is the structure of the final output consistent and defined?
6. **Reference Strategy** — Are reference files mapped to be loaded only when needed?
7. **Stopping Conditions** — Is it clear when the skill execution loop terminates?
8. **Gotchas** — Are common AI failure modes for this task explicitly documented?
9. **Test Cases (Evals)** — Can we design concrete pass/fail checks for this skill?
10. **Release Gate** — What are the performance and precision limits for deployment?

## Strong Question Patterns

- "What is the single, repeatable job this skill performs? Please define it in one sentence."
- "What are three examples of user queries that look similar but must NOT trigger this skill?"
- "Are the workflow steps observable? How do we verify that the agent actually executed Step 2?"
- "Is your description narrow enough to prevent conflicts with other system skills?"

## Weak Question Patterns

- "Does this skill look okay?"
- "Is there anything missing?"
- "How do we make it better?"

## Recommended Option Rules

- **Scope Ambiguity**: Recommend `(Recommended) Target exactly one narrow, repeatable, high-value workflow` and include multi-tasking options to build the option set.
- **Trigger Ambiguity**: Recommend `(Recommended) Use when [clear trigger situation]. Do not use for [similar exclusion situation].` and include loose natural language matching to build the option set.
- **Output Format Ambiguity**: Recommend `(Recommended) Require at least 3 fixed sections (Summary, Key Findings, Next Steps)` and include free-form output alternatives to build the option set.

## Handling Vague Answers

- "I want the skill to handle everything" → Push for focus: "If a single skill does multiple jobs, it leads to routing conflicts. Which single job is repeated most frequently?"
- "The trigger is just when they talk about planning" → Force exclusion: "If the user asks 'What is planning?', should this skill turn on? Let's add that to non-triggers."
- "We don't need a strict output format" → Enforce consistency: "Shall we set a temporary output constraint of 'having a final Actionable Next Step section' for quality checks?"

## Stopping Conditions

In addition to common stopping conditions, ensure:
- The core repeatable workflow is clearly defined.
- Trigger/Non-trigger examples are explicitly mapped.
- Workflow steps are distinct and observable.
- A fixed output structure is defined.
- Primary gotchas (failure modes) are documented.

## Final Synthesis Required Items

Add the following to the common final synthesis format:
- Core Repeatable Job Definition
- Trigger & Non-Trigger Scenarios
- Step-by-Step Observable Workflow
- Fixed Output Schema Specs
- Task-Specific Gotchas List
