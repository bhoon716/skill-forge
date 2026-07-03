---
name: feature-dev
description: 当用户要求在代码库中添加、实现、创建、支持、启用、暴露、集成或构建新的能力、API、UI 行为、命令、选项、工作流或产品行为时使用。本 Skill 通过 Red → Green → Refactor 引导严格的测试驱动功能开发：先把需求转成可测试行为，先写或更新测试，确认有意义的失败，再实现最小可通过变更，只在 green 后重构，并如实报告验证结果。不要用于 bug 修复、行为保持重构、仅调查、仅文档、仅测试清理，或非功能必需的依赖升级。
---

# Feature Dev

## 目的

用严格的测试驱动开发实现新的产品或代码行为。

核心循环是 Red → Green → Refactor。

1. 将请求的功能转成可测试行为。
2. 在生产代码前编写或更新测试。
3. 运行测试并确认它因预期原因失败。
4. 实现让测试通过所需的最小生产代码变更。
5. 再次运行测试并确认通过。
6. 只在测试 green 后进行重构。
7. 运行相关验证命令。
8. 报告改了什么以及如何验证。

## 何时使用

当任务主要是添加新行为时使用。

示例：

- 添加 GitHub 登录支持
- 实现 CSV 导出
- 创建设置页面
- 添加命令行 flag
- 在 API 响应中暴露字段
- 支持组件 dark mode
- 为失败 job 构建 retry 机制

## 何时不要使用

以下任务不要使用：

- 修复坏掉的行为。使用 `bugfix`。
- 在保持行为不变的前提下改善结构。使用 `refactoring`。
- 仅调查。
- 仅文档。
- 仅测试清理。
- 不是功能必需的依赖升级。

如果任务混合了功能开发、bug 修复或重构，要保持功能实现聚焦。若现有坏行为阻塞功能，先用 `bugfix`。功能工作后如仍需结构清理，再单独使用 `refactoring`。

## 非目标

不要：

- 做大范围无关重构。
- 修复无关 bug。
- 在非功能必需时重写架构。
- 添加未请求的产品行为。
- 在已有测试框架时跳过测试。
- 把未执行的测试当作正确性证明。
- 声称执行了未执行的验证。
- 改变与请求功能无关的 public behavior。
- 除非必要，不修改 generated、vendor、lock 或 build output 文件。

## 上下文发现

改代码前先了解仓库约定。

如存在，检查：

- `AGENTS.md`、`CLAUDE.md`、`.cursor/rules`、`README.md`、`CONTRIBUTING.md`
- `package.json`、`pyproject.toml`、`Cargo.toml`、`go.mod`、`pom.xml`、`build.gradle`、`Makefile`、`justfile`、`Taskfile.yml`
- `jest.config.*`、`vitest.config.*`、`pytest.ini`、`tox.ini`、`playwright.config.*`、`cypress.config.*`、`rspec`、`phpunit.xml`、`.github/workflows`
- 现有测试目录和命名约定
- 类似功能及其测试
- test helper、factory、fixture、mock、stub、snapshot、integration utility
- 可能受影响的 UI、API、service、domain、persistence、config、auth、permission、logging、metrics、docs 层

优先遵循现有约定，不要发明新模式。

## 工作流

### 1. 功能界定

写测试前先把请求转成具体行为。

识别：

- 新行为
- actor 或用户
- 输入和输出
- 状态变化
- 错误和 edge case
- 权限/授权影响
- 数据持久化影响
- API contract 影响
- UI 状态
- backward compatibility
- logs/metrics 等 observability 需求

每条 acceptance criterion 都应可测试。若缺失的产品决策会影响 public behavior、安全、privacy、data loss、billing 或 permission，应提问。

### 2. 测试发现

找到应该描述新行为的测试位置。

- 目标代码附近的现有测试
- 类似功能测试
- helper、factory、fixture、mock、stub、snapshot、integration utility
- targeted test 命令
- 本层通常使用的 unit、integration、component、e2e、contract 或 snapshot 测试

### 3. 测试设计

先设计测试，再写生产代码。

按需覆盖：

- happy path
- 重要 edge case
- validation error
- permission/authorization failure
- empty/loading/failure state
- API request/response shape
- persistence side effect
- event emission
- 仅在项目已有相关测试时覆盖 logs/metrics
- backward compatibility

测试应面向行为，而不是实现细节。

### 4. Red phase

先写或更新测试。

然后运行最窄且有用的测试命令，确认：

- 测试失败。
- 失败原因符合预期。
- 失败证明请求行为缺失或未完成。

如果实现前测试已通过，修正测试或重新判断功能是否已存在。如果测试因无关原因失败，修复测试设置或报告 blocker。

记录命令、失败摘要和失败为何有意义。

### 5. Green phase

只实现让失败测试通过所需的最小生产变更。

规则：

- 遵循现有约定。
- 适当复用现有 abstraction。
- 聚焦请求行为。
- 避免大范围重构。
- 不改变无关 public behavior。
- 仅在功能直接需要时添加 config、migration、docs 或 example。
- generated 文件只通过标准生成命令更新。
- lock 文件只在功能必需的依赖变更时更新。

再次运行 targeted test 并确认通过。

### 6. Refactor phase

只在 targeted tests green 后重构。

允许：

- 移除实现引入的重复。
- 改善直接提升清晰度的命名或抽取。
- 对齐现有 local pattern。

如果清理变大，停止并建议单独的重构任务。重构后重新运行同一批测试。

### 7. 更广验证

targeted test 通过后，在可行范围内扩展验证。

- 相关测试套件
- typecheck
- lint
- build
- formatting check
- API contract tests
- UI/component/e2e tests
- 无自动化覆盖时的 manual verification

先运行最窄有用命令，再扩大。无法运行的检查要明确说明。

## 决策规则

- 没有测试框架时，只在符合仓库风格时创建最小实用测试框架；否则做最接近的验证并报告限制。
- 功能已存在时不要重复实现；必要时只补测试或文档。
- 产品决策缺失时，安全则按现有模式推断，否则提问。
- 安全、privacy、data loss、billing、permission 不明确时停止并提问。
- 需要 migration 时遵循既有 migration、compatibility、rollback 约定。
- generated 文件只用标准生成命令更新。
- 区分无关测试失败和功能变更引入的失败。

## 最终报告

只报告实际执行过的验证。

包括：

- 新行为摘要
- 变更文件
- 添加或更新的测试
- Red phase 结果：命令和预期失败摘要
- Green phase 结果：命令和通过结果
- 额外验证命令和结果
- 限制、风险、跳过的检查、follow-up

不要声称未运行的测试已经通过。

## 质量标准

完成的功能应：

- 满足 acceptance criteria。
- 在有测试框架时由合适层级的测试覆盖。
- 保持无关 public behavior。
- 遵循 local convention。
- 实现范围狭窄。
- 留下可审查的验证证据。
