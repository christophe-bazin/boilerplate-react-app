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
      className={`px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
        bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
        transition-colors ${className}`}
    >
      <option value="light">☀️ Clair</option>
      <option value="dark">🌙 Sombre</option>
    </select>
  );
}
