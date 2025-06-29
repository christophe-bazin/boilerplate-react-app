/**
 * Internationalization configuration
 * Sets up react-i18next with French and English translations
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

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'en',
    ns: ['auth', 'common', 'profile', 'dashboard'],
    defaultNS: 'auth',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
