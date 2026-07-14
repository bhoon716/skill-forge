# Deep Code Review

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`deep-code-review` 是一个只读的多视角审查 Skill，用于审查具体的 PR、diff、commit、patch、branch 或变更文件。

## 核心流程

1. 确定审查范围。
2. 收集适用的仓库指令。
3. 分类变更。
4. 选择必需和条件 review lens。
5. 运行隔离的专业 reviewer。
6. 处理动态 escalation。
7. 独立验证每个 candidate finding。
8. 按根因去重，只合成 confirmed finding。

运行时变更必须执行 `correctness` 和 `contract-tests`；security、reliability、architecture、infrastructure 按 trigger 选择。

## 安装

```bash
skill-forge install deep-code-review --lang zh --agent codex
```

v0 的专业知识位于 `SKILL.md` 和 `references/` 下的 9 个文件中。最终结果只包含 confirmed findings、coverage 和 limitations。合成完成后将最终报告写入 `.agents/reviews/deep-code-review/<review-id>.md`，不会在那里保存中间 reviewer 输出。
