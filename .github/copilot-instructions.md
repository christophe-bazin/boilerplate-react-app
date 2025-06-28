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

## Authentification
- Utiliser le hook useAuth custom
- Gérer les états loading/error
- Validation côté client ET serveur

## Code quality
- Commentaire de présentation obligatoire en début de fichier (en anglais)
- Autres commentaires uniquement si nécessaires pour clarifier la logique (en anglais)
- Code propre et concis
- Pas de données sensibles dans le code

## Maintenance du projet
- README.md : Maintenir les étapes d'installation et la description du projet
- package.json : Ajouter les nouveaux scripts et dépendances
- scripts/setup-local.sh : Automatiser l'installation des nouvelles dépendances
- database/setup.sql : Documenter les changements de schéma de base de données
- .gitignore : Ajouter les nouveaux types de fichiers à ignorer

## Git
- Commits fréquents avec messages courts et précis
- Messages en anglais
- Utiliser `git commit --amend` pour les corrections/améliorations mineures
