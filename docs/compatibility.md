# Compatibility Notes

Skill 저장 위치는 사용하는 도구에 따라 다를 수 있다.
이 저장소에서는 예시 설치 경로를 함께 문서화한다.

## Example locations

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

## Safety

- Skill은 privileged instructions처럼 취급한다
- scripts가 있으면 읽기/쓰기 범위를 명확히 해야 한다
- 사용자 허가 없이 삭제, 전송, 외부 호출을 하지 않는다
- third-party skill은 내용을 검토한 뒤 사용한다
