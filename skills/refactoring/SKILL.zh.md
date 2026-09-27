---
name: refactoring
description: 当用户要求在保持外部可观察行为不变的前提下进行 refactor、cleanup、simplify、extract、rename、去重、提高可读性、拆分文件、改善 separation of concerns 或提高 testability 时使用。本 Skill 通过 Baseline → Transform → Same Tests 引导保守、测试保护的重构：先定义必须保持不变的行为边界，编辑前运行 baseline tests，一次只做一个小而安全的转换，重新运行同一批测试；若无法验证行为保持，则停止、回滚或缩小范围。不要用于功能开发、bug 修复、故意行为变更、推测性重写、架构重设计、依赖升级、大范围 cleanup，或审计整个代码库的理解风险；后者使用 `cognitive-debt`。
---

# refactoring

## 目的

在保持外部可观察行为不变的前提下改善代码结构。

在测试证明之前，重构都应被视为不安全。核心循环是 Baseline → Transform → Same Tests。

1. 定义必须保持不变的行为边界。
2. 找到覆盖目标代码或行为的现有测试。
3. 编辑前运行这些测试。
4. 记录 baseline 结果。
5. 应用一个小而安全的转换。
6. 转换后重新运行同一批测试。
7. 只有同一批测试仍通过才继续。
8. 若无法验证行为保持，停止、回滚或缩小范围。

## 何时使用

当任务主要是在保持行为不变的前提下改变内部代码结构时使用。

示例：

- 重构模块
- 清理组件
- 简化函数
- 抽取 helper
- 去除重复
- 改善可读性
- 拆分大文件
- 为清晰性重命名方法
- 改善关注点分离
- 不改行为地让代码更易测试

## 何时不要使用

以下任务不要使用：

- 添加新行为。使用 `feature-dev`。
- 修复坏掉的行为。使用 `bugfix`。
- 仅调查。
- 仅依赖升级。
- 审计代码库或子系统以发现并排序理解风险。使用 `cognitive-debt`。
- 有意架构改变。
- 有意产品行为改变。
- 从零重写。

若任务混合重构、功能开发或 bug 修复，不要默默混合。坏行为先用 `bugfix`，新行为先用 `feature-dev`。本 Skill 只用于行为保持的 cleanup 部分。

## 核心规则：只做测试保护的重构

不要：

- 添加新产品行为。
- 修复无关 bug。
- 未明确要求就改变 API contract。
- 未明确要求就改变 UI behavior。
- 未明确要求就改变 DB schema。
- 改变 permission、auth、billing、privacy、security 或 data-loss behavior。
- 以重构名义重写架构。
- 将重构和功能开发混在一起。
- 将重构和大范围依赖升级混在一起。
- 不走标准流程修改 generated、vendor、lock 或 build output 文件。
- 因测试失败而删除测试。
- 在失去行为覆盖的情况下只为了适配内部实现而改测试。
- 未运行测试或等价验证就声称行为保持。

## 工作流：Baseline → Transform → Same Tests

### 1. 重构目标

编辑前识别明确的重构理由。

可能目标：

- 降低重复
- 改善可读性
- 抽取函数、类、组件、模块或服务
- 改善命名
- 简化 control flow
- 隔离 side effect
- 降低 coupling
- 提高 cohesion
- 分离职责
- 提高 testability
- 降低 complexity
- 只在证明确实未使用时删除 dead code
- 规范化现有模式

编辑前用一两句话说明目标。类似“让它更好”这种模糊目标不足以支撑大范围变更。

把简化建议视为需要验证的假设。仅凭文件长度、AI 编写与否或复杂度指标，不能证明代码需要修改。合并看似相似的行为前先追踪它们；它们可能保护不同的领域规则或 contract。

作为判断辅助，依次考虑能否安全删除行为、与现有实现合并，或是否需要新增内容；这只是调查顺序，并不意味着自动偏好删除。只有在不掩盖重要不变量或边界、且能减少已证实的复杂性来源时才添加 abstraction。

### 2. 行为边界

定义哪些内容必须保持不变。

需要保持：

- public API shape
- function signature
- return value
- 非 internal-only 的 error type/message
- UI text 和 visible state
- route、command、flag、config 名称
- DB read/write、migration、transaction semantics
- authentication/authorization behavior
- billing、privacy、security、data-loss behavior
- 被外部消费或测试的 logging/metrics
- 相关 performance characteristics
- timing、concurrency、caching、retry behavior

若无法识别行为边界，缩小重构或停止。

### 3. 上下文发现

编辑前了解 local conventions。

- `AGENTS.md`、`CLAUDE.md`、`.cursor/rules`、`README.md`、`CONTRIBUTING.md`
- `package.json`、`pyproject.toml`、`Cargo.toml`、`go.mod`、`pom.xml`、`build.gradle`、`Makefile`、`justfile`、`Taskfile.yml`
- `jest.config.*`、`vitest.config.*`、`pytest.ini`、`tox.ini`、`playwright.config.*`、`cypress.config.*`、`rspec`、`phpunit.xml`、`.github/workflows`
- 现有测试目录和命名约定
- 覆盖目标代码的测试
- 类似代码路径和类似测试
- public interface、API contract、UI state、persistence、side effect、logs、metrics、permission、error behavior
- generated file convention 和 formatting/linting command

优先遵循现有约定。

### 4. 测试发现

编辑前寻找现有测试。

- unit tests
- integration tests
- component tests
- API/contract tests
- snapshot tests
- e2e tests
- golden file tests
- type-level tests
- build/typecheck/lint checks
- CI workflow commands

若没有相关测试，可行时添加 characterization test。它应捕获当前行为的最小情形，不要发明新期望。不可行时，只做 mechanical low-risk transformations 并报告弱保护。

### 5. Baseline test run

编辑生产代码前运行相关测试。

记录命令、结果、失败摘要、失败是否与目标代码相关、baseline 是否足够安全。

若 target area baseline 为 red，不要进行广泛重构。先使用 `bugfix` 或请求方向。

### 6. 重构计划

把重构拆成小转换。尽量分离 mechanical changes 和 logic-looking transformations。触及大量文件的 rename 不应和 logic change 混合。

### 7. Transform phase

一次只应用一个有意义的转换。

规则：

- diff 小且可审查。
- 不合并无关转换。
- 除非行为覆盖仍在，不要仅为了新 internals 改测试。
- 不引入新行为。
- 不修复重构中发现的无关问题。
- 不追逐超出目标的 style preference。
- 每次转换后检查 diff，寻找意外行为变化。

### 8. Same Tests phase

每次有意义转换后，重新运行 baseline 使用的同一批测试。

- 尽可能运行同一命令。
- 与 baseline 比较。
- 仍通过则继续。
- 失败则判断是否由转换造成。
- 若由转换造成，修正或回滚。
- 若无关或 flaky，记录证据并避免扩大范围。
- 不要在失败状态上继续叠加转换。

### 9. 更广验证

计划转换完成后，先运行同一 baseline test，再按可行性扩大验证。

- 相关测试套件
- typecheck
- lint
- build
- formatting check
- API contract tests
- 可能影响 UI 时的 UI/component/e2e tests
- performance-sensitive 代码的 performance checks

### 10. 最终 review

报告前检查最终 diff。

- public behavior 是否变化？
- test expectation 是否变化？
- public interface 是否变化？
- error message/status code 是否变化？
- permission/security behavior 是否变化？
- persistence behavior 是否变化？
- logging/metrics behavior 是否变化？
- 是否混入无关 cleanup？
- diff 是否比重写更小更清晰？
- 所有验证声明是否有实际命令支撑？

### 11. 最终报告

没有测试或等价验证时，不要声称行为保持。

包括：

- 重构目标
- 行为保持边界
- 变更文件
- 编辑前 baseline tests
- 转换后 same tests
- 额外验证命令和结果
- 添加的 characterization tests
- 无法运行的测试
- 已知风险或 follow-up
- 若因缺少测试而保护较弱，明确说明

## 安全转换

- local variable rename
- 抽取 function/component/constant/helper
- inline 不必要 indirection
- 移除明显重复
- 不改变 truth table 的 conditional 简化
- 不改逻辑地移动代码
- 分离 pure logic 和 side effects
- 使用现有 project abstraction
- 不改变 public contract 的 module boundary 改善
- 只在强证据表明不可达或未使用时删除 dead code

## 高风险转换

避免或需明确额外谨慎：

- public API 改变
- DB schema/migration 改变
- authorization logic 改变
- error semantics 改变
- concurrency/async ordering 改变
- caching/retry behavior 改变
- time/timezone/locale/encoding/rounding 改变
- serialization/deserialization 改变
- dependency version 改变
- 替换整个 subsystem
- 从零重写可工作的代码
- 大文件移动和逻辑改变混合

## Acceptance criteria checklist

- 目标具体。
- 行为边界明确。
- 编辑前运行 baseline verification 或明确说明限制。
- 每次转换小且可审查。
- 可行时转换后运行同一批测试。
- 未引入新行为。
- 未混入无关 bugfix。
- 未在无明确请求时改变 public contract。
- 有最终验证证据。

## Test protection checklist

编辑前：

- 识别相关测试。
- coverage 缺失且可行时添加 characterization test。
- 运行并记录 baseline tests。
- target area baseline red 时停止或缩小范围。

转换后：

- 重新运行同一批测试。
- 与 baseline 比较。
- 由 refactor 导致失败时停止。
- 保持不确定性可见。

## Verification command strategy

1. 覆盖目标行为的最小 targeted test
2. 每次转换后同一 targeted test
3. 相关测试套件
4. typecheck
5. lint
6. build
7. formatting check
8. 相关 contract/UI/e2e/performance checks

除非没有可执行行为测试且变更纯机械，否则 typecheck/lint 不能单独证明行为保持。

## 决策规则

- 没有相关测试时，可行则先添加 characterization tests。
- 无法添加时，限制为 mechanical low-risk changes 并报告弱保护。
- target area baseline red 时，先使用 `bugfix`。
- target 外 baseline red 时，只能窄范围继续并报告 pre-existing failure。
- 若重构需要改变 public behavior，停止并重新归类为 `feature-dev` 或 `bugfix`。
- 发现 bug 时不要静默修复；报告或切换到 `bugfix`。
- 需要大范围架构重设计时，请求明确批准或拆分设计任务。
- generated 文件必须用标准生成命令更新。
- 无法验证行为保持时停止扩大重构。

## 失败处理

post-transform test 失败就是停止信号。

- 测试失败时不要继续叠加变更。
- 先判断失败是否由 refactor 造成。
- 若是，修正或回滚。
- 若无关，记录证据并避免扩大范围。
- 若 flaky，合理时重跑一次并报告不确定性。
- baseline 不 clean 时，不要声称完全验证。

## Anti-patterns

- “顺手” cleanup
- 重构和功能开发放进一个 diff
- 重构和 bug 修复放进一个 diff
- 用重写模块代替安全转换
- 改测试适配 internals 却丢失行为覆盖
- 删除失败测试
- 意外改变 public API shape
- 意外改变 error message/status code
- 意外改变 auth、billing、privacy、data-loss behavior
- file move 和 logic change 混合
- formatting-only 大 diff 混入 logic-looking changes
- 不重跑 baseline tests 就声称等价
- 只用 typecheck/lint 声称 behavior preservation

## Final response template

Summary:
- <refactoring objective and result>

Behavior preservation:
- Boundary preserved: <public behavior, API, UI, persistence, errors, permissions, etc.>
- Characterization added: <yes/no, details>

Files changed:
- `<path>`: <reason>

Verification:
- Baseline before editing: `<command>` → <result>
- Same tests after transform: `<command>` → <result>
- Additional checks: `<command>` → <result>

Notes:
- <pre-existing failures, skipped checks, weak test coverage, risks, or follow-ups>
