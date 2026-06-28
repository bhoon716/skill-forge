# Ultra Grill Me Skill

`ultra-grill-me` is a validation-only Agent Skill designed to stress-test your plans, designs, product ideas, or career decisions through Socratic, one-question-at-a-time interrogation before you jump into execution.

---

## 1. Key Features

- **Socratic Interrogation**: Challenge technical decisions, market assumptions, scope boundaries, and delivery timelines based on a structured 10-level priority list.
- **One Question at a Time**: Every turn presents exactly one small, focused question alongside 2-5 concrete options to prevent decision paralysis.
- **Option & Recommendation System**: Key options are marked with `(Recommended)`, and choices always conclude with "Ask for more recommended options" and "Answer directly" to guide user response.
- **Session Logs**: All questions, answers, and updated state assumptions are recorded in markdown logs under the `logs/` directory for history tracking and resume capability.
- **Code Non-Modification Policy**: During active questioning, the agent commits to not modifying workspace source codes until the final synthesis is accepted by the user.

---

## 2. Usage

### Implicit Trigger (Natural Language)
Provide your draft plan or feature idea to the agent and request verification.
- *Example*: `"Please stress-test this marketing strategy before we launch."`

### Explicit Trigger (Slash Command / Direct Mention)
Directly invoke the skill when you want to enforce Socratic interrogation for a specific plan.
- *Example*: `"/ultra-grill-me review my React study roadmap."`

---

## 3. Installation Guide (via skill-forge CLI)

Use the built-in cli script (`npx skill-forge`) to copy the localized skill into your target agent environment.

```bash
# 1. Install Korean translation to project-local Codex/Gemini (Default)
npx skill-forge add ultra-grill-me --lang ko

# 2. Install English version to project-local Claude Code
npx skill-forge add ultra-grill-me --lang en --agent claude

# 3. Install English version to project-local Cursor
npx skill-forge add ultra-grill-me --lang en --agent cursor

# 4. Install globally to ~/.gemini/config/skills/ for global activation
npx skill-forge add ultra-grill-me --lang en --agent global
```

---

## 4. Directory Structure

```
skills/ultra-grill-me/
├── SKILL.md                 (Created automatically with selected language on install)
├── SKILL.ko.md              (Korean source spec)
├── SKILL.md                 (English source spec)
├── README.md                (This guide document)
├── README.ko.md             (Korean guide document)
├── logs/
│   └── template.md          (Template file for session logging)
├── examples/
│   ├── should-trigger.md    (Trigger examples)
│   └── should-not-trigger.md(Non-trigger boundary examples)
├── references/              (10 domain references containing detailed taxomy)
│   ├── product-idea-grill.md
│   ├── technical-design-grill.md
│   └── ...
└── evals/                   (Evaluator suite to run process grading)
    ├── trigger_test_cases.json
    └── check_evals.py
```
