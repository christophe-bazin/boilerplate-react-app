# Système de Gestion des Langues

## Vue d'ensemble

Le système de gestion des langues suit une hiérarchie de priorité stricte pour déterminer la langue à utiliser :

1. **Paramètres utilisateur** (si connecté) - priorité maximale
2. **localStorage** (navigateur) - préférences locales
3. **Langue système/OS** - détection automatique de l'OS
4. **Langue du navigateur** - fallback si système non supporté
5. **Langue par défaut** (français) - derniers recours

## Fonctionnalités

### Détection automatique
- Détection de la langue système via `Intl.DateTimeFormat()`
- Fallback sur la langue du navigateur via `navigator.language`
- Sauvegarde automatique dans localStorage

### Synchronisation utilisateur
- Les utilisateurs connectés voient leurs préférences sauvées en base
- Synchronisation automatique entre appareils
- Mise à jour en temps réel lors du changement

### Persistance
- localStorage pour les préférences locales
- Base de données Supabase pour les utilisateurs connectés
- Pas de perte de préférences entre les sessions

## Utilisation

### Hook useLanguage
```javascript
import { useLanguage } from '../hooks/useLanguage';

function MyComponent() {
  const { 
    currentLanguage,      // 'fr' | 'en'
    changeLanguage,       // (lang: string) => Promise<boolean>
    isLoading,           // boolean
    supportedLanguages   // ['fr', 'en']
  } = useLanguage();

  const handleChange = async (newLang) => {
    const success = await changeLanguage(newLang);
    if (success) {
      console.log('Language changed successfully');
    }
  };
}
```

### Composant LanguageSelector
```javascript
import { LanguageSelector } from '../components/ui';

function TopBar() {
  return (
    <div className="topbar">
      <LanguageSelector className="ml-4" />
    </div>
  );
}
```

## Configuration

### Langues supportées
Modifiez `SUPPORTED_LANGUAGES` dans :
- `src/hooks/useLanguage.js`
- `src/i18n.js`

### Langue par défaut
Modifiez `DEFAULT_LANGUAGE` dans les mêmes fichiers.

### Ajout d'une nouvelle langue
1. Créer les fichiers de traduction dans `src/locales/[code]/`
2. Importer les fichiers dans `src/i18n.js`
3. Ajouter le code à `SUPPORTED_LANGUAGES`
4. Mettre à jour le composant `LanguageSelector`

## Architecture

### Fichiers clés
- `src/hooks/useLanguage.js` - Hook principal de gestion
- `src/i18n.js` - Configuration react-i18next avec détection
- `src/components/ui/LanguageSelector.jsx` - Sélecteur de langue
- `src/lib/userSettings.js` - Service de sauvegarde utilisateur

### Flux de données
1. **Initialisation** : Détection → localStorage → i18next
2. **Changement** : Hook → i18next → localStorage → Base de données
3. **Authentification** : Base de données → localStorage → i18next

### Providers
- `LanguageProvider` dans `App.jsx` pour l'initialisation
- Intégré avec `AuthProvider` pour la synchronisation utilisateur

## Tests

### Test de priorité
1. Déconnecté : Vérifier détection système/navigateur
2. localStorage : Changer langue, recharger page
3. Utilisateur connecté : Vérifier synchronisation entre appareils
4. Changement : Vérifier mise à jour immédiate de l'interface

### Cas limites
- Langue non supportée → fallback vers défaut
- Erreur localStorage → continuer avec détection système
- Erreur base de données → continuer avec localStorage
- Réseau hors ligne → fonctionnement local uniquement
