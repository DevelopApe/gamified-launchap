export const defaultLocale = "en" as const;
<<<<<<< HEAD
export const locales = ["en", "es"] as const;
=======
export const locales = ["en", "fr"] as const;
>>>>>>> upstream/main

export type Locale = (typeof locales)[number];

export const pathnames = {};
export const localePrefix = "always";

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_URL
  ? `https://${process.env.WEBSITE_URL}`
  : `http://localhost:${port}`;
