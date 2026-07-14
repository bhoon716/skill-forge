# Architecture

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`architecture`는 새 시스템과 기존 시스템의 아키텍처를 증거, 명시적 트레이드오프, 재사용 가능한 산출물로 설계·검토하는 소프트웨어 아키텍처 결정 스킬입니다.

## 사용할 때

- 계층형 시스템, 모듈러 모놀리스, 서비스 분해 같은 아키텍처 대안 비교
- ADR과 architecture brief 작성
- 코드베이스의 component, integration, data, module boundary 검토
- 품질 속성, 확장성, 가용성, resilience, security, operability, cost 분석
- context, container/component, runtime, deployment view 작성
- compatibility와 rollback을 포함한 점진적 아키텍처 migration 계획

## 워크플로

1. 결정과 제약을 정의한다.
2. 가능한 경우 저장소 증거를 조사한다.
3. 측정 가능한 quality scenario를 정의한다.
4. 현재 상태와 목표 상태를 모델링한다.
5. 동일한 기준으로 2~4개 대안을 비교한다.
6. risk, migration, validation을 분석한다.
7. brief, ADR, review, view, migration plan 중 요청한 결과를 만든다.

## 설치

```bash
skill-forge install architecture --lang ko --agent codex
```

## 사용하지 않을 때

단순 사실 설명, 개별 버그 수정, 기능 구현, 동작 보존 리팩토링에는 사용하지 않는다. 단, 요청에 명시적인 아키텍처 결정이 포함된 경우는 예외다.
