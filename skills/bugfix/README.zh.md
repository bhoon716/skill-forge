# Bugfix

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`bugfix` 是用于以证据修复坏掉、错误、失败、flaky 或回归行为的 coding-agent skill。

核心循环是 **Reproduce → Root Cause → Regression Test → Minimal Fix → Verify**。

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
2. 复现失败或找到现有 failing test。
3. 定义 expected behavior 与 actual behavior。
4. 编辑前定位 root cause。
5. 可行时添加或更新 regression test。
6. 确认 regression test 因预期原因失败。
7. 应用最小安全修复。
8. 重新运行 regression test 和原始 failing scenario。
9. 运行相关验证并诚实报告不确定性。

## 安装

```bash
skill-forge install bugfix --lang en --agent codex
skill-forge install bugfix --lang ko --agent codex
skill-forge install bugfix --lang zh --agent codex
```

## 项目提示

可加入下游项目的 `AGENTS.md`：

> 当用户要求修复 broken、failing、flaky 或 regressed behavior 时，使用 `bugfix`。复现失败，识别 root cause，可行时添加或更新 regression test，做最小修复，并验证原始失败已解决。
