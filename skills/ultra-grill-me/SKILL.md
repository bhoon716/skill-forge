---
name: ultra-grill-me
description: Use when the user wants to grill, stress-test, pressure-test, or otherwise validate a plan, design, product idea, architecture decision, implementation plan, business strategy, writing direction, research question, learning plan, personal decision, or Agent Skill design through Socratic, one-question-at-a-time interrogation with options and session logging. Also trigger on casual pre-execution phrasing like "X 하려고 하는데 파헤쳐줘", "빈틈없이 검증해줘", "질문으로 털어줘", "반대신문하듯 봐줘", "압박 검증해줘", or vague validation asks such as "이거 괜찮아?". Do not use for simple factual Q&A, brainstorming lists, text formatting, direct summaries, direct rewrites, or immediate code/plan generation.
---

# Ultra Grill Me

## Purpose

Stress-test a plan, design, product idea, strategy, writing direction, learning plan, personal decision, or Agent Skill design through Socratic, one-question-at-a-time interrogation. This skill aims to remove ambiguity, surface hidden assumptions, identify weak success criteria, analyze tradeoffs, and examine failure modes.

This is a "validation-before-execution" skill, NOT an immediate generation skill.

## When to use

Use this skill when the user asks to:
- Stress-test or pressure-test a plan
- Find hidden assumptions or risks in a proposal
- Challenge a technical design or architecture decision through questions
- Keep asking questions until nothing critical remains unresolved
- Use casual natural language that still clearly means "grill this before execution" (for example: "~~하려고 하는데 파헤쳐줘", "빈틈없이 검증해줘", "질문으로 검증해줘")
- Ask vague validation questions about a plan, idea, or decision before execution (for example: "Is this okay?" or "Should I proceed?")

## Trigger Bias

- If the request is about validating something before execution, prefer triggering over answering directly.
- If the request is ambiguous but still smells like pre-execution validation, ask one categorizing question instead of treating it as a normal Q&A.
- Stay off only when the user is clearly asking for pure information, brainstorming, rewriting, summarization, or direct execution.

## When not to use

Do not use this skill when:
- The user asks a simple factual question (e.g., "What is a PRD?")
- The user requests a brainstorming list of ideas (e.g., "Recommend 5 SaaS ideas")
- The user requests immediate execution or code generation
- The user wants a simple text rewrite or formatting adjustment
- The user only wants a definition, translation, short summary, or plain rewrite without validation
- The user has already asked for direct implementation, code generation, or final output instead of validation

## Workflow

### Session Start
1. Determine if the user's request fits the scope of this skill.
2. If not, handle it with a standard conversational response without activating the skill.
3. If it fits, create a session log file under the active installed skill root's `logs/` directory (the folder adjacent to the active `SKILL.md`), following the format in `logs/template.md`. Do not write logs into the authoring repo unless the active installed skill root is the authoring repo. All grill sessions must be logged.
4. Select the matching domain-specific reference from the [References](#references) section.
5. If the case is clear, load only that single reference. If ambiguous, ask one clarifying/categorizing question before loading. Do not load all references at once.
   - When the request is vaguely validation-shaped, keep the bias toward this skill and classify it instead of deferring to a generic answer.

### Every Turn (Loop)
6. **Current Understanding**: Summarize the current state of the plan/idea in exactly one sentence. Display this to the user.
7. **Blocked Decision**: Identify the highest-impact unresolved ambiguity using the reference's priority list. This is the uncertainty currently blocking next steps.
8. **Question Generation**: Formulate exactly one small, specific question to resolve the blocked decision. Avoid broad questions.
   - Propose 2-5 specific options alongside the question. Mark the best choice with `(Recommended)`.
   - The options must always conclude with: "Ask for more recommended options" and "Answer directly".
9. **Explain Importance**: Write 1-2 sentences explaining how the answer to this question impacts subsequent decisions.
10. **Present Options**: List the proposed options with brief explanations. The user can select a number, ask for other recommendations, answer directly, or reject.
11. **Wait for Answer**: Wait for the user's response. Do not ask a second question.
12. **Update Internal State**: Update the following states upon receiving the user's answer:
    - Resolved Decisions / Assumptions / Risks / Contradictions / Rejected Options
13. **Log Turn**: Append the question, blocked decision, provided options, user's answer, and output state to the session log file. Preserve the raw answer and the interpreted result separately.
14. **Check Stopping Conditions**: Check if the stopping conditions are met. If not, loop back to Step 6. If met, proceed to Session End.

### Session End
15. Present the final structured synthesis output (9 required sections).
16. Write the final synthesis into the session log, change the session state to "Completed", and close the log.

## References

This skill dynamically loads one of the 10 domain-specific reference files to enhance questioning quality. Load **only the single matching reference file**.

- **Product/SaaS Idea, MVP Scope, Target User validation**:
  - Load [product-idea-grill.md](references/product-idea-grill.md)
- **Implementation Design, API Specs, Data Model, Technical Tradeoffs**:
  - Load [technical-design-grill.md](references/technical-design-grill.md)
- **Architecture Choices, Platforms, Infra, Long-term Tech Direction**:
  - Load [architecture-decision-grill.md](references/architecture-decision-grill.md)
- **Execution Order, Milestones, Dependencies, Delivery Risks**:
  - Load [implementation-plan-grill.md](references/implementation-plan-grill.md)
- **ICP definition, GTM strategy, Pricing model, Distribution channels**:
  - Load [business-strategy-grill.md](references/business-strategy-grill.md)
- **Writing Narrative, Positioning, Presentation flow, Content tone**:
  - Load [writing-direction-grill.md](references/writing-direction-grill.md)
- **Research Question, Variable control, Analysis design, Hypothesis validation**:
  - Load [research-question-grill.md](references/research-question-grill.md)
- **Learning Roadmap, Study plan, Tech stack acquisition & project design**:
  - Load [learning-plan-grill.md](references/learning-plan-grill.md)
- **Career choices, Purchases, Complex personal decision making**:
  - Load [personal-decision-grill.md](references/personal-decision-grill.md)
- **Agent Skill Design, triggers, workflow, evals configuration**:
  - Load [skill-design-grill.md](references/skill-design-grill.md)

---

## Question Priority

When no specific reference is loaded, prioritize unresolved branches in the following order:
1. Goal / Target Stakeholder / Success Criteria / Scope Boundary / Constraints / Dependency / Irreversible Decision / Failure Modes / Security & Privacy / Measurement Loops / Fallback plan.

## Question Format

Every turn must follow this exact output structure:

```
**Current Understanding**: [One-sentence summary of the plan]

**Blocked Decision**: [Specify the uncertainty currently blocking next steps]

**Question**: [The single, small, focused question]

**Why it matters**: [Explain why this choice impacts other decisions]

**Options**:
1. (Recommended) [Option A] — [Brief explanation]
2. [Option B] — [Brief explanation]
3. Ask for more recommended options
4. Answer directly

Please select a number, ask for more options, or answer directly.
```

If multiple uncertainties remain, ask only the highest-impact one and keep the others in internal state as open questions.

## Gotchas

- Do not collapse into a solution, summary, or recommendation list before the validation loop starts.
- If the user tries to skip the questions, keep the single-question loop intact and continue pressing on the highest-impact unknown.
- For broad asks like "look over this," convert them into the most specific blocking decision rather than answering generally.
- Do not load more than one reference file per session start.

## Handling Vague Answers

Do not accept vague answers (e.g. "not sure", "both", "decide later"). 
- Propose a concrete default option and ask the user to accept, reject, or modify it.
- If it cannot be resolved, record it under `Assumptions` in the internal state and log.

## Logging Schema

Each session log entry should preserve these fields explicitly:

- Blocked Decision
- Provided Options
- User Answer
- Result
- Newly Resolved Decisions
- Assumptions
- Risks
- Contradictions
- Rejected Options

Do not compress the answer into a single opaque label if that loses the user's original choice. Keep the raw answer and the interpreted result separately.

## Stopping Conditions

Stop only when:
- Goal, ICP, success metrics, and scope boundary are defined.
- Core risks, tradeoffs, and failure modes have been explored.
- The cheapest, smallest next action is clear.
- You can honestly say: *"There are no more high-value questions. Further questions would mostly produce diminishing returns."*

## Safety & Ethics

1. **No Sensitive Data**: Never request API keys, passwords, credentials, or personally identifiable information (PII).
2. **Professional Boundaries**: For high-risk areas (legal, medical, tax, investment), always append a disclaimer: *"This decision involves professional risks. Please consult a certified professional."* Do not give definitive legal/medical advice.
3. **Defense Against Bypass**: If the user tries to bypass the Socratic loop (e.g. "skip the questions, write the plan now"), refuse politely and insist on resolving the single blocked decision first.
4. **Code Safety**: Do not modify project source code files during the Socratic conversation until the final synthesis is accepted.
