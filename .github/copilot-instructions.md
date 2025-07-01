# Instructions GitHub Copilot

## Stack technique
- Next.js 14+ avec App Router
- TypeScript
- Tailwind CSS v3
- Supabase (auth + database)
- react-i18next (FR/EN)

## Conventions de code
- Composants en PascalCase
- Hooks customs avec préfixe "use"
- Fichiers en camelCase ou kebab-case
- Utiliser les hooks modernes (useState, useEffect, etc.)
- Extensions .tsx pour les composants TypeScript

## Structure des composants
- Imports React en premier (optionnel avec Next.js 14)
- Puis les libs externes  
- Puis les imports locaux
- Export default à la fin
- Ne pas laisser d'imports vides ou inutilisés

## Next.js App Router
- Utiliser App Router exclusivement (pas Pages Router)
- Variables d'env : NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
- 'use client' obligatoire pour : hooks, états, événements, contextes
- Server Components par défaut pour les pages et layouts
- Route groups : (auth) pour auth, (protected) pour pages protégées
- Utiliser next/link et next/navigation (useRouter, redirect, notFound)
- Layouts imbriqués pour structurer l'application

## Architecture App Router
- app/ : Pages et layouts Next.js
- app/layout.tsx : Layout racine avec métadonnées
- app/page.tsx : Page d'accueil
- app/(auth)/ : Route group pour l'authentification
- app/(protected)/ : Route group pour les pages protégées
- src/ : Code source (composants, hooks, utils)
- Providers centralisés dans src/components/providers/Providers.tsx

## Styling
- Utiliser Tailwind CSS uniquement
- Responsive first (mobile-first)
- Classes utilitaires plutôt que CSS custom
- Dark mode géré par Tailwind CSS
- Styles globaux dans src/styles/global.css

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
