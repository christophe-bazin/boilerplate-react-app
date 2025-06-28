// External libraries
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Local imports
import { useAppConfig } from '../../hooks/useAppConfig';
import { AuthTestComponent } from '../debug/AuthTestComponent';

/**
 * HomePage component
 * Landing page for unauthenticated users with app presentation and CTA buttons
 */
function HomePage() {
  const { t } = useTranslation('common');
  const config = useAppConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 text-blue-600 dark:text-blue-400">
              <svg viewBox="0 0 40 40" fill="currentColor" className="w-full h-full">
                <rect width="40" height="40" rx="8"/>
                <path d="M12 16h16v2H12v-2zm0 4h16v2H12v-2zm0 4h12v2H12v-2z" fill="white"/>
                <circle cx="32" cy="12" r="4" fill="#3B82F6"/>
              </svg>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('homepage.title')}
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('homepage.tagline')}
          </p>

          {/* Description */}
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            {t('homepage.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="px-8 py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              {t('navigation.signUp')}
            </Link>
            <Link
              to="/signin"
              className="px-8 py-4 text-lg font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-lg transition-colors"
            >
              {t('navigation.signIn')}
            </Link>
          </div>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6.5a.5.5 0 01-.5.5h-2a1 1 0 100 2h2a2.5 2.5 0 002.5-2.5V5a4 4 0 00-4-4H6a4 4 0 00-4 4v9a2 2 0 002 2h2.5a.5.5 0 010 1H4a4 4 0 01-4-4V5z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('homepage.features.feature1.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('homepage.features.feature1.description')}
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('homepage.features.feature2.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('homepage.features.feature2.description')}
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('homepage.features.feature3.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('homepage.features.feature3.description')}
              </p>
            </div>
          </div>
        </div>
        
        {/* Debug component - remove in production */}
        <div className="mt-8">
          <AuthTestComponent />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
