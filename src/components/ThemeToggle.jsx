import { useTheme } from '../hooks/useTheme';

/**
 * ThemeToggle component
 * Simple select dropdown to switch between light and dark themes
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, setTheme } = useTheme();

  if (!theme) return null;

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className={`px-3 py-1 text-sm border border-secondary-300 dark:border-secondary-600 rounded-md 
        bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white 
        focus:ring-2 focus:ring-primary-500 focus:border-transparent 
        transition-colors ${className}`}
    >
      <option value="light">☀️ Clair</option>
      <option value="dark">🌙 Sombre</option>
    </select>
  );
}
