import { useTranslation } from 'react-i18next';

/**
 * ColorDemo component
 * Demonstrates the custom color system in action
 */
export default function ColorDemo() {
  const { t } = useTranslation('auth');

  const colorCategories = [
    {
      name: 'Primary',
      colors: ['primary-50', 'primary-100', 'primary-200', 'primary-300', 'primary-400', 'primary-500', 'primary-600', 'primary-700', 'primary-800', 'primary-900'],
      description: 'Brand colors for main actions and highlights'
    },
    {
      name: 'Secondary',
      colors: ['secondary-50', 'secondary-100', 'secondary-200', 'secondary-300', 'secondary-400', 'secondary-500', 'secondary-600', 'secondary-700', 'secondary-800', 'secondary-900'],
      description: 'Neutral colors for backgrounds and text'
    },
    {
      name: 'Success',
      colors: ['success-50', 'success-100', 'success-200', 'success-300', 'success-400', 'success-500', 'success-600', 'success-700', 'success-800', 'success-900'],
      description: 'Positive feedback and confirmations'
    },
    {
      name: 'Warning',
      colors: ['warning-50', 'warning-100', 'warning-200', 'warning-300', 'warning-400', 'warning-500', 'warning-600', 'warning-700', 'warning-800', 'warning-900'],
      description: 'Alerts and cautions'
    },
    {
      name: 'Error',
      colors: ['error-50', 'error-100', 'error-200', 'error-300', 'error-400', 'error-500', 'error-600', 'error-700', 'error-800', 'error-900'],
      description: 'Error states and validation feedback'
    }
  ];

  const buttonExamples = [
    { color: 'primary', label: 'Primary Action' },
    { color: 'secondary', label: 'Secondary Action' },
    { color: 'success', label: 'Success Action' },
    { color: 'warning', label: 'Warning Action' },
    { color: 'error', label: 'Error Action' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
          Color System Demo
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Système de couleurs personnalisé avec support du mode sombre
        </p>
      </div>

      {/* Color Palettes */}
      <div className="space-y-8">
        {colorCategories.map((category) => (
          <div key={category.name} className="bg-white dark:bg-secondary-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
              {category.name}
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              {category.description}
            </p>
            <div className="grid grid-cols-10 gap-2">
              {category.colors.map((color) => (
                <div key={color} className="text-center">
                  <div 
                    className={`h-12 w-full rounded-md bg-${color} border border-secondary-200 dark:border-secondary-700`}
                  />
                  <span className="text-xs text-secondary-500 dark:text-secondary-400 mt-1 block">
                    {color.split('-')[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Button Examples */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
          Button Examples
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {buttonExamples.map((example) => (
            <button
              key={example.color}
              className={`px-4 py-2 rounded-lg font-medium transition-colors
                bg-${example.color}-600 hover:bg-${example.color}-700 
                text-white shadow-sm`}
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form Examples */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
          Form Elements
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Primary focus input"
            className="w-full px-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
              <p className="text-success-600 dark:text-success-400 text-sm">
                ✓ Success message example
              </p>
            </div>
            <div className="p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
              <p className="text-error-600 dark:text-error-400 text-sm">
                ✗ Error message example
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Demonstration */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
          Theme Integration
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400 mb-4">
          Ce système de couleurs s'adapte automatiquement aux thèmes clair et sombre, 
          offrant une expérience utilisateur cohérente dans tous les modes.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
            Responsive
          </span>
          <span className="px-3 py-1 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 rounded-full text-sm">
            Accessible
          </span>
          <span className="px-3 py-1 bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300 rounded-full text-sm">
            Consistent
          </span>
        </div>
      </div>
    </div>
  );
}
