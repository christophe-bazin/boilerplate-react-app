# Test de la correction du mécanisme de sauvegarde de langue

## Modifications apportées

### 1. Hook `useLanguage.js`
- ✅ Amélioration de la logique de priorisation : **User settings > localStorage > OS > Browser > Default**
- ✅ Ajout de logs pour debug
- ✅ Amélioration de la sauvegarde avec priorité base de données pour les utilisateurs connectés

### 2. Configuration `i18n.js`
- ✅ Suppression du listener automatique qui interférait avec la logique de priorisation
- ✅ Commentaires explicatifs ajoutés

### 3. Base de données
- ✅ Vérification que la table `user_settings` contient bien le champ `language`
- ✅ Le service `UserSettingsService` fonctionne correctement

## Tests à effectuer

### Test 1: Utilisateur non connecté
1. Ouvrir l'application sans être connecté
2. Changer la langue via le LanguageSelector dans TopBar
3. ✅ Vérifier que la langue est sauvée dans localStorage
4. ✅ Rafraîchir la page → la langue doit être maintenue

### Test 2: Utilisateur connecté sans préférences existantes
1. Se connecter avec un compte
2. Changer la langue dans Profile
3. ✅ Vérifier que la langue est sauvée en base de données
4. ✅ Se déconnecter puis se reconnecter → la langue doit être restaurée

### Test 3: Utilisateur connecté avec préférences existantes
1. Se connecter avec un compte qui a déjà des préférences en base
2. ✅ Vérifier que la langue de l'utilisateur est chargée (priorité sur localStorage)
3. Changer la langue
4. ✅ Vérifier que la modification est persistée en base

### Test 4: Priorité du système
1. Vider localStorage et ne pas être connecté
2. ✅ Vérifier que la langue du système/OS est détectée
3. ✅ Fallback vers le navigateur si langue OS non supportée
4. ✅ Fallback vers 'fr' par défaut

## Vérifications

Avec les corrections apportées, le changement de langue devrait maintenant :
- ✅ Se sauvegarder automatiquement selon le statut de connexion
- ✅ Respecter la priorité : User settings > localStorage > OS > Browser > Default
- ✅ Persister correctement entre les sessions

## Mécanisme attendu

```
1. User connecté + a des settings en BDD → Utilise la langue de la BDD
2. User connecté + pas de settings → Utilise localStorage → Crée settings en BDD
3. User non connecté → Utilise localStorage
4. Pas de localStorage → Utilise langue OS/Browser
5. Rien de détecté → Fallback vers 'fr'
```

La sauvegarde suit le principe inverse :
- User connecté → Sauve en BDD (+ localStorage pour backup)
- User non connecté → Sauve en localStorage uniquement
