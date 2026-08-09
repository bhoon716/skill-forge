# Measurement Quality

Read this reference when designing a benchmark, selecting metrics, setting a performance budget, or judging a noisy comparison.

## Choose the test that answers the decision

| Test | Best for | Common limitation |
| --- | --- | --- |
| Microbenchmark | Algorithms, serialization, allocation, hot functions | May omit I/O, scheduling, and integration costs |
| Component benchmark | Database, cache, service, or subsystem boundaries | Test fixture may differ from production data |
| End-to-end or load test | User-visible latency, throughput, concurrency | More environmental noise and setup cost |
| Stress test | Saturation point, backpressure, overload failure | Can be disruptive and does not represent normal traffic alone |
| Soak test | Leaks, queue buildup, thermal or long-running degradation | Expensive and slow to repeat |
| Profile or trace | Localizing time, allocation, I/O, and contention | Observational evidence does not prove causality by itself |

Start at the lowest level that still represents the decision. Add a broader level when a narrow test cannot represent user impact.

## Define metrics before measuring

Choose one primary metric and only the guardrails needed to expose tradeoffs.

- Latency: median plus relevant tail percentiles such as p95 or p99.
- Throughput: completed operations per unit of time at a stated concurrency.
- Reliability: error, timeout, retry, drop, and rejection rates.
- Resources: CPU time, wall time, memory, allocation, GC, I/O, network, or cost.
- Scalability: how metrics change with load, data size, concurrency, or topology.

Use consistent units and definitions. Do not compare client-observed latency with server processing time as though they were the same metric.

## Control the experiment

Record and, where relevant, hold constant:

- source revision and uncommitted changes;
- compiler, optimization, and build mode;
- runtime, dependency, OS, kernel, container, and database versions;
- hardware, CPU allocation, memory limit, power mode, and runner class;
- dataset, seed, request mix, payload size, concurrency, and duration;
- cache, connection pool, JIT, filesystem, and cold or warm state;
- background work, network path, observability, and instrumentation overhead.

Randomize or alternate baseline and candidate runs when time-dependent environmental drift is plausible. Do not compare a debug build with a release build unless that difference is the question.

## Warm-up and repetition

- Separate cold-start and warm steady-state results when both matter.
- Warm up JITs, caches, pools, and adaptive optimizers before steady-state measurement.
- Use multiple independent trials, not only many iterations inside one process.
- Preserve per-trial values when aggregation could hide bimodal or drifting behavior.
- Increase repetitions when the expected effect is small relative to noise.

Do not discard outliers only because they weaken the desired conclusion. Investigate them, apply a predefined exclusion rule, or report results with and without them.

## Compare results

For each metric, report:

- baseline value;
- candidate value;
- absolute difference;
- relative difference;
- repetitions and spread;
- threshold or practical relevance, when one existed beforehand.

Prefer median for typical skewed latency distributions and percentiles for tail behavior. A mean may still be useful for additive resource totals, but never use it automatically.

Classify the comparison:

- **Improved:** repeatable favorable difference large enough to matter.
- **Regressed:** repeatable unfavorable difference large enough to matter.
- **Mixed:** meaningful metrics move in different directions.
- **No material difference:** observed difference is too small to affect the decision.
- **Inconclusive:** noise, mismatch, errors, or insufficient samples prevent a supported conclusion.

Statistical significance does not establish practical significance. A tiny repeatable change may still be irrelevant; a high-impact tail regression may matter even when an aggregate average barely changes.

## Thresholds and CI gates

Prefer a threshold derived from an SLO, capacity plan, resource budget, user-impact model, or established baseline. Do not invent a threshold after seeing the candidate.

Add a permanent CI gate only when:

- the workload is representative and deterministic enough;
- the runner provides tolerable variability;
- the check finishes at proportionate cost;
- the metric and budget are stable product or operational contracts;
- the failure message points to a reproducible local or dedicated-runner command.

Otherwise preserve a benchmark command and log, schedule it on suitable infrastructure, or use trend monitoring without turning noisy runs into blocking failures.

## Raw artifacts

Keep large machine-readable outputs separate from the Markdown log. Prefer an existing project convention; otherwise use a clearly named local or artifact directory such as `.performance-results/<experiment>/` and link it from the log.

Never record secrets, authorization headers, production payloads, personal data, or sensitive profiles in committed logs or artifacts.
