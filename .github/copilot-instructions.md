# Instructions GitHub Copilot

## Stack technique
- React 18 + Vite
- Tailwind CSS v3
- Supabase (auth + database)
- react-i18next (FR/EN)

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

## Styling
- Utiliser Tailwind uniquement
- Responsive first (mobile-first)
- Classes utilitaires plutôt que CSS custom

## Data management
- Utiliser les hooks customs pour la logique métier
- Gérer les états loading/error dans tous les appels async
- Validation côté client ET serveur pour toutes les données
- Utiliser Supabase pour l'auth et la base de données

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
