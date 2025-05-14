export const i18n = {
  defaultLocale: 'en',
<<<<<<< HEAD
  locales: ['en', 'es']
=======
  locales: ['en', 'fr']
>>>>>>> upstream/main
} as const

export type Locale = (typeof i18n)['locales'][number]