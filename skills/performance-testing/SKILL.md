---
name: performance-testing
description: Use when the user asks to measure, benchmark, compare, profile, diagnose, or improve runtime performance, including latency, throughput, CPU, memory, scalability, load, stress, soak, or performance regressions. Establish controlled conditions, collect repeatable baseline and candidate measurements, analyze variance and causes, keep an evidence-backed performance log when measurements are run, and recommend a response only after investigation. Do not use for correctness-only testing, functional bugs without a performance concern, speculative cleanup, dependency upgrades, or production load generation without explicit authorization.
---

# Performance Testing

## Purpose

Measure and explain performance changes with reproducible evidence.

Use this core loop:

1. Define the decision and metrics.
2. Choose the smallest test that can answer the question.
3. Establish a controlled baseline.
4. Measure the candidate under equivalent conditions.
5. Confirm and classify the difference.
6. Investigate causes before choosing a response.
7. Re-measure and record the conclusion.

The objective is not to force every candidate to look faster. It is to determine what changed, why it changed, whether it matters, and what action the evidence supports.

## Non-negotiable rules

- Define the performance question before selecting a tool or editing code.
- Prefer repository-standard benchmark, profiling, and load-test tools.
- Compare equivalent workloads, data, builds, environments, and runtime states.
- Record raw values, units, repetitions, and relevant variability; do not report only percentages.
- Separate observed measurements, interpretations, hypotheses, and confirmed causes.
- Do not automatically replace an approach or roll it back because one result is worse.
- Do not claim causality from a profile, trace, or correlation alone.
- Preserve functional correctness; performance improvement does not excuse incorrect behavior.
- Do not generate load against production or third-party systems without explicit authorization and safe limits.
- Do not claim a benchmark, profile, or comparison was run unless it was actually run.
- Keep optimization changes focused and only make them when the user requested implementation, not measurement-only work.

## Workflow

### 1. Frame the decision

Identify:

- the system, operation, code path, endpoint, or workload under test;
- the decision the measurement should support;
- the primary metric and important guardrail metrics;
- the relevant workload and operating conditions;
- any existing performance budget, SLO, threshold, or baseline;
- whether the user wants measurement only, diagnosis, or an implemented improvement.

Do not invent a pass/fail threshold after seeing the result. If no threshold exists, report the measured tradeoff without manufacturing one.

### 2. Inspect the project and choose the test level

Read applicable project instructions, existing benchmarks, performance tests, build modes, fixtures, scripts, CI configuration, and recent relevant history.

Choose the smallest representative level:

- microbenchmark for a narrow algorithm or hot function;
- component or integration benchmark for a subsystem boundary;
- end-to-end or load test for user-visible latency and throughput;
- stress test for saturation and failure behavior;
- soak test for leaks, degradation, and long-running stability;
- profiler or trace for localization after a performance effect is observed.

Do not substitute a convenient microbenchmark for the user-visible workload it fails to represent.

Read [measurement-quality.md](references/measurement-quality.md) when designing a new benchmark, choosing metrics, setting a threshold, or evaluating noisy results.

### 3. Design a controlled experiment

Record before running:

- baseline and candidate revisions or states;
- build mode, runtime and dependency versions, hardware or runner, and relevant configuration;
- workload, dataset, concurrency, duration, cache state, and cold or warm behavior;
- warm-up policy, repetitions, sample size, and measurement command;
- primary metric, guardrails, and any decision threshold.

Change one major experimental variable at a time when practical. When conditions cannot be held constant, record the mismatch and reduce confidence accordingly.

### 4. Start the performance log

When an actual benchmark, load test, or profile is run, create or update one log for the investigation.

1. Follow an existing repository convention when present.
2. Otherwise use `docs/performance/YYYY-MM-DD-<short-slug>.md`.
3. Use [performance-log-template.md](assets/performance-log-template.md) as the starting structure.
4. Link large raw outputs, profiles, and traces instead of pasting them into the Markdown log.
5. Append attempts, including inconclusive or failed optimization attempts, to the same investigation log.

Do not write runtime logs inside the installed skill directory. If the task is planning-only and no measurement is run, do not create an empty log.

### 5. Establish the baseline

Run the narrowest representative command. Capture the command, conditions, raw result location, summary statistics, and any anomalies.

Warm up when the runtime or system requires it, while preserving cold-start measurements when cold behavior matters. Prefer multiple trials over a single run. If the baseline is unstable, investigate the instability before comparing a candidate.

Avoid destructive branch or working-tree changes merely to obtain a baseline. Use existing artifacts, a safe worktree, a benchmark facility, or clearly report that only one state could be measured.

### 6. Measure the candidate

Run the same workload under equivalent conditions. Keep metric definitions, units, sampling, and aggregation identical. Record both absolute and relative differences.

Also record guardrails such as correctness, error rate, CPU, memory, allocation, or resource cost when they could reveal a tradeoff hidden by the primary metric.

### 7. Confirm and classify the result

Classify the result as one of:

- improved;
- regressed;
- mixed tradeoff;
- no material difference;
- inconclusive.

Before calling a regression or improvement, check repetition-to-repetition variation, environment changes, warm-up, cache state, background load, dataset drift, errors, and measurement-tool overhead.

### 8. Investigate regressions and unexpected results

If the candidate is worse, mixed, or surprising, do not immediately discard it, switch implementations, or roll it back.

1. Confirm that the effect exceeds expected measurement variation.
2. Localize the affected metric, percentile, workload, phase, and resource.
3. Generate multiple plausible hypotheses.
4. Choose the smallest experiment that distinguishes the leading hypotheses.
5. Use profiling, tracing, query plans, allocation data, counters, or controlled ablation only as needed.
6. Record supporting and contradicting evidence.
7. State the cause with an explicit confidence level.

Read [regression-analysis.md](references/regression-analysis.md) whenever a result regresses, shows a mixed tradeoff, or requires root-cause analysis.

If an active production impact threatens availability, cost, data safety, or a critical SLO, contain the impact first. A rollback may be an emergency mitigation, but it does not replace the subsequent cause analysis.

### 9. Choose the response from evidence

Choose among:

- keep the candidate;
- keep it and address a localized cause;
- adjust configuration or workload assumptions;
- run another discriminating experiment;
- try an alternative implementation;
- revert or roll back;
- defer the decision because evidence is insufficient.

Base the choice on the original objective, user impact, guardrail metrics, identified cause, confidence, implementation cost, and operational risk. Do not assume an alternative will be faster without measuring it.

### 10. Re-measure and verify correctness

After any optimization or corrective change, repeat the original representative measurement under the same conditions. Run the relevant correctness tests as well. A faster result that changes required behavior is not a valid improvement.

Promote a benchmark to a permanent CI regression gate only when it is representative, reasonably fast, stable on the available runner, and tied to a meaningful budget. Otherwise keep a reproducible command and investigation log without forcing a brittle gate.

### 11. Complete the log and report

Update the log with:

- baseline and candidate results;
- absolute and relative differences;
- variability and confidence;
- improved, regressed, and unchanged metrics;
- cause hypotheses and experiments;
- confirmed cause or remaining uncertainty;
- selected response and rationale;
- final re-measurement and correctness checks.

Lead the final response with the outcome. State what was measured, what changed, the most credible explanation, the chosen action, and any material limitation. Link the performance log when one was written.

## Decision rules

- Treat a result inside ordinary measurement variation as inconclusive, not as a regression.
- Evaluate percentile latency, throughput, error rate, and resource use according to the workload; do not rely on a mean alone.
- Treat improvement in one metric and degradation in another as a tradeoff that requires a product or operational decision.
- Distinguish cold-start, warm steady-state, burst, and saturation behavior when they lead to different conclusions.
- Keep failed attempts and rejected hypotheses in the log so later work does not repeat them.
- Use exact numbers only to the precision supported by the measurement method.
- If the requested test would create meaningful cost, external traffic, or operational risk, obtain authorization and define stop conditions first.
- If no representative measurement can be run, report a plan or static hypothesis as unverified rather than presenting it as a performance result.

## Final report

Include only sections supported by the task:

- outcome and decision;
- baseline and candidate comparison;
- experiment conditions;
- cause analysis and confidence;
- response taken or recommended;
- correctness verification;
- log and raw artifact locations;
- limitations and next discriminating experiment.
