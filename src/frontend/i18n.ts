import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import { enTranslations } from './locale'

export const resources = {
  en: enTranslations,
} as const

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  ns: ['common', 'home'],
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
