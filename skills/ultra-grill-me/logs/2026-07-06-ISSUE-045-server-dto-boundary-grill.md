# ISSUE-045 SERVER DTO Boundary Grill 세션

- 날짜: 2026-07-06
- 케이스: implementation-plan-grill
- 스킬 설치 루트: /Users/bhoon/Project/skill-forge/skills/ultra-grill-me
- 상태: 진행 중

## 요약

045번 서버 리팩토링의 범위를 어디까지 잡을지 검증 중입니다.

## 질문 로그

### Q1. 이번 045를 어디까지 완료로 볼까요?

- 막힌 결정: application 서비스 DTO 경계를 전체 서비스에 일괄 적용할지, 일부 bounded context부터 나눌지 정해지지 않았습니다.
- 제공된 옵션:
  - 1. (추천) `UserService`와 `UserDeviceService` 같은 비교적 작은 경계부터 먼저 옮긴다
  - 2. `FeedbackService`와 `TimetableService`처럼 request/response coupling 이 큰 영역부터 옮긴다
  - 3. `application` 패키지의 모든 서비스에서 presentation DTO 의존을 한 번에 제거한다
  - 4. 다른 옵션 더 추천받기
  - 5. 직접 답변
- 답변: 1
- 결과: 확정
- 해석 결과: `UserService`와 `UserDeviceService`부터 먼저 DTO 경계를 분리하는 쪽으로 범위를 좁혔습니다.
- 새로 확정된 결정: 이번 045는 user bounded context부터 시작합니다.
- 남은 열린 질문: user 경계 안에서 command/result 타입을 어떤 형태로 둘지

### Q2. user 경계 안에서 새 타입을 어떤 형태로 둘까요?

- 막힌 결정: `UserService`와 `UserDeviceService`에서 presentation DTO를 대체할 command/result 타입의 패키지와 이름을 정해야 구현할 수 있습니다.
- 제공된 옵션:
  - 1. (추천) `user/application/command`와 `user/application/result`를 만들고 명시적으로 `Command`/`Result` 타입으로 분리한다
  - 2. 기존 이름을 유지하되 `user/application` 아래로만 이동해 패키지 경계만 분리한다
  - 3. `common/application` 같은 공유 타입 패키지를 새로 만든다
  - 4. 다른 옵션 더 추천받기
  - 5. 직접 답변
- 답변: 1
- 결과: 확정
- 해석 결과: `user/application/command`와 `user/application/result`로 분리하는 명시적 boundary 를 채택했습니다.
- 새로 확정된 결정: user 경계는 command/result 패키지로 나눈다.
- 남은 열린 질문: `UserService`와 `UserDeviceService` 중 어느 서비스를 먼저 이동할지

### Q3. `UserService`와 `UserDeviceService` 중 무엇을 먼저 옮길까요?

- 막힌 결정: 두 서비스 중 어느 쪽을 먼저 리팩토링해야 패턴 검증과 회귀 위험을 줄일 수 있는지 정해야 합니다.
- 제공된 옵션:
  - 1. (추천) 더 작은 `UserDeviceService`부터 옮겨 패턴을 검증한 뒤 `UserService`로 확장한다
  - 2. 더 중심적인 `UserService`부터 옮겨 경계 설계를 먼저 안정화한다
  - 3. 두 서비스를 한 번에 옮긴다
  - 4. 다른 옵션 더 추천받기
  - 5. 직접 답변
- 답변: 1
- 결과: 확정
- 해석 결과: 작은 `UserDeviceService`부터 먼저 옮기기로 했습니다.
- 새로 확정된 결정: 첫 이동 대상은 `UserDeviceService`입니다.
- 남은 열린 질문: `UserDeviceService`에서 읽기 출력까지 같이 옮길지 여부

### Q4. `UserDeviceService`에서 읽기 출력까지 같이 옮길까요?

- 막힌 결정: `getUserDevices()`의 반환 타입까지 application 결과 타입으로 바꿀지 정해야 controller/service 경계가 완성됩니다.
- 제공된 옵션:
  - 1. (추천) 쓰기 입력과 읽기 출력을 모두 application command/result 타입으로 옮긴다
  - 2. 쓰기 입력만 먼저 옮기고 읽기 출력은 다음 단계로 미룬다
  - 3. controller 가 DTO 변환을 담당하도록 service 는 domain/primitive 만 반환한다
  - 4. 다른 옵션 더 추천받기
  - 5. 직접 답변
- 답변: 1
- 결과: 확정
- 해석 결과: `UserDeviceService`의 입력과 출력 모두 application boundary 로 옮기기로 했습니다.
- 새로 확정된 결정: user device 경계는 읽기/쓰기 모두 command/result 로 분리한다.
- 남은 열린 질문: command/result 타입의 정확한 이름과 결과 구조

### Q5. `UserDeviceService`의 새 타입 이름을 어떻게 할까요?

- 막힌 결정: `UserDeviceRequest`와 `UserDeviceResponse`를 command/result 로 바꿀 때 어떤 이름을 쓰는지 정해야 코드 이동을 시작할 수 있습니다.
- 제공된 options:
  - 1. (추천) `RegisterDeviceCommand` / `UserDeviceResult` 처럼 행위 기반 + 결과 기반 이름을 쓴다
  - 2. `UserDeviceCommand` / `UserDeviceResult`처럼 도메인 기반 이름을 쓴다
  - 3. `CreateOrUpdateDeviceCommand` / `UserDeviceListItemResult`처럼 현재 동작을 더 정확히 드러내는 이름을 쓴다
  - 4. 다른 옵션 더 추천받기
  - 5. 직접 답변
- 답변: 1
- 결과: 확정
- 해석 결과: `RegisterDeviceCommand`와 `UserDeviceResult`를 사용합니다.
- 새로 확정된 결정: user device boundary 타입 이름을 정했다.
- 남은 열린 질문: 이번 045의 DoD를 user device만으로 끝낼지, user service까지 포함할지

### Q6. 이번 045의 DoD를 어디까지 볼까요?

- 막힌 결정: 이번 이슈를 `UserDeviceService`만 마치면 닫을지, 같은 패턴으로 `UserService`까지 이어서 닫을지 정해야 합니다.
- 제공된 옵션:
  - 1. (추천) 이번 턴은 `UserDeviceService`만 완료하고, `UserService`는 별도 후속 이슈로 남긴다
  - 2. 이번 턴에 `UserService`까지 이어서 같은 패턴으로 처리한다
  - 3. `UserService`의 일부 메서드만 같이 옮기고 나머지는 남긴다
  - 4. 다른 옵션 더 추천받기
  - 5. 직접 답변
- 답변: 5 전부 다
- 결과: 확정
- 해석 결과: `UserDeviceService`만이 아니라 `UserService`까지 이번 045의 범위에 포함합니다.
- 새로 확정된 결정: 이번 045는 user bounded context 전체를 포함한다.
- 남은 열린 질문: `UserService` 결과 타입의 세분화 방식

### Q7. `UserService` 결과 타입은 얼마나 세분화할까요?

- 막힌 결정: `UserService`의 다양한 조회/변경 메서드가 공통 result 타입을 쓸지, 유스케이스별 result 타입을 쓸지 정해야 구현이 가능합니다.
- 제공된 옵션:
  - 1. (추천) 유스케이스별 result 타입을 만든다. 예: `UserProfileResult`, `UserSettingsResult`, `UserDeviceResult`
  - 2. 조회는 하나의 `UserProfileResult`로 묶고 변경 작업은 `void`로 둔다
  - 3. 모든 메서드가 공통 `UserResult`를 반환하게 만든다
  - 4. 다른 옵션 더 추천받기
  - 5. 직접 답변
- 답변: 1
- 결과: 확정
- 해석 결과: `UserService`는 유스케이스별 result 타입으로 나눕니다.
- 새로 확정된 결정: `UserService` 결과는 유스케이스별로 분리한다.
- 남은 열린 질문: `UserService`에서 어떤 유스케이스부터 옮길지

### Q8. `UserService`에서 어떤 유스케이스부터 옮길까요?

- 막힌 결정: `UserService`는 메서드 수가 많아서 한 번에 옮기기 어렵습니다. 어느 흐름부터 시작해야 패턴이 안정적인지 정해야 합니다.
- 제공된 옵션:
  - 1. (추천) 프로필/설정 조회와 변경부터 옮긴다 (`getMyProfile`, `updateProfile`, `updateSettings`, `completeOnboarding`)
  - 2. 알림/연동 쪽부터 옮긴다 (`sendVerificationCode`, `verifyEmail`, `linkDiscordId`, `unlinkDiscord`, `sendTestNotification`)
  - 3. 회원 탈퇴/정리 쪽부터 옮긴다 (`withdraw`)
  - 4. 다른 옵션 더 추천받기
  - 5. 직접 답변
- 답변: 1
- 결과: 확정
- 해석 결과: 프로필/설정 조회와 변경부터 먼저 옮기기로 했습니다.
- 새로 확정된 결정: `UserService`는 프로필/설정 묶음부터 시작한다.
- 남은 열린 질문: 이 묶음에서 조회와 변경 결과를 분리할지

### Q9. 프로필/설정 묶음에서 조회와 변경 결과를 분리할까요?

- 막힌 결정: `getMyProfile`, `updateProfile`, `updateSettings`, `completeOnboarding`가 하나의 result 타입을 공유할지, 각각 별도 result 타입을 쓸지 정해야 합니다.
- 제공된 옵션:
  - 1. (추천) 조회는 `UserProfileResult`, 변경은 `UserSettingsResult` / `UserOnboardingResult`처럼 유스케이스별로 분리한다
  - 2. 조회와 변경을 모두 `UserProfileResult` 하나로 묶는다
  - 3. 변경 메서드는 `void`로 두고 조회만 result 로 둔다
  - 4. 다른 옵션 더 추천받기
  - 5. 직접 답변
- 답변: 1
- 결과: 확정
- 해석 결과: 조회와 변경 result 를 유스케이스별로 분리합니다.
- 새로 확정된 결정: 프로필/설정 묶음은 유스케이스별 result 로 분리한다.
- 남은 열린 질문: 이번 턴에 인증/연동 쪽까지 함께 묶을지

### Q10. 이번 턴에 인증/연동 쪽까지 함께 묶을까요?

- 막힌 결정: 프로필/설정 묶음만 닫고 멈출지, `sendVerificationCode` 이후 인증/연동 흐름까지 같이 옮길지 정해야 이번 DoD가 확정됩니다.
- 제공된 옵션:
  - 1. (추천) 이번 턴은 프로필/설정 묶음까지만 닫고, 인증/연동은 후속 이슈로 남긴다
  - 2. 인증/연동 흐름까지 이번 턴에 같이 옮긴다
  - 3. 프로필/설정 일부만 옮기고 나머지는 남긴다
  - 4. 다른 옵션 더 추천받기
  - 5. 직접 답변
- 답변: 2
- 결과: 확정
- 해석 결과: 인증/연동 흐름까지 이번 턴의 범위에 포함합니다.
- 새로 확정된 결정: 이번 045에는 프로필/설정뿐 아니라 인증/연동 흐름도 포함한다.
- 남은 열린 질문: 없음

## 확정된 결정

- `UserService`와 `UserDeviceService`부터 먼저 DTO 경계를 분리한다
- user 경계는 command/result 패키지로 나눈다
- `UserDeviceService`부터 먼저 옮긴다
- `UserDeviceService`는 입력과 출력을 모두 옮긴다
- `RegisterDeviceCommand` / `UserDeviceResult`를 쓴다
- 이번 045는 user bounded context 전체를 포함한다
- `UserService` 결과는 유스케이스별로 분리한다
- `UserService`는 프로필/설정 묶음부터 시작한다
- 프로필/설정 묶음은 유스케이스별 result 로 분리한다
- 인증/연동 흐름까지 이번 045 범위에 포함한다

## 임시 가정

- 없음

## 남은 known unknowns

- 없음

## 최종 정리

### 1. 정리된 방향

user bounded context 안에서 application service 가 presentation DTO 를 직접 참조하지 않도록 command/result boundary 를 도입한다. 이번 턴의 범위는 `UserDeviceService`, `UserService`의 프로필/설정, 인증/연동 흐름까지 포함한다.

### 2. 확정된 결정

- `user/application/command`와 `user/application/result` 패키지를 만든다
- `UserDeviceService`부터 먼저 옮긴다
- `UserDeviceService`는 입력과 출력을 모두 application boundary 로 옮긴다
- `RegisterDeviceCommand` / `UserDeviceResult`를 사용한다
- `UserService` 결과는 유스케이스별로 분리한다
- `UserService`는 프로필/설정 묶음부터 시작한다
- 프로필/설정 묶음은 유스케이스별 result 로 분리한다
- 인증/연동 흐름까지 이번 045 범위에 포함한다

### 3. 아직 남은 known unknowns

- 없음

### 4. 핵심 가정

- controller 는 presentation DTO 와 application command/result 를 변환하는 얇은 어댑터 역할을 맡는다

### 5. 가장 큰 리스크

- `UserService` 쪽 응답 타입이 많아져서 controller/test 변경량이 예상보다 커질 수 있다

### 6. 주요 tradeoff

- DTO 중복은 늘지만, application layer 의 경계와 테스트 가능성은 분명해진다

### 7. 하지 않기로 한 것

- 모든 application 서비스를 한 번에 전면 개편하지 않는다
- 공유 `common/application` 타입 패키지는 만들지 않는다

### 8. 가장 작은 다음 행동

- `UserDeviceService`용 command/result 타입을 만들고 controller/service/test 연결을 바꾼다

### 9. 왜 여기서 멈춰도 되는지

- 구현 순서, 타입 경계, 적용 범위, 다음 작업 단위가 모두 확정되었다
