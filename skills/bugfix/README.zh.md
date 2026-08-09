# Bugfix

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`bugfix` 是用于以证据修复坏掉、错误、失败、flaky 或回归行为的 coding-agent skill。

核心循环是 **Reproduce or Establish Evidence → Root Cause → Minimal Fix → Verify**。验证是必需的；新的 regression test 只在能以相称成本提供持久保护时添加。

## 适用场景

- 修复 failing tests
- 修复 crashes、stack traces、错误 status codes、被忽略的 CLI flags、重复输出或错误 rendering
- 修复过去能工作现在不能工作的 regression
- 用户要求修复时调查报告的失败

## 不适用场景

- 添加新行为；使用 `feature-dev`
- 行为保持 cleanup；使用 `refactoring`
- 没有修复要求的仅调查
- 仅文档
- 仅测试清理
- 非 bug 修复必需的依赖升级

## 工作流

1. 捕获准确症状。
2. 复现失败或建立可信 evidence trail。
3. 定义 expected behavior 与 actual behavior。
4. 编辑前定位 root cause。
5. 选择最直接的验证方法；当测试稳定、有价值且成本相称时添加 regression test。
6. 应用最小安全修复。
7. 验证原始失败及相关周边行为。
8. 如实报告证据、限制和不确定性。

## 安装

```bash
skill-forge install bugfix --lang en --agent codex
skill-forge install bugfix --lang ko --agent codex
skill-forge install bugfix --lang zh --agent codex
```

## 项目提示

可加入下游项目的 `AGENTS.md`：

> 当用户要求修复 broken、failing、flaky 或 regressed behavior 时，使用 `bugfix`。复现失败或建立证据，识别 root cause，做最小修复，并验证原始失败。仅在 regression test 能以相称成本提供持久保护时添加它。
