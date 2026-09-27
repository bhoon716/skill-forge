<p align="center">
  <img src="https://raw.githubusercontent.com/bhoon716/skill-forge/main/docs/assets/skill-forge-hero.png" alt="skill-forge — Forge AI Agent Skills. Deploy Everywhere." width="960">
</p>

# skill-forge

<p align="center">
  A multilingual workspace for authoring, validating, and distributing reusable AI agent skills.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@bhoon716/skill-forge"><img src="https://img.shields.io/npm/v/%40bhoon716%2Fskill-forge" alt="npm version"></a>
  <img src="https://img.shields.io/badge/node-%3E%3D16-blue" alt="Node.js 16 or newer">
  <img src="https://img.shields.io/badge/format-SKILL.md-orange" alt="SKILL.md format">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License">
</p>

<p align="center">
  <a href="./README.md">English</a> · <a href="./README.ko.md">한국어</a> · <a href="./README.zh.md">简体中文</a>
</p>

`skill-forge` packages focused workflows as portable `SKILL.md` bundles and installs the correct localized files into Codex, Gemini, Claude Code, Cursor, and GitHub Copilot projects. Each skill can include references, examples, evals, scripts, and agent metadata while keeping its core instructions focused.

## Why skill-forge

- **One source, multiple agents:** install the same skill into each agent's project-local skill directory.
- **Built-in localization:** maintain English, Korean, and Simplified Chinese variants alongside one another.
- **Evidence-backed workflows:** ship validation guidance, deterministic evals, and reusable examples with the skill.
- **Reviewable distribution:** preview every installation with `--dry-run` before copying files.
- **Simple package model:** a skill remains an ordinary directory centered on `SKILL.md`.

## Quick start

Run directly with `npx`:

```bash
# List available skills
npx @bhoon716/skill-forge list --lang en

# Install one skill for Codex or Gemini
npx @bhoon716/skill-forge install bugfix --lang en --agent codex

# Install every skill in Korean to all supported local agent directories
npx @bhoon716/skill-forge install all --lang ko
```

Or install the CLI globally:

```bash
npm install -g @bhoon716/skill-forge
skill-forge
```

Running `skill-forge` without arguments opens the interactive installer.

## Included skills

| Skill | What it does |
| --- | --- |
| [`architecture`](./skills/architecture/) | Compares architecture alternatives, records tradeoffs, and produces ADRs, reviews, system views, and migration plans. |
| [`bugfix`](./skills/bugfix/) | Reproduces or establishes evidence for broken behavior, identifies the root cause, applies the smallest safe fix, and chooses proportionate verification. |
| [`cognitive-debt`](./skills/cognitive-debt/) | Audits codebase-wide comprehension risks such as duplicated rules, hidden coupling, unclear intent, and unnecessary indirection; ranks evidence-backed next steps. |
| [`deep-code-review`](./skills/deep-code-review/) | Coordinates independent review lenses, verifies candidate findings, removes root-cause duplicates, and reports confirmed issues. |
| [`feature-dev`](./skills/feature-dev/) | Implements new behavior through a strict Red → Green → Refactor workflow. |
| [`performance-testing`](./skills/performance-testing/) | Measures baseline and candidate performance under controlled conditions, investigates regressions and tradeoffs, and records evidence-backed conclusions. |
| [`refactoring`](./skills/refactoring/) | Improves internal structure through Baseline → Transform → Same Tests while preserving observable behavior. |
| [`ultra-grill-me`](./skills/ultra-grill-me/) | Pressure-tests plans, designs, strategies, research questions, and decisions through one-question-at-a-time Socratic interrogation. |

## Installation targets

| `--agent` | Destination |
| --- | --- |
| `codex`, `gemini` | `./.agents/skills` |
| `claude` | `./.claude/skills` |
| `cursor` | `./.cursor/skills` |
| `copilot` | `./.copilot/skills` |
| `global` | All destinations above |

Supported language codes are `en`, `ko`, and `zh`. English is the default. Use `--dry-run` to inspect source-to-destination mappings without changing files.

```bash
skill-forge install architecture --lang zh --agent claude --dry-run
```

## Repository layout

```text
skill-forge/
├── bin/                     # Installer CLI
├── docs/                    # Authoring, compatibility, naming, and testing guides
│   └── assets/              # Documentation and branding assets
├── skills/                  # Published multilingual skill packages
│   └── <skill-name>/
│       ├── SKILL.md         # English default
│       ├── SKILL.ko.md      # Korean
│       ├── SKILL.zh.md      # Simplified Chinese
│       ├── README*.md       # Human-facing documentation
│       └── references/      # Optional supporting material
├── templates/               # Starting points for new skills
└── tests/                   # CLI smoke tests
```

Some skills also include `agents/`, `examples/`, `evals/`, `logs/`, or `scripts/` when the workflow requires them.

## Authoring a skill

1. Define one narrow, repeatable job and its trigger boundary.
2. Put routing criteria in the frontmatter `description`.
3. Keep `SKILL.md` focused on non-obvious procedure and decision rules.
4. Move detailed material into `references/` and reusable validation cases into `examples/` or `evals/`.
5. Keep localized suffix pairs intact so the installer can map them correctly.
6. Validate the skill and run the repository tests before publishing.

See the [authoring guide](./docs/authoring-guide.md), [naming rules](./docs/naming.md), [compatibility guide](./docs/compatibility.md), and [testing guide](./docs/testing.md).

## Validation

```bash
# Verify CLI behavior
npm test

# Preview a complete localized installation
node bin/cli.js install all --lang en --agent codex --dry-run

# Run the bundled Ultra Grill evaluator
python3 skills/ultra-grill-me/evals/check_evals.py --run-mock
```

## License

[MIT](./LICENSE)
