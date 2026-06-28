# 🛠️ skill-forge (에이전트 스킬 공방)

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D16.0.0-blue.svg" alt="Node Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/format-SKILL.md-orange.svg" alt="Format Compatibility">
  <img src="https://img.shields.io/badge/agent-Codex%20%7C%20Gemini%20%7C%20Claude-red.svg" alt="Supported Agents">
</p>

[English](./README.md) | [한국어](./README.ko.md)

---

**정성껏 깎아낸 AI 에이전트 스킬(Agent Skill)들을 한데 모으고 스마트하게 배포하는 작업공간입니다.**

`skill-forge`는 Codex, Gemini, Claude Code, Cursor 등 `SKILL.md` 포펙을 호환하는 모든 자율형 코딩 에이전트 환경에 스크립트 하나로 즉시 이식 가능한 고품질 스킬 패키지를 제작합니다.

---

## 📂 1. 저장소 구조

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

## 🏆 2. 릴리즈 스킬 목록

| 스킬 명칭 | 목적 및 한 줄 설명 | 상태 |
| :--- | :--- | :--- |
| **`ultra-grill-me`** | 사용자의 기획, 아키텍처 ADR, 개인 고민 등을 Socratic 역질문으로 털어 빈틈과 리스크를 정교하게 깎아내는 검증 엔진 스킬 | **Released (v1.0.0) 🎯** |

---

## 🚀 3. 스킬 설치 CLI 사용법 (`npx skill-forge`)

이 워크스페이스의 스킬들을 자신의 로컬 프로젝트나 전역 환경으로 손쉽게 배포할 수 있는 **다국어 지원 지향형 CLI 도구**입니다.

> [!TIP]
> **다국어 자동 스위칭 원리**:
> `--lang ko` 옵션을 지정하면, 소스 폴더 내의 `SKILL.ko.md` 파일을 찾아 자동으로 대상 경로에 기본 파일명인 `SKILL.md`로 변환하여 복사해줍니다. 또한 `references/` 내의 한국어 참고 문서들도 접미사를 떼고 깨끗하게 덮어써 다른 언어 파일들과의 충돌을 방지합니다.

### 💡 명령어 실물 예시
```bash
# 1. 특정 스킬을 한국어로 Codex/Gemini 프로젝트 로컬에 설치 (기본값)
$ npx skill-forge add ultra-grill-me --lang ko

# 2. 특정 스킬을 한국어로 Claude Code 로컬 경로에 설치
$ npx skill-forge add ultra-grill-me --lang ko --agent claude

# 3. 특정 스킬을 영어로 Cursor 프로젝트 로컬 경로에 설치
$ npx skill-forge add ultra-grill-me --lang en --agent cursor

# 4. 글로벌 환경에 한국어 스킬로 전역 설치 (모든 워크스페이스 공유)
$ npx skill-forge add ultra-grill-me --lang ko --agent global

# 5. 전체 스킬을 한국어 버전으로 한 번에 로컬 설치
$ npx skill-forge install-all --lang ko --agent codex
```

### ⚙️ 옵션 요약
- `-l, --lang <en|ko|zh>`: 설치할 다국어 번역본 코드 선택 (기본값: `en`)
- `-a, --agent <codex|gemini|claude|cursor|copilot|global>`: 대상 도구의 설정 위치 지정 (기본값: `codex`)
- `--dry-run`: 실제 복사를 수행하지 않고 파일 매핑 결과만 가상 시뮬레이션 출력

---

## ✍️ 4. 기여 및 유지보수 규칙

> [!IMPORTANT]
> **이 저장소에 기여할 때 지켜야 할 3대 원칙:**
>
> 1. 🎯 **단일 책임의 법칙 (Single Responsibility)**:
>    새로운 스킬을 설계할 때는 오직 하나의 좁고 반복적인 작업에만 특화되도록 `docs/authoring-guide.md`에 맞춰 깎아냅니다.
> 2. 🌐 **다국어 확장성 (Localization Suffices)**:
>    스킬 본문과 레퍼런스 문서는 반드시 언어별 접미사 파일(`.ko.md`, `.md` [디폴트 영어], `.zh.md`)을 병행 작성하여 번역 매핑이 깨지지 않도록 유지합니다.
> 3. 🧪 **회귀 테스트 수행 (Regression Testing)**:
>    수정 시에는 `evals/check_evals.py` 채점기를 돌려 F1 Score 및 Process Adherence가 깨지지 않는지 검증한 뒤 릴리즈합니다.

---

## 📄 라이선스

MIT License. 자유롭게 가져다 사용하거나 팀 내부의 전용 AI 스킬 공유 허브로 활용하시기 바랍니다.
