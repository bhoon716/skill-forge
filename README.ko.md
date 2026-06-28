# skill-forge (에이전트 스킬 공방)

[English](./README.md)

정성껏 깎아낸 AI 에이전트 스킬(Agent Skill)들을 한데 모으고 배포하는 작업공간입니다.

`skill-forge`는 Codex, Gemini, Claude Code, Cursor 등 `SKILL.md` 포맷을 호환하는 모든 자율형 코딩 에이전트에서 재사용할 수 있는 정교한 스킬 패키지를 제공합니다.

---

## 1. 저장소 구조

```txt
skill-forge/
├── README.md
├── README.ko.md             (본 대문 문서)
├── package.json             (CLI 패키지 설정)
├── bin/
│   └── cli.js               (스킬 설치 및 번역용 CLI 도구)
├── skills/
│   └── ultra-grill-me/      (Socratic 압박 검증 스킬)
│       ├── SKILL.md
│       ├── SKILL.ko.md
│       ├── README.md
│       ├── README.ko.md
│       ├── references/      (도메인별 세부 질문 리스트)
│       ├── examples/        (Trigger 테스트 케이스)
│       └── evals/           (품질 Grader 채점기)
├── templates/
│   └── skill-template/      (새로운 스킬 제작용 템플릿)
└── docs/
    ├── authoring-guide.md   (스킬 작성 표준 매뉴얼)
    ├── naming.md            (명명 규칙)
    └── testing.md           (테스트 및 검증 가이드)
```

---

## 2. 릴리즈 스킬 목록

| 스킬 명칭 | 목적 및 한 줄 설명 | 상태 |
| :--- | :--- | :--- |
| **`ultra-grill-me`** | 사용자의 기획, 아키텍처 ADR, 개인 고민 등을 Socratic 역질문으로 털어 빈틈과 리스크를 정교하게 깎아내는 검증 엔진 스킬 | **Released (v1.0.0)** |

---

## 3. 스킬 설치 CLI 사용법 (`npx skill-forge`)

이 워크스페이스의 스킬들을 자신의 로컬 프로젝트나 전역 환경으로 손쉽게 배포할 수 있는 번역 지향형 CLI 도구입니다.

### 핵심 기능
- **다국어 자동 스위칭**: `--lang` 옵션 지정 시 해당 언어 전용 마크다운 파일(예: `SKILL.ko.md`)을 기본 규격(`SKILL.md`)으로 자동 전환 매핑하여 복사합니다.
- **에이전트 타겟 분기**: `--agent` 옵션으로 복사될 최종 도구 경로(Codex, Gemini, Claude Code, Cursor)를 제어합니다.

### 명령어 명세
```bash
# 1. 특정 스킬을 한국어로 Codex/Gemini 프로젝트 로컬에 설치 (기본값)
npx skill-forge add ultra-grill-me --lang ko

# 2. 특정 스킬을 한국어로 Claude Code 로컬 경로에 설치
npx skill-forge add ultra-grill-me --lang ko --agent claude

# 3. 특정 스킬을 영어로 Cursor 프로젝트 로컬 경로에 설치
npx skill-forge add ultra-grill-me --lang en --agent cursor

# 4. 글로벌 환경에 한국어 스킬로 전역 설치 (모든 워크스페이스 공유)
npx skill-forge add ultra-grill-me --lang ko --agent global

# 5. 전체 스킬을 한국어 버전으로 한 번에 로컬 설치
npx skill-forge install-all --lang ko --agent codex
```

### 옵션 요약
- `-l, --lang <en|ko|zh>`: 설치할 다국어 번역본 코드 선택 (기본값: `en`)
- `-a, --agent <codex|gemini|claude|cursor|copilot|global>`: 대상 도구의 설정 위치 지정 (기본값: `codex`)
- `--dry-run`: 실제 복사를 수행하지 않고 파일 매핑 결과만 가상 시뮬레이션 출력

---

## 4. 기여 및 유지보수 규칙

1. **단일 책임의 법칙**: 새로운 스킬을 설계할 때는 오직 하나의 좁고 반복적인 작업에만 특화되도록 `docs/authoring-guide.md`에 맞춰 깎아냅니다.
2. **다국어 확장**: 스킬 본문과 레퍼런스 문서는 반드시 언어별 접미사 파일(`.ko.md`, `.md` [디폴트 영어])을 병행 작성하여 번역 매핑이 깨지지 않도록 유지합니다.
3. **회귀 테스트**: 수정 시에는 `evals/check_evals.py` 채점기를 돌려 F1 Score 및 Process Adherence가 깨지지 않는지 검증한 뒤 릴리즈합니다.

## 라이선스

MIT License. 자유롭게 가져다 사용하거나 팀 스킬 허브로 활용하시기 바랍니다.
