# 스킬 테스트 가이드 (Testing Guide)

이 문서는 개발한 에이전트 스킬(Agent Skill)이 요구사항과 라우팅 경계를 올바르게 준수하는지 정량적, 정성적으로 검증하는 방법을 다룬다.

---

## 1. 검증 대상 (What to Test)

스킬의 핵심 행동 제약을 기반으로 다음 3가지 영역을 검증한다.

### A. Trigger & Non-trigger (발동 경계)
- **켜져야 할 때 켜지는가?** (Socratic 인터뷰, 계획 검증 등)
- **켜지면 안 될 때 완벽히 꺼져 있는가?** (단순 설명 Q&A, 아이디어 브레인스토밍, 즉시 코딩 등)
- 과발동(Over-trigger)과 저발동(Under-trigger)을 통제한다.

### B. Process Adherence (절차 준수)
- 한 번에 오직 **하나의 질문**만 던지는가? (여러 질문 병렬 배치 금지)
- 응답 형식(`현재 이해`, `막힌 결정`, `질문`, `선택지`)을 정확히 지키는가?
- 선택지에 `(추천)` 라벨 및 마지막에 `다른 옵션 더 추천받기`와 `직접 답변` 옵션이 있는가?
- 대화 중간에 소스 코드를 임의로 수정하거나 훼손하지 않는가?
- 지정된 로그 경로(`logs/`)에 템플릿 양식에 맞춰 대화 이력이 기록되는가?

### C. Stopping & Output Quality (종료 및 품질)
- 종료 조건이 만족되었을 때 구체적인 9개 섹션의 최종 정리를 출력하는가?
- 사용자가 우회 시도(Adversarial Skip)를 하더라도 질문 흐름을 유지하며 방어하는가?

---

## 2. 자동화 평가 도구 사용법 (Evals & Grading)

`skills/ultra-grill-me/evals/` 디렉토리에 구축된 자동화 테스트 스위트를 활용해 정량 채점을 수행한다.

### 테스트 데이터
- **[trigger_test_cases.json](file:///Users/bhoon/Project/skill-forge/skills/ultra-grill-me/evals/trigger_test_cases.json)**: Trigger 케이스 6개, Non-trigger 케이스 6개 등 총 12개의 엄격한 테스트 셋을 정의하고 있다.

### 자동화 채점기 실행
아래 명령어를 실행하여 모의 채점 엔진이 정상 동작하는지 검사한다.
```bash
python3 skills/ultra-grill-me/evals/check_evals.py --run-mock
```

- **Grader 작동 원리**: 채점기는 에이전트 응답의 정규식 패턴 검사를 통해 단일 질문 규칙 준수율(물음표 개수), 필수 선택지 포함 여부, 코드 비수정 정책 준수 여부를 채점하여 `PASS`/`FAIL`을 리포팅한다.

---

## 3. 수동 및 피드백 개선 루프 (Iteration Rules)

1. **과발동 (필요 없을 때 스킬이 켜짐)**:
   - `SKILL.md` frontmatter의 `description`과 본문의 `## 사용하지 않을 때` 섹션에 구체적인 제외 키워드와 상황(예: "simple factual Q&A")을 추가하여 예외 경계를 강화한다.
2. **저발동 (필요할 때 켜지지 않음)**:
   - `description` 앞부분에 에이전트가 쉽게 인지할 수 있는 명시적 영어/한국어 trigger phrase(예: "stress-test", "grill", "압박 검증")를 보강한다.
3. **절차 건너뜀 (질문을 뭉치거나 중간에 요약으로 도망침)**:
   - `## Gotchas` 또는 `## 주의사항`에 구체적인 예외 케이스(예: "사용자가 우회하려 할 때 방어 수칙")를 추가하여 에이전트의 흐름 구속력을 높인다.

