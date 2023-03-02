<script setup lang="ts">
definePageMeta({
  name: "Home",
  title: "Home",
  path: "/",
  middleware: ["auth"],
});
</script>

<template>
  <div>
    <h1>Home</h1>
  </div>
</template>
