# Architecture

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`architecture` 是一个软件架构决策 Skill，用证据、明确的权衡和可复用的文档来设计与审查新系统或现有系统。

## 适用场景

- 比较分层系统、模块化单体或服务拆分等架构方案
- 编写 ADR 和架构 brief
- 审查代码库中的组件、集成、数据或模块边界
- 分析质量属性、可扩展性、可用性、韧性、安全、可运维性和成本
- 产出 context、container/component、runtime 或 deployment view
- 规划带有兼容性和回滚的渐进式架构迁移

## 工作流

1. 界定决策和约束。
2. 可用时检查代码仓库证据。
3. 定义可测量的质量场景。
4. 建模当前状态和目标状态。
5. 使用相同标准比较两到四个方案。
6. 分析风险、迁移和验证。
7. 产出所需的 brief、ADR、审查、视图或迁移计划。

## 安装

```bash
skill-forge install architecture --lang zh --agent codex
```

## 不适用场景

简单事实说明、单独的错误修复、功能实现或保持行为不变的重构不使用此 Skill，除非请求包含明确的架构决策。
