import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import frAuth from './locales/fr/auth.json';
import enAuth from './locales/en/auth.json';
import frCommon from './locales/fr/common.json';
import enCommon from './locales/en/common.json';

const resources = {
  fr: { 
    auth: frAuth,
    common: frCommon
  },
  en: { 
    auth: enAuth,
    common: enCommon
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'en',
    ns: ['auth', 'common'],
    defaultNS: 'auth',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
