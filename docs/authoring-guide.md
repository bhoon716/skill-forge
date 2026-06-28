# Skill 작성 가이드

이 문서는 `skill-forge`에서 Agent Skill을 설계하고 저장하는 표준 절차를 정리한다.
핵심 원칙은 하나의 반복 작업을 작은 절차로 쪼개고, `SKILL.md`를 중심으로 필요한 보조 리소스를 분리하는 것이다.

## 전체 흐름

1. 반복되는 작업을 고른다.
2. 구체적인 사용 예시를 모은다.
3. Skill의 범위를 한 문장으로 정한다.
4. 이름을 정한다.
5. `description`을 가장 공들여 쓴다.
6. 폴더 구조를 만든다.
7. `SKILL.md`의 뼈대를 작성한다.
8. `references/`, `examples/`, `scripts/`를 분리한다.
9. trigger / non-trigger 예시를 만든다.
10. 실제 프롬프트로 테스트한다.
11. 과발동 / 저발동 / 약한 동작을 수정한다.
12. README와 설치 위치를 정리한다.

## 1. Skill로 만들 만한 작업인지 판단한다

Skill에 적합한 작업은 다음 성질을 가진다.

- 자주 반복된다
- 매번 비슷한 절차를 따른다
- 특정 방식으로 처리해야 품질이 좋아진다
- 모델이 자주 빼먹는 단계가 있다
- 조직이나 개인의 규칙이 중요하다
- 긴 프롬프트를 매번 다시 쓰고 있다
- 결과물의 검증 기준이 있다

반대로 단순 설명, 한 번만 쓸 임시 요청, 일반적 브레인스토밍처럼 절차가 약한 작업은 Skill로 만들 필요가 적다.

## 2. 구체적인 예시를 먼저 모은다

Skill은 추상적 아이디어보다 실제 입력 예시에서 시작해야 한다.

예시:

- trigger: "이 제품 아이디어 만들기 전에 끝까지 빈틈 털어줘."
- trigger: "이 설계를 더 이상 물어볼 게 없을 때까지 질문해줘."
- trigger: "내 전략 초안을 반대신문하듯이 검증해줘."
- non-trigger: "PRD가 뭔지 설명해줘."
- non-trigger: "SaaS 아이디어 10개 추천해줘."
- non-trigger: "JWT와 세션 쿠키 차이 알려줘."

이 예시는 나중에 `description`과 테스트 기준의 기준점이 된다.

## 3. Skill의 범위를 한 문장으로 정한다

좋은 Skill은 일을 좁게 정의한다.

예:

- 나쁜 범위: 계획을 도와주는 Skill
- 좋은 범위: 계획, 설계, 아이디어를 한 번에 하나의 질문으로 압박 검증해서 중요한 모호성이 남지 않을 때까지 명확화하는 Skill

범위가 넓어 보일수록 좋아 보이지만, 실제로는 좁을수록 안정적으로 동작한다.

## 4. 이름을 정한다

이름은 보통 소문자, 숫자, 하이픈으로 구성한다.
짧고 기억 가능하며, 어떤 동작인지 대략 짐작할 수 있어야 한다.

좋은 예:

- `ultra-grill-me`
- `prd-shredder`
- `issue-splitter`
- `launch-checklist`
- `architecture-cross-examiner`

`SKILL.md`의 `name`과 디렉터리 이름은 같게 유지한다.

## 5. `description`을 가장 공들여 쓴다

`description`은 단순 소개가 아니라 라우팅 규칙이다.
처음부터 본문 전체를 읽지 않기 때문에, 이 한 줄이 skill 선택 여부를 좌우한다.

권장 형식:

- `Use when ...`
- 핵심 행동을 명시한다
- 종료 조건을 암시하거나 명시한다
- `Do not use for ...`로 경계를 적는다

예:

```md
description: Use when the user wants a plan, design, product idea, architecture, writing direction, implementation plan, or strategy stress-tested through one-question-at-a-time interrogation until no high-value ambiguity remains. Do not use for simple factual Q&A, brainstorming lists, or immediate execution requests.
```

## 6. 폴더 구조를 만든다

기본 구조:

```txt
skills/
└── skill-name/
    ├── SKILL.md
    ├── README.md
    ├── README.ko.md
    ├── references/
    └── examples/
```

`SKILL.md`만 필수이고, 나머지는 필요할 때만 둔다.

## 7. `SKILL.md`의 기본 뼈대를 작성한다

최소 형태는 다음과 같다.

```md
---
name: ultra-grill-me
description: ...
---

# Ultra Grill Me
Ask one high-leverage question at a time until no meaningful ambiguity remains.
```

좋은 Skill은 보통 다음 섹션을 포함한다.

- Purpose
- When to use / When not to use
- Workflow
- Decision rules
- References
- Output format
- Quality criteria
- Gotchas
- Stopping conditions

## 8. Purpose를 쓴다

Purpose는 이 Skill이 왜 존재하는지 설명한다.

예:

```md
## Purpose
Stress-test a plan, design, product idea, strategy, writing direction, or implementation plan until no high-value ambiguity remains.
Do not produce the final plan immediately.
This skill exists to remove meaningful ambiguity, hidden assumptions, unresolved tradeoffs, weak success criteria, edge cases, and failure modes through one-question-at-a-time interrogation.
```

## 9. When to use / When not to use를 쓴다

이 섹션은 description보다 자세한 trigger boundary다.

```md
## When to use
Use this skill when the user asks to:
- stress-test a plan
- grill an idea
- find hidden assumptions
- clarify a vague project
- challenge a product idea

## When not to use
Do not use this skill when:
- the user asks a simple factual question
- the user wants a list of ideas
- the user asks for immediate execution
- the user wants a direct rewrite
```

## 10. Workflow를 단계별로 쓴다

Workflow는 Skill의 심장이다.

핵심 원칙:

- 한 번에 하나의 질문만 한다
- 최종 계획을 일찍 쓰지 않는다
- 질문이 더 이상 의사결정 품질을 높이지 못할 때만 멈춘다

예:

```md
## Workflow
1. Identify the highest-impact unresolved ambiguity.
2. Ask exactly one question.
3. Explain briefly why the question matters.
4. Provide a recommended default answer when useful.
5. Wait for the user's answer.
6. Update the internal state.
7. Repeat until the stopping conditions are met.
```

## 11. Decision rules를 쓴다

무엇을 먼저 볼지 기준이 필요하다.

우선순위 예:

1. Goal ambiguity
2. User or stakeholder ambiguity
3. Success metric ambiguity
4. Scope boundary ambiguity
5. Constraint ambiguity
6. Assumption risk
7. Dependency risk
8. Irreversible decision risk
9. Cost, time, or complexity risk
10. Edge cases
11. Failure modes
12. Security, privacy, compliance, or safety concerns

## 12. Inputs를 정의한다

Skill이 사용할 수 있는 입력을 적는다.

```md
## Inputs
The skill may use:
- the user's current request
- previous conversation context
- files provided by the user
- repository context
- reference files in this skill folder
Do not invent missing facts.
If required information is unavailable, mark it as an assumption or known unknown.
```

## 13. References를 분리한다

`SKILL.md`에 모든 내용을 넣지 말고, 긴 자료는 `references/`로 뺀다.
언제 어떤 파일을 읽을지 명시한다.

예:

- `references/question-taxonomy.md`
- `references/adversarial-passes.md`
- `references/final-synthesis-template.md`

## 14. Output format을 정한다

Skill이 끝났을 때 어떤 결과를 내야 하는지 정한다.

예:

1. Clarified plan
2. Decisions made
3. Remaining known unknowns
4. Risks and mitigations
5. Recommended next action

## 15. Quality criteria를 쓴다

좋은 결과물의 기준을 적는다.

예:

- specific
- actionable
- scoped
- internally consistent
- explicit about assumptions
- clear about risks and tradeoffs

## 16. Gotchas를 쓴다

실패하기 쉬운 지점을 구체적으로 적는다.

예:

- Do not ask multiple unrelated questions at once.
- Do not accept vague answers as resolved.
- If the user says "not sure", propose a default and ask them to accept, reject, or modify it.
- Do not produce the final synthesis early.

## 17. Stopping conditions를 쓴다

반복형 Skill에는 종료 조건이 필요하다.

예:

- 목표가 명시되었다
- 대상 사용자 또는 이해관계자가 명확하다
- 성공 기준이 충분히 측정 가능하다
- 범위와 비범위가 정의되었다
- 더 질문해도 의사결정이 크게 바뀌지 않는다

## 18. Scripts는 정말 필요할 때만 추가한다

대부분의 Skill은 `SKILL.md`만으로 충분하다.
정규식, 파서, 변환, 검증처럼 결정적 동작이 필요할 때만 `scripts/`를 추가한다.

## 19. Examples를 만든다

권장 구조:

```txt
examples/
├── should-trigger.md
└── should-not-trigger.md
```

이 예시는 문서가 아니라 테스트 케이스다.

## 20. 실제로 테스트한다

테스트할 항목:

1. 켜져야 할 때 켜지는가?
2. 켜지면 안 될 때 안 켜지는가?
3. 첫 질문이 너무 약하지 않은가?
4. 여러 질문을 한꺼번에 던지지 않는가?
5. 중간에 성급하게 최종안을 쓰지 않는가?
6. 모호한 답변을 그냥 넘어가지 않는가?
7. 종료 조건에 도달했을 때 멈추는가?

## 21. 과발동과 저발동을 고친다

Skill이 너무 자주 켜지면 `description`을 좁힌다.
Skill이 잘 안 켜지면 trigger phrase를 더 넣는다.

과발동에 도움이 되는 경계 표현:

- simple factual Q&A
- brainstorming lists
- immediate execution requests

저발동을 줄이는 표현:

- grill
- stress-test
- pressure-test
- interrogate
- clarify
- find hidden assumptions

## 22. README를 작성한다

각 Skill에는 짧은 README를 둘 수 있다.
하지만 핵심 동작은 반드시 `SKILL.md`에 있어야 한다.

README는 보통 다음을 담는다.

- 한 줄 소개
- 사용처
- 사용하지 말아야 할 경우
- 폴더 구조

## 23. 설치 위치를 문서화한다

여러 도구가 `SKILL.md` 패턴을 지원하지만 설치 위치는 다를 수 있다.
여기서는 `skill-forge` 기준으로 각 실행 환경의 경로를 따로 문서화하면 좋다.

## 24. 안전성 체크를 한다

Skill은 단순 문서처럼 보여도 에이전트 행동을 바꾼다.

체크할 것:

- 비밀키나 credential을 요구하지 않는가?
- destructive command를 자동 실행하지 않는가?
- 외부 네트워크 접근이 필요한가?
- 사용자 허가 없이 파일을 삭제/전송하지 않는가?

## 25. 반복해서 깎는다

작성 후에는 실제로 써 보면서 다음을 확인한다.

- description이 너무 넓거나 좁지 않은가?
- 첫 질문이 약하지 않은가?
- workflow가 너무 길어 지키기 어렵지 않은가?
- reference를 읽어야 할 때 잘 읽는가?
- 종료 조건이 충분히 명확한가?

## 예시: ultra-grill-me

`ultra-grill-me`는 계획, 설계, 아이디어를 한 번에 하나의 질문으로 압박 검증하는 Skill이다.
핵심은 다음 세 가지다.

- 한 번에 하나의 질문만 한다
- 최종 계획을 일찍 쓰지 않는다
- 더 질문해도 의미가 없을 때만 멈춘다

## 예시: tiny-prd-reviewer

`tiny-prd-reviewer`는 PRD, feature spec, product idea를 짧고 구조적으로 리뷰하는 Skill 예시다.

핵심 구조:

- Purpose
- When to use / When not to use
- Workflow
- Review criteria
- Output format
- Gotchas
- Stopping conditions

## 정리

좋은 Skill은 긴 설명문이 아니라, 반복 가능한 작업을 정확한 절차로 압축한 도구다.
`SKILL.md`는 핵심만 담고, 예시와 상세 규칙은 필요한 파일로 분리한다.
