# TASK-033: Amélioration UX création de compte existant

**Type**: Security & UX
**Priority**: 🟠 P1
**Status**: Pending

## Description
Améliorer le feedback lors de tentative de création avec un email existant tout en respectant les bonnes pratiques de sécurité.

## Problem
Actuellement, une tentative de création de compte avec un email existant renvoie un message de succès (comportement sécurisé pour éviter l'énumération d'utilisateurs), mais cela crée une UX confuse pour les utilisateurs légitimes.

## Implementation
- [ ] Analyser les bonnes pratiques de sécurité (ne pas révéler l'existence d'emails)
- [ ] Créer un message alternatif plus approprié
- [ ] Implémenter un flow différent pour comptes existants
- [ ] Considérer un message générique + email de notification
- [ ] Adapter les composants `SignUp.jsx` et potentiellement `SignIn.jsx`

## Acceptance Criteria
- [ ] UX moins confuse pour les utilisateurs légitimes
- [ ] Sécurité maintenue (pas de leak d'informations sur l'existence d'emails)
- [ ] Messages cohérents entre sign-up et sign-in
- [ ] Expérience utilisateur fluide et professionnelle

## Security Requirements
- [ ] Ne pas révéler l'existence d'emails dans la base de données
- [ ] Respecter les bonnes pratiques OWASP pour l'authentification
- [ ] Éviter l'énumération d'utilisateurs
- [ ] Maintenir la protection contre les attaques de reconnaissance

## Technical Requirements
- Utiliser les mécanismes Supabase appropriés
- Respecter les conventions du projet (react-i18next, etc.)
- Maintenir la cohérence avec le système d'authentification existant
- Possibilité d'envoyer des emails de notification si nécessaire

## Testing Requirements
- [ ] Tester avec un email existant
- [ ] Tester avec un nouvel email
- [ ] Vérifier que les messages ne révèlent pas d'informations sensibles
- [ ] Tests de sécurité pour l'énumération d'utilisateurs
- [ ] Tests d'expérience utilisateur sur le flow complet

## Notes
Rechercher les meilleures pratiques dans l'industrie pour ce type de problème UX/sécurité.