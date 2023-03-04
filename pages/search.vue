<script setup lang="ts">
definePageMeta({
  title: "Search",
});

const search = computed(() => useRoute().query.q);
</script>

<template>
  <div></div>
</template>
