# Claude Code Instructions

## Technical Stack
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS v3
- Supabase (auth + database)
- react-i18next (FR/EN)

## Naming Conventions
- **Components**: PascalCase (ex: `UserDropdown.tsx`)
- **Custom hooks**: camelCase with "use" prefix (ex: `useAuth.js`)
- **Pages/Layouts**: camelCase (ex: `page.tsx`, `layout.tsx`)
- **Folders**: kebab-case (ex: `sign-in/`, `reset-password/`)
- **Utility files**: camelCase (ex: `errorTranslation.js`)
- **Export files**: always `index.js` to avoid compilation errors
- **Markdown files**: UPPERCASE (ex: `README.md`, `CLAUDE.md`)

## TypeScript
- Use `.tsx` for all React components
- Use `.ts` for utilities and helpers
- App Router layouts and pages in `.tsx`
- Export files (`index.js`) stay in `.js` for compatibility
- Properly type all props and states

## Component Structure
- React imports first (optional with Next.js 14)
- Then external libs
- Then local imports
- Default export at the end
- No empty or unused imports

## Code Quality
- Comments always in English
- Mandatory presentation comment at start of file
- Comments to break up script sections
- Other comments only if necessary to clarify logic
- Clean and concise code
- No sensitive data in code
- Use modern hooks (useState, useEffect, etc.)

## Next.js App Router
- Use App Router exclusively (not Pages Router)
- Environment variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
- 'use client' required for: hooks, states, events, contexts
- Server Components by default for pages and layouts
- Route groups: (auth) for auth, (protected) for protected pages
- Use next/link and next/navigation (useRouter, redirect, notFound)
- Nested layouts to structure the application

## App Router Architecture
- app/ : Next.js pages and layouts
- app/layout.tsx : Root layout with metadata
- app/page.tsx : Homepage
- app/(auth)/ : Route group for authentication
- app/(protected)/ : Route group for protected pages
- src/ : Source code (components, hooks, utils)
- Centralized providers in src/components/providers/Providers.tsx

## Styling
- Use Tailwind CSS only
- Responsive first (mobile-first)
- Utility classes rather than custom CSS
- Dark mode managed by Tailwind CSS
- Global styles in src/styles/global.css

## Data Management
- Use custom hooks for business logic
- Handle loading/error states in all async calls
- Client AND server validation for all data
- Use Supabase for auth and database

## Authentication (AuthContext)
- Use `useAuthContext()` to access authentication state
- Never use `useAuth()` directly in components
- AuthContext centralizes auth state throughout the application
- Use `withLoadingProtection()` HOC for sensitive components
- Avoid props drilling with `user={user}` - context handles everything
- Global loading state managed by App Router layouts + local protections

## Internationalization (i18n)
- Use react-i18next for all user texts
- Import `useTranslation` and use `const { t } = useTranslation('namespace')`
- All displayed texts must use `t('key')` (no fallbacks)
- Organize translations by namespace (auth, common, etc.)
- Maintain translation files in `src/locales/fr/` and `src/locales/en/`

## SSR/Performance
- Protect window/document access in hooks with typeof checks
- Avoid SSR warnings in production
- Use next/image for all images
- Optimize components for server-side rendering

## Project Maintenance
- README.md: Maintain installation steps and project description
- package.json: Add new scripts and dependencies
- database/setup.sql: Document database schema changes
- .gitignore: Add new types of files to ignore

## Git
- Frequent commits with short and precise messages
- Messages in English
- Use `git commit --amend` for minor corrections/improvements

## Commands
- **Lint**: `npm run lint`
- **Type check**: `npm run type-check`
- **Build**: `npm run build`
- **Test**: `npm run test`

## Backlog Management
- **Location**: Individual task files in `docs/tasks/` directory
- **Overview**: General roadmap in `docs/BACKLOG.md`
- **Task Selection**: Choose tasks marked as 🔴 P0 (Critical) or 🟠 P1 (High Priority) first
- **Implementation Process**:
  1. Read task file `docs/tasks/TASK-XXX.md` for full details and acceptance criteria
  2. Create implementation plan if task is complex
  3. Implement the task following all coding standards above
  4. Test the implementation (`npm run type-check`, `npm run build`)
  5. Commit with format: `[task-type]: [TASK-XXX] [description]`
     - Example: `feat: [TASK-032] add reset password for magic link accounts`
     - Example: `fix: [TASK-004] migrate all components to TypeScript`
  6. **Delete the task file** when implementation is completed
- **Task Creation**: Use `docs/tasks/NEXT_TASK_NUMBER.txt` for next available number
- **Commit Strategy**: One commit per completed task
- **Task Types**: Use conventional commit types (feat, fix, refactor, docs, etc.)
- **References**: Always include TASK-XXX number in commit message for traceability