# TASK-004: Migration vers TypeScript complet

**Type**: Refactoring
**Priority**: 🟠 P1
**Status**: Priority - Audit findings

## Description
Migrer tous les composants .jsx vers .tsx pour cohérence TypeScript complète du projet.

## Problem
Le projet mélange .jsx et .tsx, ce qui nuit à la cohérence et aux bénéfices de TypeScript.

## Implementation

### Fichiers identifiés par audit à migrer :
- [ ] `src/components/auth/*.jsx` (BanWarning, MagicLinkForm, ResetPassword, SignIn, SignUp)
- [ ] `src/components/layout/UserDropdown.jsx` et `TopBar.jsx`
- [ ] `src/components/pages/*.jsx` (DashboardPage, HomePage, ProfilePage)
- [ ] `src/components/ui/*.jsx` (LanguageSelector, PasswordInput, ThemeToggle)
- [ ] `src/contexts/AuthContext.jsx`
- [ ] `src/hooks/*.js` (useAuth, useAppConfig, etc.)
- [ ] `src/lib/*.js` et `src/i18n.js`

### Imports React manquants trouvés :
- [ ] `src/components/layout/PublicPageLayout.tsx` - ajouter `import React`
- [ ] `app/layout.tsx` - ajouter `import React`

### Actions requises :
- [ ] Renommer .jsx → .tsx pour tous les composants React
- [ ] Renommer .js → .ts pour utilities et hooks
- [ ] Ajouter types TypeScript appropriés pour tous les props/états
- [ ] Ajouter imports React manquants
- [ ] Typer correctement les hooks personnalisés
- [ ] Typer les contextes React

## Acceptance Criteria
- [ ] Plus aucun fichier .jsx dans src/
- [ ] Plus aucun fichier .js dans src/ (sauf index.js d'export)
- [ ] Tous les composants correctement typés
- [ ] Compilation TypeScript sans erreurs
- [ ] Tests de type checking passent
- [ ] Aucune régression fonctionnelle

## Technical Requirements
- Respecter les conventions de nommage du projet
- Maintenir la compatibilité avec Next.js 14
- Types précis (éviter `any`)
- Interfaces pour les props complexes
- Typage des hooks personnalisés

## Testing Requirements
- [ ] `npm run type-check` passe sans erreurs
- [ ] `npm run build` réussit
- [ ] Tests fonctionnels passent
- [ ] Aucune régression dans l'application
- [ ] Vérifier chaque composant individuellement