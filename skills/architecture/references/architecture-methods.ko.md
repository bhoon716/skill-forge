# Architecture 방법

핵심 workflow보다 자세한 설명이 필요할 때 읽는다.

## Quality-attribute scenario

품질 목표를 테스트 가능한 scenario로 바꾼다.

| 필드 | 질문 |
| --- | --- |
| Stimulus | 어떤 event, load, fault, threat, change가 발생하는가? |
| Source | 누가 또는 무엇이 발생시키는가? |
| Environment | normal, peak, degraded, recovery 중 어떤 조건인가? |
| Artifact | 어떤 service, module, data store, deployment가 영향을 받는가? |
| Response | 시스템은 무엇을 해야 하는가? |
| Measure | 얼마나 빠르게, 자주, 많이, 또는 어떤 recovery target으로 해야 하는가? |

예: “regional dependency outage 중 checkout API는 새 결제 시도를 2초 안에 안전한 오류로 거절하고 order state를 보존하며 5분 안에 alert를 노출해야 한다.” 이 예시 수치를 다른 시스템의 목표로 취급하지 않는다.

## 유용한 architecture view

모든 것을 문서화하지 말고 결정에 답하는 view만 선택한다.

- **Context:** actor, external system, responsibility, trust boundary, system 밖으로 나가는 data
- **Container/module:** deployable unit 또는 code module, interface, dependency direction, ownership, change locality
- **Data:** authoritative source, read model, schema/version ownership, consistency, retention, migration
- **Runtime:** request sequence, async work, concurrency, queue semantics, timeout, retry, backpressure, failure propagation
- **Deployment:** environment, placement, scaling unit, network/identity dependency, rollout, rollback, recovery

관계가 시각적 배치보다 중요하면 table을 사용한다. flow나 boundary를 실질적으로 명확하게 할 때만 Mermaid를 사용한다. diagram은 prose와 일치시키고 unknown을 표시한다.

## 대안 비교 matrix

모든 candidate를 동일한 기준으로 비교한다. High/Medium/Low를 쓸 때는 문맥에서 의미를 정의한다.

| 기준 | Baseline | Option A | Option B |
| --- | --- | --- | --- |
| 현재 delivery 속도 |  |  |  |
| Boundary 강도 |  |  |  |
| 운영 복잡도 |  |  |  |
| 독립 scaling |  |  |  |
| 장애 격리 |  |  |  |
| Data consistency 비용 |  |  |  |
| Testability |  |  |  |
| Migration risk |  |  |  |
| Cost/cognitive load |  |  |  |

의미 설명 없이 점수를 추가하지 않는다. 가중치가 중요하면 가중치를 밝히고, 우선순위가 달라질 때 결과가 어떻게 바뀌는지 설명한다.

## Boundary heuristic

좋은 boundary는 보통 다음을 가진다.

- 하나의 분명한 responsibility와 vocabulary
- behavior와 data의 owner
- 작고 의도적인 interface
- 설명 가능한 dependency 방향
- 호출자가 이해할 수 있는 transaction/consistency model
- 독립 test 또는 의도적으로 정한 integration-test boundary
- 무관한 module까지 함께 변경하게 만들지 않는 change pattern

경고 신호는 shared mutable table, cyclic import, business authority를 가진 “utility” module, 내부 상태를 노출하는 callback, 중복 ownership, 동시 release 의존, persistence detail을 노출하는 interface다.

## Migration slice

시스템을 동작 상태로 유지하는 vertical하고 reversible한 slice를 우선한다.

1. 현재 동작을 특성화하고 seam에 observability를 추가한다.
2. 명시적인 contract 또는 anti-corruption layer를 도입한다.
3. 기존 경로와 compatibility를 유지하며 capability나 flow 하나를 이동한다.
4. reconciliation과 제거 계획 없이 dual-read/dual-write하지 않는다.
5. traffic 또는 ownership을 점진적으로 전환하고 rollback을 정의한다.
6. 안전성을 확인하는 evidence가 모이면 기존 path, schema, dependency를 제거한다.

각 slice에 invariant, owner, rollout signal, rollback action, data reconciliation, cleanup condition을 적는다. 제약상 incremental migration이 불가능하고 risk를 명시적으로 수용한 경우가 아니면 “전부 rewrite” 계획을 피한다.
