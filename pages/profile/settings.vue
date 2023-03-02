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
    <div class="card">
      <h3 class="text-lg font-medium leading-6 text-primary">Settings</h3>
      <div class="mt-2 max-w-xl text-sm text-muted">
        <p>Here you can change the application settings.</p>
      </div>
      <div class="mt-5 flex gap-4">
        <LanguageSelector :isText="true" />
      </div>
    </div>
  </div>
</template>

