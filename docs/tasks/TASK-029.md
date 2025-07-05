# TASK-029: Tests automatisés

**Type**: Testing
**Priority**: 🟡 P2
**Status**: Pending

## Description
Implémentation complète des tests automatisés avec couverture >90% pour assurer la qualité du code.

## Problem
Le projet n'a pas de tests automatisés, ce qui nuit à la qualité et la maintenabilité.

## Implementation
- [ ] Tests unitaires hooks (useTheme, useLanguage, useAuth, etc.)
- [ ] Tests intégration composants auth (SignIn, SignUp, etc.)
- [ ] Tests E2E parcours utilisateur complets
- [ ] Configuration Jest + React Testing Library
- [ ] Configuration Playwright pour E2E
- [ ] Coverage reports automatiques
- [ ] CI/CD intégration des tests

## Scope Details
### Tests unitaires :
- [ ] `useTheme.js` - Theme switching logic
- [ ] `useLanguage.js` - Language management
- [ ] `useAuth.js` - Authentication flows
- [ ] `useBruteForceProtection.js` - Security logic
- [ ] Utility functions in `src/lib/`

### Tests intégration :
- [ ] Composants auth (SignIn, SignUp, ResetPassword)
- [ ] Navigation et routing
- [ ] AuthContext et providers
- [ ] Formulaires et validation

### Tests E2E :
- [ ] Parcours inscription complète
- [ ] Parcours connexion/déconnexion
- [ ] Navigation pages protégées
- [ ] Responsive design

## Acceptance Criteria
- [ ] Coverage >90% pour hooks et utilities
- [ ] Tests intégration pour tous les composants critiques
- [ ] Tests E2E pour parcours utilisateur principaux
- [ ] CI/CD qui bloque les PRs si tests échouent
- [ ] Reports de coverage automatiques

## Technical Requirements
- Jest + React Testing Library pour tests unitaires/intégration
- Playwright pour tests E2E
- Coverage reports avec Istanbul
- Mock appropriés pour Supabase
- Tests SSR-safe (pas de window/document)

## Testing Requirements
- [ ] Tests rapides (<30s pour unitaires)
- [ ] Tests E2E stables et reproductibles
- [ ] Mock des services externes (Supabase)
- [ ] Tests de régression automatiques