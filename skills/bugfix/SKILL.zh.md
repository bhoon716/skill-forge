---
name: bugfix
description: 当用户要求诊断并修复坏掉、错误、失败、flaky 或回归的行为时使用，例如 failing test、错误 status code、crash、被忽略的 CLI flag、重复输出、错误 UI rendering、无限 retry、stack trace，或过去能工作现在不能工作的行为。遵循 Reproduce or Establish Evidence → Root Cause → Minimal Fix → Verify 的证据驱动流程，并只在 regression test 能以相称成本提供持久保护时添加。不要用于新功能开发、行为保持重构、推测性 cleanup、架构重设计、依赖升级、仅文档、仅测试清理，或没有修复请求的一般调查。
---

# bugfix

## 目的

用证据修复坏掉的行为，并保持变更狭窄且易于审查。

使用以下核心循环：

1. 复现失败或建立可信 evidence trail。
2. 定义 expected behavior，并识别最窄可信 root cause。
3. 选择最能直接证明修复成功的验证方法。
4. 应用解决原因的最小安全变更。
5. 验证原始行为及相关周边行为。
6. 如实报告已证明和未证明的内容。

新的 regression test 是一种有价值的验证方法，不是所有修复的通用完成条件。验证始终是必需的，但验证形式取决于 bug、风险和 repository 情况。

## 不可妥协的规则

- 编辑前理解报告的失败。
- 修复 root cause，不要掩盖症状。
- 保持无关行为，并让 diff 聚焦。
- 遵循 repository 指令和现有约定。
- 不要仅为通过 checks 而删除或弱化有效测试。
- 不要声称未实际运行的命令、测试或场景已通过。
- 没有直接验证或明确限定的证据时，不要声称 bug 已修复。
- 将 security、authorization、privacy、billing、data loss、destructive action、concurrency 和 public contract 变更视为 high risk，并要求更强证据。
- 避免无关功能、cleanup、refactoring 和 dependency 变更。

## 工作流

### 1. 捕获失败

只收集定义问题所需的上下文：

- 报告的症状；
- expected/actual behavior；
- error、stack trace、log、screenshot、request/response 或 failing command；
- 相关 input、state、environment、version、config 或 external dependency；
- 是否为 deterministic、intermittent、environment-specific 或已知 regression。

查看适用的 `AGENTS.md`、`CLAUDE.md`、`.cursor/rules`、`README.md`、`CONTRIBUTING.md`，以及相关 source、test、build config，并在有用时查看近期 history。

狭窄检查足够时，不要盘点整个 repository。

### 2. 复现或建立证据

优先使用成本最低且最直接的 signal：

1. 现有 failing test 或用户提供的 failing command。
2. 最小 automated test 或 script reproduction。
3. manual UI、API 或 CLI reproduction。
4. 无法 live reproduce 时使用 log、trace、screenshot 或可信 static evidence trail。

记录命令或步骤及观察结果。若无法复现，仅当其余证据支持具体修复时继续，并说明不确定性。

### 3. 定义 Expected behavior

使用最强证据：

- 用户明确意图；
- 现有测试或已文档化 contract；
- 类似正常行为；
- type 或 API definition；
- historical behavior；
- domain 和 error-handling invariant。

若 expected behavior 存在实质歧义，在改变 product semantics 前提问。歧义涉及 security、permission、privacy、billing 或 data loss 时必须提问。

### 4. 定位 Root cause

patch 前将症状追踪到最窄可信原因。比较 broken path 和 working path，跟踪 control/data flow，并检查 empty value、encoding、timezone、pagination、cache、retry、race、permission、feature flag 等相关 boundary。

用一句话说明原因。不要同时修改多个无关区域碰运气。

### 5. 选择回归覆盖和验证

当 regression test 能以合理成本提供持久保护时，添加或更新它。通常在以下条件下适合：

- 可用现有测试基础设施 deterministic 地表达 bug；
- expected behavior 稳定且有意义；
- 失败可能再次发生；
- 影响或风险使未来检测有价值；
- 测试不过度依赖实现细节。

对涉及 security、authorization、billing、data integrity、destructive behavior、concurrency 或 public contract 的 high-risk logic，除非有充分技术原因，否则强烈期望 regression test。

以下情况不要仅为满足流程而添加新测试：

- 现有 failing test 已覆盖该行为；
- 原因是外部 config、environment、service state 或 data，且 local code 不变；
- manual、visual、log-based 或 end-to-end signal 更直接；
- 有意义的自动化需要不成比例的基础设施或 broad refactoring；
- 唯一可行的测试 brittle 或只绑定实现细节。

添加或修改 regression test 时，如果实际且成本低，先证明它在 fix 前失败。确认失败来自 bug 而不是 bad setup。在这种情况下，Red-before-green 是优选证据，不是通用完成条件。

若不添加新的 automated test，使用最直接的替代验证。只有在实质影响信心或未来 coverage 时才报告其限制。

### 6. 应用最小修复

- 只修改解决 root cause 所需的内容。
- 优先 local change 和现有 abstraction，而不是 rewrite。
- 避免 formatting churn 和 opportunistic cleanup。
- 除非恢复预期行为需要，否则不改变 public contract。
- 不要为通过 check 而弱化 validation、authorization、permission 或 error handling。
- generated 文件只通过项目标准 workflow 更新。
- 若正确方案需要 broad redesign 或新 product behavior，停止并说明 scope 变化。

### 7. 验证

先运行最窄且直接的 check，再按风险扩大：

1. 原始 failing test、command 或 reproduction scenario。
2. 经判断需要而新增或更新的 regression test。
3. 紧密相关的 test 或 scenario。
4. 相关 typecheck、build、lint、formatting、integration 或 end-to-end check。

当 screenshot、browser interaction、log、trace 或 output comparison 是最佳证据时，使用它们。若存在更直接的检查，lint/typecheck 本身不能证明 behavioral bug 已修复。

focused check 已提供足够信心时，不要默认运行昂贵的 full suite。变更范围广或 high risk 时扩大验证。

若无法完成验证，准确报告尚未验证的内容，不要把结果说成已完全证明。

### 8. 审查 Diff

报告前确认：

- 修复解决了识别出的原因；
- 除非明确需要，无关行为和 public API shape 保持不变；
- 没有无关 refactor、cleanup 或 generated-file churn；
- 若有测试变更，它保护的是 behavior 而非实现细节；
- 每项验证声明都有观察结果支持。

## 决策规则

- 若现有测试失败，除非有证据表明测试或 expected behavior 错误，否则修 production behavior。不要暗中弱化测试。
- 若提出的 regression test 在 fix 前已通过，重新判断它是否表达了该 bug。
- 若无关 check 失败，区分 pre-existing failure 和 fix 引入的 failure。
- 若原因在 codebase 外，避免不必要代码变更；仅当 local handling 属于预期行为时改进它。
- 对 flaky bug 寻找 deterministic evidence；除非 repository 已有合理 timing strategy，否则不要使用 sleep。
- 若发现多个 bug，先修用户请求的问题，其余单独报告。
- 将可取的后续 refactor 或 feature work 与 minimal fix 分开。

## 最终报告

先说结果，只包含证明结果所需的内容：

- root cause；
- minimal fix；
- 执行的验证和观察结果；
- 添加或更新的测试（如有）；
- 重要的未验证内容、pre-existing failure 或剩余风险。

若无需新 regression test，不要强制输出空的 `Regression coverage`、`Red phase` 或 `Green phase` 部分。
