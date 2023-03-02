<script setup lang="ts">
import LanguageSelector from "~/components/settings/LanguageSelector.vue";

definePageMeta({
  name: "Settings",
  title: "Settings",
  middleware: ["auth"],
});
</script>

<template>
  <div>
    <h1>Settings</h1>
    <LanguageSelector />
  </div>
</template>
