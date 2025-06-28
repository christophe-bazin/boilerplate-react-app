import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import frAuth from './locales/fr/auth.json';
import enAuth from './locales/en/auth.json';

const resources = {
  fr: { auth: frAuth },
  en: { auth: enAuth },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'en',
    ns: ['auth'],
    defaultNS: 'auth',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
