import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    ru: {
      message: {
        price: '10rub',
      },
    },
    en: {
      message: {
        price: '10$',
      },
    },
  },
})
