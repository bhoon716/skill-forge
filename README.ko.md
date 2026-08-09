<p align="center">
  <img src="https://raw.githubusercontent.com/bhoon716/skill-forge/main/docs/assets/skill-forge-hero.png" alt="skill-forge — AI 에이전트 스킬을 만들고 어디서나 배포하세요." width="960">
</p>

# skill-forge

<p align="center">
  재사용 가능한 AI 에이전트 스킬을 작성하고 검증하고 배포하는 다국어 워크스페이스
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@bhoon716/skill-forge"><img src="https://img.shields.io/npm/v/%40bhoon716%2Fskill-forge" alt="npm 버전"></a>
  <img src="https://img.shields.io/badge/node-%3E%3D16-blue" alt="Node.js 16 이상">
  <img src="https://img.shields.io/badge/format-SKILL.md-orange" alt="SKILL.md 형식">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT 라이선스">
</p>

<p align="center">
  <a href="./README.md">English</a> · <a href="./README.ko.md">한국어</a> · <a href="./README.zh.md">简体中文</a>
</p>

`skill-forge`는 집중된 작업 절차를 이식 가능한 `SKILL.md` 패키지로 관리하고, 올바른 언어 파일을 Codex, Gemini, Claude Code, Cursor, GitHub Copilot 프로젝트에 설치합니다. 각 스킬은 핵심 지침을 간결하게 유지하면서 reference, example, eval, script, agent metadata를 함께 제공할 수 있습니다.

## 왜 skill-forge인가

- **한 소스로 여러 에이전트 지원:** 같은 스킬을 각 에이전트의 프로젝트 로컬 스킬 폴더에 설치합니다.
- **내장 다국어 지원:** 영어·한국어·중국어 간체 파일을 한곳에서 함께 관리합니다.
- **증거 기반 워크플로:** 검증 지침, deterministic eval, 재사용 가능한 예시를 스킬과 함께 배포합니다.
- **검토 가능한 설치:** `--dry-run`으로 실제 복사 전에 모든 파일 매핑을 확인합니다.
- **단순한 패키지 구조:** 각 스킬은 `SKILL.md`를 중심으로 한 일반 디렉터리입니다.

## 빠른 시작

설치 없이 `npx`로 바로 실행할 수 있습니다.

```bash
# 제공 스킬 목록 확인
npx @bhoon716/skill-forge list --lang ko

# Codex 또는 Gemini 프로젝트에 단일 스킬 설치
npx @bhoon716/skill-forge install bugfix --lang ko --agent codex

# 모든 스킬을 한국어로 지원 대상 전체에 설치
npx @bhoon716/skill-forge install all --lang ko
```

CLI를 전역으로 설치할 수도 있습니다.

```bash
npm install -g @bhoon716/skill-forge
skill-forge
```

인자 없이 `skill-forge`를 실행하면 대화형 설치 프로그램이 열립니다.

## 제공 스킬

| 스킬 | 역할 |
| --- | --- |
| [`architecture`](./skills/architecture/) | 아키텍처 대안을 비교하고 tradeoff를 기록해 ADR, 리뷰, 시스템 뷰, migration 계획을 만듭니다. |
| [`bugfix`](./skills/bugfix/) | 실패를 재현하거나 증거를 확보하고 root cause를 찾아 최소 안전 수정 후 위험에 비례해 검증합니다. |
| [`deep-code-review`](./skills/deep-code-review/) | 독립적인 review lens를 조율하고 candidate finding을 검증하고 root cause 중복을 제거해 확인된 문제만 보고합니다. |
| [`feature-dev`](./skills/feature-dev/) | 엄격한 Red → Green → Refactor 절차로 새로운 동작을 구현합니다. |
| [`performance-testing`](./skills/performance-testing/) | 통제된 조건에서 baseline과 candidate 성능을 측정하고 회귀와 tradeoff의 원인을 분석해 증거 기반 로그와 결론을 남깁니다. |
| [`refactoring`](./skills/refactoring/) | Baseline → Transform → Same Tests 절차로 관찰 가능한 동작을 보존하며 내부 구조를 개선합니다. |
| [`ultra-grill-me`](./skills/ultra-grill-me/) | 계획·설계·전략·연구 질문·의사결정을 한 번에 하나의 소크라테스식 질문으로 압박 검증합니다. |

## 설치 대상

| `--agent` | 설치 위치 |
| --- | --- |
| `codex`, `gemini` | `./.agents/skills` |
| `claude` | `./.claude/skills` |
| `cursor` | `./.cursor/skills` |
| `copilot` | `./.copilot/skills` |
| `global` | 위 위치 전체 |

지원 언어 코드는 `en`, `ko`, `zh`이며 기본값은 영어입니다. `--dry-run`을 사용하면 파일을 바꾸지 않고 source-to-destination 매핑을 확인할 수 있습니다.

```bash
skill-forge install architecture --lang ko --agent claude --dry-run
```

## 저장소 구조

```text
skill-forge/
├── bin/                     # 설치 CLI
├── docs/                    # 작성·호환성·명명·테스트 가이드
│   └── assets/              # 문서 및 브랜딩 자산
├── skills/                  # 배포되는 다국어 스킬 패키지
│   └── <skill-name>/
│       ├── SKILL.md         # 기본 영어본
│       ├── SKILL.ko.md      # 한국어
│       ├── SKILL.zh.md      # 중국어 간체
│       ├── README*.md       # 사용자용 문서
│       └── references/      # 선택적 참고 자료
├── templates/               # 새 스킬 시작용 템플릿
└── tests/                   # CLI smoke test
```

워크플로에 따라 일부 스킬은 `agents/`, `examples/`, `evals/`, `logs/`, `scripts/`도 포함합니다.

## 스킬 작성 원칙

1. 하나의 좁고 반복 가능한 작업과 trigger 경계를 정의합니다.
2. frontmatter의 `description`에 라우팅 기준을 작성합니다.
3. `SKILL.md`에는 모델이 놓치기 쉬운 절차와 판단 규칙만 남깁니다.
4. 상세 자료는 `references/`, 재사용 검증 사례는 `examples/` 또는 `evals/`로 분리합니다.
5. installer가 올바르게 매핑하도록 언어별 suffix pair를 유지합니다.
6. 배포 전에 스킬 검증과 저장소 테스트를 실행합니다.

[작성 가이드](./docs/authoring-guide.md), [명명 규칙](./docs/naming.md), [호환성 안내](./docs/compatibility.md), [테스트 가이드](./docs/testing.md)를 참고하세요.

## 검증

```bash
# CLI 동작 검증
npm test

# 전체 영어 설치 매핑 미리보기
node bin/cli.js install all --lang en --agent codex --dry-run

# Ultra Grill 평가기 실행
python3 skills/ultra-grill-me/evals/check_evals.py --run-mock
```

## 라이선스

[MIT](./LICENSE)
