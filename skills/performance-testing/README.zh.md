# Performance Testing

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`performance-testing` 是一个使用受控实验和可复现日志来测量、比较并解释运行时性能的编码 agent skill。

核心循环是 **Define → Baseline → Candidate → Confirm → Analyze → Decide → Re-measure → Record**。

## 适用场景

- 对 latency、throughput、CPU、memory、allocation 或资源成本进行 benchmark
- 比较 baseline 与 candidate 实现或配置
- 诊断性能回归和混合权衡
- 设计 microbenchmark、load test、stress test 或 soak test
- 对已观察到的 bottleneck 做 profiling 并验证原因假设
- 实现用户要求的优化并证明前后差异

## 核心行为

- 使用等价条件和重复测量
- 记录绝对数值、相对差异、波动和置信度
- 实际测量时在目标项目中写入性能日志
- 保存失败尝试和被否定假设
- 候选变慢时先分析原因，再考虑替代方案或 rollback
- 将紧急 rollback 视为影响控制，而不是 root-cause 分析
- 仅将有代表性且稳定的 benchmark 升级为永久 CI gate

## 不适用场景

- 仅涉及正确性的失败；使用 `bugfix`
- 没有性能目标的新功能；使用 `feature-dev`
- 保持行为不变的 cleanup；使用 `refactoring`
- 可以直接回答的一般性能概念
- 未经明确授权的生产或第三方系统负载生成

## 安装

```bash
skill-forge install performance-testing --lang en --agent codex
skill-forge install performance-testing --lang ko --agent claude
skill-forge install performance-testing --lang zh --agent cursor
```

## 包含资源

- `assets/performance-log-template.md`：可复现的实验和原因分析日志
- `references/measurement-quality.md`：工作负载、指标、波动、阈值与 CI gate 指南
- `references/regression-analysis.md`：回归确认、竞争假设、因果置信度与应对选择
- `examples/`：trigger 与 non-trigger 边界案例
