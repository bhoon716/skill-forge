# Architecture Review 체크리스트

finding을 만들기 위한 이유가 아니라 review 보조 자료로 사용한다. 각 항목을 supported, unclear, risk, not applicable로 표시하고 evidence를 인용한다.

## Scope와 drivers

- System boundary가 명시적인가?
- Actor, business capability, non-goal, constraint, ownership이 이름 붙어 있는가?
- 결정을 좌우하는 quality scenario가 측정 가능한가?
- Fact, assumption, unknown이 분리되어 있는가?

## Boundary와 dependency

- 각 component/module이 일관된 responsibility를 가지는가?
- Data와 behavior ownership이 모호하지 않은가?
- Interface가 작고 안정적이며 storage detail과 독립적인가?
- Dependency direction이 의도적이고 설명되지 않는 cycle이 없는가?
- 필요한 boundary에서 영향을 받은 unit을 test, deploy, change할 수 있는가?

## Data와 contract

- 중요한 datum마다 authoritative owner가 하나인가?
- Consistency, transaction, ordering, duplication, replay, idempotency rule이 명시적인가?
- Schema evolution, retention, privacy, migration을 다루는가?
- 필요한 external contract를 versioning하거나 compatibility-test하는가?

## Runtime과 resilience

- Synchronous/asynchronous path가 분명한가?
- Timeout, retry, backoff, circuit breaking, queue, backpressure 의미가 의도적인가?
- 무엇이 함께 실패하고, dependency 또는 instance failure 중 무엇이 가용한가?
- Recovery point, recovery time, degraded behavior가 정의되어 있는가?
- Log, metric, trace, alert, owner가 설계를 진단하기에 충분한가?

## Security와 operations

- Trust boundary, identity, authorization, secret, sensitive-data flow가 명시적인가?
- Least-privilege model이 제안된 boundary와 맞는가?
- Deployment, scaling, rollout, rollback, backup, disaster recovery가 운영 가능한가?
- 팀의 support와 on-call 역량에 맞는가?

## Migration과 결정 품질

- 가능한 경우 migration이 incremental한가?
- 각 step에 compatibility plan, success signal, rollback, cleanup condition이 있는가?
- 의미 있는 대안을 동일한 기준으로 비교했는가?
- Rejected alternative와 accepted risk를 기록했는가?
- Revisit trigger와 validation plan이 정의되어 있는가?
