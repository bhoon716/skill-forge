# Architecture Decision Record 템플릿

저장소의 기존 decision-log 위치에 이 구조를 복사한다. 로컬 naming과 status convention을 유지한다.

```md
# ADR: <짧은 결정 제목>

- Status: proposed | accepted | superseded | deprecated
- Date: <YYYY-MM-DD>
- Owners: <사람 또는 팀>
- Scope: <시스템, capability, boundary>

## Context

어떤 결정이 필요한가? 문제, system boundary, user/caller, constraint, compatibility 필요, 이용 가능한 evidence를 적는다. fact, assumption, unresolved question을 분리한다.

## Decision drivers

- <quality attribute 또는 business constraint>
- <operational, security, data, delivery constraint>

## Quality scenarios

| Scenario | Target 또는 현재 evidence | Priority |
| --- | --- | --- |
| <environment에서 발생하는 stimulus> | <측정 가능한 response 또는 unknown> | <high/medium/low> |

## Options considered

### Option A — <이름>

<Responsibility, boundary, communication, data ownership, runtime/deployment behavior.>

### Option B — <이름>

<Option A와 같은 필드.>

## Decision

<option>을 선택한다. 현재 driver에 맞는 이유와 의도적으로 최적화하지 않는 것을 설명한다.

## Consequences

### Benefits

- <benefit>

### Costs and risks

- <cost, risk, accepted limitation>

### Mitigations and guardrails

- <mitigation, owner, validation>

## Migration and validation

<Incremental step, compatibility, rollout signal, rollback, data reconciliation, test 또는 measurement.>

## Revisit triggers

- <이 결정을 다시 열어야 하는 measured threshold, product change, incident, date>

## Open questions

- <현재 결정을 막지 않는 question>
```
