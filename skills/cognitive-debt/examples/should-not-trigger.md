# Prompts that should not trigger `cognitive-debt`

## A known local refactor

- “Simplify this function without changing behavior.”
- “이 파일에서 중복 helper를 정리해줘.”

Use `refactoring`.

## A bug fix or new behavior

- “The payment callback sometimes runs twice. Find the cause and fix it.”
- “Add a retry option to this CLI.”

Use `bugfix` or `feature-dev`.

## General explanation

- “What does cognitive debt mean?”

Answer directly without auditing a repository.
