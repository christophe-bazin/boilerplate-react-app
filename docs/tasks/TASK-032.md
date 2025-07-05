# TASK-032: Amélioration Reset Password pour comptes Magic Link

**Type**: Feature
**Priority**: 🟠 P1
**Status**: Pending

## Description
Permettre la réinitialisation de mot de passe pour les comptes créés via Magic Link qui n'ont pas encore de mot de passe défini.

## Problem
Actuellement, resetPassword ne renvoie rien pour les comptes sans mot de passe. Les utilisateurs qui se sont inscrits via Magic Link ne peuvent pas définir un mot de passe par la suite.

## Implementation
- [ ] Détecter si le compte a été créé en Magic Link (pas de mot de passe)
- [ ] Permettre l'envoi d'un reset password même sans mot de passe existant
- [ ] Ajouter UI appropriée pour "Définir un mot de passe" vs "Réinitialiser"
- [ ] Messages d'erreur/succès adaptés selon le contexte
- [ ] Mettre à jour le hook `useAuth.js` si nécessaire
- [ ] Adapter le composant `ResetPassword.jsx`

## Acceptance Criteria
- [ ] Un utilisateur Magic Link peut définir son premier mot de passe
- [ ] Interface différenciée selon l'état du compte (nouveau mot de passe vs réinitialisation)
- [ ] Gestion d'erreurs appropriée avec messages localisés
- [ ] Flow utilisateur intuitif et cohérent

## Technical Requirements
- Utiliser les APIs Supabase appropriées pour la gestion des mots de passe
- Maintenir la compatibilité avec le système d'authentification existant
- Respecter les conventions de nommage et structure du projet
- Utiliser react-i18next pour tous les textes utilisateur

## Security Requirements
- Valider que l'utilisateur a le droit de modifier le mot de passe
- Respecter les critères de sécurité des mots de passe existants
- Utiliser les mécanismes de sécurité Supabase appropriés

## Testing Requirements
- [ ] Tester avec un compte créé via Magic Link
- [ ] Tester avec un compte ayant déjà un mot de passe
- [ ] Vérifier les messages d'erreur et de succès
- [ ] Test de validation des critères de mot de passe
- [ ] Tests d'intégration avec l'authentification existante