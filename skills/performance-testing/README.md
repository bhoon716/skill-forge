# Performance Testing

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`performance-testing` is a coding-agent skill for measuring, comparing, and explaining runtime performance with controlled experiments and reproducible logs.

Its core loop is **Define → Baseline → Candidate → Confirm → Analyze → Decide → Re-measure → Record**.

## Use this skill for

- Benchmarking latency, throughput, CPU, memory, allocation, or resource cost
- Comparing a baseline with a candidate implementation or configuration
- Diagnosing performance regressions and mixed tradeoffs
- Designing microbenchmarks, load tests, stress tests, or soak tests
- Profiling an observed bottleneck and testing cause hypotheses
- Implementing a requested optimization and proving the before-and-after result

## Key behavior

- Uses equivalent conditions and repeated measurements
- Records absolute values, relative differences, variation, and confidence
- Writes a project-owned performance log when measurements are run
- Preserves failed attempts and rejected hypotheses
- Investigates a slower candidate before considering alternatives or rollback
- Treats emergency rollback as containment, not as root-cause analysis
- Adds a permanent CI gate only when the benchmark is representative and stable

## Do not use it for

- Correctness-only failures; use `bugfix`
- New functionality without a performance objective; use `feature-dev`
- Behavior-preserving cleanup; use `refactoring`
- General performance definitions that can be answered directly
- Production or third-party load generation without explicit authorization

## Install

```bash
skill-forge install performance-testing --lang en --agent codex
skill-forge install performance-testing --lang ko --agent claude
skill-forge install performance-testing --lang zh --agent cursor
```

## Included resources

- `assets/performance-log-template.md`: reproducible experiment and cause-analysis log
- `references/measurement-quality.md`: workload, metric, variability, threshold, and CI-gate guidance
- `references/regression-analysis.md`: regression confirmation, competing hypotheses, causal confidence, and response selection
- `examples/`: trigger and non-trigger boundary cases
