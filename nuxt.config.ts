import en from "./locales/en.json";
import fr from "./locales/fr.json";

export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
  },

  ssr: false,

  css: ["~/assets/style/main.scss"],

  build: {
    transpile: ["@heroicons/vue"],
  },

  modules: [
    "@nuxt/image-edge",
    "nuxt-headlessui",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-mailer",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
  ],

  imports: {
    dirs: ["store", "types"],
  },

  runtimeConfig: {
    mailerUser: process.env.MAILER_USER,
    mailerPass: process.env.MAILER_PASSWORD,
    private: {
      authSecret: process.env.AUTH_TOKEN_SECRET,
      authExpiration: process.env.AUTH_TOKEN_EXPIRATION,
      apiKey: process.env.LINEAR_API_KEY,
    },
    public: {
      appDomain: process.env.APP_URL,
      apiUrl: process.env.API_URL,
      tmdb: {
        apiKey: process.env.TMDB_API_KEY,
        accessToken: process.env.TMDB_ACCESS_TOKEN,
      },
    },
  },

  i18n: {
    vueI18n: {
      legacy: false,
      locale: "en-US",
      fallbackLocale: "en-US",
      availableLocales: ["en-US", "fr-FR"],
      messages: {
        "en-US": en,
        "fr-FR": fr,
      },
    },
  },

  image: {
    alias: {
      supabase:
        "https://fexpltoqrphaingpxdjt.supabase.co/storage/v1/object/public",
      tmdb: "https://image.tmdb.org/t/p",
    },
    domains: [
      "https://fexpltoqrphaingpxdjt.supabase.co",
      "https://image.tmdb.org",
    ],
    dir: "assets/media",
  },
});
