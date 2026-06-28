# 🛠️ skill-forge (AI Agent Skill 工作空间)

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D16.0.0-blue.svg" alt="Node Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/format-SKILL.md-orange.svg" alt="Format Compatibility">
  <img src="https://img.shields.io/badge/agent-Codex%20%7C%20Gemini%20%7C%20Claude-red.svg" alt="Supported Agents">
</p>
<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>
<p align="center">
  📦 <a href="https://www.npmjs.com/package/@bhoon716/skill-forge">NPM Package</a>
</p>
---

**精心打磨的 AI Agent Skill 设计与智能分发工作空间。**

`skill-forge` 提供了一套标准化工具，使您可以轻松编写兼容 Codex, Gemini, Claude Code, Cursor 等支持 `SKILL.md` 规范的 AI Agent 并在不同项目中一键部署。

---

## 📂 1. 目录结构

```txt
skill-forge/
├── README.md                (英文主指南)
├── README.ko.md             (韩文主指南)
├── README.zh.md             (本中文主指南)
├── package.json             (CLI 依赖配置)
├── bin/
│   └── cli.js               (Skill 部署与本地化 CLI 工具)
├── skills/
│   └── ultra-grill-me/      (Socratic 提问施压验证 Skill)
│       ├── SKILL.md
│       ├── SKILL.ko.md
│       ├── SKILL.zh.md
│       ├── README.md
│       ├── README.ko.md
│       ├── README.zh.md
│       ├── references/      (细分领域提问参考库)
│       ├── examples/        (Trigger 测试用例)
│       └── evals/           (提问规范自动化 Grader)
├── templates/
│   └── skill-template/      (新 Skill 创建模板)
└── docs/
    ├── authoring-guide.md   (Skill 编写指南)
    ├── naming.md            (命名规范)
    └── testing.md           (测试与 Evals 验证指南)
```

---

## 🏆 2. 已发布 Skill 列表

| Skill 名称 | 核心目的与简介 | 状态 |
| :--- | :--- | :--- |
| **`ultra-grill-me`** | 通过苏格拉底式提问（一次只问一个问题）压力测试用户的开发计划、系统设计、商业策略和个人决策，从而在代码编写前消除模糊性。 | **Released (v1.0.0) 🎯** |

---

## 🚀 3. CLI 快速部署工具 (`skill-forge` 或 `npx @bhoon716/skill-forge`)

通过轻量化 CLI 可以自动根据语言选项映射，并将 Skill 复制部署到对应的 Agent 本地或全局配置路径中。

> [!TIP]
> **全局命令更轻松运行 (`skill-forge`)**：
> 您可以全局安装此工具，以便直接运行 `skill-forge` 启动交互式安装模式。
> ```bash
> # 1. 全局安装 (仅需一次)
> $ npm install -g @bhoon716/skill-forge
> 
> # 2. 快捷运行交互式安装模式
> $ skill-forge
> ```

### 💡 命令行实例
```bash
# 1. 以中文版部署到本地默认项目路径 (Codex/Gemini)
$ skill-forge install ultra-grill-me --lang zh

# 2. 以中文版部署到本地 Claude Code 路径
$ skill-forge install ultra-grill-me --lang zh --agent claude

# 3. 以英文版部署到本地 Cursor 路径
$ skill-forge install ultra-grill-me --lang en --agent cursor

# 4. 以中文版全局部署到用户主目录 (全局生效)
$ skill-forge install ultra-grill-me --lang zh --agent global

# 5. 一键中文部署工作空间内的所有 Skill
$ skill-forge install all --lang zh --agent codex
```

### ⚙️ 选项说明
- `-l, --lang <en|ko|zh>`: 选择部署的翻译语系 (默认值: `en`)
- `-a, --agent <codex|gemini|claude|cursor|copilot|global>`: 目标工具的环境路径映射 (默认值: `codex`)
- `--dry-run`: 仅模拟复制映射过程，不实际写入文件

---

## ✍️ 4. 协作开发规范

> [!IMPORTANT]
> **在此仓库贡献新 Skill 时，请务必遵守以下三条原则:**
>
> 1. 🎯 **单一职责原则 (Single Responsibility)**:
>    每个 Skill 的设计必须专注于解决 `docs/authoring-guide.md` 中定义的一个具体的、高价值的重复工作流。
> 2. 🌐 **翻译后缀规范 (Localization Suffixes)**:
>    必须同时提供对应语言的后缀文件（例如：`SKILL.zh.md`, `SKILL.ko.md` 以及英文默认版的 `SKILL.md`），以支撑 CLI 解析。
> 3. 🧪 **运行回归测试 (Regression Proof)**:
>    进行任何修改后，必须运行 `evals/check_evals.py` 自动化评测，以确保提问结构和 Process Adherence 指标没有退化。

---

## 📄 开源协议

MIT License. 欢迎将此项目框架用于您团队的内部自定义 Agent Skills 分发枢纽。
