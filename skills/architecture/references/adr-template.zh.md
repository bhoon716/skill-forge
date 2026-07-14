# Architecture Decision Record 模板

将此结构复制到仓库既有的决策日志位置。保持本地命名和状态约定。

```md
# ADR: <简短的决策标题>

- Status: proposed | accepted | superseded | deprecated
- Date: <YYYY-MM-DD>
- Owners: <人或团队>
- Scope: <系统、能力或边界>

## Context

需要做什么决策？说明问题、系统边界、用户或调用者、约束、兼容性需求和现有证据。分开事实、假设和未解决问题。

## Decision drivers

- <质量属性或业务约束>
- <运维、安全、数据或交付约束>

## Quality scenarios

| Scenario | 目标或当前证据 | Priority |
| --- | --- | --- |
| <环境中的 stimulus> | <可测量 response 或未知项> | <high/medium/low> |

## Options considered

### Option A — <名称>

<职责、边界、通信、数据所有权、运行时和部署行为。>

### Option B — <名称>

<与 Option A 相同的字段。>

## Decision

选择 <option>。解释它为什么符合当前 drivers，并指出它有意不优化什么。

## Consequences

### Benefits

- <收益>

### Costs and risks

- <成本、风险或接受的限制>

### Mitigations and guardrails

- <缓解措施、负责人或验证>

## Migration and validation

<渐进步骤、兼容策略、发布信号、回滚、数据对账以及测试或测量。>

## Revisit triggers

- <应重新打开该决策的测量阈值、产品变化、事件或日期>

## Open questions

- <不阻塞当前决策的问题>
```
