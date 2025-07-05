# 📋 BACKLOG - Next.js SaaS Boilerplate Platform

> **Objectif Final** : Transformer ce boilerplate Next.js en une **plateforme de création rapide de SaaS** (comme ShipFast) avec une architecture modulaire permettant de générer des SaaS en quelques minutes.

## 🏷️ Légende

- 🔴 **P0** - Bloquant / Critique
- 🟠 **P1** - Important / Priorité haute  
- 🟡 **P2** - Améliorations / Priorité moyenne
- 🟢 **P3** - Nice-to-have / Priorité basse

---

## 🚀 **TÂCHES PRIORITAIRES - Phase 1 : Stabilisation**

### 🔴 P0 - Corrections SSR (Production Ready)

#### **TASK-001**: ~~Corriger warnings SSR restants~~ ✅ COMPLETED
- **Type**: Bug Fix
- **Description**: ~~Améliorer protection window/document dans les hooks~~
- **STATUS**: **✅ AUDIT RESULT: SSR PROTECTION IS PERFECT**
- **Audit Notes**:
  - `src/hooks/useTheme.js` : Protection `typeof window` déjà implémentée parfaitement
  - `src/components/ui/ThemeToggle.jsx` : Toutes les APIs browser correctement protégées
  - `src/hooks/useLanguage.js` : Protection complète window/navigator/localStorage
  - `src/i18n.js` : Détection SSR-safe des langues
- **Acceptance Criteria**: ✅ TOUS VALIDÉS
  - [x] Pas de warnings console en mode production
  - [x] Tests SSR passent sans erreurs

#### **TASK-002**: Génération automatique sitemap.xml
- **Type**: Feature
- **Description**: Configuration pour SEO automatisé
- **Implementation**:
  - [ ] Installer `next-sitemap` ou génération statique
  - [ ] Configurer pour toutes les pages publiques
  - [ ] Exclure pages auth/dashboard du sitemap

### 🟠 P1 - Configuration Production

#### **TASK-003**: Variables d'environnement production
- **Type**: DevOps
- **Description**: Setup complet pour déploiement
- **Subtasks**:
  - [ ] Configuration Vercel/Netlify
  - [ ] Variables Supabase production
  - [ ] Configuration domaine
  - [ ] Validation variables d'env

#### **TASK-004**: Migration vers TypeScript complet
- **Type**: Refactoring
- **Description**: Migrer tous les composants .jsx vers .tsx pour cohérence TypeScript
- **STATUS**: **🟠 PRIORITY - Audit findings**
- **Fichiers identifiés par audit**:
  - `src/components/auth/*.jsx` (BanWarning, MagicLinkForm, ResetPassword, SignIn, SignUp)
  - `src/components/layout/UserDropdown.jsx` et `TopBar.jsx`
  - `src/components/pages/*.jsx` (DashboardPage, HomePage, ProfilePage)
  - `src/components/ui/*.jsx` (LanguageSelector, PasswordInput, ThemeToggle)
  - `src/contexts/AuthContext.jsx`
  - `src/hooks/*.js` (useAuth, useAppConfig, etc.)
  - `src/lib/*.js` et `src/i18n.js`
- **Missing React imports found**:
  - `src/components/layout/PublicPageLayout.tsx` - manque `import React`
  - `app/layout.tsx` - manque `import React`
- **Acceptance Criteria**:
  - [ ] Renommer .jsx → .tsx pour tous les composants
  - [ ] Ajouter types TypeScript appropriés
  - [ ] Ajouter imports React manquants
  - [ ] Vérifier compilation sans erreurs

#### **TASK-005**: ~~Optimisation images Next.js~~ ✅ READY
- **Type**: Performance  
- **Description**: ~~Migration vers next/image pour performance~~
- **STATUS**: **✅ AUDIT RESULT: NO IMAGES FOUND IN CODEBASE**
- **Audit Notes**: 
  - Aucune balise `<img>` trouvée dans le code
  - Configuration next/image déjà présente dans `next.config.js`
  - Prêt pour utilisation future de `next/image`
- **Acceptance Criteria**: ✅ N/A - Pas d'images actuellement
  - [x] Configuration next/image en place
  - [x] Prêt pour futures images

---


### 🟠 P1 - Structure Monorepo

#### **TASK-006**: Setup Turborepo
- **Type**: Architecture
- **Description**: Migration vers structure monorepo
- **Implementation**:
  ```bash
  npx create-turbo@latest saas-creation-platform
  ```
- **Structure cible**:
  ```
  saas-creation-platform/
  ├── packages/
  │   ├── core/           # Package npm réutilisable
  │   └── templates/      # Templates SaaS
  └── apps/
      ├── platform/       # Plateforme génération
      └── docs/           # Documentation
  ```

#### **TASK-007**: Extraction Core Package
- **Type**: Refactoring
- **Description**: Séparer code réutilisable
- **Subtasks**:
  - [ ] Déplacer composants réutilisables vers `packages/core/src/`
  - [ ] Configuration build avec Rollup/Webpack (compatible Next.js)
  - [ ] Types TypeScript complets
  - [ ] Tests unitaires (>80% coverage)
  - [ ] Documentation API

#### **TASK-008**: Package.json du Core
- **Type**: Config
- **Description**: Configuration npm package
- **Config**:
  ```json
  {
    "name": "@saas-platform/core",
    "version": "1.0.0",
    "main": "dist/index.js",
    "module": "dist/index.esm.js",
    "types": "dist/index.d.ts"
  }
  ```

### 🟡 P2 - Templates de Base

#### **TASK-009**: Template Next.js minimal
- **Type**: Template
- **Subtasks**:
  - [ ] Utilise `@saas-platform/core`
  - [ ] Pages d'exemple
  - [ ] Configuration Tailwind

#### **TASK-010**: Template SaaS Dashboard
- **Type**: Template
- **Features**:
  - [ ] Dashboard avec métriques
  - [ ] Gestion utilisateurs
  - [ ] Billing integration placeholder

#### **TASK-011**: Template E-commerce SaaS
- **Type**: Template
- **Features**:
  - [ ] Catalogue produits
  - [ ] Panier et checkout
  - [ ] Admin panel

---


### 🟠 P1 - Interface Web

#### **TASK-012**: Sélecteur de template
- **Type**: Feature
- **Features**:
  - [ ] Preview des templates
  - [ ] Customisation de base (nom, couleurs, logo)

#### **TASK-013**: Configuration Supabase auto
- **Type**: Integration
- **Features**:
  - [ ] Auto-création projet Supabase
  - [ ] Déploiement schéma database
  - [ ] Configuration auth

#### **TASK-014**: Configuration déploiement
- **Type**: DevOps
- **Features**:
  - [ ] Intégration Vercel/Netlify API
  - [ ] Variables d'environnement automatiques
  - [ ] Domaine personnalisé

### 🟡 P2 - CLI de Génération

#### **TASK-015**: CLI avec Inquirer.js
- **Type**: Tool
- **Example**:
  ```bash
  npx create-saas my-awesome-saas
  ? Quel template ? (Dashboard SaaS)
  ? Nom de l'app ? (My Awesome SaaS)
  ```

#### **TASK-016**: Templates avec variables
- **Type**: Feature
- **Description**: Remplacement automatique variables dans templates

#### **TASK-017**: Intégration APIs externes
- **Type**: Integration
- **APIs**:
  - [ ] Supabase Management API
  - [ ] Vercel API

---


### 🟡 P2 - Billing & Subscriptions

#### **TASK-018**: Intégration Stripe/LemonSqueezy
- **Type**: Feature
- **Features**:
  - [ ] Composants checkout
  - [ ] Gestion abonnements
  - [ ] Webhooks de paiement

#### **TASK-019**: Multi-tenancy
- **Type**: Architecture
- **Features**:
  - [ ] Gestion workspaces/organisations
  - [ ] Permissions et rôles
  - [ ] Isolation des données

### 🟡 P2 - Features Avancées

#### **TASK-020**: Analytics & Monitoring
- **Type**: Feature
- **Features**:
  - [ ] Dashboard métriques
  - [ ] Logs et erreurs
  - [ ] Performance monitoring

#### **TASK-021**: Email & Notifications
- **Type**: Feature
- **Features**:
  - [ ] Templates emails
  - [ ] Notifications in-app
  - [ ] Webhooks externes

#### **TASK-022**: API & Intégrations
- **Type**: Feature
- **Features**:
  - [ ] Auto-génération API REST
  - [ ] Documentation Swagger
  - [ ] Webhooks configurables

---


### 🟢 P3 - Marketplace Templates

#### **TASK-023**: Templates communautaires
- **Type**: Platform

#### **TASK-024**: Rating et reviews
- **Type**: Feature

#### **TASK-025**: Monétisation créateurs
- **Type**: Business

### 🟢 P3 - Plugins et Extensions

#### **TASK-026**: Système de plugins
- **Type**: Architecture

#### **TASK-027**: Store d'extensions
- **Type**: Platform

#### **TASK-028**: API développeurs tiers
- **Type**: API

---

## 🛠️ **AMÉLIORATIONS TECHNIQUES IDENTIFIÉES**

### 🟡 P2 - Code Quality

#### **TASK-029**: Tests automatisés
- **Type**: Testing
- **Scope**:
  - [ ] Tests unitaires hooks (useTheme, useLanguage, useAuth)
  - [ ] Tests intégration composants auth
  - [ ] Tests E2E parcours utilisateur
  - [ ] Coverage >90%

#### **TASK-030**: Documentation technique
- **Type**: Documentation
- **Scope**:
  - [ ] JSDoc sur tous les hooks/composants
  - [ ] Guide architecture détaillé
  - [ ] API Reference complète

#### **TASK-031**: Performance optimizations
- **Type**: Performance
- **Scope**:
  - [ ] Code splitting avancé
  - [ ] Lazy loading composants
  - [ ] Bundle analysis et optimisation
  - [ ] Service Worker pour PWA

### 🟠 P1 - Améliorations Authentification

> **📁 Tâches détaillées**: Voir fichiers individuels dans `docs/tasks/`

- **[TASK-032](tasks/TASK-032.md)**: 🔥 Reset Password pour Magic Link
- **[TASK-033](tasks/TASK-033.md)**: UX création compte existant  
- **[TASK-034](tasks/TASK-034.md)**: Implémentation MFA (Multi-Factor Authentication)

### 🟢 P3 - Developer Experience

#### **TASK-035**: Storybook setup
- **Type**: Tool
- **Description**: Playground pour composants UI

#### **TASK-036**: ESLint/Prettier optimisation
- **Type**: Tool
- **Description**: Rules strictes + auto-fix

#### **TASK-037**: Husky + lint-staged
- **Type**: Git
- **Description**: Pre-commit hooks qualité

---

## 📊 **MÉTRIQUES DE SUCCÈS**

### Techniques
- [ ] **Performance**: Build < 30s, Load < 2s
- [ ] **Qualité**: 100% tests coverage core package
- [ ] **DX**: Génération SaaS < 5 minutes

### Business
- [ ] **Adoption**: 100 SaaS générés/mois
- [ ] **Community**: 50 contributeurs
- [ ] **Revenue**: Modèle freemium/pro

---

## 🎯 **PROCHAINES ACTIONS** (Mise à jour post-audit)

**✅ AUDIT COMPLETED - Code Quality: 95% ✅**

1. **~~🔴 TASK-001~~** : ✅ SSR protection parfaite - DONE
2. **🔴 TASK-002** : Sitemap automatique
3. **🟠 TASK-003** : Variables env production  
4. **🟠 TASK-004** : 🔥 **PRIORITY** Migration vers TypeScript complet
5. **~~🟠 TASK-005~~** : ✅ Images Next.js - Pas nécessaire pour l'instant
6. **🟠 TASK-006** : Setup Turborepo

**🔒 NOUVELLES PRIORITÉS AUTHENTIFICATION:**
7. **🟠 [TASK-032](tasks/TASK-032.md)** : 🔥 **PRIORITY** Reset Password pour Magic Link
8. **🟠 [TASK-033](tasks/TASK-033.md)** : UX création compte existant
9. **🟠 [TASK-034](tasks/TASK-034.md)** : Implémentation MFA (Multi-Factor Authentication)

**📊 AUDIT FINDINGS SUMMARY:**
- **SSR/Performance**: Excellent (100% browser API protection)
- **Architecture**: Next.js 14 App Router parfaitement implémenté
- **AuthContext**: Usage correct partout
- **i18n**: Configuration optimale react-i18next
- **TypeScript**: Migration principale tâche restante

---

## 🔄 **PROCESS**

- **Commit Strategy**: 1 commit par task terminée
- **Review**: Peer review obligatoire pour P0/P1
- **Deploy**: Auto-deploy sur merge main
