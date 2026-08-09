# Performance Experiment: [short title]

- Date: YYYY-MM-DD
- Status: planned | measuring | analyzing | complete | inconclusive
- Owner: [person or agent, when useful]
- Target: [system, operation, endpoint, or code path]
- Baseline revision/state: [commit, tag, artifact, or configuration]
- Candidate revision/state: [commit, working tree, artifact, or configuration]
- Final classification: improved | regressed | mixed | no material difference | inconclusive

## 1. Question and decision

- Performance question:
- Decision this experiment supports:
- Primary metric:
- Guardrail metrics:
- Pre-existing budget, SLO, or threshold:
- Test level: microbenchmark | component | end-to-end | load | stress | soak | profile

## 2. Experiment conditions

- Command or procedure:
- Build mode:
- Runtime and dependency versions:
- Hardware or runner:
- Relevant configuration:
- Dataset and seed:
- Workload and request mix:
- Concurrency and duration:
- Cold/warm and cache state:
- Warm-up:
- Trials and samples:
- Known differences between baseline and candidate:

## 3. Measurements

| Metric | Baseline | Candidate | Absolute difference | Relative difference | Spread / confidence | Classification |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| [metric and unit] | | | | | | |

### Raw artifacts

- Baseline output:
- Candidate output:
- Profiles or traces:

## 4. Observations

- Improved metrics:
- Regressed metrics:
- Stable metrics:
- Workloads or percentiles affected:
- Anomalies and errors:
- Is the difference outside expected variation?: yes | no | uncertain

## 5. Cause analysis

| Hypothesis | Expected signal | Distinguishing experiment | Supporting evidence | Contradicting evidence | Status |
| --- | --- | --- | --- | --- | --- |
| | | | | | open |

- Most credible cause:
- Confidence: low | medium | high
- Evidence linking cause to effect:
- Remaining unexplained behavior:

## 6. Attempts

### Attempt 1: [name]

- Change or experiment:
- Prediction:
- Result:
- Interpretation:
- Keep, reject, or investigate further:

## 7. Decision

- Selected response: retain | localized fix | adjust conditions | more evidence | alternative | revert | temporary rollback
- Rationale:
- User, capacity, cost, and reliability impact:
- Emergency containment, if any:
- Why rollback or an alternative was or was not chosen:

## 8. Final verification

- Final measurement command:
- Final result:
- Correctness checks:
- Performance budget result:
- Material limitations:
- Smallest useful next experiment:

## Summary

[State what changed, why, what decision the evidence supports, and how confident that conclusion is.]
