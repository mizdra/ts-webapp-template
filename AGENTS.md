# AGENTS.md

## Project Overview

`app_name` is xxx.

## Commands

```bash
# Build (TypeScript → dist/)
npm run build

# Development (build + run command)
npm run dev

# Unit tests
npm run test

# Run a single test file
npx vitest src/foo.test.ts

# All lint checks
npm run lint

# Individual lint checks
npm run lint:oxfmt  # Oxfmt
npm run lint:oxlint # Oxlint (with type-check)

# Auto-fix all fixable lint errors
npm run lint-fix
```

## Architecture

xxx.

## Development Flow

- Write PR descriptions and commit messages in English
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - `<type>` is one of: feat, fix, docs, refactor, test, chore, deps
  - Example: `feat: implement some feature`
