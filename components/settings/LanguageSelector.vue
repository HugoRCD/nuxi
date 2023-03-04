<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
const { locale } = useI18n();
import { useLocalStorage } from "@vueuse/core";

defineProps({
  isText: {
    type: Boolean,
    default: false,
  },
});

const availableLocales = [
  {
    name: "English",
    iso: "en-US",
    flag: "🇺🇸",
  },
  {
    name: "Français",
    iso: "fr-FR",
    flag: "🇫🇷",
  },
];

watch(locale, (newLang) => {
  locale.value = newLang;
  useLocalStorage("nuxi_locale", newLang);
});

const setLocale = (newLocale: string) => {
  locale.value = newLocale;
  useLocalStorage("nuxi_locale", newLocale).value = newLocale;
};

const currentLocale = computed(() => {
  return availableLocales.find((l) => l.iso === locale.value);
});
</script>

<template>
  <select
    v-if="isText"
    class="bg-transparent text-white rounded-md p-2 focus:outline-none"
    v-model="locale"
    @change="setLocale($event.target.value)"
  >
    <option v-for="l in availableLocales" :key="l.iso" :value="l.iso">{{ l.flag }} {{ l.name }}</option>
  </select>
</template>
