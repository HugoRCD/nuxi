<script setup lang="ts">
import CommandConsole from "~/components/layout/CommandConsole.vue";
import Navbar from "~/components/layout/Navbar.vue";
</script>

<template>
  <div class="h-full">
    <CommandConsole />
    <Navbar />
    <slot class="h-full" />
  </div>
</template>

<style scoped></style>
