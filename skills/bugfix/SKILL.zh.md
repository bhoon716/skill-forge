---
name: bugfix
description: 当用户要求修复坏掉、错误、失败、flaky 或回归的行为时使用，例如 failing tests、错误 status code、crash、被忽略的 CLI flag、重复输出、错误 UI 渲染、无限 retry、stack trace，或过去能工作现在不能工作的行为。本 Skill 通过 Reproduce → Root Cause → Regression Test → Minimal Fix → Verify 引导回归测试驱动的 bug 修复：捕获症状，复现或用代表性 regression case 表达失败，定义 expected/actual behavior，定位 root cause，可行时先添加或更新失败的 regression test，再做最小安全修复，并诚实验证。不要用于新功能开发、行为保持重构、推测性 cleanup、架构重设计、依赖升级、仅文档、仅测试清理，或没有修复要求的一般调查。
---

# bugfix

## 目的

用证据修复坏掉、错误、失败、flaky 或回归的行为。

在原始失败或代表性 regression test 被验证为已修复前，bug fix 不算成立。核心循环是 Reproduce → Root Cause → Regression Test → Minimal Fix → Verify。

1. 捕获报告的症状。
2. 复现失败或找到现有 failing test。
3. 确认 expected behavior 与 actual behavior。
4. 定位 root cause。
5. 添加或更新会因该 bug 失败的 regression test。
6. 确认 regression test 因预期原因失败。
7. 应用解决 root cause 的最小安全修复。
8. 重新运行 regression test 并确认通过。
9. 运行相关验证。
10. 如实报告复现、root cause、修复和验证。

## 何时使用

当任务主要是修复坏掉的行为时使用。

示例：

- 修复 failing test
- endpoint 返回错误 status code
- login button 无反应
- empty input 导致 app crash
- export 包含重复 rows
- job 无限 retry
- component 渲染错误值
- CLI flag 被忽略
- 修复 regression
- 调查并修复 stack trace
- 过去能工作现在不能工作

## 何时不要使用

以下任务不要使用：

- 添加新行为。使用 `feature-dev`。
- 在保持行为不变时改善结构。使用 `refactoring`。
- 没有修复要求的仅调查。
- 仅文档。
- 仅测试清理。
- 不是修复 bug 必需的依赖升级。
- 有意产品行为改变。

若 bug 修复和重构或功能开发混合，先用最小变更修复 bug。避免 opportunistic cleanup。除非恢复预期行为必需，不添加新行为。bug 修复并验证后，再单独用 `refactoring`；若用户要新行为，单独用 `feature-dev`。

## 核心规则：只做回归测试驱动的 bug 修复

不要：

- 添加无关新行为。
- 做大范围无关重构。
- 在 root cause 不要求或用户未明确批准时重写架构。
- 修复调查中发现的无关 bug。
- 只掩盖症状而不处理 root cause。
- 删除或弱化 failing tests 让 build 通过。
- 改变 bug 修复范围外的 public behavior。
- 除非为了恢复预期行为，不改变 API contracts。
- 改变与报告 bug 无关的 UI behavior。
- 除非修复需要且符合约定，不改变 DB schema。
- 没有明确证据和验证时，不改变 permission、auth、billing、privacy、security、data-loss behavior。
- 除非通过标准 workflow 必要，不修改 generated、vendor、lock、build output 文件。
- 未复现或未验证等价 regression case 就声称 bug 已修复。
- 声称未运行的测试已通过。

## 工作流：Reproduce → Root Cause → Regression Test → Minimal Fix → Verify

### 1. 症状捕获

编辑前记录确切症状。

- 用户报告的问题
- expected behavior
- actual behavior
- error message
- stack trace
- failing command 或 failing test
- logs 或 trace IDs
- screenshot 或 UI state
- API 相关 request payload/response
- input data/output data
- 环境假设
- deterministic/intermittent/environment-specific
- 是否为过去可用的 regression

在理解要修复什么之前不要编辑。

### 2. 上下文发现

查看足够上下文来复现并按项目约定修复。

- `AGENTS.md`、`CLAUDE.md`、`.cursor/rules`、`README.md`、`CONTRIBUTING.md`
- `package.json`、`pyproject.toml`、`Cargo.toml`、`go.mod`、`pom.xml`、`build.gradle`、`Makefile`、`justfile`、`Taskfile.yml`
- `jest.config.*`、`vitest.config.*`、`pytest.ini`、`tox.ini`、`playwright.config.*`、`cypress.config.*`、`rspec`、`phpunit.xml`、`.github/workflows`
- 现有 failing tests
- 相关 source/test files
- 可用时查看 git history 中的近期变更
- logs、stack traces、screenshots、traces、request payloads、config、env vars、feature flags、seed data、timezone、locale、browser/runtime version、external services
- 类似正常路径和类似 bug fixes
- 可能受影响的 UI、API、service、domain、persistence、async jobs、queues、cache、config、auth、permissions、logging、metrics、docs

优先遵循现有约定。

### 3. 复现

尝试复现 bug。

优先顺序：

1. 现有 failing test
2. 用户提供的 failing command
3. 最小 automated test
4. 最小 script 或 fixture
5. manual reproduction steps
6. 无法 live reproduce 时使用 log/trace-based reproduction

记录复现命令或步骤、结果、是否复现。若未复现，记录仍支持该 bug 的证据。

无法复现时，只有明确 evidence trail 才继续，并报告不确定性。

### 4. Expected behavior 定义

用最强证据定义预期行为。

- 用户请求
- 现有测试
- 文档
- 类似正常功能
- API contracts
- product copy
- type definitions
- 可用时历史行为
- domain invariants
- error-handling conventions

若 expected behavior 模糊且影响产品政策、安全、billing、privacy、data loss、permissions 或 user-visible semantics，停止并提问。

### 5. Root cause localization

编辑前识别 root cause 或最窄可信原因。

- 从 symptom 追踪到 application code
- 跟踪 data flow 和 control flow
- 查看最接近 project code 的 stack frames
- 比较 broken path 和 similar working path
- 检查 null、undefined、empty、zero、timezone、locale、encoding、rounding、pagination、sorting、concurrency、race、cache、retry、permission、feature flag 等边界
- git history 有用时检查近期 regression
- 区分 root cause 和 downstream symptoms
- 修复前用一句话说明原因

不要随机 patch。不要同时编辑多个无关区域碰运气。

### 6. Regression test

可行时，在改生产代码前添加或更新 regression test。

测试应：

- 修复前失败。
- 因报告的 bug 失败，而不是 setup 错误。
- 表示最小有意义失败 case。
- 保护预期行为。
- 不过度依赖实现细节。
- 放在类似测试附近。
- 使用现有 helper、fixture、mock、naming conventions。
- 覆盖导致失败的 input、boundary 或 state。
- 只添加直接来自 root cause 的相关 edge cases。

可行时先运行 regression test，确认 red state。不可行时说明原因并使用最接近的验证方法。

### 7. Fix strategy

选择解决 root cause 的最小安全修复。

- 修原因，不只修症状。
- 保持无关行为。
- 优先 local change 而非 broad rewrite。
- 优先现有 abstraction 和 convention。
- 避免 opportunistic refactoring。
- 避免 speculative generalization。
- 除非恢复预期行为需要，不改变 public contracts。
- 不要为了测试通过而弱化 validation、auth、permission 或 error handling。
- 若正确修复需要更大设计变更，停止并报告原因。

### 8. Minimal fix implementation

只实现必要生产变更。

- diff 窄且可审查。
- 避免触碰无关文件。
- 避免 formatting-only churn。
- 测试变更聚焦 regression coverage。
- 只有 bugfix 改变文档化行为或修正文档错误时才更新 docs。
- generated 文件必须通过项目标准生成命令更新。

### 9. Verification

修复后验证：

- regression test 现在通过。
- 原始 failing command、test 或 scenario 现在通过。
- 相关测试仍通过。
- 相关且可行时 typecheck、lint、build、formatting checks 通过。
- UI/API behavior 通过项目合适机制验证。
- 若 root cause 暗示一类失败，检查 similar paths 未被破坏。

先运行最窄有用测试，再扩大。没有实际验证不要声称成功。

### 10. Final review

报告前检查 final diff。

- 修复是否直接处理 root cause？
- 是否改变无关行为？
- public API shape 是否变化？
- error message/status code 是否意外变化？
- permission、security、privacy、billing、data-loss behavior 是否变化？
- 是否混入无关 refactor/cleanup？
- 可行时 regression test 是否 fix 前失败、fix 后通过？
- 所有验证声明是否由实际命令支撑？

### 11. Final report

包括：

- 症状
- 复现方法
- expected behavior
- actual behavior
- root cause
- fix summary
- 添加或更新的 regression test
- 验证命令和结果
- 无法运行的测试
- 剩余风险或 follow-up
- 若复现或 regression testing 不完整，明确说明不确定性

## Regression test checklist

生产变更前：

- 识别或创建失败 case。
- 确认失败表示报告的 bug。
- 测试保持最小且有意义。
- 使用现有 helper 和 convention。
- 没有证据不要改变 expected behavior。
- 记录 red command 和失败原因。

修复后：

- 重新运行 regression test。
- 确认通过。
- 可用时重新运行原始 failing command/scenario。
- focused check green 后再扩大验证。

## Root cause checklist

修复前确认：

- 已将失败行为追踪到最窄可信来源。
- expected behavior 有证据。
- 可用时比较了 similar working paths。
- 考虑了 boundary conditions。
- git history 有用时检查了近期 regression。
- 计划修复处理 root cause，而不仅是表面症状。

## Verification command strategy

1. 现有 failing test 或用户提供 failing command
2. red 状态的新/更新 regression test
3. fix 后同一 regression test
4. fix 后原始 failing scenario
5. 相关测试套件
6. typecheck
7. lint
8. build
9. formatting check
10. 相关 UI/API/integration/e2e checks

lint/typecheck alone 不能证明 bug 已修复。

## 决策规则

- 不能复现 bug 时，只能基于明确 evidence trail 继续并报告不确定性。
- expected behavior 模糊时，安全则按现有模式推断，否则提问。
- 涉及 security、privacy、billing、permission、data loss、destructive actions 时需要更强证据和验证。
- failing test 看似无效时不要删除。说明原因，并只在 behavior 仍被覆盖时更新。
- root cause 需要 broad refactor 时，先分离 minimal fix 和后续 refactor。
- root cause 需要新产品行为时，重新归类或与 `feature-dev` 协调。
- 外部服务、config、environment、data 导致时，只在合适时修 local handling，并报告外部依赖。
- 区分 pre-existing failures 和 fix 引入的 failures。
- fix 改变 public behavior 时，说明旧行为为何错误以及新行为为何符合意图。
- generated 文件通过标准命令更新。
- flaky bug 尽量用 deterministic test 表达，除非项目模式要求，否则不要用 sleep 掩盖。

## 失败处理

- regression test fix 前不失败时，它可能没有覆盖 bug。
- fix 后 regression test 仍失败时不要声称成功。
- fix 导致无关测试失败时，调查是否真的无关。
- 无法完成验证时，准确报告验证了什么和没验证什么。
- 发现更大 design flaw 时，先停在 minimal safe fix 或报告需要更大变更。
- 多个 root causes 时，先修报告的问题，其他另行报告。
- bug 在 config、data 或 external systems 而非 codebase 时，记录证据并避免不必要代码变更。

## Anti-patterns

- 复现失败前编辑生产代码
- 没有 root cause 就随机 patch
- catch 并忽略异常来掩盖错误
- bug fix 中做 broad refactoring
- 同一 diff 修无关 bug
- 弱化测试让它通过
- 删除 failing tests
- 没有证据就改变 expected behavior
- 随意改变 auth、permission、privacy、billing、data-loss behavior
- 把 lint/typecheck 通过当作 bug 已修复
- 不重跑原始 failing scenario 就声称原问题已修复
- 不理解 race 就加 sleep
- root cause 更广却只对 exact input 过拟合
- 用重写模块代替 minimal targeted fix
- regression test 未自动化或未文档化

## Final response template

Summary:
- <bug fixed and user-visible impact>

Symptom:
- Expected: <expected behavior>
- Actual: <actual behavior>

Root cause:
- <concise explanation>

Fix:
- <minimal change made>

Files changed:
- `<path>`: <reason>

Regression coverage:
- Added/updated: <test files or cases>
- Red phase: `<command>` → <failed as expected because...>
- Green phase: `<command>` → <passed>

Verification:
- Original failure: `<command or scenario>` → <result>
- Related checks: `<command>` → <result>

Notes:
- <unreproduced aspects, skipped checks, pre-existing failures, risks, or follow-ups>
