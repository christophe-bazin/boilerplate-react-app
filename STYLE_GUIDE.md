# Guide de Style - Système de Couleurs

## 🎨 Palette de Couleurs

### Primary (Bleu - Couleurs de Marque)
Utilisé pour les actions principales, liens importants, et éléments de marque.

```css
primary-50: #eff6ff    /* Arrière-plans très clairs */
primary-100: #dbeafe   /* Arrière-plans clairs */
primary-200: #bfdbfe   /* Bordures légères */
primary-300: #93c5fd   /* Bordures moyennes */
primary-400: #60a5fa   /* États désactivés */
primary-500: #3b82f6   /* Couleur principale */
primary-600: #2563eb   /* Boutons normaux */
primary-700: #1d4ed8   /* Boutons hover */
primary-800: #1e40af   /* Boutons actifs */
primary-900: #1e3a8a   /* Texte sombre */
primary-950: #172554   /* Texte très sombre */
```

### Secondary (Gris - Couleurs Neutres)
Utilisé pour le texte, arrière-plans, et éléments structurels.

```css
secondary-50: #f8fafc    /* Arrière-plans très clairs */
secondary-100: #f1f5f9   /* Arrière-plans clairs */
secondary-200: #e2e8f0   /* Bordures légères */
secondary-300: #cbd5e1   /* Bordures moyennes */
secondary-400: #94a3b8   /* Placeholders */
secondary-500: #64748b   /* Texte secondaire */
secondary-600: #475569   /* Texte principal */
secondary-700: #334155   /* Texte sombre */
secondary-800: #1e293b   /* Arrière-plans sombres */
secondary-900: #0f172a   /* Texte très sombre */
secondary-950: #020617   /* Noir intense */
```

### Success (Vert - États Positifs)
Utilisé pour les confirmations, validations réussies, et messages positifs.

```css
success-50: #f0fdf4     /* Arrière-plans de succès très clairs */
success-100: #dcfce7    /* Arrière-plans de succès clairs */
success-200: #bbf7d0    /* Bordures de succès légères */
success-300: #86efac    /* Bordures de succès moyennes */
success-400: #4ade80    /* Icônes de succès */
success-500: #22c55e    /* Couleur principale de succès */
success-600: #16a34a    /* Boutons de succès */
success-700: #15803d    /* Boutons de succès hover */
success-800: #166534    /* Boutons de succès actifs */
success-900: #14532d    /* Texte de succès sombre */
```

### Warning (Jaune - Avertissements)
Utilisé pour les alertes, avertissements, et actions qui nécessitent attention.

```css
warning-50: #fffbeb     /* Arrière-plans d'alerte très clairs */
warning-100: #fef3c7    /* Arrière-plans d'alerte clairs */
warning-200: #fde68a    /* Bordures d'alerte légères */
warning-300: #fcd34d    /* Bordures d'alerte moyennes */
warning-400: #fbbf24    /* Icônes d'alerte */
warning-500: #f59e0b    /* Couleur principale d'alerte */
warning-600: #d97706    /* Boutons d'alerte */
warning-700: #b45309    /* Boutons d'alerte hover */
warning-800: #92400e    /* Boutons d'alerte actifs */
warning-900: #78350f    /* Texte d'alerte sombre */
```

### Error (Rouge - États d'Erreur)
Utilisé pour les erreurs, validations échouées, et actions destructives.

```css
error-50: #fef2f2       /* Arrière-plans d'erreur très clairs */
error-100: #fee2e2      /* Arrière-plans d'erreur clairs */
error-200: #fecaca      /* Bordures d'erreur légères */
error-300: #fca5a5      /* Bordures d'erreur moyennes */
error-400: #f87171      /* Icônes d'erreur */
error-500: #ef4444      /* Couleur principale d'erreur */
error-600: #dc2626      /* Boutons d'erreur */
error-700: #b91c1c      /* Boutons d'erreur hover */
error-800: #991b1b      /* Boutons d'erreur actifs */
error-900: #7f1d1d      /* Texte d'erreur sombre */
```

## 📋 Usage Guidelines

### Boutons

```jsx
<!-- Bouton principal -->
<button className="bg-primary-600 hover:bg-primary-700 text-white">
  Action Principale
</button>

<!-- Bouton secondaire -->
<button className="bg-secondary-200 hover:bg-secondary-300 text-secondary-800">
  Action Secondaire
</button>

<!-- Bouton de succès -->
<button className="bg-success-600 hover:bg-success-700 text-white">
  Confirmer
</button>

<!-- Bouton d'erreur -->
<button className="bg-error-600 hover:bg-error-700 text-white">
  Supprimer
</button>
```

### Inputs et Formulaires

```jsx
<!-- Input avec focus primary -->
<input className="border-secondary-300 focus:ring-primary-500 focus:border-primary-500" />

<!-- Message de succès -->
<div className="bg-success-50 border-success-200 text-success-600 p-3 rounded">
  Opération réussie !
</div>

<!-- Message d'erreur -->
<div className="bg-error-50 border-error-200 text-error-600 p-3 rounded">
  Une erreur s'est produite
</div>
```

### Texte et Typographie

```jsx
<!-- Titre principal -->
<h1 className="text-secondary-900 dark:text-white">Titre</h1>

<!-- Texte secondaire -->
<p className="text-secondary-600 dark:text-secondary-400">Description</p>

<!-- Lien -->
<a className="text-primary-600 hover:text-primary-700">Lien</a>
```

### Arrière-plans et Layouts

```jsx
<!-- Carte/Container -->
<div className="bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700">
  Contenu
</div>

<!-- Arrière-plan de page -->
<div className="bg-secondary-50 dark:bg-secondary-900">
  Page content
</div>
```

## 🌓 Mode Sombre

Toutes les couleurs ont été conçues pour fonctionner dans les deux modes :

### Règles pour le Mode Sombre
- Utilisez toujours les variantes `dark:` pour le mode sombre
- Les couleurs claires (50-200) deviennent sombres (700-900)
- Les couleurs moyennes (300-600) restent cohérentes
- Le texte blanc sur fond sombre, sombre sur fond clair

### Exemples

```jsx
<!-- Texte adaptatif -->
<p className="text-secondary-900 dark:text-white">Texte principal</p>
<p className="text-secondary-600 dark:text-secondary-400">Texte secondaire</p>

<!-- Arrière-plan adaptatif -->
<div className="bg-white dark:bg-secondary-800">Contenu</div>

<!-- Bordure adaptative -->
<div className="border-secondary-200 dark:border-secondary-700">Élément</div>
```

## ✅ Bonnes Pratiques

### DO (À Faire)
- ✅ Utilisez le système de couleurs personnalisé
- ✅ Testez dans les deux modes (clair/sombre)
- ✅ Respectez la sémantique des couleurs (success pour positif, error pour négatif)
- ✅ Utilisez les nuances appropriées selon le contexte
- ✅ Maintenez un contraste suffisant pour l'accessibilité

### DON'T (À Éviter)
- ❌ N'utilisez pas de couleurs Tailwind par défaut (blue-600, gray-500, etc.)
- ❌ N'oubliez pas les variantes dark: pour le mode sombre
- ❌ Ne mélangez pas les systèmes de couleurs
- ❌ N'utilisez pas success pour des actions neutres
- ❌ N'utilisez pas error pour des avertissements simples

## 🎯 Exemples Complets

### Formulaire de Connexion
```jsx
<form className="p-8 bg-white dark:bg-secondary-800 rounded-xl shadow-xl border border-secondary-100 dark:border-secondary-700">
  <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
    Connexion
  </h2>
  
  <input 
    type="email"
    className="px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400"
    placeholder="Email"
  />
  
  <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium">
    Se connecter
  </button>
</form>
```

### Alert/Notification
```jsx
<!-- Succès -->
<div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 text-success-600 dark:text-success-400 p-4 rounded-lg">
  <p>✓ Opération réussie avec succès</p>
</div>

<!-- Erreur -->
<div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 text-error-600 dark:text-error-400 p-4 rounded-lg">
  <p>✗ Une erreur s'est produite</p>
</div>
```

Cette approche garantit une cohérence visuelle parfaite et une maintenance simplifiée du code.
