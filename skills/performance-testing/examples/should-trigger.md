# Prompts that should trigger `performance-testing`

## Benchmark and comparison

- "Compare the p95 latency of this endpoint before and after the caching change."
- "이 JSON parser를 기존 구현과 benchmark하고 CPU와 allocation 차이도 기록해줘."
- "比较这两个查询实现的吞吐量，并保留可复现的测试日志。"

Expected behavior: define the workload and metrics, establish comparable baseline and candidate measurements, and create a performance log when measurements run.

## Performance regression

- "This rewrite is 12% slower. Find out why before deciding whether to revert it."
- "최적화 이후 p99가 더 나빠졌어. 바로 롤백하지 말고 원인을 분석해줘."
- "候选版本内存下降了，但延迟上升了。分析这个权衡。"

Expected behavior: confirm the regression against variation, localize it, test competing hypotheses, and choose a response only after analysis.

## Profiling and diagnosis

- "Profile this import path and explain which cost actually limits startup time."
- "부하가 200 RPS를 넘으면 CPU가 급증하는 이유를 trace로 좁혀줘."

Expected behavior: use profiling or tracing to localize an observed effect, then distinguish correlation from confirmed cause.

## Load, stress, and soak testing

- "Create a safe local load test for 100 concurrent users and report throughput, p95, and errors."
- "이 worker가 장시간 실행될 때 memory leak이 있는지 soak test해줘."

Expected behavior: define scope, safety limits, stop conditions, workload, metrics, and artifact locations before generating load.

## Implemented optimization

- "Measure this batch job, optimize the bottleneck, then show the before-and-after result."
- "이 API를 더 빠르게 고치되 correctness를 보존하고 성능 로그를 남겨줘."

Expected behavior: measure first, make a focused evidence-backed change, re-run the same measurement and correctness tests, and record failed attempts as well as the final result.
