import en from "./locales/en.json";
import fr from "./locales/fr.json";

export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
  },

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
    dirs: ["store"],
  },

  runtimeConfig: {
    mailerUser: process.env.MAILER_USER,
    mailerPass: process.env.MAILER_PASSWORD,
    private: {
      authSecret: process.env.AUTH_TOKEN_SECRET,
      authExpiration: process.env.AUTH_TOKEN_EXPIRATION,
    },
    public: {
      appDomain: process.env.APP_URL,
      apiUrl: process.env.API_URL,
    },
  },

  i18n: {
    vueI18n: {
      legacy: false,
      locale: "en",
      fallbackLocale: "en",
      availableLocales: ["en", "fr"],
      messages: {
        en,
        fr,
      },
    },
  },

  image: {
    alias: {
      supabase: "https://fexpltoqrphaingpxdjt.supabase.co/storage/v1/object/public",
    },
    domains: ["https://fexpltoqrphaingpxdjt.supabase.co"],
    dir: "assets/media",
  },
});
