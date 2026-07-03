# Feature Dev

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`feature-dev` 是用于以严格 TDD 添加新产品或代码行为的 coding-agent skill。

核心循环是 **Red → Green → Refactor**。

## 适用场景

- 添加新的 API、命令、选项、工作流或 UI 行为
- 暴露新的 API 响应字段
- 实现 export、login、retry、settings 或 mode 支持
- 在现有仓库中构建新的产品行为

## 不适用场景

- Bug 修复；使用 `bugfix`
- 行为保持 cleanup；使用 `refactoring`
- 仅调查
- 仅文档
- 仅测试清理
- 非功能必需的依赖升级

## 工作流

1. 将请求转成可测试 acceptance criteria。
2. 找到现有约定、测试和 helper。
3. 先写或更新测试。
4. 运行 targeted test 并确认预期 red failure。
5. 实现最小生产代码变更。
6. 重新运行同一测试并确认 green。
7. 只在 green 后重构。
8. 运行更广验证，并只报告实际验证过的内容。

## 安装

```bash
skill-forge install feature-dev --lang en --agent codex
skill-forge install feature-dev --lang ko --agent codex
skill-forge install feature-dev --lang zh --agent codex
```

## 项目提示

可加入下游项目的 `AGENTS.md`：

> 当用户要求 add、implement、create、support、expose、integrate 或 build 新行为时，使用 `feature-dev` 并遵循 Red → Green → Refactor。若存在测试框架，不要在失败的行为测试之前先写生产代码。
