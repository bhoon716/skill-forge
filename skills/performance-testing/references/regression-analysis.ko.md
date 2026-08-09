# 성능 회귀 분석

candidate가 더 느리거나 혼합된 tradeoff를 보이거나 예상 밖 결과를 만들 때 이 문서를 읽는다.

## 1. 설명하기 전에 확인

효과가 반복되는지 판단할 만큼 trial을 다시 실행한다. 다음을 확인한다.

- 동일한 명령, build, input, 지표 정의;
- cold 상태와 warm 상태;
- error, retry, timeout, throttling, 미완료 작업;
- background load와 runner 변화;
- instrumentation 또는 profiling overhead;
- 차이가 일반적인 변동보다 충분히 큰지.

확인되지 않은 효과는 판단 불가로 분류한다. 측정 noise일 수 있는 결과에 root cause를 만들어내지 않는다.

## 2. 회귀 위치 좁히기

동작을 구분할 수 있는 차원으로 aggregate 결과를 나눈다.

- operation, endpoint, request type, dataset;
- median과 tail percentile;
- cold start, warm steady state, burst, saturation;
- client, network, server, database, cache, external dependency;
- CPU, wall time, allocation, memory, GC, I/O, lock, queue, retry;
- fixed load와 fixed concurrency;
- 성공한 작업과 실패한 작업.

회귀가 어디에서 보이는지만 묻지 말고 어디에서 시작하는지 찾는다.

## 3. 경쟁 가설 구성

구현을 바꾸기 전에 짧은 가설 표를 만든다.

| 가설 | 예상 신호 | 구분 실험 | 지지 증거 | 반대 증거 | 상태 |
| --- | --- | --- | --- | --- | --- |
| 예: cache warm-up 비용 | cold run 회귀, warm run 회복 | cold와 warm trial 분리 | 첫 trial이 느림 | warm도 회귀 | 확인 중 |

타당하면 환경 또는 측정 문제 가설도 하나 이상 포함한다. 코드 변경이 새롭다는 이유만으로 그 변경에 고정하지 않는다.

## 4. 가설을 구분하는 실험 실행

주요 가설이 서로 다른 결과를 예측하는 실험을 우선한다.

- 새 경로 하나를 enable 또는 disable;
- data size 또는 concurrency 변경;
- cold와 warm run 분리;
- I/O와 CPU work 분리;
- allocation 또는 GC와 wall time 비교;
- 변경 전후 query plan 확인;
- profiler로 hot path를 찾은 뒤 ablation으로 인과관계 확인;
- 동등한 error rate에서 성공한 작업 비교.

여러 광범위한 최적화를 동시에 하지 않는다. 결과가 바뀌었을 때 어떤 개입이 중요했는지 식별할 수 있어야 한다.

## 5. 원인 확신 수준 평가

- **낮음:** 시간상 연관, profile 한 번, 타당한 static 설명만 있음.
- **중간:** 반복 가능한 상관관계가 있고 경쟁 설명이 더 약하다는 증거가 있음.
- **높음:** 통제된 개입, ablation 또는 reversal이 관련 조건을 안정적으로 유지한 채 예측대로 결과를 바꿈.

증거에 맞는 표현을 사용한다. 원인이 확인되지 않았으면 “일치한다” 또는 “가능성이 높다”고 적는다.

## 6. 전체 tradeoff 평가

candidate가 목표를 개선하면서 다른 중요한 차원을 악화시킬 수 있다. 다음을 기록한다.

- 개선·회귀·안정된 지표;
- 영향받은 workload segment;
- 원래 목표 달성 여부;
- 사용자, capacity, cost, reliability 영향;
- 회귀가 일회성, cold-start, steady-state, saturation 비용인지.

혼합 결과를 하나의 “더 빠름” 또는 “더 느림”으로 축약하지 않는다.

## 7. 대응 선택

확인과 분석 후에만 선택한다.

- tradeoff가 허용 가능하므로 candidate 유지;
- 유지하면서 국소 원인 수정;
- 설정 또는 rollout 조건 변경;
- 확신 부족으로 추가 실험;
- 대안 구현 측정;
- 확인된 비용이 이익보다 커서 revert;
- 진행 중인 운영 영향을 완화하기 위한 임시 rollback 후 분석 계속.

측정하기 전 대안은 가설이다. rollback은 이전 상태를 복원할 뿐 회귀를 설명하지 않는다.

## 8. 조사 보존

관찰된 회귀, 반복 측정, 가설 표, 실험, 기각된 설명, 원인 확신, 대응 결정, 최종 재측정을 성능 로그에 기록한다.

모든 이론적 질문에 답했을 때가 아니라 결정을 뒷받침할 증거가 충분할 때 멈춘다. 원인이 해결되지 않았으면 불확실성을 가장 많이 줄일 다음 최소 실험을 식별한다.
