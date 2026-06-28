# skill-forge

[English](./README.md)

정성껏 깎아낸 Agent Skill들을 모아두는 작은 공방.

`skill-forge`는 Claude Code, Codex, Cursor 및 `SKILL.md` 호환 에이전트에서 사용할 수 있는 재사용 가능한 Agent Skill 모음입니다.

목표는 스킬을 최대한 많이 모으는 것이 아닙니다.

목표는 작지만 날카롭고, 재사용 가능하며, 실제 작업 품질을 높이는 Agent Skill을 깎아내는 것입니다.

## 이 저장소는 무엇인가요?

이 저장소는 Agent Skill을 이식 가능한 폴더 형태로 보관합니다.

각 스킬은 `skills/` 아래에 위치하며, 최소한 `SKILL.md` 파일 하나를 포함합니다.

스킬은 다음과 같은 것을 담을 수 있습니다.

- 반복 가능한 워크플로
- 의사결정 절차
- 리뷰 프로세스
- 명확화 질문 루프
- 도메인별 작업 방식
- 재사용 가능한 대화 패턴

매번 긴 프롬프트를 다시 작성하는 대신, 잘 깎아낸 스킬을 필요할 때 꺼내 쓰는 것이 목적입니다.

## 저장소 구조

```txt
skill-forge/
├── README.md
├── README.ko.md
├── LICENSE
├── skills/
│   └── ultra-grill-me/
│       ├── SKILL.md
│       ├── README.md
│       ├── README.ko.md
│       ├── references/
│       └── examples/
├── templates/
│   └── skill-template/
│       ├── SKILL.md
│       └── README.md
└── docs/
    ├── authoring-guide.md
    ├── naming.md
    └── compatibility.md
```

## Skills

| Skill            | 설명                                                                                          | 상태  |
| ---------------- | --------------------------------------------------------------------------------------------- | ----- |
| `ultra-grill-me` | `/grill-me`의 강화 버전. 계획의 중요한 모호성이 사라질 때까지 한 번에 하나씩 압박 질문합니다. | Draft |

앞으로 다른 스킬들도 추가할 예정입니다.

## 첫 번째 스킬: `ultra-grill-me`

`ultra-grill-me`는 `/grill-me`에서 영감을 받은 강력한 명확화 스킬입니다.

계획을 바로 작성하지 않습니다.

대신 한 번에 하나씩 질문하며 숨은 가정, 약한 성공 기준, 해결되지 않은 트레이드오프, 리스크, 엣지 케이스, 실패 모드를 드러냅니다.

더 질문해도 의사결정 품질이 크게 올라가지 않는 지점에 도달할 때만 멈춥니다.

사용하기 좋은 경우:

- 제품 아이디어
- 기술 설계
- 구현 계획
- 글쓰기 방향
- 전략 초안
- 프로젝트 계획
- 의사결정 검토

사용하지 말아야 하는 경우:

- 단순 질의응답
- 아이디어 목록 생성
- 즉시 실행 요청
- 가벼운 설명 요청

## 설계 원칙

### 1. 작고 날카로운 스킬

각 스킬은 하나의 일을 잘해야 합니다.

스킬은 거대한 프롬프트 덩어리가 아니라, 특정 에이전트 행동을 위한 작은 실행 매뉴얼이어야 합니다.

### 2. 명확한 트리거 조건

스킬의 `description`은 언제 사용해야 하는지, 언제 사용하면 안 되는지를 분명히 설명해야 합니다.

좋은 스킬은 에이전트가 고르기 쉽고, 사람도 이해하기 쉽습니다.

### 3. 절차 중심 지시

막연한 조언보다 구체적인 절차를 우선합니다.

좋은 스킬에는 보통 다음이 들어갑니다.

- 사용 조건
- 비사용 조건
- 단계별 워크플로
- 판단 기준
- 종료 조건
- 출력 형식
- 주의할 점
- 예시

### 4. 점진적 공개

`SKILL.md`는 핵심만 담습니다.

긴 참고 자료는 `references/`, `examples/`, `scripts/`로 분리합니다.

핵심 스킬 파일은 무엇을 해야 하는지, 추가 파일을 언제 읽어야 하는지를 알려주면 충분합니다.

### 5. 이식성

불필요한 도구별 가정을 피합니다.

같은 스킬 폴더를 Claude Code, Codex, Cursor 또는 다른 `SKILL.md` 호환 환경에 쉽게 맞출 수 있어야 합니다.

### 6. 실제 예시

각 스킬은 다음을 보여주는 예시를 포함하는 것이 좋습니다.

- 언제 스킬이 켜져야 하는가
- 언제 스킬이 켜지면 안 되는가
- 좋은 동작은 무엇인가
- 피해야 할 실패 모드는 무엇인가

## 권장 스킬 구조

```txt
skills/
└── skill-name/
    ├── SKILL.md
    ├── README.md
    ├── README.ko.md
    ├── references/
    │   └── supporting-material.md
    ├── examples/
    │   ├── should-trigger.md
    │   └── should-not-trigger.md
    └── scripts/
        └── optional-helper.py
```

필수 파일은 `SKILL.md` 하나뿐입니다.

`references/`는 긴 참고 자료를 둘 때 사용합니다.

`examples/`는 실제 프롬프트와 기대 동작을 기록할 때 사용합니다.

`scripts/`는 결정적인 실행이 필요할 때만 사용합니다.

## 새 스킬 만들기

`skills/` 아래에 새 폴더를 만듭니다.

```bash
mkdir -p skills/my-new-skill
touch skills/my-new-skill/SKILL.md
```

`SKILL.md`에 frontmatter를 추가합니다.

```md
---
name: my-new-skill
description: 특정 반복 워크플로가 필요할 때 사용한다. 관련 없는 작업에는 사용하지 않는다.
---
```

그다음 핵심 절차를 작성합니다.

좋은 스킬에는 보통 다음이 들어갑니다.

- 목적
- 사용해야 하는 상황
- 사용하면 안 되는 상황
- 작업 절차
- 판단 기준
- 종료 조건
- 출력 형식
- 주의할 점
- 예시

## 이름 규칙

스킬 폴더명은 소문자와 하이픈을 사용합니다.

좋은 예:

```txt
ultra-grill-me
prd-shredder
issue-splitter
launch-checklist
```

피하는 예:

```txt
UltraGrillMe
my skill
skill_v2_final
```

## 설치 예시

사용하는 도구에 따라 스킬 폴더를 적절한 로컬 스킬 디렉터리에 복사합니다.

```bash
# Claude Code project-local
mkdir -p .claude/skills
cp -R skills/ultra-grill-me .claude/skills/

# Codex project-local
mkdir -p .agents/skills
cp -R skills/ultra-grill-me .agents/skills/

# Cursor project-local
mkdir -p .cursor/skills
cp -R skills/ultra-grill-me .cursor/skills/
```

정확한 설치 경로와 호출 방식은 사용하는 에이전트 도구의 문서를 확인하세요.

## 로드맵

앞으로 추가할 수 있는 스킬 후보:

- `prd-shredder`
- `issue-splitter`
- `launch-checklist`
- `architecture-cross-examiner`
- `writing-tightener`
- `decision-deck-reviewer`

## 라이선스

원하는 라이선스를 추가하세요.

## 메모

이 저장소는 실험적입니다.

스킬은 사용하면서 깎아내는 물건입니다.

스킬이 너무 자주 켜지거나, 필요한데 켜지지 않거나, 약한 질문을 하거나, 중요한 단계를 건너뛰거나, 너무 빨리 결과물을 내놓는다면 더 날카롭게 다듬어야 합니다.

## 라이선스

MIT License.

라이선스 고지를 유지하는 한, 이 저장소의 스킬을 자유롭게 사용, 복사, 수정, 재배포할 수 있습니다. 상업적 사용도 가능합니다.
# skill-forge

`skill-forge`는 재사용 가능한 Agent Skill을 설계하고 문서화하기 위한 작업공간입니다.

## 문서

- [작성 가이드](docs/authoring-guide.md)
- [이름 규칙](docs/naming.md)
- [테스트 가이드](docs/testing.md)
- [호환성 메모](docs/compatibility.md)

## 구조

- `skills/`에는 실제 Skill 패키지를 둡니다
- `templates/`에는 시작용 템플릿을 둡니다
- `docs/`에는 작성 및 유지보수 가이드를 둡니다
- `scripts/`에는 검증용 보조 스크립트를 둡니다
