# 测量质量

设计 benchmark、选择指标或性能预算、判断噪声比较时阅读本文。

## 选择能回答决策的测试

| 测试 | 适用场景 | 常见限制 |
| --- | --- | --- |
| Microbenchmark | 算法、序列化、分配、热点函数 | 可能忽略 I/O、调度和集成成本 |
| Component benchmark | 数据库、缓存、服务或子系统边界 | fixture 可能不同于生产数据 |
| End-to-end 或 load test | 用户延迟、吞吐量、并发 | 环境噪声和设置成本更高 |
| Stress test | 饱和点、背压、过载失败 | 可能造成干扰，且不能单独代表正常流量 |
| Soak test | 泄漏、队列堆积和长期退化 | 成本高且重复缓慢 |
| Profile 或 trace | 定位时间、分配、I/O 和争用 | 观测证据本身不能证明因果关系 |

从仍能代表决策的最低层级开始。狭窄测试无法代表用户影响时再增加更广层级。

## 测量前定义指标

选择一个主要指标，以及揭示权衡所需的保护指标。

- 延迟：median 与相关 tail percentile，例如 p95 或 p99。
- 吞吐量：在明确并发下单位时间完成的操作数。
- 可靠性：error、timeout、retry、drop 和 rejection rate。
- 资源：CPU time、wall time、memory、allocation、GC、I/O、network 或 cost。
- 可扩展性：指标随负载、数据量、并发或拓扑变化的方式。

保持单位和定义一致。不要把客户端观察延迟和服务器处理时间当作同一指标比较。

## 控制实验

记录并在相关时保持一致：

- source revision 与未提交变更；
- compiler、optimization 和 build mode；
- runtime、dependency、OS、kernel、container 和 database 版本；
- hardware、CPU allocation、memory limit、power mode 和 runner class；
- dataset、seed、request mix、payload size、concurrency 和 duration；
- cache、connection pool、JIT、filesystem、cold 或 warm 状态；
- background work、network path、observability 和 instrumentation overhead。

环境可能随时间漂移时，交替或随机执行 baseline 与 candidate。除非这正是问题，不要比较 debug build 与 release build。

## Warm-up 与重复

- 两者都重要时，分开报告 cold-start 与 warm steady-state。
- 在 steady-state 测量前预热 JIT、cache、pool 和 adaptive optimizer。
- 使用多个独立 trial，而不是只在一个进程内增加 iteration。
- 聚合可能掩盖双峰或漂移时保留每次 trial 数值。
- 预期效果相对噪声较小时增加重复次数。

不要因为 outlier 不支持期望结论就删除它。调查它、使用预先定义的排除规则，或同时报告包含和排除结果。

## 比较结果

每项指标报告：

- baseline；
- candidate；
- 绝对差异；
- 相对差异；
- 重复次数与分布；
- 预先存在的阈值或实际重要性。

对常见偏态延迟分布优先使用 median，对尾部行为使用 percentile。mean 对累加资源总量可能有用，但不要默认使用。

将比较分类为：改善、回归、混合、无实质差异或无法判断。统计显著不等于实际重要；很小但可重复的变化可能无关紧要，而 tail 回归即使对平均值影响很小也可能重要。

## Threshold 与 CI gate

优先使用来自 SLO、容量计划、资源预算、用户影响模型或稳定基线的阈值。不要看到 candidate 后再发明阈值。

仅在工作负载有代表性且足够确定、runner 波动可接受、成本相称、指标与预算是稳定契约，并能提供可复现命令时，才添加永久 CI gate。否则保留 benchmark 命令与日志、在适合的基础设施上定期运行，或使用不阻塞的趋势监控。

## 原始 artifact

将大型机器可读输出与 Markdown 日志分开。优先使用项目约定，否则使用 `.performance-results/<experiment>/` 等清晰目录并从日志链接。

不要在提交的日志或 artifact 中记录 secret、authorization header、生产 payload、个人数据或敏感 profile。
