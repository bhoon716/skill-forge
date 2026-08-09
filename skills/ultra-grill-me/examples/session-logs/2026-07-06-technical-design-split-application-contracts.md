# Technical Design Grill Session

- 날짜: 2026-07-06
- 케이스: technical-design-grill
- 상태: 진행 중

## 요약

남은 `application` 계약을 `command` / `result` 로 더 쪼개는 설계를 검증 중입니다.

## 질문 로그

### Q1. 이번 정리는 어디부터 시작할까요?

- 막힌 결정: 여러 도메인에 걸친 `application` 타입을 한 번에 나눌지, 가장 영향이 큰 도메인부터 단계적으로 나눌지 정해지지 않았습니다.
- 제공된 옵션:
  - 1. (추천) `user`, `dashboard`, `timetable`처럼 경계가 뚜렷한 도메인부터 순차적으로 나눈다
  - 2. `announcement`, `feedback`, `review`처럼 요청/응답이 많은 도메인부터 먼저 나눈다
  - 3. 현재 남아 있는 모든 `application` 타입을 한 번에 `command` / `result` 로 재배치한다
  - 4. 다른 옵션 더 추천받기
  - 5. 직접 답변
- 답변: 1
- 결과: 확정
- 해석 결과: 첫 migration 대상은 `dashboard` 입니다.
- 새로 확정된 결정: 첫 migration 도메인은 dashboard다
- 남은 열린 질문: dashboard 응답 계약을 얼마나 세분화할지


### Q2. dashboard 결과는 하나의 aggregate result로 둘까요, 아니면 구성요소별 result로 쪼갤까요?

- 사용자 요청: 장단점 비교 및 추천
- 답변: 2번으로 하되, 보수적으로 분리.
- 결과: 확정
- 해석 결과: dashboard 결과는 구성요소별 result 로 분리하되 과도한 세분화는 하지 않습니다.
- 새로 확정된 결정: dashboard 결과는 보수적으로 component-level result 로 분리한다
- 남은 열린 질문: 어떤 구성요소를 먼저 result 로 분리할지

### Q3. 어떤 구성요소를 먼저 result 로 분리할지

- 막힌 결정: dashboard 의 여러 구성요소 중 어느 것부터 분리해야 과도한 복잡도를 피하면서도 boundary 분리 효과를 볼 수 있는지 정해지지 않았습니다.
- 제공된 옵션:
  - 1. (추천) `user`와 `primaryTimetable` 같은 단일 객체부터 먼저 result 로 분리한다
  - 2. `notifications`처럼 리스트 응답부터 먼저 분리한다
  - 3. `announcements`와 `upcomingSchedules` 같은 목록성 요약부터 먼저 분리한다
  - 4. 다른 옵션 더 추천받기
  - 5. 직접 답변
- 답변: 너가 알아서 적절히게
- 결과: 임시 가정
- 해석 결과: 단일 객체인 `user`와 `primaryTimetable`을 먼저 result 로 분리하고, 목록성 데이터는 기존 리스트 타입을 유지합니다.
- 새로 확정된 결정: dashboard 에서는 `user`와 `primaryTimetable`부터 분리한다
- 남은 열린 질문: 없음

## 확정된 결정

- 첫 migration 대상은 `dashboard`다
- dashboard 결과는 구성요소별 result 로 보수적으로 분리한다
- dashboard 에서는 `user`와 `primaryTimetable`부터 분리한다

## 임시 가정

- 목록성 데이터(`notifications`, `upcomingSchedules`, `announcements`)는 이번 단계에서 기존 리스트 타입을 유지한다

## 남은 known unknowns

- 어떤 도메인부터 `command` / `result` 로 더 세분화할지

## 최종 정리

### 1. 정리된 방향

`dashboard`는 구성요소별 result 로 보수적으로 분리하되, 단일 객체인 `user`와 `primaryTimetable`부터 먼저 분리한다. 목록성 데이터는 이번 단계에서 기존 리스트 계약을 유지한다.

### 2. 확정된 결정

- 첫 migration 대상은 `dashboard`다
- dashboard 결과는 구성요소별 result 로 보수적으로 분리한다
- dashboard 에서는 `user`와 `primaryTimetable`부터 분리한다

### 3. 아직 남은 known unknowns

- 없음

### 4. 핵심 가정

- `notifications`, `upcomingSchedules`, `announcements` 는 이번 단계에서 기존 리스트 타입을 유지한다

### 5. 가장 큰 리스크

- 더 많은 조각을 동시에 분리하면 dashboard 조합 코드와 테스트가 불필요하게 커질 수 있다

### 6. 주요 tradeoff

- 일부 타입 중복은 생기지만, 변화 범위를 작게 유지해 회귀 위험을 낮춘다

### 7. 하지 않기로 한 것

- 모든 dashboard 구성요소를 한 번에 완전 분해하지 않는다

### 8. 가장 작은 다음 행동

- `DashboardUserResult` 와 `DashboardPrimaryTimetableResult` 를 반영한 서비스와 테스트를 마무리한다

### 9. 왜 여기서 멈춰도 되는지

- 첫 component-level split 기준이 확정되었고, 보수적 적용 범위도 결정되었다
