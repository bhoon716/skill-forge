# Research Question Verification

## When to use this reference

- Evaluating academic, industry, or data analysis research hypotheses
- Verifying metric structures, target baselines, or control variables
- Checking experimental design, analysis logic, or data validation plans
- Reviewing survey questions, study targets, or user research designs

## When not to use this reference

- Reviewing marketing copy or positioning outlines → Use `writing-direction-grill.md`
- Verifying code models or database schemas → Use `technical-design-grill.md`
- Generating bulk reference citations or editing text style directly

## Question Priority

1. **Core Hypothesis** — What is the specific question or relation we are testing?
2. **Dependent / Independent Variables** — What are we measuring, and what are we changing?
3. **Control Variables** — What factors must remain constant to isolate the relation?
4. **Baseline (Control Group)** — What is the benchmark state we compare against?
5. **Success / Failure Metric** — What specific value changes prove or disprove the hypothesis?
6. **Data Source & Reliability** — Where does the data come from? How clean is it?
7. **Alternative Explanations** — What other factors could cause the observed changes?
8. **Actionable Next Action** — What is the smallest data sample we can test first?

## Strong Question Patterns

- "What is your main hypothesis? (e.g., 'If we change X, then metric Y will increase by Z%')"
- "What is the baseline? How are you currently measuring this before any changes?"
- "What other variables could influence Y during this test? How will you keep them constant?"
- "What result would prove your hypothesis wrong? We need a clear failure threshold."

## Weak Question Patterns

- "Is this research interesting?"
- "Do you think the data is clean?"
- "Will we get good results?"

## Recommended Option Rules

- **Hypothesis Ambiguity**: Recommend `(Recommended) A narrow, testable correlation/causality statement focusing on a single change` and include general trends to build the option set.
- **Baseline Ambiguity**: Recommend `(Recommended) A controlled status quo state with no modifications (Control Group)` and include historical benchmarks to build the option set.
- **Metric Threshold Ambiguity**: Recommend `(Recommended) Statistically significant change (e.g., p-value < 0.05 or effect size > X% change)` and include general user feedback alternatives to build the option set.

## Handling Vague Answers

- "We want to research everything" → Narrow down: "What is the single most critical sub-hypothesis that must be proven first?"
- "We'll check the trend" → Quantify: "Let's set a concrete target, such as 'p-value < 0.05'. Shall we use this as our threshold?"
- "We don't need a control group" → Force baseline: "Without a control group, how will you prove that changes in Y weren't caused by seasonal trends?"

## Stopping Conditions

In addition to common stopping conditions, ensure:
- The core research hypothesis is testable.
- Independent and dependent variables are identified.
- A baseline (control group) benchmark is established.
- Numerical success/failure thresholds are defined.
- Primary alternative explanations have been mapped.

## Final Synthesis Required Items

Add the following to the common final synthesis format:
- Core Hypothesis & Variables
- Baseline (Control Group) Definition
- Experimental Verification Milestones
- Primary Target KPI & Thresholds
- High-level Risks & Confounding Factors
