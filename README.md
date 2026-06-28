# skill-forge

[한국어](./README.ko.md)

A small forge for carefully crafted Agent Skills.

`skill-forge` is a collection of reusable `SKILL.md` workflows for AI coding agents and assistants such as Claude Code, Codex, Cursor, and other Agent Skills-compatible tools.

The goal is not to collect as many skills as possible.

The goal is to carve a small set of sharp, reusable, high-leverage agent workflows.

## What is this?

This repository stores Agent Skills as portable folders.

Each skill lives under `skills/` and contains at least a `SKILL.md` file.

A skill can encode:

- a repeatable workflow
- a decision-making procedure
- a review process
- a clarification loop
- a domain-specific operating pattern
- a reusable interaction style

Instead of rewriting the same long prompt again and again, you can reuse a carefully crafted skill.

## Repository structure

```txt
skill-forge/
├── README.md
├── README.ko.md
├── LICENSE
├── skills/
│   └── ultra-grill-me/
│       ├── SKILL.md
│       ├── README.md
│       ├── README.ko.md
│       ├── references/
│       └── examples/
├── templates/
│   └── skill-template/
│       ├── SKILL.md
│       └── README.md
└── docs/
    ├── authoring-guide.md
    ├── naming.md
    └── compatibility.md
```

## Skills

| Skill            | Description                                                                                                              | Status |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ------ |
| `ultra-grill-me` | A stronger version of `/grill-me` that stress-tests a plan one question at a time until no high-value ambiguity remains. | Draft  |

More skills will be added over time.

## First skill: `ultra-grill-me`

`ultra-grill-me` is an exhaustive clarification skill inspired by `/grill-me`.

It does not produce a plan immediately.

Instead, it interrogates the idea one question at a time, surfacing hidden assumptions, weak success criteria, unresolved tradeoffs, risks, edge cases, and failure modes.

It stops only when further questions would mostly produce diminishing returns.

Use it for:

- product ideas
- technical designs
- implementation plans
- writing directions
- strategy drafts
- project plans
- decision reviews

Do not use it for:

- simple factual Q&A
- brainstorming lists
- immediate execution requests
- casual explanation requests

## Design principles

### 1. Small, sharp skills

Each skill should do one job well.

A skill should not be a giant prompt dump. It should be a compact operating manual for a specific agent behavior.

### 2. Clear trigger conditions

A skill description should explain when the skill should be used and when it should not be used.

Good skills are easy for agents to select and easy for humans to understand.

### 3. Procedural instructions

Prefer concrete procedures over vague advice.

Good skills include:

- trigger conditions
- non-trigger conditions
- step-by-step workflow
- decision rules
- stopping conditions
- output format
- gotchas
- examples

### 4. Progressive disclosure

Keep `SKILL.md` focused.

Move long supporting material into `references/`, `examples/`, or `scripts/`.

The core skill file should explain what to do and when to read additional files.

### 5. Portability

Skills should avoid unnecessary tool-specific assumptions.

The same skill folder should be easy to adapt for Claude Code, Codex, Cursor, or other `SKILL.md`-compatible environments.

### 6. Real examples

Each skill should include examples showing:

- when the skill should trigger
- when it should not trigger
- what good behavior looks like
- what failure modes to avoid

## Recommended skill layout

```txt
skills/
└── skill-name/
    ├── SKILL.md
    ├── README.md
    ├── README.ko.md
    ├── references/
    │   └── supporting-material.md
    ├── examples/
    │   ├── should-trigger.md
    │   └── should-not-trigger.md
    └── scripts/
        └── optional-helper.py
```

Only `SKILL.md` is required.

Use `references/` for long supporting material.

Use `examples/` for realistic prompts and expected behavior.

Use `scripts/` only when deterministic execution is useful.

## Creating a new skill

Create a new folder under `skills/`.

```bash
mkdir -p skills/my-new-skill
touch skills/my-new-skill/SKILL.md
```

Add frontmatter to `SKILL.md`.

```md
---
name: my-new-skill
description: Use when the user needs a specific repeatable workflow. Do not use for unrelated tasks.
---
```

Then write the core procedure.

A strong skill usually includes:

- purpose
- when to use it
- when not to use it
- workflow
- decision rules
- stopping conditions
- output format
- gotchas
- examples

## Naming conventions

Use lowercase hyphen-case.

Good:

```txt
ultra-grill-me
prd-shredder
issue-splitter
launch-checklist
```

Avoid:

```txt
UltraGrillMe
my skill
skill_v2_final
```

## Installation examples

Depending on your tool, copy a skill folder into the appropriate local skills directory.

```bash
# Claude Code project-local
mkdir -p .claude/skills
cp -R skills/ultra-grill-me .claude/skills/

# Codex project-local
mkdir -p .agents/skills
cp -R skills/ultra-grill-me .agents/skills/

# Cursor project-local
mkdir -p .cursor/skills
cp -R skills/ultra-grill-me .cursor/skills/
```

Check your agent tool’s documentation for the exact installation path and invocation behavior.

## Roadmap

Potential future skills:

- `prd-shredder`
- `issue-splitter`
- `launch-checklist`
- `architecture-cross-examiner`
- `writing-tightener`
- `decision-deck-reviewer`

## License

Add your preferred license here.

## Note

This repository is experimental.

Skills are carved through use.

If a skill over-triggers, under-triggers, asks weak questions, skips important steps, or produces premature output, it should be sharpened.

## License

MIT License.

You are free to use, copy, modify, and redistribute these skills, including for commercial projects, as long as the license notice is preserved.
# skill-forge

`skill-forge` is a workspace for designing and documenting reusable Agent Skills.

## Docs

- [Authoring guide](docs/authoring-guide.md)
- [Naming guide](docs/naming.md)
- [Testing guide](docs/testing.md)
- [Compatibility notes](docs/compatibility.md)

## Structure

- `skills/` contains the concrete skill packages
- `templates/` contains starter templates
- `docs/` contains the authoring and maintenance guides
- `scripts/` contains validation helpers
