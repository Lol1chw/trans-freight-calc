import type { I18n, Locale } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'

import { createI18n } from 'vue-i18n'
import { nextTick } from 'vue'

const locale = useLocalStorage('transFreightCalcLocale', 'en')

async function loadLocaleMessage(i18n: I18n, locale: Locale) {
  const messages = await import(`@/locales/${locale}.json`)

  i18n.global.setLocaleMessage(locale, messages)

  return nextTick()
}

const AVAILABLE_LOCALES = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'ru',
    name: 'Russian',
  },
] as const

export async function setupI18n() {
  const i18n = createI18n({
    legacy: false,
    availableLocales: AVAILABLE_LOCALES.map(locale => locale.code),
    fallbackLocale: 'en',
    locale: locale.value,
  })

  await Promise.all(
    AVAILABLE_LOCALES.map(async locale => await loadLocaleMessage(i18n, locale.code)),
  )

  return i18n
}
