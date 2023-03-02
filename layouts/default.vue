<script setup lang="ts">
import CommandConsole from "~/components/layout/CommandConsole.vue";
import Navbar from "~/components/layout/Navbar.vue";
import Footer from "~/components/layout/Footer.vue";
</script>

<template>
  <div class="h-full">
    <CommandConsole />
    <Navbar />
    <slot class="h-full" />
    <Footer />
  </div>
</template>

<style scoped></style>
