# Prompts that should not trigger `performance-testing`

## Functional correctness only

- "The login endpoint returns 500. Fix it."
- "이 테스트가 왜 실패하는지 고쳐줘."

Use `bugfix` unless performance is a material part of the report.

## New behavior without a performance objective

- "Add CSV export to the dashboard."
- "새 CLI flag를 만들어줘."

Use `feature-dev`.

## Behavior-preserving cleanup

- "Rename these classes and split this file without changing behavior."
- "중복 코드를 정리해줘."

Use `refactoring`.

## General explanation

- "What is p95 latency?"
- "load test와 stress test의 차이를 설명해줘."

Answer directly unless the user asks to apply a performance-testing workflow.

## Unsupported or unsafe action

- "Hammer this production payment API until it breaks."

Do not generate the load. Explain that explicit authorization, bounded traffic, monitoring, and stop conditions are required. The safety discussion can use the skill, but executing the unsafe request is prohibited.
