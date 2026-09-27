# Cognitive Debt

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.ko.md">한국어</a> | <a href="./README.zh.md">简体中文</a>
</p>

`cognitive-debt`는 코드의 동작과 설계 의도를 이해하고 변경하기 어렵게 만드는 위험을 저장소 근거로 조사합니다. 코드 패턴은 이해 위험의 proxy 이며 팀이 실제로 무엇을 이해하는지 측정한다고 주장하지 않습니다.

## 사용할 때

- 중복 규칙 또는 여러 개의 진실 공급원 찾기
- 숨은 결합, 불분명한 흐름, 불필요한 간접 호출 추적
- 입증된 dead code, 오래된 scaffolding, 불필요한 dependency 증가의 우선순위 정리
- 코드, 테스트, 이력, 프로젝트 문서만으로 확인할 수 없는 중요한 설계 의도 식별

## 다른 스킬을 사용할 때

- 동작 보존형 국소 cleanup: `refactoring`
- 깨진 동작: `bugfix`
- 새 동작: `feature-dev`
- 의도적인 아키텍처 또는 contract 변경: `architecture`

## 워크플로

1. 요청된 저장소, 하위 시스템, 흐름으로 감사를 제한합니다.
2. 대표 동작을 소유자, 상태, side effect, 테스트까지 추적합니다.
3. 후보 신호를 도메인 규칙, 호환성, 런타임 동작, 저장소 이력과 대조합니다.
4. 근거, 이해 영향, 반복성, 확신도, 수정 위험에 따라 우선순위를 정합니다.
5. 사용자가 감소를 요청한 경우에만 코드를 바꾸고, 범위가 제한된 변경마다 동작을 보존하며 검증합니다.

## 설치

```bash
skill-forge install cognitive-debt --lang en --agent codex
skill-forge install cognitive-debt --lang ko --agent codex
skill-forge install cognitive-debt --lang zh --agent codex
```

## 프로젝트 힌트

필요하면 하위 프로젝트의 `AGENTS.md`에 추가합니다.

> 저장소 전반의 이해 위험을 감사할 때 `cognitive-debt`를 사용한다. 실제 동작을 추적하고 근거, 영향, 확신도, 가장 작은 유용한 다음 단계를 보고한다. 코드 냄새는 신호로 취급하며 증거라고 단정하지 않는다. 요청받은 경우에만 코드를 변경한다.
