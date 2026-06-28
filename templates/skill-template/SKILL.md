---
name: my-new-skill
description: Use when the user needs a specific repeatable workflow. Describe the trigger clearly. Do not use for unrelated tasks, simple factual Q&A, or requests that should be handled directly without this workflow.
---

# My New Skill

## Purpose

Describe what this skill is for.

This skill should help the agent follow a repeatable workflow instead of improvising from scratch.

Use this section to explain the job this skill performs and the quality bar it should enforce.

## When to use this skill

Use this skill when the user asks to:

- do a specific repeatable task
- follow a known workflow
- apply a particular review or decision process
- produce an output that benefits from structured steps

## When not to use this skill

Do not use this skill when:

- the user asks a simple factual question
- the user wants immediate execution without this workflow
- the task belongs to another more specific skill
- using this skill would add unnecessary friction

## Workflow

Follow this process.

1. Identify the object of the task.
2. Confirm the intended outcome.
3. Check relevant constraints.
4. Apply the core procedure.
5. Validate the result against the quality criteria.
6. Produce the final output in the requested format.

If the user’s request is ambiguous, make a reasonable assumption when possible.

Ask a clarifying question only when the missing information would materially change the result.

## Core procedure

Replace this section with the specific steps for this skill.

A good procedure should be concrete enough that another agent could follow it reliably.

Include:

- decision rules
- ordering rules
- fallback behavior
- stopping conditions
- quality checks

## Inputs

The skill may use:

- user instructions
- files provided by the user
- repository context
- previous conversation context
- reference files in this skill folder

Do not invent missing facts.

If required information is unavailable, mark it as an assumption or known unknown.

## References

Use reference files only when needed.

- Read `references/README.md` for additional guidance.
- Add more reference files when the core `SKILL.md` would become too long.

Do not load unnecessary reference material.

## Output format

Return the result in a clear, usable format.

Prefer this structure unless the user requests something else:

1. Summary
2. Key decisions or findings
3. Main output
4. Risks, assumptions, or known unknowns
5. Recommended next action

## Quality criteria

The final output should be:

- specific
- actionable
- scoped
- internally consistent
- aligned with the user’s request
- free of unnecessary filler

## Gotchas

Avoid these common failures:

- Do not turn the skill into generic advice.
- Do not skip the workflow and jump straight to the final answer.
- Do not ask broad questions like “Anything else?” when a concrete next step is available.
- Do not over-trigger this skill for unrelated tasks.
- Do not hide assumptions. State them clearly.
- Do not produce a final output before the stopping conditions are met.

## Stopping conditions

Stop when:

- the requested workflow has been completed
- the output passes the quality criteria
- major assumptions or known unknowns are documented
- the next action is clear

If the task cannot be completed, explain what is missing and provide the best partial result possible.
