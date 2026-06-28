# skill-forge (Agent Skill Workspace)

[한국어](./README.ko.md)

A dedicated workspace to build, test, and distribute sharp, reusable AI Agent Skills.

`skill-forge` provides high-quality, structured skill packages compatible with Codex, Gemini, Claude Code, Cursor, and any agent supporting the `SKILL.md` format.

---

## 1. Directory Structure

```txt
skill-forge/
├── README.md                (This dashboard guide)
├── README.ko.md             (Korean dashboard guide)
├── package.json             (CLI package configuration)
├── bin/
│   └── cli.js               (Built-in skill localization & installer CLI)
├── skills/
│   └── ultra-grill-me/      (Socratic plan verification skill)
│       ├── SKILL.md
│       ├── SKILL.ko.md
│       ├── README.md
│       ├── README.ko.md
│       ├── references/      (Domain taxonomy markdown sheets)
│       ├── examples/        (Trigger evaluation suites)
│       └── evals/           (Deterministic process graders)
├── templates/
│   └── skill-template/      (Boilerplate templates to build new skills)
└── docs/
    ├── authoring-guide.md   (Standard authoring manual)
    ├── naming.md            (Naming conventions)
    └── testing.md           (Verification & evals guide)
```

---

## 2. Released Skills

| Skill Name | Purpose & Pitch | Status |
| :--- | :--- | :--- |
| **`ultra-grill-me`** | A Socratic questioning agent engine that challenges your plans, system designs, GTM strategies, and personal choices to remove ambiguity before coding. | **Released (v1.0.0)** |

---

## 3. Skill Installer CLI Usage (`npx skill-forge`)

A built-in installer tool that automatically maps localized skill source files and deploys them to target agent configuration directories.

### Key Features
- **Auto Localization Mapping**: Specifying `--lang ko` copies `SKILL.ko.md` as `SKILL.md` and `references/*.ko.md` as `references/*.md` to ensure correct agent consumption.
- **Agent Path Routing**: Specify your exact developer tool via `--agent` to resolve target directories.

### Command Line Interface
```bash
# 1. Install Korean version locally to Codex/Gemini directory (Default)
npx skill-forge add ultra-grill-me --lang ko

# 2. Install Korean version locally to Claude Code directory
npx skill-forge add ultra-grill-me --lang ko --agent claude

# 3. Install English version locally to Cursor directory
npx skill-forge add ultra-grill-me --lang en --agent cursor

# 4. Install globally for all workspaces (English default)
npx skill-forge add ultra-grill-me --lang en --agent global

# 5. Install all skills in the forge workspace at once in Korean
npx skill-forge install-all --lang ko --agent codex
```

### Options List
- `-l, --lang <en|ko|zh>`: Set target language translation (Default: `en`)
- `-a, --agent <codex|gemini|claude|cursor|copilot|global>`: Map destination tool path (Default: `codex`)
- `--dry-run`: Simulate mappings and file copy plans without modification

---

## 4. Contributing Rules

1. **Single Responsibility**: Each skill must address exactly one repeatable bottleneck described in `docs/authoring-guide.md`.
2. **Translation Suffixes**: Always keep suffix pairs (e.g., `SKILL.ko.md` and `SKILL.md`) intact to support the installer parser.
3. **Regression Proof**: Run `evals/check_evals.py` to assert F1 precision and process adherence metrics before merging changes.

## License

MIT License. Feel free to adopt this workspace schema for your team's custom AI skills hub.
