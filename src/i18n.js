import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import English from "./locale/en/translation.json"
import Arabic from "./locale/ar/translation.json"

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar'],
    fallbackLng: 'en',
    resources: {
        en: {
            translation: English
        },
        ar: {
            translation: Arabic
        } 
    },
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'sessionStorage', 'navigator', 'querystring', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
