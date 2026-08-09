# Performance Regression Analysis

Read this reference when a candidate is slower, shows a mixed tradeoff, or produces an unexpected result.

## 1. Confirm before explaining

Re-run enough trials to determine whether the effect is repeatable. Check:

- identical commands, builds, inputs, and metric definitions;
- cold versus warm state;
- errors, retries, timeouts, throttling, and incomplete work;
- background load and runner changes;
- instrumentation or profiling overhead;
- whether the difference is large relative to ordinary variation.

Classify an unconfirmed effect as inconclusive. Do not invent a root cause for a result that may be measurement noise.

## 2. Localize the regression

Break down the aggregate result by the dimensions that can distinguish behavior:

- operation, endpoint, request type, or dataset;
- median versus tail percentile;
- cold start, warm steady state, burst, or saturation;
- client, network, server, database, cache, or external dependency;
- CPU, wall time, allocation, memory, GC, I/O, lock, queue, or retry;
- fixed load versus fixed concurrency;
- successful versus failed work.

Ask where the regression begins, not only where it becomes visible.

## 3. Build competing hypotheses

Create a short hypothesis table before changing the implementation.

| Hypothesis | Expected signal | Distinguishing experiment | Supporting evidence | Contradicting evidence | Status |
| --- | --- | --- | --- | --- | --- |
| Example: cache warm-up cost | Cold runs regress, warm runs recover | Separate cold and warm trials | First trial is slow | Warm trials also regress | Open |

Include at least one environmental or measurement explanation when plausible. Avoid anchoring on the code change merely because it is new.

## 4. Run discriminating experiments

Prefer experiments that produce different predictions for the leading hypotheses:

- enable or disable one new path;
- vary data size or concurrency;
- separate cold and warm runs;
- isolate I/O from CPU work;
- compare allocation or GC with wall time;
- inspect a query plan before and after;
- use a profiler to locate hot paths, then use an ablation to test causality;
- compare successful work at equivalent error rates.

Do not make several broad optimizations at once. If the result changes, you should be able to identify which intervention mattered.

## 5. Grade causal confidence

- **Low:** timing association, one profile, or a plausible static explanation only.
- **Medium:** repeatable correlation plus evidence that competing explanations are weaker.
- **High:** a controlled intervention, ablation, or reversal changes the result as predicted while relevant conditions remain stable.

Use language that matches the evidence. Say “consistent with” or “likely” when the cause is not confirmed.

## 6. Evaluate the whole tradeoff

A candidate can improve the target and still regress another important dimension. Record:

- which metrics improved, regressed, or stayed stable;
- which workload segments are affected;
- whether the original objective was achieved;
- user, capacity, cost, and reliability impact;
- whether the regression is a one-time, cold-start, steady-state, or saturation cost.

Do not collapse a mixed result into a single “faster” or “slower” label.

## 7. Choose a response

Choose only after confirmation and analysis:

- retain the candidate because the tradeoff is acceptable;
- retain it and fix a localized cause;
- change configuration or rollout conditions;
- perform another experiment because confidence is insufficient;
- test an alternative implementation;
- revert because the identified cost outweighs the benefit;
- temporarily roll back to contain an active operational impact, then continue analysis.

An alternative is a hypothesis until measured. A rollback restores a previous state; it does not explain the regression.

## 8. Preserve the investigation

Record the observed regression, repeated measurements, hypothesis table, experiments, rejected explanations, cause confidence, response decision, and final re-measurement in the performance log.

Stop when the decision has enough evidence, not when every theoretical question is answered. If the cause remains unresolved, identify the smallest next experiment that would most reduce uncertainty.
