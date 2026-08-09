# 성능 실험: [짧은 제목]

- 날짜: YYYY-MM-DD
- 상태: 계획 | 측정 중 | 분석 중 | 완료 | 판단 불가
- 담당: [필요한 경우 사람 또는 agent]
- 대상: [system, operation, endpoint 또는 code path]
- Baseline revision/state: [commit, tag, artifact 또는 설정]
- Candidate revision/state: [commit, working tree, artifact 또는 설정]
- 최종 분류: 개선 | 회귀 | 혼합 | 의미 있는 차이 없음 | 판단 불가

## 1. 질문과 결정

- 성능 질문:
- 이 실험이 지원할 결정:
- 주요 지표:
- Guardrail 지표:
- 기존 budget, SLO 또는 threshold:
- 테스트 수준: microbenchmark | component | end-to-end | load | stress | soak | profile

## 2. 실험 조건

- 명령 또는 절차:
- Build mode:
- Runtime 및 dependency version:
- Hardware 또는 runner:
- 관련 설정:
- Dataset 및 seed:
- Workload 및 request mix:
- Concurrency 및 duration:
- Cold/warm 및 cache 상태:
- Warm-up:
- Trial 및 sample:
- Baseline과 candidate 사이의 알려진 차이:

## 3. 측정 결과

| 지표 | Baseline | Candidate | 절대 차이 | 상대 차이 | 분산 / 확신 | 분류 |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| [지표와 단위] | | | | | | |

### Raw artifact

- Baseline output:
- Candidate output:
- Profile 또는 trace:

## 4. 관찰

- 개선된 지표:
- 회귀한 지표:
- 안정된 지표:
- 영향받은 workload 또는 percentile:
- 이상 징후와 error:
- 차이가 예상 변동을 벗어나는가?: 예 | 아니오 | 불확실

## 5. 원인 분석

| 가설 | 예상 신호 | 구분 실험 | 지지 증거 | 반대 증거 | 상태 |
| --- | --- | --- | --- | --- | --- |
| | | | | | 확인 중 |

- 가장 신뢰할 수 있는 원인:
- 확신: 낮음 | 중간 | 높음
- 원인과 결과를 연결하는 증거:
- 아직 설명되지 않은 동작:

## 6. 시도 기록

### 시도 1: [이름]

- 변경 또는 실험:
- 예측:
- 결과:
- 해석:
- 유지, 기각 또는 추가 조사:

## 7. 결정

- 선택한 대응: 유지 | 국소 수정 | 조건 조정 | 추가 증거 | 대안 | revert | 임시 rollback
- 근거:
- 사용자, capacity, cost, reliability 영향:
- 긴급 완화 조치가 있었다면:
- rollback 또는 대안을 선택하거나 선택하지 않은 이유:

## 8. 최종 검증

- 최종 측정 명령:
- 최종 결과:
- Correctness check:
- Performance budget 결과:
- 중요한 한계:
- 가장 작은 다음 실험:

## 요약

[무엇이 변했고, 왜 변했고, 어떤 결정이 증거에 부합하며, 그 결론의 확신이 어느 정도인지 적는다.]
