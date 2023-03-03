<script setup lang="ts">
import LanguageSelector from "~/components/settings/LanguageSelector.vue";

definePageMeta({
  name: "Settings",
  title: "Settings",
  middleware: ["auth"],
});
</script>

<template>
    <div class="bg-secondary px-4 py-5 shadow sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-primary">{{ $t("settings.title") }}</h3>
      <div class="mt-2 max-w-xl text-sm text-muted">
        <p>{{ $t("settings.description") }}</p>
      </div>
      <div class="mt-5 flex gap-4 items-center">
        <span class="text-muted">{{ $t("settings.language") }}:</span>
        <LanguageSelector :isText="true" />
      </div>
    </div>
</template>

