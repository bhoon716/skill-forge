# Cognitive Debt

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`cognitive-debt` 基于仓库证据审查那些让代码行为和设计意图更难理解与修改的风险。代码模式只是理解风险的代理信号；本 Skill 不声称能够测量团队实际理解了什么。

## 适用场景

- 查找重复规则或多个事实来源
- 追踪隐藏耦合、不清晰的流程或不必要的间接调用
- 排序已证实的死代码、过时 scaffolding 或不必要的依赖增长
- 发现无法从代码、测试、历史或项目文档确认的重要设计意图

## 其他 Skill 的适用场景

- 已知的局部行为保持型 cleanup：`refactoring`
- 坏掉的行为：`bugfix`
- 新行为：`feature-dev`
- 有意改变架构或 contract：`architecture`

## 工作流

1. 将审计范围限定在用户指定的仓库、子系统或流程。
2. 沿所有者、状态、副作用和测试追踪有代表性的行为。
3. 根据领域规则、兼容性、运行时行为和仓库历史验证候选信号。
4. 根据证据、理解影响、复发情况、信心和修复风险排序。
5. 只有用户要求降低负债时才修改代码；每项范围有限的改动都要保持行为并完成验证。

## 安装

```bash
skill-forge install cognitive-debt --lang en --agent codex
skill-forge install cognitive-debt --lang ko --agent codex
skill-forge install cognitive-debt --lang zh --agent codex
```

## 项目提示

可在下游项目的 `AGENTS.md` 中加入：

> 审计代码库整体的理解风险时使用 `cognitive-debt`。追踪实际行为，报告证据、影响、信心和最小有效后续步骤。把代码异味视为信号而非证明；只有用户要求时才修改代码。
