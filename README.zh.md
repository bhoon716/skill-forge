<p align="center">
  <img src="https://raw.githubusercontent.com/bhoon716/skill-forge/main/docs/assets/skill-forge-hero.png" alt="skill-forge — 构建 AI Agent Skills，并随处部署。" width="960">
</p>

# skill-forge

<p align="center">
  用于编写、验证和分发可复用 AI Agent Skills 的多语言工作空间
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@bhoon716/skill-forge"><img src="https://img.shields.io/npm/v/%40bhoon716%2Fskill-forge" alt="npm 版本"></a>
  <img src="https://img.shields.io/badge/node-%3E%3D16-blue" alt="Node.js 16 或更高版本">
  <img src="https://img.shields.io/badge/format-SKILL.md-orange" alt="SKILL.md 格式">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License">
</p>

<p align="center">
  <a href="./README.md">English</a> · <a href="./README.ko.md">한국어</a> · <a href="./README.zh.md">简体中文</a>
</p>

`skill-forge` 将专注的工作流程打包成可移植的 `SKILL.md` bundle，并把正确的本地化文件安装到 Codex、Gemini、Claude Code、Cursor 和 GitHub Copilot 项目中。每个 Skill 都可以包含 references、examples、evals、scripts 和 agent metadata，同时保持核心指令简洁。

## 为什么选择 skill-forge

- **一份源文件，多种 Agent：** 将同一个 Skill 安装到各 Agent 的项目级 Skill 目录。
- **内置多语言支持：** 在同一位置维护英文、韩文和简体中文版本。
- **证据驱动的工作流：** 将验证指南、deterministic eval 和可复用示例与 Skill 一起分发。
- **可审查的安装过程：** 使用 `--dry-run` 在复制前检查所有文件映射。
- **简单的 package 模型：** 每个 Skill 都是以 `SKILL.md` 为核心的普通目录。

## 快速开始

无需安装，直接通过 `npx` 运行：

```bash
# 查看可用 Skill
npx @bhoon716/skill-forge list --lang zh

# 为 Codex 或 Gemini 安装单个 Skill
npx @bhoon716/skill-forge install bugfix --lang zh --agent codex

# 将所有 Skill 的中文版安装到全部支持的本地 Agent 目录
npx @bhoon716/skill-forge install all --lang zh
```

也可以全局安装 CLI：

```bash
npm install -g @bhoon716/skill-forge
skill-forge
```

不带参数运行 `skill-forge` 会打开交互式安装程序。

## 内置 Skills

| Skill | 作用 |
| --- | --- |
| [`architecture`](./skills/architecture/) | 比较架构方案，记录 tradeoff，并产出 ADR、架构审查、系统视图和 migration 计划。 |
| [`bugfix`](./skills/bugfix/) | 复现失败或建立证据，定位 root cause，应用最小安全修复，并按风险选择相称的验证。 |
| [`deep-code-review`](./skills/deep-code-review/) | 协调独立 review lens，验证 candidate finding，按 root cause 去重，并只报告已确认的问题。 |
| [`feature-dev`](./skills/feature-dev/) | 通过严格的 Red → Green → Refactor 流程实现新行为。 |
| [`performance-testing`](./skills/performance-testing/) | 在受控条件下测量基线与候选性能，分析回归和权衡的原因，并记录有证据的结论。 |
| [`refactoring`](./skills/refactoring/) | 通过 Baseline → Transform → Same Tests，在保持外部行为不变的前提下改进内部结构。 |
| [`ultra-grill-me`](./skills/ultra-grill-me/) | 通过一次只问一个问题的苏格拉底式追问，对计划、设计、策略、研究问题和个人决策进行压力验证。 |

## 安装目标

| `--agent` | 目标目录 |
| --- | --- |
| `codex`, `gemini` | `./.agents/skills` |
| `claude` | `./.claude/skills` |
| `cursor` | `./.cursor/skills` |
| `copilot` | `./.copilot/skills` |
| `global` | 以上所有目录 |

支持的语言代码为 `en`、`ko` 和 `zh`，默认使用英文。使用 `--dry-run` 可以在不修改文件的情况下检查 source-to-destination 映射。

```bash
skill-forge install architecture --lang zh --agent claude --dry-run
```

## 仓库结构

```text
skill-forge/
├── bin/                     # Installer CLI
├── docs/                    # 编写、兼容性、命名和测试指南
│   └── assets/              # 文档与品牌资源
├── skills/                  # 发布的多语言 Skill packages
│   └── <skill-name>/
│       ├── SKILL.md         # 默认英文版
│       ├── SKILL.ko.md      # 韩文版
│       ├── SKILL.zh.md      # 简体中文版
│       ├── README*.md       # 面向用户的文档
│       └── references/      # 可选参考资料
├── templates/               # 新 Skill 起始模板
└── tests/                   # CLI smoke tests
```

根据工作流需要，部分 Skill 还会包含 `agents/`、`examples/`、`evals/`、`logs/` 或 `scripts/`。

## 编写 Skill

1. 定义一个狭窄、可重复的任务及其 trigger 边界。
2. 在 frontmatter 的 `description` 中写明路由标准。
3. 让 `SKILL.md` 只保留模型容易遗漏的流程和决策规则。
4. 将详细资料放入 `references/`，将可复用验证案例放入 `examples/` 或 `evals/`。
5. 保留各语言 suffix pair，确保 installer 能正确映射。
6. 发布前验证 Skill 并运行仓库测试。

请参阅[编写指南](./docs/authoring-guide.md)、[命名规范](./docs/naming.md)、[兼容性说明](./docs/compatibility.md)和[测试指南](./docs/testing.md)。

## 验证

```bash
# 验证 CLI 行为
npm test

# 预览完整的英文安装映射
node bin/cli.js install all --lang en --agent codex --dry-run

# 运行 Ultra Grill evaluator
python3 skills/ultra-grill-me/evals/check_evals.py --run-mock
```

## License

[MIT](./LICENSE)
