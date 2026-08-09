# 性能实验：[简短标题]

- 日期：YYYY-MM-DD
- 状态：计划 | 测量中 | 分析中 | 完成 | 无法判断
- 负责人：[需要时填写人员或 agent]
- 目标：[system、operation、endpoint 或 code path]
- Baseline revision/state：[commit、tag、artifact 或配置]
- Candidate revision/state：[commit、working tree、artifact 或配置]
- 最终分类：改善 | 回归 | 混合 | 无实质差异 | 无法判断

## 1. 问题与决策

- 性能问题：
- 本实验支持的决策：
- 主要指标：
- 保护指标：
- 已有 budget、SLO 或 threshold：
- 测试层级：microbenchmark | component | end-to-end | load | stress | soak | profile

## 2. 实验条件

- 命令或步骤：
- Build mode：
- Runtime 与 dependency version：
- Hardware 或 runner：
- 相关配置：
- Dataset 与 seed：
- Workload 与 request mix：
- Concurrency 与 duration：
- Cold/warm 与 cache 状态：
- Warm-up：
- Trial 与 sample：
- Baseline 与 candidate 的已知差异：

## 3. 测量结果

| 指标 | Baseline | Candidate | 绝对差异 | 相对差异 | 分布 / 置信度 | 分类 |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| [指标与单位] | | | | | | |

### 原始 artifact

- Baseline output：
- Candidate output：
- Profile 或 trace：

## 4. 观测

- 改善指标：
- 回归指标：
- 稳定指标：
- 受影响的 workload 或 percentile：
- 异常与 error：
- 差异是否超出预期波动：是 | 否 | 不确定

## 5. 原因分析

| 假设 | 预期信号 | 区分实验 | 支持证据 | 反对证据 | 状态 |
| --- | --- | --- | --- | --- | --- |
| | | | | | 开放 |

- 最可信原因：
- 置信度：低 | 中 | 高
- 连接原因与结果的证据：
- 仍未解释的行为：

## 6. 尝试记录

### 尝试 1：[名称]

- 变更或实验：
- 预测：
- 结果：
- 解释：
- 保留、否定或继续调查：

## 7. 决策

- 选择的应对：保留 | 局部修复 | 调整条件 | 更多证据 | 替代方案 | revert | 临时 rollback
- 理由：
- 用户、capacity、cost 和 reliability 影响：
- 紧急缓解措施：
- 选择或不选择 rollback、替代方案的原因：

## 8. 最终验证

- 最终测量命令：
- 最终结果：
- Correctness check：
- Performance budget 结果：
- 重要限制：
- 最小下一项实验：

## 摘要

[说明发生了什么变化、为什么、证据支持什么决策，以及结论的置信度。]
