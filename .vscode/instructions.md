// vscode-instructions.md

# Project Coding Guidelines

- All comments must be in English and provide useful context (e.g. component/service purpose, non-trivial logic).
- Avoid noisy or redundant comments. Only add comments when they clarify intent or usage.
- Use file-level doc comments for components, hooks, or services to explain their role.
- Keep code clean and concise.
- Sensitive data (API keys, secrets) must never be committed.
- Use i18n for all user-facing text.
- Use Tailwind CSS for styling.
- Commit early and often, with clear and concise messages (avoid overly long commit descriptions).
- Use `git commit --amend` to fix or improve the last commit instead of creating multiple small commits for the same feature.
- Keep these files updated when making changes:
  - README.md: Setup steps and project description
  - .gitignore: New file types or dependencies to ignore
  - scripts/setup-local.sh: Setup automation when adding dependencies
  - database/setup.sql: Database schema changes
  - package.json: Dependencies and scripts

_This file is a living document. Update as the project evolves._
