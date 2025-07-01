/**
 * Internationalization configuration
 * Sets up react-i18next with French and English translations
 * Includes localStorage detection and system language priority
 */

// External libraries
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Local imports - Translation files
import frAuth from './locales/fr/auth.json';
import enAuth from './locales/en/auth.json';
import frCommon from './locales/fr/common.json';
import enCommon from './locales/en/common.json';
import frProfile from './locales/fr/profile.json';
import enProfile from './locales/en/profile.json';
import frDashboard from './locales/fr/dashboard.json';
import enDashboard from './locales/en/dashboard.json';

const SUPPORTED_LANGUAGES = ['fr', 'en'];
const DEFAULT_LANGUAGE = 'fr';
const STORAGE_KEY = 'language';

const resources = {
  fr: { 
    auth: frAuth,
    common: frCommon,
    profile: frProfile,
    dashboard: frDashboard
  },
  en: { 
    auth: enAuth,
    common: enCommon,
    profile: enProfile,
    dashboard: enDashboard
  },
};

// Language detection function with priority: localStorage > OS > Browser > Default
const detectLanguage = () => {
  // Check if we're on the client side
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }
  
  // Priority 1: localStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
  }
  
  // Priority 2: System/OS language
  try {
    const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;
    const systemLang = systemLocale.split('-')[0];
    if (SUPPORTED_LANGUAGES.includes(systemLang)) {
      return systemLang;
    }
  } catch (error) {
    console.warn('Failed to detect system language:', error);
  }
  
  // Priority 3: Browser language
  try {
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language?.split('-')[0];
      if (browserLang && SUPPORTED_LANGUAGES.includes(browserLang)) {
        return browserLang;
      }
    }
  } catch (error) {
    console.warn('Failed to detect browser language:', error);
  }
  
  // Priority 4: Default language
  return DEFAULT_LANGUAGE;
};

const detectedLanguage = detectLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: detectedLanguage,
    fallbackLng: 'en',
    ns: ['auth', 'common', 'profile', 'dashboard'],
    defaultNS: 'auth',
    interpolation: {
      escapeValue: false,
    },
    // Don't save language changes automatically here
    // Language persistence is handled by useLanguage hook
    saveMissing: false,
  });

// Note: Language change persistence is now handled by the useLanguage hook
// This ensures proper priority: User settings > localStorage > OS > Browser > Default

export default i18n;
