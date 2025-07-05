# TASK-002: Génération automatique sitemap.xml

**Type**: Feature
**Priority**: 🔴 P0
**Status**: Pending

## Description
Configuration pour SEO automatisé avec génération automatique du sitemap.xml.

## Problem
Le projet n'a pas de sitemap.xml généré automatiquement, ce qui nuit au référencement SEO.

## Implementation
- [ ] Installer `next-sitemap` ou implémenter génération statique
- [ ] Configurer pour toutes les pages publiques
- [ ] Exclure pages auth/dashboard du sitemap
- [ ] Configurer les URLs canoniques
- [ ] Ajouter robots.txt si nécessaire

## Acceptance Criteria
- [ ] Sitemap.xml généré automatiquement à chaque build
- [ ] Pages publiques incluses (/, /sign-in, /sign-up, etc.)
- [ ] Pages protégées exclues (/dashboard, /profile, etc.)
- [ ] Format XML valide selon standards Google
- [ ] Accessible via /sitemap.xml

## Technical Requirements
- Intégration avec Next.js build process
- Configuration dans next.config.js si nécessaire
- Respect des standards sitemap.xml
- Compatible avec déploiement Vercel/Netlify

## SEO Requirements
- URLs canoniques correctes
- Fréquence de mise à jour appropriée
- Priorité des pages configurée
- Exclusion des pages sensibles

## Testing Requirements
- [ ] Vérifier génération du sitemap à chaque build
- [ ] Valider le XML généré
- [ ] Tester accessibilité via navigateur
- [ ] Vérifier exclusion des pages protégées