# Instructions GitHub Copilot

## Stack technique
- Next.js 14+ + App Router
- React 18
- Tailwind CSS v3
- Supabase (auth + database)
- react-i18next (FR/EN)
- TypeScript ready

## Conventions de code
- Composants en PascalCase
- Hooks customs avec préfixe "use"
- Fichiers en camelCase
- Utiliser les hooks React modernes (useState, useEffect, etc.)

## Structure des composants
- Imports React en premier
- Puis les libs externes  
- Puis les imports locaux
- Export default à la fin
- Ne pas laisser d'imports vides ou inutilisés

## Next.js App Router
- App Router (pas Pages Router)
- Variables d'env : NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
- Client Components : auth, hooks, i18n (avec 'use client')
- Server Components : pages statiques
- Route groups : (auth) pour auth, (protected) pour pages protégées
- Utiliser next/link au lieu de react-router-dom
- Utiliser next/navigation (useRouter, redirect) pour la navigation

## Styling
- Utiliser Tailwind uniquement
- Responsive first (mobile-first)
- Classes utilitaires plutôt que CSS custom

## Data management
- Utiliser les hooks customs pour la logique métier
- Gérer les états loading/error dans tous les appels async
- Validation côté client ET serveur pour toutes les données
- Utiliser Supabase pour l'auth et la base de données

## Authentication (AuthContext)
- Utiliser `useAuthContext()` pour accéder à l'état d'authentification
- Ne jamais utiliser directement `useAuth()` dans les composants
- L'AuthContext centralise l'état auth dans toute l'application
- Utiliser `withLoadingProtection()` HOC pour les composants sensibles
- Éviter le props drilling avec `user={user}` - le context gère tout
- L'état loading global est géré par les layouts App Router + protections locales

## Code quality
- Commentaires toujours en anglais
- Commentaire de présentation obligatoire en début de fichier
- Commentaires pour découper les sections d'un script
- Autres commentaires uniquement si nécessaires pour clarifier la logique
- Code propre et concis
- Pas de données sensibles dans le code

## Internationalisation (i18n)
- Utiliser react-i18next pour tous les textes utilisateur
- Importer `useTranslation` et utiliser `const { t } = useTranslation('namespace')`
- Tous les textes affichés doivent utiliser `t('key')` (pas de fallbacks)
- Organiser les traductions par namespace (auth, common, etc.)
- Maintenir les fichiers de traduction dans `src/locales/fr/` et `src/locales/en/`

## Maintenance du projet
- README.md : Maintenir les étapes d'installation et la description du projet
- package.json : Ajouter les nouveaux scripts et dépendances
- database/setup.sql : Documenter les changements de schéma de base de données
- .gitignore : Ajouter les nouveaux types de fichiers à ignorer

## Git
- Commits fréquents avec messages courts et précis
- Messages en anglais
- Utiliser `git commit --amend` pour les corrections/améliorations mineures
