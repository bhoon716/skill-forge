# Performance Testing

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`performance-testing`은 통제된 실험과 재현 가능한 로그로 runtime 성능을 측정·비교·설명하는 코딩 에이전트 스킬입니다.

핵심 루프는 **Define → Baseline → Candidate → Confirm → Analyze → Decide → Re-measure → Record**입니다.

## 사용할 때

- latency, throughput, CPU, memory, allocation, resource cost benchmark
- baseline과 candidate 구현 또는 설정 비교
- 성능 회귀와 혼합된 tradeoff 진단
- microbenchmark, load test, stress test, soak test 설계
- 관찰된 bottleneck profiling과 원인 가설 검증
- 요청받은 최적화 구현과 개선 전후 증명

## 핵심 동작

- 동등한 조건과 반복 측정을 사용합니다.
- 절대 수치, 상대 차이, 변동성, 확신을 기록합니다.
- 실제 측정을 수행하면 대상 프로젝트에 성능 로그를 작성합니다.
- 실패한 시도와 기각된 가설도 보존합니다.
- candidate가 느려져도 대안이나 rollback 전에 원인을 조사합니다.
- 긴급 rollback은 영향 완화로 취급하고 root-cause 분석을 계속합니다.
- 대표성 있고 안정된 benchmark만 영구 CI gate로 승격합니다.

## 사용하지 않을 때

- 정확성만 관련된 실패. `bugfix` 사용
- 성능 목표 없는 새 기능. `feature-dev` 사용
- 동작 보존 cleanup. `refactoring` 사용
- 바로 답할 수 있는 일반적인 성능 용어 설명
- 명시적 허가 없는 운영 또는 외부 시스템 부하 생성

## 설치

```bash
skill-forge install performance-testing --lang en --agent codex
skill-forge install performance-testing --lang ko --agent claude
skill-forge install performance-testing --lang zh --agent cursor
```

## 포함 리소스

- `assets/performance-log-template.md`: 재현 가능한 실험·원인 분석 로그
- `references/measurement-quality.md`: workload, 지표, 변동성, threshold, CI gate 지침
- `references/regression-analysis.md`: 회귀 확인, 경쟁 가설, 인과 확신, 대응 선택 지침
- `examples/`: trigger와 non-trigger 경계 사례
