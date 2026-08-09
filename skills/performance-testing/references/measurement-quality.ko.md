# 측정 품질

benchmark를 설계하거나 지표·성능 budget을 선택하거나 noisy한 비교를 판단할 때 이 문서를 읽는다.

## 결정에 답하는 테스트 선택

| 테스트 | 적합한 대상 | 흔한 한계 |
| --- | --- | --- |
| Microbenchmark | algorithm, serialization, allocation, hot function | I/O, scheduling, integration 비용을 놓칠 수 있음 |
| Component benchmark | database, cache, service, subsystem boundary | fixture가 운영 데이터와 다를 수 있음 |
| End-to-end 또는 load test | 사용자 latency, throughput, concurrency | 환경 noise와 설정 비용이 큼 |
| Stress test | 포화점, backpressure, overload 실패 | 시스템에 부담을 주며 정상 traffic을 단독으로 대표하지 못함 |
| Soak test | leak, queue 누적, 장시간 저하 | 비용과 시간이 많이 들고 반복이 느림 |
| Profile 또는 trace | 시간, allocation, I/O, contention 위치 확인 | 관찰 증거만으로 인과관계를 증명하지 못함 |

의사결정을 대표하는 가장 낮은 수준에서 시작한다. 좁은 테스트가 사용자 영향을 대표하지 못할 때만 더 넓은 수준을 추가한다.

## 측정 전에 지표 정의

주요 지표 하나와 tradeoff를 드러내는 데 필요한 guardrail만 선택한다.

- Latency: median과 관련 tail percentile(p95, p99 등).
- Throughput: 명시된 concurrency에서 단위 시간당 완료된 operation.
- Reliability: error, timeout, retry, drop, rejection rate.
- Resource: CPU time, wall time, memory, allocation, GC, I/O, network 또는 cost.
- Scalability: load, data size, concurrency, topology 변화에 따른 지표 변화.

단위와 정의를 동일하게 유지한다. client 관찰 latency와 server 처리 시간을 같은 지표처럼 비교하지 않는다.

## 실험 통제

관련되는 다음 조건을 기록하고 가능하면 고정한다.

- source revision과 미커밋 변경;
- compiler, optimization, build mode;
- runtime, dependency, OS, kernel, container, database version;
- hardware, CPU allocation, memory limit, power mode, runner class;
- dataset, seed, request mix, payload size, concurrency, duration;
- cache, connection pool, JIT, filesystem, cold 또는 warm 상태;
- background work, network path, observability, instrumentation overhead.

시간에 따른 환경 drift 가능성이 있으면 baseline과 candidate 순서를 교차하거나 무작위화한다. 그 차이가 질문이 아니라면 debug build와 release build를 비교하지 않는다.

## Warm-up과 반복

- 둘 다 중요하면 cold-start와 warm steady-state를 분리한다.
- steady-state 측정 전 JIT, cache, pool, adaptive optimizer를 warm-up한다.
- 한 process 안의 많은 iteration만 사용하지 말고 독립 trial을 여러 번 실행한다.
- aggregation이 bimodal 또는 drift를 숨길 수 있으면 trial별 값을 보존한다.
- 예상 효과가 noise보다 작으면 반복 횟수를 늘린다.

원하는 결론에 불리하다는 이유로 outlier를 버리지 않는다. 조사하거나, 사전에 정한 제외 규칙을 적용하거나, 포함·제외 결과를 모두 보고한다.

## 결과 비교

각 지표에 다음을 보고한다.

- baseline 값;
- candidate 값;
- 절대 차이;
- 상대 차이;
- 반복 횟수와 분산;
- 사전에 존재한 threshold 또는 실질적 중요성.

일반적으로 치우친 latency 분포에는 median, tail 동작에는 percentile을 우선한다. additive resource total에는 mean이 유용할 수 있지만 자동으로 사용하지 않는다.

비교를 분류한다.

- **개선:** 반복 가능한 유리한 차이가 의사결정에 중요함.
- **회귀:** 반복 가능한 불리한 차이가 의사결정에 중요함.
- **혼합:** 의미 있는 지표가 서로 다른 방향으로 움직임.
- **의미 있는 차이 없음:** 관찰 차이가 결정을 바꿀 만큼 크지 않음.
- **판단 불가:** noise, 조건 불일치, error, sample 부족으로 결론을 뒷받침할 수 없음.

통계적 유의성이 실질적 중요성을 보장하지 않는다. 아주 작은 반복 가능한 변화는 무의미할 수 있고, aggregate 평균이 거의 같아도 영향이 큰 tail 회귀는 중요할 수 있다.

## Threshold와 CI gate

SLO, capacity plan, resource budget, 사용자 영향 모델, 확립된 baseline에서 나온 threshold를 우선한다. candidate를 본 뒤 threshold를 만들지 않는다.

다음 조건에서만 영구 CI gate를 추가한다.

- workload가 대표성 있고 충분히 deterministic함;
- runner 변동성이 허용 가능함;
- 비례하는 비용으로 완료됨;
- 지표와 budget이 안정된 제품 또는 운영 contract임;
- 실패 메시지가 재현 가능한 local 또는 dedicated-runner 명령을 안내함.

그렇지 않으면 benchmark 명령과 로그를 보존하거나 적합한 인프라에 schedule하거나 noisy run을 blocking failure로 만들지 않는 trend monitoring을 사용한다.

## Raw artifact

큰 machine-readable output은 Markdown 로그와 분리한다. 기존 프로젝트 관례를 우선하고, 없으면 `.performance-results/<experiment>/` 같은 명확한 로컬 또는 artifact 경로를 사용해 로그에서 링크한다.

커밋되는 로그나 artifact에 secret, authorization header, 운영 payload, 개인정보, 민감한 profile을 기록하지 않는다.
