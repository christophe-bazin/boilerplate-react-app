/**
 * TopBar component
 * Navigation bar that adapts based on authentication status
 * Shows logo, user menu for authenticated users, or sign in/up buttons for guests
 */

// External libraries
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Local imports
import { useAuth } from '../../hooks/useAuth';
import { useAppConfig } from '../../hooks/useAppConfig';
import UserDropdown from './UserDropdown';
import ThemeToggle from '../ui/ThemeToggle';
function TopBar() {
  const { user } = useAuth();
  const { t } = useTranslation('common');
  const config = useAppConfig();

  return (
    <nav className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <Link to={user ? "/app" : "/"} className="flex items-center gap-3">
            <div className="w-8 h-8 text-primary-600 dark:text-primary-400">
              <svg viewBox="0 0 40 40" fill="currentColor">
                <rect width="40" height="40" rx="8"/>
                <path d="M12 16h16v2H12v-2zm0 4h16v2H12v-2zm0 4h12v2H12v-2z" fill="white"/>
                <circle cx="32" cy="12" r="4" fill="#3B82F6"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-secondary-900 dark:text-white">
              {config.app.name}
            </span>
          </Link>

          {/* Right side navigation */}
          <div className="flex items-center gap-4">
            {user ? (
              /* Authenticated user */
              <UserDropdown />
            ) : (
              /* Guest user */
              <>
                <ThemeToggle />
                <div className="flex items-center gap-2">
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-sm font-medium text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {t('navigation.signIn')}
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                  >
                    {t('navigation.signUp')}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopBar;
