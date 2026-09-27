# Refactoring

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`refactoring` 是在保持外部可观察行为不变的前提下改善代码结构的 coding-agent skill。

核心循环是 **Baseline → Transform → Same Tests**。

把简化视为需要验证的假设。仅凭文件长度、AI 编写与否或复杂度指标不足以证明需要修改。合并相似行为前先追踪，再考虑安全删除、复用或有依据的新增。

## 适用场景

- 不改变行为地简化代码
- 抽取 helper、function、module 或 component
- 去除重复
- 改善命名、可读性、cohesion 或 separation of concerns
- 不改行为地提升 testability

## 不适用场景

- 添加新行为；使用 `feature-dev`
- 修复坏行为；使用 `bugfix`
- 大范围 rewrite 或 architecture redesign
- 依赖升级
- 无法用测试或等价验证保护的 cleanup

## 工作流

1. 明确具体重构目标。
2. 定义不能改变的行为边界。
3. 找到保护目标行为的测试。
4. 编辑前运行 baseline tests。
5. 应用一个小转换。
6. 重新运行同一批测试。
7. 只有同一批测试继续通过才继续。
8. 若无法验证行为保持，停止、回滚或缩小范围。

## 安装

```bash
skill-forge install refactoring --lang en --agent codex
skill-forge install refactoring --lang ko --agent codex
skill-forge install refactoring --lang zh --agent codex
```

## 项目提示

可加入下游项目的 `AGENTS.md`：

> 当用户要求在不改变行为的前提下 refactor、clean up、simplify、extract、rename 或 remove duplication 时，使用 `refactoring`。先运行 baseline tests，再做一个小转换，并在继续前重新运行同一批测试。
