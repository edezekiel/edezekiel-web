# AGENTS.md

## Comments

- Do not add inline comments unless they explain non-obvious *why*, not *what*.
- If a comment is warranted, use JSDoc (`/** ... */`) on the exported symbol.
- Never add filler comments like `// import dependencies`, `// define variables`, `// render component`, or `// handle click`.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>: <short summary>
```

Allowed types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `ci`, `perf`, `build`.

- Subject line: imperative mood, lowercase, no period, max 72 characters.
- Body (optional): explain *why*, not *what*. Wrap at 72 characters.
- Scope is optional: `feat(blog): add RSS autodiscovery link`.
