# 性能回归分析

候选方案更慢、出现混合权衡或产生意外结果时阅读本文。

## 1. 解释前先确认

执行足够的重复 trial，检查相同命令、构建、输入和指标定义，区分 cold 与 warm 状态，检查 error、retry、timeout、throttling、后台负载、runner 变化和分析工具开销，并判断差异是否明显大于正常波动。

未确认的效果应分类为无法判断。不要为可能只是测量噪声的结果制造 root cause。

## 2. 定位回归

按能够区分行为的维度拆分聚合结果：

- operation、endpoint、request type 或 dataset；
- median 与 tail percentile；
- cold start、warm steady state、burst 或 saturation；
- client、network、server、database、cache 或外部依赖；
- CPU、wall time、allocation、memory、GC、I/O、lock、queue 或 retry；
- fixed load 与 fixed concurrency；
- 成功工作与失败工作。

寻找回归从哪里开始，而不只是在哪里变得可见。

## 3. 建立竞争假设

修改实现前创建简短假设表。

| 假设 | 预期信号 | 区分实验 | 支持证据 | 反对证据 | 状态 |
| --- | --- | --- | --- | --- | --- |
| 示例：cache warm-up 成本 | cold 回归、warm 恢复 | 分开 cold 与 warm trial | 首次运行慢 | warm 也回归 | 开放 |

合理时至少包含一个环境或测量解释。不要只因为代码变化是新的就锚定它。

## 4. 运行区分实验

优先选择让主要假设产生不同预测的实验：启用或禁用一条新路径、改变数据量或并发、分开 cold 与 warm、隔离 I/O 与 CPU、比较 allocation 或 GC 与 wall time、检查前后 query plan，或先用 profiler 定位再用 ablation 验证因果。

不要同时进行多个宽泛优化。结果变化时必须能够识别哪个干预有效。

## 5. 评估因果置信度

- **低：** 只有时间关联、一次 profile 或合理静态解释。
- **中：** 可重复相关，并有证据表明竞争解释更弱。
- **高：** 受控干预、消融或反转在相关条件稳定时按预测改变结果。

语言应匹配证据。原因未确认时使用“与……一致”或“可能”。

## 6. 评估完整权衡

记录哪些指标改善、回归或稳定，哪些工作负载受影响，原始目标是否达成，以及用户、容量、成本与可靠性影响。区分一次性、cold-start、steady-state 和 saturation 成本，不要把混合结果压缩成单一“更快”或“更慢”。

## 7. 选择应对方案

仅在确认和分析后选择：保留候选、保留并修复局部原因、改变配置或 rollout 条件、继续区分实验、测试替代实现、因成本超过收益而 revert，或先临时 rollback 控制生产影响后继续分析。

未经测量的替代方案仍是假设。rollback 恢复状态，但不能解释回归。

## 8. 保存调查

在性能日志中记录回归、重复测量、假设表、实验、被否定解释、原因置信度、应对决策和最终重新测量。

当证据足以支持决策时停止，而不是等待所有理论问题都得到回答。原因仍未解决时，指出最能降低不确定性的下一项最小实验。
