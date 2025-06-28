import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import frAuth from './locales/fr/auth.json';
import enAuth from './locales/en/auth.json';
import frCommon from './locales/fr/common.json';
import enCommon from './locales/en/common.json';
import frProfile from './locales/fr/profile.json';
import enProfile from './locales/en/profile.json';

const resources = {
  fr: { 
    auth: frAuth,
    common: frCommon,
    profile: frProfile
  },
  en: { 
    auth: enAuth,
    common: enCommon,
    profile: enProfile
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'en',
    ns: ['auth', 'common', 'profile'],
    defaultNS: 'auth',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
