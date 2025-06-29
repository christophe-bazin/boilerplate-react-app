/**
 * DashboardPage component
 * Main dashboard for authenticated users
 */

// External libraries
import { useTranslation } from 'react-i18next';

// Local imports
import { useAuth } from '../../hooks/useAuth';
function DashboardPage() {
  const { t } = useTranslation('dashboard');
  const { user } = useAuth();

  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {t('title')}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
        {t('welcome', { email: user?.email })}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500">
        {t('subtitle')}
      </p>
    </div>
  );
}

export default DashboardPage;
