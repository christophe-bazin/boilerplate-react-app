/**
 * LanguageSelector component
 * Simple language selector component for TopBar or other locations
 */

// React imports first
import { useState } from 'react';

// External libraries
import { useTranslation } from 'react-i18next';

// Local imports
import { useLanguage } from '../../hooks/useLanguage';

function LanguageSelector({ className = '' }) {
  const { t } = useTranslation('common');
  const { currentLanguage, changeLanguage, isLoading } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  const currentLangData = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = async (langCode) => {
    setIsOpen(false);
    if (langCode !== currentLanguage) {
      await changeLanguage(langCode);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-secondary-700 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-secondary-800 rounded-md transition-colors disabled:opacity-50"
        aria-label={t('selectLanguage')}
      >
        <span className="text-base">{currentLangData.flag}</span>
        <span className="hidden sm:inline">{currentLangData.code.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-secondary-700 z-20">
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
                    currentLanguage === lang.code
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="flex-1">{lang.name}</span>
                  {currentLanguage === lang.code && (
                    <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LanguageSelector;
