---
name: performance-testing
description: 사용자가 latency, throughput, CPU, memory, scalability, load, stress, soak, 성능 회귀 등 runtime 성능을 측정, benchmark, 비교, profile, 진단 또는 개선해 달라고 요청할 때 사용한다. 통제된 조건을 정의하고 반복 가능한 baseline과 candidate 측정을 수집하며, 변동성과 원인을 분석하고, 실제 측정을 실행하면 증거 기반 성능 로그를 남기며, 조사 후에만 대응을 권고한다. 정확성만 다루는 테스트, 성능 문제가 없는 기능 버그, 추측성 cleanup, 의존성 업그레이드, 명시적 허가 없는 운영 환경 부하 생성에는 사용하지 않는다.
---

# Performance Testing

## 목적

재현 가능한 증거로 성능 변화를 측정하고 설명한다.

다음 핵심 루프를 사용한다.

1. 결정과 지표를 정의한다.
2. 질문에 답할 수 있는 가장 작은 테스트를 선택한다.
3. 통제된 baseline을 확보한다.
4. 동등한 조건에서 candidate를 측정한다.
5. 차이를 확인하고 분류한다.
6. 대응을 선택하기 전에 원인을 조사한다.
7. 다시 측정하고 결론을 기록한다.

모든 candidate를 더 빨라 보이게 만드는 것이 목표가 아니다. 무엇이 변했고, 왜 변했고, 실제로 중요한지, 어떤 행동이 증거에 부합하는지 판단하는 것이 목표다.

## 절대 규칙

- 도구를 선택하거나 코드를 편집하기 전에 성능 질문을 정의한다.
- 저장소가 이미 사용하는 benchmark, profiling, load-test 도구를 우선한다.
- 동등한 workload, 데이터, build, 환경, runtime 상태를 비교한다.
- 원본 수치, 단위, 반복 횟수, 관련 변동성을 기록하고 백분율만 보고하지 않는다.
- 관찰된 측정값, 해석, 가설, 확인된 원인을 구분한다.
- 한 번의 결과가 나쁘다는 이유로 접근 방식을 자동 교체하거나 롤백하지 않는다.
- profile, trace, 상관관계만으로 인과관계를 확정하지 않는다.
- 기능적 정확성을 보존한다. 성능 개선은 잘못된 동작을 정당화하지 않는다.
- 명시적 허가와 안전한 한도 없이 운영 환경이나 외부 시스템에 부하를 생성하지 않는다.
- 실제로 실행하지 않은 benchmark, profile, 비교를 실행했다고 주장하지 않는다.
- 사용자가 구현까지 요청한 경우에만 성능 개선 코드를 변경하고 diff를 좁게 유지한다.

## 워크플로

### 1. 판단할 문제 정의

다음을 식별한다.

- 테스트할 시스템, operation, code path, endpoint 또는 workload;
- 측정이 지원해야 할 결정;
- 주요 지표와 중요한 guardrail 지표;
- 관련 workload와 운영 조건;
- 기존 performance budget, SLO, threshold 또는 baseline;
- 사용자가 측정만 원하는지, 진단을 원하는지, 개선 구현까지 원하는지.

결과를 본 뒤 pass/fail threshold를 만들어내지 않는다. 기준이 없다면 임의 기준을 만들지 말고 측정된 tradeoff를 보고한다.

### 2. 프로젝트 확인 및 테스트 수준 선택

적용되는 프로젝트 지침, 기존 benchmark, 성능 테스트, build mode, fixture, script, CI 설정, 관련 최근 이력을 확인한다.

가장 작으면서 대표성 있는 수준을 선택한다.

- 좁은 algorithm이나 hot function에는 microbenchmark;
- subsystem boundary에는 component 또는 integration benchmark;
- 사용자 체감 latency와 throughput에는 end-to-end 또는 load test;
- 포화점과 실패 동작에는 stress test;
- leak, 장시간 저하, 안정성에는 soak test;
- 성능 영향이 관찰된 뒤 위치를 좁힐 때 profiler 또는 trace.

사용자 workload를 대표하지 못하는 편리한 microbenchmark로 대체하지 않는다.

새 benchmark를 설계하거나 지표·threshold를 고르거나 noisy 결과를 판단할 때 [measurement-quality.md](references/measurement-quality.md)를 읽는다.

### 3. 통제된 실험 설계

실행 전에 다음을 기록한다.

- baseline과 candidate revision 또는 상태;
- build mode, runtime·dependency version, hardware 또는 runner, 관련 설정;
- workload, dataset, concurrency, duration, cache 상태, cold 또는 warm 조건;
- warm-up 정책, 반복 횟수, sample size, 측정 명령;
- 주요 지표, guardrail, 기존 판단 기준.

가능하면 한 번에 하나의 주요 실험 변수만 변경한다. 조건을 같게 유지할 수 없으면 차이를 기록하고 그만큼 확신을 낮춘다.

### 4. 성능 로그 시작

실제 benchmark, load test 또는 profile을 실행하면 조사 단위의 로그 하나를 만들거나 갱신한다.

1. 저장소에 기존 관례가 있으면 따른다.
2. 없으면 `docs/performance/YYYY-MM-DD-<short-slug>.md`를 사용한다.
3. [performance-log-template.md](assets/performance-log-template.md)를 시작 구조로 사용한다.
4. 큰 raw output, profile, trace는 Markdown에 붙이지 말고 링크한다.
5. 불확실하거나 실패한 최적화 시도도 같은 조사 로그에 누적한다.

설치된 스킬 디렉터리에 runtime 로그를 쓰지 않는다. 계획만 세우고 측정하지 않았다면 빈 로그를 만들지 않는다.

### 5. Baseline 확보

가장 좁고 대표성 있는 명령을 실행한다. 명령, 조건, raw result 위치, 요약 통계, 이상 징후를 기록한다.

runtime이나 시스템에 필요하면 warm-up을 수행하되 cold-start가 중요하면 cold 측정도 보존한다. 단일 실행보다 여러 trial을 우선한다. baseline이 불안정하면 candidate와 비교하기 전에 불안정성부터 조사한다.

baseline을 얻기 위해 branch나 working tree를 파괴적으로 바꾸지 않는다. 기존 artifact, 안전한 worktree, benchmark 기능을 사용하거나 한 상태만 측정할 수 있었다고 명확히 보고한다.

### 6. Candidate 측정

동등한 조건에서 같은 workload를 실행한다. 지표 정의, 단위, sampling, aggregation을 동일하게 유지한다. 절대 차이와 상대 차이를 모두 기록한다.

주요 지표가 숨기는 tradeoff를 찾을 수 있도록 correctness, error rate, CPU, memory, allocation, resource cost 같은 guardrail도 필요에 따라 기록한다.

### 7. 결과 확인 및 분류

결과를 다음 중 하나로 분류한다.

- 개선;
- 회귀;
- 혼합된 tradeoff;
- 의미 있는 차이 없음;
- 판단 불가.

개선이나 회귀라고 판단하기 전에 trial 간 변동, 환경 변화, warm-up, cache 상태, background load, dataset drift, error, 측정 도구 overhead를 확인한다.

### 8. 회귀와 예상 밖 결과 조사

candidate가 더 나쁘거나 혼합되거나 예상과 다르면 즉시 폐기, 대안 교체, 롤백하지 않는다.

1. 효과가 예상 측정 변동을 넘는지 확인한다.
2. 영향받은 지표, percentile, workload, phase, resource를 좁힌다.
3. 타당한 원인 가설을 여러 개 만든다.
4. 주요 가설을 구분할 수 있는 가장 작은 실험을 선택한다.
5. 필요한 경우에만 profiling, tracing, query plan, allocation data, counter, controlled ablation을 사용한다.
6. 지지 증거와 반대 증거를 함께 기록한다.
7. 명시적인 확신 수준과 함께 원인을 적는다.

결과가 회귀하거나 혼합된 tradeoff를 보이거나 root-cause 분석이 필요하면 [regression-analysis.md](references/regression-analysis.md)를 읽는다.

운영 영향이 availability, cost, data safety, 중요한 SLO를 위협하면 먼저 영향을 완화한다. 롤백은 긴급 완화책일 수 있지만 이후 원인 분석을 대신하지 않는다.

### 9. 증거에 따른 대응 선택

다음 중 선택한다.

- candidate 유지;
- 유지하면서 국소 원인 해결;
- 설정 또는 workload 가정 조정;
- 추가 구분 실험;
- 대안 구현 실험;
- revert 또는 rollback;
- 증거 부족으로 판단 보류.

원래 목표, 사용자 영향, guardrail 지표, 확인된 원인, 확신, 구현 비용, 운영 위험을 기준으로 선택한다. 측정하지 않은 대안이 더 빠를 것이라고 가정하지 않는다.

### 10. 재측정 및 정확성 검증

최적화나 수정 후에는 원래 대표 측정을 같은 조건에서 반복한다. 관련 correctness test도 실행한다. 요구 동작을 바꾸어 얻은 속도는 유효한 개선이 아니다.

대표성 있고, 충분히 빠르고, 사용 가능한 runner에서 안정적이며, 의미 있는 budget과 연결된 benchmark만 영구 CI 회귀 gate로 승격한다. 그렇지 않으면 brittle gate를 강제하지 말고 재현 가능한 명령과 조사 로그를 유지한다.

### 11. 로그 완료 및 보고

로그에 다음을 갱신한다.

- baseline과 candidate 결과;
- 절대·상대 차이;
- 변동성과 확신;
- 개선·회귀·변화 없는 지표;
- 원인 가설과 실험;
- 확인된 원인 또는 남은 불확실성;
- 선택한 대응과 근거;
- 최종 재측정과 correctness check.

최종 응답은 결과부터 제시한다. 무엇을 측정했고, 무엇이 변했고, 가장 신뢰할 수 있는 설명은 무엇이며, 어떤 행동을 선택했고, 어떤 한계가 있는지 적는다. 로그를 작성했다면 링크한다.

## 판단 규칙

- 일반적인 측정 변동 안의 결과는 회귀가 아니라 판단 불가로 취급한다.
- workload에 맞춰 percentile latency, throughput, error rate, resource use를 평가하고 평균 하나에 의존하지 않는다.
- 한 지표 개선과 다른 지표 악화를 제품 또는 운영 판단이 필요한 tradeoff로 취급한다.
- 결론이 다르면 cold-start, warm steady-state, burst, saturation 동작을 구분한다.
- 나중에 같은 탐색을 반복하지 않도록 실패한 시도와 기각된 가설을 로그에 남긴다.
- 측정 방법이 지지하는 정밀도까지만 정확한 숫자를 사용한다.
- 요청한 테스트가 의미 있는 비용, 외부 트래픽, 운영 위험을 만들면 먼저 허가와 중단 조건을 정한다.
- 대표성 있는 측정을 실행할 수 없으면 static hypothesis나 계획을 검증되지 않은 것으로 보고한다.

## 최종 보고

작업이 뒷받침하는 섹션만 포함한다.

- 결과와 결정;
- baseline과 candidate 비교;
- 실험 조건;
- 원인 분석과 확신;
- 수행하거나 권고한 대응;
- correctness 검증;
- 로그와 raw artifact 위치;
- 한계와 다음 구분 실험.
