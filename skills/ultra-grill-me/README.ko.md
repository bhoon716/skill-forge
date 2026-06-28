# Ultra Grill Me 스킬

`ultra-grill-me`는 사용자의 계획, 설계, 제품 아이디어, 혹은 커리어 결정 등을 바로 구현하기 전에 Socratic 대화식 역질문(인터뷰)을 통해 모호성과 리스크를 사전에 파악하여 완성도를 극대화하는 검증 전용 Agent Skill입니다.

---

## 1. 주요 특징

- **Socratic 압박 질문**: 대안 설계, 목표 모호성, 숨겨진 리스크, 가정을 10가지 단계별 질문 우선순위에 따라 철저히 반대신문합니다.
- **한 번에 하나의 질문만**: 사용자가 대답을 고민하기 가장 좋은 작은 단위의 구체적인 핵심 질문 하나와 연동된 선택지를 매 턴마다 제시합니다.
- **추천 및 추가 옵션 시스템**: 각 질문에 대해 가장 합리적인 옵션에는 `(추천)`을 명시하며, 항상 `다른 옵션 더 추천받기`와 `직접 답변` 옵션을 포함하여 대답을 돕습니다.
- **세션 로그 관리**: 모든 질문 과정과 사용자의 답변, 확정된 가정이 `logs/` 하위에 마크다운 파일로 기록되어 세션 중단 후 이어하기 및 이력 관리가 수월합니다.
- **소스 코드 비수정 보장**: 세션이 종료되어 최종 정리가 합의될 때까지 에이전트가 로컬 소스 코드를 임의로 변경하지 않고 설계 검증에만 몰입합니다.

---

## 2. 사용 방법

### 자연스러운 자동 발동 (Implicit Trigger)
에이전트에게 계획이나 아이디어를 주고 빈틈을 털어달라고 하면 스킬이 자동으로 활성화됩니다.
- *예시*: `"이 SaaS 아이디어 만들기 전에 끝까지 빈틈 좀 털어줘."`

### 명시적 스킬 호출 (Explicit Trigger)
원하는 종류의 분석을 위해 슬래시 커맨드나 스킬 이름을 직접 지정하여 강제 발동합니다.
- *예시*: `"/ultra-grill-me 내 React 공부 로드맵 계획 검증 시작해줘."`

---

## 3. 설치 가이드 (skill-forge CLI 사용)

이 저장소의 배포용 CLI 도구(`npx skill-forge`)를 사용하여 사용자의 에이전트 도구(Codex, Gemini, Claude Code, Cursor)에 맞춤 언어로 설치합니다.

```bash
# 1. Codex/Gemini 프로젝트 로컬에 한국어 버전으로 설치 (기본값)
npx skill-forge add ultra-grill-me --lang ko

# 2. Claude Code 로컬에 한국어 버전으로 설치
npx skill-forge add ultra-grill-me --lang ko --agent claude

# 3. Cursor 프로젝트 로컬에 영어 버전으로 설치
npx skill-forge add ultra-grill-me --lang en --agent cursor

# 4. 글로벌 경로에 한국어 버전으로 설치 (모든 워크스페이스 전역 적용)
npx skill-forge add ultra-grill-me --lang ko --agent global
```

---

## 4. 디렉토리 구조

```
skills/ultra-grill-me/
├── SKILL.md                 (설치 시 선택된 언어로 생성됨)
├── SKILL.ko.md              (한국어 스킬 명세 원본)
├── SKILL.md                 (영어 스킬 명세 원본)
├── README.md                (영문 사용 가이드)
├── README.ko.md             (본 가이드 문서)
├── logs/
│   └── template.md          (세션 로그 자동 생성용 템플릿)
├── examples/
│   ├── should-trigger.md    (스킬이 켜지는 예시)
│   └── should-not-trigger.md(스킬 오발동 방지 예시)
├── references/              (10대 도메인별 검증 매핑 가이드라인)
│   ├── product-idea-grill.ko.md
│   ├── technical-design-grill.ko.md
│   └── ...
└── evals/                   (품질 검증 테스트 스위트)
    ├── trigger_test_cases.json
    └── check_evals.py
```
