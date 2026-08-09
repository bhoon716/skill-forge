---
name: bugfix
description: 사용자가 깨진 동작, 잘못된 동작, 실패하거나 flaky 하거나 회귀된 동작을 진단하고 고치라고 요청할 때 사용한다. failing test, 잘못된 status code, crash, 무시되는 CLI flag, 중복 output, 잘못된 UI rendering, 무한 retry, stack trace, 예전에는 됐지만 지금은 안 되는 동작 등이 해당한다. Reproduce or Establish Evidence → Root Cause → Minimal Fix → Verify의 증거 기반 흐름을 따르고, 회귀 테스트가 비용에 비례하는 지속적 보호를 제공할 때 추가한다. 새 기능 개발, 동작 보존 리팩토링, 추측성 cleanup, 아키텍처 재설계, 의존성 업그레이드, 문서만 수정, 테스트 정리만 하는 작업, 수정 요청 없는 조사에는 사용하지 않는다.
---

# bugfix

## 목적

깨진 동작을 증거에 기반해 고치고 변경을 좁고 검토 가능하게 유지한다.

핵심 흐름:

1. 실패를 재현하거나 신뢰할 만한 evidence trail을 확보한다.
2. expected behavior와 가장 좁은 credible root cause를 정의한다.
3. 어떤 검증이 수정 성공을 가장 직접적으로 증명할지 결정한다.
4. 원인을 해결하는 최소 안전 수정을 적용한다.
5. 원래 동작과 관련 주변 동작을 검증한다.
6. 입증한 것과 입증하지 못한 것을 정직하게 보고한다.

새 회귀 테스트는 유용한 검증 수단이지 모든 수정의 완료 조건이 아니다. 검증 자체는 항상 필요하지만, 검증 방법은 버그·위험·저장소 상황에 따라 선택한다.

## 반드시 지킬 규칙

- 편집 전에 보고된 실패를 이해한다.
- 증상을 숨기지 말고 root cause를 고친다.
- 무관 동작을 보존하고 diff를 집중시킨다.
- 저장소 지침과 기존 관례를 따른다.
- check 통과만을 위해 유효한 테스트를 삭제하거나 약화하지 않는다.
- 실제로 실행하지 않은 명령·테스트·시나리오가 통과했다고 말하지 않는다.
- 직접 검증이나 명확히 한정한 증거 없이 버그가 고쳐졌다고 주장하지 않는다.
- security, authorization, privacy, billing, data loss, destructive action, concurrency, public contract 변경은 high risk로 취급하고 더 강한 증거를 요구한다.
- 무관한 기능, cleanup, refactoring, dependency 변경을 피한다.

## 워크플로

### 1. 실패 포착

문제를 정의하는 데 필요한 컨텍스트만 수집한다.

- 보고된 증상
- expected/actual behavior
- error, stack trace, log, screenshot, request/response 또는 failing command
- 관련 input, state, environment, version, config 또는 external dependency
- deterministic, intermittent, environment-specific 또는 알려진 regression 여부

해당하는 `AGENTS.md`, `CLAUDE.md`, `.cursor/rules`, `README.md`, `CONTRIBUTING.md`와 관련 source, test, build config, 필요할 때 최근 history를 확인한다.

좁은 탐색으로 충분할 때 저장소 전체를 조사하지 않는다.

### 2. 재현 또는 증거 확보

가장 저렴하고 직접적인 signal을 우선한다.

1. 기존 failing test 또는 사용자 제공 failing command
2. 최소 automated test 또는 script reproduction
3. manual UI, API 또는 CLI reproduction
4. live reproduction이 불가능할 때 log, trace, screenshot 또는 신뢰할 만한 static evidence trail

명령 또는 단계와 관찰 결과를 기록한다. 재현할 수 없다면 남은 증거가 구체적 수정을 지지할 때만 진행하고 불확실성을 밝힌다.

### 3. Expected behavior 정의

가장 강한 근거를 사용한다.

- 명시적 사용자 의도
- 기존 테스트 또는 문서화된 contract
- 유사하게 정상 동작하는 경로
- type 또는 API definition
- historical behavior
- domain 및 error-handling invariant

expected behavior가 실질적으로 모호하면 product semantics를 바꾸기 전에 질문한다. security, permission, privacy, billing, data loss에 영향을 주는 모호성은 반드시 질문한다.

### 4. Root cause 국소화

patch 전에 증상을 가장 좁은 credible cause까지 추적한다. broken path와 working path를 비교하고, control/data flow와 empty value, encoding, timezone, pagination, cache, retry, race, permission, feature flag 같은 관련 boundary를 확인한다.

원인을 한 문장으로 진술한다. 여러 무관 영역을 동시에 고쳐서 맞추려 하지 않는다.

### 5. 회귀 커버리지와 검증 선택

회귀 테스트가 합리적 비용으로 지속적인 보호를 제공할 때 추가하거나 갱신한다. 일반적으로 다음 조건에서 적절하다.

- 기존 테스트 인프라로 버그를 deterministic하게 표현할 수 있다.
- expected behavior가 안정적이고 의미 있다.
- 실패가 다시 발생할 가능성이 있다.
- 영향이나 위험 때문에 향후 탐지가 가치 있다.
- 테스트가 구현 세부에 과적합하지 않는다.

security, authorization, billing, data integrity, destructive behavior, concurrency, public contract 관련 high-risk logic에는 설득력 있는 기술적 사유가 없는 한 회귀 테스트를 강하게 기대한다.

다음 경우에는 절차 충족만을 위해 새 테스트를 만들지 않는다.

- 기존 failing test가 이미 해당 동작을 커버한다.
- 원인이 외부 config, environment, service state 또는 data이고 local code를 바꾸지 않는다.
- manual, visual, log 기반 또는 end-to-end signal이 더 직접적이다.
- 의미 있는 자동화를 위해 과도한 인프라나 broad refactoring이 필요하다.
- 가능한 테스트가 brittle하거나 구현 세부에만 결합된다.

회귀 테스트를 추가하거나 바꿀 때는 실용적이고 비용이 작다면 fix 전 실패를 확인한다. bad setup이 아니라 버그 때문에 실패하는지도 확인한다. 이 경우 Red-before-green은 선호되는 증거지만 보편적 완료 조건은 아니다.

새 automated test를 추가하지 않았다면 가장 직접적인 대체 검증을 사용한다. 신뢰도나 미래 coverage에 실질적 영향이 있을 때만 그 한계를 보고한다.

### 6. 최소 수정 적용

- root cause 해결에 필요한 것만 바꾼다.
- rewrite보다 local change와 기존 abstraction을 우선한다.
- formatting churn과 opportunistic cleanup을 피한다.
- 의도 동작 복구에 필요하지 않으면 public contract를 바꾸지 않는다.
- check 통과를 위해 validation, authorization, permission, error handling을 약화하지 않는다.
- generated 파일은 프로젝트 표준 workflow로만 갱신한다.
- 올바른 해법에 broad redesign이나 새 product behavior가 필요하면 중단하고 scope 변화를 설명한다.

### 7. 검증

가장 좁고 직접적인 check부터 실행한 뒤 위험에 맞춰 확장한다.

1. 원래 failing test, command 또는 reproduction scenario
2. 정당화되어 추가·갱신한 regression test
3. 밀접하게 관련된 test 또는 scenario
4. 관련 typecheck, build, lint, formatting, integration 또는 end-to-end check

가장 좋은 증거라면 screenshot, browser interaction, log, trace 또는 output comparison을 사용한다. 더 직접적인 검증이 가능한 behavioral bug에서 lint/typecheck만으로 수정 성공을 증명하지 않는다.

focused check로 충분한 신뢰를 얻을 수 있다면 expensive full suite를 기본 실행하지 않는다. 변경 범위가 넓거나 high risk일 때 검증을 확장한다.

검증을 완료할 수 없다면 미검증 항목을 정확히 보고하고 결과를 완전히 입증된 것처럼 표현하지 않는다.

### 8. Diff 검토

보고 전에 확인한다.

- 수정이 식별한 원인을 해결한다.
- 명시적으로 필요한 경우가 아니면 무관 동작과 public API shape가 유지된다.
- 무관 refactor, cleanup, generated-file churn이 없다.
- 테스트 변경이 있다면 구현 세부가 아니라 behavior를 보호한다.
- 모든 검증 주장이 관찰한 결과로 뒷받침된다.

## 결정 규칙

- 기존 테스트가 실패하면 테스트나 expected behavior가 틀렸다는 증거가 없는 한 production behavior를 고친다. 테스트를 몰래 약화하지 않는다.
- 제안한 regression test가 fix 전에도 통과하면 실제 버그를 표현하는지 다시 판단한다.
- 무관 check가 실패하면 pre-existing failure와 fix가 만든 failure를 구분한다.
- 원인이 codebase 밖에 있으면 불필요한 코드 변경을 피하고, 의도 동작에 포함될 때만 local handling을 개선한다.
- flaky bug에는 deterministic evidence를 찾고, 저장소에 정당한 timing strategy가 없는 한 sleep을 사용하지 않는다.
- 여러 버그를 발견하면 요청된 문제만 고치고 나머지는 별도로 보고한다.
- 바람직한 후속 refactor나 feature work는 minimal fix와 분리한다.

## 최종 보고

결과부터 말하고, 입증에 필요한 항목만 포함한다.

- root cause
- minimal fix
- 수행한 검증과 관찰 결과
- 추가하거나 갱신한 테스트가 있다면 그 내용
- 중요한 미검증 영역, pre-existing failure 또는 남은 위험

새 회귀 테스트가 필요하지 않았다면 빈 `Regression coverage`, `Red phase`, `Green phase` 섹션을 강제로 만들지 않는다.
