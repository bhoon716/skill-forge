---
name: architecture
description: 새 시스템 또는 기존 시스템의 소프트웨어 아키텍처를 설계·평가·문서화·리뷰해 달라는 요청에 사용한다. 아키텍처 대안, ADR, 컴포넌트·통합 경계, 계층형·모듈러 모놀리스, 서비스 분해, 확장성, 가용성, 품질 속성, 런타임·배포 뷰, 아키텍처 리스크, 마이그레이션 계획이 대상이다. 가능한 경우 저장소 증거를 확인하고, 명시적인 트레이드오프를 비교하고, 사실과 가정을 분리해 의사결정 가능한 산출물을 만든다. 단순한 아키텍처 정의, 일반 브레인스토밍, 개별 버그 수정, 기능 구현, 동작 보존 리팩토링에는 사용하지 않는다. 단, 요청 자체가 명시적인 아키텍처 결정이면 예외다.
---

# Architecture

## 목적

소프트웨어 아키텍처 결정을 증거에 근거해 추적 가능하고, 문제에 비례하며, 실행 가능하게 만든다. 아키텍처를 유행하는 패턴 목록이 아니라 시스템의 경계, 책임, 의존성, 데이터 흐름, 런타임 동작, 배포 토폴로지, 품질 속성의 집합으로 다룬다.

새 시스템 또는 기존 시스템의 아키텍처 brief, ADR, 목표 상태 설계, 아키텍처 리뷰, 점진적 마이그레이션 계획을 작성하거나 검토할 때 사용한다. 명시된 제약과 품질 목표를 만족하는 가장 단순한 설계를 우선한다. 구체적인 근거 없이 마이크로서비스, 이벤트 기반 통합, 새 프레임워크를 기본값으로 선택하지 않는다.

## 라우팅

결정 전에 반대신문식 질문을 명시적으로 요청하면 `ultra-grill-me`를 사용한다. 주 요청이 구현·수리·동작 보존 cleanup 이면 각각 `feature-dev`, `bugfix`, `refactoring`을 사용한다. 구현이 이어질 수 있어도 주 작업이 아키텍처 결정을 만들거나 기록하는 일이라면 이 스킬을 유지한다.

## 운영 규칙

- 처방 전에 조사한다. 기존 코드베이스라면 프로젝트 지침, 진입점, 모듈/패키지 구조, dependency manifest, persistence, integration client, test, build/deployment, observability, 관련 history를 확인한다.
- 중요한 진술을 fact, assumption, inference, unresolved question 중 하나로 표시한다. 주요 발견에는 가능한 경우 repository path와 line number를 인용한다.
- 품질 속성을 테스트 가능하게 만든다. “확장 가능”이나 “고가용성” 같은 표현을 stimulus, environment, response, measurable target을 가진 scenario로 바꾼다.
- 동일한 기준으로 대안을 비교한다. 현재 상태 또는 가장 단순한 baseline을 포함하고, 단일 선호 패턴을 분석인 것처럼 제시하지 않는다.
- 소유권과 장애 동작을 명시한다. 컴포넌트 책임, 데이터 소유권, transaction boundary, 통신 방식, retry/idempotency, timeout, backpressure, consistency, recovery, observability를 다룬다.
- 목표 아키텍처와 migration 아키텍처를 분리한다. compatibility, rollback, data migration을 포함해 안전한 incremental 이동 방법을 설명한다.
- 결정을 바꾸는 조건을 기록한다. assumptions, decision triggers, guardrails, review date 또는 horizon을 남긴다.
- 근거 없는 throughput 수치, 팀 구조, 비용, compliance 요구, infrastructure capability를 만들지 않는다. 없는 증거를 표시하고 측정 방법을 제안한다.

## 워크플로

### 1. 결정 범위 정의

결정을 한 문장으로 쓴다. system boundary, users/actors, business capability, desired outcome, scope, constraints, non-goals, compatibility requirements, risk horizon, decision owner를 포착한다. 설계를 비교하기 전에 “좋은 결과”를 정의한다.

요청이 불완전하면 위험이 낮은 가정을 세우고 목록으로 남긴다. 누락된 선택이 security, privacy, data loss, regulatory exposure, public contract, cost, irreversible design direction에 큰 영향을 줄 때만 clarification을 요청한다.

### 2. 증거 기반 만들기

저장소 작업에서는 다음의 최소 유효 자료부터 확인한다.

- project instructions와 architecture documentation
- package/dependency manifest, entry point, configuration, build script
- top-level module/service directory와 public interface
- data model, migration, queue, cache, external integration, authentication boundary
- tests, CI/CD, deployment manifest, runtime configuration, logs, metrics, tracing setup

대표적인 사용자 또는 business flow를 현재 시스템을 따라 추적한다. 필요하면 repository search와 version history를 사용한다. directory 이름만으로 경계를 추론하지 말고 import, call, data access, ownership, deployment coupling을 확인한다.

### 3. 품질 시나리오 정의

결정을 바꿀 수 있는 품질 속성 3~5개를 선택한다. 보통 availability, latency, throughput, scalability, consistency, durability, recoverability, security, privacy, operability, deployability, testability, cost를 검토한다. 다음 형식으로 표현한다.

`When [stimulus] occurs in [environment], the system shall [response] within/with [measure].`

사용자·비즈니스 영향으로 순위를 매기고 hard constraint와 preference를 구분한다. 목표를 모르면 provisional target을 명시하고 실제 값으로 대체하기 위해 필요한 측정을 적는다.

### 4. 현재 상태와 목표 상태 모델링

결정에 도움이 되는 뷰만 설명한다.

- context view: actor, external system, trust boundary, system responsibility
- container/component view: deployable unit, module, interface, dependency direction, ownership
- data view: authoritative store, schema ownership, consistency, lifecycle, migration path
- runtime view: synchronous/asynchronous call, queue, concurrency, retry, timeout, failure propagation
- deployment view: environment, placement, scaling unit, rollout, recovery, operational dependency

관계를 명확하게 만들 때만 compact table 또는 Mermaid diagram을 사용한다. 코드베이스 리뷰에서는 boundary violation, cyclic dependency, shared mutable data, hidden coupling, distributed transaction assumption, 독립적으로 test/deploy할 수 없는 컴포넌트를 찾는다.

### 5. 대안 생성 및 비교

baseline을 포함해 실질적으로 다른 2~4개의 option을 만든다. 문제에 맞는 대안을 선택하고 패턴 이름을 나열하지 않는다. 각 option에 대해 다음을 설명한다.

- responsibility와 ownership boundary
- synchronous/asynchronous communication과 contract shape
- data ownership, consistency, transaction, migration strategy
- scaling unit, performance bottleneck, capacity assumption
- failure isolation, recovery, security, observability
- deployment, team cognitive load, testing, cost, operational burden
- migration increment, compatibility strategy, rollback path

모든 option을 동일한 기준으로 비교한다. 정확한 측정이 없으면 qualitative matrix를 사용하고 의미를 설명한다. recommendation에는 현재 제약에 맞는 이유, 의도적으로 포기한 것, 재검토 시점을 포함한다.

### 6. 리스크 분석 및 선택

다음을 점검한다.

- single point of failure와 correlated failure domain
- 과도하거나 모호한 boundary
- shared database/schema/library/deployment pipeline을 통한 hidden coupling
- consistency, ordering, duplication, replay, retry, idempotency 위험
- security/privacy boundary, least privilege, secrets, data exposure
- observability gap과 테스트하기 어려운 경로
- migration, rollback, compatibility, operational readiness 위험

리스크를 accepted, mitigated, deferred, blocking으로 분류한다. 증거가 약하거나 되돌리기 어려운 결정이면 더 작고 reversible한 단계를 우선한다.

### 7. 요청한 산출물 생성

요청에 맞는 결과 형식을 선택한다.

- **Architecture brief/design:** context, goals, constraints, quality scenarios, current state, target state, alternatives, recommendation, risks, migration slices
- **ADR:** `references/adr-template.md`를 사용하고 context, decision, status, alternatives, consequences, assumptions, revisit triggers를 기록
- **Architecture review:** `references/review-checklist.md`를 사용하고 evidence, strengths, boundary finding, risk, prioritized action, open question을 보고
- **Runtime/deployment view:** request path, asynchronous path, failure/recovery, scaling, rollout, operational dependency를 표시
- **Codebase architecture assessment:** 구체적인 file과 symbol을 인용하고 dependency direction/data ownership을 맵핑하며, 영향도 순으로 finding을 정렬하고 목표 품질 속성을 개선하는 최소 구조 변경을 제안

fact, assumption, decision, rejected alternative, risk, open question을 눈에 띄게 분리한다. 예시 diagram이나 sample metric을 시스템의 검증된 속성처럼 제시하지 않는다.

## References

필요한 자료만 읽는다.

- `references/architecture-methods.md` — quality scenario, view, comparison matrix, boundary heuristic, migration guidance
- `references/adr-template.md` — 재사용 가능한 ADR 구조와 작성 질문
- `references/review-checklist.md` — boundary, data, runtime, resilience, security, operability, migration review 점검표

## 출력 품질 기준

결과는 evidence-based이고 uncertainty를 명시하며 internally consistent하고, 결정 규모에 비례하며, actionable해야 한다. 검토자가 무엇을 결정하는지, 왜 지금 결정하는지, 어떤 대안을 버렸는지, 무엇이 실패할 수 있는지, 어떻게 검증할지, 나중에 어떻게 바꿀 수 있는지 답할 수 있어야 한다.

## 종료 조건

요청한 산출물이 완성되고, recommendation이 제약과 quality scenario로 지지되며, 중요한 risk와 assumption이 기록되고, 다음 validation 또는 implementation step이 명확하면 종료한다. 증거가 부족하면 범위를 제한한 assessment에서 멈추고, 다음에 측정·조사·결정해야 할 내용을 정확히 적는다.
